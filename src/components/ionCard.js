import React from 'react';
import classnames from 'classnames';

var IonCard = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    list: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      list: false
    };
  },
  render() {
    // extract props used here, pass on the rest
    var { list, customClasses, ...other } = this.props;
    var classes = classnames(
      {'card': true,
       'list' : list},
      customClasses
    );
    return (
        <div className={classes} {...other}>
        {this.props.children}
      </div>
    );
  }
});

export default IonCard;

