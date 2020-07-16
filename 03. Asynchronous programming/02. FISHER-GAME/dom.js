export function customizeCatchesInnerHTML(name, weight, species, location, bait, captureTime) {
    return `
        <label>Angler</label>
        <input type="text" class="angler" value="${name}" />
        <hr>
        <label>Weight</label>      
        <input type="number" class="weight" value="${weight}" />
        <hr>
        <label>Species</label>
        <input type="text" class="species" value="${species}" />
        <hr>
        <label>Location</label>
        <input type="text" class="location" value="${location}" />
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value="${bait}" />
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${captureTime}" />
        <hr>`;
}