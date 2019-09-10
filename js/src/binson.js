import jsbi from './../lib/jsbi.mjs';

// Dependencies added for compatibility with Node.js older than 11.0.0
// To be removed once Node.js 12.0.0 becomes LTS
let {TextEncoder} = typeof module !== 'undefined' && module.exports ? require('util') : {TextEncoder : self.TextEncoder};
let {TextDecoder} = typeof module !== 'undefined' && module.exports ? require('util') : {TextDecoder: self.TextDecoder};

// ======== Header =========
// Binson implementation in JavaScript.
// Authors: Frans Lundberg & Felix Grape
//
// 2016-06-29. 	Status: Complete.
//				Supports types: string, bytes, object, boolean, integer, double, array.
//
//				Does not fully support 64-bit integers due to JavaScript limitations.
//				Can parse positive integers smaller than 2^53-1
//
//
//
// ======== Functions ========
//
// Functions starting with "_" are "private". Subject to change often, meant
// for internal use only.
//

const MAX_SAFE_INTEGER_BIGINT = jsbi.BigInt(Number.MAX_SAFE_INTEGER);

// ======== Binson object ========
export default function Binson() {
	if (!(this instanceof Binson)) {
		return new Binson()
	}

	this._fields = {}

}

Binson.prototype._put = function(type, name, value) {
	this._fields[name] = {type:type, value:value}
	return this
}
// value = {type: <binson type>, value: <value>}
// value.type, value.value.
Binson.prototype._valueToBytes = function(bytes, offset, value) {
	switch (value.type) {
		case 'string':
			offset = this._stringToBytes(bytes, offset, value.value)
			break
		case 'bytes':
			offset = this._bytesToBytes(bytes, offset, value.value)
			break
		case 'object':
			offset = this._objectToBytes(bytes, offset, value.value)
			break
		case 'boolean':
			offset = this._booleanToBytes(bytes, offset, value.value)
			break
		case 'integer':
			offset = this._integerToBytes(bytes, offset, value.value)
			break
		case 'bigInt':
			offset = this._bigIntToBytes(bytes, offset, value.value)
			break
		case 'double':
			offset = this._doubleToBytes(bytes, offset, value.value)
			break
		case 'array':
			offset = this._arrayToBytes(bytes, offset, value.value)
			break
	}
	return offset
}

Binson.prototype._arrayToBytes = function(bytes, offset, array) {
	bytes.setUint8(offset, 0x42)
	offset += 1
	let elem
	for (let i = 0; i < array.length; i++){
		elem = array[i]
		let binsonType = this._binsonTypeOf(elem)
		switch(binsonType) {
			case 'array':
				offset = this._arrayToBytes(bytes, offset, elem)
				break
			case 'boolean':
				offset = this._booleanToBytes(bytes, offset, elem)
				break
			case 'bytes':
				offset = this._bytesToBytes(bytes, offset, elem)
				break
			case 'double':
				offset = this._doubleToBytes(bytes, offset, elem)
				break
			case 'integer':
				offset = this._integerToBytes(bytes, offset, elem)
				break
			case 'bigInt':
				offset = this._bigIntToBytes(bytes, offset, elem)
				break
			case 'object':
				offset = this._objectToBytes(bytes, offset, elem)
				break
			case 'string':
				offset = this._stringToBytes(bytes, offset, elem)
				break
		}
	}
	bytes.setUint8(offset, 0x43)
	offset += 1
	return offset
}

Binson.prototype._doubleToBytes = function(bytes, offset, double) {
	bytes.setUint8(offset, 0x46)
	offset += 1
	bytes.setFloat64(offset, double, true)
	offset += 8
	return offset
}

Binson.prototype._integerToBytes = function(bytes, offset, value) {
	// ToDo
	return this._bigIntToBytes(bytes, offset, jsbi.BigInt(value))
}

