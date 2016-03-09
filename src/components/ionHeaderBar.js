import React from 'react';
import classnames from 'classnames';
import IonTitle from './ionTitle';
import { LeftButtonContainer } from '../helpers/containers';

var IonHeaderBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    leftButton: React.PropTypes.element,
    rightButton: React.PropTypes.element,
    platform: React.PropTypes.object.isRequired
  },
  getDefaultProps: function() {
    // no need to set default platform; is propogated from IonBody
    return {
      customClasses: '',
      title: '',
      leftButton: null,
      rightButton: null
    };
  },
  getInitialState() {
    return {
      marginCompensation: 0
    };
  },
  setMarginCompensation: function(width) {
    if (this.props.platform.isAndroid) {
      this.setState({'marginCompensation': Math.ceil(width) + 10 });
    }
  },
  render() {
    var platform = this.props.platform;
    var leftButton = this.props.leftButton;
    if (leftButton && platform.isAndroid) {
      // Add a reference to leftButton so we can find it when componentDidMount
      leftButton = React.cloneElement(leftButton, { ref: 'leftButton' });
    }

    var classes = classnames(
      {'bar': true, 'bar-header': true},
      this.props.customClasses || 'bar-stable' // default class
    );
    return (
      <div className={ classes } >
        <LeftButtonContainer setMarginCompensation={this.setMarginCompensation}>{leftButton}</LeftButtonContainer>
        <IonTitle marginCompensation={this.state.marginCompensation}>
          { this.props.title }
        </IonTitle>
        {this.props.rightButton}
      </div>
    );
  }
});

export default IonHeaderBar;


// to make it dynamic: call method to set hasHeader to true
// and on destroy again to false, see lifecycle events
// @@@@@@@@@@@@@@@@

// bundle props that are not used in a component, but need to passed on
// see: https://facebook.github.io/react/docs/transferring-props.html
// Also no need to mention them in propTypes and getDefaultProps if not used
// @@@@@@@@@@@@@@@@
