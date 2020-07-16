function solve() {
    let currentId = 'depot';
    let nextStop = '';
    let requestURL = `https://judgetests.firebaseio.com/schedule/${currentId}.json`;

    const infoDiv = document.querySelector('#info>.info')
    const departBtn = document.querySelector('input#depart');
    const arriveBtn = document.querySelector('input#arrive');

    function depart() {
        requestURL = `https://judgetests.firebaseio.com/schedule/${currentId}.json`;
        fetch(requestURL).then((response) => response.json()).then((response) => {
            currentId = response.name;
            nextStop = response.next;
            infoDiv.textContent = `Next stop ${currentId}`;
            console.log(currentId, nextStop);
        });
        
        arriveBtn.removeAttribute('disabled');
        departBtn.setAttribute("disabled", "true");
    }

    function arrive() {
        infoDiv.textContent = `Arriving at ${currentId}`;
        currentId = nextStop;
        nextStop = '';
        departBtn.removeAttribute('disabled');
        arriveBtn.setAttribute("disabled", "true");
        console.log(currentId, nextStop);
    }

    return {
        depart,
        arrive
    };
}

let result = solve();