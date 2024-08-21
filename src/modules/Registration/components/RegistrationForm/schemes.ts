import * as yup from 'yup';
import { userNameSchema, emailSchema, passwordSchema } from 'validations/validationSchemes';

export const profileFormSchema = yup.object({
  userName: userNameSchema,
  email: emailSchema,
  password: passwordSchema,
});
