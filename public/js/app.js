const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", e => {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  e.preventDefault();
  const location = search.value;
  search.value = "";
  fetchWeatherInfo(location);
});

const fetchWeatherInfo = location => {
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const { error, location, forecast } = data;
      if (error) {
        messageOne.textContent = error;
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    });
};
