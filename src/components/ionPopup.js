import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import SetTimeoutMixin from '../helpers/timeout';

var IonPopup = React.createClass({
  propTypes: {
  },
  getInitialState: function() {
    return {
      isUp: false,
      closing: false,
      callback: () => {},
      inputValue: '' // needed for prompt
    };
  },
  contextTypes: {
    ionPopup: React.PropTypes.object,
    ionUpdatePopup: React.PropTypes.func
  },
  buttonClicked: function(e, callback) {
    e && e.stopPropagation();    
    this.close(callback);
  },
  close: function(callback) {
    if (this.state.isUp) {
      this.setState({ closing: true, callback: callback });
    }
  },
  mixins: [SetTimeoutMixin],
  componentDidUpdate: function(prevProps, prevState, prevContext) {    
    if (_.isEmpty(prevContext.ionPopup) && !_.isEmpty(this.context.ionPopup)) {
      // show popup
      this.setState({ isUp: true });
    }
    if (this.state.isUp && !prevState.closing && this.state.closing) {
      var self = this;
      var handler =  function() {
        self.setState({ isUp: false });
        self.setState({ closing: false });
        self.context.ionUpdatePopup({});
        if (typeof self.state.callback === 'function') {
          self.state.callback();
        }
      };
      this.setTimeout(handler, 100);
    }
  },
  handleFormChange(e) { // needed for prompt
    this.setState({ inputValue: e.target.value });
  },

  render() {
    var ionPopup = this.context.ionPopup;

    var willMount = true;
    if (_.isEmpty(ionPopup)) willMount = false;

    var title = ionPopup.title;
    var subTitle = ionPopup.subTitle;
    var template = ionPopup.template;
    var buttons = ionPopup.buttons;
    var cancel = ionPopup.cancel;
    var popupType = ionPopup.popupType;
    var ionUpdatePopup = this.context.ionUpdatePopup;
    var onclickCancel = (e) => { this.cancelAction(e); };

    switch(popupType) {
    case 'alert':
      buttons = [
        {
          text: ionPopup.okText ? ionPopup.okText : 'Ok',
          type: ionPopup.okType ? ionPopup.okType : 'button-positive',
          onTap: function(event) {
            if (ionPopup.onOk) ionPopup.onOk(event);
            return true;
          }
        }
      ];
      break;
    case 'confirm':
      buttons = [
        {
          text: ionPopup.cancelText ? ionPopup.cancelText : 'Cancel',
          type: ionPopup.cancelType ? ionPopup.cancelType : 'button-default',
          onTap: function (event) {
            if (ionPopup.onCancel) ionPopup.onCancel(event);
            return true;
          }
        },
        {
          text: ionPopup.okText ? ionPopup.okText : 'Ok',
          type: ionPopup.okType ? ionPopup.okType : 'button-positive',
          onTap: function (event) {
            if (ionPopup.onOk) ionPopup.onOk(event);
            return true;
          }
        }
      ];
      break;
    case 'prompt':
      template =  <span className="popup-prompt-text">{template}</span>;

      ionPopup.inputType = ionPopup.inputType || 'text';
      ionPopup.inputPlaceholder = ionPopup.inputPlaceholder || '';
      template = <span>{template}<input type={ionPopup.inputType} placeholder={ionPopup.inputPlaceholder} value={this.state.inputValue} onChange={this.handleFormChange} /></span>;
      var self = this;
      buttons = [
        {
          text: ionPopup.cancelText ? ionPopup.cancelText : 'Cancel',
          type: ionPopup.cancelType ? ionPopup.cancelType : 'button-default',
          onTap: function (event) {
            if (ionPopup.onCancel) ionPopup.onCancel(event);
            return true;
          }
        },
        {
          text: ionPopup.okText ? ionPopup.okText : 'Ok',
          type: ionPopup.okType ? ionPopup.okType : 'button-positive',
          onTap: function(event) {
            if (ionPopup.onOk) ionPopup.onOk(event, self.state.inputValue);
            return true;
          }
        }
      ];

      break;
    default:
      // we assume the type is 'show', no need to do anything
    }
    
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
      {'popup-container': willMount, 'popup-showing': this.state.isUp, 'active': this.state.isUp && !this.state.closing, 'popup-hidden': this.state.closing}
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

