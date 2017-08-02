'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _locale = require('locale');

var _locale2 = _interopRequireDefault(_locale);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = require('i18next-xhr-backend');

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _i18nextLocalstorageCache = require('i18next-localstorage-cache');

var _i18nextLocalstorageCache2 = _interopRequireDefault(_i18nextLocalstorageCache);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isServerSide = typeof window === 'undefined';

/**
 * 多国语言帮助类
 */

var I18nHelper = function () {

  /**
   * Creates an instance of I18nHelper.
   * @param {Object} opt
   * @param {string} [opt.defaultLang = 'en'] 默认语言
   * @param {string[]} [opt.supportLangs = ['en']] 支持的语言
   * @param {string} [opt.langCookieName = 'lang'] 使用cookie名
   * @param {number} [opt.langCookieExpire = 365] cookie过期时间（天）
   * @param {string} [opt.localesBaseUrl] 文件的基础位置
   * @param {Object} [opt.i18nOption] 扩展i18n的参数
   * @param {module[]} [opt.plugins] i18n插件，默认xhr和localstorage
   * @memberof I18nHelper
   */
  function I18nHelper() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, I18nHelper);
    var _opt$defaultLang = opt.defaultLang,
        defaultLang = _opt$defaultLang === undefined ? 'en' : _opt$defaultLang,
        _opt$supportLangs = opt.supportLangs,
        supportLangs = _opt$supportLangs === undefined ? ['en'] : _opt$supportLangs,
        _opt$langCookieName = opt.langCookieName,
        langCookieName = _opt$langCookieName === undefined ? 'lang' : _opt$langCookieName,
        _opt$langCookieExpire = opt.langCookieExpire,
        langCookieExpire = _opt$langCookieExpire === undefined ? 365 : _opt$langCookieExpire,
        _opt$plugins = opt.plugins,
        plugins = _opt$plugins === undefined ? isServerSide ? [] : [_i18nextXhrBackend2.default, _i18nextLocalstorageCache2.default] : _opt$plugins,
        _opt$localesBaseUrl = opt.localesBaseUrl,
        localesBaseUrl = _opt$localesBaseUrl === undefined ? '/static/locales' : _opt$localesBaseUrl,
        _opt$i18nOption = opt.i18nOption,
        i18nOption = _opt$i18nOption === undefined ? {
      cache: {
        enabled: true,
        expirationTime: 7 * 24 * 60 * 60 * 1000
      },
      backend: {
        loadPath: localesBaseUrl + '/{{lng}}/{{ns}}.json',
        addPath: localesBaseUrl + '/{{lng}}/{{ns}}.json'
      }
    } : _opt$i18nOption;


    this.defaultLang = defaultLang;
    this.supportLangs = supportLangs;
    this.langCookieName = langCookieName;
    this.langCookieExpire = langCookieExpire;
    this.i18nOption = i18nOption;
    this.plugins = plugins;
    this.localesBaseUrl = localesBaseUrl;

    this.i18n = null;
    this.currentLang = null;
  }

  (0, _createClass3.default)(I18nHelper, [{
    key: 'getWrapper',
    value: function getWrapper() {
      return (0, _wrapper2.default)(this);
    }

    /**
     * 获取当前语言，判定顺序：cookie（req.cookies或document.cookie）->browser（req.headers["accept-language"]或navigator.language || navigator.userLanguage）
     * @param {Request} req Request 对象来自express 
     * @return {string}
     */

  }, {
    key: 'getCurrentLanguage',
    value: function getCurrentLanguage(req) {
      var _this = this;

      var that = this;
      var getCurrentLang = function getCurrentLang() {
        //from cookie
        var fromCookie = req ? req.cookies ? req.cookies[that.langCookieName] : _this.defaultLang : _jsCookie2.default.get(that.langCookieName);

        if (that.supportLangs.includes(fromCookie)) return fromCookie;

        var supported = new _locale2.default.Locales(that.supportLangs, that.defaultLang);
        if (req) {
          var locales = new _locale2.default.Locales(req.headers["accept-language"]);
          return locales.best(supported).language;
        } else {
          var locales = new _locale2.default.Locales(navigator.language || navigator.userLanguage);
          return locales.best(supported).language;
        }
      };

      (req || !this.currentLang) && (this.currentLang = getCurrentLang());

      return this.currentLang;
    }

    /**
     * 设置cookie（只会在客户端发生）
     * @param {string} lang 
     * @param {instance of I18n} i18n
     * @param {Object} langData
     */

  }, {
    key: 'setCurrentLanguage',
    value: function setCurrentLanguage(lang) {
      if (isServerSide) return;
      _jsCookie2.default.set(this.langCookieName, lang, { expires: this.langCookieExpire });
      this.i18n.changeLanguage(lang);
      this.currentLang = lang;
    }

    /**
     * 清除cookie
     */

  }, {
    key: 'clearCurrentLanguage',
    value: function clearCurrentLanguage() {
      _jsCookie2.default.remove(this.langCookieName);
      this.currentLang = null;
    }

    /**
     * 获取初始化的i18n实例，server side始终新建，客户端单例模式
     * @param {any} translationData 
     * @param {any[]} i18nPlugins 
     * @returns {instance of I18next}
     */

  }, {
    key: 'getI18n',
    value: function getI18n(translationData, i18nPlugins) {
      var that = this;
      if (isServerSide) return innerGetI18n();

      if (this.i18n) return this.i18n;

      this.i18n = innerGetI18n();
      return this.i18n;

      function innerGetI18n() {
        var ns = ['common'];
        translationData && translationData[that.currentLang] && (ns = Object.keys(translationData[that.currentLang]));
        var options = {
          lng: that.getCurrentLanguage(), // active language http://i18next.com/translate/
          fallbackLng: that.defaultLang,
          resources: isServerSide ? translationData : undefined,
          ns: ns,
          defaultNS: 'common',
          debug: false,
          initImmediate: isServerSide
        };

        var i18nInstance = (i18nPlugins || that.plugins).reduce(function (i18n, plugin) {
          return i18n.use(plugin);
        }, _i18next2.default).init((0, _extends3.default)({}, options, that.i18nOption));

        translationData && Object.keys(translationData).forEach(function (lang) {
          Object.keys(translationData[lang]).forEach(function (ns) {
            i18nInstance.addResourceBundle(lang, ns, translationData[lang][ns]);
          });
        });

        return i18nInstance;
      }
    }
  }]);
  return I18nHelper;
}();

exports.default = I18nHelper;