Binson.prototype._bigIntToBytes = function(bytes, offset, value) {
	let size = this._bigIntSize(value)
	if (size == 1) {
		bytes.setUint8(offset, 0x10)
	} else if (size == 2) {
		bytes.setUint8(offset, 0x11)
	} else if (size == 4) {
		bytes.setUint8(offset, 0x12)
	} else if (size == 8) {
		bytes.setUint8(offset, 0x13)
	} else {
		throw new Error('this._integerSize returned bad bytesize: ' + size)
	}
	offset += 1
	for (let i = 0; i < size; i++) {
		let byte = value & 0xFF
		bytes.setUint8(offset, byte)
		offset += 1
		value = jsbi.signedRightShift(value, jsbi.BigInt(8))
	}

	return offset
}

Binson.prototype._booleanToBytes = function(bytes, offset, bool) {
	if (bool) {
		bytes.setUint8(offset, 0x44)
		offset += 1
	} else {
		bytes.setUint8(offset, 0x45)
		offset += 1
	}
	return offset
}

Binson.prototype._objectToBytes = function(bytes, offset, obj) {
	if (bytes.byteLength < 2) {
		throw new Error('too few bytes left to parse object (_objectToBytes), '
			+ bytes.byteLength + ', offset:' + offset)
	}
	bytes.setUint8(offset, 0x40)
	offset += 1
	// Field names must be lexicographically sorted
	let fieldNames = Object.keys(obj._fields).sort()
	for (let i = 0; i < fieldNames.length; i++) {
		let fieldName = fieldNames[i]
		let field = obj._fields[fieldName]
		offset = obj._stringToBytes(bytes, offset, fieldName)
		offset = obj._valueToBytes(bytes, offset, field)
	}
	bytes.setUint8(offset, 0x41)
	offset += 1
	return offset
}

Binson.prototype._stringToBytes = function(bytes, offset, string) {
	let encoder = new TextEncoder('UTF-8')
	let utf8 = encoder.encode(string)
	let len = utf8.length
	offset = this._stringLenToBytes(bytes, offset, len)
	for (let i = 0; i < len; i++) {
		bytes.setUint8(offset, utf8[i])
		offset += 1
	}
	return offset
}

Binson.prototype._bytesToBytes = function(bytes, offset, value) {
	if (!(value instanceof ArrayBuffer)) {
		throw new Error('expected ArrayBuffer: ' + value)
	}
	let u8 = new Uint8Array(value)
	offset = this._bytesLenToBytes(bytes, offset, value.byteLength)
	for (let i = 0; i < value.byteLength; i++) {
		bytes.setUint8(offset, u8[i])
		offset += 1
	}
	return offset
}

Binson.prototype._bytesLenToBytes = function(bytes, offset, len) {
	if (len <= 127) {
		bytes.setUint8(offset, 0x18)
		offset += 1
		bytes.setUint8(offset, len)
		offset += 1
	} else if (len <= 32767) {
		bytes.setUint8(offset, 0x19)
		offset += 1
		bytes.setUint16(offset, len, true)
		offset += 2
	} else {
		bytes.setUint8(offset, 0x1a)
		offset += 1
		bytes.setUint32(offset, len, true)
		offset += 4
	}
	return offset
}

Binson.prototype._stringLenToBytes = function(bytes, offset, len) {
	if (len <= 127) {
		bytes.setUint8(offset, 0x14)
		offset += 1
		bytes.setUint8(offset, len)
		offset += 1
	} else if (len <= 32767) {
		bytes.setUint8(offset, 0x15)
		offset += 1
		bytes.setUint16(offset, len, true)
		offset += 2
	} else {
		bytes.setUint8(offset, 0x16)
		offset += 1
		bytes.setUint32(offset, len, true)
		offset += 4
	}
	return offset
}

Binson.prototype._objectSize = function(obj) {
	let fieldNames = Object.keys(obj._fields)
	let size = 0
	size += 1
	for (let i = 0; i < fieldNames.length; i++) {
		let fieldName = fieldNames[i]
		let value = obj._fields[fieldName]
		size += obj._stringSize(fieldName)
		size += obj._valueSize(value)
	}
	size += 1
	return size
}

