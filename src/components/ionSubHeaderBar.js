import React from 'react';
import classnames from 'classnames';

var IonSubHeaderBar = React.createClass({
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
    ionHasTabsTop: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
  },
  componentWillMount: function() {
    this.context.ionUpdateHasX('ionHasSubheader', true);
  },
  componentDidMount: function() {
    const { route } = this.props;
    const { router } = this.context;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  },
  routerWillLeave(nextLocation) {
    this.context.ionUpdateHasX('ionHasSubheader', false);
  },
  render() {
    var classes = classnames(
      {'bar': true, 'bar-subheader': true},
      this.props.customClasses || 'bar-stable', // default class
      {'has-tabs-top': this.context.ionHasTabsTop}
    );
    return (
      <div className={ classes } >
        { this.props.children }
      </div>
    );
  }
});

export default IonSubHeaderBar;
