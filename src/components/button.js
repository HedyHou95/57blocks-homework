import React, {Component} from 'react';
import Events from '../services/events'

/*
  * @Component Button
  *
  * @params:
  *     eventName:      {string} - required
  *     id:             {string} - required
  *     type:           {string} - required
  *     text:           {string}
  *     disabled:       {boolean}
  *     className:      {string}
  *     isShowErrorMsg: {boolean}
  *     errorMsg:       {string}
*/

export default class Button extends Component {
  _handleClick (e) {
    let element = e.target;
    Events.trigger(this.props.eventName + '.click', element);
  }

  _handleKeydown (e) {
    if (e.keyCode === 13) {
      this._handleClick(e);
    }
  }

  _buildButton (props) {
    switch (props.type) { 
      case 'button':
        return <button id={props.id} className={props.className} disabled={props.disabled} onClick={this._handleClick.bind(this)} onKeyDown={this._handleKeydown.bind(this)}>
          {props.text}
        </button>;
      case 'a':
        return <p id={props.id} className={props.className}>
          <a href={props.href} target={props.target}>{props.text}</a>
        </p>;
      default:
        break;
    }
  }

  render () {
    if (!this.props.id) {
      return (<div>input component must have an valid and unique id</div>);
    }

    return (
      <div className='cp cp-button'>
        {this._buildButton(this.props)}
        {this.props.isShowErrorMsg && <p className='cp-button__errormssage'>{this.props.errorMsg}</p>}
      </div>
    );
  }
}
