import appView from './view/App';
import {createFrog} from './createObject';

const state = {
    numFrogs: 3,
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

        let moved = false;
        const isValidIndex = index => (0 <= index && index <= frogs.length - 1);

        const c = frog.color === 'white' ? 1 : -1;
        const oneNextIndex = index + c;
        const twoNextIndex = index + 2 * c;

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
        events.addLog(frog);
        render();
    },
    addLog: frog => {
        state.logs.push(frog);
        render();
    },
    undo: () => {
        const len = state.logs.length;
        if (len === 0) return;
        const recent = state.logs[len - 1];
        state.logs.pop();
        const {frogs} = state;
        const pos = frogs.findIndex(frog => frog === recent);

        const c = recent.color === 'black' ? 1 : -1;
        const oneNextIndex = pos + c;
        const twoNextIndex = pos + 2 * c;
        const oneNext = frogs[oneNextIndex];
        if (frogs[oneNextIndex].id === null) {
            frogs[oneNextIndex] = recent;
            frogs[pos] = oneNext;
        } else {
            const twoNext = frogs[twoNextIndex];
            frogs[twoNextIndex] = recent;
            frogs[pos] = twoNext;
        }

        render();
    },
    setNumFrogs: value => {
        state.numFrogs = value;
        init();
    },
};

const render = () => {
    window.requestAnimationFrame(() => {
        const app = document.querySelector('.app');
        const newApp = appView(app, state, events);
        app.replaceWith(newApp);
    });
};

document.querySelector('form')
    .addEventListener('submit', e => {
        e.preventDefault();
        const $input = document.querySelector('input');
        events.setNumFrogs(+$input.value);
    });
const init = () => {
    const frogs = [];
    for (let i = state.numFrogs; i > 0; i--) {
        frogs.push(createFrog(i, 'white'));
    }
    frogs.push(createFrog(null, null));
    for (let i = 1; i < state.numFrogs + 1; i++) {

        frogs.push(createFrog(i, 'black'));
    }
    console.log(frogs);
    state.frogs = [...frogs];
    state.logs = [];

    render();
};

init();