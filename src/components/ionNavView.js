import React from 'react';
import classnames from 'classnames';
import RouteCSSTransitionGroup from '../helpers/animate';

var IonNavView = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string
  },
  getDefaultProps: function() {
    // no need to set default platform and ionSetTransitionDirection as it is propogated from IonBody
    return {
      customClasses: ''
    };
  },
  contextTypes: {
    ionPlatform: React.PropTypes.object,
    ionNavDirection: React.PropTypes.string,
    ionSetTransitionDirection: React.PropTypes.func
  },
  render() {
    var platform = this.context.ionPlatform;
    var classes = classnames(
      {'nav-view-transition-android': platform.isAndroid,
       'nav-view-transition-ios': !platform.isAndroid
      },
      'nav-view-direction-' + this.context.ionNavDirection,
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
      {...this.props}
      >
        { this.props.children }
      </RouteCSSTransitionGroup>
    );
  }
});

export default IonNavView;
