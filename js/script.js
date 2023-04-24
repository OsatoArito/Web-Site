/*Настройка бургера*/
$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger,.header__menu").toggleClass("active");
    $("body").toggleClass("lock");
  });
});

/*Спойлер для футера*/
$(document).ready(function () {
  $(".footer__title").click(function (event) {
    $(this).toggleClass("active").next().slideToggle(300);
  });
});
/*Спойлер для вкладки "Помощь"*/
$(document).ready(function () {
  $(".questions__titleHelp").click(function (event) {
    $(this).toggleClass("active").next().slideToggle(300);
  });
});
/*Спойлер для вкладки "Контакты"*/
$(document).ready(function () {
  $(".contacts__title").click(function (event) {
    $(this).toggleClass("active").next().slideToggle(300);
  });
});

/*Catalog*/
$(document).ready(function () {
  $(".sidebar__title").click(function (event) {
    $(this).toggleClass("active").next().slideToggle(300);
  });
});
/*Goods*/
$(document).ready(function () {
  $(".goods__title").click(function (event) {
    $(this).toggleClass("active").next().slideToggle(300);
  });
});

/*Range_price*/
function outputUpdate(vol) {
  var output = document.querySelector("#volume");
  output.value = vol;
}

/*Валидация формы JS*/
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append("image", formImage.files[0]);

    if (error === 0) {
      form.classList.add("_sending");
      let responce = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (responce.ok) {
        let result = await responce.json();
        alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Ошибка");
        form.classList.remove("_sending");
      }
    } else {
      alert(
        "К сожалению в данный момент невозможно произвести регистрацию на сайте. Приносим свои извенения."
      );
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  //Функция теста email(проверяет )
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});
