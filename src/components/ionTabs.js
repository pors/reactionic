import React from 'react';
import classnames from 'classnames';

var IonTabs = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    tabsTop: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  contextTypes: {
    ionUpdateHasX: React.PropTypes.func
  },
  componentWillMount: function() {
    if (this.props.tabsTop) {
      this.context.ionUpdateHasX('ionHasTabsTop', true);
    } else {
      this.context.ionUpdateHasX('ionHasTabs', true);
    }
  },
  componentWillUnmount: function() {
    if (this.props.tabsTop) {
      this.context.ionUpdateHasX('ionHasTabsTop', false);
    } else {
      this.context.ionUpdateHasX('ionHasTabs', false);
    }
  },
  render() {
    var classes = classnames(
      {'tabs-top' : this.props.tabsTop},
      this.props.customClasses
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
