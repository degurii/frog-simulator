const getFrogElement = frog => {
    const newFrog = document.createElement('div');
    if(frog.id === null) {
        newFrog.className = 'empty';
        return newFrog;
    }

    newFrog.className = 'frog';
    newFrog.classList.add(frog.color);

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
        const frogElement = event.target;
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