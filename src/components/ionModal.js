import React from 'react';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var IonModalContainer = React.createClass({
  // this component need to be attached to the DOM before the Modal enters
  // otherwise the transaitions won't work
  propTypes: {
    animation: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      animation: 'slide-in-up'
    };
  },
  render() {
    return (
      <ReactCSSTransitionGroup
              component="div"
              transitionEnterTimeout={400}
              transitionLeaveTimeout={250}
              transitionName="modal"
              className={"modal-"+this.props.animation}
      >        
        {this.props.children}
      </ReactCSSTransitionGroup>
    );
  }
});


var IonModal = React.createClass({
  propTypes: {
    customClasses: React.PropTypes.string,
    customTemplate: React.PropTypes.bool,
    title: React.PropTypes.string,    
    closeText: React.PropTypes.string,
    focusFirstInput: React.PropTypes.bool,
    barClasses: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      customClasses: '',
      customTemplate: false,
      title: '',
      closeText: '',
      focusFirstInput: true,
      barClasses: 'bar-stable'
    };
  },
  contextTypes: {
    ionShowModal: React.PropTypes.func,
    ionKeyboardHeight: React.PropTypes.number,
    ionPlatform: React.PropTypes.object
  },
  backdropClicked: function(e) {
    e.preventDefault();
    if (e.target.className.indexOf("modal-backdrop") >= 0) {
      // if clicked on backdrop outside of the modal, close modal
      this.context.ionShowModal(false);
    }    
  },
  componentDidMount() {
    if(this.props.focusFirstInput) {
      var input = document.querySelector("input"); // select first input
      input && input.focus();
    }
  },  
  render() {    
    var classes = classnames(
      {'modal': true},
      this.props.customClasses
    );
    var backdropClasses = classnames(
      {'modal-backdrop': true,
       'active': this.props.children}
    );
    var barClasses = classnames(
      'bar bar-header',
      this.props.barClasses
    );
    var titleClasses = classnames(
      {'title': true,
       'title-left': this.context.ionPlatform.isAndroid}
    );
    var closeButton;
    if (this.props.closeText) {
      closeButton = <button onClick={ () => this.context.ionShowModal(false) } className="button button-positive button-clear">{this.props.closeText}</button>;
    } else {
      closeButton = <button onClick={ () => this.context.ionShowModal(false) } className="button button-icon"><i className="icon ion-ios-close-empty"></i></button>;
    }
    var contents;
    if (this.props.customTemplate) {
      contents = (
        <div className={classes}>
          {this.props.children}
        </div>
      );
    } else {
      contents = (
        <div className={classes}>
          <div className={barClasses}>
            <h2 className={titleClasses}>{this.props.title}</h2>{closeButton}
          </div>
          <div className="content has-header overflow-scroll">
            <div className="padding">
              {this.props.children}          
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={backdropClasses} onClick={this.backdropClicked}>
        <div className="modal-wrapper">
          {contents}
        </div>
      </div>            
    );
  }
});

export default IonModal;
export { IonModalContainer };

// @@@@@@@@@@@@@@@@ implement dynamic stuff ???

// Fix default template, see Meteoric

