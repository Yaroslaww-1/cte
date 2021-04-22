class ApiResponseException extends Error {
  constructor(reason = 'api call returned null') {
    super(reason);
  }
}

export { ApiResponseException };
