(function(t){"use strict";if(t.fetch){return}var e={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{new Blob;return true}catch(t){return false}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(e.arrayBuffer){var r=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"];var o=function(t){return t&&DataView.prototype.isPrototypeOf(t)};var n=ArrayBuffer.isView||function(t){return t&&r.indexOf(Object.prototype.toString.call(t))>-1}}function i(t){if(typeof t!=="string"){t=String(t)}if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)){throw new TypeError("Invalid character in header field name")}return t.toLowerCase()}function s(t){if(typeof t!=="string"){t=String(t)}return t}function a(t){var r={next:function(){var e=t.shift();return{done:e===undefined,value:e}}};if(e.iterable){r[Symbol.iterator]=function(){return r}}return r}function f(t){this.map={};if(t instanceof f){t.forEach(function(t,e){this.append(e,t)},this)}else if(Array.isArray(t)){t.forEach(function(t){this.append(t[0],t[1])},this)}else if(t){Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}}f.prototype.append=function(t,e){t=i(t);e=s(e);var r=this.map[t];this.map[t]=r?r+","+e:e};f.prototype["delete"]=function(t){delete this.map[i(t)]};f.prototype.get=function(t){t=i(t);return this.has(t)?this.map[t]:null};f.prototype.has=function(t){return this.map.hasOwnProperty(i(t))};f.prototype.set=function(t,e){this.map[i(t)]=s(e)};f.prototype.forEach=function(t,e){for(var r in this.map){if(this.map.hasOwnProperty(r)){t.call(e,this.map[r],r,this)}}};f.prototype.keys=function(){var t=[];this.forEach(function(e,r){t.push(r)});return a(t)};f.prototype.values=function(){var t=[];this.forEach(function(e){t.push(e)});return a(t)};f.prototype.entries=function(){var t=[];this.forEach(function(e,r){t.push([r,e])});return a(t)};if(e.iterable){f.prototype[Symbol.iterator]=f.prototype.entries}function u(t){if(t.bodyUsed){return Promise.reject(new TypeError("Already read"))}t.bodyUsed=true}function h(t){return new Promise(function(e,r){t.onload=function(){e(t.result)};t.onerror=function(){r(t.error)}})}function d(t){var e=new FileReader;var r=h(e);e.readAsArrayBuffer(t);return r}function l(t){var e=new FileReader;var r=h(e);e.readAsText(t);return r}function y(t){var e=new Uint8Array(t);var r=new Array(e.length);for(var o=0;o<e.length;o++){r[o]=String.fromCharCode(e[o])}return r.join("")}function p(t){if(t.slice){return t.slice(0)}else{var e=new Uint8Array(t.byteLength);e.set(new Uint8Array(t));return e.buffer}}function c(){this.bodyUsed=false;this._initBody=function(t){this._bodyInit=t;if(!t){this._bodyText=""}else if(typeof t==="string"){this._bodyText=t}else if(e.blob&&Blob.prototype.isPrototypeOf(t)){this._bodyBlob=t}else if(e.formData&&FormData.prototype.isPrototypeOf(t)){this._bodyFormData=t}else if(e.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)){this._bodyText=t.toString()}else if(e.arrayBuffer&&e.blob&&o(t)){this._bodyArrayBuffer=p(t.buffer);this._bodyInit=new Blob([this._bodyArrayBuffer])}else if(e.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||n(t))){this._bodyArrayBuffer=p(t)}else{throw new Error("unsupported BodyInit type")}if(!this.headers.get("content-type")){if(typeof t==="string"){this.headers.set("content-type","text/plain;charset=UTF-8")}else if(this._bodyBlob&&this._bodyBlob.type){this.headers.set("content-type",this._bodyBlob.type)}else if(e.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)){this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8")}}};if(e.blob){this.blob=function(){var t=u(this);if(t){return t}if(this._bodyBlob){return Promise.resolve(this._bodyBlob)}else if(this._bodyArrayBuffer){return Promise.resolve(new Blob([this._bodyArrayBuffer]))}else if(this._bodyFormData){throw new Error("could not read FormData body as blob")}else{return Promise.resolve(new Blob([this._bodyText]))}};this.arrayBuffer=function(){if(this._bodyArrayBuffer){return u(this)||Promise.resolve(this._bodyArrayBuffer)}else{return this.blob().then(d)}}}this.text=function(){var t=u(this);if(t){return t}if(this._bodyBlob){return l(this._bodyBlob)}else if(this._bodyArrayBuffer){return Promise.resolve(y(this._bodyArrayBuffer))}else if(this._bodyFormData){throw new Error("could not read FormData body as text")}else{return Promise.resolve(this._bodyText)}};if(e.formData){this.formData=function(){return this.text().then(v)}}this.json=function(){return this.text().then(JSON.parse)};return this}var b=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function m(t){var e=t.toUpperCase();return b.indexOf(e)>-1?e:t}function w(t,e){e=e||{};var r=e.body;if(t instanceof w){if(t.bodyUsed){throw new TypeError("Already read")}this.url=t.url;this.credentials=t.credentials;if(!e.headers){this.headers=new f(t.headers)}this.method=t.method;this.mode=t.mode;if(!r&&t._bodyInit!=null){r=t._bodyInit;t.bodyUsed=true}}else{this.url=String(t)}this.credentials=e.credentials||this.credentials||"omit";if(e.headers||!this.headers){this.headers=new f(e.headers)}this.method=m(e.method||this.method||"GET");this.mode=e.mode||this.mode||null;this.referrer=null;if((this.method==="GET"||this.method==="HEAD")&&r){throw new TypeError("Body not allowed for GET or HEAD requests")}this._initBody(r)}w.prototype.clone=function(){return new w(this,{body:this._bodyInit})};function v(t){var e=new FormData;t.trim().split("&").forEach(function(t){if(t){var r=t.split("=");var o=r.shift().replace(/\+/g," ");var n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}});return e}function B(t){var e=new f;t.split(/\r?\n/).forEach(function(t){var r=t.split(":");var o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}});return e}c.call(w.prototype);function _(t,e){if(!e){e={}}this.type="default";this.status="status"in e?e.status:200;this.ok=this.status>=200&&this.status<300;this.statusText="statusText"in e?e.statusText:"OK";this.headers=new f(e.headers);this.url=e.url||"";this._initBody(t)}c.call(_.prototype);_.prototype.clone=function(){return new _(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})};_.error=function(){var t=new _(null,{status:0,statusText:""});t.type="error";return t};var A=[301,302,303,307,308];_.redirect=function(t,e){if(A.indexOf(e)===-1){throw new RangeError("Invalid status code")}return new _(null,{status:e,headers:{location:t}})};t.Headers=f;t.Request=w;t.Response=_;t.fetch=function(t,r){return new Promise(function(o,n){var i=new w(t,r);var s=new XMLHttpRequest;s.onload=function(){var t={status:s.status,statusText:s.statusText,headers:B(s.getAllResponseHeaders()||"")};t.url="responseURL"in s?s.responseURL:t.headers.get("X-Request-URL");var e="response"in s?s.response:s.responseText;o(new _(e,t))};s.onerror=function(){n(new TypeError("Network request failed"))};s.ontimeout=function(){n(new TypeError("Network request failed"))};s.open(i.method,i.url,true);if(i.credentials==="include"){s.withCredentials=true}if("responseType"in s&&e.blob){s.responseType="blob"}i.headers.forEach(function(t,e){s.setRequestHeader(e,t)});s.send(typeof i._bodyInit==="undefined"?null:i._bodyInit)})};t.fetch.polyfill=true})(typeof self!=="undefined"?self:this);