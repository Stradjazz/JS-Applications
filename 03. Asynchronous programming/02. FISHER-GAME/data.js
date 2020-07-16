function host(endpoint) {
    return `https://fisher-game.firebaseio.com/${endpoint}.json`;
}

export async function listAllCatches() {
    const response = await fetch(host("catches"));
    const data = await response.json();
    return data;
}

export async function createNewCatch(newObj) {
    const response = await fetch(host("catches"), {
        method: "POST",
        body: JSON.stringify(newObj)
    });

    return response;
}

export async function updateCatch(id, updObj) {
    const response = await fetch(host(`catches/${id}`), {
        method: "PUT",
        body: JSON.stringify(updObj)
    });

    return response;
}

export async function deleteCatch(id) {
    const response = await fetch(host(`catches/${id}`), {
        method: "DELETE"
    });
    return response;
}