function attachEvents() {
    const loadButton = document.querySelector('.load');
    const addButton = document.querySelector('.add');
    const addForm = document.querySelector('#addForm');
    const catches = document.querySelector('#catches');
    const angler = addForm.querySelector('.angler');
    const weight = addForm.querySelector('.weight');
    const species = addForm.querySelector('.species');
    const location = addForm.querySelector('.location');
    const bait = addForm.querySelector('.bait');
    const captureTime = addForm.querySelector('.captureTime');
    catches.addEventListener('click', updateOrDeleteHandler);
    loadButton.addEventListener('click', loadHandler);
    addButton.addEventListener('click', addHandler);

    async function loadHandler(e) {
        let URL = 'https://fisher-game.firebaseio.com/catches.json';
        let result;
        try {
            result = await fetch(URL)
                .then(response => response.json())
                .then(data => data)
        } catch (err) {
            console.log('Error!');
        }
        populateCatches(result);
        return result;
    }

    async function addHandler(e) {
        let URL = 'https://fisher-game.firebaseio.com/catches.json';
        let newCatch = {
            "angler": angler.value,
            "weight": weight.value,
            "species": species.value,
            "location": location.value,
            "bait": bait.value,
            "captureTime": captureTime.value
        };

        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCatch),
        })
        angler.value = '';
        weight.value = '';
        species.value = '';
        location.value = '';
        bait.value = '';
        captureTime.value = '';
        loadHandler();
    }

    async function updateOrDeleteHandler(e) {
        if (e.target.textContent === 'Update') {
            updateHandler(e);
        }
        if (e.target.textContent === 'Delete') {
            deleteHandler(e);
        }

    }

    function populateCatches(result) {
        catches.textContent = '';
        let innerHTML = '';
        Object.keys(result).forEach(element => {
            innerHTML +=
                `<div class="catch" data-id="${element}">
            <label>Angler</label>
            <input type="text" class="angler" value="${result[element].angler}" />
            <hr>
            <label>Weight</label>      
            <input type="number" class="weight" value="${result[element].weight}" />
            <hr>
            <label>Species</label>
            <input type="text" class="species" value="${result[element].species}" />
            <hr>
            <label>Location</label>
            <input type="text" class="location" value="${result[element].location}" />
            <hr>
            <label>Bait</label>
            <input type="text" class="bait" value="${result[element].bait}" />
            <hr>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${result[element].captureTime}" />
            <hr>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        </div>`;
        });
        catches.innerHTML = innerHTML;
    }

    async function updateHandler(e) {
        let id = e.target.parentNode.getAttribute('data-id');
        let anglerUpdate = e.target.parentNode.querySelector('.angler');
        let weightUpdate = e.target.parentNode.querySelector('.weight');
        let speciesUpdate = e.target.parentNode.querySelector('.species');
        let locationUpdate = e.target.parentNode.querySelector('.location');
        let baitUpdate = e.target.parentNode.querySelector('.bait');
        let captureTimeUpdate = e.target.parentNode.querySelector('.captureTime');
        let URL = `https://fisher-game.firebaseio.com/catches/${id}.json`;
        let updateCatch = {
            "angler": anglerUpdate.value,
            "weight": weightUpdate.value,
            "species": speciesUpdate.value,
            "location": locationUpdate.value,
            "bait": baitUpdate.value,
            "captureTime": captureTimeUpdate.value
        };

        await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateCatch),
        })

        loadHandler();
    }

    async function deleteHandler(e) {
        let id = e.target.parentNode.getAttribute('data-id');
        let URL = `https://fisher-game.firebaseio.com/catches/${id}.json`;

        await fetch(URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        loadHandler();
    }
}

attachEvents();