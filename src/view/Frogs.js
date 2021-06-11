const getFrogElement = frog => {
    const newFrog = document.createElement('div');

    newFrog.className = 'frog';
    if (frog.id !== null) {
        newFrog.classList.add(frog.color);
        newFrog.textContent = frog.id;

        newFrog.dataset.id = frog.id;
        newFrog.dataset.color = frog.color;
    }

    return newFrog;
};

const Frogs = (targetElement, {frogs}, events) => {
    const newFrogs = targetElement.cloneNode(true);
    newFrogs.innerHTML = '';
    newFrogs.style.width = `${frogs.length * 6}rem`;

    frogs
        .map(getFrogElement)
        .forEach(elem => newFrogs.appendChild(elem));

    newFrogs.addEventListener('click', event => {
        const frogElement = event.target;
        const index = frogs.findIndex(frog => {
            return (frog.id === +frogElement.dataset.id
                && frog.color === frogElement.dataset.color);
        });
        if(index === -1) return;
        events.moveFrog(index);
    });
    return newFrogs;
};

export default Frogs;