Binson.prototype._arraySize = function(array) {
	let size = 2 // Start & end bytes
	for (let i = 0; i < array.length; i++) {
		let elem = array[i]
		let binsonType = this._binsonTypeOf(elem)
		switch(binsonType) {
			case 'array':
				size += this._arraySize(elem)
				break
			case 'boolean':
				size += 1
				break
			case 'bytes':
				size += this._bytesSize(elem)
				break
			case 'double':
				size += 1 + 8
				break
			case 'integer':
				size += 1 + this._integerSize(elem)
				break
			case 'bigInt':
				size += 1 + this._bigIntSize(elem)
				break
			case 'object':
				size += this._objectSize(elem)
				break
			case 'string':
				size += this._stringSize(elem)
				break
		}
	}
	return size
}

// ABNF: string = stringLen utf
Binson.prototype._stringSize = function(string) {
	let encoder = new TextEncoder('UTF-8')
	let utf8Size = encoder.encode(string).length
	let size = 1 + this._integerSize(utf8Size) + utf8Size
	return size
}

// bytes instanceof ArrayBuffer
Binson.prototype._bytesSize = function(bytes) {
	let len = bytes.byteLength
	// Bytes hex id + length integer + bytes
	return 1 + this._integerSize(len) + len
}

Binson.prototype._bigIntSize = function(int) {
	return this._integerSize(jsbi.toNumber(int))
}

Binson.prototype._integerSize = function(int) {
	let size = 8
	if (int >= -2147483648 && int <= 2147483647) {
		size = 4
	}
	if (int >= -32768 && int <= 32767) {
		size = 2
	}
	if (int >= -128 && int <= 127) {
		size = 1
	}
	return size
}

Binson.prototype._bigIntSize = function(bigInt) {
	return this._integerSize(jsbi.toNumber(bigInt))
}

// value.type
// value.value
Binson.prototype._valueSize = function(value) {
	let size = 0
	switch (value.type) {
		case 'string':
			size += this._stringSize(value.value)
			break
		case 'bytes':
			size += this._bytesSize(value.value)
			break
		case 'object':
			size += this._objectSize(value.value)
			break
		case 'boolean':
			size += 1
			break
		case 'integer':
			size += 1 + this._integerSize(value.value) // int hex id + int8/16/32/64 size
			break
		case 'bigInt':
			size += 1 + this._bigIntSize(value.value) // int hex id + int8/16/32/64 size
			break
		case 'double':
			size += 1 + 8					// double hex id + size of 64-bit float
			break
		case 'array':
			size += this._arraySize(value.value)
			break
	}
	return size
}

// ToDo clean upp comment
// We don't handle 64-bit integers at this moment
// Integers that don't fit into 32-bit raises an error
Binson.prototype._ensureIntegerPrecision = function(integer) {
	if (this._integerSize(integer) > 4) {
		if (integer <= Number.MAX_SAFE_INTEGER && integer > 0) {

			return
		} else {
			throw new Error('specified integer does not fit in 32 bits.\n\t' +
					'Integer: ' + integer)
		}
	}
}

// Returns the binson type of a variable
Binson.prototype._binsonTypeOf = function(v) {
	let type = typeof v
	switch (type) {
			case 'boolean':
				return 'boolean'
			case 'number': ///ToDo
				if (Number.isInteger(v)) {
					this._ensureIntegerPrecision(v)
					return 'integer'
				} else {
					return 'double'
				}
			case 'string':
				return 'string'
			case 'object':
				if (Array.isArray(v)) {
					return 'array'
				}
				if (v instanceof ArrayBuffer) {
					return 'bytes'
				}
				if (v instanceof Binson) {
					return 'object'
				}
				if (v instanceof jsbi.BigInt) {
					return 'integer'
				}
				if (v == null) {
					throw new Error('Binson does not allow null')
				}
			default:
				throw new Error('A variable must be a boolean, number (integer or float), string, ' +
					'instance of an ArrayBuffer, array, Binson object.\n\t' +
					'Type: ' + type)
		}
}


