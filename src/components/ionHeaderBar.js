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
    rightButton: React.PropTypes.element
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
  contextTypes: {
    ionUpdateHasX: React.PropTypes.func,
    ionPlatform: React.PropTypes.object
  },
  setMarginCompensation: function(width) {
    if (this.context.ionPlatform.isAndroid) {
      this.setState({'marginCompensation': Math.ceil(width) + 10 });
    }
  },
  componentWillMount: function() {
    this.context.ionUpdateHasX('ionHasHeader', true);
  },
  componentWillUnmount: function() {
    this.context.ionUpdateHasX('ionHasHeader', false);
  },
  render() {
    var platform = this.context.ionPlatform;
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
