import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import IonTitle from './ionTitle';
import RouteCSSTransitionGroup from '../helpers/animate';

var IonNavBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    leftButton: React.PropTypes.element,
    leftButtonColor: React.PropTypes.string,
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
  componentDidMount: function () {
    if (this.props.platform.isAndroid) {
      // hack to circumvent bad css, calculate width of leftButton (if any)
      // and add margin to the title. Two times, because of slow rendering
      var mountedLeftButton = this.refs['leftButton'];
      if (mountedLeftButton) {
        var setMarginCompensation = function () {
          var width = ReactDOM.findDOMNode(mountedLeftButton).getBoundingClientRect().width;
          this.setState({'marginCompensation': Math.ceil(width) + 5 });
        };
        setMarginCompensation();
        setTimeout(setMarginCompensation.bind(this), 200);
      }
    }
  },
  render() {
    var platform = this.props.platform;
    var leftButton = this.props.leftButton;
    if (leftButton && platform.isAndroid) {
      // Add a reference to leftButton so we can find it when componentDidMount
//      leftButton = React.cloneElement(leftButton, { ref: 'leftButton' });
    }

    var classes = classnames(
      {'bar': true, 'bar-header': true},
      this.props.customClasses || 'bar-stable', // default class
      'nav-bar-block',
      {'nav-bar-transition-android': platform.isAndroid,
       'nav-bar-transition-ios': !platform.isAndroid
      },
      'nav-bar-direction-' + this.props.ionNavDirection
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
        >


      {leftButton}
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
        >
          {this.props.rightButton}

        </RouteCSSTransitionGroup>
      </div>
    );
  }
});

export default IonNavBar;

// improve this: make modular, test with different inputs @@@@@@@@@@@@@@@@


// to make it dynamic: call method to set hasHeader to true
// and on destroy again to false, see lifecycle events
// @@@@@@@@@@@@@@@@

// bundle props that are not used in a component, but need to passed on
// see: https://facebook.github.io/react/docs/transferring-props.html
// Also no need to mention them in propTypes and getDefaultProps if not used
// @@@@@@@@@@@@@@@@
