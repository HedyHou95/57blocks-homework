import GoogleMap from '../../services/googleMap';

function Service() {
	this.googleMap = new GoogleMap();
}

Service.prototype.isGoogleMapReady = function() {
	return !this.googleMap;
}

Service.prototype.drawMap = function(mapElement, coords){
	this.googleMap.draw(mapElement, coords);
	return this;
}

Service.prototype.plotCenterPoint = function(coords, prevPoint = null){
	this.clearPoint(prevPoint);
	return this.plotPoint(coords);
}

Service.prototype.clearPoints = function(points = []){
	points.forEach((point) => {
		this.clearPoint(point.mapPin);
	});
	return this;
}

Service.prototype.clearPoint = function(point){
  this.googleMap.clearPoint(point);
	return this;
}

Service.prototype.plotPoints = function(entities = [], icon){

	if(!entities.length){
		return [];
	}

	let pointsArr = [];

	entities.forEach((entity) => {
		pointsArr.push({
      entity: entity,
      mapPin: this.plotPoint(entity.coords, icon)
    });
	});

	return pointsArr;

}


Service.prototype.plotPoint = function(coords, icon){
  return this.googleMap.plotPoint(coords, {
    icon: icon
  });
}

Service.prototype.moveToMapCenter = function (coords) {
  this.googleMap.moveToPoint(coords);
  return this;
};

Service.prototype.polygon = function(triangleCoords) {
	return this.googleMap.polygon(triangleCoords);
}

Service.prototype.ChangePolygonFillColor = function(fillColor) {
	this.googleMap.ChangePolygonFillColor(fillColor);
	return this;
}

Service.prototype.setZoom = function (zoom) {
  this.googleMap.setZoom(zoom);
  return this;
};


Service.prototype.changePolygonFillColor = function(polygon, strokeColor, fillColor) {
	this.googleMap.changePolygonFillColor(polygon);
	return this;
}

export default new Service();