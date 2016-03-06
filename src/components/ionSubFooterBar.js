import React from 'react';
import classnames from 'classnames';

var IonSubFooterBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-subfooter': true},
      this.props.customClasses || 'bar-stable' // default class
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonSubFooterBar;


// to make it dynamic: call method to set hasSubFooter to true
// and on destroy again to false, see lifecycle events
// @@@@@@@@@@@@@@@@
