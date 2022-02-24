const starWarsApi = async () => {
  const resolve = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await resolve.json();
  return data.results;
};
export default starWarsApi;
