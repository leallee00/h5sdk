(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CIM"] = factory();
	else
		root["CIM"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Various utility functions.
 * @namespace
 */
var util = module.exports = __webpack_require__(2);

var roots = __webpack_require__(21);

var Type, // cyclic
    Enum;

util.codegen = __webpack_require__(45);
util.fetch   = __webpack_require__(46);
util.path    = __webpack_require__(47);

/**
 * Node's fs module if available.
 * @type {Object.<string,*>}
 */
util.fs = util.inquire("fs");

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    if (object) {
        var keys  = Object.keys(object),
            array = new Array(keys.length),
            index = 0;
        while (index < keys.length)
            array[index] = object[keys[index++]];
        return array;
    }
    return [];
};

/**
 * Converts an array of keys immediately followed by their respective value to an object, omitting undefined values.
 * @param {Array.<*>} array Array to convert
 * @returns {Object.<string,*>} Converted object
 */
util.toObject = function toObject(array) {
    var object = {},
        index  = 0;
    while (index < array.length) {
        var key = array[index++],
            val = array[index++];
        if (val !== undefined)
            object[key] = val;
    }
    return object;
};

var safePropBackslashRe = /\\/g,
    safePropQuoteRe     = /"/g;

/**
 * Returns a safe property accessor for the specified properly name.
 * @param {string} prop Property name
 * @returns {string} Safe accessor
 */
util.safeProp = function safeProp(prop) {
    return "[\"" + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, "\\\"") + "\"]";
};

/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

var camelCaseRe = /_([a-z])/g;

/**
 * Converts a string to camel case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.camelCase = function camelCase(str) {
    return str.substring(0, 1)
         + str.substring(1)
               .replace(camelCaseRe, function($0, $1) { return $1.toUpperCase(); });
};

/**
 * Compares reflected fields by id.
 * @param {Field} a First field
 * @param {Field} b Second field
 * @returns {number} Comparison value
 */
util.compareFieldsById = function compareFieldsById(a, b) {
    return a.id - b.id;
};

/**
 * Decorator helper for types (TypeScript).
 * @param {Constructor<T>} ctor Constructor function
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {Type} Reflected type
 * @template T extends Message<T>
 * @property {Root} root Decorators root
 */
util.decorateType = function decorateType(ctor, typeName) {

    /* istanbul ignore if */
    if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
    }

    /* istanbul ignore next */
    if (!Type)
        Type = __webpack_require__(11);

    var type = new Type(typeName || ctor.name);
    util.decorateRoot.add(type);
    type.ctor = ctor; // sets up .encode, .decode etc.
    Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
    Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
    return type;
};

var decorateEnumIndex = 0;

/**
 * Decorator helper for enums (TypeScript).
 * @param {Object} object Enum object
 * @returns {Enum} Reflected enum
 */
util.decorateEnum = function decorateEnum(object) {

    /* istanbul ignore if */
    if (object.$type)
        return object.$type;

    /* istanbul ignore next */
    if (!Enum)
        Enum = __webpack_require__(1);

    var enm = new Enum("Enum" + decorateEnumIndex++, object);
    util.decorateRoot.add(enm);
    Object.defineProperty(object, "$type", { value: enm, enumerable: false });
    return enm;
};

/**
 * Decorator root (TypeScript).
 * @name util.decorateRoot
 * @type {Root}
 * @readonly
 */
Object.defineProperty(util, "decorateRoot", {
    get: function() {
        return roots["decorated"] || (roots["decorated"] = new (__webpack_require__(16))());
    }
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Enum;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(4);
((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";

var util = __webpack_require__(0);

/**
 * Constructs a new enum instance.
 * @classdesc Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {Object.<string,number>} [values] Enum values as an object, by name
 * @param {Object.<string,*>} [options] Declared options
 */
function Enum(name, values, options) {
    ReflectionObject.call(this, name, options);

    if (values && typeof values !== "object")
        throw TypeError("values must be an object");

    /**
     * Enum values by id.
     * @type {Object.<number,string>}
     */
    this.valuesById = {};

    /**
     * Enum values by name.
     * @type {Object.<string,number>}
     */
    this.values = Object.create(this.valuesById); // toJSON, marker

    /**
     * Value comment texts, if any.
     * @type {Object.<string,string>}
     */
    this.comments = {};

    // Note that values inherit valuesById on their prototype which makes them a TypeScript-
    // compatible enum. This is used by pbts to write actual enum definitions that work for
    // static and reflection code alike instead of emitting generic object definitions.

    if (values)
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
            if (typeof values[keys[i]] === "number") // use forward entries only
                this.valuesById[ this.values[keys[i]] = values[keys[i]] ] = keys[i];
}

/**
 * Enum descriptor.
 * @interface IEnum
 * @property {Object.<string,number>} values Enum values
 * @property {Object.<string,*>} [options] Enum options
 */

/**
 * Constructs an enum from an enum descriptor.
 * @param {string} name Enum name
 * @param {IEnum} json Enum descriptor
 * @returns {Enum} Created enum
 * @throws {TypeError} If arguments are invalid
 */
Enum.fromJSON = function fromJSON(name, json) {
    return new Enum(name, json.values, json.options);
};

/**
 * Converts this enum to an enum descriptor.
 * @returns {IEnum} Enum descriptor
 */
Enum.prototype.toJSON = function toJSON() {
    return util.toObject([
        "options" , this.options,
        "values"  , this.values
    ]);
};

/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @param {string} [comment] Comment, if any
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a value with this name or id
 */
Enum.prototype.add = function(name, id, comment) {
    // utilized by the parser but not by .fromJSON

    if (!util.isString(name))
        throw TypeError("name must be a string");

    if (!util.isInteger(id))
        throw TypeError("id must be an integer");

    if (this.values[name] !== undefined)
        throw Error("duplicate name");

    if (this.valuesById[id] !== undefined) {
        if (!(this.options && this.options.allow_alias))
            throw Error("duplicate id");
        this.values[name] = id;
    } else
        this.valuesById[this.values[name] = id] = name;

    this.comments[name] = comment || null;
    return this;
};

/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `name` is not a name of this enum
 */
Enum.prototype.remove = function(name) {

    if (!util.isString(name))
        throw TypeError("name must be a string");

    var val = this.values[name];
    if (val === undefined)
        throw Error("name does not exist");

    delete this.valuesById[val];
    delete this.values[name];
    delete this.comments[name];

    return this;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(18);

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(36);

// base class of rpc.Service
util.EventEmitter = __webpack_require__(37);

// float handling accross browsers
util.float = __webpack_require__(38);

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(19);

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(39);

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(40);

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(41);

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */
util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ global.dcodeIO && /* istanbul ignore next */ global.dcodeIO.Long || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Field;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(4);
((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";

var Enum  = __webpack_require__(1),
    types = __webpack_require__(5),
    util  = __webpack_require__(0);

var Type; // cyclic

var ruleRe = /^required|optional|repeated$/;

/**
 * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
 * @name Field
 * @classdesc Reflected message field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * Constructs a field from a field descriptor.
 * @param {string} name Field name
 * @param {IField} json Field descriptor
 * @returns {Field} Created field
 * @throws {TypeError} If arguments are invalid
 */
Field.fromJSON = function fromJSON(name, json) {
    return new Field(name, json.id, json.type, json.rule, json.extend, json.options);
};

/**
 * Not an actual constructor. Use {@link Field} instead.
 * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports FieldBase
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 */
function Field(name, id, type, rule, extend, options) {

    if (util.isObject(rule)) {
        options = rule;
        rule = extend = undefined;
    } else if (util.isObject(extend)) {
        options = extend;
        extend = undefined;
    }

    ReflectionObject.call(this, name, options);

    if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a non-negative integer");

    if (!util.isString(type))
        throw TypeError("type must be a string");

    if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase()))
        throw TypeError("rule must be a string rule");

    if (extend !== undefined && !util.isString(extend))
        throw TypeError("extend must be a string");

    /**
     * Field rule, if any.
     * @type {string|undefined}
     */
    this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

    /**
     * Field type.
     * @type {string}
     */
    this.type = type; // toJSON

    /**
     * Unique field id.
     * @type {number}
     */
    this.id = id; // toJSON, marker

    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */
    this.extend = extend || undefined; // toJSON

    /**
     * Whether this field is required.
     * @type {boolean}
     */
    this.required = rule === "required";

    /**
     * Whether this field is optional.
     * @type {boolean}
     */
    this.optional = !this.required;

    /**
     * Whether this field is repeated.
     * @type {boolean}
     */
    this.repeated = rule === "repeated";

    /**
     * Whether this field is a map or not.
     * @type {boolean}
     */
    this.map = false;

    /**
     * Message this field belongs to.
     * @type {Type|null}
     */
    this.message = null;

    /**
     * OneOf this field belongs to, if any,
     * @type {OneOf|null}
     */
    this.partOf = null;

    /**
     * The field type's default value.
     * @type {*}
     */
    this.typeDefault = null;

    /**
     * The field's default value on prototypes.
     * @type {*}
     */
    this.defaultValue = null;

    /**
     * Whether this field's value should be treated as a long.
     * @type {boolean}
     */
    this.long = util.Long ? types.long[type] !== undefined : /* istanbul ignore next */ false;

    /**
     * Whether this field's value is a buffer.
     * @type {boolean}
     */
    this.bytes = type === "bytes";

    /**
     * Resolved type if not a basic type.
     * @type {Type|Enum|null}
     */
    this.resolvedType = null;

    /**
     * Sister-field within the extended type if a declaring extension field.
     * @type {Field|null}
     */
    this.extensionField = null;

    /**
     * Sister-field within the declaring namespace if an extended field.
     * @type {Field|null}
     */
    this.declaringField = null;

    /**
     * Internally remembers whether this field is packed.
     * @type {boolean|null}
     * @private
     */
    this._packed = null;
}

/**
 * Determines whether this field is packed. Only relevant when repeated and working with proto2.
 * @name Field#packed
 * @type {boolean}
 * @readonly
 */
Object.defineProperty(Field.prototype, "packed", {
    get: function() {
        // defaults to packed=true if not explicity set to false
        if (this._packed === null)
            this._packed = this.getOption("packed") !== false;
        return this._packed;
    }
});

/**
 * @override
 */
Field.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (name === "packed") // clear cached before setting
        this._packed = null;
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};

/**
 * Field descriptor.
 * @interface IField
 * @property {string} [rule="optional"] Field rule
 * @property {string} type Field type
 * @property {number} id Field id
 * @property {Object.<string,*>} [options] Field options
 */

/**
 * Extension field descriptor.
 * @interface IExtensionField
 * @extends IField
 * @property {string} extend Extended type
 */

/**
 * Converts this field to a field descriptor.
 * @returns {IField} Field descriptor
 */
Field.prototype.toJSON = function toJSON() {
    return util.toObject([
        "rule"    , this.rule !== "optional" && this.rule || undefined,
        "type"    , this.type,
        "id"      , this.id,
        "extend"  , this.extend,
        "options" , this.options
    ]);
};

/**
 * Resolves this field's type references.
 * @returns {Field} `this`
 * @throws {Error} If any reference cannot be resolved
 */
Field.prototype.resolve = function resolve() {

    if (this.resolved)
        return this;

    if ((this.typeDefault = types.defaults[this.type]) === undefined) { // if not a basic type, resolve it
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type)
            this.typeDefault = null;
        else // instanceof Enum
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
    }

    // use explicitly set default value if present
    if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
            this.typeDefault = this.resolvedType.values[this.typeDefault];
    }

    // remove unnecessary options
    if (this.options) {
        if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum))
            delete this.options.packed;
        if (!Object.keys(this.options).length)
            this.options = undefined;
    }

    // convert to internal data type if necesssary
    if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");

        /* istanbul ignore else */
        if (Object.freeze)
            Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)

    } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault))
            util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else
            util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
    }

    // take special care of maps and repeated fields
    if (this.map)
        this.defaultValue = util.emptyObject;
    else if (this.repeated)
        this.defaultValue = util.emptyArray;
    else
        this.defaultValue = this.typeDefault;

    // ensure proper value on prototype
    if (this.parent instanceof Type)
        this.parent.ctor.prototype[this.name] = this.defaultValue;

    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
 * @typedef FieldDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} fieldName Field name
 * @returns {undefined}
 */

/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @param {T} [defaultValue] Default value
 * @returns {FieldDecorator} Decorator function
 * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
 */
Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {

    // submessage: decorate the submessage and use its name as the type
    if (typeof fieldType === "function")
        fieldType = util.decorateType(fieldType).name;

    // enum reference: create a reflected copy of the enum and keep reuseing it
    else if (fieldType && typeof fieldType === "object")
        fieldType = util.decorateEnum(fieldType).name;

    return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor)
            .add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
    };
};

/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {Constructor<T>|string} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @returns {FieldDecorator} Decorator function
 * @template T extends Message<T>
 * @variation 2
 */
// like Field.d but without a default value

Field._configure = function configure(Type_) {
    Type = Type_;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = ReflectionObject;

ReflectionObject.className = "ReflectionObject";

var util = __webpack_require__(0);

var Root; // cyclic

/**
 * Constructs a new reflection object instance.
 * @classdesc Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object.<string,*>} [options] Declared options
 * @abstract
 */
function ReflectionObject(name, options) {

    if (!util.isString(name))
        throw TypeError("name must be a string");

    if (options && !util.isObject(options))
        throw TypeError("options must be an object");

    /**
     * Options.
     * @type {Object.<string,*>|undefined}
     */
    this.options = options; // toJSON

    /**
     * Unique name within its namespace.
     * @type {string}
     */
    this.name = name;

    /**
     * Parent namespace.
     * @type {Namespace|null}
     */
    this.parent = null;

    /**
     * Whether already resolved or not.
     * @type {boolean}
     */
    this.resolved = false;

    /**
     * Comment text, if any.
     * @type {string|null}
     */
    this.comment = null;

    /**
     * Defining file name.
     * @type {string|null}
     */
    this.filename = null;
}

Object.defineProperties(ReflectionObject.prototype, {

    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
     * @readonly
     */
    root: {
        get: function() {
            var ptr = this;
            while (ptr.parent !== null)
                ptr = ptr.parent;
            return ptr;
        }
    },

    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
        get: function() {
            var path = [ this.name ],
                ptr = this.parent;
            while (ptr) {
                path.unshift(ptr.name);
                ptr = ptr.parent;
            }
            return path.join(".");
        }
    }
});

/**
 * Converts this reflection object to its descriptor representation.
 * @returns {Object.<string,*>} Descriptor
 * @abstract
 */
ReflectionObject.prototype.toJSON = /* istanbul ignore next */ function toJSON() {
    throw Error(); // not implemented, shouldn't happen
};

/**
 * Called when this object is added to a parent.
 * @param {ReflectionObject} parent Parent added to
 * @returns {undefined}
 */
ReflectionObject.prototype.onAdd = function onAdd(parent) {
    if (this.parent && this.parent !== parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root = parent.root;
    if (root instanceof Root)
        root._handleAdd(this);
};

/**
 * Called when this object is removed from a parent.
 * @param {ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */
ReflectionObject.prototype.onRemove = function onRemove(parent) {
    var root = parent.root;
    if (root instanceof Root)
        root._handleRemove(this);
    this.parent = null;
    this.resolved = false;
};

/**
 * Resolves this objects type references.
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    if (this.root instanceof Root)
        this.resolved = true; // only if part of a root
    return this;
};

/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */
ReflectionObject.prototype.getOption = function getOption(name) {
    if (this.options)
        return this.options[name];
    return undefined;
};

/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined)
        (this.options || (this.options = {}))[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {Object.<string,*>} options Options to set
 * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
    if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
            this.setOption(keys[i], options[keys[i]], ifNotSet);
    return this;
};

/**
 * Converts this instance to its string representation.
 * @returns {string} Class name[, space, full name]
 */
ReflectionObject.prototype.toString = function toString() {
    var className = this.constructor.className,
        fullName  = this.fullName;
    if (fullName.length)
        return className + " " + fullName;
    return className;
};

ReflectionObject._configure = function(Root_) {
    Root = Root_;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Common type constants.
 * @namespace
 */
var types = exports;

var util = __webpack_require__(0);

var s = [
    "double",   // 0
    "float",    // 1
    "int32",    // 2
    "uint32",   // 3
    "sint32",   // 4
    "fixed32",  // 5
    "sfixed32", // 6
    "int64",    // 7
    "uint64",   // 8
    "sint64",   // 9
    "fixed64",  // 10
    "sfixed64", // 11
    "bool",     // 12
    "string",   // 13
    "bytes"     // 14
];

function bake(values, offset) {
    var i = 0, o = {};
    offset |= 0;
    while (i < values.length) o[s[i + offset]] = values[i++];
    return o;
}

/**
 * Basic type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 * @property {number} bytes=2 Ldelim wire type
 */
types.basic = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2,
    /* bytes    */ 2
]);

/**
 * Basic type defaults.
 * @type {Object.<string,*>}
 * @const
 * @property {number} double=0 Double default
 * @property {number} float=0 Float default
 * @property {number} int32=0 Int32 default
 * @property {number} uint32=0 Uint32 default
 * @property {number} sint32=0 Sint32 default
 * @property {number} fixed32=0 Fixed32 default
 * @property {number} sfixed32=0 Sfixed32 default
 * @property {number} int64=0 Int64 default
 * @property {number} uint64=0 Uint64 default
 * @property {number} sint64=0 Sint32 default
 * @property {number} fixed64=0 Fixed64 default
 * @property {number} sfixed64=0 Sfixed64 default
 * @property {boolean} bool=false Bool default
 * @property {string} string="" String default
 * @property {Array.<number>} bytes=Array(0) Bytes default
 * @property {null} message=null Message default
 */
types.defaults = bake([
    /* double   */ 0,
    /* float    */ 0,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 0,
    /* sfixed32 */ 0,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 0,
    /* sfixed64 */ 0,
    /* bool     */ false,
    /* string   */ "",
    /* bytes    */ util.emptyArray,
    /* message  */ null
]);

/**
 * Basic long type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 */
types.long = bake([
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1
], 7);

/**
 * Allowed types for map keys with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 */
types.mapKey = bake([
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2
], 2);

/**
 * Allowed types for packed repeated fields with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 */
types.packed = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0
]);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Namespace;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(4);
((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";

var Enum     = __webpack_require__(1),
    Field    = __webpack_require__(3),
    util     = __webpack_require__(0);

var Type,    // cyclic
    Service; // "

/**
 * Constructs a new namespace instance.
 * @name Namespace
 * @classdesc Reflected namespace.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * Constructs a namespace from JSON.
 * @memberof Namespace
 * @function
 * @param {string} name Namespace name
 * @param {Object.<string,*>} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */
Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
};

/**
 * Converts an array of reflection objects to JSON.
 * @memberof Namespace
 * @param {ReflectionObject[]} array Object array
 * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
 */
function arrayToJSON(array) {
    if (!(array && array.length))
        return undefined;
    var obj = {};
    for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON();
    return obj;
}

Namespace.arrayToJSON = arrayToJSON;

/**
 * Not an actual constructor. Use {@link Namespace} instead.
 * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports NamespaceBase
 * @extends ReflectionObject
 * @abstract
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 * @see {@link Namespace}
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */
    this.nested = undefined; // toJSON

    /**
     * Cached nested objects as an array.
     * @type {ReflectionObject[]|null}
     * @private
     */
    this._nestedArray = null;
}

function clearCache(namespace) {
    namespace._nestedArray = null;
    return namespace;
}

/**
 * Nested objects of this namespace as an array for iteration.
 * @name NamespaceBase#nestedArray
 * @type {ReflectionObject[]}
 * @readonly
 */
Object.defineProperty(Namespace.prototype, "nestedArray", {
    get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
    }
});

/**
 * Namespace descriptor.
 * @interface INamespace
 * @property {Object.<string,*>} [options] Namespace options
 * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
 */

/**
 * Any extension field descriptor.
 * @typedef AnyExtensionField
 * @type {IExtensionField|IExtensionMapField}
 */

/**
 * Any nested object descriptor.
 * @typedef AnyNestedObject
 * @type {IEnum|IType|IService|AnyExtensionField|INamespace}
 */
// ^ BEWARE: VSCode hangs forever when using more than 5 types (that's why AnyExtensionField exists in the first place)

/**
 * Converts this namespace to a namespace descriptor.
 * @returns {INamespace} Namespace descriptor
 */
Namespace.prototype.toJSON = function toJSON() {
    return util.toObject([
        "options" , this.options,
        "nested"  , arrayToJSON(this.nestedArray)
    ]);
};

/**
 * Adds nested objects to this namespace from nested object descriptors.
 * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
 * @returns {Namespace} `this`
 */
Namespace.prototype.addJSON = function addJSON(nestedJson) {
    var ns = this;
    /* istanbul ignore else */
    if (nestedJson) {
        for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add( // most to least likely
                ( nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : nested.id !== undefined
                ? Field.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    }
    return this;
};

/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
 */
Namespace.prototype.get = function get(name) {
    return this.nested && this.nested[name]
        || null;
};

/**
 * Gets the values of the nested {@link Enum|enum} of the specified name.
 * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
 * @param {string} name Nested enum name
 * @returns {Object.<string,number>} Enum values
 * @throws {Error} If there is no such enum
 */
Namespace.prototype.getEnum = function getEnum(name) {
    if (this.nested && this.nested[name] instanceof Enum)
        return this.nested[name].values;
    throw Error("no such enum");
};

/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name
 */
Namespace.prototype.add = function add(object) {

    if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace))
        throw TypeError("object must be a valid nested object");

    if (!this.nested)
        this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
                // replace plain namespace but keep existing nested elements and options
                var nested = prev.nestedArray;
                for (var i = 0; i < nested.length; ++i)
                    object.add(nested[i]);
                this.remove(prev);
                if (!this.nested)
                    this.nested = {};
                object.setOptions(prev.options, true);

            } else
                throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    this.nested[object.name] = object;
    object.onAdd(this);
    return clearCache(this);
};

/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this namespace
 */
Namespace.prototype.remove = function remove(object) {

    if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
    if (object.parent !== this)
        throw Error(object + " is not a member of " + this);

    delete this.nested[object.name];
    if (!Object.keys(this.nested).length)
        this.nested = undefined;

    object.onRemove(this);
    return clearCache(this);
};

/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {*} [json] Nested types to create from JSON
 * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
 */
Namespace.prototype.define = function define(path, json) {

    if (util.isString(path))
        path = path.split(".");
    else if (!Array.isArray(path))
        throw TypeError("illegal path");
    if (path && path.length && path[0] === "")
        throw Error("path must be relative");

    var ptr = this;
    while (path.length > 0) {
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace))
                throw Error("path conflicts with non-namespace objects");
        } else
            ptr.add(ptr = new Namespace(part));
    }
    if (json)
        ptr.addJSON(json);
    return ptr;
};

/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
 * @returns {Namespace} `this`
 */
Namespace.prototype.resolveAll = function resolveAll() {
    var nested = this.nestedArray, i = 0;
    while (i < nested.length)
        if (nested[i] instanceof Namespace)
            nested[i++].resolveAll();
        else
            nested[i++].resolve();
    return this.resolve();
};

/**
 * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
 * @param {string|string[]} path Path to look up
 * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
 * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 */
Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {

    /* istanbul ignore next */
    if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = undefined;
    } else if (filterTypes && !Array.isArray(filterTypes))
        filterTypes = [ filterTypes ];

    if (util.isString(path) && path.length) {
        if (path === ".")
            return this.root;
        path = path.split(".");
    } else if (!path.length)
        return this;

    // Start at root if path is absolute
    if (path[0] === "")
        return this.root.lookup(path.slice(1), filterTypes);

    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.get(path[0]);
    if (found) {
        if (path.length === 1) {
            if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
                return found;
        } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true)))
            return found;

    // Otherwise try each nested namespace
    } else
        for (var i = 0; i < this.nestedArray.length; ++i)
            if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true)))
                return found;

    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked)
        return null;
    return this.parent.lookup(path, filterTypes);
};

/**
 * Looks up the reflection object at the specified path, relative to this namespace.
 * @name NamespaceBase#lookup
 * @function
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 * @variation 2
 */
// lookup(path: string, [parentAlreadyChecked: boolean])

/**
 * Looks up the {@link Type|type} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type
 * @throws {Error} If `path` does not point to a type
 */
Namespace.prototype.lookupType = function lookupType(path) {
    var found = this.lookup(path, [ Type ]);
    if (!found)
        throw Error("no such type");
    return found;
};

/**
 * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Enum} Looked up enum
 * @throws {Error} If `path` does not point to an enum
 */
Namespace.prototype.lookupEnum = function lookupEnum(path) {
    var found = this.lookup(path, [ Enum ]);
    if (!found)
        throw Error("no such Enum '" + path + "' in " + this);
    return found;
};

/**
 * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type or enum
 * @throws {Error} If `path` does not point to a type or enum
 */
Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
    var found = this.lookup(path, [ Type, Enum ]);
    if (!found)
        throw Error("no such Type or Enum '" + path + "' in " + this);
    return found;
};

/**
 * Looks up the {@link Service|service} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Service} Looked up service
 * @throws {Error} If `path` does not point to a service
 */
Namespace.prototype.lookupService = function lookupService(path) {
    var found = this.lookup(path, [ Service ]);
    if (!found)
        throw Error("no such Service '" + path + "' in " + this);
    return found;
};

Namespace._configure = function(Type_, Service_) {
    Type    = Type_;
    Service = Service_;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = OneOf;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(4);
((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";

var Field = __webpack_require__(3),
    util  = __webpack_require__(0);

/**
 * Constructs a new oneof instance.
 * @classdesc Reflected oneof.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Oneof name
 * @param {string[]|Object.<string,*>} [fieldNames] Field names
 * @param {Object.<string,*>} [options] Declared options
 */
function OneOf(name, fieldNames, options) {
    if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = undefined;
    }
    ReflectionObject.call(this, name, options);

    /* istanbul ignore if */
    if (!(fieldNames === undefined || Array.isArray(fieldNames)))
        throw TypeError("fieldNames must be an Array");

    /**
     * Field names that belong to this oneof.
     * @type {string[]}
     */
    this.oneof = fieldNames || []; // toJSON, marker

    /**
     * Fields that belong to this oneof as an array for iteration.
     * @type {Field[]}
     * @readonly
     */
    this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent
}

/**
 * Oneof descriptor.
 * @interface IOneOf
 * @property {Array.<string>} oneof Oneof field names
 * @property {Object.<string,*>} [options] Oneof options
 */

/**
 * Constructs a oneof from a oneof descriptor.
 * @param {string} name Oneof name
 * @param {IOneOf} json Oneof descriptor
 * @returns {OneOf} Created oneof
 * @throws {TypeError} If arguments are invalid
 */
OneOf.fromJSON = function fromJSON(name, json) {
    return new OneOf(name, json.oneof, json.options);
};

/**
 * Converts this oneof to a oneof descriptor.
 * @returns {IOneOf} Oneof descriptor
 */
OneOf.prototype.toJSON = function toJSON() {
    return util.toObject([
        "options" , this.options,
        "oneof"   , this.oneof
    ]);
};

/**
 * Adds the fields of the specified oneof to the parent if not already done so.
 * @param {OneOf} oneof The oneof
 * @returns {undefined}
 * @inner
 * @ignore
 */
function addFieldsToParent(oneof) {
    if (oneof.parent)
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
            if (!oneof.fieldsArray[i].parent)
                oneof.parent.add(oneof.fieldsArray[i]);
}

/**
 * Adds a field to this oneof and removes it from its current parent, if any.
 * @param {Field} field Field to add
 * @returns {OneOf} `this`
 */
OneOf.prototype.add = function add(field) {

    /* istanbul ignore if */
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");

    if (field.parent && field.parent !== this.parent)
        field.parent.remove(field);
    this.oneof.push(field.name);
    this.fieldsArray.push(field);
    field.partOf = this; // field.parent remains null
    addFieldsToParent(this);
    return this;
};

/**
 * Removes a field from this oneof and puts it back to the oneof's parent.
 * @param {Field} field Field to remove
 * @returns {OneOf} `this`
 */
OneOf.prototype.remove = function remove(field) {

    /* istanbul ignore if */
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");

    var index = this.fieldsArray.indexOf(field);

    /* istanbul ignore if */
    if (index < 0)
        throw Error(field + " is not a member of " + this);

    this.fieldsArray.splice(index, 1);
    index = this.oneof.indexOf(field.name);

    /* istanbul ignore else */
    if (index > -1) // theoretical
        this.oneof.splice(index, 1);

    field.partOf = null;
    return this;
};

/**
 * @override
 */
OneOf.prototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    var self = this;
    // Collect present fields
    for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
            field.partOf = self;
            self.fieldsArray.push(field);
        }
    }
    // Add not yet present fields
    addFieldsToParent(this);
};

/**
 * @override
 */
OneOf.prototype.onRemove = function onRemove(parent) {
    for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent)
            field.parent.remove(field);
    ReflectionObject.prototype.onRemove.call(this, parent);
};

/**
 * Decorator function as returned by {@link OneOf.d} (TypeScript).
 * @typedef OneOfDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} oneofName OneOf name
 * @returns {undefined}
 */

/**
 * OneOf decorator (TypeScript).
 * @function
 * @param {...string} fieldNames Field names
 * @returns {OneOfDecorator} Decorator function
 * @template T extends string
 */
OneOf.d = function decorateOneOf() {
    var fieldNames = new Array(arguments.length),
        index = 0;
    while (index < arguments.length)
        fieldNames[index] = arguments[index++];
    return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor)
            .add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
        });
    };
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(2);

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = util.Buffer
    ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    }
    /* istanbul ignore next */
    : function create_array() {
        return new Writer();
    };

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(2);

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = util.Buffer
    ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer)
                ? new BufferReader(buffer)
                /* istanbul ignore next */
                : create_array(buffer);
        })(buffer);
    }
    /* istanbul ignore next */
    : create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            do { // eslint-disable-line no-constant-condition
                if ((wireType = this.uint32() & 7) === 4)
                    break;
                this.skipType(wireType);
            } while (true);
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Type;

// extends Namespace
var Namespace = __webpack_require__(6);
((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";

var Enum      = __webpack_require__(1),
    OneOf     = __webpack_require__(7),
    Field     = __webpack_require__(3),
    MapField  = __webpack_require__(12),
    Service   = __webpack_require__(13),
    Message   = __webpack_require__(15),
    Reader    = __webpack_require__(10),
    Writer    = __webpack_require__(9),
    util      = __webpack_require__(0),
    encoder   = __webpack_require__(22),
    decoder   = __webpack_require__(23),
    verifier  = __webpack_require__(24),
    converter = __webpack_require__(25),
    wrappers  = __webpack_require__(26);

/**
 * Constructs a new reflected message type instance.
 * @classdesc Reflected message type.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Message name
 * @param {Object.<string,*>} [options] Declared options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */
    this.fields = {};  // toJSON, marker

    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */
    this.oneofs = undefined; // toJSON

    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */
    this.extensions = undefined; // toJSON

    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */
    this.reserved = undefined; // toJSON

    /*?
     * Whether this type is a legacy group.
     * @type {boolean|undefined}
     */
    this.group = undefined; // toJSON

    /**
     * Cached fields by id.
     * @type {Object.<number,Field>|null}
     * @private
     */
    this._fieldsById = null;

    /**
     * Cached fields as an array.
     * @type {Field[]|null}
     * @private
     */
    this._fieldsArray = null;

    /**
     * Cached oneofs as an array.
     * @type {OneOf[]|null}
     * @private
     */
    this._oneofsArray = null;

    /**
     * Cached constructor.
     * @type {Constructor<{}>}
     * @private
     */
    this._ctor = null;
}

Object.defineProperties(Type.prototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
        get: function() {

            /* istanbul ignore if */
            if (this._fieldsById)
                return this._fieldsById;

            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
                var field = this.fields[names[i]],
                    id = field.id;

                /* istanbul ignore if */
                if (this._fieldsById[id])
                    throw Error("duplicate id " + id + " in " + this);

                this._fieldsById[id] = field;
            }
            return this._fieldsById;
        }
    },

    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
    },

    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */
    oneofsArray: {
        get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
    },

    /**
     * The registered constructor, if any registered, otherwise a generic constructor.
     * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
     * @name Type#ctor
     * @type {Constructor<{}>}
     */
    ctor: {
        get: function() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {

            // Ensure proper prototype
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
                (ctor.prototype = new Message()).constructor = ctor;
                util.merge(ctor.prototype, prototype);
            }

            // Classes and messages reference their reflected type
            ctor.$type = ctor.prototype.$type = this;

            // Mix in static methods
            util.merge(ctor, Message, true);

            this._ctor = ctor;

            // Messages have non-enumerable default values on their prototype
            var i = 0;
            for (; i < /* initializes */ this.fieldsArray.length; ++i)
                this._fieldsArray[i].resolve(); // ensures a proper value

            // Messages have non-enumerable getters and setters for each virtual oneof field
            var ctorProperties = {};
            for (i = 0; i < /* initializes */ this.oneofsArray.length; ++i)
                ctorProperties[this._oneofsArray[i].resolve().name] = {
                    get: util.oneOfGetter(this._oneofsArray[i].oneof),
                    set: util.oneOfSetter(this._oneofsArray[i].oneof)
                };
            if (i)
                Object.defineProperties(ctor.prototype, ctorProperties);
        }
    }
});

/**
 * Generates a constructor function for the specified type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
Type.generateConstructor = function generateConstructor(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["p"], mtype.name);
    // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype
    for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map) gen
            ("this%s={}", util.safeProp(field.name));
        else if (field.repeated) gen
            ("this%s=[]", util.safeProp(field.name));
    return gen
    ("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
        ("this[ks[i]]=p[ks[i]]");
    /* eslint-enable no-unexpected-multiline */
};

function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = null;
    delete type.encode;
    delete type.decode;
    delete type.verify;
    return type;
}

/**
 * Message type descriptor.
 * @interface IType
 * @extends INamespace
 * @property {Object.<string,IOneOf>} [oneofs] Oneof descriptors
 * @property {Object.<string,IField>} fields Field descriptors
 * @property {number[][]} [extensions] Extension ranges
 * @property {number[][]} [reserved] Reserved ranges
 * @property {boolean} [group=false] Whether a legacy group or not
 */

/**
 * Creates a message type from a message type descriptor.
 * @param {string} name Message name
 * @param {IType} json Message type descriptor
 * @returns {Type} Created message type
 */
Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    var names = Object.keys(json.fields),
        i = 0;
    for (; i < names.length; ++i)
        type.add(
            ( typeof json.fields[names[i]].keyType !== "undefined"
            ? MapField.fromJSON
            : Field.fromJSON )(names[i], json.fields[names[i]])
        );
    if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
            type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
    if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
            var nested = json.nested[names[i]];
            type.add( // most to least likely
                ( nested.id !== undefined
                ? Field.fromJSON
                : nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
    if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
    if (json.group)
        type.group = true;
    return type;
};

/**
 * Converts this message type to a message type descriptor.
 * @returns {IType} Message type descriptor
 */
Type.prototype.toJSON = function toJSON() {
    var inherited = Namespace.prototype.toJSON.call(this);
    return util.toObject([
        "options"    , inherited && inherited.options || undefined,
        "oneofs"     , Namespace.arrayToJSON(this.oneofsArray),
        "fields"     , Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) { return !obj.declaringField; })) || {},
        "extensions" , this.extensions && this.extensions.length ? this.extensions : undefined,
        "reserved"   , this.reserved && this.reserved.length ? this.reserved : undefined,
        "group"      , this.group || undefined,
        "nested"     , inherited && inherited.nested || undefined
    ]);
};

/**
 * @override
 */
Type.prototype.resolveAll = function resolveAll() {
    var fields = this.fieldsArray, i = 0;
    while (i < fields.length)
        fields[i++].resolve();
    var oneofs = this.oneofsArray; i = 0;
    while (i < oneofs.length)
        oneofs[i++].resolve();
    return Namespace.prototype.resolveAll.call(this);
};

/**
 * @override
 */
Type.prototype.get = function get(name) {
    return this.fields[name]
        || this.oneofs && this.oneofs[name]
        || this.nested && this.nested[name]
        || null;
};

/**
 * Adds a nested object to this type.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
 */
Type.prototype.add = function add(object) {

    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Field && object.extend === undefined) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.

        // avoids calling the getter if not absolutely necessary because it's called quite frequently
        if (this._fieldsById ? /* istanbul ignore next */ this._fieldsById[object.id] : this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
            throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
            throw Error("name '" + object.name + "' is reserved in " + this);

        if (object.parent)
            object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {
        if (!this.oneofs)
            this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * Removes a nested object from this type.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this type
 */
Type.prototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.

        /* istanbul ignore if */
        if (!this.fields || this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {

        /* istanbul ignore if */
        if (!this.oneofs || this.oneofs[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedId = function isReservedId(id) {
    if (this.reserved)
        for (var i = 0; i < this.reserved.length; ++i)
            if (typeof this.reserved[i] !== "string" && this.reserved[i][0] <= id && this.reserved[i][1] >= id)
                return true;
    return false;
};

/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedName = function isReservedName(name) {
    if (this.reserved)
        for (var i = 0; i < this.reserved.length; ++i)
            if (this.reserved[i] === name)
                return true;
    return false;
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<{}>} Message instance
 */
Type.prototype.create = function create(properties) {
    return new this.ctor(properties);
};

/**
 * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
 * @returns {Type} `this`
 */
Type.prototype.setup = function setup() {
    // Sets up everything at once so that the prototype chain does not have to be re-evaluated
    // multiple times (V8, soft-deopt prototype-check).

    var fullName = this.fullName,
        types    = [];
    for (var i = 0; i < /* initializes */ this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);

    // Replace setup methods with type-specific generated functions
    this.encode = encoder(this)({
        Writer : Writer,
        types  : types,
        util   : util
    });
    this.decode = decoder(this)({
        Reader : Reader,
        types  : types,
        util   : util
    });
    this.verify = verifier(this)({
        types : types,
        util  : util
    });
    this.fromObject = converter.fromObject(this)({
        types : types,
        util  : util
    });
    this.toObject = converter.toObject(this)({
        types : types,
        util  : util
    });

    // Inject custom wrappers for common types
    var wrapper = wrappers[fullName];
    if (wrapper) {
        var originalThis = Object.create(this);
        // if (wrapper.fromObject) {
            originalThis.fromObject = this.fromObject;
            this.fromObject = wrapper.fromObject.bind(originalThis);
        // }
        // if (wrapper.toObject) {
            originalThis.toObject = this.toObject;
            this.toObject = wrapper.toObject.bind(originalThis);
        // }
    }

    return this;
};

/**
 * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encode = function encode_setup(message, writer) {
    return this.setup().encode(message, writer); // overrides this method
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};

/**
 * Decodes a message of this type.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError<{}>} If required fields are missing
 */
Type.prototype.decode = function decode_setup(reader, length) {
    return this.setup().decode(reader, length); // overrides this method
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError} If required fields are missing
 */
Type.prototype.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof Reader))
        reader = Reader.create(reader);
    return this.decode(reader, reader.uint32());
};

/**
 * Verifies that field values are valid and that required fields are present.
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {null|string} `null` if valid, otherwise the reason why it is not
 */
Type.prototype.verify = function verify_setup(message) {
    return this.setup().verify(message); // overrides this method
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object to convert
 * @returns {Message<{}>} Message instance
 */
Type.prototype.fromObject = function fromObject(object) {
    return this.setup().fromObject(object);
};

/**
 * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
 * @interface IConversionOptions
 * @property {Function} [longs] Long conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
 * @property {Function} [enums] Enum value conversion type.
 * Only valid value is `String` (the global type).
 * Defaults to copy the present value, which is the numeric id.
 * @property {Function} [bytes] Bytes value conversion type.
 * Valid values are `Array` and (a base64 encoded) `String` (the global types).
 * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
 * @property {boolean} [defaults=false] Also sets default values on the resulting object
 * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
 * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
 * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
 * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
 */

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */
Type.prototype.toObject = function toObject(message, options) {
    return this.setup().toObject(message, options);
};

/**
 * Decorator function as returned by {@link Type.d} (TypeScript).
 * @typedef TypeDecorator
 * @type {function}
 * @param {Constructor<T>} target Target constructor
 * @returns {undefined}
 * @template T extends Message<T>
 */

/**
 * Type decorator (TypeScript).
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {TypeDecorator<T>} Decorator function
 * @template T extends Message<T>
 */
Type.d = function decorateType(typeName) {
    return function typeDecorator(target) {
        util.decorateType(target, typeName);
    };
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = MapField;

// extends Field
var Field = __webpack_require__(3);
((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

var types   = __webpack_require__(5),
    util    = __webpack_require__(0);

/**
 * Constructs a new map field instance.
 * @classdesc Reflected map field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} keyType Key type
 * @param {string} type Value type
 * @param {Object.<string,*>} [options] Declared options
 */
function MapField(name, id, keyType, type, options) {
    Field.call(this, name, id, type, options);

    /* istanbul ignore if */
    if (!util.isString(keyType))
        throw TypeError("keyType must be a string");

    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // toJSON, marker

    /**
     * Resolved key type if not a basic type.
     * @type {ReflectionObject|null}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

/**
 * Map field descriptor.
 * @interface IMapField
 * @extends {IField}
 * @property {string} keyType Key type
 */

/**
 * Extension map field descriptor.
 * @interface IExtensionMapField
 * @extends IMapField
 * @property {string} extend Extended type
 */

/**
 * Constructs a map field from a map field descriptor.
 * @param {string} name Field name
 * @param {IMapField} json Map field descriptor
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.keyType, json.type, json.options);
};

/**
 * Converts this map field to a map field descriptor.
 * @returns {IMapField} Map field descriptor
 */
MapField.prototype.toJSON = function toJSON() {
    return util.toObject([
        "keyType" , this.keyType,
        "type"    , this.type,
        "id"      , this.id,
        "extend"  , this.extend,
        "options" , this.options
    ]);
};

/**
 * @override
 */
MapField.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;

    // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"
    if (types.mapKey[this.keyType] === undefined)
        throw Error("invalid key type: " + this.keyType);

    return Field.prototype.resolve.call(this);
};

/**
 * Map field decorator (TypeScript).
 * @name MapField.d
 * @function
 * @param {number} fieldId Field id
 * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
 * @returns {FieldDecorator} Decorator function
 * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
 */
MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {

    // submessage value: decorate the submessage and use its name as the type
    if (typeof fieldValueType === "function")
        fieldValueType = util.decorateType(fieldValueType).name;

    // enum reference value: create a reflected copy of the enum and keep reuseing it
    else if (fieldValueType && typeof fieldValueType === "object")
        fieldValueType = util.decorateEnum(fieldValueType).name;

    return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor)
            .add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
    };
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

// extends Namespace
var Namespace = __webpack_require__(6);
((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";

var Method = __webpack_require__(14),
    util   = __webpack_require__(0),
    rpc    = __webpack_require__(20);

/**
 * Constructs a new service instance.
 * @classdesc Reflected service.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Service name
 * @param {Object.<string,*>} [options] Service options
 * @throws {TypeError} If arguments are invalid
 */
function Service(name, options) {
    Namespace.call(this, name, options);

    /**
     * Service methods.
     * @type {Object.<string,Method>}
     */
    this.methods = {}; // toJSON, marker

    /**
     * Cached methods as an array.
     * @type {Method[]|null}
     * @private
     */
    this._methodsArray = null;
}

/**
 * Service descriptor.
 * @interface IService
 * @extends INamespace
 * @property {Object.<string,IMethod>} methods Method descriptors
 */

/**
 * Constructs a service from a service descriptor.
 * @param {string} name Service name
 * @param {IService} json Service descriptor
 * @returns {Service} Created service
 * @throws {TypeError} If arguments are invalid
 */
Service.fromJSON = function fromJSON(name, json) {
    var service = new Service(name, json.options);
    /* istanbul ignore else */
    if (json.methods)
        for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
            service.add(Method.fromJSON(names[i], json.methods[names[i]]));
    if (json.nested)
        service.addJSON(json.nested);
    return service;
};

/**
 * Converts this service to a service descriptor.
 * @returns {IService} Service descriptor
 */
Service.prototype.toJSON = function toJSON() {
    var inherited = Namespace.prototype.toJSON.call(this);
    return util.toObject([
        "options" , inherited && inherited.options || undefined,
        "methods" , Namespace.arrayToJSON(this.methodsArray) || /* istanbul ignore next */ {},
        "nested"  , inherited && inherited.nested || undefined
    ]);
};

/**
 * Methods of this service as an array for iteration.
 * @name Service#methodsArray
 * @type {Method[]}
 * @readonly
 */
Object.defineProperty(Service.prototype, "methodsArray", {
    get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
    }
});

function clearCache(service) {
    service._methodsArray = null;
    return service;
}

/**
 * @override
 */
Service.prototype.get = function get(name) {
    return this.methods[name]
        || Namespace.prototype.get.call(this, name);
};

/**
 * @override
 */
Service.prototype.resolveAll = function resolveAll() {
    var methods = this.methodsArray;
    for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
    return Namespace.prototype.resolve.call(this);
};

/**
 * @override
 */
Service.prototype.add = function add(object) {

    /* istanbul ignore if */
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * @override
 */
Service.prototype.remove = function remove(object) {
    if (object instanceof Method) {

        /* istanbul ignore if */
        if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Creates a runtime service using the specified rpc implementation.
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
 */
Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
    var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
    for (var i = 0, method; i < /* initializes */ this.methodsArray.length; ++i) {
        rpcService[util.lcFirst((method = this._methodsArray[i]).resolve().name)] = util.codegen(["r","c"], util.lcFirst(method.name))("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
        });
    }
    return rpcService;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Method;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(4);
((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";

var util = __webpack_require__(0);

/**
 * Constructs a new service method instance.
 * @classdesc Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string|undefined} type Method type, usually `"rpc"`
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
 * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
 * @param {Object.<string,*>} [options] Declared options
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options) {

    /* istanbul ignore next */
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }

    /* istanbul ignore if */
    if (!(type === undefined || util.isString(type)))
        throw TypeError("type must be a string");

    /* istanbul ignore if */
    if (!util.isString(requestType))
        throw TypeError("requestType must be a string");

    /* istanbul ignore if */
    if (!util.isString(responseType))
        throw TypeError("responseType must be a string");

    ReflectionObject.call(this, name, options);

    /**
     * Method type.
     * @type {string}
     */
    this.type = type || "rpc"; // toJSON

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType; // toJSON, marker

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined; // toJSON

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType; // toJSON

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined; // toJSON

    /**
     * Resolved request type.
     * @type {Type|null}
     */
    this.resolvedRequestType = null;

    /**
     * Resolved response type.
     * @type {Type|null}
     */
    this.resolvedResponseType = null;
}

/**
 * Method descriptor.
 * @interface IMethod
 * @property {string} [type="rpc"] Method type
 * @property {string} requestType Request type
 * @property {string} responseType Response type
 * @property {boolean} [requestStream=false] Whether requests are streamed
 * @property {boolean} [responseStream=false] Whether responses are streamed
 * @property {Object.<string,*>} [options] Method options
 */

/**
 * Constructs a method from a method descriptor.
 * @param {string} name Method name
 * @param {IMethod} json Method descriptor
 * @returns {Method} Created method
 * @throws {TypeError} If arguments are invalid
 */
Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options);
};

/**
 * Converts this method to a method descriptor.
 * @returns {IMethod} Method descriptor
 */
Method.prototype.toJSON = function toJSON() {
    return util.toObject([
        "type"           , this.type !== "rpc" && /* istanbul ignore next */ this.type || undefined,
        "requestType"    , this.requestType,
        "requestStream"  , this.requestStream,
        "responseType"   , this.responseType,
        "responseStream" , this.responseStream,
        "options"        , this.options
    ]);
};

/**
 * @override
 */
Method.prototype.resolve = function resolve() {

    /* istanbul ignore if */
    if (this.resolved)
        return this;

    this.resolvedRequestType = this.parent.lookupType(this.requestType);
    this.resolvedResponseType = this.parent.lookupType(this.responseType);

    return ReflectionObject.prototype.resolve.call(this);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Message;

var util = __webpack_require__(2);

/**
 * Constructs a new message instance.
 * @classdesc Abstract runtime message.
 * @constructor
 * @param {Properties<T>} [properties] Properties to set
 * @template T extends object
 */
function Message(properties) {
    // not used internally
    if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            this[keys[i]] = properties[keys[i]];
}

/**
 * Reference to the reflected type.
 * @name Message.$type
 * @type {Type}
 * @readonly
 */

/**
 * Reference to the reflected type.
 * @name Message#$type
 * @type {Type}
 * @readonly
 */

/*eslint-disable valid-jsdoc*/

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<T>} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.create = function create(properties) {
    return this.$type.create(properties);
};

/**
 * Encodes a message of this type.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.encode = function encode(message, writer) {
    return this.$type.encode(message, writer);
};

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.encodeDelimited = function encodeDelimited(message, writer) {
    return this.$type.encodeDelimited(message, writer);
};

/**
 * Decodes a message of this type.
 * @name Message.decode
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.decode = function decode(reader) {
    return this.$type.decode(reader);
};

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Message.decodeDelimited
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.decodeDelimited = function decodeDelimited(reader) {
    return this.$type.decodeDelimited(reader);
};

/**
 * Verifies a message of this type.
 * @name Message.verify
 * @function
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {string|null} `null` if valid, otherwise the reason why it is not
 */
Message.verify = function verify(message) {
    return this.$type.verify(message);
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object
 * @returns {T} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.fromObject = function fromObject(object) {
    return this.$type.fromObject(object);
};

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {T} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.toObject = function toObject(message, options) {
    return this.$type.toObject(message, options);
};

/**
 * Converts this message to JSON.
 * @returns {Object.<string,*>} JSON object
 */
Message.prototype.toJSON = function toJSON() {
    return this.$type.toObject(this, util.toJSONOptions);
};

/*eslint-enable valid-jsdoc*/

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Root;

// extends Namespace
var Namespace = __webpack_require__(6);
((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";

var Field   = __webpack_require__(3),
    Enum    = __webpack_require__(1),
    OneOf   = __webpack_require__(7),
    util    = __webpack_require__(0);

var Type,   // cyclic
    parse,  // might be excluded
    common; // "

/**
 * Constructs a new root namespace instance.
 * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
 * @extends NamespaceBase
 * @constructor
 * @param {Object.<string,*>} [options] Top level options
 */
function Root(options) {
    Namespace.call(this, "", options);

    /**
     * Deferred extension fields.
     * @type {Field[]}
     */
    this.deferred = [];

    /**
     * Resolved file names of loaded files.
     * @type {string[]}
     */
    this.files = [];
}

/**
 * Loads a namespace descriptor into a root namespace.
 * @param {INamespace} json Nameespace descriptor
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted
 * @returns {Root} Root namespace
 */
Root.fromJSON = function fromJSON(json, root) {
    if (!root)
        root = new Root();
    if (json.options)
        root.setOptions(json.options);
    return root.addJSON(json.nested);
};

/**
 * Resolves the path of an imported file, relative to the importing origin.
 * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
 * @function
 * @param {string} origin The file name of the importing file
 * @param {string} target The file name being imported
 * @returns {string|null} Resolved path to `target` or `null` to skip the file
 */
Root.prototype.resolvePath = util.path.resolve;

// A symbol-like function to safely signal synchronous loading
/* istanbul ignore next */
function SYNC() {} // eslint-disable-line no-empty-function

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} options Parse options
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 */
Root.prototype.load = function load(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = undefined;
    }
    var self = this;
    if (!callback)
        return util.asPromise(load, self, filename, options);

    var sync = callback === SYNC; // undocumented

    // Finishes loading by calling the callback (exactly once)
    function finish(err, root) {
        /* istanbul ignore if */
        if (!callback)
            return;
        var cb = callback;
        callback = null;
        if (sync)
            throw err;
        cb(err, root);
    }

    // Processes a single file
    function process(filename, source) {
        try {
            if (util.isString(source) && source.charAt(0) === "{")
                source = JSON.parse(source);
            if (!util.isString(source))
                self.setOptions(source.options).addJSON(source.nested);
            else {
                parse.filename = filename;
                var parsed = parse(source, self, options),
                    resolved,
                    i = 0;
                if (parsed.imports)
                    for (; i < parsed.imports.length; ++i)
                        if (resolved = self.resolvePath(filename, parsed.imports[i]))
                            fetch(resolved);
                if (parsed.weakImports)
                    for (i = 0; i < parsed.weakImports.length; ++i)
                        if (resolved = self.resolvePath(filename, parsed.weakImports[i]))
                            fetch(resolved, true);
            }
        } catch (err) {
            finish(err);
        }
        if (!sync && !queued)
            finish(null, self); // only once anyway
    }

    // Fetches a single file
    function fetch(filename, weak) {

        // Strip path if this file references a bundled definition
        var idx = filename.lastIndexOf("google/protobuf/");
        if (idx > -1) {
            var altname = filename.substring(idx);
            if (altname in common)
                filename = altname;
        }

        // Skip if already loaded / attempted
        if (self.files.indexOf(filename) > -1)
            return;
        self.files.push(filename);

        // Shortcut bundled definitions
        if (filename in common) {
            if (sync)
                process(filename, common[filename]);
            else {
                ++queued;
                setTimeout(function() {
                    --queued;
                    process(filename, common[filename]);
                });
            }
            return;
        }

        // Otherwise fetch from disk or network
        if (sync) {
            var source;
            try {
                source = util.fs.readFileSync(filename).toString("utf8");
            } catch (err) {
                if (!weak)
                    finish(err);
                return;
            }
            process(filename, source);
        } else {
            ++queued;
            util.fetch(filename, function(err, source) {
                --queued;
                /* istanbul ignore if */
                if (!callback)
                    return; // terminated meanwhile
                if (err) {
                    /* istanbul ignore else */
                    if (!weak)
                        finish(err);
                    else if (!queued) // can't be covered reliably
                        finish(null, self);
                    return;
                }
                process(filename, source);
            });
        }
    }
    var queued = 0;

    // Assembling the root namespace doesn't require working type
    // references anymore, so we can load everything in parallel
    if (util.isString(filename))
        filename = [ filename ];
    for (var i = 0, resolved; i < filename.length; ++i)
        if (resolved = self.resolvePath("", filename[i]))
            fetch(resolved);

    if (sync)
        return self;
    if (!queued)
        finish(null, self);
    return undefined;
};
// function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Promise<Root>} Promise
 * @variation 3
 */
// function load(filename:string, [options:IParseOptions]):Promise<Root>

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
 * @function Root#loadSync
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 */
Root.prototype.loadSync = function loadSync(filename, options) {
    if (!util.isNode)
        throw Error("not supported");
    return this.load(filename, options, SYNC);
};

/**
 * @override
 */
Root.prototype.resolveAll = function resolveAll() {
    if (this.deferred.length)
        throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
            return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
    return Namespace.prototype.resolveAll.call(this);
};

// only uppercased (and thus conflict-free) children are exposed, see below
var exposeRe = /^[A-Z]/;

/**
 * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
 * @param {Root} root Root instance
 * @param {Field} field Declaring extension field witin the declaring type
 * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
 * @inner
 * @ignore
 */
function tryHandleExtension(root, field) {
    var extendedType = field.parent.lookup(field.extend);
    if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
    }
    return false;
}

/**
 * Called when any object is added to this root or its sub-namespaces.
 * @param {ReflectionObject} object Object added
 * @returns {undefined}
 * @private
 */
Root.prototype._handleAdd = function _handleAdd(object) {
    if (object instanceof Field) {

        if (/* an extension field (implies not part of a oneof) */ object.extend !== undefined && /* not already handled */ !object.extensionField)
            if (!tryHandleExtension(this, object))
                this.deferred.push(object);

    } else if (object instanceof Enum) {

        if (exposeRe.test(object.name))
            object.parent[object.name] = object.values; // expose enum values as property of its parent

    } else if (!(object instanceof OneOf)) /* everything else is a namespace */ {

        if (object instanceof Type) // Try to handle any deferred extensions
            for (var i = 0; i < this.deferred.length;)
                if (tryHandleExtension(this, this.deferred[i]))
                    this.deferred.splice(i, 1);
                else
                    ++i;
        for (var j = 0; j < /* initializes */ object.nestedArray.length; ++j) // recurse into the namespace
            this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name))
            object.parent[object.name] = object; // expose namespace as property of its parent
    }

    // The above also adds uppercased (and thus conflict-free) nested types, services and enums as
    // properties of namespaces just like static code does. This allows using a .d.ts generated for
    // a static module with reflection-based solutions where the condition is met.
};

/**
 * Called when any object is removed from this root or its sub-namespaces.
 * @param {ReflectionObject} object Object removed
 * @returns {undefined}
 * @private
 */
Root.prototype._handleRemove = function _handleRemove(object) {
    if (object instanceof Field) {

        if (/* an extension field */ object.extend !== undefined) {
            if (/* already handled */ object.extensionField) { // remove its sister field
                object.extensionField.parent.remove(object.extensionField);
                object.extensionField = null;
            } else { // cancel the extension
                var index = this.deferred.indexOf(object);
                /* istanbul ignore else */
                if (index > -1)
                    this.deferred.splice(index, 1);
            }
        }

    } else if (object instanceof Enum) {

        if (exposeRe.test(object.name))
            delete object.parent[object.name]; // unexpose enum values

    } else if (object instanceof Namespace) {

        for (var i = 0; i < /* initializes */ object.nestedArray.length; ++i) // recurse into the namespace
            this._handleRemove(object._nestedArray[i]);

        if (exposeRe.test(object.name))
            delete object.parent[object.name]; // unexpose namespaces

    }
};

Root._configure = function(Type_, parse_, common_) {
    Type = Type_;
    parse = parse_;
    common = common_;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(44);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = encoder;

var Enum     = __webpack_require__(1),
    types    = __webpack_require__(5),
    util     = __webpack_require__(0);

/**
 * Generates a partial message type encoder.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genTypePartial(gen, field, fieldIndex, ref) {
    return field.resolvedType.group
        ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0)
        : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
}

/**
 * Generates an encoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function encoder(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var gen = util.codegen(["m", "w"], mtype.name + "$encode")
    ("if(!w)")
        ("w=Writer.create()");

    var i, ref;

    // "when a message is serialized its known fields should be written sequentially by field number"
    var fields = /* initializes */ mtype.fieldsArray.slice().sort(util.compareFieldsById);

    for (var i = 0; i < fields.length; ++i) {
        var field    = fields[i].resolve(),
            index    = mtype._fieldsArray.indexOf(field),
            type     = field.resolvedType instanceof Enum ? "int32" : field.type,
            wireType = types.basic[type];
            ref      = "m" + util.safeProp(field.name);

        // Map fields
        if (field.map) {
            gen
    ("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name) // !== undefined && !== null
        ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)
            ("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === undefined) gen
            ("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref); // can't be groups
            else gen
            (".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen
        ("}")
    ("}");

            // Repeated fields
        } else if (field.repeated) { gen
    ("if(%s!=null&&%s.length){", ref, ref); // !== undefined && !== null

            // Packed repeated
            if (field.packed && types.packed[type] !== undefined) { gen

        ("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)
        ("for(var i=0;i<%s.length;++i)", ref)
            ("w.%s(%s[i])", type, ref)
        ("w.ldelim()");

            // Non-packed
            } else { gen

        ("for(var i=0;i<%s.length;++i)", ref);
                if (wireType === undefined)
            genTypePartial(gen, field, index, ref + "[i]");
                else gen
            ("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);

            } gen
    ("}");

        // Non-repeated
        } else {
            if (field.optional) gen
    ("if(%s!=null&&m.hasOwnProperty(%j))", ref, field.name); // !== undefined && !== null

            if (wireType === undefined)
        genTypePartial(gen, field, index, ref);
            else gen
        ("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);

        }
    }

    return gen
    ("return w");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = decoder;

var Enum    = __webpack_require__(1),
    types   = __webpack_require__(5),
    util    = __webpack_require__(0);

function missing(field) {
    return "missing required '" + field.name + "'";
}

/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function decoder(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["r", "l"], mtype.name + "$decode")
    ("if(!(r instanceof Reader))")
        ("r=Reader.create(r)")
    ("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field) { return field.map; }).length ? ",k" : ""))
    ("while(r.pos<c){")
        ("var t=r.uint32()");
    if (mtype.group) gen
        ("if((t&7)===4)")
            ("break");
    gen
        ("switch(t>>>3){");

    var i = 0;
    for (; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "int32" : field.type,
            ref   = "m" + util.safeProp(field.name); gen
            ("case %i:", field.id);

        // Map fields
        if (field.map) { gen
                ("r.skip().pos++") // assumes id 1 + key wireType
                ("if(%s===util.emptyObject)", ref)
                    ("%s={}", ref)
                ("k=r.%s()", field.keyType)
                ("r.pos++"); // assumes id 2 + value wireType
            if (types.long[field.keyType] !== undefined) {
                if (types.basic[type] === undefined) gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                else gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);
            } else {
                if (types.basic[type] === undefined) gen
                ("%s[k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                else gen
                ("%s[k]=r.%s()", ref, type);
            }

        // Repeated fields
        } else if (field.repeated) { gen

                ("if(!(%s&&%s.length))", ref, ref)
                    ("%s=[]", ref);

            // Packable (always check for forward and backward compatiblity)
            if (types.packed[type] !== undefined) gen
                ("if((t&7)===2){")
                    ("var c2=r.uint32()+r.pos")
                    ("while(r.pos<c2)")
                        ("%s.push(r.%s())", ref, type)
                ("}else");

            // Non-packed
            if (types.basic[type] === undefined) gen(field.resolvedType.group
                    ? "%s.push(types[%i].decode(r))"
                    : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
            else gen
                    ("%s.push(r.%s())", ref, type);

        // Non-repeated
        } else if (types.basic[type] === undefined) gen(field.resolvedType.group
                ? "%s=types[%i].decode(r)"
                : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else gen
                ("%s=r.%s()", ref, type);
        gen
                ("break");
    // Unknown fields
    } gen
            ("default:")
                ("r.skipType(t&7)")
                ("break")

        ("}")
    ("}");

    // Field presence
    for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) gen
    ("if(!m.hasOwnProperty(%j))", rfield.name)
        ("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
    }

    return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline */
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = verifier;

var Enum      = __webpack_require__(1),
    util      = __webpack_require__(0);

function invalid(field, expected) {
    return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:"+field.keyType+"}" : "") + " expected";
}

/**
 * Generates a partial value verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(%s){", ref)
                ("default:")
                    ("return%j", invalid(field, "enum value"));
            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) gen
                ("case %i:", field.resolvedType.values[keys[j]]);
            gen
                    ("break")
            ("}");
        } else {
            gen
            ((gen.hasErrorVar ? "" : "var ") + "e=types[%i].verify(%s);", fieldIndex, ref)
            ("if(e)")
                ("return%j+e", field.name + ".");
            gen.hasErrorVar = true;
        }
    } else {
        switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32": gen
                ("if(!util.isInteger(%s))", ref)
                    ("return%j", invalid(field, "integer"));
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
                    ("return%j", invalid(field, "integer|Long"));
                break;
            case "float":
            case "double": gen
                ("if(typeof %s!==\"number\")", ref)
                    ("return%j", invalid(field, "number"));
                break;
            case "bool": gen
                ("if(typeof %s!==\"boolean\")", ref)
                    ("return%j", invalid(field, "boolean"));
                break;
            case "string": gen
                ("if(!util.isString(%s))", ref)
                    ("return%j", invalid(field, "string"));
                break;
            case "bytes": gen
                ("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)
                    ("return%j", invalid(field, "buffer"));
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a partial key verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!util.key32Re.test(%s))", ref)
                ("return%j", invalid(field, "integer key"));
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!util.key64Re.test(%s))", ref) // see comment above: x is ok, d is not
                ("return%j", invalid(field, "integer|Long key"));
            break;
        case "bool": gen
            ("if(!util.key2Re.test(%s))", ref)
                ("return%j", invalid(field, "boolean key"));
            break;
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a verifier specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function verifier(mtype) {
    /* eslint-disable no-unexpected-multiline */

    var gen = util.codegen(["m"], mtype.name + "$verify")
    ("if(typeof m!==\"object\"||m===null)")
        ("return%j", "object expected");
    var oneofs = mtype.oneofsArray,
        seenFirstField = {};
    if (oneofs.length) gen
    ("var p={}");

    for (var i = 0; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            ref   = "m" + util.safeProp(field.name);

        if (field.optional) gen
        ("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name); // !== undefined && !== null

        // map fields
        if (field.map) { gen
            ("if(!util.isObject(%s))", ref)
                ("return%j", invalid(field, "object"))
            ("var k=Object.keys(%s)", ref)
            ("for(var i=0;i<k.length;++i){");
                genVerifyKey(gen, field, "k[i]");
                genVerifyValue(gen, field, i, ref + "[k[i]]")
            ("}");

        // repeated fields
        } else if (field.repeated) { gen
            ("if(!Array.isArray(%s))", ref)
                ("return%j", invalid(field, "array"))
            ("for(var i=0;i<%s.length;++i){", ref);
                genVerifyValue(gen, field, i, ref + "[i]")
            ("}");

        // required or present fields
        } else {
            if (field.partOf) {
                var oneofProp = util.safeProp(field.partOf.name);
                if (seenFirstField[field.partOf.name] === 1) gen
            ("if(p%s===1)", oneofProp)
                ("return%j", field.partOf.name + ": multiple values");
                seenFirstField[field.partOf.name] = 1;
                gen
            ("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i, ref);
        }
        if (field.optional) gen
        ("}");
    }
    return gen
    ("return null");
    /* eslint-enable no-unexpected-multiline */
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Runtime message from/to plain object converters.
 * @namespace
 */
var converter = exports;

var Enum = __webpack_require__(1),
    util = __webpack_require__(0);

/**
 * Generates a partial value fromObject conveter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(d%s){", prop);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
                if (field.repeated && values[keys[i]] === field.typeDefault) gen
                ("default:");
                gen
                ("case%j:", keys[i])
                ("case %i:", values[keys[i]])
                    ("m%s=%j", prop, values[keys[i]])
                    ("break");
            } gen
            ("}");
        } else gen
            ("if(typeof d%s!==\"object\")", prop)
                ("throw TypeError(%j)", field.fullName + ": object expected")
            ("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
                ("m%s=Number(d%s)", prop, prop); // also catches "NaN", "Infinity"
                break;
            case "uint32":
            case "fixed32": gen
                ("m%s=d%s>>>0", prop, prop);
                break;
            case "int32":
            case "sint32":
            case "sfixed32": gen
                ("m%s=d%s|0", prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(util.Long)")
                    ("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)
                ("else if(typeof d%s===\"string\")", prop)
                    ("m%s=parseInt(d%s,10)", prop, prop)
                ("else if(typeof d%s===\"number\")", prop)
                    ("m%s=d%s", prop, prop)
                ("else if(typeof d%s===\"object\")", prop)
                    ("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
                break;
            case "bytes": gen
                ("if(typeof d%s===\"string\")", prop)
                    ("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)
                ("else if(d%s.length)", prop)
                    ("m%s=d%s", prop, prop);
                break;
            case "string": gen
                ("m%s=String(d%s)", prop, prop);
                break;
            case "bool": gen
                ("m%s=Boolean(d%s)", prop, prop);
                break;
            /* default: gen
                ("m%s=d%s", prop, prop);
                break; */
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a plain object to runtime message converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.fromObject = function fromObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray;
    var gen = util.codegen(["d"], mtype.name + "$fromObject")
    ("if(d instanceof this.ctor)")
        ("return d");
    if (!fields.length) return gen
    ("return new this.ctor");
    gen
    ("var m=new this.ctor");
    for (var i = 0; i < fields.length; ++i) {
        var field  = fields[i].resolve(),
            prop   = util.safeProp(field.name);

        // Map fields
        if (field.map) { gen
    ("if(d%s){", prop)
        ("if(typeof d%s!==\"object\")", prop)
            ("throw TypeError(%j)", field.fullName + ": object expected")
        ("m%s={}", prop)
        ("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[ks[i]]")
        ("}")
    ("}");

        // Repeated fields
        } else if (field.repeated) { gen
    ("if(d%s){", prop)
        ("if(!Array.isArray(d%s))", prop)
            ("throw TypeError(%j)", field.fullName + ": array expected")
        ("m%s=[]", prop)
        ("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[i]")
        ("}")
    ("}");

        // Non-repeated fields
        } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
    ("if(d%s!=null){", prop); // !== undefined && !== null
        genValuePartial_fromObject(gen, field, /* not sorted */ i, prop);
            if (!(field.resolvedType instanceof Enum)) gen
    ("}");
        }
    } return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};

/**
 * Generates a partial value toObject converter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_toObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) gen
            ("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);
        else gen
            ("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
            ("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
            ("if(typeof m%s===\"number\")", prop)
                ("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)
            ("else") // Long-like
                ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true": "", prop);
                break;
            case "bytes": gen
            ("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
                break;
            default: gen
            ("d%s=m%s", prop, prop);
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a runtime message to plain object converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.toObject = function toObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
    if (!fields.length)
        return util.codegen()("return {}");
    var gen = util.codegen(["m", "o"], mtype.name + "$toObject")
    ("if(!o)")
        ("o={}")
    ("var d={}");

    var repeatedFields = [],
        mapFields = [],
        normalFields = [],
        i = 0;
    for (; i < fields.length; ++i)
        if (!fields[i].partOf)
            ( fields[i].resolve().repeated ? repeatedFields
            : fields[i].map ? mapFields
            : normalFields).push(fields[i]);

    if (repeatedFields.length) { gen
    ("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i) gen
        ("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen
    ("}");
    }

    if (mapFields.length) { gen
    ("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i) gen
        ("d%s={}", util.safeProp(mapFields[i].name));
        gen
    ("}");
    }

    if (normalFields.length) { gen
    ("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i],
                prop  = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen
        ("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen
        ("if(util.Long){")
            ("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)
            ("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)
        ("}else")
            ("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) gen
        ("d%s=o.bytes===String?%j:%s", prop, String.fromCharCode.apply(String, field.typeDefault), "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]");
            else gen
        ("d%s=%j", prop, field.typeDefault); // also messages (=null)
        } gen
    ("}");
    }
    var hasKs2 = false;
    for (i = 0; i < fields.length; ++i) {
        var field = fields[i],
            index = mtype._fieldsArray.indexOf(field),
            prop  = util.safeProp(field.name);
        if (field.map) {
            if (!hasKs2) { hasKs2 = true; gen
    ("var ks2");
            } gen
    ("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)
        ("d%s={}", prop)
        ("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[ks2[j]]")
        ("}");
        } else if (field.repeated) { gen
    ("if(m%s&&m%s.length){", prop, prop)
        ("d%s=[]", prop)
        ("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[j]")
        ("}");
        } else { gen
    ("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name); // !== undefined && !== null
        genValuePartial_toObject(gen, field, /* sorted */ index, prop);
        if (field.partOf) gen
        ("if(o.oneofs)")
            ("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen
    ("}");
    }
    return gen
    ("return d");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Wrappers for common types.
 * @type {Object.<string,IWrapper>}
 * @const
 */
var wrappers = exports;

var Message = __webpack_require__(15);

/**
 * From object converter part of an {@link IWrapper}.
 * @typedef WrapperFromObjectConverter
 * @type {function}
 * @param {Object.<string,*>} object Plain object
 * @returns {Message<{}>} Message instance
 * @this Type
 */

/**
 * To object converter part of an {@link IWrapper}.
 * @typedef WrapperToObjectConverter
 * @type {function}
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @this Type
 */

/**
 * Common type wrapper part of {@link wrappers}.
 * @interface IWrapper
 * @property {WrapperFromObjectConverter} [fromObject] From object converter
 * @property {WrapperToObjectConverter} [toObject] To object converter
 */

// Custom wrapper for Any
wrappers[".google.protobuf.Any"] = {

    fromObject: function(object) {

        // unwrap value type if mapped
        if (object && object["@type"]) {
            var type = this.lookup(object["@type"]);
            /* istanbul ignore else */
            if (type)
                return this.create({
                    type_url: object["@type"],
                    value: type.encode(object).finish()
                });
        }

        return this.fromObject(object);
    },

    toObject: function(message, options) {

        // decode value if requested and unmapped
        if (options && options.json && message.type_url && message.value) {
            var type = this.lookup(message.type_url);
            /* istanbul ignore else */
            if (type)
                message = type.decode(message.value);
        }

        // wrap value if unmapped
        if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            object["@type"] = message.$type.fullName;
            return object;
        }

        return this.toObject(message, options);
    }
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = tokenize;

var delimRe        = /[\s{}=;:[\],'"()<>]/g,
    stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

var setCommentRe = /^ *[*/]+ */,
    setCommentSplitRe = /\n/g,
    whitespaceRe = /\s/,
    unescapeRe = /\\(.?)/g;

var unescapeMap = {
    "0": "\0",
    "r": "\r",
    "n": "\n",
    "t": "\t"
};

/**
 * Unescapes a string.
 * @param {string} str String to unescape
 * @returns {string} Unescaped string
 * @property {Object.<string,string>} map Special characters map
 * @memberof tokenize
 */
function unescape(str) {
    return str.replace(unescapeRe, function($0, $1) {
        switch ($1) {
            case "\\":
            case "":
                return $1;
            default:
                return unescapeMap[$1] || "";
        }
    });
}

tokenize.unescape = unescape;

/**
 * Gets the next token and advances.
 * @typedef TokenizerHandleNext
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */

/**
 * Peeks for the next token.
 * @typedef TokenizerHandlePeek
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */

/**
 * Pushes a token back to the stack.
 * @typedef TokenizerHandlePush
 * @type {function}
 * @param {string} token Token
 * @returns {undefined}
 */

/**
 * Skips the next token.
 * @typedef TokenizerHandleSkip
 * @type {function}
 * @param {string} expected Expected token
 * @param {boolean} [optional=false] If optional
 * @returns {boolean} Whether the token matched
 * @throws {Error} If the token didn't match and is not optional
 */

/**
 * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
 * @typedef TokenizerHandleCmnt
 * @type {function}
 * @param {number} [line] Line number
 * @returns {string|null} Comment text or `null` if none
 */

/**
 * Handle object returned from {@link tokenize}.
 * @interface ITokenizerHandle
 * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
 * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
 * @property {TokenizerHandlePush} push Pushes a token back to the stack
 * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
 * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
 * @property {number} line Current line number
 */

/**
 * Tokenizes the given .proto source and returns an object with useful utility functions.
 * @param {string} source Source contents
 * @returns {ITokenizerHandle} Tokenizer handle
 */
function tokenize(source) {
    /* eslint-disable callback-return */
    source = source.toString();

    var offset = 0,
        length = source.length,
        line = 1,
        commentType = null,
        commentText = null,
        commentLine = 0,
        commentLineEmpty = false;

    var stack = [];

    var stringDelim = null;

    /* istanbul ignore next */
    /**
     * Creates an error for illegal syntax.
     * @param {string} subject Subject
     * @returns {Error} Error created
     * @inner
     */
    function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
    }

    /**
     * Reads a string till its end.
     * @returns {string} String read
     * @inner
     */
    function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
            throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
    }

    /**
     * Gets the character at `pos` within the source.
     * @param {number} pos Position
     * @returns {string} Character
     * @inner
     */
    function charAt(pos) {
        return source.charAt(pos);
    }

    /**
     * Sets the current comment text.
     * @param {number} start Start offset
     * @param {number} end End offset
     * @returns {undefined}
     * @inner
     */
    function setComment(start, end) {
        commentType = source.charAt(start++);
        commentLine = line;
        commentLineEmpty = false;
        var offset = start - 3, // "///" or "/**"
            c;
        do {
            if (--offset < 0 || (c = source.charAt(offset)) === "\n") {
                commentLineEmpty = true;
                break;
            }
        } while (c === " " || c === "\t");
        var lines = source
            .substring(start, end)
            .split(setCommentSplitRe);
        for (var i = 0; i < lines.length; ++i)
            lines[i] = lines[i].replace(setCommentRe, "").trim();
        commentText = lines
            .join("\n")
            .trim();
    }

    /**
     * Obtains the next token.
     * @returns {string|null} Next token or `null` on eof
     * @inner
     */
    function next() {
        if (stack.length > 0)
            return stack.shift();
        if (stringDelim)
            return readString();
        var repeat,
            prev,
            curr,
            start,
            isDoc;
        do {
            if (offset === length)
                return null;
            repeat = false;
            while (whitespaceRe.test(curr = charAt(offset))) {
                if (curr === "\n")
                    ++line;
                if (++offset === length)
                    return null;
            }
            if (charAt(offset) === "/") {
                if (++offset === length)
                    throw illegal("comment");
                if (charAt(offset) === "/") { // Line
                    isDoc = charAt(start = offset + 1) === "/";
                    while (charAt(++offset) !== "\n")
                        if (offset === length)
                            return null;
                    ++offset;
                    if (isDoc) /// Comment
                        setComment(start, offset - 1);
                    ++line;
                    repeat = true;
                } else if ((curr = charAt(offset)) === "*") { /* Block */
                    isDoc = charAt(start = offset + 1) === "*";
                    do {
                        if (curr === "\n")
                            ++line;
                        if (++offset === length)
                            throw illegal("comment");
                        prev = curr;
                        curr = charAt(offset);
                    } while (prev !== "*" || curr !== "/");
                    ++offset;
                    if (isDoc) /** Comment */
                        setComment(start, offset - 2);
                    repeat = true;
                } else
                    return "/";
            }
        } while (repeat);

        // offset !== length if we got here

        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim)
            while (end < length && !delimRe.test(charAt(end)))
                ++end;
        var token = source.substring(offset, offset = end);
        if (token === "\"" || token === "'")
            stringDelim = token;
        return token;
    }

    /**
     * Pushes a token back to the stack.
     * @param {string} token Token
     * @returns {undefined}
     * @inner
     */
    function push(token) {
        stack.push(token);
    }

    /**
     * Peeks for the next token.
     * @returns {string|null} Token or `null` on eof
     * @inner
     */
    function peek() {
        if (!stack.length) {
            var token = next();
            if (token === null)
                return null;
            push(token);
        }
        return stack[0];
    }

    /**
     * Skips a token.
     * @param {string} expected Expected token
     * @param {boolean} [optional=false] Whether the token is optional
     * @returns {boolean} `true` when skipped, `false` if not
     * @throws {Error} When a required token is not present
     * @inner
     */
    function skip(expected, optional) {
        var actual = peek(),
            equals = actual === expected;
        if (equals) {
            next();
            return true;
        }
        if (!optional)
            throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
    }

    /**
     * Gets a comment.
     * @param {number} [trailingLine] Line number if looking for a trailing comment
     * @returns {string|null} Comment text
     * @inner
     */
    function cmnt(trailingLine) {
        var ret = null;
        if (trailingLine === undefined) {
            if (commentLine === line - 1 && (commentType === "*" || commentLineEmpty))
                ret = commentText;
        } else {
            /* istanbul ignore else */
            if (commentLine < trailingLine)
                peek();
            if (commentLine === trailingLine && !commentLineEmpty && commentType === "/")
                ret = commentText;
        }
        return ret;
    }

    return Object.defineProperty({
        next: next,
        peek: peek,
        push: push,
        skip: skip,
        cmnt: cmnt
    }, "line", {
        get: function() { return line; }
    });
    /* eslint-enable callback-return */
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "options": {
    "go_package": "source.yzsci.cn/go_im/pb/pb_pub"
  },
  "nested": {
    "pb_msg_admin": {
      "nested": {
        "AdminLogonRsp": {
          "fields": {
            "adminId": {
              "type": "int64",
              "id": 1
            },
            "adminUser": {
              "type": "string",
              "id": 2
            },
            "authorization": {
              "type": "string",
              "id": 3
            }
          }
        },
        "LogonUPReq": {
          "fields": {
            "adminName": {
              "type": "string",
              "id": 1
            },
            "adminPasswd": {
              "type": "string",
              "id": 2
            },
            "host": {
              "type": "string",
              "id": 3
            }
          }
        },
        "UpdateTable": {
          "fields": {
            "updateCol": {
              "type": "string",
              "id": 1
            },
            "updateValue": {
              "type": "string",
              "id": 2
            },
            "exps": {
              "keyType": "string",
              "type": "string",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_blackList": {
      "nested": {
        "ReadBlackListReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ReadBlackListRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "aimUserid": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            }
          }
        },
        "JudgeBlackListReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "JudgeBlackListRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "state": {
              "type": "Judge_State",
              "id": 2
            }
          }
        },
        "SaveBlackListReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "SaveBlackListRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "DeleteBlackListReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "DeleteBlackListRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "Judge_State": {
          "values": {
            "NOT_EXIST": 0,
            "EXIST": 1
          }
        }
      }
    },
    "pb_msg_call_scene": {
      "nested": {
        "CALL_SCENE_STATE": {
          "values": {
            "CALL_SCENE_STATE_INIT": 0,
            "CALL_SCENE_STATE_CALLING": 1,
            "CALL_SCENE_STATE_ONLINE": 2,
            "CALL_SCENE_STATE_CALL_END": 3
          }
        },
        "CALL_OVER_RESION": {
          "values": {
            "CALL_OVER_RESION_TIMEOUT": 0,
            "CALL_OVER_RESION_CALLEE_NOT_ONLINE": 1,
            "CALL_OVER_RESION_CALLEE_NO_ANSWER": 2,
            "CALL_OVER_RESION_CALLEE_OFFLINE": 3,
            "CALL_OVER_RESION_CALLER_OFFLINE": 4,
            "CALL_OVER_RESION_CALLER_HANGUP": 5,
            "CALL_OVER_RESION_CALLEE_HANGUP": 6,
            "CALL_OVER_RESION_BALANCE_NOT_ENOUGH": 7
          }
        },
        "CALL_TYPE": {
          "values": {
            "CALL_TYPE_UNKNOWN": 0,
            "CALL_TYPE_VIDEO": 1,
            "CALL_TYPE_VOICE": 2
          }
        },
        "DialReq": {
          "fields": {
            "CalleeId": {
              "type": "int64",
              "id": 1
            },
            "CallType": {
              "type": "CALL_TYPE",
              "id": 2
            },
            "ChatCoinType": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "DialRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "code": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "WaitForCalleeAnswerNotifyToServer": {
          "fields": {
            "CalleeId": {
              "type": "int64",
              "id": 1
            },
            "YXChatId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "AnswerCallReq": {
          "fields": {
            "answer": {
              "type": "ANSWER_OF_CALL",
              "id": 1
            }
          }
        },
        "AnswerCallRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "code": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "ANSWER_OF_CALL": {
          "values": {
            "REFUSE": 0,
            "AGREE": 1
          }
        },
        "HangUpReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "sceneId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "HangUpRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "code": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "CallOverNotify": {
          "fields": {
            "Caller": {
              "type": "int64",
              "id": 1
            },
            "Callee": {
              "type": "int64",
              "id": 2
            },
            "CallerTotalFee": {
              "type": "int64",
              "id": 3
            },
            "CalleeTotalEarn": {
              "type": "int64",
              "id": 4
            },
            "CallTime": {
              "type": "int64",
              "id": 5
            },
            "CallOverResion": {
              "type": "CALL_OVER_RESION",
              "id": 6
            }
          }
        },
        "CallSceneStateChangeNotify": {
          "fields": {
            "Caller": {
              "type": "int64",
              "id": 1
            },
            "Callee": {
              "type": "int64",
              "id": 2
            },
            "YXChatId": {
              "type": "int64",
              "id": 3
            },
            "OldState": {
              "type": "CALL_SCENE_STATE",
              "id": 4
            },
            "NewState": {
              "type": "CALL_SCENE_STATE",
              "id": 5
            }
          }
        },
        "SceneRecoverNotify": {
          "fields": {
            "Caller": {
              "type": "int64",
              "id": 1
            },
            "Callee": {
              "type": "int64",
              "id": 2
            },
            "SceneBeginTime": {
              "type": "int64",
              "id": 3
            },
            "OnLineBeginTime": {
              "type": "int64",
              "id": 4
            },
            "YXChatId": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "WealthChangeNotify": {
          "fields": {
            "WealthType": {
              "type": "WealthType",
              "id": 1
            },
            "Change": {
              "type": "int64",
              "id": 2
            },
            "Leave": {
              "type": "int64",
              "id": 3
            },
            "Reason": {
              "type": "WealthChangeReason",
              "id": 4
            }
          }
        },
        "WealthType": {
          "values": {
            "Unknown": 0,
            "Balance": 1,
            "YeCoin": 2
          }
        },
        "WealthChangeReason": {
          "values": {
            "CallFee": 0,
            "EarnCallFee": 1
          }
        }
      }
    },
    "pb_msg_chart": {
      "nested": {
        "PersonalGift": {
          "fields": {
            "gift": {
              "type": "pb_pub.Gift",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_gate": {
      "nested": {
        "LOGIN_TOCKEN_TYPE": {
          "values": {
            "LOGIN_TOCKEN_TYPE_JAVA": 0,
            "LOGIN_TOCKEN_TYPE_IM": 1,
            "LOGIN_TOCKEN_TYPE_UNI_USER": 2
          }
        },
        "LoginReq": {
          "fields": {
            "token": {
              "type": "string",
              "id": 2
            },
            "tokenType": {
              "type": "LOGIN_TOCKEN_TYPE",
              "id": 3
            },
            "gateAddrNew": {
              "type": "string",
              "id": 4
            },
            "clientInfo": {
              "type": "ClientInfo",
              "id": 6
            }
          }
        },
        "ThirdLoginReq": {
          "fields": {
            "AppId": {
              "type": "string",
              "id": 1
            },
            "AppSecret": {
              "type": "string",
              "id": 2
            },
            "AppUserId": {
              "type": "int64",
              "id": 3
            },
            "token": {
              "type": "string",
              "id": 4
            },
            "tokenType": {
              "type": "LOGIN_TOCKEN_TYPE",
              "id": 5
            },
            "gateAddrNew": {
              "type": "string",
              "id": 6
            },
            "IMSdkVersion": {
              "type": "int32",
              "id": 7
            },
            "clientInfo": {
              "type": "ClientInfo",
              "id": 8
            }
          }
        },
        "ClientInfo": {
          "fields": {
            "modelType": {
              "type": "pb_pub.MODEL_TYPE",
              "id": 1
            },
            "packageName": {
              "type": "string",
              "id": 2
            },
            "systemVersion": {
              "type": "string",
              "id": 3
            },
            "phoneModels": {
              "type": "string",
              "id": 4
            },
            "appVersion": {
              "type": "string",
              "id": 5
            },
            "systemName": {
              "type": "string",
              "id": 6
            },
            "identifier": {
              "type": "string",
              "id": 7
            },
            "xChannel": {
              "type": "string",
              "id": 8
            }
          }
        },
        "LoginRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 2
            },
            "reconnectToken": {
              "type": "string",
              "id": 3
            },
            "gateAddrOld": {
              "type": "string",
              "id": 4
            },
            "msgSn": {
              "type": "int64",
              "id": 5
            },
            "appUserId": {
              "type": "int64",
              "id": 6
            },
            "appId": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "ChatText": {
          "fields": {
            "aimUserId": {
              "type": "int64",
              "id": 2
            },
            "chatType": {
              "type": "pb_pub.TextChatType",
              "id": 3
            },
            "data": {
              "type": "string",
              "id": 4
            },
            "text": {
              "type": "string",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            }
          }
        },
        "ChatMessage": {
          "fields": {
            "businessType": {
              "type": "BUSINESS_TYPE",
              "id": 1
            },
            "text": {
              "type": "ChatText",
              "id": 2
            }
          }
        },
        "BUSINESS_TYPE": {
          "values": {
            "UNKNOWN": 0,
            "SECRET_ROOM": 1
          }
        },
        "KickOffUser": {
          "fields": {
            "optUId": {
              "type": "int64",
              "id": 1
            },
            "aimUId": {
              "type": "int64",
              "id": 2
            },
            "reason": {
              "type": "int32",
              "id": 3
            },
            "desc": {
              "type": "string",
              "id": 4
            }
          }
        }
      }
    },
    "pb_msg_live_room": {
      "nested": {
        "UCGameInfo": {
          "fields": {
            "judge": {
              "type": "UCGamePlayer",
              "id": 1
            },
            "undercoverSide": {
              "type": "UCGameSide",
              "id": 2
            },
            "populaceSide": {
              "type": "UCGameSide",
              "id": 3
            }
          }
        },
        "UCGameSide": {
          "fields": {
            "word": {
              "type": "string",
              "id": 1
            },
            "players": {
              "rule": "repeated",
              "type": "UCGamePlayer",
              "id": 2
            }
          }
        },
        "UCGamePlayer": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "headImage": {
              "type": "string",
              "id": 3
            }
          }
        },
        "UCGameStartReq": {
          "fields": {
            "undercoverWord": {
              "type": "string",
              "id": 1
            },
            "populaceWord": {
              "type": "string",
              "id": 2
            },
            "undercoverCount": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "UCGameStartRsp": {
          "fields": {
            "gameInfo": {
              "type": "UCGameInfo",
              "id": 1
            }
          }
        },
        "UCGamePlayerInfo": {
          "fields": {
            "word": {
              "type": "string",
              "id": 1
            }
          }
        },
        "UCGameStartNotify": {
          "fields": {
            "undercoverCount": {
              "type": "int32",
              "id": 1
            },
            "populaceCount": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "UCGameOverNotify": {
          "fields": {
            "gameInfo": {
              "type": "UCGameInfo",
              "id": 1
            },
            "winner": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "UCGamePlayers": {
          "fields": {
            "players": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "LiveStartReq": {
          "fields": {
            "roomType": {
              "type": "RoomType",
              "id": 1
            },
            "roomName": {
              "type": "string",
              "id": 2
            }
          }
        },
        "LiveStartRsp": {
          "fields": {
            "streamType": {
              "type": "int32",
              "id": 1
            },
            "pushStreamAddress": {
              "type": "string",
              "id": 2
            },
            "liveMode": {
              "type": "int32",
              "id": 3
            },
            "coverImage": {
              "type": "string",
              "id": 4
            },
            "unPassReason": {
              "type": "string",
              "id": 5
            },
            "coverStatus": {
              "type": "string",
              "id": 6
            },
            "canLiveStatus": {
              "type": "bool",
              "id": 7
            },
            "message": {
              "type": "string",
              "id": 8
            },
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 9
            }
          }
        },
        "LiveStopReq": {
          "fields": {}
        },
        "LiveStopRsp": {
          "fields": {}
        },
        "LiveStartSuccessReq": {
          "fields": {}
        },
        "LiveStartSuccessRsp": {
          "fields": {}
        },
        "LiveStartNotify": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            },
            "title": {
              "type": "string",
              "id": 3
            },
            "type": {
              "type": "int32",
              "id": 4
            },
            "nickName": {
              "type": "string",
              "id": 5
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 6
            }
          }
        },
        "AudienceEnterLiveReq": {
          "fields": {}
        },
        "UserEnterLiveRsp": {
          "fields": {
            "streamType": {
              "type": "int32",
              "id": 1
            },
            "wordUpdateTime": {
              "type": "string",
              "id": 2
            }
          }
        },
        "LiveUserPropsNotify": {
          "fields": {
            "MountInfo": {
              "type": "string",
              "id": 1
            },
            "FansInfo": {
              "type": "string",
              "id": 2
            }
          }
        },
        "RoomStatus": {
          "values": {
            "NORMAL": 0,
            "LIVE_STOP": 1
          }
        },
        "RoomStatusNotify": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "roomStatus": {
              "type": "RoomStatus",
              "id": 2
            }
          }
        },
        "YXCommMsgNode": {
          "fields": {
            "yxMsg": {
              "type": "pb_pub.YXCommMsg",
              "id": 1
            },
            "time": {
              "type": "int64",
              "id": 2
            },
            "sn": {
              "type": "int64",
              "id": 4
            },
            "srcUserId": {
              "type": "int64",
              "id": 5
            },
            "groupId": {
              "type": "int64",
              "id": 6
            }
          }
        },
        "HistoryMsg": {
          "fields": {
            "pbData": {
              "type": "bytes",
              "id": 1
            },
            "pbName": {
              "type": "string",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "msgSn": {
              "type": "int64",
              "id": 4
            },
            "srcId": {
              "type": "int64",
              "id": 5
            },
            "groupId": {
              "type": "int64",
              "id": 6
            },
            "msgType": {
              "type": "pb_pub.MessageType",
              "id": 7
            }
          }
        },
        "HistoryYXCommMsgReq": {
          "fields": {}
        },
        "HistoryYXCommMsgRsp": {
          "fields": {
            "msgNum": {
              "type": "int64",
              "id": 1
            },
            "msgList": {
              "rule": "repeated",
              "type": "YXCommMsgNode",
              "id": 2
            },
            "latestSn": {
              "type": "int64",
              "id": 3
            },
            "historyMsgs": {
              "rule": "repeated",
              "type": "HistoryMsg",
              "id": 4
            },
            "latestMsgSn": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "ReloadYXCommMsgReq": {
          "fields": {
            "sn": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ReloadYXCommMsgRsp": {
          "fields": {
            "msgNum": {
              "type": "int64",
              "id": 1
            },
            "msgList": {
              "rule": "repeated",
              "type": "YXCommMsgNode",
              "id": 2
            },
            "latestSn": {
              "type": "int64",
              "id": 3
            },
            "historyMsgs": {
              "rule": "repeated",
              "type": "HistoryMsg",
              "id": 4
            },
            "latestMsgSn": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "PKScoreNotify": {
          "fields": {
            "pkScore": {
              "keyType": "int64",
              "type": "int64",
              "id": 1
            }
          }
        },
        "PKPROPNotify": {
          "fields": {
            "giftId": {
              "type": "int64",
              "id": 1
            },
            "giftImage": {
              "type": "string",
              "id": 2
            },
            "giftName": {
              "type": "string",
              "id": 3
            },
            "actorId": {
              "type": "int64",
              "id": 4
            },
            "targetName": {
              "type": "string",
              "id": 5
            },
            "userId": {
              "type": "int64",
              "id": 6
            },
            "headImg": {
              "type": "string",
              "id": 7
            },
            "senderName": {
              "type": "string",
              "id": 8
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 9
            },
            "startTime": {
              "type": "int64",
              "id": 10
            },
            "endTime": {
              "type": "int64",
              "id": 11
            },
            "curTime": {
              "type": "int64",
              "id": 12
            },
            "giftNumber": {
              "type": "int64",
              "id": 13
            }
          }
        },
        "LiveRoomGift": {
          "fields": {
            "gift": {
              "type": "pb_pub.Gift",
              "id": 1
            }
          }
        },
        "HostMode": {
          "fields": {
            "isHostMode": {
              "type": "bool",
              "id": 1
            },
            "isCurrentHostMode": {
              "type": "bool",
              "id": 2
            }
          }
        },
        "RoomInfo": {
          "fields": {
            "roomId": {
              "type": "int64",
              "id": 1
            },
            "onLineNum": {
              "type": "int64",
              "id": 2
            },
            "roomStatus": {
              "type": "int32",
              "id": 3
            },
            "switchToBack": {
              "type": "bool",
              "id": 22
            },
            "actorId": {
              "type": "int64",
              "id": 4
            },
            "imId": {
              "type": "string",
              "id": 5
            },
            "roomNotice": {
              "type": "string",
              "id": 6
            },
            "actorLevel": {
              "type": "string",
              "id": 7
            },
            "actorGrade": {
              "type": "int32",
              "id": 8
            },
            "actorCurrentExperience": {
              "type": "int64",
              "id": 9
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 10
            },
            "headPendantUrl": {
              "type": "string",
              "id": 11
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 12
            },
            "recentReceiveCoins": {
              "type": "int64",
              "id": 13
            },
            "nickName": {
              "type": "string",
              "id": 14
            },
            "fansCardName": {
              "type": "string",
              "id": 15
            },
            "broadcastLimitCoins": {
              "type": "int64",
              "id": 20
            },
            "updateTime": {
              "type": "int64",
              "id": 21
            },
            "roomType": {
              "type": "RoomType",
              "id": 23
            },
            "exp": {
              "keyType": "string",
              "type": "bytes",
              "id": 24
            },
            "pullStreamAddress": {
              "type": "string",
              "id": 25
            },
            "roomName": {
              "type": "string",
              "id": 26
            },
            "backgroundImageUrl": {
              "type": "string",
              "id": 27
            },
            "rank": {
              "type": "int64",
              "id": 41
            },
            "victoryTimes": {
              "type": "int64",
              "id": 42
            },
            "dynamicBackgroundImage": {
              "type": "string",
              "id": 43
            },
            "isQualifiedPkTournament": {
              "type": "bool",
              "id": 45
            },
            "pkTournamentBeginTime": {
              "type": "string",
              "id": 46
            },
            "pkTounamentTip": {
              "type": "string",
              "id": 47
            }
          }
        },
        "UserProp": {
          "fields": {
            "levelPrivilege": {
              "type": "bool",
              "id": 1
            },
            "nobleGrade": {
              "type": "int32",
              "id": 2
            },
            "username": {
              "type": "string",
              "id": 3
            },
            "userId": {
              "type": "int64",
              "id": 4
            },
            "userLevel": {
              "type": "int32",
              "id": 5
            },
            "medalUrl": {
              "type": "string",
              "id": 6
            },
            "guardType": {
              "type": "int32",
              "id": 7
            },
            "userDefineEquipName": {
              "type": "string",
              "id": 8
            },
            "role": {
              "type": "int32",
              "id": 9
            },
            "managerSubType": {
              "type": "int32",
              "id": 10
            },
            "fansCardStatus": {
              "type": "int32",
              "id": 11
            },
            "fansCardLevel": {
              "type": "int32",
              "id": 12
            },
            "corpType": {
              "type": "int32",
              "id": 13
            },
            "headImg": {
              "type": "string",
              "id": 14
            },
            "nobilityMedalUrl": {
              "type": "string",
              "id": 15
            },
            "guardMedalType": {
              "type": "int32",
              "id": 16
            }
          }
        },
        "EnterRoomReadyReq": {
          "fields": {}
        },
        "EnterRoomReadyRsp": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "userStatus": {
              "type": "int64",
              "id": 2
            },
            "horseEffectUrl": {
              "type": "string",
              "id": 3
            },
            "concrenRealtion": {
              "type": "bool",
              "id": 4
            },
            "userCurrentExperience": {
              "type": "int64",
              "id": 5
            },
            "horseEffectName": {
              "type": "string",
              "id": 6
            },
            "mAnchorRole": {
              "type": "MAnchorRole",
              "id": 7
            }
          }
        },
        "AudienceEnterRoom": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "horseEffectUrl": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "horseEffectName": {
              "type": "string",
              "id": 4
            }
          }
        },
        "RoomBarrage": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            },
            "type": {
              "type": "int32",
              "id": 3
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 4
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 5
            }
          }
        },
        "RoomNormal": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            },
            "targetUserName": {
              "rule": "repeated",
              "type": "string",
              "id": 3
            },
            "targetUserId": {
              "rule": "repeated",
              "type": "int64",
              "id": 4
            }
          }
        },
        "RoomAction": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "type": {
              "type": "ACTION_TYPE",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            }
          }
        },
        "ACTION_TYPE": {
          "values": {
            "UNKNOWN": 0,
            "GIFT": 1,
            "FOLLOW": 2,
            "SHARE": 3,
            "LIGHT": 4,
            "UPGRADE": 5,
            "FISH": 9,
            "REENTER": 10
          }
        },
        "UpdatedUserInfo": {
          "fields": {
            "nobleGrade": {
              "type": "int32",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "userLevel": {
              "type": "int32",
              "id": 3
            },
            "medalUrl": {
              "type": "string",
              "id": 4
            },
            "guardType": {
              "type": "int32",
              "id": 5
            },
            "userDefineEquipName": {
              "type": "string",
              "id": 6
            },
            "role": {
              "type": "int32",
              "id": 7
            },
            "fansCardStatus": {
              "type": "int32",
              "id": 8
            },
            "fansCardLevel": {
              "type": "int32",
              "id": 9
            },
            "corpType": {
              "type": "int32",
              "id": 10
            },
            "guardMedalType": {
              "type": "int32",
              "id": 11
            }
          }
        },
        "UpdatedRoomInfo": {
          "fields": {
            "switchToBack": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "RoomType": {
          "values": {
            "Unknow": 0,
            "Video": 1,
            "Audio": 2,
            "Party": 3
          }
        },
        "MAnchorRole": {
          "values": {
            "Audience": 0,
            "Anchor": 1,
            "Owner": 2,
            "Manager": 3
          }
        },
        "MAnchorData": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "videoState": {
              "type": "int32",
              "id": 2
            },
            "audioState": {
              "type": "int32",
              "id": 3
            },
            "nickName": {
              "type": "string",
              "id": 4
            },
            "avatar": {
              "type": "string",
              "id": 5
            },
            "score": {
              "type": "int64",
              "id": 6
            },
            "mAnchorRole": {
              "type": "MAnchorRole",
              "id": 7
            },
            "pullStreamUrl": {
              "type": "string",
              "id": 8
            },
            "forbidState": {
              "type": "int32",
              "id": 9
            },
            "gender": {
              "type": "string",
              "id": 10
            },
            "authAccess": {
              "type": "string",
              "id": 11
            }
          }
        },
        "MWaitUser": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "nickName": {
              "type": "string",
              "id": 2
            },
            "avatar": {
              "type": "string",
              "id": 3
            },
            "level": {
              "type": "int32",
              "id": 4
            },
            "loc": {
              "type": "int32",
              "id": 5
            }
          }
        },
        "MAnchorScoreChangeNotify": {
          "fields": {
            "score": {
              "type": "int64",
              "id": 1
            },
            "actorId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "BillboardChangeNotify": {
          "fields": {
            "users": {
              "rule": "repeated",
              "type": "Billboard",
              "id": 1
            }
          }
        },
        "Billboard": {
          "fields": {
            "actorGrade": {
              "type": "int32",
              "id": 1
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "isLiving": {
              "type": "bool",
              "id": 4
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 5
            },
            "nickName": {
              "type": "string",
              "id": 6
            },
            "score": {
              "type": "int64",
              "id": 7
            },
            "userId": {
              "type": "int64",
              "id": 8
            },
            "userLevel": {
              "type": "string",
              "id": 9
            }
          }
        },
        "MAnchorLocChangeNotify": {
          "fields": {
            "chair": {
              "type": "MAnchorData",
              "id": 1
            },
            "bentch": {
              "keyType": "int32",
              "type": "MAnchorData",
              "id": 2
            }
          }
        },
        "WaitBenchListChangeNotify": {
          "fields": {
            "waitQue": {
              "rule": "repeated",
              "type": "MWaitUser",
              "id": 1
            }
          }
        },
        "OffAnchorReq": {
          "fields": {}
        },
        "OffAnchorRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "OnChairReq": {
          "fields": {}
        },
        "OnChairRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            }
          }
        },
        "OnAnchorReq": {
          "fields": {
            "loc": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "OnAnchorRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            }
          }
        },
        "ChairManPutOnAnchorReq": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChairManPutOnAnchorRsp": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            },
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "ChairManPutOnAnchorNotify": {
          "fields": {
            "anchorLoc": {
              "type": "int32",
              "id": 1
            },
            "optId": {
              "type": "int64",
              "id": 2
            },
            "aimId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ChairManInviteAudienceReq": {
          "fields": {
            "inviteeId": {
              "type": "int64",
              "id": 1
            },
            "inviterId": {
              "type": "int64",
              "id": 2
            },
            "roomId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ChairManInviteAudienceRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "Enter3TChannelResultNotifyToServer": {
          "fields": {
            "Result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "AnswerType": {
          "values": {
            "Agree": 0,
            "Refuse": 1
          }
        },
        "ChairManInviteAudienceAnswerReq": {
          "fields": {
            "inviteeId": {
              "type": "int64",
              "id": 1
            },
            "inviterId": {
              "type": "int64",
              "id": 2
            },
            "answerType": {
              "type": "AnswerType",
              "id": 3
            }
          }
        },
        "ChairManInviteAudienceAnswerRsp": {
          "fields": {
            "anchorLoc": {
              "type": "int32",
              "id": 1
            },
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "ChairManOffAnchorReq": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChairManOffAnchorRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "ChairManOffAnchorNotify": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "RecoverLiveRoomReq": {
          "fields": {}
        },
        "RecoverLiveRoomRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "VideoStateChangeNotify": {
          "fields": {
            "state": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "AudioStateChangeNotify": {
          "fields": {
            "state": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "RoomMsgExpression": {
          "fields": {
            "expressionId": {
              "type": "int32",
              "id": 1
            },
            "loc": {
              "type": "int32",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            }
          }
        },
        "KickUserOutNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ForbidStateChangeNotify": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            },
            "state": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "LiveGiftNotify": {
          "fields": {
            "sender": {
              "type": "UserProp",
              "id": 1
            },
            "roomType": {
              "type": "RoomType",
              "id": 2
            },
            "sendType": {
              "type": "SendType",
              "id": 3
            },
            "receivers": {
              "rule": "repeated",
              "type": "Receiver",
              "id": 4
            },
            "gift": {
              "type": "LiveGift",
              "id": 5
            }
          },
          "nested": {
            "SendType": {
              "values": {
                "SINGLE": 0,
                "MULTI": 1
              }
            }
          }
        },
        "Receiver": {
          "fields": {
            "actorId": {
              "type": "int64",
              "id": 1
            },
            "actorName": {
              "type": "string",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 4
            }
          }
        },
        "LiveGift": {
          "fields": {
            "giftId": {
              "type": "int64",
              "id": 1
            },
            "giftNumber": {
              "type": "int64",
              "id": 2
            },
            "giftType": {
              "type": "int32",
              "id": 3
            },
            "giftConfLastUpdateTime": {
              "type": "int64",
              "id": 4
            },
            "batteryType": {
              "type": "int32",
              "id": 5
            },
            "batteryTypeList": {
              "rule": "repeated",
              "type": "int64",
              "id": 6
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 7
            }
          }
        },
        "MultiAnchorScoreChangeNotify": {
          "fields": {
            "anchors": {
              "rule": "repeated",
              "type": "Anchor",
              "id": 1
            }
          },
          "nested": {
            "Anchor": {
              "fields": {
                "score": {
                  "type": "int64",
                  "id": 1
                },
                "actorId": {
                  "type": "int64",
                  "id": 2
                }
              }
            }
          }
        },
        "InvestorChangeNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "nickName": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 4
            }
          }
        },
        "BackgroundChangeNotify": {
          "fields": {
            "dynamicBackgroundImage": {
              "type": "string",
              "id": 1
            }
          }
        },
        "Chatter": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "videoState": {
              "type": "int32",
              "id": 4
            },
            "audioState": {
              "type": "int32",
              "id": 5
            },
            "leaveState": {
              "type": "int64",
              "id": 6
            }
          }
        },
        "ChatRoomInfo": {
          "fields": {
            "caller": {
              "type": "Chatter",
              "id": 1
            },
            "callee": {
              "type": "Chatter",
              "id": 2
            },
            "interval": {
              "type": "int64",
              "id": 3
            },
            "price": {
              "type": "int64",
              "id": 4
            },
            "deadline": {
              "type": "int64",
              "id": 5
            },
            "autoRenewal": {
              "type": "bool",
              "id": 6
            },
            "oneMore": {
              "type": "bool",
              "id": 7
            },
            "channelId": {
              "type": "string",
              "id": 8
            }
          }
        },
        "UpdateChatPrice": {
          "fields": {
            "interval": {
              "type": "int64",
              "id": 1
            },
            "price": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "ChatApplyReq": {
          "fields": {
            "calleeId": {
              "type": "int64",
              "id": 1
            },
            "callerId": {
              "type": "int64",
              "id": 2
            },
            "callerName": {
              "type": "string",
              "id": 3
            },
            "callerHeaderImage": {
              "type": "string",
              "id": 4
            },
            "inviteTime": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "ChatApplyRsp": {
          "fields": {
            "errCode": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            },
            "callerId": {
              "type": "int64",
              "id": 3
            },
            "calleeId": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "ChatCancelReq": {
          "fields": {
            "calleeId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChatCancelRsp": {
          "fields": {
            "errCode": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            },
            "callerId": {
              "type": "int64",
              "id": 3
            },
            "calleeId": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "ChatAnswerReq": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "answer": {
              "type": "CHAT_ANSWER",
              "id": 2
            }
          }
        },
        "CHAT_ANSWER": {
          "values": {
            "REFUSE": 0,
            "AGREE": 1
          }
        },
        "ChatAnswerRsp": {
          "fields": {
            "errCode": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            },
            "callerId": {
              "type": "int64",
              "id": 3
            },
            "calleeId": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "ChatCloseReq": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "ChatCloseRsp": {
          "fields": {}
        },
        "SetMicrophoneState": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "state": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "SetLeaveState": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "state": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "SetOneMore": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "state": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "SetAutoRenewal": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "state": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "ChatCountChangeNotify": {
          "fields": {
            "count": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "FetchChatRoomsReq": {
          "fields": {}
        },
        "FetchChatRoomsRsp": {
          "fields": {
            "rooms": {
              "rule": "repeated",
              "type": "ChatRoomSummery",
              "id": 1
            }
          }
        },
        "ChatRoomSummery": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "callerUsername": {
              "type": "string",
              "id": 3
            },
            "calleeUsername": {
              "type": "string",
              "id": 4
            },
            "callerHeadimage": {
              "type": "string",
              "id": 5
            },
            "calleeheadimage": {
              "type": "string",
              "id": 6
            }
          }
        },
        "ChatStartNotify": {
          "fields": {
            "info": {
              "type": "ChatRoomInfo",
              "id": 1
            }
          }
        },
        "ChatCreateNotify": {
          "fields": {
            "room": {
              "type": "ChatRoomSummery",
              "id": 1
            }
          }
        },
        "DeadlineChangeNotify": {
          "fields": {
            "deadline": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChatCloseNotify": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "closeType": {
              "type": "CHAT_CLOSE_TYPE",
              "id": 3
            }
          }
        },
        "CHAT_CLOSE_TYPE": {
          "values": {
            "TIMEOUT": 0,
            "MANUAL": 1,
            "BY_HOST": 2
          }
        },
        "BalanceChangeNotify": {
          "fields": {
            "coinBalance": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "HostCloseSoonNotify": {
          "fields": {}
        },
        "SecretGift": {
          "fields": {
            "senderId": {
              "type": "int64",
              "id": 1
            },
            "receiverId": {
              "type": "int64",
              "id": 2
            },
            "gift": {
              "type": "LiveGift",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_lucky": {
      "nested": {
        "LuckyReq": {
          "fields": {
            "betChips": {
              "type": "int64",
              "id": 1
            },
            "betCount": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "LuckyBean": {
          "fields": {
            "No": {
              "type": "int64",
              "id": 1
            },
            "BetChips": {
              "type": "int64",
              "id": 2
            },
            "Chance": {
              "type": "int64",
              "id": 3
            },
            "Odds": {
              "type": "int64",
              "id": 4
            },
            "WinChips": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "LuckyRsp": {
          "fields": {
            "betChips": {
              "type": "int64",
              "id": 1
            },
            "betCount": {
              "type": "int64",
              "id": 2
            },
            "luckyTotalCount": {
              "type": "int64",
              "id": 3
            },
            "luckyTotalChips": {
              "type": "int64",
              "id": 4
            },
            "luckyBean": {
              "rule": "repeated",
              "type": "LuckyBean",
              "id": 5
            }
          }
        }
      }
    },
    "pb_msg_msgAnalyze": {
      "nested": {
        "ReadMsgHistoryReq": {
          "fields": {
            "useridA": {
              "type": "int64",
              "id": 1
            },
            "useridB": {
              "type": "int64",
              "id": 2
            },
            "num": {
              "type": "int64",
              "id": 3
            },
            "time": {
              "type": "int64",
              "id": 4
            },
            "sn": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "ReadMsgHistoryRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "msgHistory": {
              "rule": "repeated",
              "type": "MsgHistory",
              "id": 2
            }
          }
        },
        "MsgHistory": {
          "fields": {
            "pbCommData": {
              "type": "pb_pub.PBCommData",
              "id": 1
            },
            "pbName": {
              "type": "string",
              "id": 2
            },
            "pbData": {
              "type": "bytes",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_msgPusher": {
      "nested": {
        "MsgPushToAimUser": {
          "fields": {
            "srcUser": {
              "type": "int64",
              "id": 1
            },
            "appList": {
              "rule": "repeated",
              "type": "AppData",
              "id": 2
            },
            "params": {
              "type": "Params",
              "id": 3
            },
            "title": {
              "type": "string",
              "id": 4
            },
            "msg": {
              "type": "string",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            },
            "time": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "AppData": {
          "fields": {
            "appName": {
              "type": "string",
              "id": 1
            },
            "userList": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            }
          }
        },
        "Params": {
          "fields": {
            "type": {
              "type": "int32",
              "id": 1
            },
            "roomId": {
              "type": "int64",
              "id": 2
            },
            "nickname": {
              "type": "string",
              "id": 3
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 4
            },
            "url": {
              "type": "string",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            }
          }
        },
        "MsgPushToAllUser": {
          "fields": {
            "srcUser": {
              "type": "int64",
              "id": 1
            },
            "params": {
              "type": "Params",
              "id": 2
            },
            "appName": {
              "type": "string",
              "id": 3
            },
            "title": {
              "type": "string",
              "id": 4
            },
            "msg": {
              "type": "string",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            }
          }
        },
        "PushReceiptReq": {
          "fields": {
            "pushId": {
              "type": "int64",
              "id": 1
            },
            "system": {
              "type": "string",
              "id": 2
            },
            "isReceive": {
              "type": "int32",
              "id": 3
            },
            "isOpen": {
              "type": "int32",
              "id": 4
            }
          }
        }
      }
    },
    "pb_msg_msgSender": {
      "nested": {
        "MsgSenderNotify": {
          "fields": {
            "srcId": {
              "type": "int64",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            },
            "title": {
              "type": "string",
              "id": 3
            },
            "type": {
              "type": "int32",
              "id": 4
            },
            "nickName": {
              "type": "string",
              "id": 5
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 6
            }
          }
        }
      }
    },
    "pb_msg_offlineMsg": {
      "nested": {
        "ReadOfflineMsgReq": {
          "fields": {
            "userid": {
              "type": "int64",
              "id": 1
            },
            "num": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ReadOfflineMsgRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "msgNum": {
              "type": "int64",
              "id": 2
            },
            "msgList": {
              "rule": "repeated",
              "type": "MsgList",
              "id": 3
            }
          },
          "nested": {
            "MsgList": {
              "fields": {
                "pbName": {
                  "type": "string",
                  "id": 1
                },
                "pbData": {
                  "type": "bytes",
                  "id": 2
                },
                "time": {
                  "type": "int64",
                  "id": 3
                },
                "sn": {
                  "type": "int64",
                  "id": 4
                },
                "srcUserid": {
                  "type": "int64",
                  "id": 5
                },
                "aimUserid": {
                  "type": "int64",
                  "id": 6
                }
              }
            }
          }
        }
      }
    },
    "pb_msg_pk_room": {
      "nested": {
        "PKEnqueueReq": {
          "fields": {
            "pkType": {
              "type": "PK_TYPE",
              "id": 1
            },
            "rank": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "PKEnqueueRsp": {
          "fields": {}
        },
        "PKDequeueReq": {
          "fields": {
            "pkType": {
              "type": "PK_TYPE",
              "id": 1
            }
          }
        },
        "PKDequeueRsp": {
          "fields": {}
        },
        "PKAnswerReq": {
          "fields": {
            "answer": {
              "type": "ANSWER",
              "id": 1
            }
          }
        },
        "PKAnswerRsp": {
          "fields": {}
        },
        "PKEscapeReq": {
          "fields": {}
        },
        "PKEscapeRsp": {
          "fields": {}
        },
        "PKInviteReq": {
          "fields": {
            "pkTopic": {
              "type": "string",
              "id": 1
            }
          }
        },
        "PKInviteRsp": {
          "fields": {}
        },
        "PKInviteStopReq": {
          "fields": {}
        },
        "PKInviteStopRsp": {
          "fields": {}
        },
        "ANSWER": {
          "values": {
            "REFUSE": 0,
            "AGREE": 1
          }
        },
        "PK_TYPE": {
          "values": {
            "RANDOM": 0,
            "RANK": 1,
            "INVITE": 2,
            "GRAND_RANK": 3
          }
        },
        "END_TYPE": {
          "values": {
            "NATURAL": 0,
            "MANUAL": 1
          }
        },
        "PK_STATUS": {
          "values": {
            "IDLING": 0,
            "QUEUING": 1,
            "RINGING": 2,
            "WAITING": 3,
            "COMPETING": 4,
            "PENALIZING": 5
          }
        },
        "PKRoomInfo": {
          "fields": {
            "pkStatus": {
              "type": "PK_STATUS",
              "id": 1
            },
            "endTime": {
              "type": "int64",
              "id": 2
            },
            "pkType": {
              "type": "PK_TYPE",
              "id": 3
            },
            "pkTopic": {
              "type": "string",
              "id": 4
            },
            "pkScore": {
              "type": "int64",
              "id": 5
            },
            "peer": {
              "type": "PKUser",
              "id": 6
            },
            "endType": {
              "type": "END_TYPE",
              "id": 7
            },
            "winnerId": {
              "type": "int64",
              "id": 8
            },
            "mvp": {
              "type": "MVP",
              "id": 9
            }
          }
        },
        "PKUser": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "rank": {
              "type": "int64",
              "id": 4
            },
            "victoryTimes": {
              "type": "int64",
              "id": 5
            },
            "pullStreamAddress": {
              "type": "string",
              "id": 6
            },
            "pkScore": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "PKStatusChangeNotify": {
          "fields": {
            "pkStatus": {
              "type": "PK_STATUS",
              "id": 1
            }
          }
        },
        "PKMatchedNotify": {
          "fields": {
            "endTime": {
              "type": "int64",
              "id": 1
            },
            "pkType": {
              "type": "PK_TYPE",
              "id": 2
            },
            "pkTopic": {
              "type": "string",
              "id": 3
            },
            "peerId": {
              "type": "int64",
              "id": 4
            },
            "peerUsername": {
              "type": "string",
              "id": 5
            },
            "peerHeaderImageOriginal": {
              "type": "string",
              "id": 6
            },
            "peerRank": {
              "type": "int64",
              "id": 7
            },
            "peerVictoryTimes": {
              "type": "int64",
              "id": 8
            },
            "peerPullStreamAddress": {
              "type": "string",
              "id": 9
            }
          }
        },
        "PKPeerRefusedNotify": {
          "fields": {}
        },
        "PKStartNotify": {
          "fields": {
            "endTime": {
              "type": "int64",
              "id": 1
            },
            "pkType": {
              "type": "PK_TYPE",
              "id": 2
            },
            "pkTopic": {
              "type": "string",
              "id": 3
            },
            "peerId": {
              "type": "int64",
              "id": 4
            },
            "peerUsername": {
              "type": "string",
              "id": 5
            },
            "peerHeaderImageOriginal": {
              "type": "string",
              "id": 6
            },
            "peerRank": {
              "type": "int64",
              "id": 7
            },
            "peerVictoryTimes": {
              "type": "int64",
              "id": 8
            },
            "peerPullStreamAddress": {
              "type": "string",
              "id": 9
            }
          }
        },
        "PKGameOverNotify": {
          "fields": {
            "endTime": {
              "type": "int64",
              "id": 1
            },
            "endType": {
              "type": "END_TYPE",
              "id": 2
            },
            "pkScore": {
              "type": "int64",
              "id": 3
            },
            "rank": {
              "type": "int64",
              "id": 4
            },
            "victoryTimes": {
              "type": "int64",
              "id": 5
            },
            "peerPKScore": {
              "type": "int64",
              "id": 11
            },
            "peerRank": {
              "type": "int64",
              "id": 12
            },
            "peerVictoryTimes": {
              "type": "int64",
              "id": 13
            },
            "winnerId": {
              "type": "int64",
              "id": 21
            },
            "mvp": {
              "type": "MVP",
              "id": 22
            }
          }
        },
        "MVP": {
          "fields": {
            "actorGrade": {
              "type": "int32",
              "id": 1
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "isLiving": {
              "type": "bool",
              "id": 4
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 5
            },
            "nickName": {
              "type": "string",
              "id": 6
            },
            "userID": {
              "type": "int64",
              "id": 7
            },
            "userLevel": {
              "type": "string",
              "id": 8
            }
          }
        },
        "PKOverNotify": {
          "fields": {
            "pkStatus": {
              "type": "PK_STATUS",
              "id": 1
            }
          }
        },
        "PassivePKRefuseReq": {
          "fields": {
            "opponentId": {
              "type": "int64",
              "id": 1
            },
            "refuseId": {
              "type": "int64",
              "id": 2
            },
            "topic": {
              "type": "string",
              "id": 3
            }
          }
        },
        "PKSwitchPassiveReq": {
          "fields": {
            "roomId": {
              "type": "int64",
              "id": 1
            },
            "rank": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "PassivePkNotify": {
          "fields": {
            "pkType": {
              "type": "pb_msg_pk_room.PK_TYPE",
              "id": 1
            }
          }
        },
        "PKTournamentChangeNotify": {
          "fields": {
            "isQualifiedPkTournament": {
              "type": "bool",
              "id": 1
            },
            "pkTournamentBeginTime": {
              "type": "string",
              "id": 2
            },
            "pkTounamentTip": {
              "type": "string",
              "id": 3
            }
          }
        },
        "CanJoinPkTournamentReq": {
          "fields": {}
        },
        "CanJoinPkTournamentRsp": {
          "fields": {
            "isQualifiedPkTournament": {
              "type": "bool",
              "id": 1
            },
            "PkTournamentBeginTime": {
              "type": "string",
              "id": 2
            },
            "PkTounamentTip": {
              "type": "string",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_room_explain": {
      "nested": {
        "RoomExplainReq": {
          "fields": {
            "roomId": {
              "type": "int64",
              "id": 1
            },
            "timestampBegin": {
              "type": "string",
              "id": 2
            },
            "timestampEnd": {
              "type": "string",
              "id": 3
            }
          }
        },
        "RoomExplainRsp": {
          "fields": {
            "msgCount": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "SrcUserExplainReq": {
          "fields": {
            "srcId": {
              "type": "int64",
              "id": 1
            },
            "timestampBegin": {
              "type": "string",
              "id": 2
            },
            "timestampEnd": {
              "type": "string",
              "id": 3
            }
          }
        },
        "SrcUserExplainRsp": {
          "fields": {
            "msgCount": {
              "type": "int64",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_ttk_game": {
      "nested": {
        "PATTERN": {
          "values": {
            "GENERAL_0": 0,
            "GENERAL_1": 1,
            "GENERAL_2": 2,
            "GENERAL_3": 3,
            "GENERAL_4": 4,
            "GENERAL_5": 5,
            "GENERAL_6": 6,
            "GENERAL_7": 7,
            "GENERAL_8": 8,
            "GENERAL_9": 9,
            "GENERAL_10": 10,
            "SILVER_GENERAL": 11,
            "BOMB": 12,
            "TIGER": 13,
            "SMALL": 14
          }
        },
        "SUIT": {
          "values": {
            "DIAMOND": 0,
            "CLUB": 1,
            "HEART": 2,
            "SPADE": 3
          }
        },
        "KINGDOM": {
          "values": {
            "WEI": 0,
            "SHU": 1,
            "WU": 2,
            "QUN": 3
          }
        },
        "Card": {
          "fields": {
            "number": {
              "type": "int32",
              "id": 1
            },
            "suit": {
              "type": "SUIT",
              "id": 2
            },
            "value": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "Hand": {
          "fields": {
            "pattern": {
              "type": "PATTERN",
              "id": 1
            },
            "cards": {
              "rule": "repeated",
              "type": "Card",
              "id": 2
            }
          }
        },
        "Side": {
          "fields": {
            "hand": {
              "type": "Hand",
              "id": 1
            },
            "win": {
              "type": "bool",
              "id": 2
            },
            "odds": {
              "type": "int32",
              "id": 3
            },
            "amount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "TTKGameInfo": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "state": {
              "type": "int32",
              "id": 2
            },
            "endTime": {
              "type": "int64",
              "id": 3
            },
            "hand": {
              "type": "Hand",
              "id": 4
            },
            "sides": {
              "rule": "repeated",
              "type": "Side",
              "id": 5
            }
          }
        },
        "TTKPlayerInfo": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "bets": {
              "rule": "repeated",
              "type": "int64",
              "id": 3
            },
            "coinBalance": {
              "type": "int64",
              "id": 4
            },
            "cocoBalance": {
              "type": "int64",
              "id": 5
            },
            "winLose": {
              "type": "int64",
              "id": 6
            }
          }
        },
        "TTKWinnerBoard": {
          "fields": {
            "winners": {
              "rule": "repeated",
              "type": "TTKPlayerInfo",
              "id": 2
            }
          }
        },
        "BetStartNotify": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "endTime": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "SideChangeNotify": {
          "fields": {
            "sides": {
              "rule": "repeated",
              "type": "Side",
              "id": 1
            }
          }
        },
        "BetReq": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "kingdom": {
              "type": "KINGDOM",
              "id": 3
            },
            "amount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "BetRsp": {
          "fields": {
            "sides": {
              "rule": "repeated",
              "type": "Side",
              "id": 1
            },
            "playerInfo": {
              "type": "TTKPlayerInfo",
              "id": 2
            },
            "no": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "RepeatBetReq": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "bets": {
              "rule": "repeated",
              "type": "int64",
              "id": 3
            }
          }
        },
        "RepeatBetRsp": {
          "fields": {
            "sides": {
              "rule": "repeated",
              "type": "Side",
              "id": 1
            },
            "playerInfo": {
              "type": "TTKPlayerInfo",
              "id": 2
            },
            "no": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "WinnersReq": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "offset": {
              "type": "int64",
              "id": 2
            },
            "count": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "WinnersRsp": {
          "fields": {
            "winners": {
              "rule": "repeated",
              "type": "TTKPlayerInfo",
              "id": 1
            }
          }
        },
        "DealStartNotify": {
          "fields": {
            "game": {
              "type": "TTKGameInfo",
              "id": 1
            }
          }
        },
        "UpdateGameConfig": {
          "fields": {}
        },
        "SetGamePool": {
          "fields": {
            "amount": {
              "type": "int64",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_userCenter": {
      "nested": {
        "FriendInfoReq": {
          "fields": {
            "friendUserIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "FriendInfoRsp": {
          "fields": {
            "results": {
              "rule": "repeated",
              "type": "FriendInfo",
              "id": 1
            }
          }
        },
        "UsersInfoReq": {
          "fields": {
            "UserIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "UsersInfoRsp": {
          "fields": {
            "results": {
              "rule": "repeated",
              "type": "UsersInfo",
              "id": 1
            }
          }
        },
        "UsersInfo": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "gender": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "userLevel": {
              "type": "string",
              "id": 4
            },
            "authAccess": {
              "type": "string",
              "id": 5
            },
            "nickName": {
              "type": "string",
              "id": 6
            },
            "sign": {
              "type": "string",
              "id": 7
            },
            "actorGrade": {
              "type": "int32",
              "id": 8
            },
            "State": {
              "type": "pb_pub.USER_STATE_TYPE",
              "id": 9
            }
          }
        },
        "FriendInfo": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "gender": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "userLevel": {
              "type": "string",
              "id": 4
            },
            "authAccess": {
              "type": "string",
              "id": 5
            },
            "nickName": {
              "type": "string",
              "id": 6
            },
            "sign": {
              "type": "string",
              "id": 7
            },
            "actorGrade": {
              "type": "int32",
              "id": 8
            },
            "packageName": {
              "type": "string",
              "id": 9
            },
            "systemVersion": {
              "type": "string",
              "id": 10
            },
            "phoneModels": {
              "type": "string",
              "id": 11
            },
            "appVersion": {
              "type": "string",
              "id": 12
            },
            "systemName": {
              "type": "string",
              "id": 13
            },
            "identifier": {
              "type": "string",
              "id": 14
            },
            "userState": {
              "type": "pb_pub.USER_STATE_TYPE",
              "id": 15
            },
            "switchToBack": {
              "type": "bool",
              "id": 16
            },
            "updateTime": {
              "type": "int64",
              "id": 17
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 18
            }
          }
        }
      }
    },
    "pb_pub": {
      "nested": {
        "PBCommData": {
          "fields": {
            "needReadReceipt": {
              "type": "bool",
              "id": 1
            },
            "msgSn": {
              "type": "int64",
              "id": 2
            },
            "srcId": {
              "type": "int64",
              "id": 3
            },
            "aimId": {
              "type": "int64",
              "id": 4
            },
            "time": {
              "type": "int64",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            },
            "needPushMsg": {
              "type": "bool",
              "id": 7
            },
            "serviceType": {
              "type": "Service",
              "id": 8
            }
          }
        },
        "PBMessage": {
          "fields": {
            "version": {
              "type": "uint32",
              "id": 1
            },
            "checkCode": {
              "type": "uint32",
              "id": 2
            },
            "errCode": {
              "type": "uint32",
              "id": 3
            },
            "service": {
              "type": "string",
              "id": 4
            },
            "hashKey": {
              "type": "string",
              "id": 5
            },
            "pbCommData": {
              "type": "PBCommData",
              "id": 6
            },
            "opts": {
              "keyType": "string",
              "type": "string",
              "id": 7
            },
            "pbName": {
              "type": "string",
              "id": 8
            },
            "pbData": {
              "type": "bytes",
              "id": 9
            },
            "errDesc": {
              "type": "string",
              "id": 10
            }
          }
        },
        "CommCallReq": {
          "fields": {
            "params": {
              "keyType": "string",
              "type": "string",
              "id": 1
            },
            "pbName": {
              "type": "string",
              "id": 2
            },
            "pbData": {
              "type": "bytes",
              "id": 3
            }
          }
        },
        "CommCallRsp": {
          "fields": {
            "errCode": {
              "type": "ErrCode",
              "id": 1
            },
            "params": {
              "keyType": "string",
              "type": "string",
              "id": 2
            },
            "pbName": {
              "type": "string",
              "id": 3
            },
            "pbData": {
              "type": "bytes",
              "id": 4
            },
            "errDesc": {
              "type": "string",
              "id": 5
            }
          }
        },
        "PushMsgClientActionType": {
          "values": {
            "CLIENT_ACTION_UNKNOWN": 0,
            "CLIENT_ACTION_LIVE_START": 1,
            "CLIENT_ACTION_PRIVATE_CHAT": 2
          }
        },
        "TextChatType": {
          "values": {
            "TEXT": 0,
            "PIC": 1,
            "VIDEO": 2,
            "AUDIO": 3,
            "GIFT": 4,
            "PACT": 5,
            "VIDEO_INVITE": 6,
            "CUSTOMIZE": 7
          }
        },
        "MSG_STATE": {
          "values": {
            "INIT": 0,
            "SEND": 1,
            "RECEIVED": 2,
            "READ": 3,
            "END": 4,
            "IN_BLACK_LIST": 5
          }
        },
        "MODEL_TYPE": {
          "values": {
            "NIL": 0,
            "OPPO": 1,
            "HUAWEI": 2,
            "XIAOMI": 3,
            "MEIZU": 4,
            "APPSTORE": 5,
            "VIVO": 6
          }
        },
        "MsgReceipt": {
          "fields": {
            "state": {
              "type": "MSG_STATE",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "CommRsp": {
          "fields": {
            "result": {
              "type": "ErrCode",
              "id": 1
            }
          }
        },
        "UserInfo": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "nickName": {
              "type": "string",
              "id": 2
            }
          }
        },
        "HEART_BEAT_TYPE": {
          "values": {
            "COMM": 0,
            "LIVE_ROOM": 1,
            "CALL_SCENE": 2,
            "MULTI_ANCHOR_HALL": 3,
            "TTK_GAME": 4
          }
        },
        "HEART_BEAT_MSG_STATE": {
          "values": {
            "PING": 0,
            "PANG": 1
          }
        },
        "HeartBeat": {
          "fields": {
            "type": {
              "type": "HEART_BEAT_TYPE",
              "id": 2
            },
            "state": {
              "type": "HEART_BEAT_MSG_STATE",
              "id": 3
            },
            "gateAddr": {
              "type": "string",
              "id": 4
            }
          }
        },
        "USER_STATE_TYPE": {
          "values": {
            "USER_STATE_INIT": 0,
            "USER_STATE_AUTHING": 1,
            "USER_STATE_AUTHED": 2,
            "USER_STATE_OFFLINE": 3
          }
        },
        "EnterRoomReq": {
          "fields": {}
        },
        "EnterRoomRsp": {
          "fields": {}
        },
        "ExitRoomReq": {
          "fields": {}
        },
        "ExitRoomRsp": {
          "fields": {}
        },
        "ClientBFSwitchReq": {
          "fields": {
            "switchToBack": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "ClientBFSwitchRsp": {
          "fields": {
            "switchToBack": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "userOperationRoom": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "roomId": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "operation": {
              "type": "OPERATION",
              "id": 4
            },
            "timeLen": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "OPERATION": {
          "values": {
            "UNKNOWN": 0,
            "ENTER": 1,
            "EXIT": 2
          }
        },
        "Gift": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "giftId": {
              "type": "int64",
              "id": 2
            },
            "actorId": {
              "type": "int64",
              "id": 3
            },
            "giftNumber": {
              "type": "int64",
              "id": 4
            },
            "senderName": {
              "type": "string",
              "id": 6
            },
            "targetName": {
              "type": "string",
              "id": 7
            },
            "headImg": {
              "type": "string",
              "id": 8
            },
            "level": {
              "type": "int32",
              "id": 9
            },
            "batteryType": {
              "type": "int32",
              "id": 10
            },
            "batteryTypeList": {
              "rule": "repeated",
              "type": "int64",
              "id": 11
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 12
            },
            "giftConfLastUpdateTime": {
              "type": "int64",
              "id": 13
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 14
            },
            "giftType": {
              "type": "int32",
              "id": 15
            }
          }
        },
        "LogonSuccessNotifyNsq": {
          "fields": {
            "MsgSn": {
              "type": "int64",
              "id": 1
            },
            "UserId": {
              "type": "int64",
              "id": 2
            },
            "Time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "NeedSceneRecoverNotify": {
          "fields": {
            "ServiceType": {
              "type": "Service",
              "id": 1
            },
            "Exp": {
              "keyType": "string",
              "type": "string",
              "id": 2
            }
          }
        },
        "SCENE_TYPE": {
          "values": {
            "SCENE_TYPE_UNKNOWN": 0,
            "SCENE_TYPE_CALL_SCENE": 1,
            "SCENE_TYPE_JOIN_LIVE": 2
          }
        },
        "UserScene": {
          "fields": {
            "UserId": {
              "type": "int64",
              "id": 1
            },
            "SceneId": {
              "type": "int64",
              "id": 2
            },
            "SceneType": {
              "type": "SCENE_TYPE",
              "id": 3
            }
          }
        },
        "ErrCode": {
          "values": {
            "SUCCESS": 0,
            "SYS_ERR": 1,
            "USER_NOT_EXIST": 2,
            "USER_NOT_ONLINE": 3,
            "PERMISSION_DENIED": 6,
            "PB_NO_HANDLER": 20,
            "ROOM_NOT_FILE": 40,
            "LIVE_ROOM_NOTEXIT": 50,
            "USER_IS_KICKED_OUT": 51,
            "UNMARSHAL_FAILED": 52,
            "USER_FORBID_SPEAKING": 53,
            "SEND_MSG_FAILED": 54,
            "MARSHAL_FAILED": 55,
            "USER_NOT_IN_ROOM": 56,
            "USER_IS_KICKED_OUT_BY_ANCHOR": 57,
            "USER_IS_KICKED_OUT_BY_MANAGER": 58,
            "NO_FREE_BENCH": 60,
            "CHAIR_NOT_EMPTY": 61,
            "NOT_CHAIR_MAIN": 62,
            "USER_IS_ON_ANCHOR_ALREADY": 63,
            "USER_IS_IN_WAIT_LIST_ALREADY": 64,
            "USER_NO_INVITATION": 65,
            "USER_ON_ANCHOR_AUTH_FAILED": 66,
            "ROOM_IS_LIVING_ALREADY": 67,
            "AIM_LOC_NOT_FREE": 68,
            "USER_ENTER_ROOM_AUTH_FAILED": 69,
            "LIVE_START_AUTH_FAILED": 70,
            "ROOM_NOT_IN_LIVING": 71,
            "USER_NOT_ON_ANCHOR": 72,
            "USER_ON_CHAT_ROOM_ALREADY": 73,
            "SECRET_ROOM_IS_NIL": 100,
            "USER_IS_NOT_A_COMPERE": 101,
            "INPUT_IS_OUT_OF_RANGE": 102,
            "TYPE_ASSERTION_ERR": 103,
            "INVITER_IS_LEVEL_PRIVILEGE": 104,
            "GET_BALANCE": 105,
            "BALANCE_NOT_ENOUGH": 106,
            "COUNT_OF_CHATROOM_UP_TO_LIMIT": 107,
            "INVITEE_IS_NOT_ON_ANCHOR": 108,
            "INVITER_ALREADY_ON_CHAT": 109,
            "INVITEE_ALREADY_ON_CHAT": 110,
            "INVITER_IS_CHAIRMAN": 111,
            "INVITEE_IS_CHAIRMAN": 112,
            "INVITER_HAS_LEFT_ROOM": 113,
            "CREATE_INVITATION_FAILED": 114,
            "GET_INVITATION_FAILED": 115,
            "STATUS_IS_UNEXPECTED": 116,
            "CREATE_CHATROOM_FAILED": 117,
            "GET_CHATROOM_FAILED": 118,
            "CHATROOM_IS_NIL": 119,
            "USER_IS_BUSY": 201,
            "SCENE_NOTEXIT": 202,
            "LUCK_REFRESH_CFG_FAIL": 251,
            "PK_ROOM_NOT_EXIST": 300,
            "BET_NOT_ALLOWED_IN_DEALING": 401,
            "UNKNOWN_KINGDOM": 402,
            "BET_AMOUNT_NOT_ALLOWED": 403,
            "NO_ENOUGH_BALANCE": 404,
            "SN_GET_CHATID_ERROR": 1100,
            "READ_CHAT_HISTORY_ERROR": 1101,
            "COMMON_ERR": 10000,
            "PIC_SO_BIG": 10010001,
            "PIC_PUT_OSS_FAIL": 10010002,
            "PIC_SECURE_CHECK_FAIL": 10010003,
            "PIC_NOT_SECURE": 10010004,
            "VIDEO_SO_BIG": 10010005,
            "VIDEO_PUT_OSS_FAIL": 10010006,
            "VIDEO_SECURE_CHECK_FAIL": 10010007,
            "VIDEO_NOT_SECURE": 10010008,
            "AUDIO_SO_BIG": 10010009,
            "AUDIO_PUT_OSS_FAIL": 10010010,
            "AUDIO_SECURE_CHECK_FAIL": 10010011,
            "AUDIO_NOT_SECURE": 10010012,
            "GET_UPLOAD_FILE_FAIL": 10010013,
            "FILE_SO_BIG": 10010014,
            "FILE_PUT_OSS_FAIL": 10010015
          }
        },
        "IM_TYPE": {
          "values": {
            "IM_TYPE_YZIM": 0,
            "IM_TYPE_YXIM": 1
          }
        },
        "GMChangeIMNotify": {
          "fields": {
            "imType": {
              "type": "IM_TYPE",
              "id": 1
            },
            "optUser": {
              "type": "int64",
              "id": 2
            },
            "optTime": {
              "type": "int64",
              "id": 3
            },
            "resion": {
              "type": "string",
              "id": 4
            }
          }
        },
        "GMPPullLogNotify": {
          "fields": {
            "aimUser": {
              "type": "int64",
              "id": 1
            },
            "optUser": {
              "type": "int64",
              "id": 2
            },
            "optTime": {
              "type": "int64",
              "id": 3
            },
            "resion": {
              "type": "string",
              "id": 4
            }
          }
        },
        "Service": {
          "values": {
            "gate": 0,
            "user_center": 1,
            "msg_sender": 2,
            "chat": 3,
            "allocater": 4,
            "black_list": 5,
            "live_room": 6,
            "offline_msg": 7,
            "pk_room": 8,
            "visitors_gate": 9,
            "oss": 10,
            "service_monitor": 11,
            "msg_pusher": 12,
            "call_scene": 13,
            "admin": 14,
            "multi_anchor_hall": 15,
            "ttk_game": 16,
            "wish_hall": 17,
            "msg_analyze": 18,
            "comm_room": 19
          }
        },
        "ServiceNotify": {
          "fields": {
            "messageType": {
              "type": "int32",
              "id": 1
            },
            "messageBody": {
              "type": "string",
              "id": 2
            }
          }
        },
        "ServiceNotifyToAllUser": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "messageType": {
              "type": "int32",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            },
            "messageBody": {
              "type": "string",
              "id": 4
            }
          }
        },
        "ServiceNotifyToAimUser": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "aimUsers": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            },
            "messageType": {
              "type": "int32",
              "id": 3
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 4
            },
            "messageBody": {
              "type": "string",
              "id": 5
            }
          }
        },
        "ServiceNotifyToAllGroup": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "messageType": {
              "type": "int32",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            },
            "messageBody": {
              "type": "string",
              "id": 4
            }
          }
        },
        "ServiceNotifyToAimGroup": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "messageType": {
              "type": "int32",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 4
            },
            "messageBody": {
              "type": "string",
              "id": 5
            }
          }
        },
        "YXLiveRoomNotify": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "messageType": {
              "type": "YXLiveRoomNotifyType",
              "id": 3
            },
            "messageBody": {
              "type": "string",
              "id": 4
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 5
            }
          }
        },
        "YXLiveRoomNotifyType": {
          "values": {
            "LIVE_START": 0,
            "LIVE_STOP": 1,
            "LIVEROOM_HEARTBEAT": 2,
            "ENTER_ROOM": 3,
            "EXIT_ROOM": 4,
            "UNSET_USER_KICKOUT_STATUS": 5,
            "LIVEROOM_PK_SCORE_UPDATE": 6,
            "PKPROP": 7,
            "SEND_GIFT": 8,
            "HOST_MODE": 9,
            "UPDATED_USER_INFO": 10,
            "ROOM_BARRAGE": 11,
            "ROOM_ACTION": 12,
            "UPDATE_ANCHOR_SCORE": 13,
            "UPDATE_BILLBOARD": 14,
            "KICK_USER_OUT": 15,
            "SEND_LIVE_GIFT": 16,
            "UPDATE_MULTI_ANCHOR_SCORE": 17,
            "INVESTOR_CHANGE": 18,
            "SECRET_GIFT": 19,
            "BACKGROUND_CHANGE": 20
          }
        },
        "PKQualifyChangeNotify": {
          "fields": {
            "isQualifiedPkTournament": {
              "type": "bool",
              "id": 1
            },
            "pkTournamentBeginTime": {
              "type": "string",
              "id": 2
            },
            "pkTounamentTip": {
              "type": "string",
              "id": 3
            }
          }
        },
        "TTKNSQMessage": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "msgName": {
              "type": "string",
              "id": 2
            },
            "msgData": {
              "type": "string",
              "id": 3
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 4
            }
          }
        },
        "KickUserReason": {
          "values": {
            "Sys": 0,
            "Relogon": 1,
            "ClientException": 2
          }
        },
        "PubRoomId": {
          "values": {
            "Unknown": 0,
            "PartyRoomHall": 1,
            "TTKGame": 2,
            "WishHall": 3,
            "CommRoomAuctionHouse": 4
          }
        },
        "ExpKey": {
          "values": {
            "ExpUnknown": 0,
            "ExpGroupId": 1
          }
        },
        "YXCommMsg": {
          "fields": {
            "MessageType": {
              "type": "MessageType",
              "id": 1
            },
            "MessageBody": {
              "type": "string",
              "id": 2
            },
            "IsImMessage": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "YXCommMsgRsp": {
          "fields": {}
        },
        "MessageType": {
          "values": {
            "MessageTypeUnknown": 0,
            "MessageTypeUser": 1,
            "MessageTypeAt": 2,
            "MessageTypeRoomBarrage": 3,
            "MessageTypeAllBarrage": 4,
            "MessageTypeGift": 5,
            "MessageTypeUserGetIn": 6,
            "MessageTypeForbidSpeaking": 7,
            "MessageTypeUnForbidSpeaking": 8,
            "MessageTypeKictOut": 9,
            "MessageTypeRobitInRoom": 10,
            "MessageTypeRobitMessage": 11,
            "MessageTypeLiveMessage": 12,
            "MessageTypeNewJoinLiveApply": 13,
            "MessageTypeCancelJoinLiveApply": 14,
            "MessageTypeForbidPublish": 15,
            "MessageTypeSuperManagerKickout": 16,
            "MessageTypeRoomManagerChanged": 17,
            "MessageTypeJoinLiveBalanceNotEnoughTip": 18,
            "MessageTypeJoinLiveBalanceNotEnoughEndLive": 19,
            "MessageTypeAnchorToAnchorJoinLiveInvite": 20,
            "MessageTypeAnchorToAnchorJoinLiveAcceptOrReject": 21,
            "MessageTypeAnchorInviteJoinLiveCancel": 22,
            "MessageTypeAnchorToAnchorJoinLiveEnd": 23,
            "MessageTypeUserActionTip": 24,
            "MessageTypeNetworkErrorKickout": 25,
            "MessageTypeTotalStationInform": 26,
            "MessageTypeAnchorToAnchorJoinLiveTempLeave": 27,
            "MessageTypeRedPocket": 28,
            "MessageTypeUserLottery": 29,
            "MessageTypeAudicenceList": 30,
            "MessageTypeAnnouncement": 31,
            "MessageTypeEndJoinLive": 32,
            "MessageTypeWeekStarGift": 33,
            "MessageTypePKInvite": 34,
            "MessageTypePKAcceptOrReject": 35,
            "MessageTypePKEnd": 36,
            "MessageTypePKStart": 37,
            "MessageTypePKChangeModeSuccess": 38,
            "MessageTypePKMatchingSuccess": 39,
            "MessageTypePKTimeCorrect": 40,
            "MessageTypePKFirstGiftMsg": 41,
            "MessageTypePKSendTargetPkValue": 43,
            "MessageTypeLiveEndH5": 44,
            "MessageTypePK5MinuteEnd": 45,
            "MessageTypeJoinFans": 46,
            "MessageTypeJoinGuard": 47,
            "MessageTypeSwimsuitActivityProcess": 52,
            "MessageTypeSwimsuitActivityRobBoxOver": 53,
            "MessageTypeActivityBoxProcess": 54,
            "MessageTypeRedPacketNew": 55,
            "MessageTypeRedPacketOver": 56,
            "MessageTypeSendRocket": 66,
            "MessageTypeTreasureMap": 67,
            "MessageTypeRankPromotionScoreChanged": 68,
            "MessageTypeRandomMatchCancel": 69,
            "MessageTypeUpdateWishMenu": 70,
            "MessageTypeWishPoolDetail": 71,
            "MessageTypeWishPoolLuckyMan": 72,
            "MessageTypeUpdatePkSeatInfo": 73,
            "MessageTypeChristmasTreeLightUp": 75,
            "MessageTypeNewYearLightUp": 76,
            "MessageTypeChatText": 80,
            "MessageTypeLiveRoomGift": 100,
            "MessageTypeSendPersonalGift": 1000,
            "MessageTypeServiceNotify": 2000
          }
        }
      }
    }
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(30);

var _config = __webpack_require__(31);

var _config2 = _interopRequireDefault(_config);

var _pb = __webpack_require__(50);

var _pb2 = _interopRequireDefault(_pb);

var _network = __webpack_require__(53);

var _log = __webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mySocket = {};
function getInstance(options) {
  mySocket = {
    account: options.account,
    token: options.token,
    address: options.address,
    connectType: options.connectType || 1,
    roomId: '', // 房间ID
    isAnonymous: options.isAnonymous || false, // 游客模式
    debug: options.debug || false, // 是否输出log信息
    clientInfo: options.clientInfo, // 版本信息
    netState: _config2.default.NetState.NET_STATE_INIT, // 链接状态
    updateTime: (0, _util.GetCurLocalTime)(), // 维持连接时间
    roomTimer: '', // 房间状态机
    roomState: 0, // 房间状态
    roomUpdateTime: (0, _util.GetCurLocalTime)(), // 房间维持连接时间
    roomHeartBeatTime: (0, _util.GetCurLocalTime)(), // 房间心跳时间
    socketTimer: '', // 维持连接的定时器
    wssClient: '', // wss连接
    offlineMsgQue: [], // 离线消息队列
    ifReqOffLineMsg: false,
    offLineTime: 0,
    heartBeatTime: (0, _util.GetCurLocalTime)(), // 心跳时间
    serveTime: 0, // 服务器时间
    timeDiffer: 0, // 时间差
    setStop: false,
    ifReset: true, // 连接断开时是否自动连接，默认自动连接，如果认证失败或者心跳超时，重新走java的连接
    reconnectTimer: '', // 断网重连
    netCloseTimes: 0, // 网络被关过多少次，10秒连续三次报网络不佳
    /**
     * msgSn 每条消息的唯一认证标识
     * 64位(32:用户信息+32:消息标识)
     * 初始值自定义，每次登录成功后在LoginRsp中返回sn
     * 每次发送消息sn自增1，如果收到多条相同sn消息则覆盖原消息
     */
    msgSn: _config2.default.Long.fromValue(Math.random().toString().split('.')[1], false),
    messageQueue: {} // 消息队列，记录用户发送的消息 0 初始 1 发送成功 2 已接收 3 已读


    // 设置连接状态
  };mySocket.SetNetState = function (state) {
    // console.log('net => socket state change from ' + mySocket.netState + ' to ' + state)
    mySocket.netState = state;
    mySocket.updateTime = (0, _util.GetCurLocalTime)();
  };

  // 状态机 监听状态变化并发送心跳数据
  mySocket.initConnect = function (options) {
    if (mySocket.socketTimer) {
      // 已经启动，直接返回
      return;
    }
    clearInterval(mySocket.socketTimer);
    // 状态机
    mySocket.socketTimer = setInterval(function () {
      // 使用pb结构
      // console.log('连接状态----------------------：' + mySocket.netState)
      switch (mySocket.netState) {
        case _config2.default.NetState.NET_STATE_INIT:
          // 0 准备连接
          mySocket.wssClient = new WebSocket(mySocket.address);
          mySocket.MountHandle();
          mySocket.SetNetState(_config2.default.NetState.NET_STATE_CONNECTING);
          // console.log('net => connecting!!');
          // 绑定接收函数
          break;
        case _config2.default.NetState.NET_STATE_CONNECTING:
          // 1 连接中
          // 正在连接中，判断是否超时
          if ((0, _util.GetCurLocalTime)() - mySocket.updateTime > 10) {
            // 10秒认为超时，一般不会那么久，socket自己的回调就设置回来了
            mySocket.wssClient.close(); // 关闭连接
            mySocket.SetNetState(_config2.default.NetState.NET_STATE_INIT);
            console.log('net => connect out time, close socket!!');
          }
          break;
        case _config2.default.NetState.NET_STATE_OPEN:
          // 2 连接成功
          // if (mySocket.token) {
          //   var LoginPb = config.pbMsgRoot.lookup('LoginReq').create({
          //     token: mySocket.token,
          //     token_type: 0
          //   });
          // } else {
          //   var LoginPb = config.pbMsgRoot.lookup('LoginReq').create();
          // }
          // mySocket.SendPbMsg(false, 'gate', mySocket.account, LoginPb);
          // mySocket.SetNetState(config.NetState.NET_STATE_AUTHING);
          break;
        case _config2.default.NetState.NET_STATE_AUTHING:
          // 3 认证中
          // 如果超时没有返回就再发送
          // 认证超时则重新登录 ! ! !
          if ((0, _util.GetCurLocalTime)() - mySocket.updateTime > 10) {
            // 10秒没有返回，失败
            mySocket.SetNetState(_config2.default.NetState.NET_STATE_INIT);
            // console.log('net => authing over time, close socket!!!')
            mySocket.ifReset = false;
            mySocket.Stop();
            options.onerror({
              message: '登录验证失败，正在重连',
              code: 101 // java重新获取token
            });
          }
          break;
        case _config2.default.NetState.NET_STATE_AUTHED:
          // 4 认证成功
          // 心跳超时的话重新连接
          if ((0, _util.GetCurLocalTime)() - mySocket.updateTime > 30) {
            // 30秒超时
            mySocket.SetNetState(_config2.default.NetState.NET_STATE_INIT);
            // console.log('net => heart beat over time, close socket!!!')
            mySocket.ifReset = false;
            mySocket.Stop();
            options.onerror({
              message: '登录验证失败，正在重连',
              code: 101 // java重新获取token
            });
            break;
          }

          if ((0, _util.GetCurLocalTime)() - mySocket.heartBeatTime > 10) {
            // 10秒一个心跳
            // console.log('IM心跳--------')
            mySocket.heartBeatTime = (0, _util.GetCurLocalTime)();
            var heartBeat = _config2.default.pbMsgRoot.lookup('pb_pub.HeartBeat').create({
              type: 0,
              state: 0
            });
            mySocket.SendPbMsg(false, 'gate', mySocket.account, heartBeat);
          }
          break;
        case _config2.default.NetState.NET_STATE_CLOSE:
          // 多端登录被踢
          break;
      }
    }, 1000);
  };

  // 聊天室状态机
  mySocket.roomConnect = function () {
    clearInterval(mySocket.roomTimer);
    // 状态机
    mySocket.roomTimer = setInterval(function () {
      if (!mySocket.roomId || mySocket.roomId === 'undefined' || mySocket.roomId === 'null') {
        mySocket.Stop();
        options.onerror({
          message: 'roomId不存在，重新登录',
          code: 101 // java重新获取token
        });
        clearInterval(mySocket.roomTimer);
      }
      // console.log('房间状态----------------------：' + mySocket.roomState, GetCurLocalTime(), mySocket.roomUpdateTime)
      switch (mySocket.roomState) {
        case _config2.default.RoomState.ROOM_INIT:
          // 0 初始状态，直播间心跳超时时会走这里，重新进入直播间
          mySocket.enterLiveRoom({ roomId: mySocket.roomId });
          break;
        case _config2.default.RoomState.ROOM_LIVE:
          // 1 直播中
          // 心跳超时的话重新连接
          if ((0, _util.GetCurLocalTime)() - mySocket.roomUpdateTime > 30) {
            // 30秒超时
            mySocket.roomState = _config2.default.RoomState.ROOM_INIT;
            mySocket.roomUpdateTime = (0, _util.GetCurLocalTime)();
            (0, _log.logMsg)(mySocket.debug, '\u76F4\u64AD\u95F4\u5FC3\u8DF3\u8D85\u65F6-155:' + mySocket.roomId, 'error');
            break;
          }
          if ((0, _util.GetCurLocalTime)() - mySocket.roomHeartBeatTime > 10) {
            if (mySocket.roomId) {
              // console.log('直播间心跳--------')
              mySocket.roomHeartBeatTime = (0, _util.GetCurLocalTime)();
              var heartBeat = _config2.default.pbMsgRoot.lookup('pb_pub.HeartBeat').create({
                type: 1,
                state: 0
              });
              mySocket.SendPbMsg(true, 'live_room', mySocket.roomId, heartBeat, '', '', {
                aimId: mySocket.roomId
              });
            }
          }
          break;
        case _config2.default.RoomState.ROOM_CLOSE:
          // 2 直播结束
          break;
      }
    }, 1000);
  };

  // 函数绑定
  mySocket.MountHandle = function () {
    mySocket.wssClient.onopen = mySocket.onSocketOpen;
    mySocket.wssClient.onclose = mySocket.onSocketClose;
    mySocket.wssClient.onerror = mySocket.onSocketError;
    mySocket.wssClient.onmessage = mySocket.onSocketMessage;
  };

  mySocket.onSocketOpen = function (res) {
    mySocket.updateTime = (0, _util.GetCurLocalTime)();
    mySocket.SetNetState(_config2.default.NetState.NET_STATE_OPEN);
    // 连接成功后直接登录
    /**
     * clientInfo:
     * appVersion: 同椰趣
     * systemName：h5
     */
    var LoginPb;
    if (mySocket.token) {
      LoginPb = _config2.default.pbMsgRoot.lookup('LoginReq').create({
        token: mySocket.token,
        token_type: 0,
        clientInfo: mySocket.clientInfo
      });
    } else {
      LoginPb = _config2.default.pbMsgRoot.lookup('LoginReq').create({
        clientInfo: mySocket.clientInfo
      });
    }
    mySocket.SendPbMsg(false, 'gate', mySocket.account, LoginPb);
    mySocket.SetNetState(_config2.default.NetState.NET_STATE_AUTHING);
  };

  // 将收到的消息解析出并通知用户接收
  mySocket.onSocketMessage = function (res) {
    var getMsg = res.data;
    if (typeof getMsg === 'string') {} else {
      // 二进制数据处理
      var reader = new FileReader();
      reader.readAsArrayBuffer(res.data);
      reader.onload = function (e) {
        var pbMsgHead = _config2.default.pbMsgHeadBuilder.decode(new Uint8Array(reader.result));
        if (!pbMsgHead.pbName) {
          (0, _log.logMsg)(mySocket.debug, 'get err msg-216:' + pbMsgHead, 'error');
          if (pbMsgHead) {
            return;
          }
        }
        var pbMsgBuilder = _config2.default.pbMsgRoot.lookup(pbMsgHead.pbName);
        if (!pbMsgBuilder) {
          (0, _log.logMsg)(mySocket.debug, 'net->\u6536\u5230\u672A\u77E5\u6D88\u606F-221:' + pbMsgHead.pbName, 'warn');
          return;
        }
        // 消息解码
        var pbMsgRsp = pbMsgBuilder.decode(pbMsgHead.pbData);
        if (pbMsgHead.pbName !== 'pb_pub.HeartBeat') {
          // console.log('收到的所有消息----------------', pbMsgHead, pbMsgRsp)
        }
        if (pbMsgRsp.result) {
          (0, _log.logMsg)(mySocket.debug, '\u6D88\u606F\u8FD4\u56DE\u5931\u8D25\uFF1A-230:' + pbMsgRsp.result, 'error');
          switch (pbMsgHead.pbName) {
            case 'pb_msg_gate.LoginRsp':
              // 登录结果返回 result 成功0
              if (pbMsgRsp.result) {
                // 登录失败
                (0, _log.logMsg)(mySocket.debug, 'Login error! result:-235:' + pbMsgRsp.result, 'error');
                mySocket.SetNetState(_config2.default.NetState.NET_STATE_INIT);
                mySocket.ifReset = false;
                mySocket.Stop();
                options.onerror({
                  message: '登录验证失败，正在重连',
                  code: 101 // java重新获取token
                });
                break;
              }
              break;
            default:
              break;
          }
          return;
        }
        switch (pbMsgHead.errCode) {
          case 50:
            // 直播间不存在
            mySocket.roomId = '';
            options.onliveroom({ type: 'changYX' });
            break;
          default:
            break;
        }

        // mySocket.SetNetState(config.NetState.NET_STATE_AUTHED) // 模拟认证
        switch (pbMsgHead.pbName // pbMsgRsp.result 错误码 0:代表成功
        ) {case 'pb_pub.HeartBeat':
            // 心跳消息
            // 收到heartbeat， 更改时间
            if (pbMsgRsp.type && pbMsgRsp.type === 1) {
              mySocket.roomUpdateTime = (0, _util.GetCurLocalTime)();
            } else {
              mySocket.updateTime = (0, _util.GetCurLocalTime)();
            }
            break;
          case 'pb_msg_gate.LoginRsp':
            // 登录结果返回 result 成功0
            /**
             * 记录返回的token信息，下次登录使用
             * 更新sn
             */
            mySocket.setStop = false;
            var loginRes = pbMsgBuilder.toObject(pbMsgRsp);
            // console.log('登录结果返回:', mySocket.isAnonymous, pbMsgHead, pbMsgRsp)
            if (!mySocket.isAnonymous) {
              // console.log('2222222222222222')
              mySocket.token = loginRes.reconnectToken;
              mySocket.msgSn = loginRes.msgSn;
              (0, _log.logMsg)(mySocket.debug, '\u6B63\u5E38\u7528\u6237\u767B\u5F55\u8FD4\u56DE\u7684sn:-283:' + loginRes.msgSn.toString(), 'info');
            } else {
              mySocket.account = pbMsgHead.pbCommData.srcId;
              mySocket.msgSn = loginRes.msgSn;
              (0, _log.logMsg)(mySocket.debug, '\u6E38\u5BA2\u6A21\u5F0F\u4E0B\u7684\u7528\u6237id:-287:' + mySocket.account, 'info');
            }
            mySocket.serveTime = pbMsgHead.pbCommData.time.toNumber();
            mySocket.timeDiffer = (0, _util.GetCurLocalTime)() - mySocket.serveTime;
            // console.log(
            //   `pb_pub.LoginRsp ${mySocket.account}用户认证成功`,
            //   !!options.isAnonymous
            // );
            // 设置连接状态
            mySocket.SetNetState(_config2.default.NetState.NET_STATE_AUTHED);
            options.onopen(true);
            /**
             * 连接成功后需要直接调用的消息
             */
            // mySocket.sendMsgInLoginSus();
            break;
          case 'pb_msg_gate.KickOffUser':
            // 多端登录踢出消息，收到消息后需弹窗提示用户是否在该设备上重新登录
            // 如果踢出人为自己则连接状态置0，提示原因
            if (pbMsgRsp.aimUId.toNumber() === mySocket.account) {
              mySocket.SetNetState(_config2.default.NetState.NET_STATE_CLOSE);
              mySocket.ifReset = false;
              mySocket.Stop();
              options.onerror({
                message: pbMsgRsp.desc,
                reason: pbMsgRsp.reason,
                code: 201
              });
            }
            break;
          case 'pb_pub.MsgReceipt':
            // 聊天消息状态接收
            // mySocket.messageQueue[pbMsgRsp.head.msgSn]['state'] = pbMsgRsp.state
            // 告诉用户消息状态已经改变
            // console.info(mySocket.messageQueue[pbMsgRsp.head.msgSn])
            var obj = {
              msgSn: pbMsgHead.pbCommData.msgSn.toString(),
              pbCommData: pbMsgHead.pbCommData,
              state: pbMsgRsp.state
            };
            (0, _log.logMsg)(mySocket.debug, '\u804A\u5929\u6D88\u606F\u72B6\u6001\u63A5\u6536:-325:' + obj, 'info');
            if (pbMsgRsp.time) {
              obj.time = pbMsgRsp.time.toNumber();
            }
            options.onmarkmsgread(obj);
            break;
          case 'pb_msg_gate.ChatText':
            // 聊天消息
            var msgObj = Object.assign({}, pbMsgRsp);
            msgObj.scene = 'p2p';
            msgObj.state = 1;
            msgObj.aimUserId = msgObj.aimUserId.toNumber();
            msgObj.pbCommData = (0, _util.parseLong)(pbMsgHead.pbCommData);
            // 避免对方没有发来消息类型，默认为文本
            if (!msgObj.chatType) {
              msgObj.chatType = 0;
            }
            options.onmessage(msgObj);
            break;
          case 'pb_msg_offlineMsg.ReadOfflineMsgRsp':
            // 离线消息
            /**
             * 用户第一次获取离线消息
             * 1.发送num=0 time直接取当前时间，得到离线消息数量
             * 2.获取自己想要的离线消息，num=自己想要获取的数量，不能超过离线消息总数
             * 如果离线消息多，可以分段获取，每次获取的时间都是上次最后一条数据的时间
             * 获取消息后，解析所有消息
             * 获取到的离线消息按时间先后顺序排序
             * 一次获取100条数据，展示时展示99+
             * 批量获取离线消息后发送已接收消息方式：批量或者单条发送
             * 批量：只发送一条已接收状态消息，time为最后一条消息的time，服务端会把time之前的离线消息删除
             * 单条：获取到的所有离线消息都发送一条已接收消息，time改为0
             */
            // 第一次请求的离线消息数量
            if (pbMsgRsp.msgNum !== 0 && pbMsgRsp.msgList.length === 0) {
              // console.log('离线消息总数：' + pbMsgRsp.msgNum)
              var reqNum = pbMsgRsp.msgNum;
              // if (pbMsgRsp.msgNum > 5) {
              //   mySocket.getOffLineMsg({ num: 5 })
              // } else {
              //   mySocket.getOffLineMsg({ num: reqNum })
              // }
              // 暂时只请求一次
              if (!mySocket.ifReqOffLineMsg) {
                mySocket.ifReqOffLineMsg = true;
                mySocket.getOffLineMsg({ num: reqNum });
              }
            }
            // 之后请求的离线消息
            if (pbMsgRsp.msgNum !== 0 && pbMsgRsp.msgList.length !== 0) {
              // console.log('获得所有离线消息：')
              var offLineMsg = {};
              for (var i = 0; i < pbMsgRsp.msgList.length; i++) {
                var element = mySocket.decodeOffLineMsg(pbMsgRsp.msgList[i]);
                mySocket.offLineTime = element.pbCommData.time; // 更新离线消息时间，记录最后一条离线消息时间，离线消息返回按时间正序排序
                var ressn = element.pbCommData.msgSn;
                offLineMsg[ressn + '-im'] = element;
              }
              // 批量更新消息状态：已接收
              mySocket.sendMsgRead({ state: 2, time: mySocket.offLineTime });
              // console.log(offLineMsg, '解析后的离线消息')
              options.onofflinemsg(offLineMsg, pbMsgRsp.msgNum);
            }
            break;
          case 'pb_msg_blackList.SaveBlackListRsp':
            // 添加黑名单
            options.onmarkinblacklist({
              type: 'in',
              aimId: pbMsgRsp.aimUserid.toNumber()
            });
            break;
          case 'pb_msg_blackList.DeleteBlackListRsp':
            // 移除黑名单（取消拉黑）
            options.onmarkinblacklist({
              type: 'out',
              aimId: pbMsgRsp.aimUserid.toNumber()
            });
            break;
          case 'pb_msg_blackList.ReadBlackListRsp':
            // 读取黑名单
            options.onblacklist(pbMsgRsp.aimUserid);
            break;
          case 'pb_msg_blackList.JudgeBlackListRsp':
            // 判断是否在黑名单中 0不存在 1存在
            options.onjudgeinblack(pbMsgRsp.state);
            break;
          case 'pb_pub.EnterRoomRsp':
            // 进入直播间，启动状态机（为了减少连接时间，所以直接发送进入直播间的请求，在启动状态机）
            // options.onjudgeinblack(pbMsgRsp.state)
            if (mySocket.roomId) {
              // 进入直播间成功后才启动定时器，发送心跳
              // console.log(pbMsgHead, '成功进入直播间')
              options.onliveroom({ type: 'enter' });
              mySocket.roomUpdateTime = (0, _util.GetCurLocalTime)();
              mySocket.roomState = _config2.default.RoomState.ROOM_LIVE;
              mySocket.roomConnect();
            }
            break;
          case 'pb_pub.ExitRoomRsp':
            // 离开直播间
            // options.onjudgeinblack(pbMsgRsp.state)
            mySocket.roomId = '';
            (0, _log.logMsg)(mySocket.debug, '\u6210\u529F\u79BB\u5F00\u76F4\u64AD\u95F4:-418:' + pbMsgRsp, 'info');
            options.onliveroom({ type: 'leave' });
            break;
          case 'pb_pub.YXCommMsg':
            /**
             * 聊天室消息接收
             * 无论自己发送的消息还是别人的消息，都会走这里
             * 如果是自己发送的消息，需要在发送时监听，
             * 9s后没有在这里收到消息则需要重新发送
             */
            var _getMsg = Object.assign({}, pbMsgRsp);
            _getMsg.msgSn = pbMsgHead.pbCommData.msgSn;
            _getMsg.msgSn = _getMsg.msgSn.toString();
            if (_getMsg.IsImMessage) {
              _getMsg.IsImMessage = _getMsg.IsImMessage.toString();
            }
            _getMsg.errCode = pbMsgHead.errCode;
            options.onmsgs({
              type: 'YXCommMsg',
              body: _getMsg
            });
            break;
          case 'pb_msg_live_room.LiveGiftNotify':
            // 礼物消息
            (0, _log.logMsg)(mySocket.debug, '\u793C\u7269\u6D88\u606F:-441:' + pbMsgRsp, 'normal');
            try {
              options.onmsgs({
                type: 'LiveGiftNotify',
                body: (0, _util.parseGift)(pbMsgRsp)
              });
            } catch (error) {}
            break;
          /**
           * pkStatus：
              0 空闲中  -- 初始值,我方拒绝,响铃超时,惩罚结束
              1 排队中  -- 申请随机PK或申请段位PK
              2 呼叫中  -- 邀请PK拨号中
              3 响铃中  -- 匹配成功询问主播是否同意开启 被其他主播邀请
              4 等待中  -- 我已同意,等待对方主播同意
              5 比赛中  -- 双方同意 邀请成功
              7 惩罚中  -- 比赛结束,惩罚中
           */
          case 'pb_msg_live_room.EnterRoomReadyRsp': // 进房间成功触发应答
          case 'pb_msg_live_room.RoomInfo': // 用户进房间通知
          case 'pb_msg_live_room.UpdatedUserInfo': // 更新用户信息，粉丝团，守护等
          case 'pb_msg_live_room.AudienceEnterRoom': // 房间消息: 观众进房间
          case 'pb_msg_live_room.RoomBarrage': // 房间消息: 弹幕消息
          case 'pb_msg_live_room.RoomNormal': // 房间消息: 普通消息
          case 'pb_msg_live_room.RoomAction': // 房间消息: 关注
          case 'pb_msg_live_room.PKRoomInfo': // PK消息
          case 'pb_msg_pk_room.PKStatusChangeNotify': // 房间PK状态更新通知
          case 'pb_msg_pk_room.PKStartNotify': // PK开始，注：PKMatchedNotify用于通知主播
          case 'pb_msg_pk_room.PKOverNotify': // PK结束消息
          case 'pb_pub.ServiceNotify': // 系统通知
          case 'pb_pub.NeedSceneRecoverNotify': // 场景恢复
          case 'pb_msg_pk_room.PKGameOverNotify':
            // PK比赛阶段结束
            (0, _log.logMsg)(mySocket.debug, '\u76F4\u64AD\u95F4\u6539\u9020\u6D88\u606F\u63A5\u6536\uFF0C\u6D88\u606F\u7C7B\u578B:-457:' + pbMsgHead.pbName, 'normal');
            (0, _log.logMsg)(mySocket.debug, '\u76F4\u64AD\u95F4\u6539\u9020\u6D88\u606F\u63A5\u6536\uFF0C\u6D88\u606F\u4F53:-458:' + (0, _util.parseMsg)(pbMsgRsp), 'normal');
            var time = pbMsgHead.pbCommData.time;
            try {
              options.onmsgs({
                time: time.toNumber(),
                type: pbMsgHead.pbName,
                body: (0, _util.parseMsg)(pbMsgRsp, 'normal')
              });
            } catch (error) {
              console.error('消息解析异常:' + pbMsgHead.pbName);
              console.error('消息异常原因:' + error);
            }
            break;
          case 'pb_msg_live_room.PKScoreNotify':
            // PK数值更新
            // console.log(`%c ---sdk log :PK数值更新--- `, `color:#09fb05;background:#6a6a6b`)
            var pbHead = _pb2.default.pbMsgHeadBuilder.decode(new Uint8Array(reader.result));
            var pbBuilder = _pb2.default.pbMsgRoot.lookup(pbHead.pbName);
            var pbRsp = pbBuilder.decode(pbHead.pbData);
            try {
              var scorepb = {
                type: pbHead.pbName,
                body: pbRsp
                // console.log(`%c ---sdk log :PK数值更新--${JSON.stringify(scorepb)}--- `, `color:#09fb05;background:#6a6a6b`)
              };options.onmsgs(scorepb);
            } catch (error) {}
            break;
          case 'pb_pub.GMChangeIMNotify':
            // SDK切换
            options.onsdkchange(pbMsgRsp);
            break;
          case 'pb_msg_live_room.RoomStatusNotify':
            // 0主播正常/1下播 roomStatus
            // console.log(`%c ${pbMsgRsp.groupId}-主播状态-${pbMsgRsp.roomStatus}`, 'color:#67C23A')
            mySocket.roomState = _config2.default.RoomState.ROOM_CLOSE;
            mySocket.roomUpdateTime = (0, _util.GetCurLocalTime)();
            clearInterval(mySocket.roomTimer);
            var msg = Object.assign(pbMsgRsp, {});
            msg.groupId = msg.groupId.toNumber();
            options.onliveroom({ type: 'status', msg: msg });
            break;
          case 'pb_msg_live_room.ReloadYXCommMsgRsp':
            // 断线重连获取直播间历史消息（100条全部类型消息）
            // console.log(`%c ${pbMsgRsp}-100条全部类型消息`, 'color:#67C23A')
            // console.log(pbMsgRsp)
            options.onhismsg(pbMsgRsp);
            break;
          case 'pb_msg_live_room.HistoryYXCommMsgRsp':
            // 获取直播间历史消息（10条消息）
            // console.log(`%c ${pbMsgRsp}-10条消息`, 'color:#67C23A')
            break;
          default:
            (0, _log.logMsg)(mySocket.debug, '\u5176\u5B83\u672A\u63A5\u6536\u7C7B\u578B\u6D88\u606F:-468:' + pbMsgRsp, 'low');
            try {
              options.onmsgs({
                type: pbMsgHead.pbName,
                body: (0, _util.parseMsg)(pbMsgRsp)
              });
            } catch (error) {}
            break;
        }
      };
    }
  };

  // 离线消息解析
  mySocket.decodeOffLineMsg = function (pbMsgHead) {
    // 二进制数据处理
    var pbMsgBuilder = _config2.default.pbMsgRoot.lookup(pbMsgHead.pbName);
    if (!pbMsgBuilder) {
      (0, _log.logMsg)(mySocket.debug, '\u79BB\u7EBF\u6D88\u606F\u89E3\u6790\u5931\u8D25:-468:' + pbMsgHead.pbName, 'warn');
      return;
    }
    // 消息解码
    var pbMsgRsp = pbMsgBuilder.decode(pbMsgHead.pbData);
    var msgObj = {};
    msgObj.pbCommData = {
      msgSn: pbMsgHead.sn,
      srcId: pbMsgHead.srcUserid.toNumber(),
      aimId: pbMsgHead.aimUserid.toNumber(),
      time: pbMsgHead.time.toNumber()
    };
    msgObj.text = pbMsgRsp.text;
    msgObj.data = pbMsgRsp.data ? pbMsgRsp.data : '';
    msgObj.chatType = pbMsgRsp.chatType ? pbMsgRsp.chatType : 0;
    msgObj.aimId = pbMsgRsp.aimUserId.toNumber();
    msgObj.state = 1;
    return msgObj;
  };

  mySocket.reConnectIm = function () {
    (0, _log.logMsg)(mySocket.debug, '\u65AD\u7F51\u6D4B\u8BD5\u91CD\u8FDE:-531', 'cur');
    clearInterval(mySocket.reconnectTimer);
    var recTime = (0, _util.GetCurLocalTime)();
    mySocket.reconnectTimer = setInterval(function () {
      (0, _network.netstatus)().then(function (res) {
        (0, _log.logMsg)(mySocket.debug, '\u6D4B\u8BD5\u7F51\u7EDC\uFF01\uFF01\uFF01:-537', 'cur');
        if (res) {
          if ((0, _util.GetCurLocalTime)() - recTime > 100) {
            // 退出直播间
            mySocket.roomId = '';
            clearInterval(mySocket.reconnectTimer);
            (0, _log.logMsg)(mySocket.debug, '\u65AD\u7F51\u65F6\u95F4\u8FC7\u957F\uFF0C\u9000\u51FA\u76F4\u64AD\u95F4:-541', 'cur');
            options.onliveroom({ type: 'error' });
          }
          (0, _log.logMsg)(mySocket.debug, '\u7F51\u7EDC\u597D\u4E86\uFF01\uFF01\uFF01:-544', 'cur');
          clearInterval(mySocket.reconnectTimer);
          options.onerror({
            code: 300,
            message: '网络重新连接成功'
          });
        }
      });
    }, 3000);
  };

  /**
   * 异常断开时，根据网络状态判断
   * 如果没有断网，说明是其它异常，则从新登录连接
   * 否则，进行断网重试，5s中监测一次网络状态，
   * 如果连接上网络
   */
  mySocket.onSocketClose = function (res) {
    // 用户主动调用
    if (mySocket.setStop) {
      return;
    }
    if (!mySocket.ifReset || mySocket.netState === _config2.default.NetState.NET_STATE_CLOSE) {
      // console.log('多端登录/心跳超时/登录超时/登录失败/连接关闭')
      mySocket.ifReset = true;
      mySocket.SetNetState(_config2.default.NetState.NET_STATE_CLOSE);
      return;
    } else {
      (0, _log.logMsg)(mySocket.debug, '\u8FDE\u63A5\u5173\u95ED\u4E86\uFF01\uFF01\uFF01\uFF01\uFF01\uFF01\uFF01:-567', 'error');
    }

    // 未连接成功，重新连接
    if (mySocket.netState <= _config2.default.NetState.NET_STATE_CONNECTING) {
      // console.log('未连接成功，重新连接')
      mySocket.SetNetState(_config2.default.NetState.NET_STATE_INIT);
      options.onclose(res);
      mySocket.Stop();
      options.onerror({
        code: 102,
        message: res
      });
      return;
    }

    if ((0, _util.GetCurLocalTime)() - mySocket.updateTime > 60) {
      // 大于60秒的重连重新计数
      mySocket.netCloseTimes = 1;
    } else {
      mySocket.netCloseTimes++;
    }

    if (mySocket.netCloseTimes > 3) {
      mySocket.netCloseTimes = 0;
    }
    (0, _network.netstatus)().then(function (res) {
      if (res) {
        mySocket.SetNetState(_config2.default.NetState.NET_STATE_INIT);
        options.onclose(res);
        // if (res.code === 1006) {
        mySocket.Stop();
        options.onerror({
          code: 300,
          message: res
        });
      } else {
        // 网络已经断开
        mySocket.SetNetState(_config2.default.NetState.NET_STATE_INIT);
        options.onclose(res);
        mySocket.Stop();
        mySocket.reConnectIm();
        options.onerror({ // 断网重连
          code: 301,
          message: '网络已经断开'
        });
      }
    });
  };

  mySocket.onSocketError = function (res) {
    // console.error('net => ws连接异常 socket error,close socket:' + res);
    // mySocket.wssClient.close();
    // mySocket.SetNetState(config.NetState.NET_STATE_INIT);
    // mySocket.Stop();
    // options.onerror({
    //   code: 300,
    //   message: res
    // });
  };

  mySocket.Stop = function (ifOwn) {
    if (mySocket.socketTimer === 0) {
      return;
    }

    clearInterval(mySocket.socketTimer);
    clearInterval(mySocket.roomTimer);
    mySocket.socketTimer = 0;
    // 如果用户主动调用关闭，则需要设为false
    if (ifOwn) {
      mySocket.setStop = true;
    } else {
      mySocket.setStop = false;
    }
    // console.warn('用户主动调用websocket关闭')
    mySocket.wssClient.close();
  };

  /**
   * 发送聊天消息，所有用户主动发送的消息，自己发送的消息需要标记状态
   * 用户发送的消息都有唯一的sn
   */
  mySocket.sendChatText = function (params, opts) {
    var jsonobj = {
      aimUserId: _config2.default.Long.fromValue(params.aimId, false),
      chatType: params.chatType, // 消息类型
      data: params.data, // 文件
      text: params.text
      // 扩展消息，发送礼物
    };if (params.exp) {
      jsonobj.exp = params.exp;
    }
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_gate.ChatText').create(jsonobj);
    var configs = {
      aimId: params.aimId
    };
    mySocket.SendPbMsg(true, 'gate', mySocket.account, pbMsg, opts, params.done, configs);
  };

  /**
   * 发送已读回执
   * params.time存在，表示将该时间之前的所有消息状态都修改
   */
  mySocket.sendMsgRead = function (params, opts) {
    var jsonobj = {
      state: params.state,
      time: params.time ? params.time : 0
    };
    if (jsonobj.time) {
      jsonobj.time = _config2.default.Long.fromValue(jsonobj.time, false);
    }
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_pub.MsgReceipt').create(jsonobj);
    var configs = {};
    if (params.aimId) {
      configs.aimId = params.aimId;
    }
    if (params.msgSn) {
      configs.msgSn = params.msgSn;
    }
    mySocket.SendPbMsg(false, 'gate', mySocket.account, pbMsg, opts, '', configs);
  };

  /**
   * 离线消息获取
   */
  mySocket.getOffLineMsg = function (params, opts) {
    var jsonobj = {
      time: params.time ? params.time : mySocket.offLineTime,
      userid: _config2.default.Long.fromValue(mySocket.account, false),
      num: params.num // 请求的消息数
    };
    if (jsonobj.time) {
      jsonobj.time = _config2.default.Long.fromValue(jsonobj.time, false);
    }
    if (jsonobj.num) {
      jsonobj.num = _config2.default.Long.fromValue(jsonobj.num, false);
    }
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_offlineMsg.ReadOfflineMsgReq').create(jsonobj);
    mySocket.SendPbMsg(true, 'offline_msg', mySocket.account, pbMsg, opts);
  };

  /**
   * 添加/移除黑名单
   */
  mySocket.markInBlackList = function (params, opts) {
    var jsonobj = {
      srcUserid: _config2.default.Long.fromValue(params.srcId, false),
      aimUserid: _config2.default.Long.fromValue(params.aimId, false)
    };
    var pbMsg = '';
    if (params.type === 'in') {
      pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_blackList.SaveBlackListReq').create(jsonobj);
    } else {
      pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_blackList.DeleteBlackListReq').create(jsonobj);
    }
    var configs = {
      aimId: params.aimId
    };
    mySocket.SendPbMsg(true, 'black_list', mySocket.account, pbMsg, opts, '', configs);
  };

  /**
   * 读取黑名单列表
   */
  mySocket.readBlackList = function (opts) {
    var jsonobj = {
      srcUserid: _config2.default.Long.fromValue(mySocket.account, false)
    };
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_blackList.ReadBlackListReq').create(jsonobj);
    mySocket.SendPbMsg(true, 'black_list', mySocket.account, pbMsg, opts);
  };
  /**
   * 是否在黑名单列表中
   */
  mySocket.judgeBlackList = function (params, opts) {
    var jsonobj = {
      srcUserid: _config2.default.Long.fromValue(mySocket.account, false),
      aimUserid: _config2.default.Long.fromValue(params.aimId, false)
    };
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_blackList.JudgeBlackListReq').create(jsonobj);

    mySocket.SendPbMsg(true, 'black_list', mySocket.account, pbMsg, opts);
  };

  /**
   * 聊天室连接，roomId = aimId
   * 通用消息里面的 aimId 也代表roomId
   */
  mySocket.enterLiveRoom = function (params, opts) {
    var jsonobj = {};
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_pub.EnterRoomReq').create(jsonobj);
    var configs = {
      aimId: params.roomId
    };
    mySocket.roomId = params.roomId;
    if (!mySocket.roomId || mySocket.roomId === 'undefined' || mySocket.roomId === 'null') {
      mySocket.Stop();
      options.onerror({
        message: 'roomId不存在，重新登录',
        code: 101 // java重新获取token
      });
      return;
    }
    mySocket.SendPbMsg(true, 'live_room', mySocket.roomId, pbMsg, opts, '', configs);
  };
  /**
   * 断开聊天室
   */
  mySocket.leaveLiveRoom = function (params, opts) {
    var jsonobj = {};
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_pub.ExitRoomReq').create(jsonobj);
    var configs = {
      aimId: params.roomId
    };
    mySocket.SendPbMsg(true, 'live_room', mySocket.roomId, pbMsg, opts, '', configs);
  };

  /**
   * 发送聊天室消息
   */
  mySocket.sendLiveRoomMsg = function (params, opts) {
    if (!mySocket.roomId) {
      // 聊天室不存在，则不发送消息，只有自己能看到，实际不会发送出去
      // console.log('登录聊天室，返回50，聊天室不存在')
      return;
    }
    var jsonobj = {
      MessageType: params.MessageType,
      MessageBody: params.MessageBody,
      IsImMessage: params.IsImMessage
    };
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_pub.YXCommMsg').create(jsonobj);
    var configs = {
      aimId: params.roomId
      // console.log('发送聊天室消息:房间Id', configs);
    };mySocket.SendPbMsg(true, 'live_room', mySocket.roomId, pbMsg, opts, params.done, configs);
  };

  mySocket.reloadRoomMsg = function (params, opts) {
    // if (!mySocket.roomId) {
    //   // 聊天室不存在，则不发送消息，只有自己能看到，实际不会发送出去
    //   console.log('聊天室不存在，断网重连请求历史消息')
    //   return
    // }
    var jsonobj = {
      sn: mySocket.msgSn
    };
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_live_room.ReloadYXCommMsgReq').create(jsonobj);
    var configs = {
      aimId: params.roomId
    };
    mySocket.SendPbMsg(true, 'live_room', mySocket.roomId, pbMsg, opts, params.done, configs);
  };

  // 历史消息（10条）
  mySocket.hisRoomMsg = function (params, opts) {
    // if (!mySocket.roomId) {
    //   // 聊天室不存在，则不发送消息，只有自己能看到，实际不会发送出去
    //   console.log('聊天室不存在，断网重连请求历史消息')
    //   return
    // }
    var jsonobj = {};
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_live_room.HistoryYXCommMsgReq').create(jsonobj);
    var configs = {
      aimId: params.roomId
    };
    mySocket.SendPbMsg(true, 'live_room', mySocket.roomId, pbMsg, opts, params.done, configs);
  };

  // 进房间成功触发请求
  mySocket.EnterRoomReadyReq = function (params, opts) {
    if (!mySocket.roomId) {
      return;
    }
    var jsonobj = {};
    var pbMsg = _config2.default.pbMsgRoot.lookup('.pb_msg_live_room.EnterRoomReadyReq').create(jsonobj);
    var configs = {
      aimId: mySocket.roomId
    };
    mySocket.SendPbMsg(false, 'live_room', mySocket.roomId, pbMsg, opts, '', configs);
  };

  // 房间消息: 观众进房间,弹幕消息
  mySocket.sendRoomMsg = function (params, opts) {
    if (!mySocket.roomId) {
      console.log('%c \u89C2\u4F17\u8FDB\u623F\u95F4\u6D88\u606F\uFF0C\u804A\u5929\u5BA4roomId\u4E0D\u5B58\u5728', 'color:#FF7F24');
      return;
    }
    var sendmsg = JSON.parse(JSON.stringify(params.body));
    var jsonobj = (0, _util.packMsgObj)(params.body);
    // '.pb_msg_live_room.AudienceEnterRoom'
    // '.pb_msg_live_room.RoomBarrage'
    // '.pb_msg_live_room.RoomNormal'
    // '.pb_msg_live_room.RoomAction'
    var pbMsg = _config2.default.pbMsgRoot.lookup(params.name).create(jsonobj);
    var configs = {
      aimId: mySocket.roomId
    };
    mySocket.SendPbMsg(false, 'live_room', mySocket.roomId, pbMsg, opts, params.done, configs, {
      name: params.name,
      body: sendmsg
    });
  };

  /**
   * 消息发送
   * @param {boolean} needReadReceipt 消息是否需要回执
   * @param {string} service 服务名
   * @param {(string|number)} hashKey 服务
   * @param {Object} pbMsg 消息体
   * @param {(Object)} opts 配置项
   * @param {function} done 回调函数
   * @param {Object} configs 回执数据
   * @param {Object} originMsg 原始数据
   *
   */
  mySocket.SendPbMsg = function (needReadReceipt, service, hashKey, pbMsg, opts, done, configs, originMsg) {
    var builder = _config2.default.pbMsgRoot.lookup(pbMsg.$type.fullName);
    var pbMsgHead = _config2.default.pbMsgHeadBuilder.create({
      service: service,
      hashKey: String(hashKey),
      pbName: pbMsg.$type.fullName.slice(1, pbMsg.$type.fullName.length),
      pbCommData: {
        // serviceType: service,
        // needReadReceipt: needReadReceipt,
        // srcId: config.Long.fromValue(mySocket.account, false),
        time: _config2.default.Long.fromValue((0, _util.GetCurLocalTime)() + mySocket.timeDiffer, false)
      }
    });
    if (mySocket.account) {
      pbMsgHead.pbCommData.srcId = _config2.default.Long.fromValue(mySocket.account, false);
    }
    // 房间消息不需要回执字段
    if (service !== 'live_room') {
      pbMsgHead.pbCommData.needReadReceipt = needReadReceipt;
    }
    switch (service) {
      case 'gate':
        pbMsgHead.pbCommData.serviceType = 0;
        break;
      case 'user_center':
        pbMsgHead.pbCommData.serviceType = 1;
        break;
      case 'chat':
        pbMsgHead.pbCommData.serviceType = 3;
        break;
      case 'live_room':
        pbMsgHead.pbCommData.serviceType = 6;
        break;
      case 'msg_analyze':
        pbMsgHead.pbCommData.serviceType = 18;
        break;
      default:
        break;
    }
    if (configs && configs.aimId) {
      pbMsgHead.pbCommData.aimId = _config2.default.Long.fromValue(configs.aimId, false);
    } else {
      // pbMsgHead.pbCommData.aimId = config.Long.fromValue(0, false);
    }
    if (configs && configs.msgSn) {
      pbMsgHead.pbCommData.msgSn = _config2.default.Long.fromValue(configs.msgSn, false);
    } else {
      // console.log(mySocket.msgSn.toString(), '發送的消息msgsn :::::::::::::::::::::::::::')
      mySocket.msgSn = mySocket.msgSn.add(1);
      pbMsgHead.pbCommData.msgSn = mySocket.msgSn;
    }

    if (opts) {
      pbMsgHead.opts = opts;
    }
    pbMsgHead.pbData = builder.encode(pbMsg).finish();
    var buf = _config2.default.pbMsgHeadBuilder.encode(pbMsgHead).finish();
    if (mySocket.wssClient) {
      mySocket.wssClient.send(buf);
    }

    // if (pbMsgHead.pbName.indexOf('pb_msg_live_room') !== -1 && done) {
    //   originMsg.body = originMsg.body
    //   done('发送成功', originMsg)
    // } else if (pbMsgHead.pbName !== '.pb_pub.HeartBeat' && done) {
    //   var msgObj = {}
    //   msgObj.pbMsg = pbMsg
    //   msgObj.state = 0
    //   msgObj.pbCommData = pbMsgHead.pbCommData
    //   msgObj.pbCommData = parseLong(msgObj.pbCommData)
    //   // console.log(pbMsg, '999999999999999999996')
    //   done('发送成功', msgObj)
    // }

    // 最终发送的pb数据
    if (pbMsgHead.pbName !== 'pb_pub.HeartBeat') {}
    // console.log(pbMsgHead, '最终发送的消息头')
    // console.log(pbMsg, '消息体');

    // if (pbMsgHead.pbName === '.pb_msg_gate.ChatText') {
    //   mySocket.messageQueue[pbMsg.msgHead.msgSn].state = 1
    // }

    //   // 加入队列
    //   mySocket.offlineBufMsgQue.push(pb);
    //   console.log("net => net state now:" + mySocket.netState + " push to offline que!!!!!")
  };

  // console.log(`%c ${msg}`, 'color:#67C23A')
  mySocket.initConnect(options);
  return mySocket;
}

module.exports = getInstance;
// export default getInstance

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.GetCurLocalTime = GetCurLocalTime;
exports.parseLong = parseLong;
exports.parseMsg = parseMsg;
exports.parseGift = parseGift;
exports.packMsgObj = packMsgObj;
var Long = __webpack_require__(8);
// 获取当前本地时间(秒)
function GetCurLocalTime() {
  return parseInt(new Date().valueOf() / 1000);
}
// 解析返回的消息
function parseLong(originObj) {
  var parseObj = Object.assign(originObj, {});
  parseObj.srcId = parseObj.srcId ? parseObj.srcId.toNumber() : parseObj.srcId;
  parseObj.aimId = parseObj.aimId ? parseObj.aimId.toNumber() : parseObj.aimId;
  parseObj.time = parseObj.time ? parseObj.time.toNumber() : parseObj.time;
  // parseObj.msgSn = parseObj.msgSn
  return parseObj;
}
// 解析礼物消息体
function parseMsg(originMsg) {
  if ((typeof originMsg === 'undefined' ? 'undefined' : _typeof(originMsg)) === 'object') {
    var parseObj = Object.assign(originMsg, {});
    var keysArr = Object.keys(parseObj);
    var parseStrArr = ['userId'];
    keysArr.map(function (e) {
      if (parseStrArr.indexOf(e) !== -1) {
        parseObj[e] = parseObj[e].toString();
      } else {
        if (Long.isLong(parseObj[e])) {
          parseObj[e] = parseObj[e].toNumber();
        } else {
          if (typeof parseObj[e] === 'number') {
            parseObj[e] = parseObj[e];
          } else {
            if (e === 'batteryTypeList') {
              // 幸运礼物中奖次数
              parseObj[e].map(function (item, index) {
                if (Long.isLong(item)) {
                  parseObj[e][index] = item.toNumber();
                }
              });
            }
            if (e === 'pkScore') {
              // 幸运礼物中奖次数
              var pkScoreKeysArr = Object.keys(parseObj[e]);
              var scoreval = parseObj[e][pkScoreKeysArr[0]];
              if (Long.isLong(scoreval)) {
                scoreval = parseObj[e][pkScoreKeysArr[0]].toNumber();
              }
              var scorekey = pkScoreKeysArr[0];
              if (Long.isLong(pkScoreKeysArr[0])) {
                scorekey = pkScoreKeysArr[0].toNumber();
              }
              parseObj[e][scorekey] = scoreval;
            }
            if (e === 'targetUserId') {
              // 被@的用户ID列表
              parseObj[e].map(function (item, index) {
                if (Long.isLong(item)) {
                  parseObj[e][index] = item.toNumber();
                }
              });
            }
            if (e === 'userProp') {
              parseObj[e] = parseMsg(parseObj[e]);
            }
            if (e === 'peer') {
              parseObj[e] = parseMsg(parseObj[e]);
            }
            if (e === 'mvp') {
              parseObj[e] = parseMsg(parseObj[e]);
            }
          }
        }
      }
    });
    return parseObj;
  } else {
    return originMsg;
  }
}

function parseGift(originMsg) {
  if ((typeof originMsg === 'undefined' ? 'undefined' : _typeof(originMsg)) === 'object') {
    var parseObj = Object.assign(originMsg, {});
    var keysArr = Object.keys(parseObj);
    keysArr.map(function (e) {
      try {
        if (e === 'gift') {
          parseObj[e] = parseMsg(parseObj[e]);
        } else if (e === 'receivers') {
          parseObj[e].map(function (item, index) {
            parseObj[e][index] = parseMsg(item);
          });
        } else if (e === 'sender') {
          parseObj[e] = parseMsg(parseObj[e]);
        }
      } catch (error) {
        console.log(error, '解析礼物失败');
      }
    });
    return parseObj;
  } else {
    return originMsg;
  }
}
// 封装消息体
function packMsgObj(originMsg) {
  var int64Arr = ['userStatus', 'userCurrentExperience', 'giftId', 'giftNumber', 'sendDegree', 'userId', 'giftConfLastUpdateTime'];
  if ((typeof originMsg === 'undefined' ? 'undefined' : _typeof(originMsg)) === 'object') {
    var _parseMsg = Object.assign(originMsg, {});
    var keysArr = Object.keys(_parseMsg);
    keysArr.map(function (e) {
      if (int64Arr.indexOf(e) !== -1) {
        _parseMsg[e] = Long.fromValue(_parseMsg[e]);
      } else {
        if (e === 'targetUserId') {
          // 被@的用户列表 []
          _parseMsg[e].map(function (item, index) {
            _parseMsg[e][index] = Long.fromValue(item);
          });
        }
        if (e === 'userProp') {
          _parseMsg[e] = packMsgObj(_parseMsg[e]);
        }
      }
    });
    return _parseMsg;
  } else {
    return originMsg;
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var protobuf = __webpack_require__(32);
var Long = __webpack_require__(8);
var awesomeConfig = __webpack_require__(28);
var config = {
  NetState: {
    NET_STATE_INIT: 0, // 初始状态
    NET_STATE_CONNECTING: 1, // 链接中
    NET_STATE_OPEN: 2, // 链接成功
    NET_STATE_AUTHING: 3, // 认证中
    NET_STATE_AUTHED: 4, // 认证完成
    NET_STATE_CLOSE: 5 // 需要手动连接(多端登录被踢)
  },
  RoomState: {
    ROOM_INIT: 0, // 0 初始状态 1 直播状态 2/3 主播/观众连麦 4 PK状态 5 结束状态
    ROOM_LIVE: 1,
    ROOM_CLOSE: 5
  },
  globalData: {},
  Long: Long
  /**
   * err 错误信息
   * root 加载的文件信息
   */
};protobuf.util.Long = Long;
protobuf.configure();
config.pbMsgRoot = protobuf.Root.fromJSON(awesomeConfig);
config.pbMsgHeadBuilder = config.pbMsgRoot.lookup('PBMessage');
exports.default = config;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// full library entry point.


module.exports = __webpack_require__(33);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = module.exports = __webpack_require__(34);

protobuf.build = "full";

// Parser
protobuf.tokenize         = __webpack_require__(27);
protobuf.parse            = __webpack_require__(48);
protobuf.common           = __webpack_require__(49);

// Configure parser
protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = module.exports = __webpack_require__(35);

protobuf.build = "light";

/**
 * A node-style callback as used by {@link load} and {@link Root#load}.
 * @typedef LoadCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Root} [root] Root, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} root Root namespace, defaults to create a new one if omitted.
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 */
function load(filename, root, callback) {
    if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback);
}

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @see {@link Root#load}
 * @variation 3
 */
// function load(filename:string, [root:Root]):Promise<Root>

protobuf.load = load;

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 * @see {@link Root#loadSync}
 */
function loadSync(filename, root) {
    if (!root)
        root = new protobuf.Root();
    return root.loadSync(filename);
}

protobuf.loadSync = loadSync;

// Serialization
protobuf.encoder          = __webpack_require__(22);
protobuf.decoder          = __webpack_require__(23);
protobuf.verifier         = __webpack_require__(24);
protobuf.converter        = __webpack_require__(25);

// Reflection
protobuf.ReflectionObject = __webpack_require__(4);
protobuf.Namespace        = __webpack_require__(6);
protobuf.Root             = __webpack_require__(16);
protobuf.Enum             = __webpack_require__(1);
protobuf.Type             = __webpack_require__(11);
protobuf.Field            = __webpack_require__(3);
protobuf.OneOf            = __webpack_require__(7);
protobuf.MapField         = __webpack_require__(12);
protobuf.Service          = __webpack_require__(13);
protobuf.Method           = __webpack_require__(14);

// Runtime
protobuf.Message          = __webpack_require__(15);
protobuf.wrappers         = __webpack_require__(26);

// Utility
protobuf.types            = __webpack_require__(5);
protobuf.util             = __webpack_require__(0);

// Configure reflection
protobuf.ReflectionObject._configure(protobuf.Root);
protobuf.Namespace._configure(protobuf.Type, protobuf.Service);
protobuf.Root._configure(protobuf.Type);
protobuf.Field._configure(protobuf.Type);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(9);
protobuf.BufferWriter = __webpack_require__(42);
protobuf.Reader       = __webpack_require__(10);
protobuf.BufferReader = __webpack_require__(43);

// Utility
protobuf.util         = __webpack_require__(2);
protobuf.rpc          = __webpack_require__(20);
protobuf.roots        = __webpack_require__(21);
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}

// Configure serialization
protobuf.Writer._configure(protobuf.BufferWriter);
configure();


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(2);

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(9);
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(2);

var Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                           // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
    };

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(10);
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(2);

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

/* istanbul ignore else */
if (util.Buffer)
    BufferReader.prototype._slice = util.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(2);

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = codegen;

/**
 * Begins generating a function.
 * @memberof util
 * @param {string[]} functionParams Function parameter names
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 */
function codegen(functionParams, functionName) {

    /* istanbul ignore if */
    if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = undefined;
    }

    var body = [];

    /**
     * Appends code to the function's body or finishes generation.
     * @typedef Codegen
     * @type {function}
     * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
     * @param {...*} [formatParams] Format parameters
     * @returns {Codegen|Function} Itself or the generated function if finished
     * @throws {Error} If format parameter counts do not match
     */

    function Codegen(formatStringOrScope) {
        // note that explicit array handling below makes this ~50% faster

        // finish the function
        if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose)
                console.log("codegen: " + source); // eslint-disable-line no-console
            source = "return " + source;
            if (formatStringOrScope) {
                var scopeKeys   = Object.keys(formatStringOrScope),
                    scopeParams = new Array(scopeKeys.length + 1),
                    scopeValues = new Array(scopeKeys.length),
                    scopeOffset = 0;
                while (scopeOffset < scopeKeys.length) {
                    scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                    scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
                }
                scopeParams[scopeOffset] = source;
                return Function.apply(null, scopeParams).apply(null, scopeValues); // eslint-disable-line no-new-func
            }
            return Function(source)(); // eslint-disable-line no-new-func
        }

        // otherwise append to body
        var formatParams = new Array(arguments.length - 1),
            formatOffset = 0;
        while (formatOffset < formatParams.length)
            formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];
            switch ($1) {
                case "d": case "f": return String(Number(value));
                case "i": return String(Math.floor(value));
                case "j": return JSON.stringify(value);
                case "s": return String(value);
            }
            return "%";
        });
        if (formatOffset !== formatParams.length)
            throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
    }

    function toString(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
    }

    Codegen.toString = toString;
    return Codegen;
}

/**
 * Begins generating a function.
 * @memberof util
 * @function codegen
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 * @variation 2
 */

/**
 * When set to `true`, codegen will log generated code to console. Useful for debugging.
 * @name util.codegen.verbose
 * @type {boolean}
 */
codegen.verbose = false;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = fetch;

var asPromise = __webpack_require__(18),
    inquire   = __webpack_require__(19);

var fs = inquire("fs");

/**
 * Node-style callback as used by {@link util.fetch}.
 * @typedef FetchCallback
 * @type {function}
 * @param {?Error} error Error, if any, otherwise `null`
 * @param {string} [contents] File contents, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Options as used by {@link util.fetch}.
 * @typedef FetchOptions
 * @type {Object}
 * @property {boolean} [binary=false] Whether expecting a binary response
 * @property {boolean} [xhr=false] If `true`, forces the use of XMLHttpRequest
 */

/**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} filename File path or url
 * @param {FetchOptions} options Fetch options
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 */
function fetch(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    } else if (!options)
        options = {};

    if (!callback)
        return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this

    // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.
    if (!options.xhr && fs && fs.readFile)
        return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
            return err && typeof XMLHttpRequest !== "undefined"
                ? fetch.xhr(filename, options, callback)
                : err
                ? callback(err)
                : callback(null, options.binary ? contents : contents.toString("utf8"));
        });

    // use the XHR version otherwise.
    return fetch.xhr(filename, options, callback);
}

/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */

/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchOptions} [options] Fetch options
 * @returns {Promise<string|Uint8Array>} Promise
 * @variation 3
 */

/**/
fetch.xhr = function fetch_xhr(filename, options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange /* works everywhere */ = function fetchOnReadyStateChange() {

        if (xhr.readyState !== 4)
            return undefined;

        // local cors security errors return status 0 / empty string, too. afaik this cannot be
        // reliably distinguished from an actually empty file for security reasons. feel free
        // to send a pull request if you are aware of a solution.
        if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));

        // if binary data is expected, make sure that some sort of array is returned, even if
        // ArrayBuffers are not supported. the binary string fallback, however, is unsafe.
        if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
                buffer = [];
                for (var i = 0; i < xhr.responseText.length; ++i)
                    buffer.push(xhr.responseText.charCodeAt(i) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
        }
        return callback(null, xhr.responseText);
    };

    if (options.binary) {
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Receiving_binary_data_in_older_browsers
        if ("overrideMimeType" in xhr)
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.responseType = "arraybuffer";
    }

    xhr.open("GET", filename);
    xhr.send();
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal path module to resolve Unix, Windows and URL paths alike.
 * @memberof util
 * @namespace
 */
var path = exports;

var isAbsolute =
/**
 * Tests if the specified path is absolute.
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */
path.isAbsolute = function isAbsolute(path) {
    return /^(?:\/|\w+:)/.test(path);
};

var normalize =
/**
 * Normalizes the specified path.
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */
path.normalize = function normalize(path) {
    path = path.replace(/\\/g, "/")
               .replace(/\/{2,}/g, "/");
    var parts    = path.split("/"),
        absolute = isAbsolute(path),
        prefix   = "";
    if (absolute)
        prefix = parts.shift() + "/";
    for (var i = 0; i < parts.length;) {
        if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..")
                parts.splice(--i, 2);
            else if (absolute)
                parts.splice(i, 1);
            else
                ++i;
        } else if (parts[i] === ".")
            parts.splice(i, 1);
        else
            ++i;
    }
    return prefix + parts.join("/");
};

/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path to the origin file
 * @param {string} includePath Include path relative to origin path
 * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
 * @returns {string} Path to the include file
 */
path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
    if (!alreadyNormalized)
        includePath = normalize(includePath);
    if (isAbsolute(includePath))
        return includePath;
    if (!alreadyNormalized)
        originPath = normalize(originPath);
    return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = parse;

parse.filename = null;
parse.defaults = { keepCase: false };

var tokenize  = __webpack_require__(27),
    Root      = __webpack_require__(16),
    Type      = __webpack_require__(11),
    Field     = __webpack_require__(3),
    MapField  = __webpack_require__(12),
    OneOf     = __webpack_require__(7),
    Enum      = __webpack_require__(1),
    Service   = __webpack_require__(13),
    Method    = __webpack_require__(14),
    types     = __webpack_require__(5),
    util      = __webpack_require__(0);

var base10Re    = /^[1-9][0-9]*$/,
    base10NegRe = /^-?[1-9][0-9]*$/,
    base16Re    = /^0[x][0-9a-fA-F]+$/,
    base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
    base8Re     = /^0[0-7]+$/,
    base8NegRe  = /^-?0[0-7]+$/,
    numberRe    = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
    nameRe      = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    typeRefRe   = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
    fqTypeRefRe = /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/;

/**
 * Result object returned from {@link parse}.
 * @interface IParserResult
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
 * @property {Root} root Populated root instance
 */

/**
 * Options modifying the behavior of {@link parse}.
 * @interface IParseOptions
 * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
 */

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} root Root to populate
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 */
function parse(source, root, options) {
    /* eslint-disable callback-return */
    if (!(root instanceof Root)) {
        options = root;
        root = new Root();
    }
    if (!options)
        options = parse.defaults;

    var tn = tokenize(source),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        cmnt = tn.cmnt;

    var head = true,
        pkg,
        imports,
        weakImports,
        syntax,
        isProto3 = false;

    var ptr = root;

    var applyCase = options.keepCase ? function(name) { return name; } : util.camelCase;

    /* istanbul ignore next */
    function illegal(token, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch)
            parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
    }

    function readString() {
        var values = [],
            token;
        do {
            /* istanbul ignore if */
            if ((token = next()) !== "\"" && token !== "'")
                throw illegal(token);

            values.push(next());
            skip(token);
            token = peek();
        } while (token === "\"" || token === "'");
        return values.join("");
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (token) {
            case "'":
            case "\"":
                push(token);
                return readString();
            case "true": case "TRUE":
                return true;
            case "false": case "FALSE":
                return false;
        }
        try {
            return parseNumber(token, /* insideTryCatch */ true);
        } catch (e) {

            /* istanbul ignore else */
            if (acceptTypeRef && typeRefRe.test(token))
                return token;

            /* istanbul ignore next */
            throw illegal(token, "value");
        }
    }

    function readRanges(target, acceptStrings) {
        var token, start;
        do {
            if (acceptStrings && ((token = peek()) === "\"" || token === "'"))
                target.push(readString());
            else
                target.push([ start = parseId(next()), skip("to", true) ? parseId(next()) : start ]);
        } while (skip(",", true));
        skip(";");
    }

    function parseNumber(token, insideTryCatch) {
        var sign = 1;
        if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
        }
        switch (token) {
            case "inf": case "INF": case "Inf":
                return sign * Infinity;
            case "nan": case "NAN": case "Nan": case "NaN":
                return NaN;
            case "0":
                return 0;
        }
        if (base10Re.test(token))
            return sign * parseInt(token, 10);
        if (base16Re.test(token))
            return sign * parseInt(token, 16);
        if (base8Re.test(token))
            return sign * parseInt(token, 8);

        /* istanbul ignore else */
        if (numberRe.test(token))
            return sign * parseFloat(token);

        /* istanbul ignore next */
        throw illegal(token, "number", insideTryCatch);
    }

    function parseId(token, acceptNegative) {
        switch (token) {
            case "max": case "MAX": case "Max":
                return 536870911;
            case "0":
                return 0;
        }

        /* istanbul ignore if */
        if (!acceptNegative && token.charAt(0) === "-")
            throw illegal(token, "id");

        if (base10NegRe.test(token))
            return parseInt(token, 10);
        if (base16NegRe.test(token))
            return parseInt(token, 16);

        /* istanbul ignore else */
        if (base8NegRe.test(token))
            return parseInt(token, 8);

        /* istanbul ignore next */
        throw illegal(token, "id");
    }

    function parsePackage() {

        /* istanbul ignore if */
        if (pkg !== undefined)
            throw illegal("package");

        pkg = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(pkg))
            throw illegal(pkg, "name");

        ptr = ptr.define(pkg);
        skip(";");
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
            case "public":
                next();
                // eslint-disable-line no-fallthrough
            default:
                whichImports = imports || (imports = []);
                break;
        }
        token = readString();
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";

        /* istanbul ignore if */
        if (!isProto3 && syntax !== "proto2")
            throw illegal(syntax, "syntax");

        skip(";");
    }

    function parseCommon(parent, token) {
        switch (token) {

            case "option":
                parseOption(parent, token);
                skip(";");
                return true;

            case "message":
                parseType(parent, token);
                return true;

            case "enum":
                parseEnum(parent, token);
                return true;

            case "service":
                parseService(parent, token);
                return true;

            case "extend":
                parseExtension(parent, token);
                return true;
        }
        return false;
    }

    function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
            obj.comment = cmnt(); // try block-type comment
            obj.filename = parse.filename;
        }
        if (skip("{", true)) {
            var token;
            while ((token = next()) !== "}")
                fnIf(token);
            skip(";", true);
        } else {
            if (fnElse)
                fnElse();
            skip(";");
            if (obj && typeof obj.comment !== "string")
                obj.comment = cmnt(trailingLine); // try line-type comment if no block
        }
    }

    function parseType(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "type name");

        var type = new Type(token);
        ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token))
                return;

            switch (token) {

                case "map":
                    parseMapField(type, token);
                    break;

                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                case "oneof":
                    parseOneOf(type, token);
                    break;

                case "extensions":
                    readRanges(type.extensions || (type.extensions = []));
                    break;

                case "reserved":
                    readRanges(type.reserved || (type.reserved = []), true);
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(token);

                    push(token);
                    parseField(type, "optional");
                    break;
            }
        });
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
            parseGroup(parent, rule);
            return;
        }

        /* istanbul ignore if */
        if (!typeRefRe.test(type))
            throw illegal(type, "type");

        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        name = applyCase(name);
        skip("=");

        var field = new Field(name, parseId(next()), type, rule, extend);
        ifBlock(field, function parseField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal(token);

        }, function parseField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);

        // JSON defaults to packed=true if not set so we have to set packed=false explicity when
        // parsing proto2 descriptors without the option, where applicable. This must be done for
        // all known packable types and anything that could be an enum (= is not a basic type).
        if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined))
            field.setOption("packed", false, /* ifNotSet */ true);
    }

    function parseGroup(parent, rule) {
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        var fieldName = util.lcFirst(name);
        if (name === fieldName)
            name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token) {
            switch (token) {

                case "option":
                    parseOption(type, token);
                    skip(";");
                    break;

                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                /* istanbul ignore next */
                default:
                    throw illegal(token); // there are no groups with proto3 semantics
            }
        });
        parent.add(type)
              .add(field);
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();

        /* istanbul ignore if */
        if (types.mapKey[keyType] === undefined)
            throw illegal(keyType, "type");

        skip(",");
        var valueType = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(valueType))
            throw illegal(valueType, "type");

        skip(">");
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        skip("=");
        var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
        ifBlock(field, function parseMapField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal(token);

        }, function parseMapField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);
    }

    function parseOneOf(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var oneof = new OneOf(applyCase(token));
        ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
                parseOption(oneof, token);
                skip(";");
            } else {
                push(token);
                parseField(oneof, "optional");
            }
        });
        parent.add(oneof);
    }

    function parseEnum(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var enm = new Enum(token);
        ifBlock(enm, function parseEnum_block(token) {
            if (token === "option") {
                parseOption(enm, token);
                skip(";");
            } else
                parseEnumValue(enm, token);
        });
        parent.add(enm);
    }

    function parseEnumValue(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token))
            throw illegal(token, "name");

        skip("=");
        var value = parseId(next(), true),
            dummy = {};
        ifBlock(dummy, function parseEnumValue_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(dummy, token); // skip
                skip(";");
            } else
                throw illegal(token);

        }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
        });
        parent.add(token, value, dummy.comment);
    }

    function parseOption(parent, token) {
        var isCustom = skip("(", true);

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token, "name");

        var name = token;
        if (isCustom) {
            skip(")");
            name = "(" + name + ")";
            token = peek();
            if (fqTypeRefRe.test(token)) {
                name += token;
                next();
            }
        }
        skip("=");
        parseOptionValue(parent, name);
    }

    function parseOptionValue(parent, name) {
        if (skip("{", true)) { // { a: "foo" b { c: "bar" } }
            do {
                /* istanbul ignore if */
                if (!nameRe.test(token = next()))
                    throw illegal(token, "name");

                if (peek() === "{")
                    parseOptionValue(parent, name + "." + token);
                else {
                    skip(":");
                    setOption(parent, name + "." + token, readValue(true));
                }
            } while (!skip("}", true));
        } else
            setOption(parent, name, readValue(true));
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
    }

    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
        }
        return parent;
    }

    function parseService(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "service name");

        var service = new Service(token);
        ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token))
                return;

            /* istanbul ignore else */
            if (token === "rpc")
                parseMethod(service, token);
            else
                throw illegal(token);
        });
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var name = token,
            requestType, requestStream,
            responseType, responseStream;

        skip("(");
        if (skip("stream", true))
            requestStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token);

        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (skip("stream", true))
            responseStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token);

        responseType = token;
        skip(")");

        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        ifBlock(method, function parseMethod_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(method, token);
                skip(";");
            } else
                throw illegal(token);

        });
        parent.add(method);
    }

    function parseExtension(parent, token) {

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token, "reference");

        var reference = token;
        ifBlock(null, function parseExtension_block(token) {
            switch (token) {

                case "required":
                case "repeated":
                case "optional":
                    parseField(parent, token, reference);
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(token);
                    push(token);
                    parseField(parent, "optional", reference);
                    break;
            }
        });
    }

    var token;
    while ((token = next()) !== null) {
        switch (token) {

            case "package":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parsePackage();
                break;

            case "import":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseImport();
                break;

            case "syntax":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseSyntax();
                break;

            case "option":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseOption(ptr, token);
                skip(";");
                break;

            default:

                /* istanbul ignore else */
                if (parseCommon(ptr, token)) {
                    head = false;
                    continue;
                }

                /* istanbul ignore next */
                throw illegal(token);
        }
    }

    parse.filename = null;
    return {
        "package"     : pkg,
        "imports"     : imports,
         weakImports  : weakImports,
         syntax       : syntax,
         root         : root
    };
}

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @name parse
 * @function
 * @param {string} source Source contents
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 * @variation 2
 */


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = common;

var commonRe = /\/|\./;

/**
 * Provides common type definitions.
 * Can also be used to provide additional google types or your own custom types.
 * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
 * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
 * @returns {undefined}
 * @property {INamespace} google/protobuf/any.proto Any
 * @property {INamespace} google/protobuf/duration.proto Duration
 * @property {INamespace} google/protobuf/empty.proto Empty
 * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
 * @property {INamespace} google/protobuf/timestamp.proto Timestamp
 * @property {INamespace} google/protobuf/wrappers.proto Wrappers
 * @example
 * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
 * protobuf.common("descriptor", descriptorJson);
 *
 * // manually provides a custom definition (uses my.foo namespace)
 * protobuf.common("my/foo/bar.proto", myFooBarJson);
 */
function common(name, json) {
    if (!commonRe.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
    }
    common[name] = json;
}

// Not provided because of limited use (feel free to discuss or to provide yourself):
//
// google/protobuf/descriptor.proto
// google/protobuf/field_mask.proto
// google/protobuf/source_context.proto
// google/protobuf/type.proto
//
// Stripped and pre-parsed versions of these non-bundled files are instead available as part of
// the repository or package within the google/protobuf directory.

common("any", {

    /**
     * Properties of a google.protobuf.Any message.
     * @interface IAny
     * @type {Object}
     * @property {string} [typeUrl]
     * @property {Uint8Array} [bytes]
     * @memberof common
     */
    Any: {
        fields: {
            type_url: {
                type: "string",
                id: 1
            },
            value: {
                type: "bytes",
                id: 2
            }
        }
    }
});

var timeType;

common("duration", {

    /**
     * Properties of a google.protobuf.Duration message.
     * @interface IDuration
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */
    Duration: timeType = {
        fields: {
            seconds: {
                type: "int64",
                id: 1
            },
            nanos: {
                type: "int32",
                id: 2
            }
        }
    }
});

common("timestamp", {

    /**
     * Properties of a google.protobuf.Timestamp message.
     * @interface ITimestamp
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */
    Timestamp: timeType
});

common("empty", {

    /**
     * Properties of a google.protobuf.Empty message.
     * @interface IEmpty
     * @memberof common
     */
    Empty: {
        fields: {}
    }
});

common("struct", {

    /**
     * Properties of a google.protobuf.Struct message.
     * @interface IStruct
     * @type {Object}
     * @property {Object.<string,IValue>} [fields]
     * @memberof common
     */
    Struct: {
        fields: {
            fields: {
                keyType: "string",
                type: "Value",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Value message.
     * @interface IValue
     * @type {Object}
     * @property {string} [kind]
     * @property {0} [nullValue]
     * @property {number} [numberValue]
     * @property {string} [stringValue]
     * @property {boolean} [boolValue]
     * @property {IStruct} [structValue]
     * @property {IListValue} [listValue]
     * @memberof common
     */
    Value: {
        oneofs: {
            kind: {
                oneof: [
                    "nullValue",
                    "numberValue",
                    "stringValue",
                    "boolValue",
                    "structValue",
                    "listValue"
                ]
            }
        },
        fields: {
            nullValue: {
                type: "NullValue",
                id: 1
            },
            numberValue: {
                type: "double",
                id: 2
            },
            stringValue: {
                type: "string",
                id: 3
            },
            boolValue: {
                type: "bool",
                id: 4
            },
            structValue: {
                type: "Struct",
                id: 5
            },
            listValue: {
                type: "ListValue",
                id: 6
            }
        }
    },

    NullValue: {
        values: {
            NULL_VALUE: 0
        }
    },

    /**
     * Properties of a google.protobuf.ListValue message.
     * @interface IListValue
     * @type {Object}
     * @property {Array.<IValue>} [values]
     * @memberof common
     */
    ListValue: {
        fields: {
            values: {
                rule: "repeated",
                type: "Value",
                id: 1
            }
        }
    }
});

common("wrappers", {

    /**
     * Properties of a google.protobuf.DoubleValue message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    DoubleValue: {
        fields: {
            value: {
                type: "double",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.FloatValue message.
     * @interface IFloatValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    FloatValue: {
        fields: {
            value: {
                type: "float",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Int64Value message.
     * @interface IInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */
    Int64Value: {
        fields: {
            value: {
                type: "int64",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.UInt64Value message.
     * @interface IUInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */
    UInt64Value: {
        fields: {
            value: {
                type: "uint64",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Int32Value message.
     * @interface IInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    Int32Value: {
        fields: {
            value: {
                type: "int32",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.UInt32Value message.
     * @interface IUInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    UInt32Value: {
        fields: {
            value: {
                type: "uint32",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.BoolValue message.
     * @interface IBoolValue
     * @type {Object}
     * @property {boolean} [value]
     * @memberof common
     */
    BoolValue: {
        fields: {
            value: {
                type: "bool",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.StringValue message.
     * @interface IStringValue
     * @type {Object}
     * @property {string} [value]
     * @memberof common
     */
    StringValue: {
        fields: {
            value: {
                type: "string",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.BytesValue message.
     * @interface IBytesValue
     * @type {Object}
     * @property {Uint8Array} [value]
     * @memberof common
     */
    BytesValue: {
        fields: {
            value: {
                type: "bytes",
                id: 1
            }
        }
    }
});

/**
 * Gets the root definition of the specified common proto file.
 *
 * Bundled definitions are:
 * - google/protobuf/any.proto
 * - google/protobuf/duration.proto
 * - google/protobuf/empty.proto
 * - google/protobuf/struct.proto
 * - google/protobuf/timestamp.proto
 * - google/protobuf/wrappers.proto
 *
 * @param {string} file Proto file name
 * @returns {INamespace|null} Root definition or `null` if not defined
 */
common.get = function get(file) {
    return common[file] || null;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pb = __webpack_require__(51);
var time = new Date().getTime(); // 用于更新pbjson文件
var awesomeConfig = __webpack_require__(28);
var pbjson = {};
/**
 * err 错误信息
 * root 加载的文件信息
 */
pbjson.pbMsgRoot = pb.Root.fromJSON(awesomeConfig);
pbjson.pbMsgHeadBuilder = pbjson.pbMsgRoot.lookup('PBMessage');

exports.default = pbjson;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * protobuf.js v6.8.8 (c) 2016, daniel wirtz
 * compiled thu, 19 jul 2018 00:33:25 utc
 * licensed under the bsd-3-clause license
 * see: https://github.com/dcodeio/protobuf.js for details
 */
(function (undefined) {
    "use strict";
    (function prelude(modules, cache, entries) {

        // This is the prelude used to bundle protobuf.js for the browser. Wraps up the CommonJS
        // sources through a conflict-free require shim and is again wrapped within an iife that
        // provides a minification-friendly `undefined` var plus a global "use strict" directive
        // so that minification can remove the directives of each module.

        function $require(name) {
            var $module = cache[name];
            if (!$module) modules[name][0].call($module = cache[name] = { exports: {} }, $require, $module, $module.exports);
            return $module.exports;
        }

        var protobuf = $require(entries[0]);

        // Expose globally
        protobuf.util.global.protobuf = protobuf;

        // Be nice to AMD
        if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Long) {
            // if (Long && Long.isLong) {
            //     protobuf.util.Long = Long;
            //     protobuf.configure();
            // }
            return protobuf;
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

        // Be nice to CommonJS
        if (( false ? "undefined" : _typeof(module)) === "object" && module && module.exports) module.exports = protobuf;
    })( /* end of prelude */{ 1: [function (require, module, exports) {
            "use strict";

            module.exports = asPromise;

            /**
            * Callback as used by {@link util.asPromise}.
            * @typedef asPromiseCallback
            * @type {function}
            * @param {Error|null} error Error, if any
            * @param {...*} params Additional arguments
            * @returns {undefined}
            */

            /**
            * Returns a promise from a node-style callback function.
            * @memberof util
            * @param {asPromiseCallback} fn Function to call
            * @param {*} ctx Function context
            * @param {...*} params Function arguments
            * @returns {Promise<*>} Promisified function
            */
            function asPromise(fn, ctx /*, varargs */) {
                var params = new Array(arguments.length - 1),
                    offset = 0,
                    index = 2,
                    pending = true;
                while (index < arguments.length) {
                    params[offset++] = arguments[index++];
                }return new Promise(function executor(resolve, reject) {
                    params[offset] = function callback(err /*, varargs */) {
                        if (pending) {
                            pending = false;
                            if (err) reject(err);else {
                                var params = new Array(arguments.length - 1),
                                    offset = 0;
                                while (offset < params.length) {
                                    params[offset++] = arguments[offset];
                                }resolve.apply(null, params);
                            }
                        }
                    };
                    try {
                        fn.apply(ctx || null, params);
                    } catch (err) {
                        if (pending) {
                            pending = false;
                            reject(err);
                        }
                    }
                });
            }
        }, {}], 2: [function (require, module, exports) {
            "use strict";

            /**
            * A minimal base64 implementation for number arrays.
            * @memberof util
            * @namespace
            */

            var base64 = exports;

            /**
            * Calculates the byte length of a base64 encoded string.
            * @param {string} string Base64 encoded string
            * @returns {number} Byte length
            */
            base64.length = function length(string) {
                var p = string.length;
                if (!p) return 0;
                var n = 0;
                while (--p % 4 > 1 && string.charAt(p) === "=") {
                    ++n;
                }return Math.ceil(string.length * 3) / 4 - n;
            };

            // Base64 encoding table
            var b64 = new Array(64);

            // Base64 decoding table
            var s64 = new Array(123);

            // 65..90, 97..122, 48..57, 43, 47
            for (var i = 0; i < 64;) {
                s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
            } /**
              * Encodes a buffer to a base64 encoded string.
              * @param {Uint8Array} buffer Source buffer
              * @param {number} start Source start
              * @param {number} end Source end
              * @returns {string} Base64 encoded string
              */
            base64.encode = function encode(buffer, start, end) {
                var parts = null,
                    chunk = [];
                var i = 0,
                    // output index
                j = 0,
                    // goto index
                t; // temporary
                while (start < end) {
                    var b = buffer[start++];
                    switch (j) {
                        case 0:
                            chunk[i++] = b64[b >> 2];
                            t = (b & 3) << 4;
                            j = 1;
                            break;
                        case 1:
                            chunk[i++] = b64[t | b >> 4];
                            t = (b & 15) << 2;
                            j = 2;
                            break;
                        case 2:
                            chunk[i++] = b64[t | b >> 6];
                            chunk[i++] = b64[b & 63];
                            j = 0;
                            break;
                    }
                    if (i > 8191) {
                        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                        i = 0;
                    }
                }
                if (j) {
                    chunk[i++] = b64[t];
                    chunk[i++] = 61;
                    if (j === 1) chunk[i++] = 61;
                }
                if (parts) {
                    if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
                    return parts.join("");
                }
                return String.fromCharCode.apply(String, chunk.slice(0, i));
            };

            var invalidEncoding = "invalid encoding";

            /**
            * Decodes a base64 encoded string to a buffer.
            * @param {string} string Source string
            * @param {Uint8Array} buffer Destination buffer
            * @param {number} offset Destination offset
            * @returns {number} Number of bytes written
            * @throws {Error} If encoding is invalid
            */
            base64.decode = function decode(string, buffer, offset) {
                var start = offset;
                var j = 0,
                    // goto index
                t; // temporary
                for (var i = 0; i < string.length;) {
                    var c = string.charCodeAt(i++);
                    if (c === 61 && j > 1) break;
                    if ((c = s64[c]) === undefined) throw Error(invalidEncoding);
                    switch (j) {
                        case 0:
                            t = c;
                            j = 1;
                            break;
                        case 1:
                            buffer[offset++] = t << 2 | (c & 48) >> 4;
                            t = c;
                            j = 2;
                            break;
                        case 2:
                            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                            t = c;
                            j = 3;
                            break;
                        case 3:
                            buffer[offset++] = (t & 3) << 6 | c;
                            j = 0;
                            break;
                    }
                }
                if (j === 1) throw Error(invalidEncoding);
                return offset - start;
            };

            /**
            * Tests if the specified string appears to be base64 encoded.
            * @param {string} string String to test
            * @returns {boolean} `true` if probably base64 encoded, otherwise false
            */
            base64.test = function test(string) {
                return (/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string)
                );
            };
        }, {}], 3: [function (require, module, exports) {
            "use strict";

            module.exports = codegen;

            /**
            * Begins generating a function.
            * @memberof util
            * @param {string[]} functionParams Function parameter names
            * @param {string} [functionName] Function name if not anonymous
            * @returns {Codegen} Appender that appends code to the function's body
            */
            function codegen(functionParams, functionName) {

                /* istanbul ignore if */
                if (typeof functionParams === "string") {
                    functionName = functionParams;
                    functionParams = undefined;
                }

                var body = [];

                /**
                 * Appends code to the function's body or finishes generation.
                 * @typedef Codegen
                 * @type {function}
                 * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
                 * @param {...*} [formatParams] Format parameters
                 * @returns {Codegen|Function} Itself or the generated function if finished
                 * @throws {Error} If format parameter counts do not match
                 */

                function Codegen(formatStringOrScope) {
                    // note that explicit array handling below makes this ~50% faster

                    // finish the function
                    if (typeof formatStringOrScope !== "string") {
                        var source = toString();
                        if (codegen.verbose) console.log("codegen: " + source); // eslint-disable-line no-console
                        source = "return " + source;
                        if (formatStringOrScope) {
                            var scopeKeys = Object.keys(formatStringOrScope),
                                scopeParams = new Array(scopeKeys.length + 1),
                                scopeValues = new Array(scopeKeys.length),
                                scopeOffset = 0;
                            while (scopeOffset < scopeKeys.length) {
                                scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                                scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
                            }
                            scopeParams[scopeOffset] = source;
                            return Function.apply(null, scopeParams).apply(null, scopeValues); // eslint-disable-line no-new-func
                        }
                        return Function(source)(); // eslint-disable-line no-new-func
                    }

                    // otherwise append to body
                    var formatParams = new Array(arguments.length - 1),
                        formatOffset = 0;
                    while (formatOffset < formatParams.length) {
                        formatParams[formatOffset] = arguments[++formatOffset];
                    }formatOffset = 0;
                    formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
                        var value = formatParams[formatOffset++];
                        switch ($1) {
                            case "d":case "f":
                                return String(Number(value));
                            case "i":
                                return String(Math.floor(value));
                            case "j":
                                return JSON.stringify(value);
                            case "s":
                                return String(value);
                        }
                        return "%";
                    });
                    if (formatOffset !== formatParams.length) throw Error("parameter count mismatch");
                    body.push(formatStringOrScope);
                    return Codegen;
                }

                function toString(functionNameOverride) {
                    return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
                }

                Codegen.toString = toString;
                return Codegen;
            }

            /**
            * Begins generating a function.
            * @memberof util
            * @function codegen
            * @param {string} [functionName] Function name if not anonymous
            * @returns {Codegen} Appender that appends code to the function's body
            * @variation 2
            */

            /**
            * When set to `true`, codegen will log generated code to console. Useful for debugging.
            * @name util.codegen.verbose
            * @type {boolean}
            */
            codegen.verbose = false;
        }, {}], 4: [function (require, module, exports) {
            "use strict";

            module.exports = EventEmitter;

            /**
            * Constructs a new event emitter instance.
            * @classdesc A minimal event emitter.
            * @memberof util
            * @constructor
            */
            function EventEmitter() {

                /**
                 * Registered listeners.
                 * @type {Object.<string,*>}
                 * @private
                 */
                this._listeners = {};
            }

            /**
            * Registers an event listener.
            * @param {string} evt Event name
            * @param {function} fn Listener
            * @param {*} [ctx] Listener context
            * @returns {util.EventEmitter} `this`
            */
            EventEmitter.prototype.on = function on(evt, fn, ctx) {
                (this._listeners[evt] || (this._listeners[evt] = [])).push({
                    fn: fn,
                    ctx: ctx || this
                });
                return this;
            };

            /**
            * Removes an event listener or any matching listeners if arguments are omitted.
            * @param {string} [evt] Event name. Removes all listeners if omitted.
            * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
            * @returns {util.EventEmitter} `this`
            */
            EventEmitter.prototype.off = function off(evt, fn) {
                if (evt === undefined) this._listeners = {};else {
                    if (fn === undefined) this._listeners[evt] = [];else {
                        var listeners = this._listeners[evt];
                        for (var i = 0; i < listeners.length;) {
                            if (listeners[i].fn === fn) listeners.splice(i, 1);else ++i;
                        }
                    }
                }
                return this;
            };

            /**
            * Emits an event by calling its listeners with the specified arguments.
            * @param {string} evt Event name
            * @param {...*} args Arguments
            * @returns {util.EventEmitter} `this`
            */
            EventEmitter.prototype.emit = function emit(evt) {
                var listeners = this._listeners[evt];
                if (listeners) {
                    var args = [],
                        i = 1;
                    for (; i < arguments.length;) {
                        args.push(arguments[i++]);
                    }for (i = 0; i < listeners.length;) {
                        listeners[i].fn.apply(listeners[i++].ctx, args);
                    }
                }
                return this;
            };
        }, {}], 5: [function (require, module, exports) {
            "use strict";

            module.exports = fetch;

            var asPromise = require(1),
                inquire = require(7);

            var fs = inquire("fs");

            /**
            * Node-style callback as used by {@link util.fetch}.
            * @typedef FetchCallback
            * @type {function}
            * @param {?Error} error Error, if any, otherwise `null`
            * @param {string} [contents] File contents, if there hasn't been an error
            * @returns {undefined}
            */

            /**
            * Options as used by {@link util.fetch}.
            * @typedef FetchOptions
            * @type {Object}
            * @property {boolean} [binary=false] Whether expecting a binary response
            * @property {boolean} [xhr=false] If `true`, forces the use of XMLHttpRequest
            */

            /**
            * Fetches the contents of a file.
            * @memberof util
            * @param {string} filename File path or url
            * @param {FetchOptions} options Fetch options
            * @param {FetchCallback} callback Callback function
            * @returns {undefined}
            */
            function fetch(filename, options, callback) {
                if (typeof options === "function") {
                    callback = options;
                    options = {};
                } else if (!options) options = {};

                if (!callback) return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this

                // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.
                if (!options.xhr && fs && fs.readFile) return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
                    return err && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
                });

                // use the XHR version otherwise.
                return fetch.xhr(filename, options, callback);
            }

            /**
            * Fetches the contents of a file.
            * @name util.fetch
            * @function
            * @param {string} path File path or url
            * @param {FetchCallback} callback Callback function
            * @returns {undefined}
            * @variation 2
            */

            /**
            * Fetches the contents of a file.
            * @name util.fetch
            * @function
            * @param {string} path File path or url
            * @param {FetchOptions} [options] Fetch options
            * @returns {Promise<string|Uint8Array>} Promise
            * @variation 3
            */

            /**/
            fetch.xhr = function fetch_xhr(filename, options, callback) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange /* works everywhere */ = function fetchOnReadyStateChange() {

                    if (xhr.readyState !== 4) return undefined;

                    // local cors security errors return status 0 / empty string, too. afaik this cannot be
                    // reliably distinguished from an actually empty file for security reasons. feel free
                    // to send a pull request if you are aware of a solution.
                    if (xhr.status !== 0 && xhr.status !== 200) return callback(Error("status " + xhr.status));

                    // if binary data is expected, make sure that some sort of array is returned, even if
                    // ArrayBuffers are not supported. the binary string fallback, however, is unsafe.
                    if (options.binary) {
                        var buffer = xhr.response;
                        if (!buffer) {
                            buffer = [];
                            for (var i = 0; i < xhr.responseText.length; ++i) {
                                buffer.push(xhr.responseText.charCodeAt(i) & 255);
                            }
                        }
                        return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
                    }
                    return callback(null, xhr.responseText);
                };

                if (options.binary) {
                    // ref: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Receiving_binary_data_in_older_browsers
                    if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain; charset=x-user-defined");
                    xhr.responseType = "arraybuffer";
                }

                xhr.open("GET", filename);
                xhr.send();
            };
        }, { "1": 1, "7": 7 }], 6: [function (require, module, exports) {
            "use strict";

            module.exports = factory(factory);

            /**
            * Reads / writes floats / doubles from / to buffers.
            * @name util.float
            * @namespace
            */

            /**
            * Writes a 32 bit float to a buffer using little endian byte order.
            * @name util.float.writeFloatLE
            * @function
            * @param {number} val Value to write
            * @param {Uint8Array} buf Target buffer
            * @param {number} pos Target buffer offset
            * @returns {undefined}
            */

            /**
            * Writes a 32 bit float to a buffer using big endian byte order.
            * @name util.float.writeFloatBE
            * @function
            * @param {number} val Value to write
            * @param {Uint8Array} buf Target buffer
            * @param {number} pos Target buffer offset
            * @returns {undefined}
            */

            /**
            * Reads a 32 bit float from a buffer using little endian byte order.
            * @name util.float.readFloatLE
            * @function
            * @param {Uint8Array} buf Source buffer
            * @param {number} pos Source buffer offset
            * @returns {number} Value read
            */

            /**
            * Reads a 32 bit float from a buffer using big endian byte order.
            * @name util.float.readFloatBE
            * @function
            * @param {Uint8Array} buf Source buffer
            * @param {number} pos Source buffer offset
            * @returns {number} Value read
            */

            /**
            * Writes a 64 bit double to a buffer using little endian byte order.
            * @name util.float.writeDoubleLE
            * @function
            * @param {number} val Value to write
            * @param {Uint8Array} buf Target buffer
            * @param {number} pos Target buffer offset
            * @returns {undefined}
            */

            /**
            * Writes a 64 bit double to a buffer using big endian byte order.
            * @name util.float.writeDoubleBE
            * @function
            * @param {number} val Value to write
            * @param {Uint8Array} buf Target buffer
            * @param {number} pos Target buffer offset
            * @returns {undefined}
            */

            /**
            * Reads a 64 bit double from a buffer using little endian byte order.
            * @name util.float.readDoubleLE
            * @function
            * @param {Uint8Array} buf Source buffer
            * @param {number} pos Source buffer offset
            * @returns {number} Value read
            */

            /**
            * Reads a 64 bit double from a buffer using big endian byte order.
            * @name util.float.readDoubleBE
            * @function
            * @param {Uint8Array} buf Source buffer
            * @param {number} pos Source buffer offset
            * @returns {number} Value read
            */

            // Factory function for the purpose of node-based testing in modified global environments
            function factory(exports) {

                // float: typed array
                if (typeof Float32Array !== "undefined") (function () {

                    var f32 = new Float32Array([-0]),
                        f8b = new Uint8Array(f32.buffer),
                        le = f8b[3] === 128;

                    function writeFloat_f32_cpy(val, buf, pos) {
                        f32[0] = val;
                        buf[pos] = f8b[0];
                        buf[pos + 1] = f8b[1];
                        buf[pos + 2] = f8b[2];
                        buf[pos + 3] = f8b[3];
                    }

                    function writeFloat_f32_rev(val, buf, pos) {
                        f32[0] = val;
                        buf[pos] = f8b[3];
                        buf[pos + 1] = f8b[2];
                        buf[pos + 2] = f8b[1];
                        buf[pos + 3] = f8b[0];
                    }

                    /* istanbul ignore next */
                    exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
                    /* istanbul ignore next */
                    exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

                    function readFloat_f32_cpy(buf, pos) {
                        f8b[0] = buf[pos];
                        f8b[1] = buf[pos + 1];
                        f8b[2] = buf[pos + 2];
                        f8b[3] = buf[pos + 3];
                        return f32[0];
                    }

                    function readFloat_f32_rev(buf, pos) {
                        f8b[3] = buf[pos];
                        f8b[2] = buf[pos + 1];
                        f8b[1] = buf[pos + 2];
                        f8b[0] = buf[pos + 3];
                        return f32[0];
                    }

                    /* istanbul ignore next */
                    exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
                    /* istanbul ignore next */
                    exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

                    // float: ieee754
                })();else (function () {

                    function writeFloat_ieee754(writeUint, val, buf, pos) {
                        var sign = val < 0 ? 1 : 0;
                        if (sign) val = -val;
                        if (val === 0) writeUint(1 / val > 0 ? /* positive */0 : /* negative 0 */2147483648, buf, pos);else if (isNaN(val)) writeUint(2143289344, buf, pos);else if (val > 3.4028234663852886e+38) // +-Infinity
                            writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);else if (val < 1.1754943508222875e-38) // denormal
                            writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);else {
                            var exponent = Math.floor(Math.log(val) / Math.LN2),
                                mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                            writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
                        }
                    }

                    exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
                    exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

                    function readFloat_ieee754(readUint, buf, pos) {
                        var uint = readUint(buf, pos),
                            sign = (uint >> 31) * 2 + 1,
                            exponent = uint >>> 23 & 255,
                            mantissa = uint & 8388607;
                        return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
                        ? sign * 1.401298464324817e-45 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
                    }

                    exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
                    exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
                })();

                // double: typed array
                if (typeof Float64Array !== "undefined") (function () {

                    var f64 = new Float64Array([-0]),
                        f8b = new Uint8Array(f64.buffer),
                        le = f8b[7] === 128;

                    function writeDouble_f64_cpy(val, buf, pos) {
                        f64[0] = val;
                        buf[pos] = f8b[0];
                        buf[pos + 1] = f8b[1];
                        buf[pos + 2] = f8b[2];
                        buf[pos + 3] = f8b[3];
                        buf[pos + 4] = f8b[4];
                        buf[pos + 5] = f8b[5];
                        buf[pos + 6] = f8b[6];
                        buf[pos + 7] = f8b[7];
                    }

                    function writeDouble_f64_rev(val, buf, pos) {
                        f64[0] = val;
                        buf[pos] = f8b[7];
                        buf[pos + 1] = f8b[6];
                        buf[pos + 2] = f8b[5];
                        buf[pos + 3] = f8b[4];
                        buf[pos + 4] = f8b[3];
                        buf[pos + 5] = f8b[2];
                        buf[pos + 6] = f8b[1];
                        buf[pos + 7] = f8b[0];
                    }

                    /* istanbul ignore next */
                    exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
                    /* istanbul ignore next */
                    exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

                    function readDouble_f64_cpy(buf, pos) {
                        f8b[0] = buf[pos];
                        f8b[1] = buf[pos + 1];
                        f8b[2] = buf[pos + 2];
                        f8b[3] = buf[pos + 3];
                        f8b[4] = buf[pos + 4];
                        f8b[5] = buf[pos + 5];
                        f8b[6] = buf[pos + 6];
                        f8b[7] = buf[pos + 7];
                        return f64[0];
                    }

                    function readDouble_f64_rev(buf, pos) {
                        f8b[7] = buf[pos];
                        f8b[6] = buf[pos + 1];
                        f8b[5] = buf[pos + 2];
                        f8b[4] = buf[pos + 3];
                        f8b[3] = buf[pos + 4];
                        f8b[2] = buf[pos + 5];
                        f8b[1] = buf[pos + 6];
                        f8b[0] = buf[pos + 7];
                        return f64[0];
                    }

                    /* istanbul ignore next */
                    exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
                    /* istanbul ignore next */
                    exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

                    // double: ieee754
                })();else (function () {

                    function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
                        var sign = val < 0 ? 1 : 0;
                        if (sign) val = -val;
                        if (val === 0) {
                            writeUint(0, buf, pos + off0);
                            writeUint(1 / val > 0 ? /* positive */0 : /* negative 0 */2147483648, buf, pos + off1);
                        } else if (isNaN(val)) {
                            writeUint(0, buf, pos + off0);
                            writeUint(2146959360, buf, pos + off1);
                        } else if (val > 1.7976931348623157e+308) {
                            // +-Infinity
                            writeUint(0, buf, pos + off0);
                            writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
                        } else {
                            var mantissa;
                            if (val < 2.2250738585072014e-308) {
                                // denormal
                                mantissa = val / 5e-324;
                                writeUint(mantissa >>> 0, buf, pos + off0);
                                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                            } else {
                                var exponent = Math.floor(Math.log(val) / Math.LN2);
                                if (exponent === 1024) exponent = 1023;
                                mantissa = val * Math.pow(2, -exponent);
                                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                            }
                        }
                    }

                    exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
                    exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

                    function readDouble_ieee754(readUint, off0, off1, buf, pos) {
                        var lo = readUint(buf, pos + off0),
                            hi = readUint(buf, pos + off1);
                        var sign = (hi >> 31) * 2 + 1,
                            exponent = hi >>> 20 & 2047,
                            mantissa = 4294967296 * (hi & 1048575) + lo;
                        return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
                        ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
                    }

                    exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
                    exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
                })();

                return exports;
            }

            // uint helpers

            function writeUintLE(val, buf, pos) {
                buf[pos] = val & 255;
                buf[pos + 1] = val >>> 8 & 255;
                buf[pos + 2] = val >>> 16 & 255;
                buf[pos + 3] = val >>> 24;
            }

            function writeUintBE(val, buf, pos) {
                buf[pos] = val >>> 24;
                buf[pos + 1] = val >>> 16 & 255;
                buf[pos + 2] = val >>> 8 & 255;
                buf[pos + 3] = val & 255;
            }

            function readUintLE(buf, pos) {
                return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
            }

            function readUintBE(buf, pos) {
                return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
            }
        }, {}], 7: [function (require, module, exports) {
            "use strict";

            module.exports = inquire;

            /**
            * Requires a module only if available.
            * @memberof util
            * @param {string} moduleName Module to require
            * @returns {?Object} Required module if available and not empty, otherwise `null`
            */
            function inquire(moduleName) {
                try {
                    var mod = eval("quire".replace(/^/, "re"))(moduleName); // eslint-disable-line no-eval
                    if (mod && (mod.length || Object.keys(mod).length)) return mod;
                } catch (e) {} // eslint-disable-line no-empty
                return null;
            }
        }, {}], 8: [function (require, module, exports) {
            "use strict";

            /**
            * A minimal path module to resolve Unix, Windows and URL paths alike.
            * @memberof util
            * @namespace
            */

            var path = exports;

            var isAbsolute =
            /**
            * Tests if the specified path is absolute.
            * @param {string} path Path to test
            * @returns {boolean} `true` if path is absolute
            */
            path.isAbsolute = function isAbsolute(path) {
                return (/^(?:\/|\w+:)/.test(path)
                );
            };

            var normalize =
            /**
            * Normalizes the specified path.
            * @param {string} path Path to normalize
            * @returns {string} Normalized path
            */
            path.normalize = function normalize(path) {
                path = path.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
                var parts = path.split("/"),
                    absolute = isAbsolute(path),
                    prefix = "";
                if (absolute) prefix = parts.shift() + "/";
                for (var i = 0; i < parts.length;) {
                    if (parts[i] === "..") {
                        if (i > 0 && parts[i - 1] !== "..") parts.splice(--i, 2);else if (absolute) parts.splice(i, 1);else ++i;
                    } else if (parts[i] === ".") parts.splice(i, 1);else ++i;
                }
                return prefix + parts.join("/");
            };

            /**
            * Resolves the specified include path against the specified origin path.
            * @param {string} originPath Path to the origin file
            * @param {string} includePath Include path relative to origin path
            * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
            * @returns {string} Path to the include file
            */
            path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
                if (!alreadyNormalized) includePath = normalize(includePath);
                if (isAbsolute(includePath)) return includePath;
                if (!alreadyNormalized) originPath = normalize(originPath);
                return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
            };
        }, {}], 9: [function (require, module, exports) {
            "use strict";

            module.exports = pool;

            /**
            * An allocator as used by {@link util.pool}.
            * @typedef PoolAllocator
            * @type {function}
            * @param {number} size Buffer size
            * @returns {Uint8Array} Buffer
            */

            /**
            * A slicer as used by {@link util.pool}.
            * @typedef PoolSlicer
            * @type {function}
            * @param {number} start Start offset
            * @param {number} end End offset
            * @returns {Uint8Array} Buffer slice
            * @this {Uint8Array}
            */

            /**
            * A general purpose buffer pool.
            * @memberof util
            * @function
            * @param {PoolAllocator} alloc Allocator
            * @param {PoolSlicer} slice Slicer
            * @param {number} [size=8192] Slab size
            * @returns {PoolAllocator} Pooled allocator
            */
            function pool(alloc, slice, size) {
                var SIZE = size || 8192;
                var MAX = SIZE >>> 1;
                var slab = null;
                var offset = SIZE;
                return function pool_alloc(size) {
                    if (size < 1 || size > MAX) return alloc(size);
                    if (offset + size > SIZE) {
                        slab = alloc(SIZE);
                        offset = 0;
                    }
                    var buf = slice.call(slab, offset, offset += size);
                    if (offset & 7) // align to 32 bit
                        offset = (offset | 7) + 1;
                    return buf;
                };
            }
        }, {}], 10: [function (require, module, exports) {
            "use strict";

            /**
            * A minimal UTF8 implementation for number arrays.
            * @memberof util
            * @namespace
            */

            var utf8 = exports;

            /**
            * Calculates the UTF8 byte length of a string.
            * @param {string} string String
            * @returns {number} Byte length
            */
            utf8.length = function utf8_length(string) {
                var len = 0,
                    c = 0;
                for (var i = 0; i < string.length; ++i) {
                    c = string.charCodeAt(i);
                    if (c < 128) len += 1;else if (c < 2048) len += 2;else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
                        ++i;
                        len += 4;
                    } else len += 3;
                }
                return len;
            };

            /**
            * Reads UTF8 bytes as a string.
            * @param {Uint8Array} buffer Source buffer
            * @param {number} start Source start
            * @param {number} end Source end
            * @returns {string} String read
            */
            utf8.read = function utf8_read(buffer, start, end) {
                var len = end - start;
                if (len < 1) return "";
                var parts = null,
                    chunk = [],
                    i = 0,
                    // char offset
                t; // temporary
                while (start < end) {
                    t = buffer[start++];
                    if (t < 128) chunk[i++] = t;else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;else if (t > 239 && t < 365) {
                        t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
                        chunk[i++] = 0xD800 + (t >> 10);
                        chunk[i++] = 0xDC00 + (t & 1023);
                    } else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
                    if (i > 8191) {
                        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                        i = 0;
                    }
                }
                if (parts) {
                    if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
                    return parts.join("");
                }
                return String.fromCharCode.apply(String, chunk.slice(0, i));
            };

            /**
            * Writes a string as UTF8 bytes.
            * @param {string} string Source string
            * @param {Uint8Array} buffer Destination buffer
            * @param {number} offset Destination offset
            * @returns {number} Bytes written
            */
            utf8.write = function utf8_write(string, buffer, offset) {
                var start = offset,
                    c1,
                    // character 1
                c2; // character 2
                for (var i = 0; i < string.length; ++i) {
                    c1 = string.charCodeAt(i);
                    if (c1 < 128) {
                        buffer[offset++] = c1;
                    } else if (c1 < 2048) {
                        buffer[offset++] = c1 >> 6 | 192;
                        buffer[offset++] = c1 & 63 | 128;
                    } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
                        c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
                        ++i;
                        buffer[offset++] = c1 >> 18 | 240;
                        buffer[offset++] = c1 >> 12 & 63 | 128;
                        buffer[offset++] = c1 >> 6 & 63 | 128;
                        buffer[offset++] = c1 & 63 | 128;
                    } else {
                        buffer[offset++] = c1 >> 12 | 224;
                        buffer[offset++] = c1 >> 6 & 63 | 128;
                        buffer[offset++] = c1 & 63 | 128;
                    }
                }
                return offset - start;
            };
        }, {}], 11: [function (require, module, exports) {
            "use strict";

            module.exports = common;

            var commonRe = /\/|\./;

            /**
            * Provides common type definitions.
            * Can also be used to provide additional google types or your own custom types.
            * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
            * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
            * @returns {undefined}
            * @property {INamespace} google/protobuf/any.proto Any
            * @property {INamespace} google/protobuf/duration.proto Duration
            * @property {INamespace} google/protobuf/empty.proto Empty
            * @property {INamespace} google/protobuf/field_mask.proto FieldMask
            * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
            * @property {INamespace} google/protobuf/timestamp.proto Timestamp
            * @property {INamespace} google/protobuf/wrappers.proto Wrappers
            * @example
            * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
            * protobuf.common("descriptor", descriptorJson);
            *
            * // manually provides a custom definition (uses my.foo namespace)
            * protobuf.common("my/foo/bar.proto", myFooBarJson);
            */
            function common(name, json) {
                if (!commonRe.test(name)) {
                    name = "google/protobuf/" + name + ".proto";
                    json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
                }
                common[name] = json;
            }

            // Not provided because of limited use (feel free to discuss or to provide yourself):
            //
            // google/protobuf/descriptor.proto
            // google/protobuf/source_context.proto
            // google/protobuf/type.proto
            //
            // Stripped and pre-parsed versions of these non-bundled files are instead available as part of
            // the repository or package within the google/protobuf directory.

            common("any", {

                /**
                 * Properties of a google.protobuf.Any message.
                 * @interface IAny
                 * @type {Object}
                 * @property {string} [typeUrl]
                 * @property {Uint8Array} [bytes]
                 * @memberof common
                 */
                Any: {
                    fields: {
                        type_url: {
                            type: "string",
                            id: 1
                        },
                        value: {
                            type: "bytes",
                            id: 2
                        }
                    }
                }
            });

            var timeType;

            common("duration", {

                /**
                 * Properties of a google.protobuf.Duration message.
                 * @interface IDuration
                 * @type {Object}
                 * @property {number|Long} [seconds]
                 * @property {number} [nanos]
                 * @memberof common
                 */
                Duration: timeType = {
                    fields: {
                        seconds: {
                            type: "int64",
                            id: 1
                        },
                        nanos: {
                            type: "int32",
                            id: 2
                        }
                    }
                }
            });

            common("timestamp", {

                /**
                 * Properties of a google.protobuf.Timestamp message.
                 * @interface ITimestamp
                 * @type {Object}
                 * @property {number|Long} [seconds]
                 * @property {number} [nanos]
                 * @memberof common
                 */
                Timestamp: timeType
            });

            common("empty", {

                /**
                 * Properties of a google.protobuf.Empty message.
                 * @interface IEmpty
                 * @memberof common
                 */
                Empty: {
                    fields: {}
                }
            });

            common("struct", {

                /**
                 * Properties of a google.protobuf.Struct message.
                 * @interface IStruct
                 * @type {Object}
                 * @property {Object.<string,IValue>} [fields]
                 * @memberof common
                 */
                Struct: {
                    fields: {
                        fields: {
                            keyType: "string",
                            type: "Value",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.Value message.
                 * @interface IValue
                 * @type {Object}
                 * @property {string} [kind]
                 * @property {0} [nullValue]
                 * @property {number} [numberValue]
                 * @property {string} [stringValue]
                 * @property {boolean} [boolValue]
                 * @property {IStruct} [structValue]
                 * @property {IListValue} [listValue]
                 * @memberof common
                 */
                Value: {
                    oneofs: {
                        kind: {
                            oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]
                        }
                    },
                    fields: {
                        nullValue: {
                            type: "NullValue",
                            id: 1
                        },
                        numberValue: {
                            type: "double",
                            id: 2
                        },
                        stringValue: {
                            type: "string",
                            id: 3
                        },
                        boolValue: {
                            type: "bool",
                            id: 4
                        },
                        structValue: {
                            type: "Struct",
                            id: 5
                        },
                        listValue: {
                            type: "ListValue",
                            id: 6
                        }
                    }
                },

                NullValue: {
                    values: {
                        NULL_VALUE: 0
                    }
                },

                /**
                 * Properties of a google.protobuf.ListValue message.
                 * @interface IListValue
                 * @type {Object}
                 * @property {Array.<IValue>} [values]
                 * @memberof common
                 */
                ListValue: {
                    fields: {
                        values: {
                            rule: "repeated",
                            type: "Value",
                            id: 1
                        }
                    }
                }
            });

            common("wrappers", {

                /**
                 * Properties of a google.protobuf.DoubleValue message.
                 * @interface IDoubleValue
                 * @type {Object}
                 * @property {number} [value]
                 * @memberof common
                 */
                DoubleValue: {
                    fields: {
                        value: {
                            type: "double",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.FloatValue message.
                 * @interface IFloatValue
                 * @type {Object}
                 * @property {number} [value]
                 * @memberof common
                 */
                FloatValue: {
                    fields: {
                        value: {
                            type: "float",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.Int64Value message.
                 * @interface IInt64Value
                 * @type {Object}
                 * @property {number|Long} [value]
                 * @memberof common
                 */
                Int64Value: {
                    fields: {
                        value: {
                            type: "int64",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.UInt64Value message.
                 * @interface IUInt64Value
                 * @type {Object}
                 * @property {number|Long} [value]
                 * @memberof common
                 */
                UInt64Value: {
                    fields: {
                        value: {
                            type: "uint64",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.Int32Value message.
                 * @interface IInt32Value
                 * @type {Object}
                 * @property {number} [value]
                 * @memberof common
                 */
                Int32Value: {
                    fields: {
                        value: {
                            type: "int32",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.UInt32Value message.
                 * @interface IUInt32Value
                 * @type {Object}
                 * @property {number} [value]
                 * @memberof common
                 */
                UInt32Value: {
                    fields: {
                        value: {
                            type: "uint32",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.BoolValue message.
                 * @interface IBoolValue
                 * @type {Object}
                 * @property {boolean} [value]
                 * @memberof common
                 */
                BoolValue: {
                    fields: {
                        value: {
                            type: "bool",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.StringValue message.
                 * @interface IStringValue
                 * @type {Object}
                 * @property {string} [value]
                 * @memberof common
                 */
                StringValue: {
                    fields: {
                        value: {
                            type: "string",
                            id: 1
                        }
                    }
                },

                /**
                 * Properties of a google.protobuf.BytesValue message.
                 * @interface IBytesValue
                 * @type {Object}
                 * @property {Uint8Array} [value]
                 * @memberof common
                 */
                BytesValue: {
                    fields: {
                        value: {
                            type: "bytes",
                            id: 1
                        }
                    }
                }
            });

            common("field_mask", {

                /**
                 * Properties of a google.protobuf.FieldMask message.
                 * @interface IDoubleValue
                 * @type {Object}
                 * @property {number} [value]
                 * @memberof common
                 */
                FieldMask: {
                    fields: {
                        paths: {
                            rule: "repeated",
                            type: "string",
                            id: 1
                        }
                    }
                }
            });

            /**
            * Gets the root definition of the specified common proto file.
            *
            * Bundled definitions are:
            * - google/protobuf/any.proto
            * - google/protobuf/duration.proto
            * - google/protobuf/empty.proto
            * - google/protobuf/field_mask.proto
            * - google/protobuf/struct.proto
            * - google/protobuf/timestamp.proto
            * - google/protobuf/wrappers.proto
            *
            * @param {string} file Proto file name
            * @returns {INamespace|null} Root definition or `null` if not defined
            */
            common.get = function get(file) {
                return common[file] || null;
            };
        }, {}], 12: [function (require, module, exports) {
            "use strict";
            /**
            * Runtime message from/to plain object converters.
            * @namespace
            */

            var converter = exports;

            var Enum = require(15),
                util = require(37);

            /**
            * Generates a partial value fromObject conveter.
            * @param {Codegen} gen Codegen instance
            * @param {Field} field Reflected field
            * @param {number} fieldIndex Field index
            * @param {string} prop Property reference
            * @returns {Codegen} Codegen instance
            * @ignore
            */
            function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
                /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
                if (field.resolvedType) {
                    if (field.resolvedType instanceof Enum) {
                        gen("switch(d%s){", prop);
                        for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
                            if (field.repeated && values[keys[i]] === field.typeDefault) gen("default:");
                            gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
                        }gen("}");
                    } else gen("if(typeof d%s!==\"object\")", prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
                } else {
                    var isUnsigned = false;
                    switch (field.type) {
                        case "double":
                        case "float":
                            gen("m%s=Number(d%s)", prop, prop); // also catches "NaN", "Infinity"
                            break;
                        case "uint32":
                        case "fixed32":
                            gen("m%s=d%s>>>0", prop, prop);
                            break;
                        case "int32":
                        case "sint32":
                        case "sfixed32":
                            gen("m%s=d%s|0", prop, prop);
                            break;
                        case "uint64":
                            isUnsigned = true;
                        // eslint-disable-line no-fallthrough
                        case "int64":
                        case "sint64":
                        case "fixed64":
                        case "sfixed64":
                            gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)("else if(typeof d%s===\"string\")", prop)("m%s=parseInt(d%s,10)", prop, prop)("else if(typeof d%s===\"number\")", prop)("m%s=d%s", prop, prop)("else if(typeof d%s===\"object\")", prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
                            break;
                        case "bytes":
                            gen("if(typeof d%s===\"string\")", prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length)", prop)("m%s=d%s", prop, prop);
                            break;
                        case "string":
                            gen("m%s=String(d%s)", prop, prop);
                            break;
                        case "bool":
                            gen("m%s=Boolean(d%s)", prop, prop);
                            break;
                        /* default: gen
                            ("m%s=d%s", prop, prop);
                            break; */
                    }
                }
                return gen;
                /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
            }

            /**
            * Generates a plain object to runtime message converter specific to the specified message type.
            * @param {Type} mtype Message type
            * @returns {Codegen} Codegen instance
            */
            converter.fromObject = function fromObject(mtype) {
                /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
                var fields = mtype.fieldsArray;
                var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
                if (!fields.length) return gen("return new this.ctor");
                gen("var m=new this.ctor");
                for (var i = 0; i < fields.length; ++i) {
                    var field = fields[i].resolve(),
                        prop = util.safeProp(field.name);

                    // Map fields
                    if (field.map) {
                        gen("if(d%s){", prop)("if(typeof d%s!==\"object\")", prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
                        genValuePartial_fromObject(gen, field, /* not sorted */i, prop + "[ks[i]]")("}")("}");

                        // Repeated fields
                    } else if (field.repeated) {
                        gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
                        genValuePartial_fromObject(gen, field, /* not sorted */i, prop + "[i]")("}")("}");

                        // Non-repeated fields
                    } else {
                        if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
                        ("if(d%s!=null){", prop); // !== undefined && !== null
                        genValuePartial_fromObject(gen, field, /* not sorted */i, prop);
                        if (!(field.resolvedType instanceof Enum)) gen("}");
                    }
                }return gen("return m");
                /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
            };

            /**
            * Generates a partial value toObject converter.
            * @param {Codegen} gen Codegen instance
            * @param {Field} field Reflected field
            * @param {number} fieldIndex Field index
            * @param {string} prop Property reference
            * @returns {Codegen} Codegen instance
            * @ignore
            */
            function genValuePartial_toObject(gen, field, fieldIndex, prop) {
                /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
                if (field.resolvedType) {
                    if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);else gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
                } else {
                    var isUnsigned = false;
                    switch (field.type) {
                        case "double":
                        case "float":
                            gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
                            break;
                        case "uint64":
                            isUnsigned = true;
                        // eslint-disable-line no-fallthrough
                        case "int64":
                        case "sint64":
                        case "fixed64":
                        case "sfixed64":
                            gen("if(typeof m%s===\"number\")", prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else") // Long-like
                            ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
                            break;
                        case "bytes":
                            gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
                            break;
                        default:
                            gen("d%s=m%s", prop, prop);
                            break;
                    }
                }
                return gen;
                /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
            }

            /**
            * Generates a runtime message to plain object converter specific to the specified message type.
            * @param {Type} mtype Message type
            * @returns {Codegen} Codegen instance
            */
            converter.toObject = function toObject(mtype) {
                /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
                var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
                if (!fields.length) return util.codegen()("return {}");
                var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");

                var repeatedFields = [],
                    mapFields = [],
                    normalFields = [],
                    i = 0;
                for (; i < fields.length; ++i) {
                    if (!fields[i].partOf) (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
                }if (repeatedFields.length) {
                    gen("if(o.arrays||o.defaults){");
                    for (i = 0; i < repeatedFields.length; ++i) {
                        gen("d%s=[]", util.safeProp(repeatedFields[i].name));
                    }gen("}");
                }

                if (mapFields.length) {
                    gen("if(o.objects||o.defaults){");
                    for (i = 0; i < mapFields.length; ++i) {
                        gen("d%s={}", util.safeProp(mapFields[i].name));
                    }gen("}");
                }

                if (normalFields.length) {
                    gen("if(o.defaults){");
                    for (i = 0; i < normalFields.length; ++i) {
                        var field = normalFields[i],
                            prop = util.safeProp(field.name);
                        if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);else if (field.long) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());else if (field.bytes) {
                            var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
                            gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
                        } else gen("d%s=%j", prop, field.typeDefault); // also messages (=null)
                    }gen("}");
                }
                var hasKs2 = false;
                for (i = 0; i < fields.length; ++i) {
                    var field = fields[i],
                        index = mtype._fieldsArray.indexOf(field),
                        prop = util.safeProp(field.name);
                    if (field.map) {
                        if (!hasKs2) {
                            hasKs2 = true;gen("var ks2");
                        }gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
                        genValuePartial_toObject(gen, field, /* sorted */index, prop + "[ks2[j]]")("}");
                    } else if (field.repeated) {
                        gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
                        genValuePartial_toObject(gen, field, /* sorted */index, prop + "[j]")("}");
                    } else {
                        gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name); // !== undefined && !== null
                        genValuePartial_toObject(gen, field, /* sorted */index, prop);
                        if (field.partOf) gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
                    }
                    gen("}");
                }
                return gen("return d");
                /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
            };
        }, { "15": 15, "37": 37 }], 13: [function (require, module, exports) {
            "use strict";

            module.exports = decoder;

            var Enum = require(15),
                types = require(36),
                util = require(37);

            function missing(field) {
                return "missing required '" + field.name + "'";
            }

            /**
            * Generates a decoder specific to the specified message type.
            * @param {Type} mtype Message type
            * @returns {Codegen} Codegen instance
            */
            function decoder(mtype) {
                /* eslint-disable no-unexpected-multiline */
                var gen = util.codegen(["r", "l"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function (field) {
                    return field.map;
                }).length ? ",k" : ""))("while(r.pos<c){")("var t=r.uint32()");
                if (mtype.group) gen("if((t&7)===4)")("break");
                gen("switch(t>>>3){");

                var i = 0;
                for (; i < /* initializes */mtype.fieldsArray.length; ++i) {
                    var field = mtype._fieldsArray[i].resolve(),
                        type = field.resolvedType instanceof Enum ? "int32" : field.type,
                        ref = "m" + util.safeProp(field.name);gen("case %i:", field.id);

                    // Map fields
                    if (field.map) {
                        gen("r.skip().pos++") // assumes id 1 + key wireType
                        ("if(%s===util.emptyObject)", ref)("%s={}", ref)("k=r.%s()", field.keyType)("r.pos++"); // assumes id 2 + value wireType
                        if (types.long[field.keyType] !== undefined) {
                            if (types.basic[type] === undefined) gen("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                            else gen("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);
                        } else {
                            if (types.basic[type] === undefined) gen("%s[k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                            else gen("%s[k]=r.%s()", ref, type);
                        }

                        // Repeated fields
                    } else if (field.repeated) {
                        gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);

                        // Packable (always check for forward and backward compatiblity)
                        if (types.packed[type] !== undefined) gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");

                        // Non-packed
                        if (types.basic[type] === undefined) gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);else gen("%s.push(r.%s())", ref, type);

                        // Non-repeated
                    } else if (types.basic[type] === undefined) gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);else gen("%s=r.%s()", ref, type);
                    gen("break");
                    // Unknown fields
                }gen("default:")("r.skipType(t&7)")("break")("}")("}");

                // Field presence
                for (i = 0; i < mtype._fieldsArray.length; ++i) {
                    var rfield = mtype._fieldsArray[i];
                    if (rfield.required) gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
                }

                return gen("return m");
                /* eslint-enable no-unexpected-multiline */
            }
        }, { "15": 15, "36": 36, "37": 37 }], 14: [function (require, module, exports) {
            "use strict";

            module.exports = encoder;

            var Enum = require(15),
                types = require(36),
                util = require(37);

            /**
            * Generates a partial message type encoder.
            * @param {Codegen} gen Codegen instance
            * @param {Field} field Reflected field
            * @param {number} fieldIndex Field index
            * @param {string} ref Variable reference
            * @returns {Codegen} Codegen instance
            * @ignore
            */
            function genTypePartial(gen, field, fieldIndex, ref) {
                return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
            }

            /**
            * Generates an encoder specific to the specified message type.
            * @param {Type} mtype Message type
            * @returns {Codegen} Codegen instance
            */
            function encoder(mtype) {
                /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
                var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");

                var i, ref;

                // "when a message is serialized its known fields should be written sequentially by field number"
                var fields = /* initializes */mtype.fieldsArray.slice().sort(util.compareFieldsById);

                for (var i = 0; i < fields.length; ++i) {
                    var field = fields[i].resolve(),
                        index = mtype._fieldsArray.indexOf(field),
                        type = field.resolvedType instanceof Enum ? "int32" : field.type,
                        wireType = types.basic[type];
                    ref = "m" + util.safeProp(field.name);

                    // Map fields
                    if (field.map) {
                        gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name) // !== undefined && !== null
                        ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
                        if (wireType === undefined) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref); // can't be groups
                        else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
                        gen("}")("}");

                        // Repeated fields
                    } else if (field.repeated) {
                        gen("if(%s!=null&&%s.length){", ref, ref); // !== undefined && !== null

                        // Packed repeated
                        if (field.packed && types.packed[type] !== undefined) {
                            gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");

                            // Non-packed
                        } else {
                            gen("for(var i=0;i<%s.length;++i)", ref);
                            if (wireType === undefined) genTypePartial(gen, field, index, ref + "[i]");else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
                        }gen("}");

                        // Non-repeated
                    } else {
                        if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j))", ref, field.name); // !== undefined && !== null

                        if (wireType === undefined) genTypePartial(gen, field, index, ref);else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
                    }
                }

                return gen("return w");
                /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
            }
        }, { "15": 15, "36": 36, "37": 37 }], 15: [function (require, module, exports) {
            "use strict";

            module.exports = Enum;

            // extends ReflectionObject
            var ReflectionObject = require(24);
            ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";

            var Namespace = require(23),
                util = require(37);

            /**
            * Constructs a new enum instance.
            * @classdesc Reflected enum.
            * @extends ReflectionObject
            * @constructor
            * @param {string} name Unique name within its namespace
            * @param {Object.<string,number>} [values] Enum values as an object, by name
            * @param {Object.<string,*>} [options] Declared options
            * @param {string} [comment] The comment for this enum
            * @param {Object.<string,string>} [comments] The value comments for this enum
            */
            function Enum(name, values, options, comment, comments) {
                ReflectionObject.call(this, name, options);

                if (values && (typeof values === "undefined" ? "undefined" : _typeof(values)) !== "object") throw TypeError("values must be an object");

                /**
                 * Enum values by id.
                 * @type {Object.<number,string>}
                 */
                this.valuesById = {};

                /**
                 * Enum values by name.
                 * @type {Object.<string,number>}
                 */
                this.values = Object.create(this.valuesById); // toJSON, marker

                /**
                 * Enum comment text.
                 * @type {string|null}
                 */
                this.comment = comment;

                /**
                 * Value comment texts, if any.
                 * @type {Object.<string,string>}
                 */
                this.comments = comments || {};

                /**
                 * Reserved ranges, if any.
                 * @type {Array.<number[]|string>}
                 */
                this.reserved = undefined; // toJSON

                // Note that values inherit valuesById on their prototype which makes them a TypeScript-
                // compatible enum. This is used by pbts to write actual enum definitions that work for
                // static and reflection code alike instead of emitting generic object definitions.

                if (values) for (var keys = Object.keys(values), i = 0; i < keys.length; ++i) {
                    if (typeof values[keys[i]] === "number") // use forward entries only
                        this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
                }
            }

            /**
            * Enum descriptor.
            * @interface IEnum
            * @property {Object.<string,number>} values Enum values
            * @property {Object.<string,*>} [options] Enum options
            */

            /**
            * Constructs an enum from an enum descriptor.
            * @param {string} name Enum name
            * @param {IEnum} json Enum descriptor
            * @returns {Enum} Created enum
            * @throws {TypeError} If arguments are invalid
            */
            Enum.fromJSON = function fromJSON(name, json) {
                var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
                enm.reserved = json.reserved;
                return enm;
            };

            /**
            * Converts this enum to an enum descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {IEnum} Enum descriptor
            */
            Enum.prototype.toJSON = function toJSON(toJSONOptions) {
                var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
                return util.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : undefined, "comment", keepComments ? this.comment : undefined, "comments", keepComments ? this.comments : undefined]);
            };

            /**
            * Adds a value to this enum.
            * @param {string} name Value name
            * @param {number} id Value id
            * @param {string} [comment] Comment, if any
            * @returns {Enum} `this`
            * @throws {TypeError} If arguments are invalid
            * @throws {Error} If there is already a value with this name or id
            */
            Enum.prototype.add = function add(name, id, comment) {
                // utilized by the parser but not by .fromJSON

                if (!util.isString(name)) throw TypeError("name must be a string");

                if (!util.isInteger(id)) throw TypeError("id must be an integer");

                if (this.values[name] !== undefined) throw Error("duplicate name '" + name + "' in " + this);

                if (this.isReservedId(id)) throw Error("id " + id + " is reserved in " + this);

                if (this.isReservedName(name)) throw Error("name '" + name + "' is reserved in " + this);

                if (this.valuesById[id] !== undefined) {
                    if (!(this.options && this.options.allow_alias)) throw Error("duplicate id " + id + " in " + this);
                    this.values[name] = id;
                } else this.valuesById[this.values[name] = id] = name;

                this.comments[name] = comment || null;
                return this;
            };

            /**
            * Removes a value from this enum
            * @param {string} name Value name
            * @returns {Enum} `this`
            * @throws {TypeError} If arguments are invalid
            * @throws {Error} If `name` is not a name of this enum
            */
            Enum.prototype.remove = function remove(name) {

                if (!util.isString(name)) throw TypeError("name must be a string");

                var val = this.values[name];
                if (val == null) throw Error("name '" + name + "' does not exist in " + this);

                delete this.valuesById[val];
                delete this.values[name];
                delete this.comments[name];

                return this;
            };

            /**
            * Tests if the specified id is reserved.
            * @param {number} id Id to test
            * @returns {boolean} `true` if reserved, otherwise `false`
            */
            Enum.prototype.isReservedId = function isReservedId(id) {
                return Namespace.isReservedId(this.reserved, id);
            };

            /**
            * Tests if the specified name is reserved.
            * @param {string} name Name to test
            * @returns {boolean} `true` if reserved, otherwise `false`
            */
            Enum.prototype.isReservedName = function isReservedName(name) {
                return Namespace.isReservedName(this.reserved, name);
            };
        }, { "23": 23, "24": 24, "37": 37 }], 16: [function (require, module, exports) {
            "use strict";

            module.exports = Field;

            // extends ReflectionObject
            var ReflectionObject = require(24);
            ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";

            var Enum = require(15),
                types = require(36),
                util = require(37);

            var Type; // cyclic

            var ruleRe = /^required|optional|repeated$/;

            /**
            * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
            * @name Field
            * @classdesc Reflected message field.
            * @extends FieldBase
            * @constructor
            * @param {string} name Unique name within its namespace
            * @param {number} id Unique id within its namespace
            * @param {string} type Value type
            * @param {string|Object.<string,*>} [rule="optional"] Field rule
            * @param {string|Object.<string,*>} [extend] Extended type if different from parent
            * @param {Object.<string,*>} [options] Declared options
            */

            /**
            * Constructs a field from a field descriptor.
            * @param {string} name Field name
            * @param {IField} json Field descriptor
            * @returns {Field} Created field
            * @throws {TypeError} If arguments are invalid
            */
            Field.fromJSON = function fromJSON(name, json) {
                return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
            };

            /**
            * Not an actual constructor. Use {@link Field} instead.
            * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
            * @exports FieldBase
            * @extends ReflectionObject
            * @constructor
            * @param {string} name Unique name within its namespace
            * @param {number} id Unique id within its namespace
            * @param {string} type Value type
            * @param {string|Object.<string,*>} [rule="optional"] Field rule
            * @param {string|Object.<string,*>} [extend] Extended type if different from parent
            * @param {Object.<string,*>} [options] Declared options
            * @param {string} [comment] Comment associated with this field
            */
            function Field(name, id, type, rule, extend, options, comment) {

                if (util.isObject(rule)) {
                    comment = extend;
                    options = rule;
                    rule = extend = undefined;
                } else if (util.isObject(extend)) {
                    comment = options;
                    options = extend;
                    extend = undefined;
                }

                ReflectionObject.call(this, name, options);

                if (!util.isInteger(id) || id < 0) throw TypeError("id must be a non-negative integer");

                if (!util.isString(type)) throw TypeError("type must be a string");

                if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase())) throw TypeError("rule must be a string rule");

                if (extend !== undefined && !util.isString(extend)) throw TypeError("extend must be a string");

                /**
                 * Field rule, if any.
                 * @type {string|undefined}
                 */
                this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

                /**
                 * Field type.
                 * @type {string}
                 */
                this.type = type; // toJSON

                /**
                 * Unique field id.
                 * @type {number}
                 */
                this.id = id; // toJSON, marker

                /**
                 * Extended type if different from parent.
                 * @type {string|undefined}
                 */
                this.extend = extend || undefined; // toJSON

                /**
                 * Whether this field is required.
                 * @type {boolean}
                 */
                this.required = rule === "required";

                /**
                 * Whether this field is optional.
                 * @type {boolean}
                 */
                this.optional = !this.required;

                /**
                 * Whether this field is repeated.
                 * @type {boolean}
                 */
                this.repeated = rule === "repeated";

                /**
                 * Whether this field is a map or not.
                 * @type {boolean}
                 */
                this.map = false;

                /**
                 * Message this field belongs to.
                 * @type {Type|null}
                 */
                this.message = null;

                /**
                 * OneOf this field belongs to, if any,
                 * @type {OneOf|null}
                 */
                this.partOf = null;

                /**
                 * The field type's default value.
                 * @type {*}
                 */
                this.typeDefault = null;

                /**
                 * The field's default value on prototypes.
                 * @type {*}
                 */
                this.defaultValue = null;

                /**
                 * Whether this field's value should be treated as a long.
                 * @type {boolean}
                 */
                this.long = util.Long ? types.long[type] !== undefined : /* istanbul ignore next */false;

                /**
                 * Whether this field's value is a buffer.
                 * @type {boolean}
                 */
                this.bytes = type === "bytes";

                /**
                 * Resolved type if not a basic type.
                 * @type {Type|Enum|null}
                 */
                this.resolvedType = null;

                /**
                 * Sister-field within the extended type if a declaring extension field.
                 * @type {Field|null}
                 */
                this.extensionField = null;

                /**
                 * Sister-field within the declaring namespace if an extended field.
                 * @type {Field|null}
                 */
                this.declaringField = null;

                /**
                 * Internally remembers whether this field is packed.
                 * @type {boolean|null}
                 * @private
                 */
                this._packed = null;

                /**
                 * Comment for this field.
                 * @type {string|null}
                 */
                this.comment = comment;
            }

            /**
            * Determines whether this field is packed. Only relevant when repeated and working with proto2.
            * @name Field#packed
            * @type {boolean}
            * @readonly
            */
            Object.defineProperty(Field.prototype, "packed", {
                get: function get() {
                    // defaults to packed=true if not explicity set to false
                    if (this._packed === null) this._packed = this.getOption("packed") !== false;
                    return this._packed;
                }
            });

            /**
            * @override
            */
            Field.prototype.setOption = function setOption(name, value, ifNotSet) {
                if (name === "packed") // clear cached before setting
                    this._packed = null;
                return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
            };

            /**
            * Field descriptor.
            * @interface IField
            * @property {string} [rule="optional"] Field rule
            * @property {string} type Field type
            * @property {number} id Field id
            * @property {Object.<string,*>} [options] Field options
            */

            /**
            * Extension field descriptor.
            * @interface IExtensionField
            * @extends IField
            * @property {string} extend Extended type
            */

            /**
            * Converts this field to a field descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {IField} Field descriptor
            */
            Field.prototype.toJSON = function toJSON(toJSONOptions) {
                var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
                return util.toObject(["rule", this.rule !== "optional" && this.rule || undefined, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", keepComments ? this.comment : undefined]);
            };

            /**
            * Resolves this field's type references.
            * @returns {Field} `this`
            * @throws {Error} If any reference cannot be resolved
            */
            Field.prototype.resolve = function resolve() {

                if (this.resolved) return this;

                if ((this.typeDefault = types.defaults[this.type]) === undefined) {
                    // if not a basic type, resolve it
                    this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
                    if (this.resolvedType instanceof Type) this.typeDefault = null;else // instanceof Enum
                        this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
                }

                // use explicitly set default value if present
                if (this.options && this.options["default"] != null) {
                    this.typeDefault = this.options["default"];
                    if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string") this.typeDefault = this.resolvedType.values[this.typeDefault];
                }

                // remove unnecessary options
                if (this.options) {
                    if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum)) delete this.options.packed;
                    if (!Object.keys(this.options).length) this.options = undefined;
                }

                // convert to internal data type if necesssary
                if (this.long) {
                    this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");

                    /* istanbul ignore else */
                    if (Object.freeze) Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)
                } else if (this.bytes && typeof this.typeDefault === "string") {
                    var buf;
                    if (util.base64.test(this.typeDefault)) util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);else util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
                    this.typeDefault = buf;
                }

                // take special care of maps and repeated fields
                if (this.map) this.defaultValue = util.emptyObject;else if (this.repeated) this.defaultValue = util.emptyArray;else this.defaultValue = this.typeDefault;

                // ensure proper value on prototype
                if (this.parent instanceof Type) this.parent.ctor.prototype[this.name] = this.defaultValue;

                return ReflectionObject.prototype.resolve.call(this);
            };

            /**
            * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
            * @typedef FieldDecorator
            * @type {function}
            * @param {Object} prototype Target prototype
            * @param {string} fieldName Field name
            * @returns {undefined}
            */

            /**
            * Field decorator (TypeScript).
            * @name Field.d
            * @function
            * @param {number} fieldId Field id
            * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
            * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
            * @param {T} [defaultValue] Default value
            * @returns {FieldDecorator} Decorator function
            * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
            */
            Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {

                // submessage: decorate the submessage and use its name as the type
                if (typeof fieldType === "function") fieldType = util.decorateType(fieldType).name;

                // enum reference: create a reflected copy of the enum and keep reuseing it
                else if (fieldType && (typeof fieldType === "undefined" ? "undefined" : _typeof(fieldType)) === "object") fieldType = util.decorateEnum(fieldType).name;

                return function fieldDecorator(prototype, fieldName) {
                    util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
                };
            };

            /**
            * Field decorator (TypeScript).
            * @name Field.d
            * @function
            * @param {number} fieldId Field id
            * @param {Constructor<T>|string} fieldType Field type
            * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
            * @returns {FieldDecorator} Decorator function
            * @template T extends Message<T>
            * @variation 2
            */
            // like Field.d but without a default value

            // Sets up cyclic dependencies (called in index-light)
            Field._configure = function configure(Type_) {
                Type = Type_;
            };
        }, { "15": 15, "24": 24, "36": 36, "37": 37 }], 17: [function (require, module, exports) {
            "use strict";

            var protobuf = module.exports = require(18);

            protobuf.build = "light";

            /**
            * A node-style callback as used by {@link load} and {@link Root#load}.
            * @typedef LoadCallback
            * @type {function}
            * @param {Error|null} error Error, if any, otherwise `null`
            * @param {Root} [root] Root, if there hasn't been an error
            * @returns {undefined}
            */

            /**
            * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
            * @param {string|string[]} filename One or multiple files to load
            * @param {Root} root Root namespace, defaults to create a new one if omitted.
            * @param {LoadCallback} callback Callback function
            * @returns {undefined}
            * @see {@link Root#load}
            */
            function load(filename, root, callback) {
                if (typeof root === "function") {
                    callback = root;
                    root = new protobuf.Root();
                } else if (!root) root = new protobuf.Root();
                return root.load(filename, callback);
            }

            /**
            * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
            * @name load
            * @function
            * @param {string|string[]} filename One or multiple files to load
            * @param {LoadCallback} callback Callback function
            * @returns {undefined}
            * @see {@link Root#load}
            * @variation 2
            */
            // function load(filename:string, callback:LoadCallback):undefined

            /**
            * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
            * @name load
            * @function
            * @param {string|string[]} filename One or multiple files to load
            * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
            * @returns {Promise<Root>} Promise
            * @see {@link Root#load}
            * @variation 3
            */
            // function load(filename:string, [root:Root]):Promise<Root>

            protobuf.load = load;

            /**
            * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
            * @param {string|string[]} filename One or multiple files to load
            * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
            * @returns {Root} Root namespace
            * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
            * @see {@link Root#loadSync}
            */
            function loadSync(filename, root) {
                if (!root) root = new protobuf.Root();
                return root.loadSync(filename);
            }

            protobuf.loadSync = loadSync;

            // Serialization
            protobuf.encoder = require(14);
            protobuf.decoder = require(13);
            protobuf.verifier = require(40);
            protobuf.converter = require(12);

            // Reflection
            protobuf.ReflectionObject = require(24);
            protobuf.Namespace = require(23);
            protobuf.Root = require(29);
            protobuf.Enum = require(15);
            protobuf.Type = require(35);
            protobuf.Field = require(16);
            protobuf.OneOf = require(25);
            protobuf.MapField = require(20);
            protobuf.Service = require(33);
            protobuf.Method = require(22);

            // Runtime
            protobuf.Message = require(21);
            protobuf.wrappers = require(41);

            // Utility
            protobuf.types = require(36);
            protobuf.util = require(37);

            // Set up possibly cyclic reflection dependencies
            protobuf.ReflectionObject._configure(protobuf.Root);
            protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
            protobuf.Root._configure(protobuf.Type);
            protobuf.Field._configure(protobuf.Type);
        }, { "12": 12, "13": 13, "14": 14, "15": 15, "16": 16, "18": 18, "20": 20, "21": 21, "22": 22, "23": 23, "24": 24, "25": 25, "29": 29, "33": 33, "35": 35, "36": 36, "37": 37, "40": 40, "41": 41 }], 18: [function (require, module, exports) {
            "use strict";

            var protobuf = exports;

            /**
            * Build type, one of `"full"`, `"light"` or `"minimal"`.
            * @name build
            * @type {string}
            * @const
            */
            protobuf.build = "minimal";

            // Serialization
            protobuf.Writer = require(42);
            protobuf.BufferWriter = require(43);
            protobuf.Reader = require(27);
            protobuf.BufferReader = require(28);

            // Utility
            protobuf.util = require(39);
            protobuf.rpc = require(31);
            protobuf.roots = require(30);
            protobuf.configure = configure;

            /* istanbul ignore next */
            /**
            * Reconfigures the library according to the environment.
            * @returns {undefined}
            */
            function configure() {
                protobuf.Reader._configure(protobuf.BufferReader);
                protobuf.util._configure();
            }

            // Set up buffer utility according to the environment
            protobuf.Writer._configure(protobuf.BufferWriter);
            configure();
        }, { "27": 27, "28": 28, "30": 30, "31": 31, "39": 39, "42": 42, "43": 43 }], 19: [function (require, module, exports) {
            "use strict";

            var protobuf = module.exports = require(17);

            protobuf.build = "full";

            // Parser
            protobuf.tokenize = require(34);
            protobuf.parse = require(26);
            protobuf.common = require(11);

            // Configure parser
            protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);
        }, { "11": 11, "17": 17, "26": 26, "34": 34 }], 20: [function (require, module, exports) {
            "use strict";

            module.exports = MapField;

            // extends Field
            var Field = require(16);
            ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

            var types = require(36),
                util = require(37);

            /**
            * Constructs a new map field instance.
            * @classdesc Reflected map field.
            * @extends FieldBase
            * @constructor
            * @param {string} name Unique name within its namespace
            * @param {number} id Unique id within its namespace
            * @param {string} keyType Key type
            * @param {string} type Value type
            * @param {Object.<string,*>} [options] Declared options
            * @param {string} [comment] Comment associated with this field
            */
            function MapField(name, id, keyType, type, options, comment) {
                Field.call(this, name, id, type, undefined, undefined, options, comment);

                /* istanbul ignore if */
                if (!util.isString(keyType)) throw TypeError("keyType must be a string");

                /**
                 * Key type.
                 * @type {string}
                 */
                this.keyType = keyType; // toJSON, marker

                /**
                 * Resolved key type if not a basic type.
                 * @type {ReflectionObject|null}
                 */
                this.resolvedKeyType = null;

                // Overrides Field#map
                this.map = true;
            }

            /**
            * Map field descriptor.
            * @interface IMapField
            * @extends {IField}
            * @property {string} keyType Key type
            */

            /**
            * Extension map field descriptor.
            * @interface IExtensionMapField
            * @extends IMapField
            * @property {string} extend Extended type
            */

            /**
            * Constructs a map field from a map field descriptor.
            * @param {string} name Field name
            * @param {IMapField} json Map field descriptor
            * @returns {MapField} Created map field
            * @throws {TypeError} If arguments are invalid
            */
            MapField.fromJSON = function fromJSON(name, json) {
                return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
            };

            /**
            * Converts this map field to a map field descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {IMapField} Map field descriptor
            */
            MapField.prototype.toJSON = function toJSON(toJSONOptions) {
                var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
                return util.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", keepComments ? this.comment : undefined]);
            };

            /**
            * @override
            */
            MapField.prototype.resolve = function resolve() {
                if (this.resolved) return this;

                // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"
                if (types.mapKey[this.keyType] === undefined) throw Error("invalid key type: " + this.keyType);

                return Field.prototype.resolve.call(this);
            };

            /**
            * Map field decorator (TypeScript).
            * @name MapField.d
            * @function
            * @param {number} fieldId Field id
            * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
            * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
            * @returns {FieldDecorator} Decorator function
            * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
            */
            MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {

                // submessage value: decorate the submessage and use its name as the type
                if (typeof fieldValueType === "function") fieldValueType = util.decorateType(fieldValueType).name;

                // enum reference value: create a reflected copy of the enum and keep reuseing it
                else if (fieldValueType && (typeof fieldValueType === "undefined" ? "undefined" : _typeof(fieldValueType)) === "object") fieldValueType = util.decorateEnum(fieldValueType).name;

                return function mapFieldDecorator(prototype, fieldName) {
                    util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
                };
            };
        }, { "16": 16, "36": 36, "37": 37 }], 21: [function (require, module, exports) {
            "use strict";

            module.exports = Message;

            var util = require(39);

            /**
            * Constructs a new message instance.
            * @classdesc Abstract runtime message.
            * @constructor
            * @param {Properties<T>} [properties] Properties to set
            * @template T extends object = object
            */
            function Message(properties) {
                // not used internally
                if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    this[keys[i]] = properties[keys[i]];
                }
            }

            /**
            * Reference to the reflected type.
            * @name Message.$type
            * @type {Type}
            * @readonly
            */

            /**
            * Reference to the reflected type.
            * @name Message#$type
            * @type {Type}
            * @readonly
            */

            /*eslint-disable valid-jsdoc*/

            /**
            * Creates a new message of this type using the specified properties.
            * @param {Object.<string,*>} [properties] Properties to set
            * @returns {Message<T>} Message instance
            * @template T extends Message<T>
            * @this Constructor<T>
            */
            Message.create = function create(properties) {
                return this.$type.create(properties);
            };

            /**
            * Encodes a message of this type.
            * @param {T|Object.<string,*>} message Message to encode
            * @param {Writer} [writer] Writer to use
            * @returns {Writer} Writer
            * @template T extends Message<T>
            * @this Constructor<T>
            */
            Message.encode = function encode(message, writer) {
                return this.$type.encode(message, writer);
            };

            /**
            * Encodes a message of this type preceeded by its length as a varint.
            * @param {T|Object.<string,*>} message Message to encode
            * @param {Writer} [writer] Writer to use
            * @returns {Writer} Writer
            * @template T extends Message<T>
            * @this Constructor<T>
            */
            Message.encodeDelimited = function encodeDelimited(message, writer) {
                return this.$type.encodeDelimited(message, writer);
            };

            /**
            * Decodes a message of this type.
            * @name Message.decode
            * @function
            * @param {Reader|Uint8Array} reader Reader or buffer to decode
            * @returns {T} Decoded message
            * @template T extends Message<T>
            * @this Constructor<T>
            */
            Message.decode = function decode(reader) {
                return this.$type.decode(reader);
            };

            /**
            * Decodes a message of this type preceeded by its length as a varint.
            * @name Message.decodeDelimited
            * @function
            * @param {Reader|Uint8Array} reader Reader or buffer to decode
            * @returns {T} Decoded message
            * @template T extends Message<T>
            * @this Constructor<T>
            */
            Message.decodeDelimited = function decodeDelimited(reader) {
                return this.$type.decodeDelimited(reader);
            };

            /**
            * Verifies a message of this type.
            * @name Message.verify
            * @function
            * @param {Object.<string,*>} message Plain object to verify
            * @returns {string|null} `null` if valid, otherwise the reason why it is not
            */
            Message.verify = function verify(message) {
                return this.$type.verify(message);
            };

            /**
            * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
            * @param {Object.<string,*>} object Plain object
            * @returns {T} Message instance
            * @template T extends Message<T>
            * @this Constructor<T>
            */
            Message.fromObject = function fromObject(object) {
                return this.$type.fromObject(object);
            };

            /**
            * Creates a plain object from a message of this type. Also converts values to other types if specified.
            * @param {T} message Message instance
            * @param {IConversionOptions} [options] Conversion options
            * @returns {Object.<string,*>} Plain object
            * @template T extends Message<T>
            * @this Constructor<T>
            */
            Message.toObject = function toObject(message, options) {
                return this.$type.toObject(message, options);
            };

            /**
            * Converts this message to JSON.
            * @returns {Object.<string,*>} JSON object
            */
            Message.prototype.toJSON = function toJSON() {
                return this.$type.toObject(this, util.toJSONOptions);
            };

            /*eslint-enable valid-jsdoc*/
        }, { "39": 39 }], 22: [function (require, module, exports) {
            "use strict";

            module.exports = Method;

            // extends ReflectionObject
            var ReflectionObject = require(24);
            ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";

            var util = require(37);

            /**
            * Constructs a new service method instance.
            * @classdesc Reflected service method.
            * @extends ReflectionObject
            * @constructor
            * @param {string} name Method name
            * @param {string|undefined} type Method type, usually `"rpc"`
            * @param {string} requestType Request message type
            * @param {string} responseType Response message type
            * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
            * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
            * @param {Object.<string,*>} [options] Declared options
            * @param {string} [comment] The comment for this method
            */
            function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment) {

                /* istanbul ignore next */
                if (util.isObject(requestStream)) {
                    options = requestStream;
                    requestStream = responseStream = undefined;
                } else if (util.isObject(responseStream)) {
                    options = responseStream;
                    responseStream = undefined;
                }

                /* istanbul ignore if */
                if (!(type === undefined || util.isString(type))) throw TypeError("type must be a string");

                /* istanbul ignore if */
                if (!util.isString(requestType)) throw TypeError("requestType must be a string");

                /* istanbul ignore if */
                if (!util.isString(responseType)) throw TypeError("responseType must be a string");

                ReflectionObject.call(this, name, options);

                /**
                 * Method type.
                 * @type {string}
                 */
                this.type = type || "rpc"; // toJSON

                /**
                 * Request type.
                 * @type {string}
                 */
                this.requestType = requestType; // toJSON, marker

                /**
                 * Whether requests are streamed or not.
                 * @type {boolean|undefined}
                 */
                this.requestStream = requestStream ? true : undefined; // toJSON

                /**
                 * Response type.
                 * @type {string}
                 */
                this.responseType = responseType; // toJSON

                /**
                 * Whether responses are streamed or not.
                 * @type {boolean|undefined}
                 */
                this.responseStream = responseStream ? true : undefined; // toJSON

                /**
                 * Resolved request type.
                 * @type {Type|null}
                 */
                this.resolvedRequestType = null;

                /**
                 * Resolved response type.
                 * @type {Type|null}
                 */
                this.resolvedResponseType = null;

                /**
                 * Comment for this method
                 * @type {string|null}
                 */
                this.comment = comment;
            }

            /**
            * Method descriptor.
            * @interface IMethod
            * @property {string} [type="rpc"] Method type
            * @property {string} requestType Request type
            * @property {string} responseType Response type
            * @property {boolean} [requestStream=false] Whether requests are streamed
            * @property {boolean} [responseStream=false] Whether responses are streamed
            * @property {Object.<string,*>} [options] Method options
            */

            /**
            * Constructs a method from a method descriptor.
            * @param {string} name Method name
            * @param {IMethod} json Method descriptor
            * @returns {Method} Created method
            * @throws {TypeError} If arguments are invalid
            */
            Method.fromJSON = function fromJSON(name, json) {
                return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment);
            };

            /**
            * Converts this method to a method descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {IMethod} Method descriptor
            */
            Method.prototype.toJSON = function toJSON(toJSONOptions) {
                var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
                return util.toObject(["type", this.type !== "rpc" && /* istanbul ignore next */this.type || undefined, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", keepComments ? this.comment : undefined]);
            };

            /**
            * @override
            */
            Method.prototype.resolve = function resolve() {

                /* istanbul ignore if */
                if (this.resolved) return this;

                this.resolvedRequestType = this.parent.lookupType(this.requestType);
                this.resolvedResponseType = this.parent.lookupType(this.responseType);

                return ReflectionObject.prototype.resolve.call(this);
            };
        }, { "24": 24, "37": 37 }], 23: [function (require, module, exports) {
            "use strict";

            module.exports = Namespace;

            // extends ReflectionObject
            var ReflectionObject = require(24);
            ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";

            var Field = require(16),
                util = require(37);

            var Type, // cyclic
            Service, Enum;

            /**
            * Constructs a new namespace instance.
            * @name Namespace
            * @classdesc Reflected namespace.
            * @extends NamespaceBase
            * @constructor
            * @param {string} name Namespace name
            * @param {Object.<string,*>} [options] Declared options
            */

            /**
            * Constructs a namespace from JSON.
            * @memberof Namespace
            * @function
            * @param {string} name Namespace name
            * @param {Object.<string,*>} json JSON object
            * @returns {Namespace} Created namespace
            * @throws {TypeError} If arguments are invalid
            */
            Namespace.fromJSON = function fromJSON(name, json) {
                return new Namespace(name, json.options).addJSON(json.nested);
            };

            /**
            * Converts an array of reflection objects to JSON.
            * @memberof Namespace
            * @param {ReflectionObject[]} array Object array
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
            */
            function arrayToJSON(array, toJSONOptions) {
                if (!(array && array.length)) return undefined;
                var obj = {};
                for (var i = 0; i < array.length; ++i) {
                    obj[array[i].name] = array[i].toJSON(toJSONOptions);
                }return obj;
            }

            Namespace.arrayToJSON = arrayToJSON;

            /**
            * Tests if the specified id is reserved.
            * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
            * @param {number} id Id to test
            * @returns {boolean} `true` if reserved, otherwise `false`
            */
            Namespace.isReservedId = function isReservedId(reserved, id) {
                if (reserved) for (var i = 0; i < reserved.length; ++i) {
                    if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] >= id) return true;
                }return false;
            };

            /**
            * Tests if the specified name is reserved.
            * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
            * @param {string} name Name to test
            * @returns {boolean} `true` if reserved, otherwise `false`
            */
            Namespace.isReservedName = function isReservedName(reserved, name) {
                if (reserved) for (var i = 0; i < reserved.length; ++i) {
                    if (reserved[i] === name) return true;
                }return false;
            };

            /**
            * Not an actual constructor. Use {@link Namespace} instead.
            * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
            * @exports NamespaceBase
            * @extends ReflectionObject
            * @abstract
            * @constructor
            * @param {string} name Namespace name
            * @param {Object.<string,*>} [options] Declared options
            * @see {@link Namespace}
            */
            function Namespace(name, options) {
                ReflectionObject.call(this, name, options);

                /**
                 * Nested objects by name.
                 * @type {Object.<string,ReflectionObject>|undefined}
                 */
                this.nested = undefined; // toJSON

                /**
                 * Cached nested objects as an array.
                 * @type {ReflectionObject[]|null}
                 * @private
                 */
                this._nestedArray = null;
            }

            function clearCache(namespace) {
                namespace._nestedArray = null;
                return namespace;
            }

            /**
            * Nested objects of this namespace as an array for iteration.
            * @name NamespaceBase#nestedArray
            * @type {ReflectionObject[]}
            * @readonly
            */
            Object.defineProperty(Namespace.prototype, "nestedArray", {
                get: function get() {
                    return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
                }
            });

            /**
            * Namespace descriptor.
            * @interface INamespace
            * @property {Object.<string,*>} [options] Namespace options
            * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
            */

            /**
            * Any extension field descriptor.
            * @typedef AnyExtensionField
            * @type {IExtensionField|IExtensionMapField}
            */

            /**
            * Any nested object descriptor.
            * @typedef AnyNestedObject
            * @type {IEnum|IType|IService|AnyExtensionField|INamespace}
            */
            // ^ BEWARE: VSCode hangs forever when using more than 5 types (that's why AnyExtensionField exists in the first place)

            /**
            * Converts this namespace to a namespace descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {INamespace} Namespace descriptor
            */
            Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
                return util.toObject(["options", this.options, "nested", arrayToJSON(this.nestedArray, toJSONOptions)]);
            };

            /**
            * Adds nested objects to this namespace from nested object descriptors.
            * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
            * @returns {Namespace} `this`
            */
            Namespace.prototype.addJSON = function addJSON(nestedJson) {
                var ns = this;
                /* istanbul ignore else */
                if (nestedJson) {
                    for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
                        nested = nestedJson[names[i]];
                        ns.add( // most to least likely
                        (nested.fields !== undefined ? Type.fromJSON : nested.values !== undefined ? Enum.fromJSON : nested.methods !== undefined ? Service.fromJSON : nested.id !== undefined ? Field.fromJSON : Namespace.fromJSON)(names[i], nested));
                    }
                }
                return this;
            };

            /**
            * Gets the nested object of the specified name.
            * @param {string} name Nested object name
            * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
            */
            Namespace.prototype.get = function get(name) {
                return this.nested && this.nested[name] || null;
            };

            /**
            * Gets the values of the nested {@link Enum|enum} of the specified name.
            * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
            * @param {string} name Nested enum name
            * @returns {Object.<string,number>} Enum values
            * @throws {Error} If there is no such enum
            */
            Namespace.prototype.getEnum = function getEnum(name) {
                if (this.nested && this.nested[name] instanceof Enum) return this.nested[name].values;
                throw Error("no such enum: " + name);
            };

            /**
            * Adds a nested object to this namespace.
            * @param {ReflectionObject} object Nested object to add
            * @returns {Namespace} `this`
            * @throws {TypeError} If arguments are invalid
            * @throws {Error} If there is already a nested object with this name
            */
            Namespace.prototype.add = function add(object) {

                if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace)) throw TypeError("object must be a valid nested object");

                if (!this.nested) this.nested = {};else {
                    var prev = this.get(object.name);
                    if (prev) {
                        if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
                            // replace plain namespace but keep existing nested elements and options
                            var nested = prev.nestedArray;
                            for (var i = 0; i < nested.length; ++i) {
                                object.add(nested[i]);
                            }this.remove(prev);
                            if (!this.nested) this.nested = {};
                            object.setOptions(prev.options, true);
                        } else throw Error("duplicate name '" + object.name + "' in " + this);
                    }
                }
                this.nested[object.name] = object;
                object.onAdd(this);
                return clearCache(this);
            };

            /**
            * Removes a nested object from this namespace.
            * @param {ReflectionObject} object Nested object to remove
            * @returns {Namespace} `this`
            * @throws {TypeError} If arguments are invalid
            * @throws {Error} If `object` is not a member of this namespace
            */
            Namespace.prototype.remove = function remove(object) {

                if (!(object instanceof ReflectionObject)) throw TypeError("object must be a ReflectionObject");
                if (object.parent !== this) throw Error(object + " is not a member of " + this);

                delete this.nested[object.name];
                if (!Object.keys(this.nested).length) this.nested = undefined;

                object.onRemove(this);
                return clearCache(this);
            };

            /**
            * Defines additial namespaces within this one if not yet existing.
            * @param {string|string[]} path Path to create
            * @param {*} [json] Nested types to create from JSON
            * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
            */
            Namespace.prototype.define = function define(path, json) {

                if (util.isString(path)) path = path.split(".");else if (!Array.isArray(path)) throw TypeError("illegal path");
                if (path && path.length && path[0] === "") throw Error("path must be relative");

                var ptr = this;
                while (path.length > 0) {
                    var part = path.shift();
                    if (ptr.nested && ptr.nested[part]) {
                        ptr = ptr.nested[part];
                        if (!(ptr instanceof Namespace)) throw Error("path conflicts with non-namespace objects");
                    } else ptr.add(ptr = new Namespace(part));
                }
                if (json) ptr.addJSON(json);
                return ptr;
            };

            /**
            * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
            * @returns {Namespace} `this`
            */
            Namespace.prototype.resolveAll = function resolveAll() {
                var nested = this.nestedArray,
                    i = 0;
                while (i < nested.length) {
                    if (nested[i] instanceof Namespace) nested[i++].resolveAll();else nested[i++].resolve();
                }return this.resolve();
            };

            /**
            * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
            * @param {string|string[]} path Path to look up
            * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
            * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
            * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
            */
            Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {

                /* istanbul ignore next */
                if (typeof filterTypes === "boolean") {
                    parentAlreadyChecked = filterTypes;
                    filterTypes = undefined;
                } else if (filterTypes && !Array.isArray(filterTypes)) filterTypes = [filterTypes];

                if (util.isString(path) && path.length) {
                    if (path === ".") return this.root;
                    path = path.split(".");
                } else if (!path.length) return this;

                // Start at root if path is absolute
                if (path[0] === "") return this.root.lookup(path.slice(1), filterTypes);

                // Test if the first part matches any nested object, and if so, traverse if path contains more
                var found = this.get(path[0]);
                if (found) {
                    if (path.length === 1) {
                        if (!filterTypes || filterTypes.indexOf(found.constructor) > -1) return found;
                    } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true))) return found;

                    // Otherwise try each nested namespace
                } else for (var i = 0; i < this.nestedArray.length; ++i) {
                    if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true))) return found;
                } // If there hasn't been a match, try again at the parent
                if (this.parent === null || parentAlreadyChecked) return null;
                return this.parent.lookup(path, filterTypes);
            };

            /**
            * Looks up the reflection object at the specified path, relative to this namespace.
            * @name NamespaceBase#lookup
            * @function
            * @param {string|string[]} path Path to look up
            * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
            * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
            * @variation 2
            */
            // lookup(path: string, [parentAlreadyChecked: boolean])

            /**
            * Looks up the {@link Type|type} at the specified path, relative to this namespace.
            * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
            * @param {string|string[]} path Path to look up
            * @returns {Type} Looked up type
            * @throws {Error} If `path` does not point to a type
            */
            Namespace.prototype.lookupType = function lookupType(path) {
                var found = this.lookup(path, [Type]);
                if (!found) throw Error("no such type: " + path);
                return found;
            };

            /**
            * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
            * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
            * @param {string|string[]} path Path to look up
            * @returns {Enum} Looked up enum
            * @throws {Error} If `path` does not point to an enum
            */
            Namespace.prototype.lookupEnum = function lookupEnum(path) {
                var found = this.lookup(path, [Enum]);
                if (!found) throw Error("no such Enum '" + path + "' in " + this);
                return found;
            };

            /**
            * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
            * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
            * @param {string|string[]} path Path to look up
            * @returns {Type} Looked up type or enum
            * @throws {Error} If `path` does not point to a type or enum
            */
            Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
                var found = this.lookup(path, [Type, Enum]);
                if (!found) throw Error("no such Type or Enum '" + path + "' in " + this);
                return found;
            };

            /**
            * Looks up the {@link Service|service} at the specified path, relative to this namespace.
            * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
            * @param {string|string[]} path Path to look up
            * @returns {Service} Looked up service
            * @throws {Error} If `path` does not point to a service
            */
            Namespace.prototype.lookupService = function lookupService(path) {
                var found = this.lookup(path, [Service]);
                if (!found) throw Error("no such Service '" + path + "' in " + this);
                return found;
            };

            // Sets up cyclic dependencies (called in index-light)
            Namespace._configure = function (Type_, Service_, Enum_) {
                Type = Type_;
                Service = Service_;
                Enum = Enum_;
            };
        }, { "16": 16, "24": 24, "37": 37 }], 24: [function (require, module, exports) {
            "use strict";

            module.exports = ReflectionObject;

            ReflectionObject.className = "ReflectionObject";

            var util = require(37);

            var Root; // cyclic

            /**
            * Constructs a new reflection object instance.
            * @classdesc Base class of all reflection objects.
            * @constructor
            * @param {string} name Object name
            * @param {Object.<string,*>} [options] Declared options
            * @abstract
            */
            function ReflectionObject(name, options) {

                if (!util.isString(name)) throw TypeError("name must be a string");

                if (options && !util.isObject(options)) throw TypeError("options must be an object");

                /**
                 * Options.
                 * @type {Object.<string,*>|undefined}
                 */
                this.options = options; // toJSON

                /**
                 * Unique name within its namespace.
                 * @type {string}
                 */
                this.name = name;

                /**
                 * Parent namespace.
                 * @type {Namespace|null}
                 */
                this.parent = null;

                /**
                 * Whether already resolved or not.
                 * @type {boolean}
                 */
                this.resolved = false;

                /**
                 * Comment text, if any.
                 * @type {string|null}
                 */
                this.comment = null;

                /**
                 * Defining file name.
                 * @type {string|null}
                 */
                this.filename = null;
            }

            Object.defineProperties(ReflectionObject.prototype, {

                /**
                 * Reference to the root namespace.
                 * @name ReflectionObject#root
                 * @type {Root}
                 * @readonly
                 */
                root: {
                    get: function get() {
                        var ptr = this;
                        while (ptr.parent !== null) {
                            ptr = ptr.parent;
                        }return ptr;
                    }
                },

                /**
                 * Full name including leading dot.
                 * @name ReflectionObject#fullName
                 * @type {string}
                 * @readonly
                 */
                fullName: {
                    get: function get() {
                        var path = [this.name],
                            ptr = this.parent;
                        while (ptr) {
                            path.unshift(ptr.name);
                            ptr = ptr.parent;
                        }
                        return path.join(".");
                    }
                }
            });

            /**
            * Converts this reflection object to its descriptor representation.
            * @returns {Object.<string,*>} Descriptor
            * @abstract
            */
            ReflectionObject.prototype.toJSON = /* istanbul ignore next */function toJSON() {
                throw Error(); // not implemented, shouldn't happen
            };

            /**
            * Called when this object is added to a parent.
            * @param {ReflectionObject} parent Parent added to
            * @returns {undefined}
            */
            ReflectionObject.prototype.onAdd = function onAdd(parent) {
                if (this.parent && this.parent !== parent) this.parent.remove(this);
                this.parent = parent;
                this.resolved = false;
                var root = parent.root;
                if (root instanceof Root) root._handleAdd(this);
            };

            /**
            * Called when this object is removed from a parent.
            * @param {ReflectionObject} parent Parent removed from
            * @returns {undefined}
            */
            ReflectionObject.prototype.onRemove = function onRemove(parent) {
                var root = parent.root;
                if (root instanceof Root) root._handleRemove(this);
                this.parent = null;
                this.resolved = false;
            };

            /**
            * Resolves this objects type references.
            * @returns {ReflectionObject} `this`
            */
            ReflectionObject.prototype.resolve = function resolve() {
                if (this.resolved) return this;
                if (this.root instanceof Root) this.resolved = true; // only if part of a root
                return this;
            };

            /**
            * Gets an option value.
            * @param {string} name Option name
            * @returns {*} Option value or `undefined` if not set
            */
            ReflectionObject.prototype.getOption = function getOption(name) {
                if (this.options) return this.options[name];
                return undefined;
            };

            /**
            * Sets an option.
            * @param {string} name Option name
            * @param {*} value Option value
            * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
            * @returns {ReflectionObject} `this`
            */
            ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
                if (!ifNotSet || !this.options || this.options[name] === undefined) (this.options || (this.options = {}))[name] = value;
                return this;
            };

            /**
            * Sets multiple options.
            * @param {Object.<string,*>} options Options to set
            * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
            * @returns {ReflectionObject} `this`
            */
            ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
                if (options) for (var keys = Object.keys(options), i = 0; i < keys.length; ++i) {
                    this.setOption(keys[i], options[keys[i]], ifNotSet);
                }return this;
            };

            /**
            * Converts this instance to its string representation.
            * @returns {string} Class name[, space, full name]
            */
            ReflectionObject.prototype.toString = function toString() {
                var className = this.constructor.className,
                    fullName = this.fullName;
                if (fullName.length) return className + " " + fullName;
                return className;
            };

            // Sets up cyclic dependencies (called in index-light)
            ReflectionObject._configure = function (Root_) {
                Root = Root_;
            };
        }, { "37": 37 }], 25: [function (require, module, exports) {
            "use strict";

            module.exports = OneOf;

            // extends ReflectionObject
            var ReflectionObject = require(24);
            ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";

            var Field = require(16),
                util = require(37);

            /**
            * Constructs a new oneof instance.
            * @classdesc Reflected oneof.
            * @extends ReflectionObject
            * @constructor
            * @param {string} name Oneof name
            * @param {string[]|Object.<string,*>} [fieldNames] Field names
            * @param {Object.<string,*>} [options] Declared options
            * @param {string} [comment] Comment associated with this field
            */
            function OneOf(name, fieldNames, options, comment) {
                if (!Array.isArray(fieldNames)) {
                    options = fieldNames;
                    fieldNames = undefined;
                }
                ReflectionObject.call(this, name, options);

                /* istanbul ignore if */
                if (!(fieldNames === undefined || Array.isArray(fieldNames))) throw TypeError("fieldNames must be an Array");

                /**
                 * Field names that belong to this oneof.
                 * @type {string[]}
                 */
                this.oneof = fieldNames || []; // toJSON, marker

                /**
                 * Fields that belong to this oneof as an array for iteration.
                 * @type {Field[]}
                 * @readonly
                 */
                this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent

                /**
                 * Comment for this field.
                 * @type {string|null}
                 */
                this.comment = comment;
            }

            /**
            * Oneof descriptor.
            * @interface IOneOf
            * @property {Array.<string>} oneof Oneof field names
            * @property {Object.<string,*>} [options] Oneof options
            */

            /**
            * Constructs a oneof from a oneof descriptor.
            * @param {string} name Oneof name
            * @param {IOneOf} json Oneof descriptor
            * @returns {OneOf} Created oneof
            * @throws {TypeError} If arguments are invalid
            */
            OneOf.fromJSON = function fromJSON(name, json) {
                return new OneOf(name, json.oneof, json.options, json.comment);
            };

            /**
            * Converts this oneof to a oneof descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {IOneOf} Oneof descriptor
            */
            OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
                var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
                return util.toObject(["options", this.options, "oneof", this.oneof, "comment", keepComments ? this.comment : undefined]);
            };

            /**
            * Adds the fields of the specified oneof to the parent if not already done so.
            * @param {OneOf} oneof The oneof
            * @returns {undefined}
            * @inner
            * @ignore
            */
            function addFieldsToParent(oneof) {
                if (oneof.parent) for (var i = 0; i < oneof.fieldsArray.length; ++i) {
                    if (!oneof.fieldsArray[i].parent) oneof.parent.add(oneof.fieldsArray[i]);
                }
            }

            /**
            * Adds a field to this oneof and removes it from its current parent, if any.
            * @param {Field} field Field to add
            * @returns {OneOf} `this`
            */
            OneOf.prototype.add = function add(field) {

                /* istanbul ignore if */
                if (!(field instanceof Field)) throw TypeError("field must be a Field");

                if (field.parent && field.parent !== this.parent) field.parent.remove(field);
                this.oneof.push(field.name);
                this.fieldsArray.push(field);
                field.partOf = this; // field.parent remains null
                addFieldsToParent(this);
                return this;
            };

            /**
            * Removes a field from this oneof and puts it back to the oneof's parent.
            * @param {Field} field Field to remove
            * @returns {OneOf} `this`
            */
            OneOf.prototype.remove = function remove(field) {

                /* istanbul ignore if */
                if (!(field instanceof Field)) throw TypeError("field must be a Field");

                var index = this.fieldsArray.indexOf(field);

                /* istanbul ignore if */
                if (index < 0) throw Error(field + " is not a member of " + this);

                this.fieldsArray.splice(index, 1);
                index = this.oneof.indexOf(field.name);

                /* istanbul ignore else */
                if (index > -1) // theoretical
                    this.oneof.splice(index, 1);

                field.partOf = null;
                return this;
            };

            /**
            * @override
            */
            OneOf.prototype.onAdd = function onAdd(parent) {
                ReflectionObject.prototype.onAdd.call(this, parent);
                var self = this;
                // Collect present fields
                for (var i = 0; i < this.oneof.length; ++i) {
                    var field = parent.get(this.oneof[i]);
                    if (field && !field.partOf) {
                        field.partOf = self;
                        self.fieldsArray.push(field);
                    }
                }
                // Add not yet present fields
                addFieldsToParent(this);
            };

            /**
            * @override
            */
            OneOf.prototype.onRemove = function onRemove(parent) {
                for (var i = 0, field; i < this.fieldsArray.length; ++i) {
                    if ((field = this.fieldsArray[i]).parent) field.parent.remove(field);
                }ReflectionObject.prototype.onRemove.call(this, parent);
            };

            /**
            * Decorator function as returned by {@link OneOf.d} (TypeScript).
            * @typedef OneOfDecorator
            * @type {function}
            * @param {Object} prototype Target prototype
            * @param {string} oneofName OneOf name
            * @returns {undefined}
            */

            /**
            * OneOf decorator (TypeScript).
            * @function
            * @param {...string} fieldNames Field names
            * @returns {OneOfDecorator} Decorator function
            * @template T extends string
            */
            OneOf.d = function decorateOneOf() {
                var fieldNames = new Array(arguments.length),
                    index = 0;
                while (index < arguments.length) {
                    fieldNames[index] = arguments[index++];
                }return function oneOfDecorator(prototype, oneofName) {
                    util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
                    Object.defineProperty(prototype, oneofName, {
                        get: util.oneOfGetter(fieldNames),
                        set: util.oneOfSetter(fieldNames)
                    });
                };
            };
        }, { "16": 16, "24": 24, "37": 37 }], 26: [function (require, module, exports) {
            "use strict";

            module.exports = parse;

            parse.filename = null;
            parse.defaults = { keepCase: false };

            var tokenize = require(34),
                Root = require(29),
                Type = require(35),
                Field = require(16),
                MapField = require(20),
                OneOf = require(25),
                Enum = require(15),
                Service = require(33),
                Method = require(22),
                types = require(36),
                util = require(37);

            var base10Re = /^[1-9][0-9]*$/,
                base10NegRe = /^-?[1-9][0-9]*$/,
                base16Re = /^0[x][0-9a-fA-F]+$/,
                base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
                base8Re = /^0[0-7]+$/,
                base8NegRe = /^-?0[0-7]+$/,
                numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
                nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
                typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
                fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

            /**
            * Result object returned from {@link parse}.
            * @interface IParserResult
            * @property {string|undefined} package Package name, if declared
            * @property {string[]|undefined} imports Imports, if any
            * @property {string[]|undefined} weakImports Weak imports, if any
            * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
            * @property {Root} root Populated root instance
            */

            /**
            * Options modifying the behavior of {@link parse}.
            * @interface IParseOptions
            * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
            * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
            */

            /**
            * Options modifying the behavior of JSON serialization.
            * @interface IToJSONOptions
            * @property {boolean} [keepComments=false] Serializes comments.
            */

            /**
            * Parses the given .proto source and returns an object with the parsed contents.
            * @param {string} source Source contents
            * @param {Root} root Root to populate
            * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
            * @returns {IParserResult} Parser result
            * @property {string} filename=null Currently processing file name for error reporting, if known
            * @property {IParseOptions} defaults Default {@link IParseOptions}
            */
            function parse(source, root, options) {
                /* eslint-disable callback-return */
                if (!(root instanceof Root)) {
                    options = root;
                    root = new Root();
                }
                if (!options) options = parse.defaults;

                var tn = tokenize(source, options.alternateCommentMode || false),
                    next = tn.next,
                    push = tn.push,
                    peek = tn.peek,
                    skip = tn.skip,
                    cmnt = tn.cmnt;

                var head = true,
                    pkg,
                    imports,
                    weakImports,
                    syntax,
                    isProto3 = false;

                var ptr = root;

                var applyCase = options.keepCase ? function (name) {
                    return name;
                } : util.camelCase;

                /* istanbul ignore next */
                function illegal(token, name, insideTryCatch) {
                    var filename = parse.filename;
                    if (!insideTryCatch) parse.filename = null;
                    return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
                }

                function readString() {
                    var values = [],
                        token;
                    do {
                        /* istanbul ignore if */
                        if ((token = next()) !== "\"" && token !== "'") throw illegal(token);

                        values.push(next());
                        skip(token);
                        token = peek();
                    } while (token === "\"" || token === "'");
                    return values.join("");
                }

                function readValue(acceptTypeRef) {
                    var token = next();
                    switch (token) {
                        case "'":
                        case "\"":
                            push(token);
                            return readString();
                        case "true":case "TRUE":
                            return true;
                        case "false":case "FALSE":
                            return false;
                    }
                    try {
                        return parseNumber(token, /* insideTryCatch */true);
                    } catch (e) {

                        /* istanbul ignore else */
                        if (acceptTypeRef && typeRefRe.test(token)) return token;

                        /* istanbul ignore next */
                        throw illegal(token, "value");
                    }
                }

                function readRanges(target, acceptStrings) {
                    var token, start;
                    do {
                        if (acceptStrings && ((token = peek()) === "\"" || token === "'")) target.push(readString());else target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
                    } while (skip(",", true));
                    skip(";");
                }

                function parseNumber(token, insideTryCatch) {
                    var sign = 1;
                    if (token.charAt(0) === "-") {
                        sign = -1;
                        token = token.substring(1);
                    }
                    switch (token) {
                        case "inf":case "INF":case "Inf":
                            return sign * Infinity;
                        case "nan":case "NAN":case "Nan":case "NaN":
                            return NaN;
                        case "0":
                            return 0;
                    }
                    if (base10Re.test(token)) return sign * parseInt(token, 10);
                    if (base16Re.test(token)) return sign * parseInt(token, 16);
                    if (base8Re.test(token)) return sign * parseInt(token, 8);

                    /* istanbul ignore else */
                    if (numberRe.test(token)) return sign * parseFloat(token);

                    /* istanbul ignore next */
                    throw illegal(token, "number", insideTryCatch);
                }

                function parseId(token, acceptNegative) {
                    switch (token) {
                        case "max":case "MAX":case "Max":
                            return 536870911;
                        case "0":
                            return 0;
                    }

                    /* istanbul ignore if */
                    if (!acceptNegative && token.charAt(0) === "-") throw illegal(token, "id");

                    if (base10NegRe.test(token)) return parseInt(token, 10);
                    if (base16NegRe.test(token)) return parseInt(token, 16);

                    /* istanbul ignore else */
                    if (base8NegRe.test(token)) return parseInt(token, 8);

                    /* istanbul ignore next */
                    throw illegal(token, "id");
                }

                function parsePackage() {

                    /* istanbul ignore if */
                    if (pkg !== undefined) throw illegal("package");

                    pkg = next();

                    /* istanbul ignore if */
                    if (!typeRefRe.test(pkg)) throw illegal(pkg, "name");

                    ptr = ptr.define(pkg);
                    skip(";");
                }

                function parseImport() {
                    var token = peek();
                    var whichImports;
                    switch (token) {
                        case "weak":
                            whichImports = weakImports || (weakImports = []);
                            next();
                            break;
                        case "public":
                            next();
                        // eslint-disable-line no-fallthrough
                        default:
                            whichImports = imports || (imports = []);
                            break;
                    }
                    token = readString();
                    skip(";");
                    whichImports.push(token);
                }

                function parseSyntax() {
                    skip("=");
                    syntax = readString();
                    isProto3 = syntax === "proto3";

                    /* istanbul ignore if */
                    if (!isProto3 && syntax !== "proto2") throw illegal(syntax, "syntax");

                    skip(";");
                }

                function parseCommon(parent, token) {
                    switch (token) {

                        case "option":
                            parseOption(parent, token);
                            skip(";");
                            return true;

                        case "message":
                            parseType(parent, token);
                            return true;

                        case "enum":
                            parseEnum(parent, token);
                            return true;

                        case "service":
                            parseService(parent, token);
                            return true;

                        case "extend":
                            parseExtension(parent, token);
                            return true;
                    }
                    return false;
                }

                function ifBlock(obj, fnIf, fnElse) {
                    var trailingLine = tn.line;
                    if (obj) {
                        obj.comment = cmnt(); // try block-type comment
                        obj.filename = parse.filename;
                    }
                    if (skip("{", true)) {
                        var token;
                        while ((token = next()) !== "}") {
                            fnIf(token);
                        }skip(";", true);
                    } else {
                        if (fnElse) fnElse();
                        skip(";");
                        if (obj && typeof obj.comment !== "string") obj.comment = cmnt(trailingLine); // try line-type comment if no block
                    }
                }

                function parseType(parent, token) {

                    /* istanbul ignore if */
                    if (!nameRe.test(token = next())) throw illegal(token, "type name");

                    var type = new Type(token);
                    ifBlock(type, function parseType_block(token) {
                        if (parseCommon(type, token)) return;

                        switch (token) {

                            case "map":
                                parseMapField(type, token);
                                break;

                            case "required":
                            case "optional":
                            case "repeated":
                                parseField(type, token);
                                break;

                            case "oneof":
                                parseOneOf(type, token);
                                break;

                            case "extensions":
                                readRanges(type.extensions || (type.extensions = []));
                                break;

                            case "reserved":
                                readRanges(type.reserved || (type.reserved = []), true);
                                break;

                            default:
                                /* istanbul ignore if */
                                if (!isProto3 || !typeRefRe.test(token)) throw illegal(token);

                                push(token);
                                parseField(type, "optional");
                                break;
                        }
                    });
                    parent.add(type);
                }

                function parseField(parent, rule, extend) {
                    var type = next();
                    if (type === "group") {
                        parseGroup(parent, rule);
                        return;
                    }

                    /* istanbul ignore if */
                    if (!typeRefRe.test(type)) throw illegal(type, "type");

                    var name = next();

                    /* istanbul ignore if */
                    if (!nameRe.test(name)) throw illegal(name, "name");

                    name = applyCase(name);
                    skip("=");

                    var field = new Field(name, parseId(next()), type, rule, extend);
                    ifBlock(field, function parseField_block(token) {

                        /* istanbul ignore else */
                        if (token === "option") {
                            parseOption(field, token);
                            skip(";");
                        } else throw illegal(token);
                    }, function parseField_line() {
                        parseInlineOptions(field);
                    });
                    parent.add(field);

                    // JSON defaults to packed=true if not set so we have to set packed=false explicity when
                    // parsing proto2 descriptors without the option, where applicable. This must be done for
                    // all known packable types and anything that could be an enum (= is not a basic type).
                    if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined)) field.setOption("packed", false, /* ifNotSet */true);
                }

                function parseGroup(parent, rule) {
                    var name = next();

                    /* istanbul ignore if */
                    if (!nameRe.test(name)) throw illegal(name, "name");

                    var fieldName = util.lcFirst(name);
                    if (name === fieldName) name = util.ucFirst(name);
                    skip("=");
                    var id = parseId(next());
                    var type = new Type(name);
                    type.group = true;
                    var field = new Field(fieldName, id, name, rule);
                    field.filename = parse.filename;
                    ifBlock(type, function parseGroup_block(token) {
                        switch (token) {

                            case "option":
                                parseOption(type, token);
                                skip(";");
                                break;

                            case "required":
                            case "optional":
                            case "repeated":
                                parseField(type, token);
                                break;

                            /* istanbul ignore next */
                            default:
                                throw illegal(token); // there are no groups with proto3 semantics
                        }
                    });
                    parent.add(type).add(field);
                }

                function parseMapField(parent) {
                    skip("<");
                    var keyType = next();

                    /* istanbul ignore if */
                    if (types.mapKey[keyType] === undefined) throw illegal(keyType, "type");

                    skip(",");
                    var valueType = next();

                    /* istanbul ignore if */
                    if (!typeRefRe.test(valueType)) throw illegal(valueType, "type");

                    skip(">");
                    var name = next();

                    /* istanbul ignore if */
                    if (!nameRe.test(name)) throw illegal(name, "name");

                    skip("=");
                    var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
                    ifBlock(field, function parseMapField_block(token) {

                        /* istanbul ignore else */
                        if (token === "option") {
                            parseOption(field, token);
                            skip(";");
                        } else throw illegal(token);
                    }, function parseMapField_line() {
                        parseInlineOptions(field);
                    });
                    parent.add(field);
                }

                function parseOneOf(parent, token) {

                    /* istanbul ignore if */
                    if (!nameRe.test(token = next())) throw illegal(token, "name");

                    var oneof = new OneOf(applyCase(token));
                    ifBlock(oneof, function parseOneOf_block(token) {
                        if (token === "option") {
                            parseOption(oneof, token);
                            skip(";");
                        } else {
                            push(token);
                            parseField(oneof, "optional");
                        }
                    });
                    parent.add(oneof);
                }

                function parseEnum(parent, token) {

                    /* istanbul ignore if */
                    if (!nameRe.test(token = next())) throw illegal(token, "name");

                    var enm = new Enum(token);
                    ifBlock(enm, function parseEnum_block(token) {
                        switch (token) {
                            case "option":
                                parseOption(enm, token);
                                skip(";");
                                break;

                            case "reserved":
                                readRanges(enm.reserved || (enm.reserved = []), true);
                                break;

                            default:
                                parseEnumValue(enm, token);
                        }
                    });
                    parent.add(enm);
                }

                function parseEnumValue(parent, token) {

                    /* istanbul ignore if */
                    if (!nameRe.test(token)) throw illegal(token, "name");

                    skip("=");
                    var value = parseId(next(), true),
                        dummy = {};
                    ifBlock(dummy, function parseEnumValue_block(token) {

                        /* istanbul ignore else */
                        if (token === "option") {
                            parseOption(dummy, token); // skip
                            skip(";");
                        } else throw illegal(token);
                    }, function parseEnumValue_line() {
                        parseInlineOptions(dummy); // skip
                    });
                    parent.add(token, value, dummy.comment);
                }

                function parseOption(parent, token) {
                    var isCustom = skip("(", true);

                    /* istanbul ignore if */
                    if (!typeRefRe.test(token = next())) throw illegal(token, "name");

                    var name = token;
                    if (isCustom) {
                        skip(")");
                        name = "(" + name + ")";
                        token = peek();
                        if (fqTypeRefRe.test(token)) {
                            name += token;
                            next();
                        }
                    }
                    skip("=");
                    parseOptionValue(parent, name);
                }

                function parseOptionValue(parent, name) {
                    if (skip("{", true)) {
                        // { a: "foo" b { c: "bar" } }
                        do {
                            /* istanbul ignore if */
                            if (!nameRe.test(token = next())) throw illegal(token, "name");

                            if (peek() === "{") parseOptionValue(parent, name + "." + token);else {
                                skip(":");
                                if (peek() === "{") parseOptionValue(parent, name + "." + token);else setOption(parent, name + "." + token, readValue(true));
                            }
                            skip(",", true);
                        } while (!skip("}", true));
                    } else setOption(parent, name, readValue(true));
                    // Does not enforce a delimiter to be universal
                }

                function setOption(parent, name, value) {
                    if (parent.setOption) parent.setOption(name, value);
                }

                function parseInlineOptions(parent) {
                    if (skip("[", true)) {
                        do {
                            parseOption(parent, "option");
                        } while (skip(",", true));
                        skip("]");
                    }
                    return parent;
                }

                function parseService(parent, token) {

                    /* istanbul ignore if */
                    if (!nameRe.test(token = next())) throw illegal(token, "service name");

                    var service = new Service(token);
                    ifBlock(service, function parseService_block(token) {
                        if (parseCommon(service, token)) return;

                        /* istanbul ignore else */
                        if (token === "rpc") parseMethod(service, token);else throw illegal(token);
                    });
                    parent.add(service);
                }

                function parseMethod(parent, token) {
                    var type = token;

                    /* istanbul ignore if */
                    if (!nameRe.test(token = next())) throw illegal(token, "name");

                    var name = token,
                        requestType,
                        requestStream,
                        responseType,
                        responseStream;

                    skip("(");
                    if (skip("stream", true)) requestStream = true;

                    /* istanbul ignore if */
                    if (!typeRefRe.test(token = next())) throw illegal(token);

                    requestType = token;
                    skip(")");skip("returns");skip("(");
                    if (skip("stream", true)) responseStream = true;

                    /* istanbul ignore if */
                    if (!typeRefRe.test(token = next())) throw illegal(token);

                    responseType = token;
                    skip(")");

                    var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
                    ifBlock(method, function parseMethod_block(token) {

                        /* istanbul ignore else */
                        if (token === "option") {
                            parseOption(method, token);
                            skip(";");
                        } else throw illegal(token);
                    });
                    parent.add(method);
                }

                function parseExtension(parent, token) {

                    /* istanbul ignore if */
                    if (!typeRefRe.test(token = next())) throw illegal(token, "reference");

                    var reference = token;
                    ifBlock(null, function parseExtension_block(token) {
                        switch (token) {

                            case "required":
                            case "repeated":
                            case "optional":
                                parseField(parent, token, reference);
                                break;

                            default:
                                /* istanbul ignore if */
                                if (!isProto3 || !typeRefRe.test(token)) throw illegal(token);
                                push(token);
                                parseField(parent, "optional", reference);
                                break;
                        }
                    });
                }

                var token;
                while ((token = next()) !== null) {
                    switch (token) {

                        case "package":

                            /* istanbul ignore if */
                            if (!head) throw illegal(token);

                            parsePackage();
                            break;

                        case "import":

                            /* istanbul ignore if */
                            if (!head) throw illegal(token);

                            parseImport();
                            break;

                        case "syntax":

                            /* istanbul ignore if */
                            if (!head) throw illegal(token);

                            parseSyntax();
                            break;

                        case "option":

                            /* istanbul ignore if */
                            if (!head) throw illegal(token);

                            parseOption(ptr, token);
                            skip(";");
                            break;

                        default:

                            /* istanbul ignore else */
                            if (parseCommon(ptr, token)) {
                                head = false;
                                continue;
                            }

                            /* istanbul ignore next */
                            throw illegal(token);
                    }
                }

                parse.filename = null;
                return {
                    "package": pkg,
                    "imports": imports,
                    weakImports: weakImports,
                    syntax: syntax,
                    root: root
                };
            }

            /**
            * Parses the given .proto source and returns an object with the parsed contents.
            * @name parse
            * @function
            * @param {string} source Source contents
            * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
            * @returns {IParserResult} Parser result
            * @property {string} filename=null Currently processing file name for error reporting, if known
            * @property {IParseOptions} defaults Default {@link IParseOptions}
            * @variation 2
            */
        }, { "15": 15, "16": 16, "20": 20, "22": 22, "25": 25, "29": 29, "33": 33, "34": 34, "35": 35, "36": 36, "37": 37 }], 27: [function (require, module, exports) {
            "use strict";

            module.exports = Reader;

            var util = require(39);

            var BufferReader; // cyclic

            var LongBits = util.LongBits,
                utf8 = util.utf8;

            /* istanbul ignore next */
            function indexOutOfRange(reader, writeLength) {
                return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
            }

            /**
            * Constructs a new reader instance using the specified buffer.
            * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
            * @constructor
            * @param {Uint8Array} buffer Buffer to read from
            */
            function Reader(buffer) {

                /**
                 * Read buffer.
                 * @type {Uint8Array}
                 */
                this.buf = buffer;

                /**
                 * Read buffer position.
                 * @type {number}
                 */
                this.pos = 0;

                /**
                 * Read buffer length.
                 * @type {number}
                 */
                this.len = buffer.length;
            }

            var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
                if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
                throw Error("illegal buffer");
            }
            /* istanbul ignore next */
            : function create_array(buffer) {
                if (Array.isArray(buffer)) return new Reader(buffer);
                throw Error("illegal buffer");
            };

            /**
            * Creates a new reader using the specified buffer.
            * @function
            * @param {Uint8Array|Buffer} buffer Buffer to read from
            * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
            * @throws {Error} If `buffer` is not a valid buffer
            */
            Reader.create = util.Buffer ? function create_buffer_setup(buffer) {
                return (Reader.create = function create_buffer(buffer) {
                    return util.Buffer.isBuffer(buffer) ? new BufferReader(buffer)
                    /* istanbul ignore next */
                    : create_array(buffer);
                })(buffer);
            }
            /* istanbul ignore next */
            : create_array;

            Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */util.Array.prototype.slice;

            /**
            * Reads a varint as an unsigned 32 bit value.
            * @function
            * @returns {number} Value read
            */
            Reader.prototype.uint32 = function read_uint32_setup() {
                var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
                return function read_uint32() {
                    value = (this.buf[this.pos] & 127) >>> 0;if (this.buf[this.pos++] < 128) return value;
                    value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;if (this.buf[this.pos++] < 128) return value;
                    value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;if (this.buf[this.pos++] < 128) return value;
                    value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;if (this.buf[this.pos++] < 128) return value;
                    value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;if (this.buf[this.pos++] < 128) return value;

                    /* istanbul ignore if */
                    if ((this.pos += 5) > this.len) {
                        this.pos = this.len;
                        throw indexOutOfRange(this, 10);
                    }
                    return value;
                };
            }();

            /**
            * Reads a varint as a signed 32 bit value.
            * @returns {number} Value read
            */
            Reader.prototype.int32 = function read_int32() {
                return this.uint32() | 0;
            };

            /**
            * Reads a zig-zag encoded varint as a signed 32 bit value.
            * @returns {number} Value read
            */
            Reader.prototype.sint32 = function read_sint32() {
                var value = this.uint32();
                return value >>> 1 ^ -(value & 1) | 0;
            };

            /* eslint-disable no-invalid-this */

            function readLongVarint() {
                // tends to deopt with local vars for octet etc.
                var bits = new LongBits(0, 0);
                var i = 0;
                if (this.len - this.pos > 4) {
                    // fast route (lo)
                    for (; i < 4; ++i) {
                        // 1st..4th
                        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
                        if (this.buf[this.pos++] < 128) return bits;
                    }
                    // 5th
                    bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
                    bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
                    if (this.buf[this.pos++] < 128) return bits;
                    i = 0;
                } else {
                    for (; i < 3; ++i) {
                        /* istanbul ignore if */
                        if (this.pos >= this.len) throw indexOutOfRange(this);
                        // 1st..3th
                        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
                        if (this.buf[this.pos++] < 128) return bits;
                    }
                    // 4th
                    bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
                    return bits;
                }
                if (this.len - this.pos > 4) {
                    // fast route (hi)
                    for (; i < 5; ++i) {
                        // 6th..10th
                        bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
                        if (this.buf[this.pos++] < 128) return bits;
                    }
                } else {
                    for (; i < 5; ++i) {
                        /* istanbul ignore if */
                        if (this.pos >= this.len) throw indexOutOfRange(this);
                        // 6th..10th
                        bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
                        if (this.buf[this.pos++] < 128) return bits;
                    }
                }
                /* istanbul ignore next */
                throw Error("invalid varint encoding");
            }

            /* eslint-enable no-invalid-this */

            /**
            * Reads a varint as a signed 64 bit value.
            * @name Reader#int64
            * @function
            * @returns {Long} Value read
            */

            /**
            * Reads a varint as an unsigned 64 bit value.
            * @name Reader#uint64
            * @function
            * @returns {Long} Value read
            */

            /**
            * Reads a zig-zag encoded varint as a signed 64 bit value.
            * @name Reader#sint64
            * @function
            * @returns {Long} Value read
            */

            /**
            * Reads a varint as a boolean.
            * @returns {boolean} Value read
            */
            Reader.prototype.bool = function read_bool() {
                return this.uint32() !== 0;
            };

            function readFixed32_end(buf, end) {
                // note that this uses `end`, not `pos`
                return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
            }

            /**
            * Reads fixed 32 bits as an unsigned 32 bit integer.
            * @returns {number} Value read
            */
            Reader.prototype.fixed32 = function read_fixed32() {

                /* istanbul ignore if */
                if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);

                return readFixed32_end(this.buf, this.pos += 4);
            };

            /**
            * Reads fixed 32 bits as a signed 32 bit integer.
            * @returns {number} Value read
            */
            Reader.prototype.sfixed32 = function read_sfixed32() {

                /* istanbul ignore if */
                if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);

                return readFixed32_end(this.buf, this.pos += 4) | 0;
            };

            /* eslint-disable no-invalid-this */

            function readFixed64() /* this: Reader */{

                /* istanbul ignore if */
                if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);

                return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
            }

            /* eslint-enable no-invalid-this */

            /**
            * Reads fixed 64 bits.
            * @name Reader#fixed64
            * @function
            * @returns {Long} Value read
            */

            /**
            * Reads zig-zag encoded fixed 64 bits.
            * @name Reader#sfixed64
            * @function
            * @returns {Long} Value read
            */

            /**
            * Reads a float (32 bit) as a number.
            * @function
            * @returns {number} Value read
            */
            Reader.prototype.float = function read_float() {

                /* istanbul ignore if */
                if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);

                var value = util.float.readFloatLE(this.buf, this.pos);
                this.pos += 4;
                return value;
            };

            /**
            * Reads a double (64 bit float) as a number.
            * @function
            * @returns {number} Value read
            */
            Reader.prototype.double = function read_double() {

                /* istanbul ignore if */
                if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);

                var value = util.float.readDoubleLE(this.buf, this.pos);
                this.pos += 8;
                return value;
            };

            /**
            * Reads a sequence of bytes preceeded by its length as a varint.
            * @returns {Uint8Array} Value read
            */
            Reader.prototype.bytes = function read_bytes() {
                var length = this.uint32(),
                    start = this.pos,
                    end = this.pos + length;

                /* istanbul ignore if */
                if (end > this.len) throw indexOutOfRange(this, length);

                this.pos += length;
                if (Array.isArray(this.buf)) // plain array
                    return this.buf.slice(start, end);
                return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
                ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
            };

            /**
            * Reads a string preceeded by its byte length as a varint.
            * @returns {string} Value read
            */
            Reader.prototype.string = function read_string() {
                var bytes = this.bytes();
                return utf8.read(bytes, 0, bytes.length);
            };

            /**
            * Skips the specified number of bytes if specified, otherwise skips a varint.
            * @param {number} [length] Length if known, otherwise a varint is assumed
            * @returns {Reader} `this`
            */
            Reader.prototype.skip = function skip(length) {
                if (typeof length === "number") {
                    /* istanbul ignore if */
                    if (this.pos + length > this.len) throw indexOutOfRange(this, length);
                    this.pos += length;
                } else {
                    do {
                        /* istanbul ignore if */
                        if (this.pos >= this.len) throw indexOutOfRange(this);
                    } while (this.buf[this.pos++] & 128);
                }
                return this;
            };

            /**
            * Skips the next element of the specified wire type.
            * @param {number} wireType Wire type received
            * @returns {Reader} `this`
            */
            Reader.prototype.skipType = function (wireType) {
                switch (wireType) {
                    case 0:
                        this.skip();
                        break;
                    case 1:
                        this.skip(8);
                        break;
                    case 2:
                        this.skip(this.uint32());
                        break;
                    case 3:
                        while ((wireType = this.uint32() & 7) !== 4) {
                            this.skipType(wireType);
                        }
                        break;
                    case 5:
                        this.skip(4);
                        break;

                    /* istanbul ignore next */
                    default:
                        throw Error("invalid wire type " + wireType + " at offset " + this.pos);
                }
                return this;
            };

            Reader._configure = function (BufferReader_) {
                BufferReader = BufferReader_;

                var fn = util.Long ? "toLong" : /* istanbul ignore next */"toNumber";
                util.merge(Reader.prototype, {

                    int64: function read_int64() {
                        return readLongVarint.call(this)[fn](false);
                    },

                    uint64: function read_uint64() {
                        return readLongVarint.call(this)[fn](true);
                    },

                    sint64: function read_sint64() {
                        return readLongVarint.call(this).zzDecode()[fn](false);
                    },

                    fixed64: function read_fixed64() {
                        return readFixed64.call(this)[fn](true);
                    },

                    sfixed64: function read_sfixed64() {
                        return readFixed64.call(this)[fn](false);
                    }

                });
            };
        }, { "39": 39 }], 28: [function (require, module, exports) {
            "use strict";

            module.exports = BufferReader;

            // extends Reader
            var Reader = require(27);
            (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

            var util = require(39);

            /**
            * Constructs a new buffer reader instance.
            * @classdesc Wire format reader using node buffers.
            * @extends Reader
            * @constructor
            * @param {Buffer} buffer Buffer to read from
            */
            function BufferReader(buffer) {
                Reader.call(this, buffer);

                /**
                 * Read buffer.
                 * @name BufferReader#buf
                 * @type {Buffer}
                 */
            }

            /* istanbul ignore else */
            if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;

            /**
            * @override
            */
            BufferReader.prototype.string = function read_string_buffer() {
                var len = this.uint32(); // modifies pos
                return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
            };

            /**
            * Reads a sequence of bytes preceeded by its length as a varint.
            * @name BufferReader#bytes
            * @function
            * @returns {Buffer} Value read
            */
        }, { "27": 27, "39": 39 }], 29: [function (require, module, exports) {
            "use strict";

            module.exports = Root;

            // extends Namespace
            var Namespace = require(23);
            ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";

            var Field = require(16),
                Enum = require(15),
                OneOf = require(25),
                util = require(37);

            var Type, // cyclic
            parse, // might be excluded
            common; // "

            /**
            * Constructs a new root namespace instance.
            * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
            * @extends NamespaceBase
            * @constructor
            * @param {Object.<string,*>} [options] Top level options
            */
            function Root(options) {
                Namespace.call(this, "", options);

                /**
                 * Deferred extension fields.
                 * @type {Field[]}
                 */
                this.deferred = [];

                /**
                 * Resolved file names of loaded files.
                 * @type {string[]}
                 */
                this.files = [];
            }

            /**
            * Loads a namespace descriptor into a root namespace.
            * @param {INamespace} json Nameespace descriptor
            * @param {Root} [root] Root namespace, defaults to create a new one if omitted
            * @returns {Root} Root namespace
            */
            Root.fromJSON = function fromJSON(json, root) {
                if (!root) root = new Root();
                if (json.options) root.setOptions(json.options);
                return root.addJSON(json.nested);
            };

            /**
            * Resolves the path of an imported file, relative to the importing origin.
            * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
            * @function
            * @param {string} origin The file name of the importing file
            * @param {string} target The file name being imported
            * @returns {string|null} Resolved path to `target` or `null` to skip the file
            */
            Root.prototype.resolvePath = util.path.resolve;

            // A symbol-like function to safely signal synchronous loading
            /* istanbul ignore next */
            function SYNC() {} // eslint-disable-line no-empty-function

            /**
            * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
            * @param {string|string[]} filename Names of one or multiple files to load
            * @param {IParseOptions} options Parse options
            * @param {LoadCallback} callback Callback function
            * @returns {undefined}
            */
            Root.prototype.load = function load(filename, options, callback) {
                if (typeof options === "function") {
                    callback = options;
                    options = undefined;
                }
                var self = this;
                if (!callback) return util.asPromise(load, self, filename, options);

                var sync = callback === SYNC; // undocumented

                // Finishes loading by calling the callback (exactly once)
                function finish(err, root) {
                    /* istanbul ignore if */
                    if (!callback) return;
                    var cb = callback;
                    callback = null;
                    if (sync) throw err;
                    cb(err, root);
                }

                // Processes a single file
                function process(filename, source) {
                    try {
                        if (util.isString(source) && source.charAt(0) === "{") source = JSON.parse(source);
                        if (!util.isString(source)) self.setOptions(source.options).addJSON(source.nested);else {
                            parse.filename = filename;
                            var parsed = parse(source, self, options),
                                resolved,
                                i = 0;
                            if (parsed.imports) for (; i < parsed.imports.length; ++i) {
                                if (resolved = self.resolvePath(filename, parsed.imports[i])) fetch(resolved);
                            }if (parsed.weakImports) for (i = 0; i < parsed.weakImports.length; ++i) {
                                if (resolved = self.resolvePath(filename, parsed.weakImports[i])) fetch(resolved, true);
                            }
                        }
                    } catch (err) {
                        finish(err);
                    }
                    if (!sync && !queued) finish(null, self); // only once anyway
                }

                // Fetches a single file
                function fetch(filename, weak) {

                    // Strip path if this file references a bundled definition
                    var idx = filename.lastIndexOf("google/protobuf/");
                    if (idx > -1) {
                        var altname = filename.substring(idx);
                        if (altname in common) filename = altname;
                    }

                    // Skip if already loaded / attempted
                    if (self.files.indexOf(filename) > -1) return;
                    self.files.push(filename);

                    // Shortcut bundled definitions
                    if (filename in common) {
                        if (sync) process(filename, common[filename]);else {
                            ++queued;
                            setTimeout(function () {
                                --queued;
                                process(filename, common[filename]);
                            });
                        }
                        return;
                    }

                    // Otherwise fetch from disk or network
                    if (sync) {
                        var source;
                        try {
                            source = util.fs.readFileSync(filename).toString("utf8");
                        } catch (err) {
                            if (!weak) finish(err);
                            return;
                        }
                        process(filename, source);
                    } else {
                        ++queued;
                        util.fetch(filename, function (err, source) {
                            --queued;
                            /* istanbul ignore if */
                            if (!callback) return; // terminated meanwhile
                            if (err) {
                                /* istanbul ignore else */
                                if (!weak) finish(err);else if (!queued) // can't be covered reliably
                                    finish(null, self);
                                return;
                            }
                            process(filename, source);
                        });
                    }
                }
                var queued = 0;

                // Assembling the root namespace doesn't require working type
                // references anymore, so we can load everything in parallel
                if (util.isString(filename)) filename = [filename];
                for (var i = 0, resolved; i < filename.length; ++i) {
                    if (resolved = self.resolvePath("", filename[i])) fetch(resolved);
                }if (sync) return self;
                if (!queued) finish(null, self);
                return undefined;
            };
            // function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined

            /**
            * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
            * @function Root#load
            * @param {string|string[]} filename Names of one or multiple files to load
            * @param {LoadCallback} callback Callback function
            * @returns {undefined}
            * @variation 2
            */
            // function load(filename:string, callback:LoadCallback):undefined

            /**
            * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
            * @function Root#load
            * @param {string|string[]} filename Names of one or multiple files to load
            * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
            * @returns {Promise<Root>} Promise
            * @variation 3
            */
            // function load(filename:string, [options:IParseOptions]):Promise<Root>

            /**
            * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
            * @function Root#loadSync
            * @param {string|string[]} filename Names of one or multiple files to load
            * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
            * @returns {Root} Root namespace
            * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
            */
            Root.prototype.loadSync = function loadSync(filename, options) {
                if (!util.isNode) throw Error("not supported");
                return this.load(filename, options, SYNC);
            };

            /**
            * @override
            */
            Root.prototype.resolveAll = function resolveAll() {
                if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function (field) {
                    return "'extend " + field.extend + "' in " + field.parent.fullName;
                }).join(", "));
                return Namespace.prototype.resolveAll.call(this);
            };

            // only uppercased (and thus conflict-free) children are exposed, see below
            var exposeRe = /^[A-Z]/;

            /**
            * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
            * @param {Root} root Root instance
            * @param {Field} field Declaring extension field witin the declaring type
            * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
            * @inner
            * @ignore
            */
            function tryHandleExtension(root, field) {
                var extendedType = field.parent.lookup(field.extend);
                if (extendedType) {
                    var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
                    sisterField.declaringField = field;
                    field.extensionField = sisterField;
                    extendedType.add(sisterField);
                    return true;
                }
                return false;
            }

            /**
            * Called when any object is added to this root or its sub-namespaces.
            * @param {ReflectionObject} object Object added
            * @returns {undefined}
            * @private
            */
            Root.prototype._handleAdd = function _handleAdd(object) {
                if (object instanceof Field) {

                    if ( /* an extension field (implies not part of a oneof) */object.extend !== undefined && /* not already handled */!object.extensionField) if (!tryHandleExtension(this, object)) this.deferred.push(object);
                } else if (object instanceof Enum) {

                    if (exposeRe.test(object.name)) object.parent[object.name] = object.values; // expose enum values as property of its parent
                } else if (!(object instanceof OneOf)) /* everything else is a namespace */{

                        if (object instanceof Type) // Try to handle any deferred extensions
                            for (var i = 0; i < this.deferred.length;) {
                                if (tryHandleExtension(this, this.deferred[i])) this.deferred.splice(i, 1);else ++i;
                            }for (var j = 0; j < /* initializes */object.nestedArray.length; ++j) {
                            // recurse into the namespace
                            this._handleAdd(object._nestedArray[j]);
                        }if (exposeRe.test(object.name)) object.parent[object.name] = object; // expose namespace as property of its parent
                    }

                // The above also adds uppercased (and thus conflict-free) nested types, services and enums as
                // properties of namespaces just like static code does. This allows using a .d.ts generated for
                // a static module with reflection-based solutions where the condition is met.
            };

            /**
            * Called when any object is removed from this root or its sub-namespaces.
            * @param {ReflectionObject} object Object removed
            * @returns {undefined}
            * @private
            */
            Root.prototype._handleRemove = function _handleRemove(object) {
                if (object instanceof Field) {

                    if ( /* an extension field */object.extend !== undefined) {
                        if ( /* already handled */object.extensionField) {
                            // remove its sister field
                            object.extensionField.parent.remove(object.extensionField);
                            object.extensionField = null;
                        } else {
                            // cancel the extension
                            var index = this.deferred.indexOf(object);
                            /* istanbul ignore else */
                            if (index > -1) this.deferred.splice(index, 1);
                        }
                    }
                } else if (object instanceof Enum) {

                    if (exposeRe.test(object.name)) delete object.parent[object.name]; // unexpose enum values
                } else if (object instanceof Namespace) {

                    for (var i = 0; i < /* initializes */object.nestedArray.length; ++i) {
                        // recurse into the namespace
                        this._handleRemove(object._nestedArray[i]);
                    }if (exposeRe.test(object.name)) delete object.parent[object.name]; // unexpose namespaces
                }
            };

            // Sets up cyclic dependencies (called in index-light)
            Root._configure = function (Type_, parse_, common_) {
                Type = Type_;
                parse = parse_;
                common = common_;
            };
        }, { "15": 15, "16": 16, "23": 23, "25": 25, "37": 37 }], 30: [function (require, module, exports) {
            "use strict";

            module.exports = {};

            /**
            * Named roots.
            * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
            * Can also be used manually to make roots available accross modules.
            * @name roots
            * @type {Object.<string,Root>}
            * @example
            * // pbjs -r myroot -o compiled.js ...
            *
            * // in another module:
            * require("./compiled.js");
            *
            * // in any subsequent module:
            * var root = protobuf.roots["myroot"];
            */
        }, {}], 31: [function (require, module, exports) {
            "use strict";

            /**
            * Streaming RPC helpers.
            * @namespace
            */

            var rpc = exports;

            /**
            * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
            * @typedef RPCImpl
            * @type {function}
            * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
            * @param {Uint8Array} requestData Request data
            * @param {RPCImplCallback} callback Callback function
            * @returns {undefined}
            * @example
            * function rpcImpl(method, requestData, callback) {
            *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
            *         throw Error("no such method");
            *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
            *         callback(err, responseData);
            *     });
            * }
            */

            /**
            * Node-style callback as used by {@link RPCImpl}.
            * @typedef RPCImplCallback
            * @type {function}
            * @param {Error|null} error Error, if any, otherwise `null`
            * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
            * @returns {undefined}
            */

            rpc.Service = require(32);
        }, { "32": 32 }], 32: [function (require, module, exports) {
            "use strict";

            module.exports = Service;

            var util = require(39);

            // Extends EventEmitter
            (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

            /**
            * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
            *
            * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
            * @typedef rpc.ServiceMethodCallback
            * @template TRes extends Message<TRes>
            * @type {function}
            * @param {Error|null} error Error, if any
            * @param {TRes} [response] Response message
            * @returns {undefined}
            */

            /**
            * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
            * @typedef rpc.ServiceMethod
            * @template TReq extends Message<TReq>
            * @template TRes extends Message<TRes>
            * @type {function}
            * @param {TReq|Properties<TReq>} request Request message or plain object
            * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
            * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
            */

            /**
            * Constructs a new RPC service instance.
            * @classdesc An RPC service as returned by {@link Service#create}.
            * @exports rpc.Service
            * @extends util.EventEmitter
            * @constructor
            * @param {RPCImpl} rpcImpl RPC implementation
            * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
            * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
            */
            function Service(rpcImpl, requestDelimited, responseDelimited) {

                if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");

                util.EventEmitter.call(this);

                /**
                 * RPC implementation. Becomes `null` once the service is ended.
                 * @type {RPCImpl|null}
                 */
                this.rpcImpl = rpcImpl;

                /**
                 * Whether requests are length-delimited.
                 * @type {boolean}
                 */
                this.requestDelimited = Boolean(requestDelimited);

                /**
                 * Whether responses are length-delimited.
                 * @type {boolean}
                 */
                this.responseDelimited = Boolean(responseDelimited);
            }

            /**
            * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
            * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
            * @param {Constructor<TReq>} requestCtor Request constructor
            * @param {Constructor<TRes>} responseCtor Response constructor
            * @param {TReq|Properties<TReq>} request Request message or plain object
            * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
            * @returns {undefined}
            * @template TReq extends Message<TReq>
            * @template TRes extends Message<TRes>
            */
            Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

                if (!request) throw TypeError("request must be specified");

                var self = this;
                if (!callback) return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

                if (!self.rpcImpl) {
                    setTimeout(function () {
                        callback(Error("already ended"));
                    }, 0);
                    return undefined;
                }

                try {
                    return self.rpcImpl(method, requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {

                        if (err) {
                            self.emit("error", err, method);
                            return callback(err);
                        }

                        if (response === null) {
                            self.end( /* endedByRPC */true);
                            return undefined;
                        }

                        if (!(response instanceof responseCtor)) {
                            try {
                                response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                            } catch (err) {
                                self.emit("error", err, method);
                                return callback(err);
                            }
                        }

                        self.emit("data", response, method);
                        return callback(null, response);
                    });
                } catch (err) {
                    self.emit("error", err, method);
                    setTimeout(function () {
                        callback(err);
                    }, 0);
                    return undefined;
                }
            };

            /**
            * Ends this service and emits the `end` event.
            * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
            * @returns {rpc.Service} `this`
            */
            Service.prototype.end = function end(endedByRPC) {
                if (this.rpcImpl) {
                    if (!endedByRPC) // signal end to rpcImpl
                        this.rpcImpl(null, null, null);
                    this.rpcImpl = null;
                    this.emit("end").off();
                }
                return this;
            };
        }, { "39": 39 }], 33: [function (require, module, exports) {
            "use strict";

            module.exports = Service;

            // extends Namespace
            var Namespace = require(23);
            ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";

            var Method = require(22),
                util = require(37),
                rpc = require(31);

            /**
            * Constructs a new service instance.
            * @classdesc Reflected service.
            * @extends NamespaceBase
            * @constructor
            * @param {string} name Service name
            * @param {Object.<string,*>} [options] Service options
            * @throws {TypeError} If arguments are invalid
            */
            function Service(name, options) {
                Namespace.call(this, name, options);

                /**
                 * Service methods.
                 * @type {Object.<string,Method>}
                 */
                this.methods = {}; // toJSON, marker

                /**
                 * Cached methods as an array.
                 * @type {Method[]|null}
                 * @private
                 */
                this._methodsArray = null;
            }

            /**
            * Service descriptor.
            * @interface IService
            * @extends INamespace
            * @property {Object.<string,IMethod>} methods Method descriptors
            */

            /**
            * Constructs a service from a service descriptor.
            * @param {string} name Service name
            * @param {IService} json Service descriptor
            * @returns {Service} Created service
            * @throws {TypeError} If arguments are invalid
            */
            Service.fromJSON = function fromJSON(name, json) {
                var service = new Service(name, json.options);
                /* istanbul ignore else */
                if (json.methods) for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i) {
                    service.add(Method.fromJSON(names[i], json.methods[names[i]]));
                }if (json.nested) service.addJSON(json.nested);
                service.comment = json.comment;
                return service;
            };

            /**
            * Converts this service to a service descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {IService} Service descriptor
            */
            Service.prototype.toJSON = function toJSON(toJSONOptions) {
                var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
                var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
                return util.toObject(["options", inherited && inherited.options || undefined, "methods", Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */{}, "nested", inherited && inherited.nested || undefined, "comment", keepComments ? this.comment : undefined]);
            };

            /**
            * Methods of this service as an array for iteration.
            * @name Service#methodsArray
            * @type {Method[]}
            * @readonly
            */
            Object.defineProperty(Service.prototype, "methodsArray", {
                get: function get() {
                    return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
                }
            });

            function clearCache(service) {
                service._methodsArray = null;
                return service;
            }

            /**
            * @override
            */
            Service.prototype.get = function get(name) {
                return this.methods[name] || Namespace.prototype.get.call(this, name);
            };

            /**
            * @override
            */
            Service.prototype.resolveAll = function resolveAll() {
                var methods = this.methodsArray;
                for (var i = 0; i < methods.length; ++i) {
                    methods[i].resolve();
                }return Namespace.prototype.resolve.call(this);
            };

            /**
            * @override
            */
            Service.prototype.add = function add(object) {

                /* istanbul ignore if */
                if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);

                if (object instanceof Method) {
                    this.methods[object.name] = object;
                    object.parent = this;
                    return clearCache(this);
                }
                return Namespace.prototype.add.call(this, object);
            };

            /**
            * @override
            */
            Service.prototype.remove = function remove(object) {
                if (object instanceof Method) {

                    /* istanbul ignore if */
                    if (this.methods[object.name] !== object) throw Error(object + " is not a member of " + this);

                    delete this.methods[object.name];
                    object.parent = null;
                    return clearCache(this);
                }
                return Namespace.prototype.remove.call(this, object);
            };

            /**
            * Creates a runtime service using the specified rpc implementation.
            * @param {RPCImpl} rpcImpl RPC implementation
            * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
            * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
            * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
            */
            Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
                for (var i = 0, method; i < /* initializes */this.methodsArray.length; ++i) {
                    var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
                    rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
                        m: method,
                        q: method.resolvedRequestType.ctor,
                        s: method.resolvedResponseType.ctor
                    });
                }
                return rpcService;
            };
        }, { "22": 22, "23": 23, "31": 31, "37": 37 }], 34: [function (require, module, exports) {
            "use strict";

            module.exports = tokenize;

            var delimRe = /[\s{}=;:[\],'"()<>]/g,
                stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
                stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

            var setCommentRe = /^ *[*/]+ */,
                setCommentAltRe = /^\s*\*?\/*/,
                setCommentSplitRe = /\n/g,
                whitespaceRe = /\s/,
                unescapeRe = /\\(.?)/g;

            var unescapeMap = {
                "0": "\0",
                "r": "\r",
                "n": "\n",
                "t": "\t"
            };

            /**
            * Unescapes a string.
            * @param {string} str String to unescape
            * @returns {string} Unescaped string
            * @property {Object.<string,string>} map Special characters map
            * @memberof tokenize
            */
            function unescape(str) {
                return str.replace(unescapeRe, function ($0, $1) {
                    switch ($1) {
                        case "\\":
                        case "":
                            return $1;
                        default:
                            return unescapeMap[$1] || "";
                    }
                });
            }

            tokenize.unescape = unescape;

            /**
            * Gets the next token and advances.
            * @typedef TokenizerHandleNext
            * @type {function}
            * @returns {string|null} Next token or `null` on eof
            */

            /**
            * Peeks for the next token.
            * @typedef TokenizerHandlePeek
            * @type {function}
            * @returns {string|null} Next token or `null` on eof
            */

            /**
            * Pushes a token back to the stack.
            * @typedef TokenizerHandlePush
            * @type {function}
            * @param {string} token Token
            * @returns {undefined}
            */

            /**
            * Skips the next token.
            * @typedef TokenizerHandleSkip
            * @type {function}
            * @param {string} expected Expected token
            * @param {boolean} [optional=false] If optional
            * @returns {boolean} Whether the token matched
            * @throws {Error} If the token didn't match and is not optional
            */

            /**
            * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
            * @typedef TokenizerHandleCmnt
            * @type {function}
            * @param {number} [line] Line number
            * @returns {string|null} Comment text or `null` if none
            */

            /**
            * Handle object returned from {@link tokenize}.
            * @interface ITokenizerHandle
            * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
            * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
            * @property {TokenizerHandlePush} push Pushes a token back to the stack
            * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
            * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
            * @property {number} line Current line number
            */

            /**
            * Tokenizes the given .proto source and returns an object with useful utility functions.
            * @param {string} source Source contents
            * @param {boolean} alternateCommentMode Whether we should activate alternate comment parsing mode.
            * @returns {ITokenizerHandle} Tokenizer handle
            */
            function tokenize(source, alternateCommentMode) {
                /* eslint-disable callback-return */
                source = source.toString();

                var offset = 0,
                    length = source.length,
                    line = 1,
                    commentType = null,
                    commentText = null,
                    commentLine = 0,
                    commentLineEmpty = false;

                var stack = [];

                var stringDelim = null;

                /* istanbul ignore next */
                /**
                 * Creates an error for illegal syntax.
                 * @param {string} subject Subject
                 * @returns {Error} Error created
                 * @inner
                 */
                function illegal(subject) {
                    return Error("illegal " + subject + " (line " + line + ")");
                }

                /**
                 * Reads a string till its end.
                 * @returns {string} String read
                 * @inner
                 */
                function readString() {
                    var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
                    re.lastIndex = offset - 1;
                    var match = re.exec(source);
                    if (!match) throw illegal("string");
                    offset = re.lastIndex;
                    push(stringDelim);
                    stringDelim = null;
                    return unescape(match[1]);
                }

                /**
                 * Gets the character at `pos` within the source.
                 * @param {number} pos Position
                 * @returns {string} Character
                 * @inner
                 */
                function charAt(pos) {
                    return source.charAt(pos);
                }

                /**
                 * Sets the current comment text.
                 * @param {number} start Start offset
                 * @param {number} end End offset
                 * @returns {undefined}
                 * @inner
                 */
                function setComment(start, end) {
                    commentType = source.charAt(start++);
                    commentLine = line;
                    commentLineEmpty = false;
                    var lookback;
                    if (alternateCommentMode) {
                        lookback = 2; // alternate comment parsing: "//" or "/*"
                    } else {
                        lookback = 3; // "///" or "/**"
                    }
                    var commentOffset = start - lookback,
                        c;
                    do {
                        if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
                            commentLineEmpty = true;
                            break;
                        }
                    } while (c === " " || c === "\t");
                    var lines = source.substring(start, end).split(setCommentSplitRe);
                    for (var i = 0; i < lines.length; ++i) {
                        lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
                    }commentText = lines.join("\n").trim();
                }

                function isDoubleSlashCommentLine(startOffset) {
                    var endOffset = findEndOfLine(startOffset);

                    // see if remaining line matches comment pattern
                    var lineText = source.substring(startOffset, endOffset);
                    // look for 1 or 2 slashes since startOffset would already point past
                    // the first slash that started the comment.
                    var isComment = /^\s*\/{1,2}/.test(lineText);
                    return isComment;
                }

                function findEndOfLine(cursor) {
                    // find end of cursor's line
                    var endOffset = cursor;
                    while (endOffset < length && charAt(endOffset) !== "\n") {
                        endOffset++;
                    }
                    return endOffset;
                }

                /**
                 * Obtains the next token.
                 * @returns {string|null} Next token or `null` on eof
                 * @inner
                 */
                function next() {
                    if (stack.length > 0) return stack.shift();
                    if (stringDelim) return readString();
                    var repeat, prev, curr, start, isDoc;
                    do {
                        if (offset === length) return null;
                        repeat = false;
                        while (whitespaceRe.test(curr = charAt(offset))) {
                            if (curr === "\n") ++line;
                            if (++offset === length) return null;
                        }

                        if (charAt(offset) === "/") {
                            if (++offset === length) {
                                throw illegal("comment");
                            }
                            if (charAt(offset) === "/") {
                                // Line
                                if (!alternateCommentMode) {
                                    // check for triple-slash comment
                                    isDoc = charAt(start = offset + 1) === "/";

                                    while (charAt(++offset) !== "\n") {
                                        if (offset === length) {
                                            return null;
                                        }
                                    }
                                    ++offset;
                                    if (isDoc) {
                                        setComment(start, offset - 1);
                                    }
                                    ++line;
                                    repeat = true;
                                } else {
                                    // check for double-slash comments, consolidating consecutive lines
                                    start = offset;
                                    isDoc = false;
                                    if (isDoubleSlashCommentLine(offset)) {
                                        isDoc = true;
                                        do {
                                            offset = findEndOfLine(offset);
                                            if (offset === length) {
                                                break;
                                            }
                                            offset++;
                                        } while (isDoubleSlashCommentLine(offset));
                                    } else {
                                        offset = Math.min(length, findEndOfLine(offset) + 1);
                                    }
                                    if (isDoc) {
                                        setComment(start, offset);
                                    }
                                    line++;
                                    repeat = true;
                                }
                            } else if ((curr = charAt(offset)) === "*") {
                                /* Block */
                                // check for /** (regular comment mode) or /* (alternate comment mode)
                                start = offset + 1;
                                isDoc = alternateCommentMode || charAt(start) === "*";
                                do {
                                    if (curr === "\n") {
                                        ++line;
                                    }
                                    if (++offset === length) {
                                        throw illegal("comment");
                                    }
                                    prev = curr;
                                    curr = charAt(offset);
                                } while (prev !== "*" || curr !== "/");
                                ++offset;
                                if (isDoc) {
                                    setComment(start, offset - 2);
                                }
                                repeat = true;
                            } else {
                                return "/";
                            }
                        }
                    } while (repeat);

                    // offset !== length if we got here

                    var end = offset;
                    delimRe.lastIndex = 0;
                    var delim = delimRe.test(charAt(end++));
                    if (!delim) while (end < length && !delimRe.test(charAt(end))) {
                        ++end;
                    }var token = source.substring(offset, offset = end);
                    if (token === "\"" || token === "'") stringDelim = token;
                    return token;
                }

                /**
                 * Pushes a token back to the stack.
                 * @param {string} token Token
                 * @returns {undefined}
                 * @inner
                 */
                function push(token) {
                    stack.push(token);
                }

                /**
                 * Peeks for the next token.
                 * @returns {string|null} Token or `null` on eof
                 * @inner
                 */
                function peek() {
                    if (!stack.length) {
                        var token = next();
                        if (token === null) return null;
                        push(token);
                    }
                    return stack[0];
                }

                /**
                 * Skips a token.
                 * @param {string} expected Expected token
                 * @param {boolean} [optional=false] Whether the token is optional
                 * @returns {boolean} `true` when skipped, `false` if not
                 * @throws {Error} When a required token is not present
                 * @inner
                 */
                function skip(expected, optional) {
                    var actual = peek(),
                        equals = actual === expected;
                    if (equals) {
                        next();
                        return true;
                    }
                    if (!optional) throw illegal("token '" + actual + "', '" + expected + "' expected");
                    return false;
                }

                /**
                 * Gets a comment.
                 * @param {number} [trailingLine] Line number if looking for a trailing comment
                 * @returns {string|null} Comment text
                 * @inner
                 */
                function cmnt(trailingLine) {
                    var ret = null;
                    if (trailingLine === undefined) {
                        if (commentLine === line - 1 && (alternateCommentMode || commentType === "*" || commentLineEmpty)) {
                            ret = commentText;
                        }
                    } else {
                        /* istanbul ignore else */
                        if (commentLine < trailingLine) {
                            peek();
                        }
                        if (commentLine === trailingLine && !commentLineEmpty && (alternateCommentMode || commentType === "/")) {
                            ret = commentText;
                        }
                    }
                    return ret;
                }

                return Object.defineProperty({
                    next: next,
                    peek: peek,
                    push: push,
                    skip: skip,
                    cmnt: cmnt
                }, "line", {
                    get: function get() {
                        return line;
                    }
                });
                /* eslint-enable callback-return */
            }
        }, {}], 35: [function (require, module, exports) {
            "use strict";

            module.exports = Type;

            // extends Namespace
            var Namespace = require(23);
            ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";

            var Enum = require(15),
                OneOf = require(25),
                Field = require(16),
                MapField = require(20),
                Service = require(33),
                Message = require(21),
                Reader = require(27),
                Writer = require(42),
                util = require(37),
                encoder = require(14),
                decoder = require(13),
                verifier = require(40),
                converter = require(12),
                wrappers = require(41);

            /**
            * Constructs a new reflected message type instance.
            * @classdesc Reflected message type.
            * @extends NamespaceBase
            * @constructor
            * @param {string} name Message name
            * @param {Object.<string,*>} [options] Declared options
            */
            function Type(name, options) {
                Namespace.call(this, name, options);

                /**
                 * Message fields.
                 * @type {Object.<string,Field>}
                 */
                this.fields = {}; // toJSON, marker

                /**
                 * Oneofs declared within this namespace, if any.
                 * @type {Object.<string,OneOf>}
                 */
                this.oneofs = undefined; // toJSON

                /**
                 * Extension ranges, if any.
                 * @type {number[][]}
                 */
                this.extensions = undefined; // toJSON

                /**
                 * Reserved ranges, if any.
                 * @type {Array.<number[]|string>}
                 */
                this.reserved = undefined; // toJSON

                /*?
                 * Whether this type is a legacy group.
                 * @type {boolean|undefined}
                 */
                this.group = undefined; // toJSON

                /**
                 * Cached fields by id.
                 * @type {Object.<number,Field>|null}
                 * @private
                 */
                this._fieldsById = null;

                /**
                 * Cached fields as an array.
                 * @type {Field[]|null}
                 * @private
                 */
                this._fieldsArray = null;

                /**
                 * Cached oneofs as an array.
                 * @type {OneOf[]|null}
                 * @private
                 */
                this._oneofsArray = null;

                /**
                 * Cached constructor.
                 * @type {Constructor<{}>}
                 * @private
                 */
                this._ctor = null;
            }

            Object.defineProperties(Type.prototype, {

                /**
                 * Message fields by id.
                 * @name Type#fieldsById
                 * @type {Object.<number,Field>}
                 * @readonly
                 */
                fieldsById: {
                    get: function get() {

                        /* istanbul ignore if */
                        if (this._fieldsById) return this._fieldsById;

                        this._fieldsById = {};
                        for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
                            var field = this.fields[names[i]],
                                id = field.id;

                            /* istanbul ignore if */
                            if (this._fieldsById[id]) throw Error("duplicate id " + id + " in " + this);

                            this._fieldsById[id] = field;
                        }
                        return this._fieldsById;
                    }
                },

                /**
                 * Fields of this message as an array for iteration.
                 * @name Type#fieldsArray
                 * @type {Field[]}
                 * @readonly
                 */
                fieldsArray: {
                    get: function get() {
                        return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
                    }
                },

                /**
                 * Oneofs of this message as an array for iteration.
                 * @name Type#oneofsArray
                 * @type {OneOf[]}
                 * @readonly
                 */
                oneofsArray: {
                    get: function get() {
                        return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
                    }
                },

                /**
                 * The registered constructor, if any registered, otherwise a generic constructor.
                 * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
                 * @name Type#ctor
                 * @type {Constructor<{}>}
                 */
                ctor: {
                    get: function get() {
                        return this._ctor || (this.ctor = Type.generateConstructor(this)());
                    },
                    set: function set(ctor) {

                        // Ensure proper prototype
                        var prototype = ctor.prototype;
                        if (!(prototype instanceof Message)) {
                            (ctor.prototype = new Message()).constructor = ctor;
                            util.merge(ctor.prototype, prototype);
                        }

                        // Classes and messages reference their reflected type
                        ctor.$type = ctor.prototype.$type = this;

                        // Mix in static methods
                        util.merge(ctor, Message, true);

                        this._ctor = ctor;

                        // Messages have non-enumerable default values on their prototype
                        var i = 0;
                        for (; i < /* initializes */this.fieldsArray.length; ++i) {
                            this._fieldsArray[i].resolve();
                        } // ensures a proper value

                        // Messages have non-enumerable getters and setters for each virtual oneof field
                        var ctorProperties = {};
                        for (i = 0; i < /* initializes */this.oneofsArray.length; ++i) {
                            ctorProperties[this._oneofsArray[i].resolve().name] = {
                                get: util.oneOfGetter(this._oneofsArray[i].oneof),
                                set: util.oneOfSetter(this._oneofsArray[i].oneof)
                            };
                        }if (i) Object.defineProperties(ctor.prototype, ctorProperties);
                    }
                }
            });

            /**
            * Generates a constructor function for the specified type.
            * @param {Type} mtype Message type
            * @returns {Codegen} Codegen instance
            */
            Type.generateConstructor = function generateConstructor(mtype) {
                /* eslint-disable no-unexpected-multiline */
                var gen = util.codegen(["p"], mtype.name);
                // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype
                for (var i = 0, field; i < mtype.fieldsArray.length; ++i) {
                    if ((field = mtype._fieldsArray[i]).map) gen("this%s={}", util.safeProp(field.name));else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
                }return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
                ("this[ks[i]]=p[ks[i]]");
                /* eslint-enable no-unexpected-multiline */
            };

            function clearCache(type) {
                type._fieldsById = type._fieldsArray = type._oneofsArray = null;
                delete type.encode;
                delete type.decode;
                delete type.verify;
                return type;
            }

            /**
            * Message type descriptor.
            * @interface IType
            * @extends INamespace
            * @property {Object.<string,IOneOf>} [oneofs] Oneof descriptors
            * @property {Object.<string,IField>} fields Field descriptors
            * @property {number[][]} [extensions] Extension ranges
            * @property {number[][]} [reserved] Reserved ranges
            * @property {boolean} [group=false] Whether a legacy group or not
            */

            /**
            * Creates a message type from a message type descriptor.
            * @param {string} name Message name
            * @param {IType} json Message type descriptor
            * @returns {Type} Created message type
            */
            Type.fromJSON = function fromJSON(name, json) {
                var type = new Type(name, json.options);
                type.extensions = json.extensions;
                type.reserved = json.reserved;
                var names = Object.keys(json.fields),
                    i = 0;
                for (; i < names.length; ++i) {
                    type.add((typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]]));
                }if (json.oneofs) for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i) {
                    type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
                }if (json.nested) for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
                    var nested = json.nested[names[i]];
                    type.add( // most to least likely
                    (nested.id !== undefined ? Field.fromJSON : nested.fields !== undefined ? Type.fromJSON : nested.values !== undefined ? Enum.fromJSON : nested.methods !== undefined ? Service.fromJSON : Namespace.fromJSON)(names[i], nested));
                }
                if (json.extensions && json.extensions.length) type.extensions = json.extensions;
                if (json.reserved && json.reserved.length) type.reserved = json.reserved;
                if (json.group) type.group = true;
                if (json.comment) type.comment = json.comment;
                return type;
            };

            /**
            * Converts this message type to a message type descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {IType} Message type descriptor
            */
            Type.prototype.toJSON = function toJSON(toJSONOptions) {
                var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
                var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
                return util.toObject(["options", inherited && inherited.options || undefined, "oneofs", Namespace.arrayToJSON(this.oneofsArray, toJSONOptions), "fields", Namespace.arrayToJSON(this.fieldsArray.filter(function (obj) {
                    return !obj.declaringField;
                }), toJSONOptions) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : undefined, "reserved", this.reserved && this.reserved.length ? this.reserved : undefined, "group", this.group || undefined, "nested", inherited && inherited.nested || undefined, "comment", keepComments ? this.comment : undefined]);
            };

            /**
            * @override
            */
            Type.prototype.resolveAll = function resolveAll() {
                var fields = this.fieldsArray,
                    i = 0;
                while (i < fields.length) {
                    fields[i++].resolve();
                }var oneofs = this.oneofsArray;i = 0;
                while (i < oneofs.length) {
                    oneofs[i++].resolve();
                }return Namespace.prototype.resolveAll.call(this);
            };

            /**
            * @override
            */
            Type.prototype.get = function get(name) {
                return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
            };

            /**
            * Adds a nested object to this type.
            * @param {ReflectionObject} object Nested object to add
            * @returns {Type} `this`
            * @throws {TypeError} If arguments are invalid
            * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
            */
            Type.prototype.add = function add(object) {

                if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);

                if (object instanceof Field && object.extend === undefined) {
                    // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
                    // The root object takes care of adding distinct sister-fields to the respective extended
                    // type instead.

                    // avoids calling the getter if not absolutely necessary because it's called quite frequently
                    if (this._fieldsById ? /* istanbul ignore next */this._fieldsById[object.id] : this.fieldsById[object.id]) throw Error("duplicate id " + object.id + " in " + this);
                    if (this.isReservedId(object.id)) throw Error("id " + object.id + " is reserved in " + this);
                    if (this.isReservedName(object.name)) throw Error("name '" + object.name + "' is reserved in " + this);

                    if (object.parent) object.parent.remove(object);
                    this.fields[object.name] = object;
                    object.message = this;
                    object.onAdd(this);
                    return clearCache(this);
                }
                if (object instanceof OneOf) {
                    if (!this.oneofs) this.oneofs = {};
                    this.oneofs[object.name] = object;
                    object.onAdd(this);
                    return clearCache(this);
                }
                return Namespace.prototype.add.call(this, object);
            };

            /**
            * Removes a nested object from this type.
            * @param {ReflectionObject} object Nested object to remove
            * @returns {Type} `this`
            * @throws {TypeError} If arguments are invalid
            * @throws {Error} If `object` is not a member of this type
            */
            Type.prototype.remove = function remove(object) {
                if (object instanceof Field && object.extend === undefined) {
                    // See Type#add for the reason why extension fields are excluded here.

                    /* istanbul ignore if */
                    if (!this.fields || this.fields[object.name] !== object) throw Error(object + " is not a member of " + this);

                    delete this.fields[object.name];
                    object.parent = null;
                    object.onRemove(this);
                    return clearCache(this);
                }
                if (object instanceof OneOf) {

                    /* istanbul ignore if */
                    if (!this.oneofs || this.oneofs[object.name] !== object) throw Error(object + " is not a member of " + this);

                    delete this.oneofs[object.name];
                    object.parent = null;
                    object.onRemove(this);
                    return clearCache(this);
                }
                return Namespace.prototype.remove.call(this, object);
            };

            /**
            * Tests if the specified id is reserved.
            * @param {number} id Id to test
            * @returns {boolean} `true` if reserved, otherwise `false`
            */
            Type.prototype.isReservedId = function isReservedId(id) {
                return Namespace.isReservedId(this.reserved, id);
            };

            /**
            * Tests if the specified name is reserved.
            * @param {string} name Name to test
            * @returns {boolean} `true` if reserved, otherwise `false`
            */
            Type.prototype.isReservedName = function isReservedName(name) {
                return Namespace.isReservedName(this.reserved, name);
            };

            /**
            * Creates a new message of this type using the specified properties.
            * @param {Object.<string,*>} [properties] Properties to set
            * @returns {Message<{}>} Message instance
            */
            Type.prototype.create = function create(properties) {
                return new this.ctor(properties);
            };

            /**
            * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
            * @returns {Type} `this`
            */
            Type.prototype.setup = function setup() {
                // Sets up everything at once so that the prototype chain does not have to be re-evaluated
                // multiple times (V8, soft-deopt prototype-check).

                var fullName = this.fullName,
                    types = [];
                for (var i = 0; i < /* initializes */this.fieldsArray.length; ++i) {
                    types.push(this._fieldsArray[i].resolve().resolvedType);
                } // Replace setup methods with type-specific generated functions
                this.encode = encoder(this)({
                    Writer: Writer,
                    types: types,
                    util: util
                });
                this.decode = decoder(this)({
                    Reader: Reader,
                    types: types,
                    util: util
                });
                this.verify = verifier(this)({
                    types: types,
                    util: util
                });
                this.fromObject = converter.fromObject(this)({
                    types: types,
                    util: util
                });
                this.toObject = converter.toObject(this)({
                    types: types,
                    util: util
                });

                // Inject custom wrappers for common types
                var wrapper = wrappers[fullName];
                if (wrapper) {
                    var originalThis = Object.create(this);
                    // if (wrapper.fromObject) {
                    originalThis.fromObject = this.fromObject;
                    this.fromObject = wrapper.fromObject.bind(originalThis);
                    // }
                    // if (wrapper.toObject) {
                    originalThis.toObject = this.toObject;
                    this.toObject = wrapper.toObject.bind(originalThis);
                    // }
                }

                return this;
            };

            /**
            * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
            * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
            * @param {Writer} [writer] Writer to encode to
            * @returns {Writer} writer
            */
            Type.prototype.encode = function encode_setup(message, writer) {
                return this.setup().encode(message, writer); // overrides this method
            };

            /**
            * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
            * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
            * @param {Writer} [writer] Writer to encode to
            * @returns {Writer} writer
            */
            Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
            * Decodes a message of this type.
            * @param {Reader|Uint8Array} reader Reader or buffer to decode from
            * @param {number} [length] Length of the message, if known beforehand
            * @returns {Message<{}>} Decoded message
            * @throws {Error} If the payload is not a reader or valid buffer
            * @throws {util.ProtocolError<{}>} If required fields are missing
            */
            Type.prototype.decode = function decode_setup(reader, length) {
                return this.setup().decode(reader, length); // overrides this method
            };

            /**
            * Decodes a message of this type preceeded by its byte length as a varint.
            * @param {Reader|Uint8Array} reader Reader or buffer to decode from
            * @returns {Message<{}>} Decoded message
            * @throws {Error} If the payload is not a reader or valid buffer
            * @throws {util.ProtocolError} If required fields are missing
            */
            Type.prototype.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof Reader)) reader = Reader.create(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
            * Verifies that field values are valid and that required fields are present.
            * @param {Object.<string,*>} message Plain object to verify
            * @returns {null|string} `null` if valid, otherwise the reason why it is not
            */
            Type.prototype.verify = function verify_setup(message) {
                return this.setup().verify(message); // overrides this method
            };

            /**
            * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
            * @param {Object.<string,*>} object Plain object to convert
            * @returns {Message<{}>} Message instance
            */
            Type.prototype.fromObject = function fromObject(object) {
                return this.setup().fromObject(object);
            };

            /**
            * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
            * @interface IConversionOptions
            * @property {Function} [longs] Long conversion type.
            * Valid values are `String` and `Number` (the global types).
            * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
            * @property {Function} [enums] Enum value conversion type.
            * Only valid value is `String` (the global type).
            * Defaults to copy the present value, which is the numeric id.
            * @property {Function} [bytes] Bytes value conversion type.
            * Valid values are `Array` and (a base64 encoded) `String` (the global types).
            * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
            * @property {boolean} [defaults=false] Also sets default values on the resulting object
            * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
            * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
            * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
            * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
            */

            /**
            * Creates a plain object from a message of this type. Also converts values to other types if specified.
            * @param {Message<{}>} message Message instance
            * @param {IConversionOptions} [options] Conversion options
            * @returns {Object.<string,*>} Plain object
            */
            Type.prototype.toObject = function toObject(message, options) {
                return this.setup().toObject(message, options);
            };

            /**
            * Decorator function as returned by {@link Type.d} (TypeScript).
            * @typedef TypeDecorator
            * @type {function}
            * @param {Constructor<T>} target Target constructor
            * @returns {undefined}
            * @template T extends Message<T>
            */

            /**
            * Type decorator (TypeScript).
            * @param {string} [typeName] Type name, defaults to the constructor's name
            * @returns {TypeDecorator<T>} Decorator function
            * @template T extends Message<T>
            */
            Type.d = function decorateType(typeName) {
                return function typeDecorator(target) {
                    util.decorateType(target, typeName);
                };
            };
        }, { "12": 12, "13": 13, "14": 14, "15": 15, "16": 16, "20": 20, "21": 21, "23": 23, "25": 25, "27": 27, "33": 33, "37": 37, "40": 40, "41": 41, "42": 42 }], 36: [function (require, module, exports) {
            "use strict";

            /**
            * Common type constants.
            * @namespace
            */

            var types = exports;

            var util = require(37);

            var s = ["double", // 0
            "float", // 1
            "int32", // 2
            "uint32", // 3
            "sint32", // 4
            "fixed32", // 5
            "sfixed32", // 6
            "int64", // 7
            "uint64", // 8
            "sint64", // 9
            "fixed64", // 10
            "sfixed64", // 11
            "bool", // 12
            "string", // 13
            "bytes" // 14
            ];

            function bake(values, offset) {
                var i = 0,
                    o = {};
                offset |= 0;
                while (i < values.length) {
                    o[s[i + offset]] = values[i++];
                }return o;
            }

            /**
            * Basic type wire types.
            * @type {Object.<string,number>}
            * @const
            * @property {number} double=1 Fixed64 wire type
            * @property {number} float=5 Fixed32 wire type
            * @property {number} int32=0 Varint wire type
            * @property {number} uint32=0 Varint wire type
            * @property {number} sint32=0 Varint wire type
            * @property {number} fixed32=5 Fixed32 wire type
            * @property {number} sfixed32=5 Fixed32 wire type
            * @property {number} int64=0 Varint wire type
            * @property {number} uint64=0 Varint wire type
            * @property {number} sint64=0 Varint wire type
            * @property {number} fixed64=1 Fixed64 wire type
            * @property {number} sfixed64=1 Fixed64 wire type
            * @property {number} bool=0 Varint wire type
            * @property {number} string=2 Ldelim wire type
            * @property {number} bytes=2 Ldelim wire type
            */
            types.basic = bake([
            /* double   */1,
            /* float    */5,
            /* int32    */0,
            /* uint32   */0,
            /* sint32   */0,
            /* fixed32  */5,
            /* sfixed32 */5,
            /* int64    */0,
            /* uint64   */0,
            /* sint64   */0,
            /* fixed64  */1,
            /* sfixed64 */1,
            /* bool     */0,
            /* string   */2,
            /* bytes    */2]);

            /**
            * Basic type defaults.
            * @type {Object.<string,*>}
            * @const
            * @property {number} double=0 Double default
            * @property {number} float=0 Float default
            * @property {number} int32=0 Int32 default
            * @property {number} uint32=0 Uint32 default
            * @property {number} sint32=0 Sint32 default
            * @property {number} fixed32=0 Fixed32 default
            * @property {number} sfixed32=0 Sfixed32 default
            * @property {number} int64=0 Int64 default
            * @property {number} uint64=0 Uint64 default
            * @property {number} sint64=0 Sint32 default
            * @property {number} fixed64=0 Fixed64 default
            * @property {number} sfixed64=0 Sfixed64 default
            * @property {boolean} bool=false Bool default
            * @property {string} string="" String default
            * @property {Array.<number>} bytes=Array(0) Bytes default
            * @property {null} message=null Message default
            */
            types.defaults = bake([
            /* double   */0,
            /* float    */0,
            /* int32    */0,
            /* uint32   */0,
            /* sint32   */0,
            /* fixed32  */0,
            /* sfixed32 */0,
            /* int64    */0,
            /* uint64   */0,
            /* sint64   */0,
            /* fixed64  */0,
            /* sfixed64 */0,
            /* bool     */false,
            /* string   */"",
            /* bytes    */util.emptyArray,
            /* message  */null]);

            /**
            * Basic long type wire types.
            * @type {Object.<string,number>}
            * @const
            * @property {number} int64=0 Varint wire type
            * @property {number} uint64=0 Varint wire type
            * @property {number} sint64=0 Varint wire type
            * @property {number} fixed64=1 Fixed64 wire type
            * @property {number} sfixed64=1 Fixed64 wire type
            */
            types.long = bake([
            /* int64    */0,
            /* uint64   */0,
            /* sint64   */0,
            /* fixed64  */1,
            /* sfixed64 */1], 7);

            /**
            * Allowed types for map keys with their associated wire type.
            * @type {Object.<string,number>}
            * @const
            * @property {number} int32=0 Varint wire type
            * @property {number} uint32=0 Varint wire type
            * @property {number} sint32=0 Varint wire type
            * @property {number} fixed32=5 Fixed32 wire type
            * @property {number} sfixed32=5 Fixed32 wire type
            * @property {number} int64=0 Varint wire type
            * @property {number} uint64=0 Varint wire type
            * @property {number} sint64=0 Varint wire type
            * @property {number} fixed64=1 Fixed64 wire type
            * @property {number} sfixed64=1 Fixed64 wire type
            * @property {number} bool=0 Varint wire type
            * @property {number} string=2 Ldelim wire type
            */
            types.mapKey = bake([
            /* int32    */0,
            /* uint32   */0,
            /* sint32   */0,
            /* fixed32  */5,
            /* sfixed32 */5,
            /* int64    */0,
            /* uint64   */0,
            /* sint64   */0,
            /* fixed64  */1,
            /* sfixed64 */1,
            /* bool     */0,
            /* string   */2], 2);

            /**
            * Allowed types for packed repeated fields with their associated wire type.
            * @type {Object.<string,number>}
            * @const
            * @property {number} double=1 Fixed64 wire type
            * @property {number} float=5 Fixed32 wire type
            * @property {number} int32=0 Varint wire type
            * @property {number} uint32=0 Varint wire type
            * @property {number} sint32=0 Varint wire type
            * @property {number} fixed32=5 Fixed32 wire type
            * @property {number} sfixed32=5 Fixed32 wire type
            * @property {number} int64=0 Varint wire type
            * @property {number} uint64=0 Varint wire type
            * @property {number} sint64=0 Varint wire type
            * @property {number} fixed64=1 Fixed64 wire type
            * @property {number} sfixed64=1 Fixed64 wire type
            * @property {number} bool=0 Varint wire type
            */
            types.packed = bake([
            /* double   */1,
            /* float    */5,
            /* int32    */0,
            /* uint32   */0,
            /* sint32   */0,
            /* fixed32  */5,
            /* sfixed32 */5,
            /* int64    */0,
            /* uint64   */0,
            /* sint64   */0,
            /* fixed64  */1,
            /* sfixed64 */1,
            /* bool     */0]);
        }, { "37": 37 }], 37: [function (require, module, exports) {
            "use strict";

            /**
            * Various utility functions.
            * @namespace
            */

            var util = module.exports = require(39);

            var roots = require(30);

            var Type, // cyclic
            Enum;

            util.codegen = require(3);
            util.fetch = require(5);
            util.path = require(8);

            /**
            * Node's fs module if available.
            * @type {Object.<string,*>}
            */
            util.fs = util.inquire("fs");

            /**
            * Converts an object's values to an array.
            * @param {Object.<string,*>} object Object to convert
            * @returns {Array.<*>} Converted array
            */
            util.toArray = function toArray(object) {
                if (object) {
                    var keys = Object.keys(object),
                        array = new Array(keys.length),
                        index = 0;
                    while (index < keys.length) {
                        array[index] = object[keys[index++]];
                    }return array;
                }
                return [];
            };

            /**
            * Converts an array of keys immediately followed by their respective value to an object, omitting undefined values.
            * @param {Array.<*>} array Array to convert
            * @returns {Object.<string,*>} Converted object
            */
            util.toObject = function toObject(array) {
                var object = {},
                    index = 0;
                while (index < array.length) {
                    var key = array[index++],
                        val = array[index++];
                    if (val !== undefined) object[key] = val;
                }
                return object;
            };

            var safePropBackslashRe = /\\/g,
                safePropQuoteRe = /"/g;

            /**
            * Tests whether the specified name is a reserved word in JS.
            * @param {string} name Name to test
            * @returns {boolean} `true` if reserved, otherwise `false`
            */
            util.isReserved = function isReserved(name) {
                return (/^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name)
                );
            };

            /**
            * Returns a safe property accessor for the specified property name.
            * @param {string} prop Property name
            * @returns {string} Safe accessor
            */
            util.safeProp = function safeProp(prop) {
                if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop)) return "[\"" + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, "\\\"") + "\"]";
                return "." + prop;
            };

            /**
            * Converts the first character of a string to upper case.
            * @param {string} str String to convert
            * @returns {string} Converted string
            */
            util.ucFirst = function ucFirst(str) {
                return str.charAt(0).toUpperCase() + str.substring(1);
            };

            var camelCaseRe = /_([a-z])/g;

            /**
            * Converts a string to camel case.
            * @param {string} str String to convert
            * @returns {string} Converted string
            */
            util.camelCase = function camelCase(str) {
                return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function ($0, $1) {
                    return $1.toUpperCase();
                });
            };

            /**
            * Compares reflected fields by id.
            * @param {Field} a First field
            * @param {Field} b Second field
            * @returns {number} Comparison value
            */
            util.compareFieldsById = function compareFieldsById(a, b) {
                return a.id - b.id;
            };

            /**
            * Decorator helper for types (TypeScript).
            * @param {Constructor<T>} ctor Constructor function
            * @param {string} [typeName] Type name, defaults to the constructor's name
            * @returns {Type} Reflected type
            * @template T extends Message<T>
            * @property {Root} root Decorators root
            */
            util.decorateType = function decorateType(ctor, typeName) {

                /* istanbul ignore if */
                if (ctor.$type) {
                    if (typeName && ctor.$type.name !== typeName) {
                        util.decorateRoot.remove(ctor.$type);
                        ctor.$type.name = typeName;
                        util.decorateRoot.add(ctor.$type);
                    }
                    return ctor.$type;
                }

                /* istanbul ignore next */
                if (!Type) Type = require(35);

                var type = new Type(typeName || ctor.name);
                util.decorateRoot.add(type);
                type.ctor = ctor; // sets up .encode, .decode etc.
                Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
                Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
                return type;
            };

            var decorateEnumIndex = 0;

            /**
            * Decorator helper for enums (TypeScript).
            * @param {Object} object Enum object
            * @returns {Enum} Reflected enum
            */
            util.decorateEnum = function decorateEnum(object) {

                /* istanbul ignore if */
                if (object.$type) return object.$type;

                /* istanbul ignore next */
                if (!Enum) Enum = require(15);

                var enm = new Enum("Enum" + decorateEnumIndex++, object);
                util.decorateRoot.add(enm);
                Object.defineProperty(object, "$type", { value: enm, enumerable: false });
                return enm;
            };

            /**
            * Decorator root (TypeScript).
            * @name util.decorateRoot
            * @type {Root}
            * @readonly
            */
            Object.defineProperty(util, "decorateRoot", {
                get: function get() {
                    return roots["decorated"] || (roots["decorated"] = new (require(29))());
                }
            });
        }, { "15": 15, "29": 29, "3": 3, "30": 30, "35": 35, "39": 39, "5": 5, "8": 8 }], 38: [function (require, module, exports) {
            "use strict";

            module.exports = LongBits;

            var util = require(39);

            /**
            * Constructs new long bits.
            * @classdesc Helper class for working with the low and high bits of a 64 bit value.
            * @memberof util
            * @constructor
            * @param {number} lo Low 32 bits, unsigned
            * @param {number} hi High 32 bits, unsigned
            */
            function LongBits(lo, hi) {

                // note that the casts below are theoretically unnecessary as of today, but older statically
                // generated converter code might still call the ctor with signed 32bits. kept for compat.

                /**
                 * Low bits.
                 * @type {number}
                 */
                this.lo = lo >>> 0;

                /**
                 * High bits.
                 * @type {number}
                 */
                this.hi = hi >>> 0;
            }

            /**
            * Zero bits.
            * @memberof util.LongBits
            * @type {util.LongBits}
            */
            var zero = LongBits.zero = new LongBits(0, 0);

            zero.toNumber = function () {
                return 0;
            };
            zero.zzEncode = zero.zzDecode = function () {
                return this;
            };
            zero.length = function () {
                return 1;
            };

            /**
            * Zero hash.
            * @memberof util.LongBits
            * @type {string}
            */
            var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

            /**
            * Constructs new long bits from the specified number.
            * @param {number} value Value
            * @returns {util.LongBits} Instance
            */
            LongBits.fromNumber = function fromNumber(value) {
                if (value === 0) return zero;
                var sign = value < 0;
                if (sign) value = -value;
                var lo = value >>> 0,
                    hi = (value - lo) / 4294967296 >>> 0;
                if (sign) {
                    hi = ~hi >>> 0;
                    lo = ~lo >>> 0;
                    if (++lo > 4294967295) {
                        lo = 0;
                        if (++hi > 4294967295) hi = 0;
                    }
                }
                return new LongBits(lo, hi);
            };

            /**
            * Constructs new long bits from a number, long or string.
            * @param {Long|number|string} value Value
            * @returns {util.LongBits} Instance
            */
            LongBits.from = function from(value) {
                if (typeof value === "number") return LongBits.fromNumber(value);
                if (util.isString(value)) {
                    /* istanbul ignore else */
                    if (util.Long) value = util.Long.fromString(value);else return LongBits.fromNumber(parseInt(value, 10));
                }
                return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
            };

            /**
            * Converts this long bits to a possibly unsafe JavaScript number.
            * @param {boolean} [unsigned=false] Whether unsigned or not
            * @returns {number} Possibly unsafe number
            */
            LongBits.prototype.toNumber = function toNumber(unsigned) {
                if (!unsigned && this.hi >>> 31) {
                    var lo = ~this.lo + 1 >>> 0,
                        hi = ~this.hi >>> 0;
                    if (!lo) hi = hi + 1 >>> 0;
                    return -(lo + hi * 4294967296);
                }
                return this.lo + this.hi * 4294967296;
            };

            /**
            * Converts this long bits to a long.
            * @param {boolean} [unsigned=false] Whether unsigned or not
            * @returns {Long} Long
            */
            LongBits.prototype.toLong = function toLong(unsigned) {
                return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
                /* istanbul ignore next */
                : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
            };

            var charCodeAt = String.prototype.charCodeAt;

            /**
            * Constructs new long bits from the specified 8 characters long hash.
            * @param {string} hash Hash
            * @returns {util.LongBits} Bits
            */
            LongBits.fromHash = function fromHash(hash) {
                if (hash === zeroHash) return zero;
                return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
            };

            /**
            * Converts this long bits to a 8 characters long hash.
            * @returns {string} Hash
            */
            LongBits.prototype.toHash = function toHash() {
                return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
            };

            /**
            * Zig-zag encodes this long bits.
            * @returns {util.LongBits} `this`
            */
            LongBits.prototype.zzEncode = function zzEncode() {
                var mask = this.hi >> 31;
                this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
                this.lo = (this.lo << 1 ^ mask) >>> 0;
                return this;
            };

            /**
            * Zig-zag decodes this long bits.
            * @returns {util.LongBits} `this`
            */
            LongBits.prototype.zzDecode = function zzDecode() {
                var mask = -(this.lo & 1);
                this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
                this.hi = (this.hi >>> 1 ^ mask) >>> 0;
                return this;
            };

            /**
            * Calculates the length of this longbits when encoded as a varint.
            * @returns {number} Length
            */
            LongBits.prototype.length = function length() {
                var part0 = this.lo,
                    part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
                    part2 = this.hi >>> 24;
                return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
            };
        }, { "39": 39 }], 39: [function (require, module, exports) {
            "use strict";

            var util = exports;

            // used to return a Promise where callback is omitted
            util.asPromise = require(1);

            // converts to / from base64 encoded strings
            util.base64 = require(2);

            // base class of rpc.Service
            util.EventEmitter = require(4);

            // float handling accross browsers
            util.float = require(6);

            // requires modules optionally and hides the call from bundlers
            util.inquire = require(7);

            // converts to / from utf8 encoded strings
            util.utf8 = require(10);

            // provides a node-like buffer pool in the browser
            util.pool = require(9);

            // utility to work with the low and high bits of a 64 bit value
            util.LongBits = require(38);

            // global object reference
            util.global = typeof window !== "undefined" && window || typeof global !== "undefined" && global || typeof self !== "undefined" && self || this; // eslint-disable-line no-invalid-this

            /**
            * An immuable empty array.
            * @memberof util
            * @type {Array.<*>}
            * @const
            */
            util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */[]; // used on prototypes

            /**
            * An immutable empty object.
            * @type {Object}
            * @const
            */
            util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */{}; // used on prototypes

            /**
            * Whether running within node or not.
            * @memberof util
            * @type {boolean}
            * @const
            */
            util.isNode = Boolean(util.global.process && util.global.process.versions && util.global.process.versions.node);

            /**
            * Tests if the specified value is an integer.
            * @function
            * @param {*} value Value to test
            * @returns {boolean} `true` if the value is an integer
            */
            util.isInteger = Number.isInteger || /* istanbul ignore next */function isInteger(value) {
                return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
            };

            /**
            * Tests if the specified value is a string.
            * @param {*} value Value to test
            * @returns {boolean} `true` if the value is a string
            */
            util.isString = function isString(value) {
                return typeof value === "string" || value instanceof String;
            };

            /**
            * Tests if the specified value is a non-null object.
            * @param {*} value Value to test
            * @returns {boolean} `true` if the value is a non-null object
            */
            util.isObject = function isObject(value) {
                return value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object";
            };

            /**
            * Checks if a property on a message is considered to be present.
            * This is an alias of {@link util.isSet}.
            * @function
            * @param {Object} obj Plain object or message instance
            * @param {string} prop Property name
            * @returns {boolean} `true` if considered to be present, otherwise `false`
            */
            util.isset =

            /**
            * Checks if a property on a message is considered to be present.
            * @param {Object} obj Plain object or message instance
            * @param {string} prop Property name
            * @returns {boolean} `true` if considered to be present, otherwise `false`
            */
            util.isSet = function isSet(obj, prop) {
                var value = obj[prop];
                if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
                    return (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
                return false;
            };

            /**
            * Any compatible Buffer instance.
            * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
            * @interface Buffer
            * @extends Uint8Array
            */

            /**
            * Node's Buffer class if available.
            * @type {Constructor<Buffer>}
            */
            util.Buffer = function () {
                try {
                    var Buffer = util.inquire("buffer").Buffer;
                    // refuse to use non-node buffers if not explicitly assigned (perf reasons):
                    return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */null;
                } catch (e) {
                    /* istanbul ignore next */
                    return null;
                }
            }();

            // Internal alias of or polyfull for Buffer.from.
            util._Buffer_from = null;

            // Internal alias of or polyfill for Buffer.allocUnsafe.
            util._Buffer_allocUnsafe = null;

            /**
            * Creates a new buffer of whatever type supported by the environment.
            * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
            * @returns {Uint8Array|Buffer} Buffer
            */
            util.newBuffer = function newBuffer(sizeOrArray) {
                /* istanbul ignore next */
                return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
            };

            /**
            * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
            * @type {Constructor<Uint8Array>}
            */
            util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

            /**
            * Any compatible Long instance.
            * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
            * @interface Long
            * @property {number} low Low bits
            * @property {number} high High bits
            * @property {boolean} unsigned Whether unsigned or not
            */

            /**
            * Long.js's Long class if available.
            * @type {Constructor<Long>}
            */
            util.Long = /* istanbul ignore next */util.global.dcodeIO && /* istanbul ignore next */util.global.dcodeIO.Long || /* istanbul ignore next */util.global.Long || util.inquire("long");

            /**
            * Regular expression used to verify 2 bit (`bool`) map keys.
            * @type {RegExp}
            * @const
            */
            util.key2Re = /^true|false|0|1$/;

            /**
            * Regular expression used to verify 32 bit (`int32` etc.) map keys.
            * @type {RegExp}
            * @const
            */
            util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

            /**
            * Regular expression used to verify 64 bit (`int64` etc.) map keys.
            * @type {RegExp}
            * @const
            */
            util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

            /**
            * Converts a number or long to an 8 characters long hash string.
            * @param {Long|number} value Value to convert
            * @returns {string} Hash
            */
            util.longToHash = function longToHash(value) {
                return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
            };

            /**
            * Converts an 8 characters long hash string to a long or number.
            * @param {string} hash Hash
            * @param {boolean} [unsigned=false] Whether unsigned or not
            * @returns {Long|number} Original value
            */
            util.longFromHash = function longFromHash(hash, unsigned) {
                var bits = util.LongBits.fromHash(hash);
                if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
                return bits.toNumber(Boolean(unsigned));
            };

            /**
            * Merges the properties of the source object into the destination object.
            * @memberof util
            * @param {Object.<string,*>} dst Destination object
            * @param {Object.<string,*>} src Source object
            * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
            * @returns {Object.<string,*>} Destination object
            */
            function merge(dst, src, ifNotSet) {
                // used by converters
                for (var keys = Object.keys(src), i = 0; i < keys.length; ++i) {
                    if (dst[keys[i]] === undefined || !ifNotSet) dst[keys[i]] = src[keys[i]];
                }return dst;
            }

            util.merge = merge;

            /**
            * Converts the first character of a string to lower case.
            * @param {string} str String to convert
            * @returns {string} Converted string
            */
            util.lcFirst = function lcFirst(str) {
                return str.charAt(0).toLowerCase() + str.substring(1);
            };

            /**
            * Creates a custom error constructor.
            * @memberof util
            * @param {string} name Error name
            * @returns {Constructor<Error>} Custom error constructor
            */
            function newError(name) {

                function CustomError(message, properties) {

                    if (!(this instanceof CustomError)) return new CustomError(message, properties);

                    // Error.call(this, message);
                    // ^ just returns a new error instance because the ctor can be called as a function

                    Object.defineProperty(this, "message", { get: function get() {
                            return message;
                        } });

                    /* istanbul ignore next */
                    if (Error.captureStackTrace) // node
                        Error.captureStackTrace(this, CustomError);else Object.defineProperty(this, "stack", { value: new Error().stack || "" });

                    if (properties) merge(this, properties);
                }

                (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

                Object.defineProperty(CustomError.prototype, "name", { get: function get() {
                        return name;
                    } });

                CustomError.prototype.toString = function toString() {
                    return this.name + ": " + this.message;
                };

                return CustomError;
            }

            util.newError = newError;

            /**
            * Constructs a new protocol error.
            * @classdesc Error subclass indicating a protocol specifc error.
            * @memberof util
            * @extends Error
            * @template T extends Message<T>
            * @constructor
            * @param {string} message Error message
            * @param {Object.<string,*>} [properties] Additional properties
            * @example
            * try {
            *     MyMessage.decode(someBuffer); // throws if required fields are missing
            * } catch (e) {
            *     if (e instanceof ProtocolError && e.instance)
            *         console.log("decoded so far: " + JSON.stringify(e.instance));
            * }
            */
            util.ProtocolError = newError("ProtocolError");

            /**
            * So far decoded message instance.
            * @name util.ProtocolError#instance
            * @type {Message<T>}
            */

            /**
            * A OneOf getter as returned by {@link util.oneOfGetter}.
            * @typedef OneOfGetter
            * @type {function}
            * @returns {string|undefined} Set field name, if any
            */

            /**
            * Builds a getter for a oneof's present field name.
            * @param {string[]} fieldNames Field names
            * @returns {OneOfGetter} Unbound getter
            */
            util.oneOfGetter = function getOneOf(fieldNames) {
                var fieldMap = {};
                for (var i = 0; i < fieldNames.length; ++i) {
                    fieldMap[fieldNames[i]] = 1;
                } /**
                   * @returns {string|undefined} Set field name, if any
                   * @this Object
                   * @ignore
                   */
                return function () {
                    // eslint-disable-line consistent-return
                    for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i) {
                        if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null) return keys[i];
                    }
                };
            };

            /**
            * A OneOf setter as returned by {@link util.oneOfSetter}.
            * @typedef OneOfSetter
            * @type {function}
            * @param {string|undefined} value Field name
            * @returns {undefined}
            */

            /**
            * Builds a setter for a oneof's present field name.
            * @param {string[]} fieldNames Field names
            * @returns {OneOfSetter} Unbound setter
            */
            util.oneOfSetter = function setOneOf(fieldNames) {

                /**
                 * @param {string} name Field name
                 * @returns {undefined}
                 * @this Object
                 * @ignore
                 */
                return function (name) {
                    for (var i = 0; i < fieldNames.length; ++i) {
                        if (fieldNames[i] !== name) delete this[fieldNames[i]];
                    }
                };
            };

            /**
            * Default conversion options used for {@link Message#toJSON} implementations.
            *
            * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
            *
            * - Longs become strings
            * - Enums become string keys
            * - Bytes become base64 encoded strings
            * - (Sub-)Messages become plain objects
            * - Maps become plain objects with all string keys
            * - Repeated fields become arrays
            * - NaN and Infinity for float and double fields become strings
            *
            * @type {IConversionOptions}
            * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
            */
            util.toJSONOptions = {
                longs: String,
                enums: String,
                bytes: String,
                json: true
            };

            // Sets up buffer utility according to the environment (called in index-minimal)
            util._configure = function () {
                var Buffer = util.Buffer;
                /* istanbul ignore if */
                if (!Buffer) {
                    util._Buffer_from = util._Buffer_allocUnsafe = null;
                    return;
                }
                // because node 4.x buffers are incompatible & immutable
                // see: https://github.com/dcodeIO/protobuf.js/pull/665
                util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
                /* istanbul ignore next */
                function Buffer_from(value, encoding) {
                    return new Buffer(value, encoding);
                };
                util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
                /* istanbul ignore next */
                function Buffer_allocUnsafe(size) {
                    return new Buffer(size);
                };
            };
        }, { "1": 1, "10": 10, "2": 2, "38": 38, "4": 4, "6": 6, "7": 7, "9": 9 }], 40: [function (require, module, exports) {
            "use strict";

            module.exports = verifier;

            var Enum = require(15),
                util = require(37);

            function invalid(field, expected) {
                return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
            }

            /**
            * Generates a partial value verifier.
            * @param {Codegen} gen Codegen instance
            * @param {Field} field Reflected field
            * @param {number} fieldIndex Field index
            * @param {string} ref Variable reference
            * @returns {Codegen} Codegen instance
            * @ignore
            */
            function genVerifyValue(gen, field, fieldIndex, ref) {
                /* eslint-disable no-unexpected-multiline */
                if (field.resolvedType) {
                    if (field.resolvedType instanceof Enum) {
                        gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
                        for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) {
                            gen("case %i:", field.resolvedType.values[keys[j]]);
                        }gen("break")("}");
                    } else {
                        gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
                    }
                } else {
                    switch (field.type) {
                        case "int32":
                        case "uint32":
                        case "sint32":
                        case "fixed32":
                        case "sfixed32":
                            gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
                            break;
                        case "int64":
                        case "uint64":
                        case "sint64":
                        case "fixed64":
                        case "sfixed64":
                            gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
                            break;
                        case "float":
                        case "double":
                            gen("if(typeof %s!==\"number\")", ref)("return%j", invalid(field, "number"));
                            break;
                        case "bool":
                            gen("if(typeof %s!==\"boolean\")", ref)("return%j", invalid(field, "boolean"));
                            break;
                        case "string":
                            gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
                            break;
                        case "bytes":
                            gen("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)("return%j", invalid(field, "buffer"));
                            break;
                    }
                }
                return gen;
                /* eslint-enable no-unexpected-multiline */
            }

            /**
            * Generates a partial key verifier.
            * @param {Codegen} gen Codegen instance
            * @param {Field} field Reflected field
            * @param {string} ref Variable reference
            * @returns {Codegen} Codegen instance
            * @ignore
            */
            function genVerifyKey(gen, field, ref) {
                /* eslint-disable no-unexpected-multiline */
                switch (field.keyType) {
                    case "int32":
                    case "uint32":
                    case "sint32":
                    case "fixed32":
                    case "sfixed32":
                        gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
                        break;
                    case "int64":
                    case "uint64":
                    case "sint64":
                    case "fixed64":
                    case "sfixed64":
                        gen("if(!util.key64Re.test(%s))", ref) // see comment above: x is ok, d is not
                        ("return%j", invalid(field, "integer|Long key"));
                        break;
                    case "bool":
                        gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
                        break;
                }
                return gen;
                /* eslint-enable no-unexpected-multiline */
            }

            /**
            * Generates a verifier specific to the specified message type.
            * @param {Type} mtype Message type
            * @returns {Codegen} Codegen instance
            */
            function verifier(mtype) {
                /* eslint-disable no-unexpected-multiline */

                var gen = util.codegen(["m"], mtype.name + "$verify")("if(typeof m!==\"object\"||m===null)")("return%j", "object expected");
                var oneofs = mtype.oneofsArray,
                    seenFirstField = {};
                if (oneofs.length) gen("var p={}");

                for (var i = 0; i < /* initializes */mtype.fieldsArray.length; ++i) {
                    var field = mtype._fieldsArray[i].resolve(),
                        ref = "m" + util.safeProp(field.name);

                    if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name); // !== undefined && !== null

                    // map fields
                    if (field.map) {
                        gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
                        genVerifyKey(gen, field, "k[i]");
                        genVerifyValue(gen, field, i, ref + "[k[i]]")("}");

                        // repeated fields
                    } else if (field.repeated) {
                        gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
                        genVerifyValue(gen, field, i, ref + "[i]")("}");

                        // required or present fields
                    } else {
                        if (field.partOf) {
                            var oneofProp = util.safeProp(field.partOf.name);
                            if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
                            seenFirstField[field.partOf.name] = 1;
                            gen("p%s=1", oneofProp);
                        }
                        genVerifyValue(gen, field, i, ref);
                    }
                    if (field.optional) gen("}");
                }
                return gen("return null");
                /* eslint-enable no-unexpected-multiline */
            }
        }, { "15": 15, "37": 37 }], 41: [function (require, module, exports) {
            "use strict";

            /**
            * Wrappers for common types.
            * @type {Object.<string,IWrapper>}
            * @const
            */

            var wrappers = exports;

            var Message = require(21);

            /**
            * From object converter part of an {@link IWrapper}.
            * @typedef WrapperFromObjectConverter
            * @type {function}
            * @param {Object.<string,*>} object Plain object
            * @returns {Message<{}>} Message instance
            * @this Type
            */

            /**
            * To object converter part of an {@link IWrapper}.
            * @typedef WrapperToObjectConverter
            * @type {function}
            * @param {Message<{}>} message Message instance
            * @param {IConversionOptions} [options] Conversion options
            * @returns {Object.<string,*>} Plain object
            * @this Type
            */

            /**
            * Common type wrapper part of {@link wrappers}.
            * @interface IWrapper
            * @property {WrapperFromObjectConverter} [fromObject] From object converter
            * @property {WrapperToObjectConverter} [toObject] To object converter
            */

            // Custom wrapper for Any
            wrappers[".google.protobuf.Any"] = {

                fromObject: function fromObject(object) {

                    // unwrap value type if mapped
                    if (object && object["@type"]) {
                        var type = this.lookup(object["@type"]);
                        /* istanbul ignore else */
                        if (type) {
                            // type_url does not accept leading "."
                            var type_url = object["@type"].charAt(0) === "." ? object["@type"].substr(1) : object["@type"];
                            // type_url prefix is optional, but path seperator is required
                            return this.create({
                                type_url: "/" + type_url,
                                value: type.encode(type.fromObject(object)).finish()
                            });
                        }
                    }

                    return this.fromObject(object);
                },

                toObject: function toObject(message, options) {

                    // decode value if requested and unmapped
                    if (options && options.json && message.type_url && message.value) {
                        // Only use fully qualified type name after the last '/'
                        var name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
                        var type = this.lookup(name);
                        /* istanbul ignore else */
                        if (type) message = type.decode(message.value);
                    }

                    // wrap value if unmapped
                    if (!(message instanceof this.ctor) && message instanceof Message) {
                        var object = message.$type.toObject(message, options);
                        object["@type"] = message.$type.fullName;
                        return object;
                    }

                    return this.toObject(message, options);
                }
            };
        }, { "21": 21 }], 42: [function (require, module, exports) {
            "use strict";

            module.exports = Writer;

            var util = require(39);

            var BufferWriter; // cyclic

            var LongBits = util.LongBits,
                base64 = util.base64,
                utf8 = util.utf8;

            /**
            * Constructs a new writer operation instance.
            * @classdesc Scheduled writer operation.
            * @constructor
            * @param {function(*, Uint8Array, number)} fn Function to call
            * @param {number} len Value byte length
            * @param {*} val Value to write
            * @ignore
            */
            function Op(fn, len, val) {

                /**
                 * Function to call.
                 * @type {function(Uint8Array, number, *)}
                 */
                this.fn = fn;

                /**
                 * Value byte length.
                 * @type {number}
                 */
                this.len = len;

                /**
                 * Next operation.
                 * @type {Writer.Op|undefined}
                 */
                this.next = undefined;

                /**
                 * Value to write.
                 * @type {*}
                 */
                this.val = val; // type varies
            }

            /* istanbul ignore next */
            function noop() {} // eslint-disable-line no-empty-function

            /**
            * Constructs a new writer state instance.
            * @classdesc Copied writer state.
            * @memberof Writer
            * @constructor
            * @param {Writer} writer Writer to copy state from
            * @ignore
            */
            function State(writer) {

                /**
                 * Current head.
                 * @type {Writer.Op}
                 */
                this.head = writer.head;

                /**
                 * Current tail.
                 * @type {Writer.Op}
                 */
                this.tail = writer.tail;

                /**
                 * Current buffer length.
                 * @type {number}
                 */
                this.len = writer.len;

                /**
                 * Next state.
                 * @type {State|null}
                 */
                this.next = writer.states;
            }

            /**
            * Constructs a new writer instance.
            * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
            * @constructor
            */
            function Writer() {

                /**
                 * Current length.
                 * @type {number}
                 */
                this.len = 0;

                /**
                 * Operations head.
                 * @type {Object}
                 */
                this.head = new Op(noop, 0, 0);

                /**
                 * Operations tail
                 * @type {Object}
                 */
                this.tail = this.head;

                /**
                 * Linked forked states.
                 * @type {Object|null}
                 */
                this.states = null;

                // When a value is written, the writer calculates its byte length and puts it into a linked
                // list of operations to perform when finish() is called. This both allows us to allocate
                // buffers of the exact required size and reduces the amount of work we have to do compared
                // to first calculating over objects and then encoding over objects. In our case, the encoding
                // part is just a linked list walk calling operations with already prepared values.
            }

            /**
            * Creates a new writer.
            * @function
            * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
            */
            Writer.create = util.Buffer ? function create_buffer_setup() {
                return (Writer.create = function create_buffer() {
                    return new BufferWriter();
                })();
            }
            /* istanbul ignore next */
            : function create_array() {
                return new Writer();
            };

            /**
            * Allocates a buffer of the specified size.
            * @param {number} size Buffer size
            * @returns {Uint8Array} Buffer
            */
            Writer.alloc = function alloc(size) {
                return new util.Array(size);
            };

            // Use Uint8Array buffer pool in the browser, just like node does with buffers
            /* istanbul ignore else */
            if (util.Array !== Array) Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

            /**
            * Pushes a new operation to the queue.
            * @param {function(Uint8Array, number, *)} fn Function to call
            * @param {number} len Value byte length
            * @param {number} val Value to write
            * @returns {Writer} `this`
            * @private
            */
            Writer.prototype._push = function push(fn, len, val) {
                this.tail = this.tail.next = new Op(fn, len, val);
                this.len += len;
                return this;
            };

            function writeByte(val, buf, pos) {
                buf[pos] = val & 255;
            }

            function writeVarint32(val, buf, pos) {
                while (val > 127) {
                    buf[pos++] = val & 127 | 128;
                    val >>>= 7;
                }
                buf[pos] = val;
            }

            /**
            * Constructs a new varint writer operation instance.
            * @classdesc Scheduled varint writer operation.
            * @extends Op
            * @constructor
            * @param {number} len Value byte length
            * @param {number} val Value to write
            * @ignore
            */
            function VarintOp(len, val) {
                this.len = len;
                this.next = undefined;
                this.val = val;
            }

            VarintOp.prototype = Object.create(Op.prototype);
            VarintOp.prototype.fn = writeVarint32;

            /**
            * Writes an unsigned 32 bit value as a varint.
            * @param {number} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.uint32 = function write_uint32(value) {
                // here, the call to this.push has been inlined and a varint specific Op subclass is used.
                // uint32 is by far the most frequently used operation and benefits significantly from this.
                this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
                return this;
            };

            /**
            * Writes a signed 32 bit value as a varint.
            * @function
            * @param {number} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.int32 = function write_int32(value) {
                return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
                : this.uint32(value);
            };

            /**
            * Writes a 32 bit value as a varint, zig-zag encoded.
            * @param {number} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.sint32 = function write_sint32(value) {
                return this.uint32((value << 1 ^ value >> 31) >>> 0);
            };

            function writeVarint64(val, buf, pos) {
                while (val.hi) {
                    buf[pos++] = val.lo & 127 | 128;
                    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
                    val.hi >>>= 7;
                }
                while (val.lo > 127) {
                    buf[pos++] = val.lo & 127 | 128;
                    val.lo = val.lo >>> 7;
                }
                buf[pos++] = val.lo;
            }

            /**
            * Writes an unsigned 64 bit value as a varint.
            * @param {Long|number|string} value Value to write
            * @returns {Writer} `this`
            * @throws {TypeError} If `value` is a string and no long library is present.
            */
            Writer.prototype.uint64 = function write_uint64(value) {
                var bits = LongBits.from(value);
                return this._push(writeVarint64, bits.length(), bits);
            };

            /**
            * Writes a signed 64 bit value as a varint.
            * @function
            * @param {Long|number|string} value Value to write
            * @returns {Writer} `this`
            * @throws {TypeError} If `value` is a string and no long library is present.
            */
            Writer.prototype.int64 = Writer.prototype.uint64;

            /**
            * Writes a signed 64 bit value as a varint, zig-zag encoded.
            * @param {Long|number|string} value Value to write
            * @returns {Writer} `this`
            * @throws {TypeError} If `value` is a string and no long library is present.
            */
            Writer.prototype.sint64 = function write_sint64(value) {
                var bits = LongBits.from(value).zzEncode();
                return this._push(writeVarint64, bits.length(), bits);
            };

            /**
            * Writes a boolish value as a varint.
            * @param {boolean} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.bool = function write_bool(value) {
                return this._push(writeByte, 1, value ? 1 : 0);
            };

            function writeFixed32(val, buf, pos) {
                buf[pos] = val & 255;
                buf[pos + 1] = val >>> 8 & 255;
                buf[pos + 2] = val >>> 16 & 255;
                buf[pos + 3] = val >>> 24;
            }

            /**
            * Writes an unsigned 32 bit value as fixed 32 bits.
            * @param {number} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.fixed32 = function write_fixed32(value) {
                return this._push(writeFixed32, 4, value >>> 0);
            };

            /**
            * Writes a signed 32 bit value as fixed 32 bits.
            * @function
            * @param {number} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.sfixed32 = Writer.prototype.fixed32;

            /**
            * Writes an unsigned 64 bit value as fixed 64 bits.
            * @param {Long|number|string} value Value to write
            * @returns {Writer} `this`
            * @throws {TypeError} If `value` is a string and no long library is present.
            */
            Writer.prototype.fixed64 = function write_fixed64(value) {
                var bits = LongBits.from(value);
                return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
            };

            /**
            * Writes a signed 64 bit value as fixed 64 bits.
            * @function
            * @param {Long|number|string} value Value to write
            * @returns {Writer} `this`
            * @throws {TypeError} If `value` is a string and no long library is present.
            */
            Writer.prototype.sfixed64 = Writer.prototype.fixed64;

            /**
            * Writes a float (32 bit).
            * @function
            * @param {number} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.float = function write_float(value) {
                return this._push(util.float.writeFloatLE, 4, value);
            };

            /**
            * Writes a double (64 bit float).
            * @function
            * @param {number} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.double = function write_double(value) {
                return this._push(util.float.writeDoubleLE, 8, value);
            };

            var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
                buf.set(val, pos); // also works for plain array values
            }
            /* istanbul ignore next */
            : function writeBytes_for(val, buf, pos) {
                for (var i = 0; i < val.length; ++i) {
                    buf[pos + i] = val[i];
                }
            };

            /**
            * Writes a sequence of bytes.
            * @param {Uint8Array|string} value Buffer or base64 encoded string to write
            * @returns {Writer} `this`
            */
            Writer.prototype.bytes = function write_bytes(value) {
                var len = value.length >>> 0;
                if (!len) return this._push(writeByte, 1, 0);
                if (util.isString(value)) {
                    var buf = Writer.alloc(len = base64.length(value));
                    base64.decode(value, buf, 0);
                    value = buf;
                }
                return this.uint32(len)._push(writeBytes, len, value);
            };

            /**
            * Writes a string.
            * @param {string} value Value to write
            * @returns {Writer} `this`
            */
            Writer.prototype.string = function write_string(value) {
                var len = utf8.length(value);
                return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
            };

            /**
            * Forks this writer's state by pushing it to a stack.
            * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
            * @returns {Writer} `this`
            */
            Writer.prototype.fork = function fork() {
                this.states = new State(this);
                this.head = this.tail = new Op(noop, 0, 0);
                this.len = 0;
                return this;
            };

            /**
            * Resets this instance to the last state.
            * @returns {Writer} `this`
            */
            Writer.prototype.reset = function reset() {
                if (this.states) {
                    this.head = this.states.head;
                    this.tail = this.states.tail;
                    this.len = this.states.len;
                    this.states = this.states.next;
                } else {
                    this.head = this.tail = new Op(noop, 0, 0);
                    this.len = 0;
                }
                return this;
            };

            /**
            * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
            * @returns {Writer} `this`
            */
            Writer.prototype.ldelim = function ldelim() {
                var head = this.head,
                    tail = this.tail,
                    len = this.len;
                this.reset().uint32(len);
                if (len) {
                    this.tail.next = head.next; // skip noop
                    this.tail = tail;
                    this.len += len;
                }
                return this;
            };

            /**
            * Finishes the write operation.
            * @returns {Uint8Array} Finished buffer
            */
            Writer.prototype.finish = function finish() {
                var head = this.head.next,
                    // skip noop
                buf = this.constructor.alloc(this.len),
                    pos = 0;
                while (head) {
                    head.fn(head.val, buf, pos);
                    pos += head.len;
                    head = head.next;
                }
                // this.head = this.tail = null;
                return buf;
            };

            Writer._configure = function (BufferWriter_) {
                BufferWriter = BufferWriter_;
            };
        }, { "39": 39 }], 43: [function (require, module, exports) {
            "use strict";

            module.exports = BufferWriter;

            // extends Writer
            var Writer = require(42);
            (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

            var util = require(39);

            var Buffer = util.Buffer;

            /**
            * Constructs a new buffer writer instance.
            * @classdesc Wire format writer using node buffers.
            * @extends Writer
            * @constructor
            */
            function BufferWriter() {
                Writer.call(this);
            }

            /**
            * Allocates a buffer of the specified size.
            * @param {number} size Buffer size
            * @returns {Buffer} Buffer
            */
            BufferWriter.alloc = function alloc_buffer(size) {
                return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
            };

            var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
                buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                // also works for plain array values
            }
            /* istanbul ignore next */
            : function writeBytesBuffer_copy(val, buf, pos) {
                if (val.copy) // Buffer values
                    val.copy(buf, pos, 0, val.length);else for (var i = 0; i < val.length;) {
                    // plain array values
                    buf[pos++] = val[i++];
                }
            };

            /**
            * @override
            */
            BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
                if (util.isString(value)) value = util._Buffer_from(value, "base64");
                var len = value.length >>> 0;
                this.uint32(len);
                if (len) this._push(writeBytesBuffer, len, value);
                return this;
            };

            function writeStringBuffer(val, buf, pos) {
                if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
                    util.utf8.write(val, buf, pos);else buf.utf8Write(val, pos);
            }

            /**
            * @override
            */
            BufferWriter.prototype.string = function write_string_buffer(value) {
                var len = Buffer.byteLength(value);
                this.uint32(len);
                if (len) this._push(writeStringBuffer, len, value);
                return this;
            };

            /**
            * Finishes the write operation.
            * @name BufferWriter#finish
            * @function
            * @returns {Buffer} Finished buffer
            */
        }, { "39": 39, "42": 42 }] }, {}, [19]);
})();
//# sourceMappingURL=protobuf.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(52)(module)))

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.netstatus = netstatus;
/**
 * 通过向页面中添加图片来判断网络状况
 */
var url = 'https://static.hnyequ.cn/h5/js/pbmsg/connect.png';
var img = new Image();
img.id = 'testImg';
img.style.display = 'none';
document.body.appendChild(img);

// 通过每次更改页面中图片路径，根据图片的onload和onerror事件判断网络状况
function netstatus() {
  var timeStamp = Date.parse(new Date());
  var imsg = document.getElementById('testImg');
  imsg.setAttribute('src', url + '?timestamp=' + timeStamp);
  return new Promise(function (resolve, reject) {
    imsg.onload = function () {
      resolve(true);
    };
    imsg.onerror = function () {
      resolve(false);
    };
  });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logMsg = logMsg;
function logMsg(debug, msg, type) {
  if (!debug) {
    return;
  }
  var color = '';
  switch (type) {
    case 'error':
      // 异常
      color = '#f03933';
      break;
    case 'warn':
      // 警告
      color = '#ff8100';
      break;
    case 'info':
      // 普通系统消息
      color = 'blue';
      break;
    case 'normal':
      // 房间相关消息
      color = '#03c713';
      break;
    case 'low':
      // 其它消息
      color = '#737375';
      break;
    case 'cur':
      //
      color = '#a002f3';
      break;
    default:
      break;
  }
  console.log('%c ---sdk log :' + msg + '--- ', 'color:' + color + ';background:#e1eaff');
}

/***/ })
/******/ ]);
});