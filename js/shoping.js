// Модальное окно для кнопки "User" и форма
// Получаем ссылки на элементы кнопки, модального окна и закрытия
const btn = document.getElementById("myBtn");
const modalss = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close-btn")[0];

// Открываем модальное окно при клике на кнопку
btn.onclick = function () {
  modalss.style.display = "block";
};
// Закрываем модальное окно при клике на кнопку "Закрыть"
closeBtn.onclick = function () {
  modalss.style.display = "none";
};
//=========================================================================
//=========================================================================
//===============================Модальное окно с сообщением===============================================
const checkoutButton = document.querySelector(".checkout-button");
const modals = document.querySelector(".modalButton");
const modalContent = modals.querySelector(".modal-contentButton");

checkoutButton.addEventListener("click", () => {
  const message = `
    <form id="checkout-form">
    <span class="closeButton" style="cursor:pointer" maxlength="2">&times;</span>
   <br>
   <br>

      <label for="name">Имя:</label>
      <input type="text" id="name" name="name" required><br><br>

      <label for="surname">Фамилия:</label>
      <input type="text" id="surname" name="surname" required><br><br>

      <label for="country">Страна:</label>
      <input type="text" id="country" name="country" required><br><br>

      <label for="phone">Номер телефона:</label>
      <input type="tel" id="phone" name="phone" required><br><br>

      <label for="post">Почта:</label>
      <select id="post" name="post">
        <option value="nova-poshta">Нова Пошта</option>
        <option value="ukrposhta">УкрПошта</option>
        <option value="ukrposhta">На дом</option>
      </select><br><br>

      <label for="customer-email">Почта заказчика:</label>
      <input type="email" id="customer-email" name="customer-email" required><br><br>

      <label for="payment">Способ оплаты:</label>
      <select id="payment" name="payment">
        <option value="visa">Visa</option>
        <option value="mastercard">Mastercard</option>
        <option value="mastercard">При получении</option>
      </select><br><br>

      <label for="size">Размер:</label>
      <select id="size" name="size">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="30/170см">30/170см</option>
        <option value="40/180см">40/180см</option>
        <option value="60/180см">60/180см</option>
        <option value="45мм:42мм:130мм">45мм:42мм:130мм</option>
        <option value="32мм:40мм:120мм">32мм:40мм:120мм</option>
        <option value="38мм:40мм:130мм">38мм:40мм:130мм</option>
        <option value="39см">39см</option>
        <option value="40см">40см</option>
        <option value="42см">42см</option>
        <option value="44см">44см</option>
        <option value="46см">46см</option>
        <option value="47.5см">47.5см</option>
      </select><br><br>

      <label for="quantity">Количество:</label>
      <input type="number" id="quantity" name="quantity" min="1" max="10" required><br><br>

      <input type="submit" value="Отправить">
    </form>
  `;

  modalContent.innerHTML = message;
  modals.classList.add("active");

  const closeButton = modalContent.querySelector(".closeButton");
  closeButton.addEventListener("click", () => {
    modals.classList.remove("active");
  });

  const form = document.querySelector("#checkout-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const successMessage =
      "Спасибо за покупку. В течение пары минут Вам придёт уведомление на почту об успешной покупке.";
    modalContent.innerHTML = successMessage;
    setTimeout(() => {
      modals.classList.remove("active");
    }, 5000);
  });
});
