const Logs = (targetElement, {logs}) => {
    const newLogs = targetElement.cloneNode(true);
    newLogs.innerHTML = '';

    logs
        .map(frog => {
            const $log = document.createElement('div');
            $log.textContent = `${frog.color} ${frog.id}`;

            return $log;
        })
        .forEach(elem => newLogs.appendChild(elem));

    return newLogs;
};

export default Logs;