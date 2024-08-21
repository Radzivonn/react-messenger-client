import React, { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import authService from 'API/services/AuthService/AuthService';
import { formFields } from './formFields';
import { loginSchema } from './schemes';
import { toast } from 'react-toastify';
import { Form } from 'components/UI/Form/Form';
import { TextField } from 'components/UI/TextField/TextField';

export const LoginForm: FC = () => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'all',
  });

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = handleSubmit(async (data) => {
    const userData = await authService.login(data.email, data.password);
    if (userData) {
      authService.saveAccessToken(userData.accessToken);

      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      navigate(`/users/${userData.user.id}/${userData.user.name}`, { replace: true });

      toast.success('You are successfully logged in!');
    } else toast.error('This user was not found');
  });

  return (
    <Form className="login__form" id="LoginForm" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        {formFields.map(({ name, ...data }, index) => (
          <TextField
            {...data}
            key={name}
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
