import router from '../router';
import { Route } from '../routes.enum';

const redirectTo = (route: Route): void => {
  router.push({ path: route });
};

export { redirectTo };
