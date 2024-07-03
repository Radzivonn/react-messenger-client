import './style.scss';
import React, { useState } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { Form } from '../../components/UI/Form/Form';
import { TextField } from '../../components/UI/TextField/TextField';
import { ControlLabel } from '../../components/UI/ControlLabel/ControlLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { formFields } from './formFields';
import { loginSchema } from './schemes';
import authService from '../../API/services/authService/authService';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const LoginModule = () => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'all',
  });

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [isRemember, setIsRemember] = useState(false);

  const handleRememberCheck = (value: boolean) => {
    setIsRemember(value);
  };

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
    <section className="login">
      <div className="login__container page-wrapper">
        <header className="login__header">
          <h2 className="visually-hidden">Log in section</h2>
          <p className="login__title">Welcome back</p>
          <p className="login__description">Please sign in below to continue</p>
        </header>
        <Form className="login__form" action="" onSubmit={onSubmit}>
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
          <ControlLabel checked={isRemember} label="Remember me" onChange={handleRememberCheck} />
          <Button accent className="form__button" type="submit">
            Sign in
          </Button>
          <p className="form__note">
            {`Not a member? `}
            <Link className="link" to={`/${routes.registration}`}>
              Join us!
            </Link>
          </p>
        </Form>
      </div>
    </section>
  );
};
