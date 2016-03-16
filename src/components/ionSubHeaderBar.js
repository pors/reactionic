import React from 'react';
import classnames from 'classnames';
import { Lifecycle } from 'react-router';

var IonSubHeaderBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    ionUpdateHasX: React.PropTypes.func.isRequired,
    ionHasTabsTop: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      ionHasTabsTop: false
    };
  },
  componentWillMount: function() {
    this.props.ionUpdateHasX('ionHasSubheader', true);
  },
  mixins: [ Lifecycle ],
  routerWillLeave(nextLocation) {
    this.props.ionUpdateHasX('ionHasSubheader', false);
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-subheader': true},
      this.props.customClasses || 'bar-stable', // default class
      {'has-tabs-top': this.props.ionHasTabsTop}
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonSubHeaderBar;
