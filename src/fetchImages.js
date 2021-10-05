export async function fetchImages(searching) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=15898685-89bff7612e9c08763771f3be3&q=${searching}&image_type=photo&orientation=horizontal&safesearch=true`,
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
}
