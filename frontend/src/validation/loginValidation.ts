const emailValidator = (input: string): Error | null => {
  if (input === '') return Error('This fied cannot be empty. Please, enter the email.');
  return null;
};

const passwordValidator = (input: string): Error | null => {
  if (input === '') return Error('This fied cannot be empty. Please, enter the password.');
  return null;
};

export { emailValidator, passwordValidator };
