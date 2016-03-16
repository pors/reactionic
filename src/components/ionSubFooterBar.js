import React from 'react';
import classnames from 'classnames';
import { Lifecycle } from 'react-router';

var IonSubFooterBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    ionUpdateHasX: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  componentWillMount: function() {
    this.props.ionUpdateHasX('ionHasSubfooter', true);
  },
  mixins: [ Lifecycle ],
  routerWillLeave(nextLocation) {
    this.props.ionUpdateHasX('ionHasSubfooter', false);
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
