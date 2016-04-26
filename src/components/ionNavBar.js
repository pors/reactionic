import React from 'react';
import classnames from 'classnames';
import IonTitle from './ionTitle';
import RouteCSSTransitionGroup from '../helpers/animate';
import { LeftButtonContainer } from '../helpers/containers';

var IonNavBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    leftButton: React.PropTypes.element,
    leftButtonColor: React.PropTypes.string,
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
    ionPlatform: React.PropTypes.object,
    ionUpdateHasX: React.PropTypes.func,
    ionSetTransitionDirection: React.PropTypes.func,
    ionNavDirection: React.PropTypes.string
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
    var classes = classnames(
      {'bar': true, 'bar-header': true},
      this.props.customClasses || 'bar-stable', // default class
      'nav-bar-block',
      {'nav-bar-transition-android': platform.isAndroid,
       'nav-bar-transition-ios': !platform.isAndroid
      },
      'nav-bar-direction-' + this.context.ionNavDirection
    );
    return (
      <div className={classes}>

        <RouteCSSTransitionGroup
            transitionEnterTimeout={platform.transitionTimeOut}
            transitionName= { {
                             enter: 'button-entering',
                             enterActive: 'button-active',
                             leave: 'button-leaving',
                             leaveActive: 'button-active'
                             } }
            transitionLeave={false}
            {...this.props}
        >

        <LeftButtonContainer setMarginCompensation={this.setMarginCompensation}>{leftButton}</LeftButtonContainer>

        </RouteCSSTransitionGroup>

        <RouteCSSTransitionGroup
            transitionEnterTimeout={platform.transitionTimeOut}
            transitionLeaveTimeout={platform.transitionTimeOut}
            transitionName= { {
                             enter: 'title-entering',
                             enterActive: 'title-active',
                             leave: 'title-leaving',
                             leaveActive: 'title-active'
                             } }
            {...this.props}
        >
          <IonTitle marginCompensation={this.state.marginCompensation} customClasses="title-stage">
            { this.props.title }
        </IonTitle>
        </RouteCSSTransitionGroup>

        <RouteCSSTransitionGroup
            transitionEnterTimeout={platform.transitionTimeOut}
            component="div"
            transitionName= { {
                             enter: 'button-entering',
                             enterActive: 'button-active',
                             leave: 'button-leaving',
                             leaveActive: 'button-active'
                             } }
            transitionLeave={false}
            className="buttons pull-right"
            {...this.props}
        >
          {this.props.rightButton}

        </RouteCSSTransitionGroup>
      </div>
    );
  }
});

export default IonNavBar;
