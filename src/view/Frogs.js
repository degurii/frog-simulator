const getFrogElement = frog => {
    const newFrog = document.createElement('div');
    if(frog.id === null) {
        newFrog.className = 'empty';
        return newFrog;
    }

    newFrog.className = 'frog';
    newFrog.classList.add(frog.color);

    const $id = document.createElement('span');
    $id.textContent = frog.id;
    newFrog.appendChild($id);

    newFrog.dataset.id = frog.id;
    newFrog.dataset.color = frog.color;

    return newFrog;
};

const Frogs = (targetElement, {frogs}, events) => {
    const newFrogs = targetElement.cloneNode(true);
    newFrogs.innerHTML = '';

    frogs
        .map(getFrogElement)
        .forEach(elem => newFrogs.appendChild(elem));

    newFrogs.style.width = `${frogs.length * 7.5}rem`;

    newFrogs.addEventListener('click', event => {
        const t = event.target;
        const frogElement = t.tagName === 'SPAN' ? t.parentNode : t;
        const index = frogs.findIndex(frog => {
            return (frog.id === +frogElement.dataset.id
                && frog.color === frogElement.dataset.color);
        });
        if (index === -1) return;
        events.moveFrog(index);
    });
    return newFrogs;
};

export default Frogs;