Binson.prototype._binsonTypeCheckArray = function(name, array) {
	for (let i = 0; i < array.length; i++) {
		try {
			this._binsonTypeOf(array[i])
			if (Array.isArray(array[i])) {
				this._binsonTypeCheckArray('!!Nested!!', array[i])
			}
		} catch (err) {
			throw new Error('Invalid array element: \n\t' +
				'Position: ' + i + '\n\t' +
				'Name: "' + name + '"\n\t' +
				'Element: ' + array[i] + '\n\n\t' +
				err)
		}
	}
}


// Returns value given its name
Binson.prototype.get = function get(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else {
		return f.value
	}
}

Binson.prototype.has = function has(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return false
	} else {
		return true
	}
}


	// STRING
Binson.prototype.putString = function putString(name, value) {
	if (!(typeof(value) === 'string')) {
		throw new Error('putString expected string')
	}
	this._put('string', name, value)
	return this
}

Binson.prototype.getString = function getString(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else if (f.type !== 'string') {
		return undefined
	}
	return f.value
}

Binson.prototype.hasString = function hasString(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return false
	} else if (f.type !== 'string') {
		return false
	}
	return true
}




// BYTES
// ArrayBuffer value.
Binson.prototype.putBytes = function putBytes(name, value) {
	if (!(value instanceof ArrayBuffer)) {
		throw new Error('putBytes expected ArrayBuffer')
	}
	this._put('bytes', name, value)
	return this
}

Binson.prototype.getBytes = function getBytes(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else if (f.type !== 'bytes') {
		return undefined
	}
	return f.value
}

Binson.prototype.hasBytes = function hasBytes(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return false
	} else if (f.type !== 'bytes') {
		return false
	}
	return true
}




// BINSON OBJECT
Binson.prototype.putObject = function putObject(name, value) {
	if (!(value instanceof Binson)) {
		throw new Error('putObject expected a Binson object')
	}
	this._put('object', name, value)
	return this
}

Binson.prototype.getObject = function getObject(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else if (f.type !== 'object') {
		return undefined
	}
	return f.value
}

Binson.prototype.hasObject = function hasObject(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return false
	} else if (f.type !== 'object') {
	return false
	}
	return true
}




	// BOOLEAN
Binson.prototype.putBoolean = function putBoolean(name, value) {
	if (!(typeof(value) === 'boolean')) {
		throw new Error('putBoolean expected a boolean')
	}
	this._put('boolean', name, value)
	return this
}

Binson.prototype.getBoolean = function getBoolean(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else if (f.type !== 'boolean') {
		return undefined
	}
	return f.value
}

Binson.prototype.hasBoolean = function hasBoolean(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return false
	} else if (f.type !== 'boolean') {
		return false
	}
	return true
}




// INTEGER
// All numbers are 64-bit floats.
// binson.js can only handle 32-bit integers
Binson.prototype.putInteger = function putInteger(name, value) {
	if (! Number.isInteger(value)) {
		throw new Error('putInteger expected an integer')
	}
	this._ensureIntegerPrecision(value)
	return this._put('integer', name, value);
}

Binson.prototype.getInteger = function getInteger(name) {
	return jsbi.toNumber(this.getBigInt(name));
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else if (f.type === 'integer') {
		this._ensureIntegerPrecision(value) // ToDo Is check needed?
		return f.value
	}
	else if (f.type === 'bigInt') {
		const intNumber = jsbi.BigInt.toNumber()
		this._ensureIntegerPrecision(intNumber)
		return intNumber
	}
	return undefined

}

Binson.prototype.hasInteger = function hasInteger(name) {
	return this.hasBigInt(name)
}




// BIG INTEGER
Binson.prototype.putBigInt = function putBigInt(name, value) {
	if (! value instanceof jsbi.BigInt) {
		throw new Error('putBigInt expected an jsbi.BigInt')
	}
	// ToDo Add check. Not bigger thn 64bit
	this._put('bigInt', name, value)
	return this
}

