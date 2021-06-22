import React, {Component} from 'react';
/*
  * @Component MarkerLists
  *
  * @params:
  *     id:             {string} 
  *     className:      {string}
  *     handleClick:    Function
*/

export default class MarkerLists extends Component {
	_handleClick(e){
    let target = null;

		if(e.target.localName === 'li'){
			target = e.target;
		}else {
			target = e.target.parentElement
		}

		if (this.props.handleClick) {
      this.props.handleClick(target);
    }
	}

	_renderLists(markers) {
		let layout = [];
		markers.forEach((marker,index)=>{
			layout.push(<li key={`${marker.id}-${index}`} data-id={marker.id} onClick={this._handleClick.bind(this)} className="marker-list">
				<p><span>Id:</span>{marker.id}</p>
				<p><span>Lat:</span>{marker.coords.lat}</p>
				<p><span>Lng:</span>{marker.coords.lng}</p>
			</li>)
		})
		return layout;
	}

	render(){
		let layout = this._renderLists(this.props.markers)
		return(
			<div id={this.props.id} className={`marker-container ${this.props.className}`}>
				{
					this.props.markers.length >0 ? <div>
						<h1>Markers:</h1>
						<ul className="marker-lists">
							{layout}
						</ul>
					</div>
					: <div><h1>No Marker Info</h1></div>
				}
			</div>
		)
	}
}