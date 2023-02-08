export const getSavedCartIds = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

export const saveCardId = (id) => {
  if(!id) throw new Error('Please enter a valid ID');

  const cartProducts = getSavedCartIds();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

export const removeCardId = async (id) => {
  if (!id) throw new Error('Please enter a valid ID');

  const cartProducts = getSavedCartIds();
  const newCartProducts = cartProducts.filter((product) => product !== id);
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};