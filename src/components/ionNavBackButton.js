import React from 'react';
import classnames from 'classnames';
import IonButton from './ionButton';

var IonNavBackButton = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    ionSetTransitionDirection: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  render() {
    var classes = classnames(
      this.props.customClasses,
      "buttons back-button pull-left"
    );
    return (
      <IonButton {...this.props} {...this.state} customClasses={classes}>
        { this.props.children }
      </IonButton>
    );
  }
});

export default IonNavBackButton;
