export const loading = () => {
  const load = document.querySelector('.loading');
  load.innerText = 'carregando...';
};

export const loadComplete = () => {
  const load = document.querySelector('.loading');
  const section = document.querySelector('.container');
  section.removeChild(load);
};

export const errorAPI = () => {
  const section = document.querySelector('.container');
  section.innerHTML
  += '<h2 class="error"> An error occurred, reload the page and try again.<h2>';
};
