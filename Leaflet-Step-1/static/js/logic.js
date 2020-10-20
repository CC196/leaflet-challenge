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
        zoom: 3,
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
      {pointToLayer: (feature, latlng) => {console.log(latlng.alt+chooseColor(latlng.alt))
        return new L.Circle(latlng,
        {radius:markerSize(feature.properties.mag),
          color:"#636363",fillColor: chooseColor(latlng.alt),fillOpacity:1,weight: 1});},
    
      onEachFeature: onEachFeature
    });

    createMap(earthquakes);
};

function markerSize(num){
  return num*50000;
}

function chooseColor(depth) {
  var color;
  if(depth < 10){
    color = "#ffffd4"
  }else if(10 <= depth && depth < 30){
    color = "#fee391"
  }else if(30 <= depth && depth < 50){
    color = "#fec44f"
  }else if(50 <= depth && depth < 70){
    color = "#fe9929"
  }else if(70 <= depth && depth < 90){
    color = "#d95f0e"
  }else{
    color = "#993404"
  };
  return color;
};

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data){
    createFeatures(data.features);
});
