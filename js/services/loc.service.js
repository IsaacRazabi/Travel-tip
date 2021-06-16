import {storageService } from './storage-service.js'

export const locService = {
    getLocs,
    saveLocations,
    addLocation,
    updateLocation,
    removeLocation
}
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 , time : 1623865252459 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 , time : 1623865252459}
]

function getLocs() {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            resolve(locs);
        }, 0)
    });
}

function saveLocations(name,position,time){
    if (!(locs.every((location)=>location.position===position))){
        addLocation(name,position,time)
        return
    } 
    locs.forEach((location,idx)=>{
        if(location.position===position) updateLocation(idx,time)
    })
}

function addLocation(name,position,time){
    let location = {
        name,
        lat:position.lat,
        lng:position.lng,
        time,
    }
    locs.push(location)
    storageService.saveToStorage('LOCATION',locs)
}

function updateLocation(time){
locs[idx].time=time
storageService.saveToStorage('LOCATION',locs)
}

function removeLocation(lat,lng){

    locs.forEach((location,idx)=>{
        if(location.lat===lat && location.lng===lng) locs.splice(idx, 1);
    })
    storageService.saveToStorage('LOCATION',locs)
}

