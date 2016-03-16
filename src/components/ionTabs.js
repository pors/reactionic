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
  componentWillMount: function() {
    if (this.props.platform.isAndroid) {
      this.props.ionUpdateHasX('ionHasTabsTop', true);
    } else {
      this.props.ionUpdateHasX('ionHasTabs', true);
    }
  },
  componentWillUnmount: function() {
    if (this.props.platform.isAndroid) {
      this.props.ionUpdateHasX('ionHasTabsTop', false);
    } else {
      this.props.ionUpdateHasX('ionHasTabs', false);
    }
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
