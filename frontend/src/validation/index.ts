type Mode = 'login' | 'register';

interface ActionPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  signupEmail: string;
  signupPassword: string;
  confirmPassword: string;
}

type Payload = ActionPayload | RegisterPayload;

const checkValidation = (mode: Mode, payload: Payload): boolean => {
  if (mode === 'register') {
    const thePayload = payload as RegisterPayload;
    const validFirstName = thePayload.firstName.charAt(0).toUpperCase() + thePayload.firstName.slice(1);
    const check1 = thePayload.firstName === validFirstName;
    const validLastName = thePayload.lastName.charAt(0).toUpperCase() + thePayload.lastName.slice(1);
    const check2 = thePayload.lastName === validLastName;
    const re = /^[^\s@]+@[^\s@]+$/;
    const check3 = re.test(thePayload.signupEmail);
    const check4 = thePayload.signupPassword === thePayload.confirmPassword;
    if (!(check1 && check2 && check3 && check4)) return false;
  } else {
    const thePayload = payload as ActionPayload;
    if (!thePayload.email || !thePayload.password) {
      return false;
    }
  }
  return true;
};

export default checkValidation;