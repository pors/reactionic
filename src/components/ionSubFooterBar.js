import React from 'react';
import classnames from 'classnames';

var IonSubFooterBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    route: React.PropTypes.object.isRequired,
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  contextTypes: {
    ionUpdateHasX: React.PropTypes.func,
    router: React.PropTypes.object.isRequired,
  },
  componentWillMount: function() {
    this.context.ionUpdateHasX('ionHasSubfooter', true);
  },
  componentWillUnmount: function() {
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
