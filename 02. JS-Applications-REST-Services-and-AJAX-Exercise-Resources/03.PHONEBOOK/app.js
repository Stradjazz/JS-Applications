import * as api from './data.js';
import addElement from './dom.js';

window.addEventListener('load', () => {
    const list = document.querySelector('#phonebook');
    const inputPerson = document.querySelector('#person');
    const inputPhone = document.querySelector('#phone');

    document.querySelector('#btnLoad').addEventListener('click', renderPhonebook);
    document.querySelector('#btnCreate').addEventListener('click', addNewEntry);

    async function renderPhonebook() {
        const data = await api.getData();

        list.innerHTML = '';
        
        Object.entries(data).forEach(([id, entry]) => createElement(id, entry));
    }

    function createElement(id, entry) {
        const deleteBtn = addElement('button', 'Delete');
        const element = addElement('li', [
            addElement('span', `${entry.person}: ${entry.phone}`),
            deleteBtn
        ]);
        deleteBtn.addEventListener('click', async () => {
            try {
                await api.deleteEntry(id);
                element.remove();
            } catch (err) {
                alert(err.message);
                console.error(err);
            }
                
        });
        list.appendChild(element);
    }

    async function addNewEntry() {
        const person = inputPerson.value;
        const phone = inputPhone.value;

        if (person === '') {
            inputPerson.value = 'Please, write a valid name';
            return;
        } else if(phone === '') {
            inputPhone.value = 'Please, enter a valid phone number';
            return;
        }

        const entry = {
            person,
            phone
        };

        const result = await api.createEntry(entry);
        const id = Object.keys(result)[0];

        createElement(id, result[id]);

        inputPerson.value = '';
        inputPhone.value = '';
    }
});