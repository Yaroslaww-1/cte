interface IPayload {
  email: string;
  password: string;
}

const checkLoginValidation = (payload: IPayload): boolean => {
  if (!payload.email || !payload.password) {
    return false;
  }
  return true;
};

export default checkLoginValidation;
