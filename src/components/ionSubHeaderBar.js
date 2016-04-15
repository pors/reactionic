import React from 'react';
import classnames from 'classnames';
import { Lifecycle } from 'react-router';

var IonSubHeaderBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  contextTypes: {
    ionUpdateHasX: React.PropTypes.func,
    ionHasTabsTop: React.PropTypes.bool
  },
  componentWillMount: function() {
    this.context.ionUpdateHasX('ionHasSubheader', true);
  },
  mixins: [ Lifecycle ],
  routerWillLeave(nextLocation) {
    this.context.ionUpdateHasX('ionHasSubheader', false);
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-subheader': true},
      this.props.customClasses || 'bar-stable', // default class
      {'has-tabs-top': this.context.ionHasTabsTop}
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonSubHeaderBar;