Binson.prototype.getBigInt = function getBigInt(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else if (f.type === 'integer') {
		return jsbi.BigInt(f.value);
	}
	else if (f.type === 'bigInt') {
		return f.value
	}
	return undefined
}

Binson.prototype.hasBigInt = function hasBigInt(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return false
	} else if (f.type === 'integer') {
		return true
	} else if (f.type === 'bigInt') {
		return true
	}
	return false
}




// DOUBLE
Binson.prototype.putDouble = function putDouble(name, value) {
	if (!(typeof(value) === 'number')) {
		throw new Error('putDouble expected a number')
	}
	this._put('double', name, value)
	return this
}

Binson.prototype.getDouble = function getDouble(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else if (f.type !== 'double') {
		return undefined
	}
	return f.value
}

Binson.prototype.hasDouble = function hasDouble(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return false
	} else if (f.type !== 'double') {
		return false
	}
	return true
}




// ARRAY
Binson.prototype.putArray = function putArray(name, value) {
	if (!(Array.isArray(value))) {
		throw new Error('putArray expected an array')
	}
	this._binsonTypeCheckArray(name, value)
	this._put('array', name, value)
	return this
}

Binson.prototype.getArray = function getArray(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return undefined
	} else if (f.type !== 'array') {
		return undefined
	}
	return f.value
}

Binson.prototype.hasArray = function hasArray(name) {
	let f = this._fields[name]
	if (f === undefined) {
		return false
	} else if (f.type !== 'array') {
		return false
	}
	return true
}


/**
 * Returns Binson bytes, ArrayBuffer.
 */
Binson.prototype.toBytes = function toBytes() {
	let size = this.byteSize()

	if (isNaN(size) || size < 2) {
		throw new Error('bad size: ' + size)
	}

	let bytes = new DataView(new ArrayBuffer(size))
	let offset = 0
	let fieldNames = Object.keys(this._fields)

	if (bytes.byteLength != size) {
		throw new Error('bytes has unexpected length.\n\t' +
				'Bytes.byteLength: ' + bytes.byteLength + '\n\t' +
				'this.byteSize(): ' + size)
	}

	offset = this._objectToBytes(bytes, offset, this)

	return bytes.buffer
}

	/**
	 * Size of bytes of resulting Binson bytes.
	 */
Binson.prototype.byteSize = function byteSize() {
	let fieldNames = Object.keys(this._fields)
	let size = 1

	for (let i = 0; i < fieldNames.length; i++) {
		let fieldName = fieldNames[i]
		let value = this._fields[fieldName]
		size += this._stringSize(fieldName)
		size += this._valueSize(value)
	}

	size += 1

	if (isNaN(size)) {
		throw new Error('size is NaN')
	}

	if (size < 2) {
		throw new Error('bad computed size, ' + size)
	}

	return size
}


// Returns the bytes of the binson object as a string
Binson.prototype.hex = function hex(){
	let buffer = this.toBytes()
	let uints = new Uint8Array(buffer)
	let res = '['
	for (let i = 0; i < uints.length-1; i++) {
		if (uints[i] < 16) { // 16 = 0x10
			res += '0x0' + uints[i].toString(16).toLowerCase()
		} else {
			res += '0x' + uints[i].toString(16).toLowerCase()
		}
		res += ', '
	}
	// Always 0x41, we don't need the if-statement or toLowerCase
	res += '0x' + uints[uints.length-1].toString(16)
	res += ']'
	return res
}

Binson.prototype.toBinsonString = function toBinsonString(indent = 0) {
	indent = indent < 0 ? 0 : indent

	let fieldNames = Object.keys(this._fields).sort()
	let indentation = ''
	for(let i = 0; i < indent; i++) {
		indentation += '  '
	}
	let str = '{ \n'
	let first = true
	for (let i = 0; i < fieldNames.length; i++) {
		let fieldName = fieldNames[i]
		let val = this._fields[fieldName]

		if (first) {
			first = false
		} else {
			str += ', \n'
		}
		str += indentation + '  '
		str += fieldName
		str += ' := '

		str += valueToBinsonString(val.value, indent + 1)
	}
	str += '\n'
	str += indentation + '}'
	return str
}

