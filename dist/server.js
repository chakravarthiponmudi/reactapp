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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express_graphql__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_morgan__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_morgan__);
var express = __webpack_require__(1);
//var graphqlHTTP = require('express-graphql');


var {buildSchema} = __webpack_require__(4);
//import {schema} from './graphql/sample.graphql'

// Construct a schema, using GraphQL schema language

var schema = buildSchema(`
  type Query {
    hello: String
    getMessage: String
  },
  type Mutation {
  setMessage(message: String): String
}
`);

var fakeDatabase = {};
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  setMessage: function ({message}) {
    fakeDatabase.message = message;
    return message;
  },
  getMessage: function () {
    return fakeDatabase.message;
  }
};

var app = express();
app.use(__WEBPACK_IMPORTED_MODULE_1_morgan___default.a('combined'));

app.use('/graphql', __WEBPACK_IMPORTED_MODULE_0_express_graphql___default.a({schema: schema, rootValue: root, graphiql: true}));
app.listen(8081);
//console.log(schema)
console.log('Running a GraphQL API server at localhost:8081/graphql!');


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map