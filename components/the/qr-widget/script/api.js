export async function loadImage(body) {
  try {
    return await $fetch('/proxy/services/qr-code/generateQR', {
      method: 'POST',
      body: body,
      baseURL: ''
    });
  } catch (error) {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error message:', error.response.statusText);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
}
