import { getSavedCartIds, saveCardId, removeCartId } from './cartFunctions';
import { loading, loadComplete, errorAPI } from './test';
import { fetchProduct, fetchProductList } from './fetchFunctions';

const cart = document.querySelector('.cart__products');
let total = 0;

export const totalPrice = (event) => {
  const priceTotal = document.querySelector('.total-price');
  Math.round(total += event);
  priceTotal.innerText = total;
};

const reload = () => {
  total = 0;
  const price = document.querySelector('.total-price');
  const cartList = getSavedCartIds();
  if (cartList.length === 0) {
    price.innerText = 0;
  } cartList.forEach(async (id) => {
    const product = await fetchProduct(id);
    totalPrice(product.price);
  });
};

const createProductImage = (image) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

export const createCustomElement = (element, className, innerText = '') => {
  const createElement = document.createElement(element);
  createElement.className = className;
  createElement.innerText = innerText;
  return createElement;
};

export const getIdFromProduct = (product) => {
  product.querySelector('span.product__id').innerText;
};

const removeCartProduct = (li, id) => {
  li.remove();
  removeCartId(id);
  reload();
};

export const createCartProductElement = ({
  id,
  title,
  price,
  pictures,
}) => {
  const li = document.createElement('li');
  li.className = 'cart__product';
  const imageContainer = createCustomElement('div', 'cart__product__image-container');

  const image = createProductImage(pictures[0].url);
  imageContainer.appendChild(image);

  const image2 = createProductImage((pictures[1] || pictures[0]).url);
  imageContainer.appendChild(image2);
  li.appendChild(imageContainer);

  const infoContainer = createCustomElement('div', 'cart__product__info-container');
  infoContainer.appendChild(createCustomElement('span', 'product__title', title));
  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  infoContainer.appendChild(priceElement);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', () => removeCartProduct(li, id));
  return li;
};

export const carrinho = async () => {
  total = 0;
  cart.innerText = '';
  const cartList = getSavedCartIds();
  cartList.forEach(async (id) => {
    const product = await fetchProduct(id);
    totalPrice(product.price);
    const productCart = createCartProductElement(product);
    cart.appendChild(productCart);
  });
};

const addCarrinho = async (param) => {
  const product = await fetchProduct(param);
  const productCart = createCartProductElement(product);
  cart.appendChild(productCart);
  carrinho();
};

export const createProductElement = ({
  id,
  title,
  thumbnail,
  price,
}) => {
  const section = document.createElement('section');
  section.className = 'product';

  section.appendChild(createCustomElement('span', 'product__id', id));

  const thumbnailContainer = createCustomElement('div', 'img__container');
  thumbnailContainer.appendChild(createProductImage(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  section.appendChild(priceElement);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Adicionar ao carrinho!',
  );
  section.appendChild(cartButton);

  cartButton.addEventListener('click', async () => {
    const productId = section.firstChild.innerText;
    saveCardId(productId);
    addCarrinho(id);
  });

  return section;
};

export const productList = async (param) => {
  const list = document.querySelector('.products');
  loading();
  try {
    const itens = await fetchProductList(param);
    itens.forEach(async (product) => {
      const listProducts = createProductElement(product);
      list.appendChild(listProducts);
    }); loadComplete();
  } catch (error) {
    loadComplete();
    errorAPI();
  }
};
