import * as data from "./data.js";
import * as dom from "./dom.js"

window.addEventListener("load", () => {
    // CATCHES
    const catchesDiv = document.querySelector("#catches");

    // LOAD
    const loadButton = document.querySelector(".load");
    loadButton.addEventListener("click", getAll);

    // ADD
    let addAngler = document.querySelector("#addForm input.angler");
    let addWeight = document.querySelector("#addForm input.weight");
    let addSpecies = document.querySelector("#addForm input.species");
    let addLocation = document.querySelector("#addForm input.location");
    let addBait = document.querySelector("#addForm input.bait");
    let addCaptureTime = document.querySelector("#addForm input.captureTime");

    const addButton = document.querySelector(".add");
    addButton.addEventListener("click", addCatch);

    async function getAll() {
        catchesDiv.innerHTML = ""
        const allCatchesData = await data.listAllCatches();

        let legend = document.querySelector("legend");

        if (allCatchesData === undefined || allCatchesData === null) {
            legend.textContent = "NO RESULTS FOUND!";
            legend.style.color = "#FF0000";
        } else {
            legend.textContent = "Catches";
            legend.style.color = "#000000";
            for (let key of Object.keys(allCatchesData)) {
                let obj = allCatchesData[key];

                let currentDiv = document.createElement("div");
                currentDiv.setAttribute("class", "catch");
                currentDiv.setAttribute("data-id", key);

                let updateButton = document.createElement("button");
                updateButton.setAttribute("class", "update");
                updateButton.textContent = "Update";

                let deleteButton = document.createElement("button");
                deleteButton.setAttribute("class", "delete");
                deleteButton.textContent = "Delete";

                currentDiv.innerHTML = dom.customizeCatchesInnerHTML(
                    obj.angler, obj.weight, obj.species, obj.location, obj.bait, obj.captureTime);

                currentDiv.appendChild(updateButton);
                currentDiv.appendChild(deleteButton);

                catchesDiv.appendChild(currentDiv);

                updateButton.addEventListener("click", updateCatchDiv);

                async function updateCatchDiv(e) {
                    let divToUpdate = e.target.parentNode;
                    let idToUpdate = divToUpdate.attributes[1].value;

                    let anglerToUpdate = divToUpdate.querySelector("input.angler");
                    let weightToUpdate = divToUpdate.querySelector("input.weight");
                    let speciesToUpdate = divToUpdate.querySelector("input.species");
                    let locationToUpdate = divToUpdate.querySelector("input.location");
                    let baitToUpdate = divToUpdate.querySelector("input.bait");
                    let captureTimeToUpdate = divToUpdate.querySelector("input.captureTime");

                    let objToUpdate = {
                        "angler": anglerToUpdate.value,
                        "weight": weightToUpdate.value,
                        "species":  speciesToUpdate.value,
                        "location": locationToUpdate.value,
                        "bait": baitToUpdate.value,
                        "captureTime": captureTimeToUpdate.value,
                    };

                    const itemToUpdate = await data.updateCatch(idToUpdate, objToUpdate)
                }

                deleteButton.addEventListener("click", deleteCatchDiv);

                async function deleteCatchDiv(e) {
                    let divToDelete = e.target.parentNode;
                    let idToDelete = divToDelete.attributes[1].value;
                    const itemToDelete = await data.deleteCatch(idToDelete)
                    divToDelete.remove()
                }
            }
        }
    }

    async function addCatch() {
        if (addAngler.value !== "" && addWeight.value !== "" &&
            addSpecies.value !== "" && addLocation.value !== "" &&
            addBait.value !== "" && addCaptureTime.value !== "") {

            let newObj = {
                "angler": addAngler.value,
                "weight": addWeight.value,
                "species":  addSpecies.value,
                "location": addLocation.value,
                "bait": addBait.value,
                "captureTime": addCaptureTime.value,
            };

            const itemToAdd = await data.createNewCatch(newObj);

            addAngler.value = "";
            addWeight.value = "";
            addSpecies.value = "";
            addLocation.value = "";
            addBait.value = "";
            addCaptureTime.value = "";
        }
    }
})