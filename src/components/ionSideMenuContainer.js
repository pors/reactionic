import React from 'react';
import Snap from 'snapjs';

var IonSideMenuContainer = React.createClass({
  contextTypes: {
    ionSetSnapper: React.PropTypes.func
  },
  componentDidMount: function() {
    var sideMenuContent = document.getElementById('IonSideMenuContent');
    let snapper = new Snap({
      element: sideMenuContent,
      disable: 'none'
    });
    if (typeof snapper.toggle === 'undefined') {
      // add a toggle method if it doesn't exist yet (in some future version)      
      snapper.toggle = function(direction) {
        if( this.state().state==direction ){
          this.close();
        } else {
          this.open(direction);
        }
      };
    }
    this.context.ionSetSnapper(snapper);
  },
  componentWillUnmount: function() {
    this.context.ionSetSnapper(null);
  },
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
});

export default IonSideMenuContainer;
