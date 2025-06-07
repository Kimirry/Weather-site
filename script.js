const apikey = 'd8c43b8c056498561bb70e17195afcf6';
const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}&units=metric`);

        if (!response.ok) {
            if (response.status === 404) {
                alert("City not found!");
            } else if (response.status === 401) {
                alert("Invalid API key.");
            } else {
                alert("An error occurred: " + response.statusText);
            }
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/cloudy.webp";
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "sunny.webp";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rainy.webp"
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.webp"
    }else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/clooudy.webp"
    }

    document.querySelector(".weather").style.display = "block";

    } catch (error) {
        alert("Failed to fetch data. Please check your connection.");
        console.log(error);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});
