interface IPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const checkIsRegisterDataValid = (payload: IPayload): boolean => {
  const re = /^[^\s@]+@[^\s@]+$/;
  const validEmail = re.test(payload.email);
  const matchingPasswords = payload.password === payload.confirmPassword && payload.password !== '';
  if (!(validEmail && matchingPasswords)) {
    return false;
  }
  return true;
};

export default checkIsRegisterDataValid;
