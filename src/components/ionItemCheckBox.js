import React from 'react';
import classnames from 'classnames';

var IonItemCheckBox = React.createClass({
  propTypes: {
    'checked': React.PropTypes.bool,
    'handleChange': React.PropTypes.func,
    'color': React.PropTypes.string,
    'label': React.PropTypes.string,
    'customClasses': React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      'checked': false,
      'handleChange': () => {},
      'color': 'stable',
      'label': '',
      'customClasses': ''
    };
  },
  getInitialState: function () {
    return {
      checked: this.props.checked
    };
  },  
  handleChange: function (event) {
    var toggle = this.state.checked ? false : true;
    if (this.props.handleChange)
      this.props.handleChange(toggle);
    this.setState({
      checked: toggle
    });
  },  
  render() {
    var classes = classnames(
      {'checkbox': true},
      'checkbox-' + this.props.color,
      this.props.customClasses
    );
    return (
      <div className='item item-checkbox'>
	<label className={classes}>
	  <input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
	</label>
	{this.props.label}			
      </div>
    );
  }
});

export default IonItemCheckBox;

