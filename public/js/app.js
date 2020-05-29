const form = document.querySelector('form');
const weatherContent = document.querySelector('.weather-content');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = form.location.value;
  if (!city) {
    return;
  }
  document.querySelector('.loader').textContent = 'Loading...';
  fetch(`http://localhost:5000/weather?location=${city}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        document.querySelector('.loader').style.display = 'none';
        weatherContent.style.display = 'block';
        weatherContent.innerHTML = `<h2>${data.error}</h2>`;
      } else {
        document.querySelector('.loader').style.display = 'none';
        weatherContent.style.display = 'block';
        weatherContent.innerHTML = `
                <h2>Weather Condition in ${city}</h2>
                <h3>Feels Like: ${data.body.feels_like}</h3>
                <h3>Max Temp: ${data.body.temp_max}</h3>
                <h3>Min Temp: ${data.body.temp_min}</h3>
                <h3>Description: ${data.body.desc}</h3>
          `;
      }
      form.location.value = '';
    });
});
