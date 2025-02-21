import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formFields } from './formFields';
import { loginSchema } from './schemes';
import { Form } from 'components/UI/Form/Form';
import { TextField } from 'components/UI/TextField/TextField';
import { LoginMutationFunction } from '../../types';

interface Props {
  login: LoginMutationFunction;
}

export const LoginForm: FC<Props> = ({ login }) => {
  const form = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'all',
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = handleSubmit((data) => {
    login({ email: data.email, password: data.password });
  });

  return (
    <Form className="login__form" id="LoginForm" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        {formFields.map(({ name, ...data }, index) => (
          <TextField
            {...data}
            key={name}
            data-testid={name}
            id={`input-${index}`}
            isValid={!errors[name]}
            helpText={errors[name]?.message}
            {...register(name)}
          />
        ))}
      </fieldset>
    </Form>
  );
};
