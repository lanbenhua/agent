var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};function e(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}var n=function(){return n=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)},r=function(){function t(){this.handlers=[],this.handlers=[]}return t.prototype.use=function(t,e,n){return this.handlers=this.handlers.concat({onFulfilled:t,onRejected:e,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},t.prototype.reject=function(t){this.handlers[t]&&(this.handlers[t]=null)},t.prototype.forEach=function(t){this.handlers.forEach((function(e,n){null!==e&&t(e,n)}))},t}(),o=function(t,e,n){try{return JSON.stringify(t,e,n)}catch(t){return""}};function i(t){return null==t}
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function u(t){return"[object Object]"===Object.prototype.toString.call(t)}function s(t){return!!u(t)&&(void 0===t.constructor||!!u(t.constructor.prototype)&&!!t.constructor.prototype.hasOwnProperty("isPrototypeOf"))}var c=function(){function t(t){this._contentType=t}return t.prototype.marshal=function(t){var e=this._contentType;if("formdata"===e)return function(t){if(t instanceof FormData)return t;var e=new FormData;s(t)&&Object.entries(t).forEach((function(t){var n=t[0],r=t[1];i(r)||(Array.isArray(r)&&r.forEach((function(t){i(t)||e.append(n,p(t))})),e.append(n,p(r)))}));"string"==typeof t&&new URLSearchParams(t).forEach((function(t,n){e.append(n,t)}));return e}(t);if("json"===e)return"string"==typeof t?t:o(t);if("form"===e)return function(t){if("string"==typeof t)return t;if(t instanceof URLSearchParams)return t.toString();if(s(t))return a(t);if(t instanceof FormData){var e={};return t.forEach((function(t,n){e[n]=t})),a(e)}return""}(t);if("blob"===e){if(!(t instanceof Blob))throw new Error("BodyParser: must be a blob when content type is blob");return t}if("buffer"===e){if(!(t instanceof ArrayBuffer))throw new Error("BodyParser: must be a arraybuffer when content type is arraybuffer");return t}return"text"===e?"string"==typeof t?t:o(t):t},t}();function a(t){return Object.entries(t).reduce((function(t,e){var n=e[0],r=e[1];return i(r)?t:Array.isArray(r)?(r.forEach((function(e){i(e)||t.append(n,p(e))})),t):(t.append(n,p(r)),t)}),new URLSearchParams).toString()}function p(t){return i(t)?"":"string"==typeof t?t:"number"==typeof t||"boolean"==typeof t?String(t):o(t)}var f=function(){function t(t){this._priority=0,this._priority=t||0}return t.prototype.num=function(){var t=this._priority;return null==t?0:"HIGHEST"===t?Number.MAX_SAFE_INTEGER:"HIGH"===t?1e4:"MEDIUM"===t?0:"LOW"===t?-1e4:"LOWEST"===t?Number.MIN_SAFE_INTEGER:t},t}(),h=function(t){function n(e,n,r){var o=t.call(this,e)||this;return o.custom=!0,o.type="CustomError",o.type=n||"CustomError",o.name=r||"CustomError",o.message=e||"Invalid",o}return e(n,t),n.prototype.toString=function(t){return 1===t?"".concat(this.name,": ").concat(this.message):2===t?"".concat(this.message):"[".concat(this.type,"] ").concat(this.name,": ").concat(this.message)},n}(Error),l=function(t){function n(e,n){var r=t.call(this,e,"CancelError",n)||this;return r.type="CancelError",r}return e(n,t),n}(h);function d(t){return t.custom}function y(t){return t.custom&&"CancelError"===t.type}var _={auto:!0},v=function(){function t(t,e){this._pending=0,this._concurrency=10,this._queue=[],this._isPaused=!1,this._queue=[],this._pending=0,this._options=n(n({},_),e),this._resolve=this._resolve.bind(this),this._reject=this._reject.bind(this),this.reconcurrency(t)}return Object.defineProperty(t.prototype,"size",{get:function(){return this._queue.length},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"concurrency",{get:function(){return this._concurrency},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"options",{get:function(){return this._options},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"pending",{get:function(){return this._pending},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isPaused",{get:function(){return this._isPaused},enumerable:!1,configurable:!0}),t.prototype.pause=function(){this._isPaused=!0},t.prototype.resume=function(){var t;this._isPaused=!1,(null===(t=this._options)||void 0===t?void 0:t.auto)&&this._check()},t.prototype.reconcurrency=function(t){var e;this._concurrency=t,(null===(e=this._options)||void 0===e?void 0:e.auto)&&this._check()},t.prototype.enqueue=function(t){var e,r=this,o=t.runner,i=new Promise((function(i,u){e=n(n({},t),{runner:o,resolve:i,reject:u}),r._push(e)})).then(this._resolve,this._reject);return i.cancel=function(){r._cancel(e)},i},t.prototype.dequeue=function(){this._check()},t.prototype._check=function(){this._pending>=this.size||this._queue.length<1||(this._run(),this._check())},t.prototype._cancel=function(t){(0,t.reject)(new l("Canceled","QueueCancelError"))},t.prototype._run=function(){var t=this._queue.shift();if(t){this._pending++;var e=t.runner,n=t.resolve,r=t.reject;e().then(n,r)}},t.prototype._push=function(t){this._queue=this._queue.concat(t).sort((function(t,e){return new f(e.priority).num()-new f(t.priority).num()})),this._check()},t.prototype._pop=function(){if(this._pending--,this._pending<0)throw new Error("Pop called more than there were pending fetches");this._check()},t.prototype._resolve=function(t){return this._pop(),t},t.prototype._reject=function(t){throw this._pop(),t},t}(),b=window.fetch,m={json:"application/json; charset=utf-8",form:"application/x-www-form-urlencoded; charset=utf-8",formdata:void 0,buffer:"text/plain; charset=utf-8",text:"text/plain; charset=utf-8",blob:void 0},g={timeout:6e4},w={},E=function(){function t(t,e){this._interceptors={request:new r,response:new r},this._base=t,this._init=n(n({},g),e),this._initQueues(),this._request=this._request.bind(this),this._dispatchFetch=this._dispatchFetch.bind(this)}return Object.defineProperty(t.prototype,"init",{get:function(){return this._init},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"base",{get:function(){return this._base},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"queues",{get:function(){return this._queues},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"interceptors",{get:function(){return this._interceptors},enumerable:!1,configurable:!0}),t.prototype.queue=function(t){var e;return null===(e=this._queues)||void 0===e?void 0:e.get(t)},t.prototype._initQueues=function(){var t=this;if(this._init&&this._init.queue){var e=this._init.queue,n=e.concurrency,r=e.defaultName,o=e.concurrencies;(n||r)&&this._createOrGetQueue(r,n),o&&Object.entries(o).map((function(e){var n=e[0],r=e[1];t._createOrGetQueue(n,r)}))}},t.prototype._createOrGetQueue=function(t,e){void 0===t&&(t="default"),void 0===e&&(e=5),this._queues||(this._queues=new Map);var n=this.queue(t);if(n)return n;var r=new v(e);return this._queues.set(t,r),r},t.prototype.request=function(t){var e,n,r,o,i,u,s,c,a,p,f=this;if(this._queues){var h=null!==(i=null!==(n=null===(e=t.queue)||void 0===e?void 0:e.name)&&void 0!==n?n:null===(o=null===(r=this._init)||void 0===r?void 0:r.queue)||void 0===o?void 0:o.defaultName)&&void 0!==i?i:"default",l=null!==(c=null===(s=null===(u=this._init)||void 0===u?void 0:u.queue)||void 0===s?void 0:s.concurrency)&&void 0!==c?c:5;return this._createOrGetQueue(h,l).enqueue({runner:function(){return f._request(t)},priority:null!==(p=null===(a=t.queue)||void 0===a?void 0:a.priority)&&void 0!==p?p:"MEDIUM"})}return this._request(t)},t.prototype._request=function(t){this._resolveInput(t);var e=this._resolveReqInit(t);return this._resolveTimeoutAutoAbort(e),this._handleInterceptors(e)},t.prototype._resolveInput=function(t){var e,n=q(this._base||(null==t?void 0:t.base),t.input);if("GET"===(null===(e=null==t?void 0:t.method)||void 0===e?void 0:e.toUpperCase())&&(null==t?void 0:t.data)){var r=n.indexOf("?"),o=r<0?n:n.slice(0,n.indexOf("?")),i=O(r<0?"":n.slice(n.indexOf("?")),null==t?void 0:t.data);n=o+(i?"?".concat(i):"")}t.url=n},t.prototype._resolveReqInit=function(t){var e,r=n(n(n({},w),{timeout:null===(e=this._init)||void 0===e?void 0:e.timeout}),t);r.method||(r.method="GET"),r.method=r.method.toUpperCase();var o=(null==r?void 0:r.contentType)&&m[null==r?void 0:r.contentType],i=n({},o?{"Content-Type":o}:null);return r.headers=n(n(n({},w.headers),i),r.headers),r.body="GET"===r.method||"HEAD"===r.method?void 0:void 0!==r.body&&null!==r.body?r.body:new c(null==r?void 0:r.contentType).marshal(r.data),r},t.prototype._resolveTimeoutAutoAbort=function(t){var e=t.timeout;if(e&&!t.signal){var n=new AbortController;n.signal.addEventListener("abort",(function(t){console.log("ev",t,n.signal,n.signal.aborted,n.signal.reason)})),t.abortController=n,t.signal=n.signal;var r=setTimeout((function(){n.abort("Timeout of exceeded"),clearTimeout(r)}),e)}},t.prototype._handleInterceptors=function(t){var e=[],n=!0;this._interceptors.request.forEach((function(r){var o=r.runWhen,i=r.onFulfilled,u=r.onRejected;"function"==typeof o&&!1===o(t)||(n=n&&r.synchronous,e.unshift(i,u))}));var r,o=[];if(this._interceptors.response.forEach((function(t){return o.unshift(t.onFulfilled,t.onRejected)})),!n){var i=[this._dispatchFetch,void 0];for(Array.prototype.unshift.apply(i,e),i=i.concat(o),r=Promise.resolve(t);i.length;){var u=i.shift(),s=i.shift();u&&(r=r.then(u,s))}return r}for(var c=t;e.length;){u=e.shift(),s=e.shift();try{u&&(c=u(c))}catch(t){s&&s(t);break}}for(var a=this._dispatchFetch(c);o.length;){u=o.shift(),s=o.shift();u&&(a=a.then(u,s))}return a},t.prototype._dispatchFetch=function(t){var e,n=this,r=t.url||t.input;return r?b(r,t).then((function(r){e=r;var o=n._checkResponseType(r,t.responseType);if("json"===o)return r.json();if("buffer"===o)return r.arrayBuffer();if("text"===o)return r.text();if("blob"===o)return r.blob();if("form"===o||"formdata"===o)return r.formData();throw new Error("Agent: unexcepted response type '".concat(o,"'"))})).then((function(r){return n._decorateResponse(t,e,r)})):Promise.reject(new Error("Agent: unexpected error, url must have a value and be a string, but null!"))},t.prototype._checkResponseType=function(t,e){var n=j(t);if(!e&&!n)throw new Error("Agent: except a response type but null");if(n&&e&&n!==e)throw new Error("Agent: except a '".concat(e,"' response type but '").concat(n,"'"));return e||n},t.prototype._decorateResponse=function(t,e,n){return{data:n,url:e.url,ok:e.ok,status:e.status,statusText:e.statusText,headers:e.headers,__init__:t,__agent__:this,__response__:e}},t}(),j=function(t){var e=t.headers.get("content-type");if(e)return(null==e?void 0:e.includes("application/json"))?"json":(null==e?void 0:e.includes("text/plain"))||(null==e?void 0:e.includes("text/html"))||(null==e?void 0:e.includes("application/xml"))?"text":void 0},q=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=/(?<!(https?|file|wss?):)\/\/+/,r=/^(https?|file|wss?):\/\//;return t.filter(Boolean).map(String).reduce((function(t,e){return new RegExp(r).test(e)?e:t+"/"+e})).replace(new RegExp(n,"gm"),"/")};function O(t,e){var n=new URLSearchParams(t),r=new c("form").marshal(e),o=new URLSearchParams("?"+r);return o.forEach((function(t,e){null!=t&&n.append(e,t)})),o.toString()}export{l as CustomCancelError,h as CustomError,v as Queue,E as default,y as isCustomCancelError,d as isCustomError};
