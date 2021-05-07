interface IPayload {
  email: string;
  password: string;
}

const checkIsLoginDataValid = (payload: IPayload): boolean => {
  if (!payload.email || !payload.password) {
    return false;
  }
  return true;
};

export default checkIsLoginDataValid;
