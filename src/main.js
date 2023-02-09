import { searchCep } from './helpers/cepFunctions.js';
import sheet from './style.css' assert { type: 'css' };
import { productList, carrinho } from './helpers/shopFunctions.js';


document.querySelector('.cep-button').addEventListener('click', searchCep);

carrinho();
productList('trade');
