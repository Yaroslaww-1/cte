import { documentEditVuexModule } from '@src/vuex/store-accessor';

const nameValidator = (input: string): Error | null => {
  if (input === '') return Error('This field cannot be empty. Please, enter the user name.');
  return null;
};

const emailValidator = (input: string): Error | null => {
  if (input === '') return Error('This fied cannot be empty. Please, enter the email.');
  return null;
};

const passwordValidator = (input: string): Error | null => {
  if (input === '') return Error('This fied cannot be empty. Please, set the password.');
  return null;
};

const confirmPasswordValidator = (input: string): Error | null => {
  const password = documentEditVuexModule.inputs.registerPassword;
  if (input === '') return Error('This field cannot be empty.');
  if (input !== password) return Error('Passwords do not match.');
  return null;
};

export { nameValidator, emailValidator, passwordValidator, confirmPasswordValidator };
