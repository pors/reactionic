import React from 'react';
import classnames from 'classnames';

var IonListButton = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    action: React.PropTypes.string,
    side: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      action: 'delete',
      side: 'left'
    };
  },
  render() {
    var classes = classnames(
      {'enable-pointer-events': true},
      'item-' + this.props.action,
      'item-' + this.props.side + '-edit',
      this.props.customClasses
    );
    return (
      <div className={classes} >
        {this.props.children}
      </div>
    );
  }
});

export default IonListButton;

