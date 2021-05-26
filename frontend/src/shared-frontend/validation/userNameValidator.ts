const validator = (input: string): Error | null => {
  if (input === '') return Error('Incorrect user name. Please, enter the valid one.');
  return null;
};

export default validator;
