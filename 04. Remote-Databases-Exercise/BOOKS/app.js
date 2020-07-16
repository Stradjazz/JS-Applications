//Всички функции са написани в един файл, за да са улеснени колегите, които проверяват домашното и да не се сблъскват с трудности в сървъра и CORS

window.addEventListener('load', () => {

    document.querySelector('#loadBooks').addEventListener('click', displayBooks);
    const table = document.querySelector('table > tbody');

    async function displayBooks() {
        table.innerHTML = '<tr><td colespan="4">Loading...</td></tr>';
        const books = await getBooks();
        table.innerHTML = '';

        books.sort((a, b) => a.author.localeCompare(b.author))
            .forEach(b => table.appendChild(renderBook(b)));

    }

    function renderBook(book) {
        return addElement('tr', [
            addElement('td', book.title),
            addElement('td', book.author),
            addElement('td', book.isbn),
            addElement('td', [
                addElement('button', 'Edit'),
                addElement('button', 'Delete')
            ])
        ]);
    }
});

// database requests functions
const appId = '08819993-33E8-B702-FF6A-11FDE65D5C00';
const apiKey = '4DDC242E-382B-459F-980C-6F7F2CAAB1CC';

function host(endpoint) {  
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoint}`;    
}

async function getBooks() {
    const response = await fetch(host('books'));
    const data = await response.json();
    return data;
}

async function createBook(book) {
    const response = await fetch(host('books'),{
        method: 'POST',
        body: JSON.stringify(book),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json();
    return data;
}

async function updateBook(book) {
    const response = await fetch(host(`books/${book.objectId}`), {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    return data;
}

async function deleteBook(id) {
    const response = await fetch(host('books/' + id), {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}
//DOM function for creating a new element
function addElement(type, content, attributes) {
    const result = document.createElement(type);

    if (attributes !== undefined) {
        Object.assign(result, attributes);
    }

    if (Array.isArray(content)) {
        content.forEach(append);
    } else {
        append(content);
    }
    function append(node) {
        if (typeof node === 'string' || typeof node === 'number') {
            node = document.createTextNode(node);
        }
        result.appendChild(node);
    }

    return result;
}