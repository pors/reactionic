import React from 'react';
import classnames from 'classnames';
import { Link } from "react-router";

var IonItem = React.createClass({
  propTypes: {
    'link': React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
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
    'customClasses': React.PropTypes.string,
    'onClick': React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      'link': null,
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
       'item-thumbnail-right': this.props.thumbnailRight
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
