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
    ionHasX: React.PropTypes.func,
    ionKeyboardHeight: React.PropTypes.number
  },
  render() {
    var classes = classnames(
      {'content': true},
      this.props.customClasses,
      {
        'overflow-scroll': (this.props.scroll !== false),
        'has-header': this.context.ionHasX('ionHasHeader'),
        'has-subheader': this.context.ionHasX('ionHasSubheader'),
        'has-tabs': this.context.ionHasX('ionHasTabs'),
        'has-tabs-top': this.context.ionHasX('ionHasTabsTop'),
        'has-footer': this.context.ionHasX('ionHasFooter'),
        'has-subfooter': this.context.ionHasX('ionHasSubfooter'),
      }
    );
    var divStyle = {};
    if (this.context.ionKeyboardHeight > 0) {
      divStyle = { bottom: this.context.ionKeyboardHeight };
    }

    var outerClasses = classnames(
      'scroll-content ionic-scroll',
      { 'ios-top-margin': !this.context.ionHasX('ionHasHeader') }
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
