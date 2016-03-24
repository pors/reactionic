import React from 'react';
import classnames from 'classnames';

var IonSelect= React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    label: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    options:React.PropTypes.array,
    defaultValue: React.PropTypes.string
  },
  getInitialState(){
    return {
      value: this.props.defaultValue
    };
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      label: '',
      options:[],
      handleChange: () => {},
      value: ''
    };
  },
  handleChange(event){
    if(this.props.handleChange)
      this.props.handleChange(event.target.value)
    this.setState({
      value: event.target.value
    })
  },
  //Render our props `options`
  renderOptions(){
    var list = this.props.options.map((option, index) => {
      return <option key={index} value={option}>{option}</option>
    });
    return list
  },
  render() {
    var classes = classnames(
      {'item': true},
      {'item-input':true},
      {'item-select': true},
      this.props.customClasses
    );
    return (
      <div>
        <label className={classes}>
          <div className='input-label'>
            {this.props.label}
          </div>
          <select value={this.state.value} onChange={this.handleChange}>
            {this.renderOptions()}
          </select>
        </label>
          {this.props.children}
      </div>
    );
  }
});

export default IonSelect;