function valueToBinsonString(value, indent) {
	let str = ''
	if (typeof value === 'string') {
		str += '"' + value + '"'
	} else if (value instanceof ArrayBuffer) {
		str += '0x' + ab2str(value)
	} else if (value instanceof Binson) {
		str += value.toBinsonString(indent)
	} else if (typeof value === 'boolean') {
		str += value ? 'true' : 'false'
	} else if (Number.isInteger(value)) {
		str += value
	} else if (typeof value === 'number') {
		str += value
	} else if (Array.isArray(value)) {
		str += arrayToBinsonString(value, indent)
	}
	return str
}

function arrayToBinsonString(arr, indent) {
	let indentation = ''
	for(let i = 0; i < indent; i++) {
		indentation += '  '
	}

	let str = '[\n'
	for (let i = 0; i < arr.length-1; i++) {
		str += indentation + '  '
		str += valueToBinsonString(arr[i], indent + 1)
		str += ', \n'
	}
	str += indentation + '  '
	str += valueToBinsonString(arr[arr.length-1], indent + 1)
	str += '\n'
	str += indentation + ']'
	return str
}

Binson.prototype.toJson = function toJson(indent = 0) {
	indent = indent < 0 ? 0 : indent

	let fieldNames = Object.keys(this._fields).sort()
	let indentation = ''
	for(let i = 0; i < indent; i++) {
		indentation += '  '
	}
	let str = '{ \n'
	let first = true
	for (let i = 0; i < fieldNames.length; i++) {
		let fieldName = fieldNames[i]
		let val = this._fields[fieldName]

		if (first) {
			first = false
		} else {
			str += ', \n'
		}
		str += indentation + '  '
		str += '"' + fieldName + '"'
		str += ' : '

		str += valueToJson(val.value, indent + 1)
	}
	str += '\n'
	str += indentation + '}'
	return str
}

function valueToJson(value, indent) {
	let str = ''
	if (typeof value === 'string') {
		str += '"' + escapeSpecialChars(value) + '"'
	} else if (value instanceof ArrayBuffer) {
		str += '"0x' + ab2str(value) + '"'
	} else if (value instanceof Binson) {
		str += value.toJson(indent)
	} else if (typeof value === 'boolean') {
		str += value ? 'true' : 'false'
	} else if (typeof value === 'number') {
		str += value
	} else if (Array.isArray(value)) {
		str += arrayToJson(value, indent)
	}
	return str
}

function arrayToJson(arr, indent) {
	let indentation = ''
	for(let i = 0; i < indent; i++) {
		indentation += '  '
	}

	let str = '[\n'
	for (let i = 0; i < arr.length-1; i++) {
		str += indentation + '  '
		str += valueToJson(arr[i], indent + 1)
		str += ', \n'
	}
	str += indentation + '  '
	str += valueToJson(arr[arr.length-1], indent + 1)
	str += '\n'
	str += indentation + ']'
	return str
}

