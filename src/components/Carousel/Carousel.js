import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import styled from 'styled-components'


const Container = styled.div `
  overflow: hidden;
  position: relative;
  width: "100%";
  height:"500px"
`;

const leftArrow = styled.div `
  background: #191970;
  color: #F8F8FF;
  position: absolute;
`;

const rightArrow = styled.div `
  background: #191970;
  color: #F8F8FF;
  position: absolute;
`;

const leftDiv = styled.div `
  background: rgba(0,0,0,0);
  height: 500px;
  position: absolute;
  width: 50%;
`;

const rightDiv = styled.div `
  background: rgba(0,0,0,0);
  height: 500px;
  position: absolute;
  width: 50%;

`;

const description = styled.h1 `
  font-size: 100px;
  font-family: "Times New Roman", Times, serif;
  text-align: center;
`;

const imageData = require('./img.json');

class Carousel extends Component {

  constructor(props) {
   super(props);
   this.state = {
     value: 0,
    };
   this.sliderProp(props);
   this.createSlides(props);
   this.bindHanlders(['onSlideLeft', 'onSlideRight']);
  }

  sliderProp({
   duration = 500
  }) {
   this.width = "100%";
   this.height = "500px";
   this.duration = duration + 'ms';
 };
  componentDidUpdate(prevProps, prevState) {
   const value = prevState;
   const {direction} = this.state;
   const slideBackward = (value === -1) && direction === 'left';
   const slideForward = (value === this.slides.length) && direction === 'right';
   const doSlideAfterSkip = (flag, slideFn) => {
     if (flag) {
       setTimeout(() => slideFn.call(this), 200);
      }
    };
      doSlideAfterSkip(slideBackward, this.onSlideLeft);
      doSlideAfterSkip(slideForward, this.onSlideRight);
  };

  componentWillUpdate(nextProps, nextState) {
   const {value, direction} = nextState;
   const moveToLastSlide = (direction === 'left' && this.state.value === -1 && value === this.slides.length - 1);
   const moveToFirstSlide = (value === 0 && direction === 'right' && this.state.value === this.slides.length)
     if (moveToFirstSlide || moveToLastSlide) {
      this.duration = '0s';
    } else {
      this.duration = this.props.duration + 'ms';
    }
  };



  createSlides = () => {
    this.slides = imageData.map((imageData, index) => {
    const style = Object.assign({width: this.width,
                                 height: this.height,
                                 flexShrink: 0,
                                 background: `url(${imageData.url}) center`,
                                 backgroundSize: 'cover'});
      return React.createElement('div',
                                 {style, value: index});
    });
      this.Forward = React.cloneElement(this.slides[this.slides.length - 1],{
                     value: this.slides.length,
    });
      this.Backward = React.cloneElement(this.slides[0], {
                      value: -1,
    });
  };

  bindHanlders = (handlers) => {
     handlers.forEach((handler) => {
     this[handler] = this[handler].bind(this);
    });
  };

  onSlideLeft = () => {
     let value = this.state.value === - 1  ? this.slides.length - 1 : this.state.value - 1;
     this.setState({value, direction: 'left'});
  };

  onSlideRight = () => {
    let value = this.state.value === this.slides.length ? 0 : this.state.value + 1;
    this.setState({value, direction: 'right'});
  };

  displayDescription = () => {
    const value = this.state.value;
      if (value === -1) {
        return imageData[imageData.length - 1].description;
    } else if (value === imageData.length) {
        return imageData[0].description;
    }
        return imageData[value].description;
  };

  getPrev = () => {
    const value = this.state.value;
    const message = 'Previous: +  ';
      if (value === 0){
        return message + imageData.length;
      }
    if (value === -1){
      return message + (imageData.length - 1);
    }
      return message + value;
  };

  getNext = () => {
    const value = this.state.value;
    const message = 'Next: +  ';
    if (value === -1 || value === imageData.length - 1) {
       return message + 1;
    } else if (value === imageData.length) {
       return message + 2;
    }
    return message + (value + 2);
  };

  Wrapper = () => {
    return {
      wrapper: {
        display: 'flex',
        transitionDuration: this.duration,
        transform: `translateX(${ 100 * -(this.state.value + 1)}%)`
      }
    };
  }
  render() {
    const style = this.Wrapper();
    return (
    <Container>
    <leftArrow data-tip="data-tip" data-for="prevTip" onClick={this.onSlideLeft}>
        <i className="fa fa-angle-left fa-fw fa-3x"></i>
    </leftArrow>
    <div style={style.wrapper}>
        {this.Forward}
        {this.slides}
        {this.Backward}
    </div>
    <rightArrow data-tip="data-tip" data-for="nextTip" onClick={this.onSlideRight}>
         <i className="fa fa-angle-right fa-fw fa-3x"></i>
    </rightArrow>
    <div>
    <description >{this.displayDescription()}</description>
    </div>
    <leftDiv onClick={this.onSlideLeft}></leftDiv>
    <rightDiv onClick={this.onSlideRight}></rightDiv>
    <ReactTooltip id="prevTip" globalEventOff="click" getContent={() => this.getPrev()} place="right" effect="solid"/>
    <ReactTooltip id="nextTip" globalEventOff="click" getContent={() => this.getNext()} place="left" effect="solid"/>
    </Container>);

  }
}
Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  width: PropTypes.string,
  height: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number
};

export default Carousel;
