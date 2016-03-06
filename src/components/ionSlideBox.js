import React from 'react';
import ReactSlick from 'react-slick';

var IonSlideBox = React.createClass({
  render() {
    var settings = {
      className: 'ion-slide-box',
      infinite: false,
      autoplay: false,
      arrows: false,
      dots: true,
      dotsClass: 'slick-dots slider-pager',
      initialSlide: 0
    };
    return (
        <ReactSlick {...settings}>
          { this.props.children }
        </ReactSlick>
    );
  }
});

export default IonSlideBox;
