import React from 'react';
import classnames from 'classnames';

var IonFooterBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    route: React.PropTypes.object.isRequired,
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      ionHasTabs: false
    };
  },
  contextTypes: {
    ionUpdateHasX: React.PropTypes.func.isRequired,
    ionHasTabs: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
  },
  componentWillMount: function() {
    this.context.ionUpdateHasX('ionHasFooter', true);
  },
  componentDidMount: function() {
    const { route } = this.props;
    const { router } = this.context;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  },
  routerWillLeave(nextLocation) {
    this.context.ionUpdateHasX('ionHasFooter', false);
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-footer': true},
      this.props.customClasses || 'bar-stable', // default class
      {'has-tabs': this.context.ionHasTabs}
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonFooterBar;
