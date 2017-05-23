'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
  placeholder: {
    backgroundColor: '#FFF',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    overflow: 'hidden'
  },
  img: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    width: '100%',
    transition: 'opacity 1s linear'
  },
  loaded: {
    opacity: 1
  },
  imgSmall: {
    filter: 'blur(50px)',
    transform: 'scale(1)'
  },
  container: {
    paddingBottom: '63.3333333333%',
    position: 'relative'
  }
};

var ImageProgressive = function (_PureComponent) {
  _inherits(ImageProgressive, _PureComponent);

  function ImageProgressive() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ImageProgressive);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageProgressive.__proto__ || Object.getPrototypeOf(ImageProgressive)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isLoaded: false
    }, _this.onLoad = function () {
      return _this.setState({
        isLoaded: true
      });
    }, _this.loadImage = function (src) {
      if (_this.image) {
        _this.image.onload = null;
        _this.image.onerror = null;
      }

      var image = new Image();

      _this.image = image;

      image.onload = _this.onLoad;
      image.src = src;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ImageProgressive, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var src = this.props.src;


      this.loadImage(src);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var src = nextProps.src;

      if (src !== this.props.src) {
        this.setState({ isLoaded: false }, function () {
          _this2.loadImage(src);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.image) {
        this.image.onload = null;
        this.image.onerror = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          alt = _props.alt,
          src = _props.src,
          placeholder = _props.placeholder,
          className = _props.className;
      var isLoaded = this.state.isLoaded;

      var stylePlaceholder = _extends({}, style.img, style.imgSmall, style.loaded);
      var styleImage = isLoaded ? _extends({}, style.img, style.loaded) : style.img;

      return _react2.default.createElement(
        'div',
        { style: style.placeholder, className: className },
        _react2.default.createElement('img', { src: placeholder, alt: alt, style: stylePlaceholder }),
        _react2.default.createElement('div', { style: style.container }),
        _react2.default.createElement('img', { src: src, alt: alt, style: styleImage })
      );
    }
  }]);

  return ImageProgressive;
}(_react.PureComponent);

ImageProgressive.propTypes = {
  alt: _propTypes2.default.string,
  className: _propTypes2.default.string,
  placeholder: _propTypes2.default.string.isRequired,
  src: _propTypes2.default.string.isRequired
};
ImageProgressive.defaultProps = {
  alt: '',
  className: ''
};
exports.default = ImageProgressive;
