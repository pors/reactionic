import React from 'react';
import classnames from 'classnames';

var IonIcon = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  render() {
    var classes = classnames(
      {'icon': true},
      'ion-' + this.props.icon,
      this.props.customClasses
    );
    return (
      <i className={classes}></i>
    );
  }
});

export default IonIcon;

