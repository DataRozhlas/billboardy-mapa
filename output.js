/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/byeie.js":
/*!*********************!*\
  !*** ./js/byeie.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("if (navigator.appName === \"Microsoft Internet Explorer\" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {\n  var warn = document.createElement(\"div\");\n  warn.innerHTML = \"Používáte zastaralý Internet Explorer, takže vám části tohoto webu nemusí fungovat. Navíc to <a target=\\\"_blank\\\" style=\\\"color:white;\\\" rel=\\\"noopener noreferrer\\\" href=\\\"https://www.zive.cz/clanky/microsoft-internet-explorer-neni-prohlizec-prestante-ho-tak-pouzivat/sc-3-a-197149/default.aspx\\\">není bezpečné</a>, zvažte přechod na <a target=\\\"_blank\\\" style=\\\"color:white;\\\" rel=\\\"noopener noreferrer\\\" href=\\\"https://www.mozilla.org/cs/firefox/new/\\\">jiný prohlížeč</a>.\";\n  warn.style.cssText = \"text-align:center;position:absolute;width:100%;height:auto;opacity:1;z-index:100;background-color:#d52834;top:37px;padding-top:4px;padding-bottom:3px;color:white;\";\n  document.body.appendChild(warn);\n}\n\n//# sourceURL=webpack:///./js/byeie.js?");

/***/ }),

/***/ "./js/gcode.js":
/*!*********************!*\
  !*** ./js/gcode.js ***!
  \*********************/
