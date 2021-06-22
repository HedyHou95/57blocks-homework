import conf from '../conf/conf';

/**
 *
 * Class GoogleMap - Centrally deal all google map related operations
 *
 * @param { Object } opts - optional
 *    {
 *      defaultZoom: 8
 *    }
 */

function GoogleMap(){
  window.google = window.google || {};
  this.isReady = !!window.google.maps;
  this.GoogleMap = window.google.maps;
  this.map = null;

}

GoogleMap.prototype.isGoogleMapReady = function() {
  return !!this.GoogleMap;
}

/**
 * Function toGoogleCoords 
 *
 * translate coordinate object into google map coordinate object
 *
 * @param { Object } coords
 *    {
 *      lat: { String or Number } - required,
 *      lng: { String or Number } - required
 *    }
 * @param { Object } filter
 *
 * @return { Object } - google map coordinate object
 */

GoogleMap.prototype.toGoogleCoords = function(coords){
  return new this.GoogleMap.LatLng(parseFloat(coords.lat), parseFloat(coords.lng));
}

/**
 * Function draw
 *
 * draw map on DOM with given coordinate
 *
 * @param { htmlDOM } mapElement
 * @param { Object } coords
 *    {
 *      lat: { String or Number } - required,
 *      lng: { String or Number } - required
 *    }
 * @param { opts } mapElement - optional
 *
 * @return { Object } - Class itself
 */

GoogleMap.prototype.draw = function(mapElement, coords, opts = {}){

  const location = this.toGoogleCoords(coords);
  
  this.map = new this.GoogleMap.Map(mapElement, {
    center: location,
    zoom: opts.zoom || conf.googleMap.defaultZoom,
    fullscreenControl: false,
    mapTypeControl: false
  });

  return this;
}

/**
 * Function plotPoint
 *
 * draw a single point (pin) on map
 *
 * @param { Object } coords
 *    {
 *      lat: { String or Number } - required,
 *      lng: { String or Number } - required
 *    }
 * @param { Object } opts - optional
 *
 * @return { Object } - drawn pin
 */

GoogleMap.prototype.plotPoint = function(coords, opts = {}){
  let body = {
    map: this.map,
    position: {
      lat: parseFloat(coords.lat),
      lng: parseFloat(coords.lng)
    },
    animation: 2,
    icon: opts && opts.icon
  }

  let point = new this.GoogleMap.Marker(body);

  return point;
}

/**
 * Function clearPoint
 *
 * clear a point (pin) on map
 *
 * @param { Object } point
 *
 * @return { Object } - class itself
 */

GoogleMap.prototype.clearPoint = function(point){
  point && point.setMap(null);
  return this;
}

/**
 * Function moveToPoint
 *
 * move map focus to given coordinate
 *
 * @param { Object } coords
 *    {
 *      lat: { String or Number } - required,
 *      lng: { String or Number } - required
 *    }
 *
 * @return { Object } - google map object
 */

GoogleMap.prototype.moveToPoint = function(coords){
  coords = this.toGoogleCoords(coords);
  this.map.panTo(coords);
  return this.map;
}

/**
 * Function polygon
 *
 * draw polygon
 *
 * @param triangleCoords, strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity
 */

GoogleMap.prototype.polygon = function(triangleCoords, strokeColor = "#FF0000", strokeOpacity = 0.8, strokeWeight = 2, fillColor = "#FF0000", fillOpacity = 0.35) {
  let polygon = new this.GoogleMap.Polygon({
    paths: triangleCoords,
    strokeColor: strokeColor,
    strokeOpacity: strokeOpacity,
    strokeWeight: strokeWeight,
    fillColor: fillColor,
    fillOpacity: fillOpacity 
  })

  polygon.setMap(this.map);

  return polygon;
}

GoogleMap.prototype.changePolygonFillColor = function (polygon, strokeColor, fillColor) {
  polygon.setOptions({
    strokeColor: strokeColor,
    fillColor: fillColor
  })
  return this;
}

/**
 * Function setZoom
 *
 * set map zoom
 *
 * @param number zoom
 *  8
 * @return { Object } - google map object
 */

GoogleMap.prototype.setZoom = function (zoom) {
  this.map.setZoom(zoom);
  return this;
};


export default GoogleMap;