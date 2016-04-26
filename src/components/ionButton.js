import React from 'react';
import classnames from 'classnames';
import { Link } from "react-router";

var IonButton = React.createClass({
  propTypes: {
    link: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    customClasses: React.PropTypes.string,
    expand: React.PropTypes.oneOf(['full', 'block']),
    size: React.PropTypes.oneOf(['small', 'large']),
    type: React.PropTypes.oneOf(['outline', 'clear', 'icon-clear']),
    icon: React.PropTypes.string,
    iconPosition: React.PropTypes.oneOf(['left', 'right']),
    color: React.PropTypes.string,
    onClick: React.PropTypes.func,
    backButton: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      link: null,
      customClasses: '',
      expand: null,
      size: null,
      type: null,
      icon: null,
      iconPosition: null,
      color: '',
      onClick: null,
      backButton: false
    };
  },
  contextTypes: {
    ionSetTransitionDirection: React.PropTypes.func,
    router: React.PropTypes.object
  },
  onClick: function(e) {
    if (this.props.backButton) {
      // set the transitionDirection for backward animation
      this.context.ionSetTransitionDirection('back');

      // execute possible other onclick function
      if (this.props.onClick) {
        this.props.onClick(e);
      }

      // if history is set, go to previous location
      if (!this.props.link && this.context.router) {
        this.context.router.goBack();
      }
      // return false to prevent defaults
      return false;
    } else if (this.props.onClick) {
      this.props.onClick(e);
    }
  },
  render() {
    var colorClass = this.props.color ? 'button-' + this.props.color : null;
    var classes = classnames(
      {'button': true,
       'button-block' : this.props.expand === 'block',
       'button-full' : this.props.expand === 'full',
       'button-small' : this.props.size === 'small',
       'button-large' : this.props.size === 'large',
       'button-outline' : this.props.type === 'outline',
       'button-clear' : this.props.type === 'clear',
       'icon-left' : this.props.iconPosition === 'left',
       'icon-right' : this.props.iconPosition === 'right',
       'icon': !this.props.iconPosition && this.props.icon,
       'button-icon' : !this.props.children && this.props.icon && this.props.type === 'icon-clear'
      },
      this.props.icon,
      colorClass,
      this.props.customClasses
    );
    var button;
    if (this.props.link) {
      button = (
        <Link className={ classes } to={this.props.link} onClick={this.onClick}>
          { this.props.children }
        </Link>
      );
    } else {
      button = (
        <button className={ classes } onClick={this.onClick}>
          { this.props.children }
        </button>
      );
    }
    return button;
  }
});

export default IonButton;
