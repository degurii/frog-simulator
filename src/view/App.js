import Frogs from './Frogs';

const App = (targetElement, state, events) => {
    const element = targetElement.cloneNode(true);

    const $frogs = element.querySelector('.frogs');
    $frogs.replaceWith(Frogs($frogs, state, events));

    return element;
};

export default App;