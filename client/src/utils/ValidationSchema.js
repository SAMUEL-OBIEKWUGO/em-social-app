import * as yup from "yup";

// for signup
export const regFormSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    userName: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "min lenght of password should be at least 8 chrs"),

    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(8, "min lenght of password should be at least 8 chrs")
      .oneOf([yup.ref("password")], "Password do not match"),
  })
  .required();

// for resetpasswordlink
export const resetPwdLinkSchema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "min lenght of password should be at least 8 chrs"),

    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(8, "min lenght of password should be at least 8 chrs")
      .oneOf([yup.ref("password")], "Password do not match"),
  })
  .required();
// for sign in
export const signInSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "min lenght of password should be at least 8 chrs"),
  })
  .required();

// for forgot password
export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
  })
  .required();

// post text only
export const postText = yup
  .object({
    text: yup.string().required("text is required"),
  })
  .required();
// post text or image
// export const postTextImg = yup
//   .object({
//     text: yup.string().when("image", {
//       is: (image) => !image || image.length === 0,
//       then: yup.string().required("Either text or image is required"),
//       otherwise: yup.string(),
//     }),
//     img: yup.mixed().when("text", {
//       is: (text) => !text,
//       then: yup
//         .mixed()
//         .test(
//           "fileRequired",
//           "Either text or image is required",
//           (value) => value && value.length > 0
//         ),
//       otherwise: yup.mixed(),
//     }),
//   })
//   .required();

// export const postTextImg = yup.object({
//   text: yup.string().when("img", {
//     is: (img) => !img || img.length === 0,
//     then: yup.string().required("Either text or image is required"),
//     otherwise: yup.string(),
//   }),
//   img: yup.mixed().when("text", {
//     is: (text) => !text,
//     then: yup.mixed().test(
//       "fileRequired",
//       "Either text or image is required",
//       (value) => value && value.length > 0
//     ),
//     otherwise: yup.mixed(),
//   }),
// }).required();
// export const postTextImg = yup.object().shape({
//   text: yup.string().nullable(),
//   img: yup.mixed().nullable(),
// }).test('text-or-img', 'Either text or image is required', function (value) {
//   const { text, img } = value;
//   return text || (img && img.length > 0);
// });


// export const postTextImg = yup.object().shape({
//   text: yup.string().when('img', {
//     is: (img) => !img || img.length === 0,
//     then: yup.string().required('Either text or image is required'),
//     otherwise: yup.string(),
//   }),
//   img: yup.mixed().when('text', {
//     is: (text) => !text,
//     then: yup.mixed().required('Either text or image is required'),
//     otherwise: yup.mixed(),
//   }),
// });

// export const postTextImg = yup.object().shape({
//   text: yup.string(),
//   img: yup.mixed(),
// }).test('text-or-img', 'Either text or image is required', function (value) {
//   return value.text || value.img;
// });

// export const postTextImg = yup.object().shape({
//   text: yup.string(),
//   img: yup.mixed().test('fileRequired', 'Either text or image is required', function (value) {
//     return value instanceof File || typeof value === 'string';
//   }),
// }).test('text-or-img', 'Either text or image is required', function (value) {
//   return value.text || (value.img && value.img.size > 0);
// });

export const postTextImg = yup.object().shape({
  text: yup.string().nullable(),
  img: yup
    .mixed()
    .nullable()
    .test('fileRequired', 'Either text or image is required', function (value) {
      const { text } = this.parent;
      return text || (value && value.size > 0);
    }),
});