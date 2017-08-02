'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactI18next = require('react-i18next');

var _getTranslation = require('./get-translation');

var _getTranslation2 = _interopRequireDefault(_getTranslation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (i18nHelper) {
  return function (Page) {
    return function (_React$Component) {
      (0, _inherits3.default)(Wrapper, _React$Component);

      function Wrapper(props) {
        (0, _classCallCheck3.default)(this, Wrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

        var translations = props.translations,
            _props$pageInitialPro = props.pageInitialProps,
            pageInitialProps = _props$pageInitialPro === undefined ? {} : _props$pageInitialPro;

        _this.i18n = i18nHelper.getI18n(translations);
        _this.pageInitialProps = (0, _extends3.default)({}, props, pageInitialProps);
        delete _this.pageInitialProps.pageInitialProps;
        delete _this.pageInitialProps.translations;
        return _this;
      }

      (0, _createClass3.default)(Wrapper, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            _reactI18next.I18nextProvider,
            { i18n: this.i18n },
            _react2.default.createElement(Page, this.pageInitialProps)
          );
        }
      }], [{
        key: 'getInitialProps',
        value: function () {
          var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
            var pageInitialProps, translateNS, translations;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    pageInitialProps = {};
                    _context.t0 = Page.getInitialProps;

                    if (!_context.t0) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 5;
                    return Page.getInitialProps(ctx);

                  case 5:
                    pageInitialProps = _context.sent;

                  case 6:
                    if (ctx.req) {
                      _context.next = 8;
                      break;
                    }

                    return _context.abrupt('return', { pageInitialProps: pageInitialProps

                      //translation
                    });

                  case 8:
                    translateNS = [].concat((0, _toConsumableArray3.default)(Page.translateNS || [])).filter(function (item, pos, self) {
                      return self.indexOf(item) == pos;
                    });
                    _context.next = 11;
                    return (0, _getTranslation2.default)(i18nHelper.localesBaseUrl)(i18nHelper.getCurrentLanguage(ctx.req), translateNS, ctx.req);

                  case 11:
                    translations = _context.sent;
                    return _context.abrupt('return', {
                      translations: translations,
                      pageInitialProps: pageInitialProps
                    });

                  case 13:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function getInitialProps(_x) {
            return _ref.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }]);
      return Wrapper;
    }(_react2.default.Component);
  };
};