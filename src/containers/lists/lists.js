import React from 'react';
import Button from '../../components/button'
import MarkerLists from '../../components/markerLists'
import conf from '../../conf/conf';
import './lists.scss';

export default class List extends React.Component{
	constructor(props){
		super(props)
		this.generateMarkerButton = conf.button.generateMarkerButton;
		this.generatePolygonButton = conf.button.generatePolygonButton;
		this.changePolygonFillColorButton = conf.button.changePolygonFillColorButton;
	}

	render() {
		return(
			<div className="lists">
				<Button
				eventName={this.generateMarkerButton.eventName}
				id={this.generateMarkerButton.id}
				type={this.generateMarkerButton.type}
				text={this.generateMarkerButton.text}
				></Button>
				<Button
				eventName={this.generatePolygonButton.eventName}
				id={this.generatePolygonButton.id}
				type={this.generatePolygonButton.type}
				text={this.generatePolygonButton.text}
				></Button>
				<Button
				eventName={this.changePolygonFillColorButton.eventName}
				id={this.changePolygonFillColorButton.id}
				type={this.changePolygonFillColorButton.type}
				text={this.changePolygonFillColorButton.text}
				></Button>
				<MarkerLists 
				markers={this.props.markers}
				handleClick={this.props.handleClick}></MarkerLists>
			</div>
		)
	}
}