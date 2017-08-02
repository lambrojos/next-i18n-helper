'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.apiUrls = apiUrls;

var _isomorphicUnfetch = require('isomorphic-unfetch');

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {string} lang 目标语言
 * @param {string|string[]} files translate filepath / namespaces / ns
 * @param {Request} req Request 对象来自express
 * @return {i18n}  
 */
exports.default = function (baseUrl) {
  var getNS = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(lang, ns, req) {
      var r, json;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _isomorphicUnfetch2.default)(apiUrls(baseUrl + '/' + lang + '/' + ns + '.json', req), {}, req);

            case 2:
              r = _context3.sent;
              _context3.next = 5;
              return r.json();

            case 5:
              json = _context3.sent;
              return _context3.abrupt('return', json);

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function getNS(_x5, _x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }();

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(lang, files, req) {
      var _this = this;

      var langData;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:

              if (!Array.isArray(files)) files = [files];

              langData = {};
              _context2.next = 4;
              return Promise.all(files.map(function () {
                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(file) {
                  var json;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return getNS(lang, file, req);

                        case 2:
                          json = _context.sent;

                          langData[file] = json;
                          return _context.abrupt('return', true);

                        case 5:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 4:
              return _context2.abrupt('return', (0, _defineProperty3.default)({}, lang, langData));

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getTranslation(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return getTranslation;
  }();
};

function apiUrls(path, req) {
  return req ? req.protocol + '://' + req.get('host') + path : path;
}