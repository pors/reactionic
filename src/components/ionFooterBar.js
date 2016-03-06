import React from 'react';
import classnames from 'classnames';

var IonFooterBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    hasTabs: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      hasTabs: false
    };
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-footer': true},
      this.props.customClasses || 'bar-stable', // default class
      {'has-tabs': this.props.hasTabs}
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonFooterBar;


// to make it dynamic: call method to set hasFooter to true
// and on destroy again to false, see lifecycle events
// @@@@@@@@@@@@@@@@
