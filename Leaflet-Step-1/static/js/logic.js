function createMap(EQ){
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });


    // var EQLayer = L.layerGroup(EQ);

    var myMap = L.map("map", {
        center: [
          40.52, 34.34
        ],
        zoom: 2,
        layers: [lightmap,EQ]
      });
};
function createFeatures(featuresData){
    // var earthquakes = [];

    // function onEachFeature(feature, layer) {
    //   layer.bindPopup("<h3>" + feature.properties.place +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }
    // featuresData.forEach((geo, id)=>{
    //   place = L.geoJSON(geo,{pointToLayer: (feature, latlng) => {return new L.Circle(latlng,markerSize(latlng.alt));}},
    //   {onEachFeature:onEachFeature}
    //   )
    // earthquakes.push(place)});
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
    var earthquakes = L.geoJSON(featuresData, 
      {pointToLayer: (feature, latlng) => {console.log(feature.properties.place)
        return new L.Circle(latlng,markerSize(latlng.alt));},
    
      onEachFeature: onEachFeature
    });

    createMap(earthquakes);
};

function markerSize(num){
  return num*1000;
}
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data){
    createFeatures(data.features);
});
