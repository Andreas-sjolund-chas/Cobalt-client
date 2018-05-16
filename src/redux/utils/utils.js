/* Fetch does not trow error, this helps us to use catch  */
export const handleResponse = async response => {
  const jsonResponse = await response.json();

  return !response.ok ? Promise.reject(jsonResponse) : jsonResponse;
};
