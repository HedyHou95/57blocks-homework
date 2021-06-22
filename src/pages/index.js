import React from 'react';
import GoogleMap from '../containers/googleMap/googleMap'
import List from '../containers/lists/lists'
import Events from '../services/events'
import indexService from './indexService';
import googleMapService from '../containers/googleMap/googleMapService'
import conf from '../conf/conf';

import './index.scss';

export default class Index extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			markers: [],
			focusMakerId: '',
			shouldClearMarker:false,
			markerList:[]
		}
		this.polygon = null;
		this.isGoogleMapReady = indexService.isGoogleMapReady();
	}

	_getMarkersCoords() {
		let markers = this.state.markers;
		let coords=[];
		markers.forEach((marker)=>{
			coords.push(marker.coords)
		})

		return coords;
	}

	componentDidMount() {
		Events.listen('generateMarker.click',(target)=>{
			let markers = indexService.generateData(conf.googleMap.maxMakerCount);
			this.setState({
				markers: markers
			})

			this.setState({
				markerList: markers
			})
		})

		Events.listen('generatePolygon.click',(target)=>{
			if(this.state.markerList.length){
				let coords = this._getMarkersCoords();
				this.polygon = googleMapService.polygon(coords);
				this.setState({
					shouldClearMarker:true
				})
				this.setState({
					markerList: []
				})
			}
		})

		Events.listen('changePolygonFillColor.click',(target)=>{
			if(this.polygon) {
				googleMapService.changePolygonFillColor(this.polygon, '#4285f5', '#4285f5');
			}
		})
	}

	_handelMarkerClick(target) {
		this.setState({
			focusMakerId: target.attributes[0].value
		})
	}

	render() {
		return (
			<div>
			{
				this.isGoogleMapReady ? 
				<div>
					<GoogleMap 
						markers={this.state.markers}
						focusMakerId={this.state.focusMakerId}
						shouldClearMarker={this.state.shouldClearMarker}>
					</GoogleMap>
					<List 
						markers={this.state.markerList}
						handleClick={this._handelMarkerClick.bind(this)}>
					</List>
				</div>
				:
				<div className="error-message">
					<h1>
						Google Map is not avaiable, please check your network.
					</h1>
				</div>
			}
			</div>
		)
	}
}