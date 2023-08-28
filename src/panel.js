
let _url = '';

const label = document.querySelector('label');
const textarea = document.querySelector('textarea');

textarea.addEventListener('input', onInput);
window.addEventListener('storage', onStorage);

function load(url){
  const content = localStorage.getItem(url) || '';
  label.textContent = url;
  textarea.value = content;
  _url = url;
}

function onInput(event){
  const value = event.target.value;
  localStorage.setItem(_url, value);
}

function onStorage(event){
  load(_url);
}
