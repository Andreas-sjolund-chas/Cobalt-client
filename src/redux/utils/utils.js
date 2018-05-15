/* Fetch does not trow error, this helps us to use catch  */
export function handleResponse(response) {
  if (!response.ok) {
    response.json().then(function(error) {
      const errObj = Object.assign({ newKey: error })
      debugger
      throw new Error(errObj.newKey)
    })
  }

  return response.json();
};
