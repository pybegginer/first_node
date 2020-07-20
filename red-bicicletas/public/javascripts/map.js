var map = L.map('main_map').setView([6.2759558,-75.556873], 20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([6.276131, -75.555331]).addTo(map);
marker.bindPopup("<b>Home</b>.").openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`[Lat, Lng] = ${e.latlng }`)
        .openOn(map);
}

map.on('click', onMapClick);

//Llamada AJAX

$.ajax({
    dataType: 'json',
    url: 'api/bicicletas',
    success: (result) =>{
        console.log(result);
        result.bicicletas.forEach((bici)=>{
           var mark= L.marker(bici.ubicacion, 
                {title: bici.id,
                color: '#000000'}).addTo(map);
           mark.bindPopup(`<b>${bici.id}: <br>Bicicleta ${bici.color} tipo ${bici.modelo}</b>`).openPopup();

        })
    }
})