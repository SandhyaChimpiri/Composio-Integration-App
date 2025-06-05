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
exports.id = "app/api/integrations/route";
exports.ids = ["app/api/integrations/route"];
exports.modules = {

/***/ "(rsc)/./app/api/integrations/route.ts":
/*!***************************************!*\
  !*** ./app/api/integrations/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var composio_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! composio-core */ \"(rsc)/./node_modules/composio-core/index.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_api_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/api-utils */ \"(rsc)/./lib/api-utils.ts\");\n\n\n\nasync function GET(request) {\n    const apiKey = (0,_lib_api_utils__WEBPACK_IMPORTED_MODULE_2__.getEffectiveApiKey)(request);\n    if (!apiKey) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"API key is not configured\"\n        }, {\n            status: 401\n        });\n    }\n    const composio = new composio_core__WEBPACK_IMPORTED_MODULE_0__.Composio({\n        apiKey: apiKey\n    });\n    const url = new URL(request.url);\n    const appName = url.searchParams.get(\"appName\") || undefined;\n    const integrations = await composio.integrations.list({\n        appName: appName\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(integrations);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2ludGVncmF0aW9ucy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXlDO0FBQ0U7QUFDVTtBQUc5QyxlQUFlRyxJQUFJQyxPQUFvQjtJQUM1QyxNQUFNQyxTQUFTSCxrRUFBa0JBLENBQUNFO0lBRWxDLElBQUksQ0FBQ0MsUUFBUTtRQUNYLE9BQU9KLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBNEIsR0FDckM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0lBRUEsTUFBTUMsV0FBVyxJQUFJVCxtREFBUUEsQ0FBQztRQUFFSyxRQUFRQTtJQUFPO0lBQy9DLE1BQU1LLE1BQU0sSUFBSUMsSUFBSVAsUUFBUU0sR0FBRztJQUMvQixNQUFNRSxVQUFVRixJQUFJRyxZQUFZLENBQUNDLEdBQUcsQ0FBQyxjQUFjQztJQUNuRCxNQUFNQyxlQUFlLE1BQU1QLFNBQVNPLFlBQVksQ0FBQ0MsSUFBSSxDQUFDO1FBQ3BETCxTQUFTQTtJQUNYO0lBQ0EsT0FBT1gscURBQVlBLENBQUNLLElBQUksQ0FBQ1U7QUFDM0IiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQWRtaW5cXE9uZURyaXZlXFxEZXNrdG9wXFxjb21wby1hcHBcXGludGVncmF0aW9uLWNvbXBvc2lvXFxjb21wb3Npby1kYXNoYm9hcmRcXGFwcFxcYXBpXFxpbnRlZ3JhdGlvbnNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2lvIH0gZnJvbSBcImNvbXBvc2lvLWNvcmVcIjtcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IGdldEVmZmVjdGl2ZUFwaUtleSB9IGZyb20gXCJAL2xpYi9hcGktdXRpbHNcIjtcclxuaW1wb3J0IHsgTmV4dFJlcXVlc3QgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICBjb25zdCBhcGlLZXkgPSBnZXRFZmZlY3RpdmVBcGlLZXkocmVxdWVzdCk7XHJcblxyXG4gIGlmICghYXBpS2V5KSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiQVBJIGtleSBpcyBub3QgY29uZmlndXJlZFwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA0MDEgfSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb21wb3NpbyA9IG5ldyBDb21wb3Npbyh7IGFwaUtleTogYXBpS2V5IH0pO1xyXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xyXG4gIGNvbnN0IGFwcE5hbWUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcImFwcE5hbWVcIikgfHwgdW5kZWZpbmVkO1xyXG4gIGNvbnN0IGludGVncmF0aW9ucyA9IGF3YWl0IGNvbXBvc2lvLmludGVncmF0aW9ucy5saXN0KHtcclxuICAgIGFwcE5hbWU6IGFwcE5hbWUsXHJcbiAgfSk7XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGludGVncmF0aW9ucyk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkNvbXBvc2lvIiwiTmV4dFJlc3BvbnNlIiwiZ2V0RWZmZWN0aXZlQXBpS2V5IiwiR0VUIiwicmVxdWVzdCIsImFwaUtleSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImNvbXBvc2lvIiwidXJsIiwiVVJMIiwiYXBwTmFtZSIsInNlYXJjaFBhcmFtcyIsImdldCIsInVuZGVmaW5lZCIsImludGVncmF0aW9ucyIsImxpc3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/integrations/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/api-utils.ts":
/*!**************************!*\
  !*** ./lib/api-utils.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LOCAL_STORAGE_API_KEY: () => (/* binding */ LOCAL_STORAGE_API_KEY),\n/* harmony export */   getEffectiveApiKey: () => (/* binding */ getEffectiveApiKey)\n/* harmony export */ });\nconst CUSTOM_API_KEY_HEADER = \"x-custom-api-key\";\n/**\r\n * Gets the effective API key to use for Composio requests.\r\n * Prioritizes the key from the custom header if present, otherwise falls back\r\n * to the environment variable.\r\n *\r\n * @param request The incoming NextRequest or Request object.\r\n * @returns The API key to use, or an empty string if none is found.\r\n */ function getEffectiveApiKey(request) {\n    const customApiKey = request.headers.get(CUSTOM_API_KEY_HEADER);\n    console.log(\"Custom API key:\", customApiKey);\n    if (customApiKey) {\n        return customApiKey;\n    }\n    // Ensure we return an empty string if the env var is not set,\n    // aligning with previous logic in some routes.\n    return process.env.COMPOSIO_API_KEY || \"\";\n}\n// Constant for local storage key to be used in frontend\nconst LOCAL_STORAGE_API_KEY = \"composio-custom-api-key\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXBpLXV0aWxzLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTUEsd0JBQXdCO0FBRTlCOzs7Ozs7O0NBT0MsR0FDTSxTQUFTQyxtQkFBbUJDLE9BQThCO0lBQy9ELE1BQU1DLGVBQWVELFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTDtJQUN6Q00sUUFBUUMsR0FBRyxDQUFDLG1CQUFtQko7SUFDL0IsSUFBSUEsY0FBYztRQUNoQixPQUFPQTtJQUNUO0lBQ0EsOERBQThEO0lBQzlELCtDQUErQztJQUMvQyxPQUFPSyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQixJQUFJO0FBQ3pDO0FBRUEsd0RBQXdEO0FBQ2pELE1BQU1DLHdCQUF3QiwwQkFBMEIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQWRtaW5cXE9uZURyaXZlXFxEZXNrdG9wXFxjb21wby1hcHBcXGludGVncmF0aW9uLWNvbXBvc2lvXFxjb21wb3Npby1kYXNoYm9hcmRcXGxpYlxcYXBpLXV0aWxzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcblxyXG5jb25zdCBDVVNUT01fQVBJX0tFWV9IRUFERVIgPSBcIngtY3VzdG9tLWFwaS1rZXlcIjtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBlZmZlY3RpdmUgQVBJIGtleSB0byB1c2UgZm9yIENvbXBvc2lvIHJlcXVlc3RzLlxyXG4gKiBQcmlvcml0aXplcyB0aGUga2V5IGZyb20gdGhlIGN1c3RvbSBoZWFkZXIgaWYgcHJlc2VudCwgb3RoZXJ3aXNlIGZhbGxzIGJhY2tcclxuICogdG8gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlLlxyXG4gKlxyXG4gKiBAcGFyYW0gcmVxdWVzdCBUaGUgaW5jb21pbmcgTmV4dFJlcXVlc3Qgb3IgUmVxdWVzdCBvYmplY3QuXHJcbiAqIEByZXR1cm5zIFRoZSBBUEkga2V5IHRvIHVzZSwgb3IgYW4gZW1wdHkgc3RyaW5nIGlmIG5vbmUgaXMgZm91bmQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlQXBpS2V5KHJlcXVlc3Q6IE5leHRSZXF1ZXN0IHwgUmVxdWVzdCk6IHN0cmluZyB7XHJcbiAgY29uc3QgY3VzdG9tQXBpS2V5ID0gcmVxdWVzdC5oZWFkZXJzLmdldChDVVNUT01fQVBJX0tFWV9IRUFERVIpO1xyXG4gIGNvbnNvbGUubG9nKFwiQ3VzdG9tIEFQSSBrZXk6XCIsIGN1c3RvbUFwaUtleSk7XHJcbiAgaWYgKGN1c3RvbUFwaUtleSkge1xyXG4gICAgcmV0dXJuIGN1c3RvbUFwaUtleTtcclxuICB9XHJcbiAgLy8gRW5zdXJlIHdlIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGVudiB2YXIgaXMgbm90IHNldCxcclxuICAvLyBhbGlnbmluZyB3aXRoIHByZXZpb3VzIGxvZ2ljIGluIHNvbWUgcm91dGVzLlxyXG4gIHJldHVybiBwcm9jZXNzLmVudi5DT01QT1NJT19BUElfS0VZIHx8IFwiXCI7XHJcbn1cclxuXHJcbi8vIENvbnN0YW50IGZvciBsb2NhbCBzdG9yYWdlIGtleSB0byBiZSB1c2VkIGluIGZyb250ZW5kXHJcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0FQSV9LRVkgPSBcImNvbXBvc2lvLWN1c3RvbS1hcGkta2V5XCI7XHJcbiJdLCJuYW1lcyI6WyJDVVNUT01fQVBJX0tFWV9IRUFERVIiLCJnZXRFZmZlY3RpdmVBcGlLZXkiLCJyZXF1ZXN0IiwiY3VzdG9tQXBpS2V5IiwiaGVhZGVycyIsImdldCIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwiZW52IiwiQ09NUE9TSU9fQVBJX0tFWSIsIkxPQ0FMX1NUT1JBR0VfQVBJX0tFWSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/api-utils.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fintegrations%2Froute&page=%2Fapi%2Fintegrations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fintegrations%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fintegrations%2Froute&page=%2Fapi%2Fintegrations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fintegrations%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Admin_OneDrive_Desktop_compo_app_integration_composio_composio_dashboard_app_api_integrations_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/integrations/route.ts */ \"(rsc)/./app/api/integrations/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/integrations/route\",\n        pathname: \"/api/integrations\",\n        filename: \"route\",\n        bundlePath: \"app/api/integrations/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Admin\\\\OneDrive\\\\Desktop\\\\compo-app\\\\integration-composio\\\\composio-dashboard\\\\app\\\\api\\\\integrations\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Admin_OneDrive_Desktop_compo_app_integration_composio_composio_dashboard_app_api_integrations_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZpbnRlZ3JhdGlvbnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmludGVncmF0aW9ucyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmludGVncmF0aW9ucyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbiU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q2NvbXBvLWFwcCU1Q2ludGVncmF0aW9uLWNvbXBvc2lvJTVDY29tcG9zaW8tZGFzaGJvYXJkJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbiU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q2NvbXBvLWFwcCU1Q2ludGVncmF0aW9uLWNvbXBvc2lvJTVDY29tcG9zaW8tZGFzaGJvYXJkJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMwRTtBQUN2SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxjb21wby1hcHBcXFxcaW50ZWdyYXRpb24tY29tcG9zaW9cXFxcY29tcG9zaW8tZGFzaGJvYXJkXFxcXGFwcFxcXFxhcGlcXFxcaW50ZWdyYXRpb25zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9pbnRlZ3JhdGlvbnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9pbnRlZ3JhdGlvbnNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2ludGVncmF0aW9ucy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEFkbWluXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcY29tcG8tYXBwXFxcXGludGVncmF0aW9uLWNvbXBvc2lvXFxcXGNvbXBvc2lvLWRhc2hib2FyZFxcXFxhcHBcXFxcYXBpXFxcXGludGVncmF0aW9uc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fintegrations%2Froute&page=%2Fapi%2Fintegrations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fintegrations%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/@langchain","vendor-chunks/pusher-js","vendor-chunks/ai","vendor-chunks/composio-core","vendor-chunks/langsmith","vendor-chunks/zod","vendor-chunks/mime-db","vendor-chunks/axios","vendor-chunks/@ai-sdk","vendor-chunks/semver","vendor-chunks/zod-to-json-schema","vendor-chunks/@cfworker","vendor-chunks/follow-redirects","vendor-chunks/uuid","vendor-chunks/get-intrinsic","vendor-chunks/form-data","vendor-chunks/p-queue","vendor-chunks/eventemitter3","vendor-chunks/js-tiktoken","vendor-chunks/asynckit","vendor-chunks/retry","vendor-chunks/combined-stream","vendor-chunks/@hey-api","vendor-chunks/base64-js","vendor-chunks/ansi-styles","vendor-chunks/secure-json-parse","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/camelcase","vendor-chunks/has-symbols","vendor-chunks/delayed-stream","vendor-chunks/function-bind","vendor-chunks/p-retry","vendor-chunks/p-timeout","vendor-chunks/es-set-tostringtag","vendor-chunks/get-proto","vendor-chunks/call-bind-apply-helpers","vendor-chunks/nanoid","vendor-chunks/dunder-proto","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/decamelize","vendor-chunks/gopd","vendor-chunks/p-finally","vendor-chunks/es-define-property","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/es-object-atoms"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fintegrations%2Froute&page=%2Fapi%2Fintegrations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fintegrations%2Froute.ts&appDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdmin%5COneDrive%5CDesktop%5Ccompo-app%5Cintegration-composio%5Ccomposio-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();