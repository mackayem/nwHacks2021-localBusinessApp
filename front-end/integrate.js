function include(file) { 

    var script = document.createElement('script'); 
    script.src = file; 
    script.type = 'text/javascript'; 
    script.defer = true; 
    
    document.getElementsByTagName('head').item(0).appendChild(script); 
    
    } 

include('../index.js'); 

async function getWeather() {
    const res = await fetch(`/weather`)
    const data = await res.json() 
    return data
}
async function getLocation() {
    const res = await fetch(`/location`)
    const data = await res.json() 
    return data
}
async function getAddress() {
    const res = await fetch(`/address`)
    const data = await res.json() 
    return data
}

    