//Модальное
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  // создаем модальное окно
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // создаем содержимое модального окна
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  const thankYouMessage = document.createElement("p");
  thankYouMessage.innerText = "Спасибо за отзыв. Рады работать для Вас.";
  modalContent.appendChild(thankYouMessage);
  const closeButton = document.createElement("button");
  closeButton.innerText = "Закрыть";
  closeButton.addEventListener("click", () => modal.remove());
  modalContent.appendChild(closeButton);

  // добавляем содержимое в модальное окно и модальное окно на страницу
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // показываем модальное окно
  modal.style.display = "block";
});
