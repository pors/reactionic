import React from 'react';
import classnames from 'classnames';
import RouteCSSTransitionGroup from '../helpers/animate'

var IonNavView = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    platform: React.PropTypes.object,
  },
  getDefaultProps: function() {
    // no need to set default platform and ionSetTransitionDirection as it is propogated from IonBody
    return {
      customClasses: '',
    };
  },
  render() {
    var platform = this.props.platform;
    var classes = classnames(
      {'nav-view-transition-android': platform.isAndroid,
       'nav-view-transition-ios': !platform.isAndroid
      },
      'nav-view-direction-' + this.props.ionNavDirection,
      this.props.customClasses
    );
    return (
      <RouteCSSTransitionGroup
      component="div" 
      transitionEnterTimeout={platform.transitionTimeOut}
      transitionLeaveTimeout={platform.transitionTimeOut}
      transitionName= { {
                       enter: 'nav-view-entering',
                       enterActive: 'nav-view-active',
                       leave: 'nav-view-leaving',
                       leaveActive: 'nav-view-active'
                       } }
      className={classes}
      >
        {React.cloneElement(this.props.children, {ionSetTransitionDirection: this.props.ionSetTransitionDirection})}
      </RouteCSSTransitionGroup>
    );
  }
});

export default IonNavView;
