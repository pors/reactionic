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
    platform: React.PropTypes.object,
    location: React.PropTypes.object.isRequired
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
      ionSnapper: null,
      ionKeyboard: {}
    };
  },
  childContextTypes: {
    location: React.PropTypes.object,
    ionPlatform: React.PropTypes.object,
    ionKeyboard: React.PropTypes.object,
    ionSetTransitionDirection: React.PropTypes.func,
    ionNavDirection: React.PropTypes.string,
    ionModal: React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.bool]),
    ionShowModal: React.PropTypes.func,
    ionUpdateActionSheet: React.PropTypes.func,
    ionUpdatePopup: React.PropTypes.func,
    ionShowBackdrop: React.PropTypes.func,
    ionShowLoading: React.PropTypes.func,
    ionKeyboardHeight: React.PropTypes.number,
    ionUpdateHasX: React.PropTypes.func,
    ionHasTabs: React.PropTypes.bool,
    ionHasTabsTop: React.PropTypes.bool,
    ionHasHeader: React.PropTypes.bool,
    ionHasSubheader: React.PropTypes.bool,
    ionHasFooter: React.PropTypes.bool,
    ionHasSubfooter: React.PropTypes.bool,
    ionSnapper: React.PropTypes.object,
    ionGetSnapper: React.PropTypes.func,
    ionSetSnapper: React.PropTypes.func,
    ionPopover: React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.bool]),
    ionShowPopover: React.PropTypes.func,
    ionActionSheet: React.PropTypes.object,
    ionPopup: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      location: this.props.location,
      ionPlatform: this.props.platform,
      ionKeyboard: this.state.ionKeyboard,
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
      ionGetSnapper: this.ionGetSnapper,
      ionSetSnapper: this.ionSetSnapper,
      ionPopover: this.state.ionPopover,
      ionShowPopover: this.ionShowPopover,
      ionActionSheet: this.state.ionActionSheet,
      ionPopup: this.state.ionPopup
    };
  },
  ionGetSnapper() {
    return this.state.ionSnapper;
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
    this.setState({ ionModal: modal });
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
      if(this.state.ionLoading !== false) {
        this.setState({
          ionLoading: false
        });
      }
    }
  },
  ionUpdateHasX: function(hasX, value) {
    if (hasX in this.state) {
      this.setState({ [hasX]: value });
    }
  },
  componentWillReceiveProps(nextProps, nextContext) {
    // close modal etc. when navigating away from page (e.g. with browser back button)
    if (nextProps.location.pathname !== this.props.location.pathname) {
      if (this.state.ionModal) { this.ionShowModal(false); }
      if (this.state.ionPopover) { this.ionShowPopover(false); }
      if (this.state.ionBackdrop) { this.ionShowBackdrop(false); }
      if (this.state.ionLoading) { this.ionShowLoading(false); }
      if (!_.isEmpty(this.state.ionActionSheet)) { this.ionUpdateActionSheet({}); }
      if (!_.isEmpty(this.state.ionPopup)) { this.ionUpdatePopup({}); }
      // reset sub headers/footers
      this.ionUpdateHasX('ionHasSubheader', false);
      this.ionUpdateHasX('ionHasFooter', false);
      this.ionUpdateHasX('ionHasSubfooter', false);
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
    if (this.props.platform.isCordova && !_.isEmpty(this.state.ionKeyboard)) {
      var keyboard = IonKeyboard(this.props.platform);
      keyboard.disableScroll();
      this.setState({ ionKeyboard: keyboard });
    }
  },
  componentWillUnmount: function() {
    window.removeEventListener('native.keyboardshow', this.handleKeyboard);
    window.removeEventListener('native.keyboardhide', this.handleKeyboard);
  },
  render() {
    var platform = this.props.platform;
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
        { this.props.children }
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

export default IonBody;
