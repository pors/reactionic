import React from 'react';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var IonBackdrop = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    show: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      show: false
    };
  },
  render() {
    var backdrop;
    if (this.props.show) {
      backdrop = <div className="backdrop visible active"></div>;
    } else {
      backdrop = false;
    }
    var classes = classnames(
      {'backdrop': true},
      this.props.customClasses
    );
    return (
      <ReactCSSTransitionGroup
      transitionEnterTimeout={100}
      transitionLeave={false}
      transitionName={ {
                      enter: 'backdrop-invisible',
                      enterActive: 'backdrop-visible'
                      } }
      >
          {backdrop}
      </ReactCSSTransitionGroup>
    );
  }
});

export default IonBackdrop;
