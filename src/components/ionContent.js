import React from 'react';
import classnames from 'classnames';

var IonContent = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    scroll: React.PropTypes.bool,
    ionHasHeader: React.PropTypes.bool,
    ionHasSubheader: React.PropTypes.bool,
    ionHasTabs: React.PropTypes.bool,
    ionHasTabsTop: React.PropTypes.bool,
    ionHasFooter: React.PropTypes.bool,
    ionHasSubfooter: React.PropTypes.bool,
    ionKeyboardHeight: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      scroll: true,
      ionHasHeader: false,
      ionHasSubheader: false,
      ionHasTabs: false,
      ionHasTabsTop: false,
      ionHasFooter: false,
      ionHasSubfooter: false,
      ionKeyboardHeight: 0
    };
  },
  render() {    
    var classes = classnames(
      {'content': true},
      this.props.customClasses,
      {
        'overflow-scroll': (this.props.scroll !== false),
        'has-header': this.props.ionHasHeader,
        'has-subheader': this.props.ionHasSubheader,
        'has-tabs': this.props.ionHasTabs,
        'has-tabs-top': this.props.ionHasTabsTop,
        'has-footer': this.props.ionHasFooter,
        'has-subfooter': this.props.ionHasSubfooter
      }
    );
    var divStyle = {};
    if (this.props.ionKeyboardHeight > 0) {
      divStyle = { bottom: this.props.ionKeyboardHeight };
    }

    var outerClasses = classnames(
      'scroll-content ionic-scroll',
      { 'ios-top-margin': !this.props.ionHasHeader }
    );

    var children;
    if (React.isValidElement(this.props.children)) {
      children = React.cloneElement(this.props.children, {ionSetTransitionDirection: this.props.ionSetTransitionDirection});
    } else {
      children = this.props.children;
    }
    
    return (      
        <div className={ outerClasses } style={divStyle}>
        <div className={ classes } >
          {children}
        </div>
      </div>
    );
  }
});

export default IonContent;
