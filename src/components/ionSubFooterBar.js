import React from 'react';
import classnames from 'classnames';
import { Lifecycle } from 'react-router';

var IonSubFooterBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string
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
    this.context.ionUpdateHasX('ionHasSubfooter', true);
  },
  mixins: [ Lifecycle ],
  routerWillLeave(nextLocation) {
    this.context.ionUpdateHasX('ionHasSubfooter', false);
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
