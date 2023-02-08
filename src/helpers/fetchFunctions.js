export const fetchProduct = async (id) => {
  if (id) {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await response.json();
    return data;
  } throw new Error('ID not found');
};

export const fetchProductsList = async (product) => {
  if (product) {
    return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
      .then((response) => response.json())
      .then((data) => data.results);
  } throw new Error('Search "product" not found');
};
