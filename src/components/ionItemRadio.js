import React from 'react';
import classnames from 'classnames';

var IonItemRadio = React.createClass({
  propTypes: {
    'checked': React.PropTypes.bool,
    'name': React.PropTypes.string,
    'value': React.PropTypes.string,
    'handleChange': React.PropTypes.func,
    'icon': React.PropTypes.string,
    'label': React.PropTypes.string,
    'customClasses': React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      'checked': false,
      'name': 'radio-group',
      'value': '',
      'handleChange': () => {},
      'icon': 'checkmark',
      'label': '',
      'customClasses': ''
    };
  },
  handleChange: function (e, value) {
    // to make this work on iOS devices, the input.onChange event
    // was replaced by an onClick event on the label element. 
    e.preventDefault();
    if (this.props.handleChange)
      this.props.handleChange(this.props.name, value);
  },
  render() {
    var classes = classnames(
      {'item-content': true},
      this.props.customClasses
    );
    var iconClasses = 'radio-icon ion-' + this.props.icon;
    return (
      <label className="item item-radio"
             onClick={(e) => {this.handleChange(e, this.props.value)}} >
	<input type="radio"
               onChange={() => {}}
               name={this.props.name}
               checked={this.props.checked} />
        <div className="radio-content">
	  <div className={classes}>
	    {this.props.label}
	  </div>
	  <i className={iconClasses}></i>
        </div>
      </label>
    );
  }
});

export default IonItemRadio;

