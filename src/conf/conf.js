let conf = {
	googleMap: {
		defaultCoords: {
			lat: 30.541,
			lng: 104.065
		},
		maxMakerCount: 500,
		defaultZoom: 8,
		zoom: 4,
		icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
	},
	button: {
		generateMarkerButton: {
			eventName: 'generateMarker',
			id: 'generate-marker',
			type: 'button',
			text: 'Generate Marker'
		},
		generatePolygonButton: {
			eventName: 'generatePolygon',
			id: 'generate-polygon',
			type: 'button',
			text: 'Generate Polygon'
		},
		changePolygonFillColorButton: {
			eventName: 'changePolygonFillColor',
			id: 'change-polygon-fill-color',
			type: 'button',
			text: 'Change Polygon FillColor'
		}
	}
}

export default conf;
