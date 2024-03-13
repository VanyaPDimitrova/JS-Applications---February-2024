async function getInfo() {
    try {
        const url = getUrl();
        const data = await getDta(url);
    
        appendStopName(data);
        appendBusesInfo(data); 
    } catch (error) {
        displayError();
    }
}

function getUrl() {
    const stopId = document.getElementById('stopId').value; 
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    return url;
}

async function getDta(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
}

function appendStopName(data) {
    const busStopName = document.getElementById('stopName');
    busStopName.textContent = data.name;
}

function appendBusesInfo(data) {
    const busesElement = document.getElementById('buses');
    const busesInfo = Object.entries(data.buses);
    
    const listItems = busesInfo.map(([busId, time]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Bus ${busId} arrives in ${time} minutes`;

        return listItem;
    });

    busesElement.replaceChildren(...listItems);
}

function displayError() {
    const stopName = document.getElementById('stopName');
    stopName.textContent = 'Error';
    const result = document.getElementById('buses');
    result.replaceChildren();
}
