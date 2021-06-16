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
               onGetLocs()
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
            renderTable(locs)
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


let strHtml = '';
function renderTable(names){
    names.forEach(location => {
        strHtml+= `
        <tr>
        <td>location name: ${location.name}</td>
      </tr>
    <tr>
    <td> location lat :${location.lat}</td>
    </tr>
    <tr>
    <td> location lng :${location.lng}</td>
    </tr>
    <tr>
    <td>time of last visit : ${location.time}</td>
    </tr>
    <tr>
    <td>Actions
    <button onclick="onRemoveLocation(${location.lat}, ${location.lng})"> remove location </button>
    <button onclick="onGoto(${location.lat}, ${location.lng})"> go to location </button>
    </td>
        `
    });
    document.querySelector(".info").innerHTML = strHtml;
}

function onRemoveLocation(lat, lng) {
    removeLocation (lat,lng)
    onGetLocs();
  }
  
  
function copyLoacation(){
    console.log('copyLoacation(): copy text')
    var copyText = document.querySelector('input[name="search-location"]')
    copyText.select();
    copyText.setSelectionRange(0, 99999)  //  For mobile devices
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
}
