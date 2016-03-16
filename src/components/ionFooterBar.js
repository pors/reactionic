import React from 'react';
import classnames from 'classnames';
import { Lifecycle } from 'react-router';

var IonFooterBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    ionUpdateHasX: React.PropTypes.func.isRequired,
    ionHasTabs: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      ionHasTabs: false
    };
  },
  componentWillMount: function() {
    this.props.ionUpdateHasX('ionHasFooter', true);
  },
  mixins: [ Lifecycle ],
  routerWillLeave(nextLocation) {
    this.props.ionUpdateHasX('ionHasFooter', false);
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-footer': true},
      this.props.customClasses || 'bar-stable', // default class
      {'has-tabs': this.props.ionHasTabs}
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonFooterBar;
