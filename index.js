//RANDOM BACKGROUND IMAGE FROM UNSPLASH
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json()) //convert response to json
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`; //set background image and author
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    //default background image and author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
)`;
    document.getElementById("author").textContent = `By: Qingbao Meng`;
  });

//DOGECOIN INFO FROM COINGECKO
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      //if response is not successful
      throw Error("Something went wrong"); //throw this error
    }
    return res.json(); //if success, convert to json
  })
  .then((data) => {
    //display dogecoin logo and info
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
    document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
  })
  .catch((err) => console.error(err)); //catches/logs error

//DISPLAYING CURRENT TIME
function getCurrentTime() {
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const mili = currentTime.getSeconds();

  const amORpm = hours < 12 ? "AM" : "PM"; //if hours is less than 12 show am if not pm

  time.textContent = `${hours}:${minutes}:${mili} ${amORpm}`;
}

setInterval(getCurrentTime, 1000); //calling the time function

// WEATHER
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});