/*! exports provided: gCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gCode\", function() { return gCode; });\nfunction gCode(map) {\n  var form = document.getElementById('frm-geocode');\n\n  form.onsubmit = function submitForm(event) {\n    event.preventDefault();\n    var text = document.getElementById('inp-geocode').value;\n\n    if (text === '') {\n      map.flyTo({\n        center: [15.3350758, 49.7417517],\n        zoom: 7\n      });\n    } else {\n      fetch(\"https://api.mapy.cz/geocode?query=\".concat(text)) // Mapy.cz geocoder\n      .then(function (res) {\n        return res.text();\n      }).then(function (str) {\n        return new window.DOMParser().parseFromString(str, 'text/xml');\n      }).then(function (results) {\n        var res = results.firstChild.children[0];\n\n        if (res.children.length === 0) {\n          document.getElementById('inp-geocode').style.borderColor = 'red';\n          return;\n        }\n\n        var x = parseFloat(res.children[0].attributes.x.value);\n        var y = parseFloat(res.children[0].attributes.y.value);\n\n        if (x < 12 || x > 19 || y < 48 || y > 52) {\n          // omezení geosearche na česko, plus mínus\n          document.getElementById('inp-geocode').style.borderColor = 'red';\n          return;\n        }\n\n        map.flyTo({\n          center: [x, y],\n          zoom: 10\n        });\n      })[\"catch\"](function (err) {\n        throw err;\n      });\n    }\n  };\n}\n\n//# sourceURL=webpack:///./js/gcode.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _byeie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./byeie */ \"./js/byeie.js\");\n/* harmony import */ var _byeie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_byeie__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _gcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gcode */ \"./js/gcode.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* eslint-disable quotes */\n\n/* eslint-disable quote-props */\n\n/* eslint-disable new-cap */\n // loučíme se s IE\n\n\nvar host = 'https://data.irozhlas.cz/billboardy-mapa';\n\nif (window.location.hostname === 'localhost') {\n  host = 'http://localhost/billboardy-mapa';\n}\n\nvar map = new mapboxgl.Map({\n  container: 'mapa_billboardy',\n  minZoom: 5,\n  maxZoom: 16,\n  style: {\n    'version': 8,\n    'sources': {\n      'raster-tiles': {\n        'type': 'raster',\n        'tiles': ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],\n        'tileSize': 256,\n        'attribution': 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, geocoder <a href=\"https://.mapy.cz/\">Mapy.cz</a>, data <a href=\"http://www.dicr.cz/\">Drážní inspekce ČR</a>.'\n      }\n    },\n    'layers': [{\n      'id': 'simple-tiles',\n      'type': 'raster',\n      'source': 'raster-tiles',\n      'minzoom': 4,\n      'maxzoom': 22\n    }]\n  },\n  center: [15.33507, 49.74175],\n  zoom: 6\n});\nmap.scrollZoom.disable();\nmap.addControl(new mapboxgl.NavigationControl());\n\nvar Legend =\n/*#__PURE__*/\nfunction () {\n  function Legend() {\n    _classCallCheck(this, Legend);\n  }\n\n  _createClass(Legend, [{\n    key: \"onAdd\",\n    value: function onAdd(map) {\n      this.map = map;\n      this.container = document.createElement('div');\n      this.container.id = 'legend';\n      this.container.innerHTML = 'Pro zobrazení konkrétních míst přibližte mapu.';\n      return this.container;\n    }\n  }, {\n    key: \"onRemove\",\n    value: function onRemove() {\n      this.container.parentNode.removeChild(this.container);\n      this.map = undefined;\n    }\n  }]);\n\n  return Legend;\n}();\n\nvar legend = new Legend();\nmap.addControl(legend, 'top-left');\nmap.on('load', function () {\n  map.addSource('nehody', {\n    'type': 'geojson',\n    'data': host + '/data/data.json'\n  });\n  /*\r\n    map.addLayer(\r\n      {\r\n        'id': 'nehody-heat',\r\n        'type': 'heatmap',\r\n        'source': 'nehody',\r\n        'maxzoom': 12,\r\n        'paint': {\r\n          // Increase the heatmap weight based on frequency and property magnitude\r\n          'heatmap-weight': [\r\n            'interpolate', ['linear'], ['+', ['get', 'ex'], ['get', 'tr'], ['get', 'lr']],\r\n            0, 0,\r\n            4, 1\r\n          ],\r\n          // Increase the heatmap color weight weight by zoom level\r\n          // heatmap-intensity is a multiplier on top of heatmap-weight\r\n          'heatmap-intensity': [\r\n            'interpolate', ['linear'], ['zoom'],\r\n            0, 1,\r\n            15, 3\r\n          ],\r\n          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).\r\n          // Begin color ramp at 0-stop with a 0-transparancy color\r\n          // to create a blur-like effect.\r\n          'heatmap-color': [\r\n            'interpolate', ['linear'], ['heatmap-density'],\r\n            0.0, 'rgba(252,187,161,0)',\r\n            0.2, 'rgb(252,146,114)',\r\n            0.4, 'rgb(251,106,74)',\r\n            0.6, 'rgb(239,59,44)',\r\n            0.8, 'rgb(203,24,29)',\r\n            1.0, 'rgb(153,0,13)'\r\n          ],\r\n          // polomer podle zoomu\r\n          'heatmap-radius': [\r\n            'interpolate', ['linear'], ['zoom'],\r\n            0, 8,\r\n            4, 20\r\n          ],\r\n          // prechod mezi heatmapou a body\r\n          'heatmap-opacity': [\r\n            'interpolate', ['linear'], ['zoom'],\r\n            7, 1,\r\n            10, 0\r\n          ]\r\n        }\r\n      }\r\n    )\r\n    */\n\n  map.addLayer({\n    'id': 'nehody-point',\n    'type': 'circle',\n    'source': 'nehody',\n    'minzoom': 5,\n    'paint': {\n      'circle-radius': 8,\n      // barva podle stavu zarizeni\n      'circle-color': ['match', ['get', 'stav'], 'odstraněno', 'rgba(49,130,189,0.5)', 'řešeno', 'rgba(222,45,38,0.5)', 'dílčí odstranění', 'rgba(230,85,13,0.5)', 'rgba(99,99,99,0.5)'],\n      'circle-stroke-color': 'white',\n      'circle-stroke-width': 1,\n      // prechod priuhlednosti mezi heatmapou a body\n      'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 8, 1]\n    }\n  });\n});\nmap.on('zoomend', function (e) {\n  if (map.getZoom() >= 8) {\n    document.getElementById('legend').innerHTML = 'Kliknutím vyberte místo nehod.';\n    map.getCanvas().style.cursor = 'default';\n  } else {\n    document.getElementById('legend').innerHTML = 'Pro zobrazení konkrétních míst přibližte mapu.';\n    map.getCanvas().style.cursor = 'grab';\n  }\n});\n\nfunction tratName(val) {\n  if (val.length > 4) {\n    return val;\n  } else {\n    return \"<i>bez jm\\xE9na</i>\";\n  }\n}\n\nmap.on('click', function (e) {\n  map.scrollZoom.enable();\n  var d = map.queryRenderedFeatures(e.point, {\n    layers: ['nehody-point']\n  });\n\n  if (d.length > 0) {\n    document.getElementById('legend').innerHTML = \"<b>Komunikace \".concat(d[0].properties.kom, \", \").concat(d[0].properties.stan, \". km</b><br>Stav: \").concat(d[0].properties.stav, \"<br>Typ za\\u0159\\xEDzen\\xED: \").concat(d[0].properties.typ);\n  }\n});\nObject(_gcode__WEBPACK_IMPORTED_MODULE_1__[\"gCode\"])(map);\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ })

/******/ });