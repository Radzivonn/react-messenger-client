import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileFormSchema } from './schemes';
import { profileFormFields } from './formFields';
import { TextField } from 'components/UI/TextField/TextField';
import { Form } from 'components/UI/Form/Form';
import { RegistrationMutationFunction } from '../../types';

interface Props {
  registration: RegistrationMutationFunction;
}

export const RegistrationForm: FC<Props> = ({ registration }) => {
  const profileForm = useForm({
    resolver: yupResolver(profileFormSchema),
    mode: 'all',
  });

  const { register, handleSubmit, formState } = profileForm;
  const { errors } = formState;

  const onSubmit = handleSubmit((profileInfo) => {
    registration({
      userName: profileInfo.userName,
      email: profileInfo.email,
      password: profileInfo.password,
    });
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
              data-testid={name}
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
