// connect map to js
var map = L.map('map').setView([2.141725, 117.484784], 9);

// add basemap
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
  });
var GoogleMaps = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: 'Google Maps'
  });
GoogleMaps.addTo(map)
var PolygonKampung = L.geoJSON(polygon_kampung, {onEachFeature : addPopUpandEvents, style: kampungStyle})
PolygonKampung.addTo(map)
var baseMaps = {
  'OSM' : osm,
  'Google Maps' : GoogleMaps
};

var overlayMaps = {
  'Kampung' : PolygonKampung
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

function addPopUpandEvents(feature, layer){
  layer.on({
    click : onMapClick,
    mouseover : highlightFeature,
    mouseout : resetHighlight
  })
}
function popUpName(props){
  console.log(props.DESA)
}
function colorMapping(d){
  return d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}
function kampungStyle(feature){
  return {
    color :'#999',
    weight : 1,
    fillColor : colorMapping(feature.properties.LUAS_DESA),
    fillOpacity : 0.7}
}
function onMapClick(e) {

  window.open("https://www.arcgis.com/apps/dashboards/b7c3a562cbba44d1af97860752c8bdc3");
}

function highlightFeature(e) {
  var layer = e.target;
  // console.log(typeof layer)
  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
  // this.bindPopup(layer.feature.properties.DESA)
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  PolygonKampung.resetStyle(e.target);
  info.update();
}
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML ='<h5>Geoportal CSR Berau Coal</h5>' + (props ?
   '<b>' + props.DESA + '</b><br />' + props.LUAS_DESA + 'km<sup>2</sup>'
   : 'Pilih Kampung');
};

info.addTo(map);
