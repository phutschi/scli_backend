const _errorCallback = (error, retval) => {
  return error ? error : retval
}

export const errorCallback = _errorCallback;
