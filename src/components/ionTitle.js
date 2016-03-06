import React from 'react';
import classnames from 'classnames';

var IonTitle = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    marginCompensation: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      marginCompensation: 0
    };
  },
  render() {
    var classes = classnames(
      {'title': true},
      this.props.customClasses,
      {'title-left': this.props.marginCompensation > 0}
    );
    var styles = this.props.marginCompensation ? {"marginLeft": this.props.marginCompensation} : {};
    return (
      <h1 className={ classes } style={ styles } >
        { this.props.children }
      </h1>
    );
  }
});

export default IonTitle;
