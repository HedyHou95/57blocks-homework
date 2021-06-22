import Util from '../services/util'
import GoogleMap from '../services/googleMap';

function IndexService() {
	this.googleMap = new GoogleMap();
}


IndexService.prototype.isGoogleMapReady = function() {
	return this.googleMap.isGoogleMapReady();
}

IndexService.prototype.generateData = function(count) {
	let data = [];
	for(let i=0; i<count;i++) {
		let lat = Util.random(50,0);
		let lng = Util.random(60,60);
		let marker = {
			id: i,
			coords: {
				lat: lat,
				lng: lng
			}
		}
		data.push(marker);
	}
	return data;
}

export default new IndexService();