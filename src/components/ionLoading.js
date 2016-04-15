import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IonSpinner from './ionSpinner';
import SetTimeoutMixin from '../helpers/timeout';

var IonLoading = React.createClass({
  propTypes: {
    // TODO: proptype checking for show if not false
    show: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ])
  },
  getDefaultProps: function() {
    return {
      show: false
    };
  },
  getInitialState: function() {
    return {
      wait: false // used for user-option 'delay'
    };
  },
  contextTypes: {
    ionShowBackdrop: React.PropTypes.func,
    ionShowLoading: React.PropTypes.func
  },
  getOptions: function(props) {
    if (props.show === false) { return false; }
    // merge default options with user options
    var options = Object.assign({
      delay: 0,
      duration: null,
      customTemplate: null,
      backdrop: false
    }, props.show);
    return options;
  },
  mixins: [SetTimeoutMixin],
  componentWillReceiveProps: function(nextProps) {
    if (this.props.show !== false && nextProps.show === false) {
      // we will shop loading, so hide a potential backdrop
      this.context.ionShowBackdrop(false);
      // also clear possible timeouts
      this.clearTimeouts();
    } else if (this.props.show === false && nextProps.show !== false) {
      // we will start loading, so introduce delay, show the backdrop, etc. if desired
      var nextOptions = this.getOptions(nextProps);
      if(nextOptions.duration > 0 && nextOptions.duration < nextOptions.delay) {
        console.warn("IonLoading: duration should be longer than delay");
        this.context.ionShowLoading(false);
        return;
      }
      if(nextOptions.delay > 0) {
        this.setState({wait: true});
        this.setTimeout(() => this.setState({wait:false}), nextOptions.delay);
      }
      if(nextOptions.backdrop) {
        this.setTimeout(() => this.context.ionShowBackdrop(true), nextOptions.delay);
      }
      if(nextOptions.duration > 0) {
        this.setTimeout(() => this.context.ionShowLoading(false), nextOptions.duration);
      }
    }        
  },  
  render() {    
    var loading;
    if (this.props.show !== false && !this.state.wait) {
      var options = this.getOptions(this.props);
      var template = options.customTemplate || (
        <IonSpinner
            icon="ios-small"
            customClasses="inloader spinner-light" />
      );
      loading = (
        <div className="loading-container visible active">
          <div className="loading">
            {template}
          </div>
        </div>
      );
    } else {
      loading = false;
    }
    return (
      <ReactCSSTransitionGroup
      transitionEnterTimeout={200}
      transitionLeave={false}
      transitionName={ {
                      enter: 'loading-invisible',
                      enterActive: 'loading-visible'
                      } }
      >
          {loading}
      </ReactCSSTransitionGroup>
    );
  }
});

export default IonLoading;
