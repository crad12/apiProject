let baseURL = 'https://api.spacexdata.com/v2/rockets';

const searchForm = document.querySelector('form');
const spaceShips = document.querySelector('ul');


searchForm.addEventListener('submit', fetchSpace);

function fetchSpace(e) {
e.preventDefault();

baseURL = 'https://api.spacexdata.com/v2/rockets';

let select = document.querySelector('select').value; //Created this to handle what happens in drop-down menu, use ifElse statement below//

if(select !== '') {
    if(select === 'Falcon 1') {
        baseURL += "/falcon1";
    } else if (select === 'Falcon 9') {
        baseURL += '/falcon9';
    } else if (select === 'Falcon Heavy') {
        baseURL += '/falconheavy';
    } else if (select === "Big Falcon Rocket") {
        baseURL += '/bfr';
    }
};

fetch(baseURL).then(result => {
    //console.log(result.json());
    return result.json()
})
.then( json => {
    console.log(json); 
    displayRockets(json);
});


function displayRockets(json) {             
    while (spaceShips.firstChild) {
        spaceShips.removeChild(spaceShips.firstChild);
    } //This clears out previous search results when submitting for more//

    console.log('Results:', json); //This console.log allows me to get the info I need//
    if (Array.isArray(json) === true) {
        json.forEach(option => {
            console.log(option);
            returnInfo(option);
        });    
    } else {
        returnInfo(json);    
    }
}

function returnInfo(json) {
    let name = document.createElement('h3')
    name.innerText = json.name;
    spaceShips.appendChild(name);

    let pic = document.createElement('img');
    pic.src = json.flickr_images['0'];
    spaceShips.appendChild(pic);

    let dm = document.createElement('p');
    dm.innerText = json.diameter.meters;
    spaceShips.appendChild(dm);

    let df = document.createElement('p')
    df.innerText = json.diameter.feet;
    spaceShips.appendChild(df);
    
    let fo = document.createElement('p');
    fo.innerText = json.description;
    spaceShips.appendChild(fo);
    
}

//For Description//
}

//for height//
// let listBar = document.createElement('li');
// let meter = document.createElement
// listBar.innerText = rocket.diameter;
// meter.innerText = rocket//