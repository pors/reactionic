import React from 'react';
import classnames from 'classnames';

var IonSideMenu = React.createClass({
    propTypes: {
      side: React.PropTypes.string,
      customClasses: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      side: 'left',
      customClasses: ''
    };
  },
  render() {
    var classes = classnames(
      'snap-drawer',
      'menu-' + this.props.side,
      'snap-drawer-' + this.props.side,
      this.props.customClasses
    );
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});

export default IonSideMenu;
