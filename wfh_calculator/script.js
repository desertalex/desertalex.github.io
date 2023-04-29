function fetchData(url) {
    let options = {
        headers: {
            Accept: 'application/json',
        }
    }
    console.log(fetch(url, options).then(response => response.json()))
    return fetch(url, options).then(response => response.json())
}

async function addYearsToSelect() {
    var years;
    let url = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/year';
    await fetchData(url).then(res => {years = res});
    document.getElementById('year').add(new Option('Year', ''))
    years.menuItem.forEach(element => {
        document.getElementById('year').add(new Option(element.text, element.value))
    });
    
}
document.getElementById('year').addEventListener('load', addYearsToSelect())

async function addMakeToSelect() {
    console.log('addmaketoselect called')
    var yearElement = document.getElementById('year');
    if (yearElement.value != '') {
        let year = yearElement.options[yearElement.selectedIndex].value;
        if (year != '') {
            var makes;
            let url = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=' + year;
            await fetchData(url).then(res => {makes = res});
            document.getElementById('make').add(new Option('Make', ''))
            makes.menuItem.forEach(element => {
                document.getElementById('make').add(new Option(element.text, element.value))
            });
        }
    }
}
document.querySelector('#year').addEventListener('change', addMakeToSelect)

async function addModelToSelect() {
    console.log("addmodeltoselect called");
    var yearElement = document.getElementById('year');
    var makeElement = document.getElementById('make');
    if (yearElement.value != '' && makeElement.value != '') {
        let year = yearElement.options[yearElement.selectedIndex].value;
        let make = makeElement.options[makeElement.selectedIndex].value;
        if (year != '' && make != '') {
            var models;
            let url = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=' + year + '&make=' + make;
            await fetchData(url).then(res => {models = res});
            document.getElementById('model').add(new Option('Model', ''))
            models.menuItem.forEach(element => {
                document.getElementById('model').add(new Option(element.text, element.value))
            });
        }
    }
}
document.querySelector('#make').addEventListener('change', addModelToSelect)

async function addModelToSelect() {
    console.log("addmodeltoselect called");
    var yearElement = document.getElementById('year');
    var makeElement = document.getElementById('make');
    if (yearElement.value != '' && makeElement.value != '') {
        let year = yearElement.options[yearElement.selectedIndex].value;
        let make = makeElement.options[makeElement.selectedIndex].value;
        if (year != '' && make != '') {
            var models;
            let url = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=' + year + '&make=' + make;
            console.log(url);
            await fetchData(url).then(res => {models = res});
            document.getElementById('model').add(new Option('Model', ''))
            models.menuItem.forEach(element => {
                document.getElementById('model').add(new Option(element.text, element.value))
            });
        }
    }
}
document.querySelector('#make').addEventListener('change', addModelToSelect)

async function addOptionToSelect() {
    console.log("addoptionstoselect called");
    var yearElement = document.getElementById('year');
    var makeElement = document.getElementById('make');
    var modelElement = document.getElementById('model');
    if (yearElement.value != '' && makeElement.value != '' && modelElement.value != '') {
        let year = yearElement.options[yearElement.selectedIndex].value;
        let make = makeElement.options[makeElement.selectedIndex].value;
        let model = modelElement.options[modelElement.selectedIndex].value;
        if (year != '' && make != '' && model != '') {
            var options;
            let url = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=' + year + '&make=' + make + '&model=' + model;
            console.log(url);
            await fetchData(url).then(res => {options = res});
            document.getElementById('option').add(new Option('Option', ''))
            options.menuItem.forEach(element => {
                document.getElementById('option').add(new Option(element.text, element.value))
            });
        }
    }
}
document.querySelector('#model').addEventListener('change', addOptionToSelect)

async function getCarData() {
    var optionElement = document.getElementById('option');
    if (optionElement.value != '') {
        let vehicleId = optionElement.options[optionElement.selectedIndex].value;
        if (vehicleId != '') {
            var data;
            let url = 'https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/' + vehicleId;
            // let url = 'https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/26425'
            console.log(url)
            // TODO some URLs do not return data presumably because the vehicle is too new
            await fetchData(url).then(res => {data = res});
            console.log(data.avgMpg);
            document.getElementById('avgMpg').textContent += ('Average MPG: ' + data.avgMpg);
        }
    }
}

// TODO sometimes json objects are lists and sometimes are dictionary without list. If it is naked dictionary then it doesnt work

// TODO clear options in select if dependent select is chosen



