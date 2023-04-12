const input=document.querySelector('input');
const button=document.querySelector('.button');
const ip=document.querySelector('.ip');
const locate=document.querySelector('.locate');
const isp=document.querySelector('.isp');
const time=document.querySelector('.time');
const key='at_hOAiLmWr4DRNtsRSuDdy1VezzlurP';




const map = L.map('map').setView([40.4063387, 49.8225675], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


fetch('https://api.ipify.org')
.then((res)=>res.text())
.then((ip)=>{
input.value=ip;
getUrl();
})



button.addEventListener('click',(e)=>{
    if(input.value!==''){
       getUrl(); 
    } 
})
input.addEventListener('keyup',(e)=>{
    if(input.value!==''){
        if(e.code=='Enter'){
    getUrl();
}
    }
})


async function getUrl(){
    const checkIpAddress=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const checkDomain=/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i;
    try{
        const res= await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}&${checkIpAddress.test(input.value) ? `ipAddress=${input.value}`: checkDomain.test(input.value) ? `domain=${input.value}` : "" }`);
        
        const url=await res.json();
        console.log(url)
        ip.innerHTML=url.ip;
        locate.innerHTML=`${url.location.country} ${url.location.region} ${url.location.postalCode}`
        time.innerHTML=url.location.timezone
        isp.innerHTML=url.isp;
        showMap(url.location.lat,url.location.lng);
        
    }
    catch{
        alert('Please enter valid IP or Domain address');
        fetch('https://api.ipify.org')
.then((res)=>res.text())
.then((ip)=>{
input.value=ip;
getUrl();
})

        
    }

}

function showMap(x,y){
    map.setView([x,y],13);
     L.marker([x, y]).addTo(map);
    
}

