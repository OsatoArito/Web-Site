const catalog = document.querySelector("#catalog");
const searchInput = document.querySelector("#search");
const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
const applyFilterButton = document.querySelector("#applyFilter");
const sizeFilters = document.querySelectorAll(".size-filter");
const brandSelect = document.querySelector("#brand");
const typeSelect = document.querySelector("#type");
const typeSelect2 = document.querySelector("#type2");
const typeSelect3 = document.querySelector("#type3");
const typeSelect4 = document.querySelector("#type4");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalNameInput = document.querySelector("#modal-name");
const modalSurnameInput = document.querySelector("#modal-surname");
const modalEmailInput = document.querySelector("#modal-email");
const modalOrderButton = document.querySelector("#modal-order-button");
const modalCloseButton = document.querySelector(".close");

let selectedType = "";
let selectedType2 = "";
let selectedType3 = "";
let selectedType4 = "";
let selectedBrand = "";
let selectedSize = "";

// Функция отображения товара на странице + подключение пагинатора
const perPage = 12;
function renderProducts(page, products) {
  const start = (page - 1) * perPage; // индекс первого продукта на странице
  const end = start + perPage; // индекс последнего продукта на странице
  const minPrice = parseFloat(minPriceInput.value);
  const maxPrice = parseFloat(maxPriceInput.value);

  catalog.innerHTML = "";

  const filteredProducts = products.filter((item) => {
    const itemPrice = parseFloat(item.price);
    return (
      itemPrice >= minPrice &&
      itemPrice <= maxPrice &&
      (!selectedSize || item.size.includes(selectedSize)) &&
      (!selectedBrand || item.brand === selectedBrand) &&
      (!selectedType || item.type === selectedType) &&
      (!selectedType2 || item.type2 === selectedType2) &&
      (!selectedType3 || item.type3 === selectedType3) &&
      (!selectedType4 || item.type4 === selectedType4)
    );
  });

  filteredProducts.slice(start, end).forEach((item) => {
    const product = document.createElement("div");
    product.className = "product";
    product.innerHTML = `
      <h2 style="margin-bottom:10px">${item.name}</h2>
      <p style="display:none">${item.subname}</p>
      <img src="${item.img}" alt="${item.name}" />
      <p>${item.price} грн.</p>
      <p>${item.size}</p>
      <button class="products-element__btn-buy">Купить</button>
      <button class="products-element__btn-add" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}">Добавить в корзину</button>
    `;
    const buyButton = product.querySelector(".products-element__btn-buy");
    buyButton.addEventListener("click", () => {
      openModal(item);
    });
    const addButton = product.querySelector(".products-element__btn-add");
    addButton.addEventListener("click", () => {
      const itemName = addButton.dataset.name;
      const itemPrice = parseFloat(addButton.dataset.price);
      const itemImg = addButton.dataset.img;
      addToCart(itemName, itemPrice, itemImg);
    });
    catalog.appendChild(product);
  });

  renderPagination(page, filteredProducts);
}
// Функция пагинатора
function renderPagination(page, products) {
  const pagination = document.querySelector("#pagination");
  const totalPages = Math.ceil(products.length / perPage); // общее количество страниц

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.addEventListener("click", () => {
      renderProducts(i, products);
    });
    if (i === page) {
      button.className = "active";
    }
    pagination.appendChild(button);
  }
}

// Открывание корзины, добавление товара в неё
let cartTotal = 0;
function showCart() {
  const cartItems = document.querySelectorAll(".cart-item");
  const modalItems = document.querySelector(".modal-items");
  modalItems.innerHTML = "";

  cartTotal = 0;

  cartItems.forEach((item) => {
    const itemName = item.querySelector(".cart-item__name").textContent;
    const itemPrice = parseFloat(
      item.querySelector(".cart-item__price").textContent
    );
    const itemImg = item.querySelector(".cart-item__img").src;

    const modalItem = document.createElement("div");
    modalItem.className = "modal-items";
    modalItem.innerHTML = `
      <img src="${itemImg}">
      <h1>${itemName}</h1>
      <p>${itemPrice} грн.</p>
      <button class="modal-remove">Удалить</button>
    `;
    const removeButton = modalItem.querySelector(".modal-remove");
    removeButton.addEventListener("click", () => {
      removeItem(itemName, itemPrice, itemImg);
      showCart();
    });
    modalItems.appendChild(modalItem);

    cartTotal += itemPrice;
  });

  const cartTotalElement = document.querySelector(".cart-total");
  cartTotalElement.textContent = `${cartTotal} грн.`;

  const modalBask = document.querySelector(".modalBask");
  modalBask.style.display = "block";

  const closeButton = document.querySelector(".modal-close");
  closeButton.addEventListener("click", () => {
    modalBask.style.display = "none";
  });
}
// Функция для отображения товара в корзине
function addToCart(name, price, img) {
  const cartItems = document.querySelector(".cart-items");
  const cartCounter = document.querySelector(".cart-counter");
  const itemCount = parseInt(cartCounter.textContent);
  const item = document.createElement("div");
  item.className = "cart-item";
  item.innerHTML = `
  <img class="cart-item__img" src="${img}">
  <h1 class="cart-item__name">${name}</h1>
  <p class="cart-item__price">${price} грн.</p>
  `;
  cartItems.appendChild(item);
  cartCounter.textContent = itemCount + 1;
  // Подсчёт суммы
  cartTotal += price;
  const cartTotalElement = document.querySelector(".cart-total");
  cartTotalElement.textContent = `${cartTotal} грн.`;

  const cart = document.querySelector(".cart");
  cart.addEventListener("click", () => {
    const cartItems = document.querySelectorAll(".cart-item");
    showCart(cartItems);
  });
}
// Удаление товара из корзины
function removeItem(itemName, itemPrice, itemImg) {
  const cartItems = document.querySelectorAll(".cart-item");
  cartItems.forEach((item) => {
    if (
      item.querySelector(".cart-item__name").textContent === itemName &&
      item.querySelector(".cart-item__price").textContent ===
        `${itemPrice} грн.` &&
      item.querySelector(".cart-item__img").src === itemImg
    ) {
      item.remove();
      const cartCounter = document.querySelector(".cart-counter");
      const itemCount = parseInt(cartCounter.textContent);
      cartCounter.textContent = itemCount - 1;
      cartTotal -= itemPrice;
      const cartTotalElement = document.querySelector(".cart-total");
      cartTotalElement.textContent = `${cartTotal} грн.`;
    }
  });
}

