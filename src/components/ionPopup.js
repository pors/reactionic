import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import SetTimeoutMixin from '../helpers/timeout';

var IonPopup = React.createClass({
  propTypes: {
    ionPopup: React.PropTypes.object.isRequired,
    ionUpdatePopup: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      isUp: false,
      callback: () => {}
    };
  },
  cancelAction: function(e) {
    e && e.stopPropagation();
    this.close(this.props.ionPopup.cancel);
  },
  buttonClicked: function(e, callback) {
    e && e.stopPropagation();
    this.close(callback);
  },
  close: function(callback) {
    if (this.state.isUp) {
      this.setState({ isUp: false, callback: callback });
    }
  },
  mixins: [SetTimeoutMixin],
  componentDidUpdate: function(prevProps, prevState) {
    if (_.isEmpty(prevProps.ionPopup) && !_.isEmpty(this.props.ionPopup)) {
      // show popup
      this.setState({ isUp: true });
    }
    if (!this.state.isUp && prevState.isUp) {
      // close popup and call callback
      var self = this;
      this.setTimeout(function() {
        self.props.ionUpdatePopup({});
        if (typeof self.state.callback === 'function') {
          self.state.callback();
        };
      }, 1000@@@@@@@@@@@@@@@@);
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (_.isEmpty(nextProps.ionPopup) && !_.isEmpty(this.props.ionPopup)) {
      // hide popup
      this.cancelAction(false);
    }    
  },
  render() {
    var ionPopup = this.props.ionPopup;

    console.log(ionPopup);
    
    var willMount = true;
    if (_.isEmpty(ionPopup)) willMount = false;

    var title = ionPopup.title;
    var subTitle = ionPopup.subTitle;
    var template = ionPopup.template;
    var buttons = ionPopup.buttons;
    var cancel = ionPopup.cancel;
    var ionUpdatePopup = this.props.ionUpdatePopup;
    var onclickCancel = (e) => { this.cancelAction(e); };

    var head = null;
    if (title || subTitle) {
      head = (
          <div className="popup-head">
            {title ? <h3 className="popup-title">{title}</h3> : null}
            {subTitle ? <h5 className="popup-sub-title">{subTitle}</h5> : null}
          </div>
      );
    }
    if (template) {
      template = <div className="popup-body">{template}</div>
    }
    if (buttons) {
      let self = this;
      buttons = buttons.map(function(button, idx) {
        if (button.text) {
          let buttonClass = classnames('button', button.type);
          let callback = button.onTap;
          return <button className={buttonClass} key={idx} onClick={(e) => self.buttonClicked(e, callback)}>{button.text}</button>;
        } else {
          return null;
        }
      });
      buttons = <div className="popup-buttons">{buttons}</div>
    }
    
    var backdropClasses = classnames(
      {'backdrop': willMount, 'visible active': this.state.isUp}
    );
    var classes = classnames(
      {'popup-container': true, 'popup-showing active': this.state.isUp}
    );

    return (
      <div className={backdropClasses}>
        <div className={classes}>
          <div className="popup">
            {head}
            {template}
            {buttons}      
          </div>
        </div>
      </div>
    );
  }
});

export default IonPopup;

