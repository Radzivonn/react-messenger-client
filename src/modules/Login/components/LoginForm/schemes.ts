import * as yup from 'yup';
import { emailSchema, passwordSchema } from '../../../../validations/validationSchemes';

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});
