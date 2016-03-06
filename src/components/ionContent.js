import React from 'react';
import classnames from 'classnames';

var IonContent = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    scroll: React.PropTypes.bool,
    hasHeader: React.PropTypes.bool,
    hasSubheader: React.PropTypes.bool,
    hasTabs: React.PropTypes.bool,
    hasTabsTop: React.PropTypes.bool,
    hasFooter: React.PropTypes.bool,
    hasSubfooter: React.PropTypes.bool,
    ionKeyboardHeight: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      scroll: true,
      hasHeader: false,
      hasSubheader: false,
      hasTabs: false,
      hasTabsTop: false,
      hasFooter: false,
      hasSubfooter: false,
      ionKeyboardHeight: 0
    };
  },
  render() {    
    var classes = classnames(
      {'content': true},
      this.props.customClasses,
      {
        'overflow-scroll': (this.props.scroll !== false),
        'has-header': this.props.hasHeader,
        'has-subheader': this.props.hasSubheader,
        'has-tabs': this.props.hasTabs,
        'has-tabs-top': this.props.hasTabsTop,
        'has-footer': this.props.hasFooter,
        'has-subfooter': this.props.hasSubfooter
      }
    );
    var divStyle = {};
    if (this.props.ionKeyboardHeight > 0) {
      divStyle = { bottom: this.props.ionKeyboardHeight };
    }

    var outerClasses = classnames(
      'scroll-content ionic-scroll',
      { 'ios-top-margin': !this.props.hasHeader }
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
