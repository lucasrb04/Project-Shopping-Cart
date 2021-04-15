async function getComputers() {
    const apiResponse = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const jsonItens = await apiResponse.json();
    return jsonItens.results;
}

async function getItemById(id) {
  const apiResponse = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const jsonItens = await apiResponse.json();
  return jsonItens;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// function cartItemClickListener(event) {
//   // coloque seu código aqui.
// }

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  console.log(item);
  return item.querySelector('span.item__sku').innerText;
}

async function shoppedItem(items) {
  const sku = getSkuFromProductItem(items.target.parentNode);
  console.log(sku);
  // items.target.parentNode.firstChild.innerText;
  const item = await getItemById(sku);
  const parentItem = document.querySelector('ol');
  const result = createCartItemElement(item);
  console.log(result);
  parentItem.appendChild(result);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', shoppedItem);

  return section;
}

async function renderComputers() {
  const computers = await getComputers();
  const itemsSection = document.querySelector('.items');
  computers.forEach((computer) => { 
    itemsSection.appendChild(createProductItemElement(computer));
  });
}

window.onload = async function onload() { 
  renderComputers();
};