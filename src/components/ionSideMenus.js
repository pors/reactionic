import React from 'react';

var IonSideMenus = React.createClass({
  render() {
    return (
      <div className="view snap-drawers">
        {this.props.children}
      </div>
    );
  }
});

export default IonSideMenus;
