const form = document.querySelector('#testDataForm')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let season = document.querySelector('#season');
    let round = document.querySelector('#round');
    let jsonData = getData(season, round)
    load_data(jsonData)
})

// Get Our Ranger Data
const getData = async(season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season.value}/${round.value}/driverStandings.json`)
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

// create Constants to hold DOM Elements
const DOM_Elements = {
    racer_list: '.racer-list',
}

// Creation of the Ranger List HTML

const create_list = (driverId, position, givenName, familyName, nationality, name, points) => {
    const html = `<tr><td> ${position}</td><td> ${givenName} ${familyName} </td><td>${nationality} </td><td>${name} </td><td>${points}</tr></td>`;
    // document.querySelector(DOM_Elements.racer_list).insertAdjacentHTML('beforeend', html)
    tablebody.innerHTML += html
}
const tablemain = document.querySelector('.table')


// Function to Load Data and display HTML 

const load_data = async (jsonData) => {
    const racers = await jsonData;
    racers.forEach( element => create_list(element.Driver.driverId, element.position, element.Driver.givenName, element.Driver.familyName, element.Driver.nationality,element.Constructors[0].name, element.points))

}

const clear_data = () => {
    tablebody.innerHTML = '';
}