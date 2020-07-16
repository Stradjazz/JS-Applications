export default function addElement(type, content, attributes) {
    const result = document.createElement(type);

    if (attributes !== undefined) {
        Object.assign(result, attributes);
    }

    if (Array.isArray(content)) {
        content.forEach(append);
    } else {
        append(content);
    }
    function append(el) {
        if (typeof el === 'string' || typeof el === 'number') {
            el = document.createTextNode(el);
        }
        result.appendChild(el);
    }

    return result;
}