/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/apps/route";
exports.ids = ["app/api/apps/route"];
exports.modules = {

/***/ "(rsc)/./app/api/apps/route.ts":
/*!*******************************!*\
  !*** ./app/api/apps/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var composio_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! composio-core */ \"(rsc)/./node_modules/composio-core/index.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_api_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/api-utils */ \"(rsc)/./lib/api-utils.ts\");\n\n\n\nasync function GET(request) {\n    const apiKey = (0,_lib_api_utils__WEBPACK_IMPORTED_MODULE_2__.getEffectiveApiKey)(request);\n    if (!apiKey) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"API key is not configured\"\n        }, {\n            status: 401\n        });\n    }\n    const composio = new composio_core__WEBPACK_IMPORTED_MODULE_0__.Composio({\n        apiKey: apiKey\n    });\n    const url = new URL(request.url);\n    const appName = url.searchParams.get(\"name\") || \"\";\n    const apps = await composio.apps.list();\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(apps);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FwcHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF5QztBQUNFO0FBQ1U7QUFHOUMsZUFBZUcsSUFBSUMsT0FBb0I7SUFDNUMsTUFBTUMsU0FBU0gsa0VBQWtCQSxDQUFDRTtJQUVsQyxJQUFJLENBQUNDLFFBQVE7UUFDWCxPQUFPSixxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQTRCLEdBQ3JDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtJQUVBLE1BQU1DLFdBQVcsSUFBSVQsbURBQVFBLENBQUM7UUFBRUssUUFBUUE7SUFBTztJQUMvQyxNQUFNSyxNQUFNLElBQUlDLElBQUlQLFFBQVFNLEdBQUc7SUFDL0IsTUFBTUUsVUFBVUYsSUFBSUcsWUFBWSxDQUFDQyxHQUFHLENBQUMsV0FBVztJQUNoRCxNQUFNQyxPQUFPLE1BQU1OLFNBQVNNLElBQUksQ0FBQ0MsSUFBSTtJQUNyQyxPQUFPZixxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDUztBQUMzQiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBZG1pblxcT25lRHJpdmVcXERlc2t0b3BcXGNvbXBvLWFwcFxcaW50ZWdyYXRpb24tY29tcG9zaW9cXGNvbXBvc2lvLWRhc2hib2FyZFxcYXBwXFxhcGlcXGFwcHNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2lvIH0gZnJvbSBcImNvbXBvc2lvLWNvcmVcIjtcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IGdldEVmZmVjdGl2ZUFwaUtleSB9IGZyb20gXCJAL2xpYi9hcGktdXRpbHNcIjtcclxuaW1wb3J0IHsgTmV4dFJlcXVlc3QgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICBjb25zdCBhcGlLZXkgPSBnZXRFZmZlY3RpdmVBcGlLZXkocmVxdWVzdCk7XHJcblxyXG4gIGlmICghYXBpS2V5KSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiQVBJIGtleSBpcyBub3QgY29uZmlndXJlZFwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA0MDEgfSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb21wb3NpbyA9IG5ldyBDb21wb3Npbyh7IGFwaUtleTogYXBpS2V5IH0pO1xyXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xyXG4gIGNvbnN0IGFwcE5hbWUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcIm5hbWVcIikgfHwgXCJcIjtcclxuICBjb25zdCBhcHBzID0gYXdhaXQgY29tcG9zaW8uYXBwcy5saXN0KCk7XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGFwcHMpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJDb21wb3NpbyIsIk5leHRSZXNwb25zZSIsImdldEVmZmVjdGl2ZUFwaUtleSIsIkdFVCIsInJlcXVlc3QiLCJhcGlLZXkiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJjb21wb3NpbyIsInVybCIsIlVSTCIsImFwcE5hbWUiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJhcHBzIiwibGlzdCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/apps/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/api-utils.ts":
/*!**************************!*\
  !*** ./lib/api-utils.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LOCAL_STORAGE_API_KEY: () => (/* binding */ LOCAL_STORAGE_API_KEY),\n/* harmony export */   getEffectiveApiKey: () => (/* binding */ getEffectiveApiKey)\n/* harmony export */ });\nconst CUSTOM_API_KEY_HEADER = \"x-custom-api-key\";\n/**\r\n * Gets the effective API key to use for Composio requests.\r\n * Prioritizes the key from the custom header if present, otherwise falls back\r\n * to the environment variable.\r\n *\r\n * @param request The incoming NextRequest or Request object.\r\n * @returns The API key to use, or an empty string if none is found.\r\n */ function getEffectiveApiKey(request) {\n    const customApiKey = request.headers.get(CUSTOM_API_KEY_HEADER);\n    console.log(\"Custom API key:\", customApiKey);\n    if (customApiKey) {\n        return customApiKey;\n    }\n    // Ensure we return an empty string if the env var is not set,\n    // aligning with previous logic in some routes.\n    return process.env.COMPOSIO_API_KEY || \"\";\n}\n// Constant for local storage key to be used in frontend\nconst LOCAL_STORAGE_API_KEY = \"composio-custom-api-key\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXBpLXV0aWxzLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTUEsd0JBQXdCO0FBRTlCOzs7Ozs7O0NBT0MsR0FDTSxTQUFTQyxtQkFBbUJDLE9BQThCO0lBQy9ELE1BQU1DLGVBQWVELFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTDtJQUN6Q00sUUFBUUMsR0FBRyxDQUFDLG1CQUFtQko7SUFDL0IsSUFBSUEsY0FBYztRQUNoQixPQUFPQTtJQUNUO0lBQ0EsOERBQThEO0lBQzlELCtDQUErQztJQUMvQyxPQUFPSyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQixJQUFJO0FBQ3pDO0FBRUEsd0RBQXdEO0FBQ2pELE1BQU1DLHdCQUF3QiwwQkFBMEIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQWRtaW5cXE9uZURyaXZlXFxEZXNrdG9wXFxjb21wby1hcHBcXGludGVncmF0aW9uLWNvbXBvc2lvXFxjb21wb3Npby1kYXNoYm9hcmRcXGxpYlxcYXBpLXV0aWxzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcblxyXG5jb25zdCBDVVNUT01fQVBJX0tFWV9IRUFERVIgPSBcIngtY3VzdG9tLWFwaS1rZXlcIjtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBlZmZlY3RpdmUgQVBJIGtleSB0byB1c2UgZm9yIENvbXBvc2lvIHJlcXVlc3RzLlxyXG4gKiBQcmlvcml0aXplcyB0aGUga2V5IGZyb20gdGhlIGN1c3RvbSBoZWFkZXIgaWYgcHJlc2VudCwgb3RoZXJ3aXNlIGZhbGxzIGJhY2tcclxuICogdG8gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlLlxyXG4gKlxyXG4gKiBAcGFyYW0gcmVxdWVzdCBUaGUgaW5jb21pbmcgTmV4dFJlcXVlc3Qgb3IgUmVxdWVzdCBvYmplY3QuXHJcbiAqIEByZXR1cm5zIFRoZSBBUEkga2V5IHRvIHVzZSwgb3IgYW4gZW1wdHkgc3RyaW5nIGlmIG5vbmUgaXMgZm91bmQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlQXBpS2V5KHJlcXVlc3Q6IE5leHRSZXF1ZXN0IHwgUmVxdWVzdCk6IHN0cmluZyB7XHJcbiAgY29uc3QgY3VzdG9tQXBpS2V5ID0gcmVxdWVzdC5oZWFkZXJzLmdldChDVVNUT01fQVBJX0tFWV9IRUFERVIpO1xyXG4gIGNvbnNvbGUubG9nKFwiQ3VzdG9tIEFQSSBrZXk6XCIsIGN1c3RvbUFwaUtleSk7XHJcbiAgaWYgKGN1c3RvbUFwaUtleSkge1xyXG4gICAgcmV0dXJuIGN1c3RvbUFwaUtleTtcclxuICB9XHJcbiAgLy8gRW5zdXJlIHdlIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGVudiB2YXIgaXMgbm90IHNldCxcclxuICAvLyBhbGlnbmluZyB3aXRoIHByZXZpb3VzIGxvZ2ljIGluIHNvbWUgcm91dGVzLlxyXG4gIHJldHVybiBwcm9jZXNzLmVudi5DT01QT1NJT19BUElfS0VZIHx8IFwiXCI7XHJcbn1cclxuXHJcbi8vIENvbnN0YW50IGZvciBsb2NhbCBzdG9yYWdlIGtleSB0byBiZSB1c2VkIGluIGZyb250ZW5kXHJcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0FQSV9LRVkgPSBcImNvbXBvc2lvLWN1c3RvbS1hcGkta2V5XCI7XHJcbiJdLCJuYW1lcyI6WyJDVVNUT01fQVBJX0tFWV9IRUFERVIiLCJnZXRFZmZlY3RpdmVBcGlLZXkiLCJyZXF1ZXN0IiwiY3VzdG9tQXBpS2V5IiwiaGVhZGVycyIsImdldCIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwiZW52IiwiQ09NUE9TSU9fQVBJX0tFWSIsIkxPQ0FMX1NUT1JBR0VfQVBJX0tFWSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/api-utils.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fapps%2Froute&page=%2Fapi%2Fapps%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fapps%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fapps%2Froute&page=%2Fapi%2Fapps%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fapps%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Admin_OneDrive_Desktop_compo_app_integration_composio_composio_dashboard_app_api_apps_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/apps/route.ts */ \"(rsc)/./app/api/apps/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/apps/route\",\n        pathname: \"/api/apps\",\n        filename: \"route\",\n        bundlePath: \"app/api/apps/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Admin\\\\OneDrive\\\\Desktop\\\\compo-app\\\\integration-composio\\\\composio-dashboard\\\\app\\\\api\\\\apps\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Admin_OneDrive_Desktop_compo_app_integration_composio_composio_dashboard_app_api_apps_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhcHBzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhcHBzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXBwcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbiU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q2NvbXBvLWFwcCU1Q2ludGVncmF0aW9uLWNvbXBvc2lvJTVDY29tcG9zaW8tZGFzaGJvYXJkJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbiU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q2NvbXBvLWFwcCU1Q2ludGVncmF0aW9uLWNvbXBvc2lvJTVDY29tcG9zaW8tZGFzaGJvYXJkJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrRTtBQUMvSTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxjb21wby1hcHBcXFxcaW50ZWdyYXRpb24tY29tcG9zaW9cXFxcY29tcG9zaW8tZGFzaGJvYXJkXFxcXGFwcFxcXFxhcGlcXFxcYXBwc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXBwcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FwcHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FwcHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGNvbXBvLWFwcFxcXFxpbnRlZ3JhdGlvbi1jb21wb3Npb1xcXFxjb21wb3Npby1kYXNoYm9hcmRcXFxcYXBwXFxcXGFwaVxcXFxhcHBzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fapps%2Froute&page=%2Fapi%2Fapps%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fapps%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?4c03":
