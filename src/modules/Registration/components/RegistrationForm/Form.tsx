import React, { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileFormSchema } from './schemes';
import { profileFormFields } from './formFields';
import { TextField } from '../../../../components/UI/TextField/TextField';
import { Form } from '../../../../components/UI/Form/Form';
import authService from '../../../../API/services/AuthService/AuthService';
import { toast } from 'react-toastify';

export const RegistrationForm: FC = () => {
  const queryClient = useQueryClient();

  const profileForm = useForm({
    resolver: yupResolver(profileFormSchema),
    mode: 'all',
  });

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = profileForm;
  const { errors } = formState;

  const onSubmit = handleSubmit(async (profileInfo) => {
    const userData = await authService.register(
      profileInfo.userName,
      profileInfo.email,
      profileInfo.password,
    );
    if (userData) {
      authService.saveAccessToken(userData.accessToken);

      void queryClient.invalidateQueries({ queryKey: ['userData'] });
      navigate(`/users/${userData.user.id}/${userData.user.name}`, { replace: true });

      toast.success('You are successfully registered!');
    } else toast.error('This user was not found');
  });

  return (
    <Form className="registration__form form" id="RegistrationForm" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        <p className="form__fieldset-headline">
          <legend className="form__legend">Profile Info</legend>
        </p>
        <div className="form__fieldset-content">
          {profileFormFields.map(({ name, ...data }) => (
            <TextField
              {...data}
              key={name}
              isValid={!errors[name]}
              helpText={errors[name]?.message}
              {...register(name)}
            />
          ))}
        </div>
      </fieldset>
    </Form>
  );
};
