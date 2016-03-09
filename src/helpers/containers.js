import React from 'react';
import ReactDOM from 'react-dom';
import SetTimeoutMixin from './timeout.js';

var LeftButtonContainer = React.createClass({
  propTypes: {
    setMarginCompensation: React.PropTypes.func.isRequired
  },
  mixins: [SetTimeoutMixin],
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);
    var self = this;
    this.setTimeout(function(){
      var width;
      if (node) {
        width = node.getBoundingClientRect().width;
      } else {
        width = 0;
      }
      self.props.setMarginCompensation(width);
    }, 10);
  },
  render() {
    return this.props.children;
  }
});

export {LeftButtonContainer};
