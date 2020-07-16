function getInfo() {
    const stopId = document.querySelector('#stopId');
    const requestURL = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`;

    const validIds = ['1287', '1308', '1327', '2334'];

    const stopName = document.querySelector('#stopName');
    const busList = document.querySelector('#buses');
    const listItems = Array.from(busList.children);

    if (!validIds.includes(stopId.value)) {
        stopName.textContent = 'Error';
        return;
    }
    if (listItems.length > 0) {
        listItems.forEach(item => item.remove()); //cleans info from older requests    
    }

    fetch(requestURL).then((response) => response.json()).then((result) => showInfo(result));

    function showInfo(data) {
        stopName.textContent = data.name;
        Object.keys(data.buses).forEach((bus) => {
            const currentBus =  document.createElement('li');
            currentBus.textContent = `Bus ${bus} arrives in ${data.buses[bus]}`;
            busList.appendChild(currentBus);
        });    
    }
    stopId.value = '';
    
}

// version with the provided server:
// const requestURL = `http://localhost:3000/businfo/${stopId.value}.json`;