/*!***********************!*\
  !*** debug (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/@langchain","vendor-chunks/semver","vendor-chunks/zod-to-json-schema","vendor-chunks/uuid","vendor-chunks/langsmith","vendor-chunks/zod","vendor-chunks/asynckit","vendor-chunks/@cfworker","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/call-bind-apply-helpers","vendor-chunks/retry","vendor-chunks/p-queue","vendor-chunks/get-proto","vendor-chunks/@ai-sdk","vendor-chunks/mime-db","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/form-data","vendor-chunks/follow-redirects","vendor-chunks/composio-core","vendor-chunks/nanoid","vendor-chunks/js-tiktoken","vendor-chunks/axios","vendor-chunks/@hey-api","vendor-chunks/secure-json-parse","vendor-chunks/pusher-js","vendor-chunks/proxy-from-env","vendor-chunks/p-timeout","vendor-chunks/p-retry","vendor-chunks/p-finally","vendor-chunks/mime-types","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/get-intrinsic","vendor-chunks/eventemitter3","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/decamelize","vendor-chunks/combined-stream","vendor-chunks/camelcase","vendor-chunks/base64-js","vendor-chunks/ansi-styles","vendor-chunks/ai"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fapps%2Froute&page=%2Fapi%2Fapps%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fapps%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();