import Frogs from './Frogs';
import Logs from './Logs';

const App = (targetElement, state, events) => {
    const element = targetElement.cloneNode(true);

    const $frogs = element.querySelector('.frogs');
    $frogs.replaceWith(Frogs($frogs, state, events));

    const $logs = element.querySelector('.logs');
    $logs.replaceWith(Logs($logs, state));

    const $undo = element.querySelector('.undo');
    $undo.addEventListener('click', e => events.undo());

    return element;
};

export default App;