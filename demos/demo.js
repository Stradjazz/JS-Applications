let vetClinic = {
    client1: {
        name: 'Gosho',
        pets: [
            {
            petName: 'Arya',
            procedures: ['teeth cleaning', 'general check']
            },
            {
            petName: 'Django',
            procedures: ['general check', 'operation']
            }
        ],
        sum: 0
    },
    client2: {
        name: 'Pesho',
        pets: [
            {
            petName: 'Arwen',
            procedures: ['teeth cleaning', 'general check']
            },
            {
            petName: 'Trasto',
            procedures: ['general check', 'operation']
            }
        ],
        sum: 0
    }
};
console.log(vetClinic.client1.pets.map(pet => pet.procedures.map(x =>{ return x})));