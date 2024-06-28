import './style.scss';
import React from 'react';
import { Button } from '../../components/UI/Button/Button';
import { Form } from '../../components/UI/Form/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileFormFields } from './formFields';
import { TextField } from '../../components/UI/TextField/TextField';
import { profileFormSchema } from './schemes';
import authService from '../../API/services/authService/authService';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const RegistrationModule = () => {
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
      toast.success('You are successfully registered!');
      navigate(`/users/${userData.user.id}`, { replace: true });
    } else toast.error('This user was not found');
  });

  return (
    <section className="registration">
      <div className="registration__container page-wrapper">
        <header className="registration__header">
          <h2 className="visually-hidden">Registration form</h2>
          <p className="registration__title">Sign up</p>
          <p className="registration__description">Please sign up below</p>
        </header>
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
        <Button type="submit" form="RegistrationForm" accent>
          Sign Up
        </Button>
        <p className="registration__note">
          {'Already have an account? '}
          <Link to={`/${routes.login}`} className="link">
            Log in!
          </Link>
        </p>
      </div>
    </section>
  );
};
