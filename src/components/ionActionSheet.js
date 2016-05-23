import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import transitionend from 'transitionend-property';

var IonActionSheet = React.createClass({
  contextTypes: {
    ionActionSheet: React.PropTypes.object,
    ionUpdateActionSheet: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      isUp: false,
      callback: () => {}
    };
  },
  cancelAction: function(e) {
    e && e.stopPropagation();
    this.close(this.context.ionActionSheet.cancel);
  },
  destructiveButtonClicked: function(e) {
    e && e.stopPropagation();
    this.close(this.context.ionActionSheet.destructiveButtonClicked);
  },
  buttonClicked: function(e, idx) {
    e && e.stopPropagation();
    this.close(this.context.ionActionSheet.buttonClicked.bind(null, idx));
  },
  close: function(callback) {
    if (this.state.isUp) {
      this.setState({ isUp: false, callback: callback });
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (_.isEmpty(prevProps.ionActionSheet) && !_.isEmpty(this.context.ionActionSheet)) {
      // show actionSheet
      this.setState({ isUp: true });
    }
    if (!this.state.isUp && prevState.isUp) {
      var self = this;
      var handler =  function() {
        self.context.ionUpdateActionSheet({});
        wrapper.removeEventListener(transitionend, handler);
        if (typeof self.state.callback === 'function') {
          self.state.callback();
        }
      };
      var wrapper = this.refs.wrapper;
      wrapper.addEventListener(transitionend, handler);
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (_.isEmpty(nextProps.ionActionSheet) && !_.isEmpty(this.context.ionActionSheet)) {
      // hide actionSheet
      this.cancelAction(false);
    }    
  },
  render() {
    var ionActionSheet = this.context.ionActionSheet;

    var willMount = true;
    if (_.isEmpty(ionActionSheet)) willMount = false;

    var titleText = ionActionSheet.titleText;
    var destructiveText = ionActionSheet.destructiveText;
    var cancelText = ionActionSheet.cancelText;
    var buttons = ionActionSheet.buttons;
    var cancel = ionActionSheet.cancel;
    var buttonClicked = ionActionSheet.buttonClicked;
    var destructiveButtonClicked = ionActionSheet.destructiveButtonClicked;
    var ionUpdateActionSheet = this.context.ionUpdateActionSheet;
    var onclickCancel = (e) => { this.cancelAction(e); };
    var onclickDelete = (e) => { this.destructiveButtonClicked(e); };

    if (titleText) {
      titleText = <div className="action-sheet-title">{titleText}</div>;
    }
    if (buttons) {
      let self = this;
      buttons = buttons.map(function(button, idx) {
        if (button.text) {
          return <button className="button" key={idx} onClick={(e) => self.buttonClicked(e, idx)}>{button.text}</button>;
        } else {
          return null;
        }
      });
    }
    if (destructiveText) {
      destructiveText = <div className="action-sheet-group"><button className="button destructive" onClick={onclickDelete}>{destructiveText}</button></div>;
    }
    if (cancelText) {
      cancelText = <div className="action-sheet-group"><button className="button" onClick={onclickCancel}>{cancelText}</button></div>;
    }
    
    var backdropClasses = classnames(
      {'action-sheet-backdrop': willMount, 'active': this.state.isUp}
    );
    var classes = classnames(
      {'action-sheet-wrapper': true, 'action-sheet-up': this.state.isUp}
    );
    var groupClasses = classnames(
      {'action-sheet-group': this.state.isUp}
    );

    return (
      <div className={backdropClasses} onClick={onclickCancel}>
        <div className={classes} ref="wrapper">
          <div className="action-sheet">
            <div className={groupClasses}>
              {titleText}
              {buttons}
            </div>
            {destructiveText}
            {cancelText}
          </div>
        </div>
      </div>
    );
  }
});

export default IonActionSheet;

