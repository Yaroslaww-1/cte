enum Route {
  Base = '/',
  Login = '/login',
  Register = '/register',
  ConfirmEmail = '/confirm-email',
  Documents = '/documents',
  DocumentEdit = '/documents/:documentId/edit',
  NotFound = '/:notFound(.*)',
}

export { Route };
