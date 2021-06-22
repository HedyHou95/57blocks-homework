import React from 'react';
import service from './googleMapService';
import conf from '../../conf/conf';
import './googleMap.scss';
import Util from '../../services/util';

export default class GoogleMap extends React.Component{
	constructor(props) {
		super(props);
		this.centerPoint = null;
		this.points = null;
		this.isGoogleMapReady = service.isGoogleMapReady();
		this.shouldRerender = false;
		this.markersChanged = false;
		this.focusMakerChanged = false;
		this.shouldClearMarkerChanged = false;
	}

	_init() {
		service
      .drawMap(document.getElementById('map'), conf.googleMap.defaultCoords)
		return this;
	}

	_drawCenterPoint(newCenterPoint, centerPoint){
    this.centerPoint = service.plotCenterPoint(newCenterPoint, centerPoint);
    return this;
  }

	componentDidMount() {
		this._init()._drawCenterPoint(conf.googleMap.defaultCoords, this.centerPoint);
	}

	componentWillReceiveProps(props){
		this.shouldRerender = Util.isPropsChanged(props, this.props);
		if(this.shouldRerender) {
			this.markersChanged = Util.isPropsChanged(this.props.markers, props.markers);
			this.focusMakerChanged = Util.isPropsChanged(this.props.focusMakerId, props.focusMakerId);
			this.shouldClearMarkerChanged = Util.isPropsChanged(this.props.shouldClearMarker, props.shouldClearMarker);
		}
	}

	shouldComponentUpdate() {
		return true;
	}

	_findCenterPointData() {
		let markers = this.props.markers;
		let centerPointData = markers.filter((marker)=>{
			return marker.id == this.props.focusMakerId
		})

		return centerPointData[0];
	}

	componentDidUpdate(){		
		if(this.markersChanged) {
			if(this.points&&this.points.length) {
				service.clearPoints(this.points);
			}
			service.setZoom(conf.googleMap.zoom);
			this.points = service.plotPoints(this.props.markers, conf.googleMap.icon);
		}

		if(this.focusMakerChanged) {
			let marker = this._findCenterPointData();
			this._drawCenterPoint(marker.coords, this.centerPoint);
			service.moveToMapCenter(marker.coords);
		}

		if(this.shouldClearMarkerChanged) {
			service.clearPoints(this.points);
			service.clearPoint(this.centerPoint);
		}
	}

	render() {
		return (
			<div>
				<div id="map"></div>			
			</div>
		)
	}
}