import React from 'react';
import classnames from 'classnames';

var IonSubFooterBar = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    route: React.PropTypes.object.isRequired,
  },
  getDefaultProps: function() {
    return {
      customClasses: ''
    };
  },
  contextTypes: {
    ionUpdateHasX: React.PropTypes.func,
    router: React.PropTypes.object.isRequired,
  },
  componentWillMount: function() {
    this.context.ionUpdateHasX('ionHasSubfooter', true);
  },
  componentDidMount: function() {
    const { route } = this.props;
    const { router } = this.context;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  },
  routerWillLeave(nextLocation) {
    this.context.ionUpdateHasX('ionHasSubfooter', false);
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-subfooter': true},
      this.props.customClasses || 'bar-stable' // default class
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonSubFooterBar;
