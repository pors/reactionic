import React from 'react';
import classnames from 'classnames';

var IonView = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    ionSetTransitionDirection: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      ionSetTransitionDirection: null
    };
  },
  componentWillUnmount: function() {
    if (this.props.ionSetTransitionDirection) {
      this.props.ionSetTransitionDirection('forward');
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
        {React.cloneElement(this.props.children, {ionSetTransitionDirection: this.props.ionSetTransitionDirection})}
      </div>
    );
  }
});

export default IonView;
