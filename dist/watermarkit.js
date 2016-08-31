(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Watermarkit"] = factory();
	else
		root["Watermarkit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (canvas, opts) {
	  var watermark = createWatermark(opts);
	  return applyWatermark(canvas, watermark);
	};
	
	function createWatermark(opts) {
	  var text = opts.text;
	  var fontSize = opts.fontSize;
	  var fontFamily = opts.fontFamily;
	  var fillStyle = opts.fillStyle;
	  var opacity = opts.opacity;
	
	  var canvas = document.createElement('canvas');
	  var ctx = canvas.getContext('2d');
	  setStyle();
	  var width = ctx.measureText(text).width;
	  var height = fontSize;
	  canvas.width = canvas.height = Math.sqrt(2) / 2 * (width + height);
	
	  ctx.translate(0, Math.sqrt(2) / 2 * height);
	  ctx.rotate(45 * Math.PI / 180);
	
	  setStyle();
	  ctx.fillText(text, 0, 0);
	  return canvas;
	  function setStyle() {
	    ctx.globalAlpha = opacity;
	    ctx.font = fontSize + 'px ' + fontFamily;
	    ctx.fillStyle = fillStyle;
	  }
	}
	
	function applyWatermark(canvas, watermark) {
	  var ctx = canvas.getContext('2d');
	  var width = canvas.width;
	  var height = canvas.height;
	  var wmW = watermark.width;
	  var wmH = watermark.height;
	
	  var unit = (wmW + wmH) / 2;
	  var container = {
	    start: {
	      x: -unit,
	      y: -unit
	    },
	    end: {
	      x: width + unit,
	      y: height + unit
	    }
	  };
	  var x = container.start.x;
	  var y = container.start.y;
	  var count = 0;
	  while (x <= container.end.x) {
	    ctx.drawImage(watermark, 0, 0, wmW, wmH, x, y, wmW, wmH);
	    y += unit / 2;
	    if (y > container.end.y) {
	      x += unit;
	      y = container.start.y;
	    }
	  }
	  return canvas;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=watermarkit.js.map