import React from 'react';
import classnames from 'classnames';

var IonTabs = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    platform: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  render() {
    var platform = this.props.platform;

    var classes = classnames(
      this.props.customClasses,
      {'tabs-top tabs-striped tabs-icon-left':  platform.isAndroid}
    );
    return (
      <div className={ classes } >
        <div className="tabs">
          { this.props.children }
        </div>
      </div>
    );
  }
});

export default IonTabs;

// @@@@@@@@@@@@@@@@ implement dynamic stuff, see https://github.com/meteoric/meteor-ionic/blob/master/components/ionTabs/ionTabs.js
