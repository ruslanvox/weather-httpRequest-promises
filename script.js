// "use strict";
// let userApp = 10;

// if (typeof userApp == "undefined") {
//   alert("Это underfined!");
// }
// try {
//   console.log(userApp);
//   setTimeout(function () {
//     throw new Error(); // вылетит в консоль
//   }, 1000);
// } catch (e) {
//   alert("не сработает");
// }

let weatherButton = document.querySelector(".button1");
let userInput = document.querySelector(".input1");
let userInput2 = document.querySelector(".input2");
const userImage = document.querySelector(".image1");
const userImage2 = document.querySelector(".image2");
const userText = document.querySelector(".text1");
const userText2 = document.querySelector(".text2");

// let weatherData = {};

weatherButton.addEventListener("click", () => {
  ajaxRequest(userInput.value)
    .then((jsonData) => {
      weatherOnscreen(jsonData);
    })
    .then(() => {
      return ajaxRequest(userInput2.value);
    })
    .then((jsonData) => {
      weatherOnscreen2(jsonData);
    });
});
function weatherOnscreen(weatherData) {
  const iconcode = weatherData.icon;
  const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  userImage.src = iconurl;
  userText.innerHTML = weatherData.description;
  //   "response", this.response.weather[0];
}

function weatherOnscreen2(weatherData) {
  const iconcode = weatherData.icon;
  const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  userImage2.src = iconurl;
  userText2.innerHTML = weatherData.description;
  //   "response", this.response.weather[0];
}

// function ajaxRequest(city) {}

function ajaxRequest(city) {
  console.log(city);
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5bf2ec6f9967b27337314ba7941a6425`
    );
    xhr.responseType = "json";
    xhr.onload = function (e) {
      if (this.status == 200) {
        resolve(this.response.weather[0]); // JSON response
      } else alert("Город не найден!");
    };
    xhr.send();
  });
}
