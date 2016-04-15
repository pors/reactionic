import React from 'react';
import classnames from 'classnames';

var IonView = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  contextTypes: {
    ionSetTransitionDirection: React.PropTypes.func
  },
  componentWillUnmount: function() {
    if (this.context.ionSetTransitionDirection) {
      this.context.ionSetTransitionDirection('forward');
    }
  },
  render() {
    var classes = classnames(
      {'view': true,
       'nav-view-stage': true},
      this.props.customClasses
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonView;
