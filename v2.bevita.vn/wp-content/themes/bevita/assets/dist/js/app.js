/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/scripts/app.js":
/*!***********************************!*\
  !*** ./assets/src/scripts/app.js ***!
  \***********************************/
/***/ (() => {

eval("{jQuery(document).ready(function ($) {\n  gsap.registerPlugin(ScrollTrigger);\n  var wrappers = gsap.utils.toArray(\".solution-card\");\n  var cards = wrappers.map(function (w) {\n    return w;\n  });\n  wrappers.forEach(function (wrapper, i) {\n    var scale = 1;\n    var opacity = 1;\n    if (i !== wrappers.length - 1) {\n      scale = 0.9 + 0.025 * i;\n      opacity = 0.5;\n    }\n    gsap.to(cards[i], {\n      scale: scale,\n      opacity: opacity,\n      transformOrigin: \"top center\",\n      ease: \"none\",\n      scrollTrigger: {\n        trigger: wrapper,\n        start: \"top \" + (60 + 10 * i),\n        end: \"bottom 656\",\n        endTrigger: \".home-solution__content\",\n        scrub: true,\n        pin: wrapper,\n        pinSpacing: false,\n        id: \"card-\" + (i + 1)\n        // markers: true,\n      }\n    });\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwiJCIsImdzYXAiLCJyZWdpc3RlclBsdWdpbiIsIlNjcm9sbFRyaWdnZXIiLCJ3cmFwcGVycyIsInV0aWxzIiwidG9BcnJheSIsImNhcmRzIiwibWFwIiwidyIsImZvckVhY2giLCJ3cmFwcGVyIiwiaSIsInNjYWxlIiwib3BhY2l0eSIsImxlbmd0aCIsInRvIiwidHJhbnNmb3JtT3JpZ2luIiwiZWFzZSIsInNjcm9sbFRyaWdnZXIiLCJ0cmlnZ2VyIiwic3RhcnQiLCJlbmQiLCJlbmRUcmlnZ2VyIiwic2NydWIiLCJwaW4iLCJwaW5TcGFjaW5nIiwiaWQiXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmV2aXRhLy4vYXNzZXRzL3NyYy9zY3JpcHRzL2FwcC5qcz82NzU5Il0sInNvdXJjZXNDb250ZW50IjpbImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcclxuICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xyXG5cclxuICBjb25zdCB3cmFwcGVycyA9IGdzYXAudXRpbHMudG9BcnJheShcIi5zb2x1dGlvbi1jYXJkXCIpO1xyXG4gIGNvbnN0IGNhcmRzID0gd3JhcHBlcnMubWFwKCh3KSA9PiB3KTtcclxuXHJcbiAgd3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlciwgaSkgPT4ge1xyXG4gICAgbGV0IHNjYWxlID0gMTtcclxuICAgIGxldCBvcGFjaXR5ID0gMTtcclxuXHJcbiAgICBpZiAoaSAhPT0gd3JhcHBlcnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBzY2FsZSA9IDAuOSArIDAuMDI1ICogaTtcclxuICAgICAgb3BhY2l0eSA9IDAuNTtcclxuICAgIH1cclxuICAgIGdzYXAudG8oY2FyZHNbaV0sIHtcclxuICAgICAgc2NhbGU6IHNjYWxlLFxyXG4gICAgICBvcGFjaXR5OiBvcGFjaXR5LFxyXG4gICAgICB0cmFuc2Zvcm1PcmlnaW46IFwidG9wIGNlbnRlclwiLFxyXG4gICAgICBlYXNlOiBcIm5vbmVcIixcclxuICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgIHRyaWdnZXI6IHdyYXBwZXIsXHJcbiAgICAgICAgc3RhcnQ6IFwidG9wIFwiICsgKDYwICsgMTAgKiBpKSxcclxuICAgICAgICBlbmQ6IFwiYm90dG9tIDY1NlwiLFxyXG4gICAgICAgIGVuZFRyaWdnZXI6IFwiLmhvbWUtc29sdXRpb25fX2NvbnRlbnRcIixcclxuICAgICAgICBzY3J1YjogdHJ1ZSxcclxuICAgICAgICBwaW46IHdyYXBwZXIsXHJcbiAgICAgICAgcGluU3BhY2luZzogZmFsc2UsXHJcbiAgICAgICAgaWQ6IFwiY2FyZC1cIiArIChpICsgMSksXHJcbiAgICAgICAgLy8gbWFya2VyczogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQUEsTUFBTSxDQUFDQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFVBQVVDLENBQUMsRUFBRTtFQUNsQ0MsSUFBSSxDQUFDQyxjQUFjLENBQUNDLGFBQWEsQ0FBQztFQUVsQyxJQUFNQyxRQUFRLEdBQUdILElBQUksQ0FBQ0ksS0FBSyxDQUFDQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7RUFDckQsSUFBTUMsS0FBSyxHQUFHSCxRQUFRLENBQUNJLEdBQUcsQ0FBQyxVQUFDQyxDQUFDO0lBQUEsT0FBS0EsQ0FBQztFQUFBLEVBQUM7RUFFcENMLFFBQVEsQ0FBQ00sT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBRUMsQ0FBQyxFQUFLO0lBQy9CLElBQUlDLEtBQUssR0FBRyxDQUFDO0lBQ2IsSUFBSUMsT0FBTyxHQUFHLENBQUM7SUFFZixJQUFJRixDQUFDLEtBQUtSLFFBQVEsQ0FBQ1csTUFBTSxHQUFHLENBQUMsRUFBRTtNQUM3QkYsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUdELENBQUM7TUFDdkJFLE9BQU8sR0FBRyxHQUFHO0lBQ2Y7SUFDQWIsSUFBSSxDQUFDZSxFQUFFLENBQUNULEtBQUssQ0FBQ0ssQ0FBQyxDQUFDLEVBQUU7TUFDaEJDLEtBQUssRUFBRUEsS0FBSztNQUNaQyxPQUFPLEVBQUVBLE9BQU87TUFDaEJHLGVBQWUsRUFBRSxZQUFZO01BQzdCQyxJQUFJLEVBQUUsTUFBTTtNQUNaQyxhQUFhLEVBQUU7UUFDYkMsT0FBTyxFQUFFVCxPQUFPO1FBQ2hCVSxLQUFLLEVBQUUsTUFBTSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUdULENBQUMsQ0FBQztRQUM3QlUsR0FBRyxFQUFFLFlBQVk7UUFDakJDLFVBQVUsRUFBRSx5QkFBeUI7UUFDckNDLEtBQUssRUFBRSxJQUFJO1FBQ1hDLEdBQUcsRUFBRWQsT0FBTztRQUNaZSxVQUFVLEVBQUUsS0FBSztRQUNqQkMsRUFBRSxFQUFFLE9BQU8sSUFBSWYsQ0FBQyxHQUFHLENBQUM7UUFDcEI7TUFDRjtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdLCJmaWxlIjoiLi9hc3NldHMvc3JjL3NjcmlwdHMvYXBwLmpzIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./assets/src/scripts/app.js\n\n}");

/***/ }),

/***/ "./assets/src/scss/app.scss":
/*!**********************************!*\
  !*** ./assets/src/scss/app.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvc3JjL3Njc3MvYXBwLnNjc3MiLCJtYXBwaW5ncyI6IjtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmV2aXRhLy4vYXNzZXRzL3NyYy9zY3NzL2FwcC5zY3NzPzE2ZDgiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./assets/src/scss/app.scss\n\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbevita"] = self["webpackChunkbevita"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./assets/src/scripts/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./assets/src/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;