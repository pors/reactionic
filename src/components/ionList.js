import React from 'react';
import classnames from 'classnames';

var IonList = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    inset: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      inset: false
    };
  },
  render() {
    var classes = classnames(
      {'list': true,
        'list-inset': this.props.inset},
      this.props.customClasses
    );
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});

export default IonList;

// TODO: Implement sortable / swipe functionality
