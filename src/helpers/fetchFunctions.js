export const fetchProduct = async (productId) => {
  if (productId) {
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const data = await response.json();
    return data;
  } throw new Error('ID not found');
};

export async function fetchProductsList(product) {
  if (product) {
    return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
      .then((response) => response.json())
      .then((data) => data.results);
  } throw new Error('Search "product" not found');
};
