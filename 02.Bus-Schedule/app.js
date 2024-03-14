
class Button {
    button;
  
    constructor(id) {
        this.button = document.getElementById(id);
    }
  
    enable() {
        this.button.removeAttribute('disabled');
    }
  
    disable() {
        this.button.setAttribute('disabled','true');
    }
  };

function solve() {
    const departButton = new Button('depart');
    const arriveButton = new Button("arrive");
    const infoBox = document.getElementsByClassName('info')[0];
    setInitialState(infoBox, arriveButton);

    const firstStopId = 'depot';
    let id = firstStopId;
    let stopName = '';

    async function depart() {
        try {
        const nextStop = await getData(id);

        stopName = nextStop.name;
        infoBox.textContent = `Next stop ${stopName}`
        id = nextStop.next;

        departButton.disable();
        arriveButton.enable();
        } catch(error) {
            showError(infoBox, departButton, arriveButton);
        } 
    }

    
    function arrive() {
        infoBox.textContent = `Arriving at ${stopName}`
        departButton.enable();
        arriveButton.disable();
    }

    return {
        depart,
        arrive
    };
}


let result = solve();


function setInitialState(infoBox, arriveButton) {
    arriveButton.disable();
    infoBox.textContent = 'Not Connected';
}

async function getData(id) {
    const url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function showError(infoBox, departButton, arriveButton) {
    infoBox.textContent = 'Error';
    departButton.disable();
    arriveButton.disable();
}
