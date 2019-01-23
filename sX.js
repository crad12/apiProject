let baseURL = 'https://api.spacexdata.com/v2/rockets';    //Set our baseURL variable//

const searchForm = document.querySelector('form');        //set variable for form tage//
const spaceShips = document.querySelector('ul');          //Set variable for unordered list//


searchForm.addEventListener('submit', fetchSpace);        //Set event listener for submit button//

function fetchSpace(e) {                                  //created function for fetchSpace, set to e for event//
e.preventDefault();                                       //this prevents the page from auto refreshing(auto refreshing is default)//

baseURL = 'https://api.spacexdata.com/v2/rockets';       //placed our baseURL inside of function so that it selects from the approrpriate subfolder listed below in ifElse statement//

let select = document.querySelector('select').value; //Created this to handle what happens in drop-down menu, use ifElse statement below//

if(select !== '') {                                 // if variable "select" does not equal 'blank'//
    if(select === 'Falcon 1') {                     // if Falcon 1 is selected//
        baseURL += "/falcon1";                      //use baseURL + the added id(assigned in API) /falcon1//
    } else if (select === 'Falcon 9') {             //if Falcon 9 is selected//
        baseURL += '/falcon9';                      //use baseURL + the added id(assigned in API) /falcon1//
    } else if (select === 'Falcon Heavy') {         //if Falcon Heavy is selected//
        baseURL += '/falconheavy';                  //use baseURL + the added id(assigned in API) /falconheavy//
    } else if (select === "Big Falcon Rocket") {    //if Big Falcon Rocket is selected//
        baseURL += '/bfr';                          //use baseURL + the added id(assigned in API) /bfr//
    } 
};                                                 //Closed the function//

fetch(baseURL).then(result => {                    //created fetch function of baseURL to bring json data as requested//
    //console.log(result.json());
    return result.json()
})
.then( json => {                                  //created function to display rockets inside of json//
    //console.log(json); 
    displayRockets(json);
});


function displayRockets(json) {                  //created function of displayRockets//
    while (spaceShips.firstChild) {              //This clears out previous search results when submitting for more//
        spaceShips.removeChild(spaceShips.firstChild);
    } 

    console.log('Results:', json);              //This console.log allows me to get the info I need//
    if (Array.isArray(json) === true) {         //created conditional to search in Array because rockets are in array in json//
        json.forEach(option => {                //method to get each rockt option inside of array//
            //console.log(option);
            returnInfo(option);                 //run the conditional to return info of each option//
        });    
    } else {
        returnInfo(json);                      //run a conditional to return info from json//
    }
}

function returnInfo(json) {                    //created this function to start declaring all of the information we want to display, these are the variables we created in the "let" down below//
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


}

