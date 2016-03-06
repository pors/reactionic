import React from 'react';
import classnames from 'classnames';

var IonSubHeaderBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    hasTabsTop: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      hasTabsTop: false
    };
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-subheader': true},
      this.props.customClasses || 'bar-stable', // default class
      {'has-tabs-top': this.props.hasTabsTop}
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonSubHeaderBar;


// to make it dynamic: call method to set hasSubHeader to true
// and on destroy again to false, see lifecycle events
// @@@@@@@@@@@@@@@@