// Сортировка за типом одежды
typeSelect.addEventListener("change", (event) => {
  selectedType = event.target.value;
  renderProducts(1, CATALOG);
});
typeSelect2.addEventListener("change", (event) => {
  selectedType2 = event.target.value;
  renderProducts(1, CATALOG);
});
typeSelect3.addEventListener("change", (event) => {
  selectedType3 = event.target.value;
  renderProducts(1, CATALOG);
});
typeSelect4.addEventListener("change", (event) => {
  selectedType4 = event.target.value;
  renderProducts(1, CATALOG);
});

// Сортировка по живому поиску
function filterProducts(searchTerm) {
  const filteredProducts = CATALOG.filter((product) =>
    product.subname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredProducts;
}
searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  const filteredProducts = filterProducts(searchTerm);
  renderProducts(1, filteredProducts);
});

// Фильтрация по цене
applyFilterButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  const filteredProducts = filterProducts(searchTerm);
  renderProducts(1, filteredProducts);
});
// Фильтрация по размеру
sizeFilters.forEach((sizeFilter) => {
  sizeFilter.addEventListener("click", () => {
    selectedSize = sizeFilter.value;
    renderProducts(1, CATALOG);
  });
});
// Фильтрация по бренд
brandSelect.addEventListener("change", (event) => {
  selectedBrand = event.target.value;
  renderProducts(1, CATALOG);
});

// Модальное окно для кнопки "Купить" и её закрытие
function openModal(product) {
  modalTitle.innerText = `${product.name} - ${product.subname}`;
  modalDescription.innerHTML = `<img src="${product.img}" alt="${product.name}" /><p>${product.size}</p><p>${product.price} грн.</p>`;
  modal.style.display = "block";

  modalOrderButton.addEventListener("click", () => {
    const name = modalNameInput.value.trim();
    const surname = modalSurnameInput.value.trim();
    const email = modalEmailInput.value.trim();
    const quantity = parseInt(document.querySelector("#modal-quantity").value);
    const totalPrice = product.price * quantity;
    document.querySelector(
      "#modal-total"
    ).innerText = `Общая сумма: ${totalPrice} грн.`;
    if (name && surname && email) {
      // отправка формы заказа товара
      modal.style.display = "none";
    } else {
      alert("Пожалуйста, заполните все поля формы.");
    }
  });

  const modalQuantityInput = document.querySelector("#modal-quantity");
  modalQuantityInput.addEventListener("input", () => {
    const quantity = parseInt(modalQuantityInput.value);
    const totalPrice = product.price * quantity;
    document.querySelector(
      "#modal-total"
    ).innerText = `Общая сумма: ${totalPrice} грн.`;
  });
}

function closeModal() {
  modal.style.display = "none";
}

modalOrderButton.addEventListener("click", () => {
  const name = modalNameInput.value;
  const surname = modalSurnameInput.value;
  const email = modalEmailInput.value;
  const orderDetails = `Заказ: ${modalTitle.innerText}, ${name} ${surname}, ${email}. 
  Спасибо за заказ. Мы свяжемся с Вами по почте ${email}, чтобы уточнить детали заказа.`;

  // создаем модальное окно
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // создаем содержимое модального окна
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  const orderDetailsElement = document.createElement("p");
  orderDetailsElement.innerText = orderDetails;
  modalContent.appendChild(orderDetailsElement);
  const closeButton = document.createElement("button");
  closeButton.innerText = "Закрыть";
  closeButton.addEventListener("click", () => modal.remove());
  modalContent.appendChild(closeButton);

  // добавляем содержимое в модальное окно и модальное окно на страницу
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // показываем модальное окно
  modal.style.display = "block";

  closeModal();
});

modalCloseButton.addEventListener("click", () => {
  closeModal();
});

renderProducts(1, CATALOG);
