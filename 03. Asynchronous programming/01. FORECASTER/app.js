import addElement from './dom.js';
import * as data from './data.js';

const symbols = {
    'Sunny': '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast': '&#x2601;',
    'Rain': '&#x2614;',
    'Degrees': '&#176;'
};


window.addEventListener('load', () => {
    const input = document.querySelector('#location');
    const mainDiv = document.querySelector('#forecast');
    const todayDiv = document.querySelector('#current');
    const upcomingDiv = document.querySelector('#upcoming');

    document.querySelector('#submit').addEventListener('click', getForecast);

    async function getForecast(e) {
        const name = input.value;
        let code = '';
        try {
            code = await data.getCode(name);
        } catch (err) {
            input.value = 'Error';
            return;
        }
        
    
        const todayP = data.getToday(code);
        const upcomingP = data.getUpcoming(code);
    
        const [today, upcoming] = [
            await todayP,
            await upcomingP
        ];
        const symbolSpan = addElement('span', '', {className: 'condition symbol'});
        symbolSpan.innerHTML = symbols[today.forecast.condition];  
        
        const todayTemp = addElement('span', '', {className: 'forecast-data'});
        todayTemp.innerHTML = `${today.forecast.low}${symbols.Degrees}/${today.forecast.high}${symbols.Degrees}`;
    
        todayDiv.appendChild(addElement('div', [
            symbolSpan,
            addElement('span', [
                addElement('span', today.name, {className: 'forecast-data'}),
                todayTemp,
                addElement('span', today.forecast.condition, {className: 'forecast-data'}),
    
            ], {className: 'condition'})
        ], {className: 'forecast'}));

        input.value = '';
        const forecastInfoDiv = addElement('div', upcoming.forecast.map(renderUpcoming), {className: 'forecast-info'});
        upcomingDiv.appendChild(forecastInfoDiv);
        mainDiv.style.display = 'block';
    }

    function renderUpcoming(forecast) {
        const symbolSpan = addElement('span', '', {className: 'symbol'});
        symbolSpan.innerHTML = symbols[forecast.condition];

        const tempSpan = addElement('span', '', {className: 'forecast-data'});
        tempSpan.innerHTML = `${forecast.low}${symbols.Degrees}/${forecast.high}${symbols.Degrees}`;
        
        const result = addElement('span', [
            symbolSpan,
            tempSpan,  
            addElement('span', forecast.condition, {className: 'forecast-data'})
        ], {className: 'upcoming'});

        return result;
    }
});