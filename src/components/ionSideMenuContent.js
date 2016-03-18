import React from 'react';

var IonSideMenuContent = React.createClass({
  render() {
    return (
      <div className="menu-content snap-content pane" id="IonSideMenuContent">
        {this.props.children}
      </div>
    );
  }
});

export default IonSideMenuContent;
