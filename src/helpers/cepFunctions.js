export const getAddress = (info) => {
  const selectedAddress = document.querySelector('.cart__address');
  if (Object.prototype.hasOwnProperty.call(info, 'city')) {
    if (Object.prototype.hasOwnProperty.call(info, 'address')) {
        selectedAddress.innerText = `${info.address} - ${info.district} - ${info.city} - ${info.state}`;
    } else {
      selectedAddress.innerText = `${info.street} - ${info.neighborhood} - ${info.city} - ${info.state}`;
      }
    } else {
    throw new Error('CEP not found');
  }
};

export const searchCep = async () => {
  const selectedAddress = document.querySelector('.cart__address');
  const cepId = document.querySelector('.cep-input').value;
  const firstCep = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepId}`);
  const secondCep = await fetch(`https://cep.awesomeapi.com.br/json/${cepId}`);
  const promises = [firstCep, secondCep];
  Promise.any(promises).then((value) => value.json())
    .then((data) => getAddress(data))
    .catch((error) => console.log(error.message))
    .then(selectedAddress.innerText = 'CEP not found');
};