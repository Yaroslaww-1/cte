const validator = (input: string): Error | null => {
  if (input === '') return Error('Document cannot be untitled. Please, enter the title.');
  return null;
};

export default validator;
