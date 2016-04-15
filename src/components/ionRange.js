import React from 'react';
import classnames from 'classnames';

var IonRange = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    defaultValue: React.PropTypes.number,
    handleChange: React.PropTypes.func,
    iconBeforeInput:React.PropTypes.element,
    iconAfterInput: React.PropTypes.element,
    min: React.PropTypes.number,
    max: React.PropTypes.number
  },
  contextTypes: {
    ionSnapper: React.PropTypes.object
  },
  getInitialState(){
    return {
      value: this.props.defaultValue > this.props.max ? this.props.max : this.props.defaultValue
    };
  },  
  getDefaultProps: function() {
    return {
      customClasses: '',
      defaultValue: 0,
      handleChange: () => {},
      iconBeforeInput:null,
      iconAfterInput: null,
      min: 0,
      max: 100
    };
  },
  handleChange(event){
    if(this.props.handleChange)
      this.props.handleChange(event.target.value);

    this.setState({
      value: event.target.value
    });
  },
  disableSnap(){
    this.context.ionSnapper.disable();
  },
  enableSnap(){
    this.context.ionSnapper.enable();
  },
  render() {
    var classes = classnames(
      {'item':true},
      {'range':true},
      this.props.customClasses
    );
    return (
      <div className={classes}>
          {this.props.iconBeforeInput}
          <input type='range' min={this.props.min} max={this.props.max}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onMouseEnter={this.disableSnap}
                 onMouseLeave={this.enableSnap}
                 onTouchStart={this.disableSnap}
                 onTouchEnd={this.enableSnap}/>
          {this.props.iconAfterInput}
          {this.props.children}
      </div>
    );
  }
});

export default IonRange;
