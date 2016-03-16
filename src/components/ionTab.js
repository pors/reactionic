import React from 'react';
import classnames from 'classnames';
import { Link } from "react-router";

var IonTab = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    active: React.PropTypes.bool,
    label: React.PropTypes.string,
    icon: React.PropTypes.string,
    to: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      active: false,
      label: null,
      icon: null,
      to: null
    };
  },
  render() {
    var icon = this.props.icon ? <i className={'icon ion-' + this.props.icon}>{this.props.children}</i> : null;
    var classes = classnames(
      {'tab-item': true,
       'active' : this.props.active},
      this.props.customClasses
    );
    return (
        <Link to={this.props.to} className={ classes } activeClassName="active" >
          { icon }
          { this.props.label }
        </Link>

    );
  }
});

export default IonTab;
