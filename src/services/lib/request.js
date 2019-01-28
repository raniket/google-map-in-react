/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Raniket Ram (@raniket)
 * @license MIT
 *
 */

import axios from 'axios'

const LOCAL_HOST = process.env.REACT_APP_API_LOCAL_HOST;

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: LOCAL_HOST,
});

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {

  // On success
  const onSuccess = (response) => {
    console.log('%cRequest Successful! => ', 'color: green; font-weight: bold;', response);
    const { data, status } = response;
    return { data, status };
  }

  // On error
  const onError = (error) => {
    console.log('%cRequest Failed => ', 'color: red; font-weight: bold;', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.log('%cStatus => ', 'color: red; font-weight: bold;', error.response.status);
      console.log('%cData => ', 'color: red; font-weight: bold;', error.response.data);
      console.log('%cHeaders => ', 'color: red; font-weight: bold;', error.response.headers);

    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log('%cError Message => ', 'color: red; font-weight: bold;', error.message);
    }

    // return Promise.reject(error.response || error.message);
    return { status: error.status, message: error.message }
  }

  return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default request;
