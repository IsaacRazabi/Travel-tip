import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'



window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.copyLoacation = copyLoacation;


function onInit() {
    mapService.initMap()
        .then((map) => {
            console.log('Map is ready');
            map.addListener("click", (event) => {
                mapService.addMarker(event.latLng.toJSON());
                let time = Date.now()
                let name = prompt('what is the name of this location')
               locService.saveLocations(name,event.latLng.toJSON(),time)
               showLocation() 
             });
        })
        .catch(() => console.log('Error: cannot init map'));
}
// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
   
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}


function copyLoacation(){
    console.log('copyLoacation(): copy text')
    var copyText = document.querySelector('input[name="search-location"]')
    copyText.select();
    copyText.setSelectionRange(0, 99999)  //  For mobile devices
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
}
function showLocation() {
    locService.getLocs().then(console.log)
}

let strHtml = '';
function renderTable(names){
    console.log(names);
    let locations = showLocation();
    console.log(locations);
    locations.forEach(location => {
        strHtml+= `
        <tr>
        <td>${location.name}</td>
      </tr>
    <tr>
    <td>${location.lat}</td>
    </tr>
    <tr>
    <td>${location.lng}</td>
    </tr>
    <tr>
    <td>${location.time}</td>
    </tr>
    <tr>
    <td>Actions
    <button onclick="onRemoveLocation(${location.lat}, ${location.lng})"> remove location </button>
    <button onclick="onGoto(${location.lat}, ${location.lng})"> go to location </button>
    </td>
        `
    });
}
document.querySelector(".info").innerHTML = strHtml;
    // document.querySelector("name").innerHTML = position.name;
    // document.querySelector("latitude").innerHTML = position.lat;
    // document.querySelector("longitude").innerHTML = position.lat;
    // document.querySelector("accuracy").innerHTML = 20;
  
    // var date = new Date(time);
    // document.getElementById("timestamp").innerHTML =
    //   date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // initMap(position.coords.latitude, position.coords.longitude);
  
