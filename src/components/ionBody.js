import React from 'react';
import classnames from 'classnames';
import {IonModalContainer} from './ionModal';
import IonActionSheet from './ionActionSheet';
import IonPopover from './ionPopover';
import IonPopup from './ionPopup';
import IonBackdrop from './ionBackdrop';
import IonLoading from './ionLoading';
import IonKeyboard from '../helpers/keyboard';
import _ from 'lodash';

var IonBody = React.createClass({
  propTypes: {
    platform: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      platform: {
        isIOS: false,
        isAndroid: false,
        isCordova: false,
        transitionTimeOut: 450,
        name: 'Web'
      }
    };
  },
  getInitialState: function() {
    return {
      ionNavDirection: 'forward', // can be either forward or back, only used for IonNav* components
      ionModal: false, // can be either false or contain the modal node
      ionPopover: false, // can be either false or contain the popover
      ionActionSheet: {},
      ionPopup: {},
      ionBackdrop: false,
      ionLoading: false,
      ionKeyboardHeight: 0,
      ionHasTabs: false,
      ionHasTabsTop: false,
      ionHasHeader: false,
      ionHasSubheader: false,
      ionHasFooter: false,
      ionHasSubfooter: false,
      ionSnapper: null
    };
  },
  ionSetSnapper(snapper) {
    this.setState({ ionSnapper: snapper });
  },
  ionSetTransitionDirection: function(direction) {
    // Used for setting the transition direction of the page change animations
    // Only used for IonNav* components, but the state needs to be kept here because the IonNavBar is
    // only encapsulated by IonBody
    if(this.state.ionNavDirection != direction) {
      this.setState({ionNavDirection: direction});
    }
  },
  ionShowModal(modal) {
    if (modal && React.isValidElement(modal)) {
      // add the ionShowModal etc methods to the IonModal
      modal = React.cloneElement(modal, {
        ionShowModal: this.ionShowModal,
        ionKeyboardHeight: this.state.ionKeyboardHeight,
        platform: this.props.platform
      });
    }
    this.setState({
      ionModal: modal
    });
  },
  ionShowPopover(popover) {    
    this.setState({ ionPopover: popover });
  },
  ionUpdateActionSheet(actionSheet) {
    this.setState({ ionActionSheet: actionSheet });
  },
  ionUpdatePopup(popup) {
    this.setState({ ionPopup: popup });
  },
  ionShowBackdrop(show) {
    this.setState({ ionBackdrop: show });
  },
  ionShowLoading(show, options={}) {
    if (show) {
      this.setState({
        ionLoading: options
      });
    } else {
      this.setState({
        ionLoading: false
      });
    }
  },
  ionUpdateHasX: function(hasX, value) {
    if (hasX in this.state) {
      this.setState({ [hasX]: value });
    }
  },
  componentWillReceiveProps(nextProps, nextContext) {
    // close modal etc. when navigating away from page (e.g. with browser back button)
    if (nextContext.location.pathname !== this.context.location.pathname) {
      if (this.state.ionModal) { this.ionShowModal(false); }
      if (this.state.ionPopover) { this.ionShowPopover(false); }
      if (this.state.ionBackdrop) { this.ionShowBackdrop(false); }
      if (this.state.ionLoading) { this.ionShowLoading(false); }
      if (!_.isEmpty(this.state.ionActionSheet)) { this.ionUpdateActionSheet({}); }
      if (!_.isEmpty(this.state.ionPopup)) { this.ionUpdatePopup({}); }
    }
  },
  handleKeyboard: function(e) {
    var kbHeight = e && e.keyboardHeight;
    this.setState({ionKeyboardHeight: kbHeight}, function() {
      var currentModal = this.state.ionModal;
      if (currentModal) {
        // re-render modal to include new state
        this.ionShowModal(currentModal);
      }
    });
  },
  componentDidMount: function() {
    window.addEventListener('native.keyboardshow', this.handleKeyboard);
    window.addEventListener('native.keyboardhide', this.handleKeyboard);
  },
  componentWillUnmount: function() {
    window.removeEventListener('native.keyboardshow', this.handleKeyboard);
    window.removeEventListener('native.keyboardhide', this.handleKeyboard);
  },
  render() {
    var platform = this.props.platform;
    var keyboard = false;
    if (platform.isCordova) {
      keyboard = IonKeyboard(platform);
      keyboard.disableScroll();
    }
    var classes = classnames({
      'ionic-body': true,
      'grade-a': true, // needs improvement https://github.com/delta98/ionic-platform-body-classes
      'platform-cordova': platform.isCordova,
      'platform-ios': platform.isIOS,
      'platform-android': platform.isAndroid,
      'modal-open': this.state.ionModal,
      'action-sheet-open': !_.isEmpty(this.state.ionActionSheet),
      'popup-open': !_.isEmpty(this.state.ionPopup),
      'keyboard-open': this.state.ionKeyboardHeight
    });    
    return (
      <div className={classes}>
          {React.cloneElement(this.props.children, {
            platform: platform,
            keyboard: keyboard,
            ionSetTransitionDirection: this.ionSetTransitionDirection,
            ionNavDirection: this.state.ionNavDirection,
            ionModal: this.state.ionModal,
            ionShowModal: this.ionShowModal,
            ionUpdateActionSheet: this.ionUpdateActionSheet,
            ionUpdatePopup: this.ionUpdatePopup,
            ionShowBackdrop: this.ionShowBackdrop,
            ionShowLoading: this.ionShowLoading,
            ionKeyboardHeight: this.state.ionKeyboardHeight,
            ionUpdateHasX: this.ionUpdateHasX,
            ionHasTabs: this.state.ionHasTabs,
            ionHasTabsTop: this.state.ionHasTabsTop,
            ionHasHeader: this.state.ionHasHeader,
            ionHasSubheader: this.state.ionHasSubheader,
            ionHasFooter: this.state.ionHasFooter,
            ionHasSubfooter: this.state.ionHasSubfooter,
            ionSnapper: this.state.ionSnapper,
            ionSetSnapper: this.ionSetSnapper,
            ionPopover: this.state.ionPopover,
            ionShowPopover: this.ionShowPopover
           })}
        <IonModalContainer>{this.state.ionModal}</IonModalContainer>
        <IonBackdrop show={this.state.ionBackdrop} />
        <IonLoading
            show={this.state.ionLoading}
            ionShowLoading={this.ionShowLoading}
            ionShowBackdrop={this.ionShowBackdrop} />
        <IonActionSheet
          ionActionSheet={this.state.ionActionSheet}
          ionUpdateActionSheet={this.ionUpdateActionSheet} />
        <IonPopup
          ionPopup={this.state.ionPopup}
          ionUpdatePopup={this.ionUpdatePopup} />
        <IonPopover ionShowPopover={this.ionShowPopover}>{this.state.ionPopover}</IonPopover>
        </div>
    );
  }
});

IonBody.contextTypes = {
  location: React.PropTypes.object
};

export default IonBody;
