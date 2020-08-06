
let form = document.querySelector('form');
let select = (e) => document.querySelector(e);
let dataWeather = select('div.dataWeather');


form.addEventListener('submit',
  e => {
    e.preventDefault();
    let city = document.querySelector('input').value;
    console.log(city)
    fetch('/?address='+city)
    .then( response => response.json())
    .then( response => {
      
      dataWeather.style.display = "flex";
      select("div.weather").innerHTML = response.weather;
      select("div.temperature").innerHTML = response.temperature;
      select("div.country").innerHTML = response.country;
      select("div.region").innerHTML = response.region;
      select("div.city").innerHTML = response.city;
    })

})