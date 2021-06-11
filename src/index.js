import appView from './view/App';
import {createFrog} from './createObject';

const state = {
    numFrogs: 0,
    frogs: [],
    logs: [],
};

const events = {
    moveFrog: index => {
        const {frogs} = state;
        const frog = frogs[index];
        if ((index === 0 && frog.color === 'black')
            || (index === frogs.length - 1 && frog.color === 'white')) return;

        if (frog.id === null) return;

        console.log(index);

        let moved = false;
        const isValidIndex = index => (0 <= index && index <= frogs.length - 1);

        let oneNextIndex, twoNextIndex;
        if (frog.color === 'white') {
            oneNextIndex = index + 1;
            twoNextIndex = index + 2;
        } else {
            oneNextIndex = index - 1;
            twoNextIndex = index - 2;
        }

        const oneNext = frogs[oneNextIndex];
        const twoNext = isValidIndex(twoNextIndex) && frogs[twoNextIndex];
        if (oneNext.id === null) {
            frogs[index] = oneNext;
            frogs[oneNextIndex] = frog;
        } else if (oneNext.color !== frog.color && twoNext?.id === null) {
            frogs[index] = twoNext;
            frogs[twoNextIndex] = frog;
        } else {
            return;
        }

        render();
    },
    undo: () => {

        render();
    },
};

const render = () => {
    window.requestAnimationFrame(() => {
        const app = document.querySelector('.app');
        const newApp = appView(app, state, events);
        app.replaceWith(newApp);
    });
};

window.addEventListener('DOMContentLoaded', event => {
    state.numFrogs = 7;
    const frogs = [];
    for (let i = state.numFrogs; i > 0; i--) {
        frogs.push(createFrog(i, 'white'));
    }
    frogs.push(createFrog(null, null));
    for (let i = 1; i < state.numFrogs + 1; i++) {
        frogs.push(createFrog(i, 'black'));
    }
    state.frogs = [...frogs];

    render();
});