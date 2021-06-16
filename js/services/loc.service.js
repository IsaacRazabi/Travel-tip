import {storageService } from './storage-service.js'

export const locService = {
    getLocs,
    saveLocations,
    addLocation,
    updateLocation
}
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => { 
        setTimeout(resolve, 2000,locs)
    })
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

