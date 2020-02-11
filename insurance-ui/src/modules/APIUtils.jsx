/**
 * @description This handles response received from web service calls
 * @param response 
 */
export function handleResponse(response) {
  logInfo('response ', response);
  if (response) {
    if (response.status === 200) {
      return response.data;
    }

    // TODO need to implement
    if (response.status === 400) {
      const error = response.data.results;
      throw new Error(error);
    }

    // TODO need to implement
    if (response.status === 500) {
      const error = response.data.results;
      throw new Error(error);
    }
  }
  throw new Error("Network response was not ok.");
}

/**
  * @description This handles error cases received from web service calls
  * @param response 
  */
export function handleError(error) {
  logError("API call failed. " + error);
  if (error.response.status === 401) {
    throw new Error("Error");
  } else {
    throw new Error("Error");
  }
}
