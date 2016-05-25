import React from 'react';
import classnames from 'classnames';
import { Link } from "react-router";

var IonItem = React.createClass({
  propTypes: {
    'link': React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    href: React.PropTypes.string,
    target: React.PropTypes.string,
    'wrap': React.PropTypes.bool,
    'divider': React.PropTypes.bool,
    'iconLeft': React.PropTypes.bool,
    'iconRight': React.PropTypes.bool,
    'avatar': React.PropTypes.bool,
    'image': React.PropTypes.bool,
    'body': React.PropTypes.bool,
    'input': React.PropTypes.bool,
    'buttonRight': React.PropTypes.bool,
    'buttonLeft': React.PropTypes.bool,
    'thumbnailLeft': React.PropTypes.bool,
    'thumbnailRight': React.PropTypes.bool,
    'checkboxLeft': React.PropTypes.bool,
    'checkboxRight': React.PropTypes.bool,
    'customClasses': React.PropTypes.string,
    'onClick': React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      'link': null,
      href: null,
      target: null,
      'wrap': false,
      'divider': false,
      'iconLeft': false,
      'iconRight': false,
      'avatar': false,
      'image': false,
      'body': false,
      'input': false,
      'buttonRight': false,
      'buttonLeft': false,
      'thumbnailLeft': false,
      'thumbnailRight': false,
      'checkboxLeft': false,
      'checkboxRight': false,
      'customClasses': '',
      'onClick': null
    };
  },
  render() {
    var classes = classnames(
      {'item': true,
       'item-text-wrap': this.props.wrap,
       'item-divider': this.props.divider,
       'item-icon-left': this.props.iconLeft,
       'item-icon-right': this.props.iconRight,
       'item-avatar': this.props.avatar,
       'item-image': this.props.image,
       'item-body': this.props.body,
       'item-input': this.props.input,
       'item-button-right': this.props.buttonRight,
       'item-button-left': this.props.buttonLeft,
       'item-thumbnail-left': this.props.thumbnailLeft,
       'item-thumbnail-right': this.props.thumbnailRight,
       'item-checkbox': this.props.checkboxLeft || this.props.checkboxRight,
       'item-checkbox-right': this.props.checkboxRight,
      },
      this.props.customClasses
    );
    var item;
    if (this.props.link) {
      item = (
        <Link className={classes} to={this.props.link} onClick={this.props.onClick}>
          {this.props.children}
        </Link>
      );
    } else if (this.props.href) {
      item = (
        <a className={classes} href={this.props.href} target={this.props.target} onClick={this.props.onClick}>
          {this.props.children}
        </a>
      );
    } else {
      item = (
        <div className={classes} onClick={this.props.onClick}>
          {this.props.children}
        </div>
      );
    }
    return item;
  }
});

export default IonItem;
