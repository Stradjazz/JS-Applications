function attachEvents() {
    const getWeather = document.querySelector('#submit');
    const locationEl = document.querySelector('#location');
    let code = '';
    const URL = 'https://judgetests.firebaseio.com/locations.json';
    let currentURL = `https://judgetests.firebaseio.com/forecast/today/{code}.json`;
    let threeDaysURL = `https://judgetests.firebaseio.com/forecast/upcoming/{code}.json`;

    const currentWeather = document.querySelector('#current');
    const threeDay = document.querySelector('#upcoming');
    const forecast = document.querySelector('#forecast');

    getWeather.addEventListener('click', getWeatherHandler);

    const conditions = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176' // °
    }


    async function getWeatherHandler(e) {
        let response;
        try { response = await fetch(URL); } catch (err) { locationEl.value = 'Error!'; return; }
        let data = await response.json();
        data.forEach(town => {
            if (town.name === locationEl.value) {
                code = town.code;
            }
        });

        if (code !== '') {
            forecast.style = '';
            fetch(currentURL.replace('{code}', code))
                .then(response => response.json())
                .then(function(data) {
                    populateCurrentWeather(data);
                })


            fetch(threeDaysURL.replace('{code}', code))
                .then(response => response.json())
                .then(function(data) {
                    populateUpcomingWeather(data);


                })
        } else {
            locationEl.value = 'Error!';
        }
    }

    function populateCurrentWeather(data) {

        currentWeather.innerHTML = '<div class="label">Current conditions</div>';
        let div = document.createElement('div');
        div.className = 'forecast';
        let spanSymbol = document.createElement('span');
        spanSymbol.className = 'condition symbol';
        spanSymbol.innerHTML = conditions[data.forecast.condition];
        div.appendChild(spanSymbol);
        let spanCondition = document.createElement('span');
        spanCondition.className = 'condition';
        let spanCity = document.createElement('span');
        spanCity.className = 'forecast-data';
        spanCity.textContent = data.name;
        let spanTemperature = document.createElement('span');
        spanTemperature.className = 'forecast-data';
        spanTemperature.textContent = `${data.forecast.low}º/${data.forecast.high}º`;
        let spanWeather = document.createElement('span');
        spanWeather.className = 'forecast-data';
        spanWeather.textContent = data.forecast.condition;
        spanCondition.appendChild(spanCity);
        spanCondition.appendChild(spanTemperature);
        spanCondition.appendChild(spanWeather);
        div.appendChild(spanCondition);
        currentWeather.appendChild(div);
    }

    function populateUpcomingWeather(data) {
        threeDay.innerHTML = '<div class="label">Three-day forecast</div>';
        let div = document.createElement('div');
        div.className = 'forecast-info';
        data.forecast.forEach(day => {
            let spanUpcomming = document.createElement('span');
            spanUpcomming.className = 'upcoming';
            let spanSymbol = document.createElement('span');
            spanSymbol.className = 'symbol';
            spanSymbol.innerHTML = conditions[day.condition];
            let spanCondition = document.createElement('span');
            spanCondition.className = 'condition';
            let spanTemperature = document.createElement('span');
            spanTemperature.className = 'forecast-data';
            spanTemperature.textContent = `${day.low}º/${day.high}º`;
            let spanWeather = document.createElement('span');
            spanWeather.className = 'forecast-data';
            spanWeather.textContent = day.condition;
            spanUpcomming.appendChild(spanSymbol)
            spanUpcomming.appendChild(spanTemperature);
            spanUpcomming.appendChild(spanWeather);
            div.appendChild(spanUpcomming);
            threeDay.appendChild(div);
        })
    }
}

attachEvents();