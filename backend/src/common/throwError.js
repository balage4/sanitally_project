export default function throwError(httpCode, message) {
  const err = new Error();
  err.status = httpCode;
  err.message = message;
  throw err;
}