import React from 'react';
import classnames from 'classnames';

var IonContent = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    scroll: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      scroll: true
    };
  },
  contextTypes: {
    ionHasHeader: React.PropTypes.bool,
    ionHasSubheader: React.PropTypes.bool,
    ionHasTabs: React.PropTypes.bool,
    ionHasTabsTop: React.PropTypes.bool,
    ionHasFooter: React.PropTypes.bool,
    ionHasSubfooter: React.PropTypes.bool,
    ionKeyboardHeight: React.PropTypes.number
  },
  render() {    
    var classes = classnames(
      {'content': true},
      this.props.customClasses,
      {
        'overflow-scroll': (this.props.scroll !== false),
        'has-header': this.context.ionHasHeader,
        'has-subheader': this.context.ionHasSubheader,
        'has-tabs': this.context.ionHasTabs,
        'has-tabs-top': this.context.ionHasTabsTop,
        'has-footer': this.context.ionHasFooter,
        'has-subfooter': this.context.ionHasSubfooter
      }
    );
    var divStyle = {};
    if (this.context.ionKeyboardHeight > 0) {
      divStyle = { bottom: this.context.ionKeyboardHeight };
    }

    var outerClasses = classnames(
      'scroll-content ionic-scroll',
      { 'ios-top-margin': !this.context.ionHasHeader }
    );

    return (      
        <div className={ outerClasses } style={divStyle}>
        <div className={ classes } >
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default IonContent;
