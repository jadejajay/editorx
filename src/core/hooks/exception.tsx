export function ExceptionWrapper(func: () => any, errorMessage: any) {
  try {
    const result = func(); // Execute the provided function
    return result; // Return the result if no exception occurred
  } catch (error) {
    console.error(`${errorMessage || error}`);

    return errorMessage; // Return the error message if an exception occurred
  }
}
