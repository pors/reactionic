import React from 'react';
import classnames from 'classnames';
import IonButton from './ionButton';
import _ from 'lodash';

const POPOVER_BODY_PADDING = 6;

var IonPopover = React.createClass({
  propTypes: {
  },
  getDefaultProps: function() {
    return {
    };
  },
  contextTypes: {
    ionShowPopover: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.bool
    ])
  },
  backdropClicked: function(e) {
    e.preventDefault();
    if (e.target.className.indexOf("popover-backdrop") >= 0) {
      // if clicked on backdrop outside of the popover, close popover
      this.context.ionShowPopover(false);
    }
  },
  getInitialState: function() {
    return {
      popoverBottomClass: false,
      popoverStyle: {},
      arrowStyle: {}
    };
  },
  ignoreClick: function(e) {
    e && e.stopPropagation(); // so it won't close the popover
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.children && _.isEmpty(this.state.popoverStyle)) {
      // some old skool hacks to position the popover after all is mounted
      var htmlElement = document.documentElement;
      var button = document.getElementsByClassName("ionPopoverButton")[0];
      var arrow = this.refs.arrow;
      var popover = this.refs.popover;

      var bodyHeight = htmlElement.clientHeight;
      var bodyWidth = htmlElement.clientWidth;
      var buttonPosition = button.getBoundingClientRect();
      var buttonPositionLeft = buttonPosition.left + document.body.scrollLeft;
      var buttonPositionTop = buttonPosition.top + document.body.scrollTop;
      var buttonWidth = button.offsetWidth;
      var buttonHeight = button.offsetHeight;
      var popoverWidth = popover.offsetWidth;
      var popoverHeight = popover.offsetHeight;

      var popoverCSS = {
        marginLeft: '0px',
        opacity: 1,
        left: buttonPositionLeft + buttonWidth / 2 - popoverWidth / 2
      };

      if (popoverCSS.left < POPOVER_BODY_PADDING) {
        popoverCSS.left = POPOVER_BODY_PADDING;
      } else if(popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {
        popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
      }

      if (buttonPositionTop + buttonHeight + popoverHeight > bodyHeight) {
        popoverCSS.top = buttonPositionTop - popoverHeight;
        this.setState({ popoverBottomClass: true });
      } else {
        popoverCSS.top = buttonPositionTop + buttonHeight;
        this.setState({ popoverBottomClass: false });
      }


      this.setState({ arrowStyle: { left: buttonPositionLeft + buttonWidth / 2 - arrow.offsetWidth / 2 - popoverCSS.left } });
      this.setState({ popoverStyle: popoverCSS });
    }

  },
  render() {
    var popOverClasses = classnames(
      {'popover': true,
       'popover-bottom': this.state.popoverBottomClass}
    );
    var backdropClasses = classnames(
      {'popover-backdrop': true,
       'active': this.props.children}
    );
    var content = null;
    if (this.props.children) {
      content = (
        <div className={backdropClasses} onClick={this.backdropClicked}>
        <div className="popover-wrapper" onClick={this.ignoreClick}>
        <div className={popOverClasses} style={this.state.popoverStyle} ref="popover">
        <div className="popover-arrow" style={this.state.arrowStyle} ref="arrow" />
        {this.props.children}
        </div>
        </div>
        </div>
      );
    }
    return (
      <div>
      {content}
      </div>
    );
  }
});

var IonPopoverButton =  React.createClass({
  render() {
    return (
      <IonButton customClasses="ionPopoverButton" {...this.props} />
    )
  }
});

export default IonPopover;
export { IonPopoverButton };
