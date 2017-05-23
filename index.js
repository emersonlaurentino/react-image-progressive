import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const style = {
  placeholder: {
    backgroundColor: '#FFF',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    overflow: 'hidden',
  },
  img: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    width: '100%',
    transition: 'opacity 1s linear',
  },
  loaded: {
    opacity: 1,
  },
  imgSmall: {
    filter: 'blur(50px)',
    transform: 'scale(1)',
  },
  container: {
    paddingBottom: '63.3333333333%',
    position: 'relative',
  }
}

class ImageProgressive extends PureComponent {
  static propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  };

  static defaultProps = {
    alt: '',
    className: '',
  };

  state = {
    isLoaded: false,
  }

  componentDidMount() {
    const { src } = this.props;

    this.loadImage(src);
  }

  componentWillReceiveProps(nextProps) {
    const { src } = nextProps;
    if (src !== this.props.src) {
      this.setState({ isLoaded: false }, () => {
        this.loadImage(src);
      });
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  onLoad = () => this.setState({
    isLoaded: true,
  });

  loadImage = (src) => {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }

    const image = new Image();

    this.image = image;

    image.onload = this.onLoad;
    image.src = src;
  };

  render() {
    const { alt, src, placeholder, className } = this.props;
    const { isLoaded } = this.state;
    const stylePlaceholder = {
      ...style.img,
      ...style.imgSmall,
      ...style.loaded
    }
    const styleImage = isLoaded ? ({
      ...style.img,
      ...style.loaded
    }) : style.img;

    return (
      <div style={style.placeholder} className={className}>
        <img src={placeholder} alt={alt} style={stylePlaceholder} />
        <div style={style.container} />
        <img src={src} alt={alt} style={styleImage} />
      </div>
    );
  }
}

export default ImageProgressive;