function escapeSpecialChars(str) {
    return str
        .replace(/[\\]/g, '\\\\')
        .replace(/[\"]/g, '\\\"')
        .replace(/[\/]/g, '\\/')
        .replace(/[\b]/g, '\\b')
        .replace(/[\f]/g, '\\f')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r')
        .replace(/[\t]/g, '\\t');
}

function ab2str(ab) {
	return Array.prototype.map.call(new Uint8Array(ab),
    		x => ('00' + x.toString(16)).slice(-2)).join('');
}


Binson.prototype.equals = function equals(bin) {
	if (!(bin instanceof Binson)) {
		return false
	}
	let me = ab2str(this.toBytes())
	let other = ab2str(bin.toBytes())

	return me === other
}

// buffer = ArrayBuffer, the bytes to parse.
// offset = the offset to start parsing from, default = 0.
Binson.fromBytes = function fromBytes(buffer, offset = 0) {
	return parse(buffer, offset)
}

//
// ======== BinsonParser object ========
//
// Used internally. Used by Binson object to parse.
//

function parse(buffer, offset) {
	if (!(buffer instanceof ArrayBuffer)) {
		throw new TypeError('Can only parse ArrayBuffer')
	}
	if (buffer.byteLength < 2) {
		throw new RangeError('Buffer must be at least 2 bytes long')
	}
	let view = new DataView(buffer)
	return parseObject()

	// Internal method to parse a Binson object.
	function parseObject() {
		let result = new Binson()
		let b = view.getUint8(offset)
		offset += 1
		if (b != 0x40) {
			let prefix = '0x'
			if (b < 16) {
				prefix += '0'
			}
			throw new Error('bad first byte in object, ' + prefix + b.toString(16) + ' expected 0x40')
		}
		let name, value
		let prevName = ''
		while (true) {
			b = view.getUint8(offset)
			if (b == 0x41) {
				offset += 1
				break
			}
			let fieldOffset = offset
			name = parseString(buffer, offset, view)
			value = parseValue(buffer, offset, view)

			if (name < prevName) {
				throw new Error('Bad format. \n\t' +
					'Fields not in lexicographical order when parsing. \n\t\t' +
						'Previous field: ' + prevName + '\n\t\t' +
						'Current field: ' + name)
			}
			if (!(typeof(result._fields[name]) == 'undefined' )) {
				let str = parsedtoByteString()
				throw new Error('Bad format. \n\t' +
					'Found two fields with the same name when parsing. \n\t\t' +
						'Duplicate field name at: ' + fieldOffset + '\n\t\t' +
						'Field name: "' + name + '"\n\t\t' +
						'1st value: ' + result._fields[name].value + '\n\t\t' +
						'2nd value: ' + value.value + '\n\t\t' +
						'Bytes: ' + str)
			}
			prevName = name

			result._put(value.type, name, value.value)
		}

		return result
	}

	function parseString() {
		let b = view.getUint8(offset)
		offset += 1
		let len

		switch (b) {
		case 0x14:
			len = view.getInt8(offset, true)
			offset += 1
			break
		case 0x15:
			len = view.getInt16(offset, true)
			offset += 2
			break
		case 0x16:
			len = view.getInt32(offset, true)
			offset += 4
			break
		default:
			let prefix = '0x'
			if (b < 16) {
				prefix += '0'
			}
			throw new Error('bad byte, expected stringLen, got byte ' + prefix + b.toString(16))
			break
		}

		let decoder = new TextDecoder('UTF-8')
		let stringBytes = new DataView(buffer, offset, len)
		let string = decoder.decode(stringBytes)
		offset += len

		return string
	}

	function parseBytes() {
		let b = view.getUint8(offset)
		let len

		offset += 1

		switch (b) {
		case 0x18:
			len = view.getInt8(offset)
			offset += 1
			break
		case 0x19:
			len = view.getInt16(offset, true)
			offset += 2
			break
		case 0x1a:
			len = view.getInt32(offset, true)
			offset += 4
			break
		default:
			let prefix = '0x'
			if (b < 16) {
				prefix += '0'
			}
			throw new Error('unexpected byte, ' + prefix + b.toString(16))
			break
		}

		if (len < 0) {
			throw new Error('len negative, not allowed, bad format, 0x' + b.toString(16) + ', ' + len)
		}
		let buffer= new ArrayBuffer(len)
		let bytes = new Uint8Array(buffer)
		for (let i = 0; i < bytes.length; i++) {
			bytes[i] = view.getUint8(offset)
			offset += 1
		}

		return buffer
	}

	function parseInteger() {
		let b = view.getUint8(offset)
		offset += 1

		let result

		switch(b) {
			case 0x10:
				result = innerParseBigInt(1)
				offset += 1
				break

			case 0x11:
				result = innerParseBigInt(2)
				offset += 2
				break

			case 0x12:
				result = innerParseBigInt(4)
				offset += 4
				break

			case 0x13:
				result = innerParseBigInt(8)
				offset += 8
				break

			default:
				let prefix = '0x'
				if (b < 16) {
					prefix += '0'
				}
				throw new Error('unexpected start byte when parsing integer: ' + prefix + b.toString(16))
				break
		}

		if (jsbi.lessThanOrEqual(result, MAX_SAFE_INTEGER_BIGINT)) {
			result = jsbi.toNumber(result)
		}

		return result
	}

	function innerParseBigInt(size) {
		let res = jsbi.BigInt(0)
		let multiplier = jsbi.BigInt(1)
		const BYTE_SIZE = jsbi.BigInt(256)
		for (let i = 0; i < size ; i++) {
			let byte = view.getUint8(offset + i )
			let delta = jsbi.multiply(jsbi.BigInt(byte), multiplier)
			res = jsbi.add(res, delta)
			multiplier = jsbi.multiply(multiplier, BYTE_SIZE)
			if ((i===size-1)&&(byte & 0x80 )){
				res = jsbi.subtract(res, multiplier)
			}
		}

		return res
	}

	function parseDouble() {
		offset += 1

		let result = view.getFloat64(offset, true)
		offset += 8

		return result
	}

	function parseArray() {
		offset += 1
		let array = []
		let b
		while (true) {
			b = view.getUint8(offset)
			if (b == 0x43) {
				offset += 1
				break
			}

			// parseValue returns Object { type: <binsonType>, value: <value> }
			array.push(parseValue().value)
		}

		return array

	}

	//
	// Parses any type of value and returns it.
	// result = {type:<type-as-a-string>, value:<the-value>}
	// ABNF: value = boolean / integer / double / string / bytes / array / object
	// Focus on: value = string / bytes / object.
	//
	function parseValue() {
		// this.offset not increase here, do it in called functions.
		let b = view.getUint8(offset)
		let result = {}

		switch (b) {
		case 0x10:
		case 0x11:
		case 0x12:
		case 0x13:
			// int8/16/32/64
			result.value = parseInteger()
			if (jsbi.__isBigInt(result.value)){
				result.type = 'bigInt'
			}
			else {
				result.type = 'integer'
			}
			break

		case 0x14:
		case 0x15:
		case 0x16:
			// stringLen
			result.type = 'string'
			result.value = parseString()
			break

		case 0x18:
		case 0x19:
		case 0x1a:
			// bytesLen
			result.type = 'bytes'
			result.value = parseBytes()
			break

		case 0x40:
			// object
			result.type = 'object'
			result.value = parseObject()
			break

		case 0x42:
			// array
			result.type = 'array'
			result.value = parseArray()
			break

		case 0x44:
			// true
			result.type = 'boolean'
			result.value = true
			offset += 1
			break

		case 0x45:
			// false
			result.type = 'boolean'
			result.value = false
			offset += 1
			break

		case 0x46:
			// double
			result.type = 'double'
			result.value = parseDouble()
			break

		default:
			let prefix = '0x'
			if (b < 16) {
				prefix += '0'
			}
			throw new Error('error, or unsupported type. \n\t'+
			'Byte: ' + prefix + b.toString(16) + '\n\t' +
			'Offset: ' + offset)
			break
		}

		return result
	}

	//
	// Returns what has been parsed so far as a string of bytes
	// as hexadecimal values
	//
	function parsedtoByteString() {
		// this.offset points at the next thing to be parsed
		offset -= 1

		let str = '['
		let byte
		for (let i = 0; i < offset-1; i++) {
			byte = view.getUint8(i)
			if (byte < 16) {
				str += '0x0' + byte.toString(16) + ', '
			} else {
				str += '0x' + byte.toString(16) + ', '
			}
		}
		byte = view.getUint8(offset)
		if (byte < 16) {
			str += '0x0' + byte.toString(16) + ', ... (not parsed)]'
		} else {
			str += '0x' + byte.toString(16) + ', ... (not parsed)]'
		}

		// So that this.offset is unchanged by the function
		offset += 1
		return str
	}
}

