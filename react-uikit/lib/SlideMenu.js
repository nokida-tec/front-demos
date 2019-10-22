'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var _SlideMenu = require('react-ui-component').SlideMenu;
var NS = require('./base/constant').NS;
var klassName = require('./base/util').klassName;

var SlideMenu = function (_Component) {
    _inherits(SlideMenu, _Component);

    function SlideMenu() {
        _classCallCheck(this, SlideMenu);

        return _possibleConstructorReturn(this, (SlideMenu.__proto__ || Object.getPrototypeOf(SlideMenu)).apply(this, arguments));
    }

    _createClass(SlideMenu, [{
        key: 'open',
        value: function open() {
            this.slide.open();
        }
    }, {
        key: 'close',
        value: function close() {
            this.slide.close();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = this.props;

            var className = klassName(props.className, NS);
            return React.createElement(_SlideMenu, _extends({}, props, { ref: function ref(slide) {
                    _this2.slide = slide;
                }, className: className }));
        }
    }]);

    return SlideMenu;
}(Component);

module.exports = {
    SlideMenu: SlideMenu
};