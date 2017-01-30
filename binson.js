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
// Functions starting with "p" are "private". Subject to change often, meant
// for internal use only.
//

// buffer = ArrayBuffer, the bytes to parse.
// offset = the offset to start parsing from, default = 0.
Binson.parse = function(buffer, offset = 0) {
	return new BinsonParser().parse(buffer, offset);
}


// ======== Binson object ========

function Binson() {
	// 
	// We use ArrayBuffer for storing raw bytes since it is the base
	// for creating DataView objects.
	//
	
	this.fields = {};
	
	
	// STRING
	this.putString = function(name, value) {
		if (!(typeof(value) === "string")) {
			throw new Error("putString expected string");
		}
		this.pPut("string", name, value);
		return this;
	};
	
	this.getString = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return undefined;
		} else if (f.type !== "string") {
			return undefined;
		} 
		return f.value;
	};
	
	this.hasString = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return false;
		} else if (f.type !== "string") {
			return false;
		} 
		return true;
	};
	
	
	
	
	
	// BYTES
	// ArrayBuffer value.
	this.putBytes = function(name, value) {
		if (!(value instanceof ArrayBuffer)) {
			throw new Error("putBytes expected ArrayBuffer");
		}
		this.pPut("bytes", name, value);
		return this;
	};
	
	this.getBytes = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return undefined;
		} else if (f.type !== "bytes") {
			return undefined;
		} 
		return f.value;
	};
	
	this.hasBytes = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return false;
		} else if (f.type !== "bytes") {
			return false;
		} 
		return true;
	};
	
	
	
	
	// BINSON OBJECT
	this.putObject = function(name, value) {
		if (!(value instanceof Binson)) {
			throw new Error("putObject expected a Binson object");
		}
		this.pPut("object", name, value);
		return this;
	};
	
	this.getObject = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return undefined;
		} else if (f.type !== "object") {
			return undefined;
		} 
		return f.value;
	};
	
	this.hasObject = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return false;
		} else if (f.type !== "object") {
			return false;
		} 
		return true;
	};
	
	
	
	
	// BOOLEAN
	this.putBoolean = function(name, value) {
		if (!(typeof(value) === "boolean")) {
			throw new Error("putBoolean expected a boolean");
		}
		this.pPut("boolean", name, value);
		return this;
	};
	
	this.getBoolean = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return undefined;
		} else if (f.type !== "boolean") {
			return undefined;
		} 
		return f.value;
	};
	
	this.hasBoolean = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return false;
		} else if (f.type !== "boolean") {
			return false;
		} 
		return true;
	};
	
	
	
	
	// INTEGER
	// All numbers are 64-bit floats. 
	// binson.js can only handle 32-bit integers
	this.putInteger = function(name, value) {
		if (! Number.isInteger(value)) {
			throw new Error("putInteger expected an integer");
		}
		this.pEnsureIntegerPrecision(value);
		this.pPut("integer", name, value);
		return this;
	};
	
	this.getInteger = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return undefined;
		} else if (f.type !== "integer") {
			return undefined;
		} 
		return f.value;
	};
	
	this.hasInteger = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return false;
		} else if (f.type !== "integer") {
			return false;
		} 
		return true;
	};
	
	
	
	
	// DOUBLE
	this.putDouble = function(name, value) {
		if (!(typeof(value) === "number")) {
			throw new Error("putDouble expected a number");
		}
		this.pPut("double", name, value);
		return this;
	};
	
	this.getDouble = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return undefined;
		} else if (f.type !== "double") {
			return undefined;
		} 
		return f.value;
	};
	
	this.hasDouble = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return false;
		} else if (f.type !== "double") {
			return false;
		} 
		return true;
	};
	
	
	
	
	// ARRAY
	this.putArray = function(name, value) {
		if (!(Array.isArray(value))) {
			throw new Error("putArray expected an array");
		}
		this.pBinsonTypeCheckArray(name, value);
		this.pPut("array", name, value);
		return this;
	};
	
	this.getArray = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return undefined;
		} else if (f.type !== "array") {
			return undefined;
		} 
		return f.value;
	};
	
	this.hasArray = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return false;
		} else if (f.type !== "array") {
			return false;
		} 
		return true;
	};
	
	
	
	
	
	
	
	// Returns value given its name
	this.get = function(name) {
		var f = this.fields[name];
		if (f === undefined) {
			return undefined;
		} else {
			return f.value;
		}
	};
	
	this.pPut = function(type, name, value) {
		this.fields[name] = {type:type, value:value};
		return this;
	};
	
	/**
	 * Returns Binson bytes, ArrayBuffer.
	 */
	this.toBytes = function() {
		var size = this.byteSize();
		
		if (isNaN(size) || size < 2) {
			throw new Error("bad size: " + size);
		}
			   
		var bytes = new DataView(new ArrayBuffer(size));
		var offset = 0;
		var fieldNames = Object.keys(this.fields);
		
		if (bytes.byteLength != size) {
			throw new Error("bytes has unexpected length.\n\t" + 
					"Bytes.byteLength: " + bytes.byteLength + "\n\t" + 
					"this.byteSize(): " + size);
		}
		
		offset = this.pObjectToBytes(bytes, offset, this);
		
		return bytes.buffer;
	};
			
	/**
	 * Size of bytes of resulting Binson bytes.
	 */
	this.byteSize = function() {
		var fieldNames = Object.keys(this.fields);
		var size = 1;
		
		for (var i = 0; i < fieldNames.length; i++) {
			var fieldName = fieldNames[i];
			var value = this.fields[fieldName];
			size += this.pStringSize(fieldName);
			size += this.pValueSize(value);
		}
		
		size += 1;
		
		if (isNaN(size)) {
			throw new Error("size is NaN");
		}
		
		if (size < 2) {
			throw new Error("bad computed size, " + size);
		}
		
		return size;
	};

	// value = {type: <binson type>, value: <value>}
	// value.type, value.value.
	this.pValueToBytes = function(bytes, offset, value) {
		switch (value.type) {
			case 'string':
				offset = this.pStringToBytes(bytes, offset, value.value);
				break;
			case 'bytes':
				offset = this.pBytesToBytes(bytes, offset, value.value);
				break;
			case 'object':
				offset = this.pObjectToBytes(bytes, offset, value.value);   
				break;
			case 'boolean':
				offset = this.pBooleanToBytes(bytes, offset, value.value);
				break;
			case 'integer':
				offset = this.pIntegerToBytes(bytes, offset, value.value);
				break;
			case 'double':
				offset = this.pDoubleToBytes(bytes, offset, value.value);
				break;
			case 'array':
				offset = this.pArrayToBytes(bytes, offset, value.value);
				break;
		}
		
		return offset;
	};
	
	this.pArrayToBytes = function(bytes, offset, array) {
		bytes.setUint8(offset, 0x42);
		offset += 1;
		var elem;
		for (var i = 0; i < array.length; i++){
			elem = array[i];
			var binsonType = this.pBinsonTypeOf(elem);

			switch(binsonType) {
				case 'array':
					offset = this.pArrayToBytes(bytes, offset, elem);
					break;
					
				case 'boolean':
					offset = this.pBooleanToBytes(bytes, offset, elem);
					break;
					
				case 'bytes':
					offset = this.pBytesToBytes(bytes, offset, elem);
					break;
					
				case 'double':
					offset = this.pDoubleToBytes(bytes, offset, elem);
					break;
					
				case 'integer':
					offset = this.pIntegerToBytes(bytes, offset, elem);
					break;
					
				case 'object':
					offset = this.pObjectToBytes(bytes, offset, elem);
					break;
					
				case 'string':
					offset = this.pStringToBytes(bytes, offset, elem);
					break;
			}
		}
		
		bytes.setUint8(offset, 0x43);
		offset += 1;
		
		return offset;
	};
	
	this.pDoubleToBytes = function(bytes, offset, double) {
		bytes.setUint8(offset, 0x46)
		offset += 1;
		
		bytes.setFloat64(offset, double, true);
		offset += 8;
		
		return offset;
	};
	
	this.pIntegerToBytes = function(bytes, offset, integer) {
		var size = this.pIntegerSize(integer);
		
		if (size == 1) {
			bytes.setUint8(offset, 0x10);
			offset += 1;
			
			bytes.setInt8(offset, integer);
			offset += 1;
			
		} else if (size == 2) {
			bytes.setUint8(offset, 0x11);
			offset += 1;
			
			bytes.setInt16(offset, integer, true);
			offset += 2;
			
		} else if (size == 4) {
			bytes.setUint8(offset, 0x12);
			offset += 1;
			
			bytes.setInt32(offset, integer, true);
			offset += 4;
			
		} else if (size == 8) {
			// TODO: Handle 64-bit integers
			// Currently stops too large integers in putInteger with
			// pEnsureIntegerPrecision which only accepts negative integers
			// that fit in 4 bytes and positive integers < Number.MAX_SAFE_INTEGER
			bytes.setUint8(offset, 0x13);
			offset += 1;
			
			for (let i = 0; i < size; i++) {
				let byte = integer & 0xFF;
				bytes.setUint8(offset, byte);
				offset += 1;
				
				// Bitshift right 8 bits
				for (let j = 0; j < 8; j++) {
					if (integer & 1 === 1) {
						integer -= 1;
					}
					integer = integer/2;
				}
			}
		} else { 
			throw new Error("this.pIntegerSize returned bad bytesize: " + size);
		}
		
		return offset;
	};
	
	this.pBooleanToBytes = function(bytes, offset, bool) {
		if (bool) {
			bytes.setUint8(offset, 0x44);
			offset += 1;
		} else {
			bytes.setUint8(offset, 0x45);
			offset += 1;
		}
		return offset;
	};
	
	this.pObjectToBytes = function(bytes, offset, obj) {
		if (bytes.byteLength < 2) {
			throw new Error("too few bytes left to parse object (pObjectToBytes), " 
				+ bytes.byteLength + ", offset:" + offset);
		}
		
		bytes.setUint8(offset, 0x40);
		offset += 1;
		
		// Field names must be lexicographically sorted
		var fieldNames = Object.keys(obj.fields).sort();
		
		for (var i = 0; i < fieldNames.length; i++) {
			var fieldName = fieldNames[i];
   
			var field = obj.fields[fieldName];
			offset = obj.pStringToBytes(bytes, offset, fieldName);
			offset = obj.pValueToBytes(bytes, offset, field);
		}
		
		bytes.setUint8(offset, 0x41);
		offset += 1;
		
		return offset;
	};
	 
	this.pStringToBytes = function(bytes, offset, string) {
		var encoder = new TextEncoder("UTF-8");
		var utf8 = encoder.encode(string);
		var len = utf8.length;
		offset = this.pStringLenToBytes(bytes, offset, len);
		for (var i = 0; i < len; i++) {
			bytes.setUint8(offset, utf8[i]);
			offset += 1;
		}
		return offset;
	};
	
	this.pBytesToBytes = function(bytes, offset, value) {
		if (!(value instanceof ArrayBuffer)) {
			throw new Error("expected ArrayBuffer: " + value);
		}
		
		var u8 = new Uint8Array(value);
		
		offset = this.pBytesLenToBytes(bytes, offset, value.byteLength);
		
		for (var i = 0; i < value.byteLength; i++) {
			bytes.setUint8(offset, u8[i]);
			offset += 1;
		}
		
		return offset;
	};
	
	this.pBytesLenToBytes = function(bytes, offset, len) {
		if (len <= 127) {
			bytes.setUint8(offset, 0x18);
			offset += 1;
			bytes.setUint8(offset, len);
			offset += 1;
		} else if (len <= 32767) {
			bytes.setUint8(offset, 0x19);
			offset += 1;
			bytes.setUint16(offset, len, true);
			offset += 2;
		} else {
			bytes.setUint8(offset, 0x1a);
			offset += 1;
			bytes.setUint32(offset, len, true);
			offset += 4;
		}
		
		return offset;
	};
	
	this.pStringLenToBytes = function(bytes, offset, len) {
		if (len <= 127) {
			bytes.setUint8(offset, 0x14);
			offset += 1;
			bytes.setUint8(offset, len);
			offset += 1;
			
		} else if (len <= 32767) {
			bytes.setUint8(offset, 0x15);
			offset += 1;
			bytes.setUint16(offset, len, true);
			offset += 2;
		} else {
			bytes.setUint8(offset, 0x16);
			offset += 1;
			bytes.setUint32(offset, len, true);
			offset += 4;
		}
		return offset;
	};
	
	this.pObjectSize = function(obj) {
		var fieldNames = Object.keys(obj.fields);
		var size = 0;
		
		size += 1;
		
		for (var i = 0; i < fieldNames.length; i++) {
			var fieldName = fieldNames[i];
			var value = obj.fields[fieldName];
			size += obj.pStringSize(fieldName);
			size += obj.pValueSize(value);
		}
		
		size += 1;
		
		return size;
	};
	
	this.pArraySize = function(array) {
		var size = 2; // Start & end bytes
		
		for (var i = 0; i < array.length; i++) {
			var elem = array[i];
			var binsonType = this.pBinsonTypeOf(elem);
			
			switch(binsonType) {
				case 'array':
					size += this.pArraySize(elem);
					break;
					
				case 'boolean':
					size += 1;
					break;
					
				case 'bytes':
					size += this.pBytesSize(elem);
					break;
					
				case 'double':
					size += 1 + 8;
					break;
					
				case 'integer':
					size += 1 + this.pIntegerSize(elem);
					break;
				
				case 'object':
					size += this.pObjectSize(elem);
					break;
					
				case 'string':
					size += this.pStringSize(elem);
					break;
				
			}
		}
		
		return size;
	}
	
	// ABNF: string = stringLen utf
	this.pStringSize = function(string) {
		var encoder = new TextEncoder("UTF-8");
		var utf8Size = encoder.encode(string).length;
		var size = 1 + this.pIntegerSize(utf8Size) + utf8Size;
		return size;
	};

	// bytes instanceof ArrayBuffer  
	this.pBytesSize = function(bytes) {
		var len = bytes.byteLength;
		// Bytes hex id + length integer + bytes
		return 1 + this.pIntegerSize(len) + len;
	};
	
	this.pIntegerSize = function(int) {
		var size = 8;
		if (int >= -2147483648 && int <= 2147483647) {
			size = 4;
		}
		if (int >= -32768 && int <= 32767) {
			size = 2;
		}
		if (int >= -128 && int <= 127) {
			size = 1;
		}
		
		return size;
	};
	
	// value.type
	// value.value
	this.pValueSize = function(value) {
		var size = 0;
		
		switch (value.type) {
			case "string":
				size += this.pStringSize(value.value);
				break;
			case "bytes":
				size += this.pBytesSize(value.value);
				break;
			case "object":
				size += this.pObjectSize(value.value);
				break;
			case "boolean":
				size += 1;
				break;
			case "integer":
				size += 1 + this.pIntegerSize(value.value); // int hex id + int8/16/32/64 size
				break;
			case "double":
				size += 1 + 8;					// double hex id + size of 64-bit float
				break;
			case "array":
				size += this.pArraySize(value.value);
				break;
		}
		return size;
	};
	
	// We don't handle 64-bit integers at this moment
	// Integers that don't fit into 32-bit raises an error
	this.pEnsureIntegerPrecision = function(integer) {
		if (this.pIntegerSize(integer) > 4) {
			if (integer <= Number.MAX_SAFE_INTEGER && integer > 0) {
				return;
			} else {
				throw new Error("specified integer does not fit in 32 bits.\n\t" +
						"Integer: " + integer);
			}
		}
	};
	
	// Returns the binson type of a variable
	this.pBinsonTypeOf = function(v) {
		var type = typeof v;
		switch (type) {
				case 'boolean':
					return 'boolean';
					
				case 'number':
					if (Number.isInteger(v)) {
						this.pEnsureIntegerPrecision(v);
						return 'integer';
					} else {
						return 'double';
					}
					
				case 'string':
					return 'string';
					
				case 'object':
					if (Array.isArray(v)) {
						return 'array';
					}
					if (v instanceof ArrayBuffer) {
						return 'bytes';
					}
					if (v instanceof Binson) {
						return 'object';
					}
					if (v == null) {
						throw new Error("Binson does not allow null");
					}
				   
				default:
					throw new Error("A variable must be a boolean, number (integer or float), string, " +
						"instance of an ArrayBuffer, array, Binson object.\n\t" + 
						"Type: " + type);
			}
	};
	
	this.pBinsonTypeCheckArray = function(name, array) {
		for (var i = 0; i < array.length; i++) {
			try {
				this.pBinsonTypeOf(array[i]);
				if (Array.isArray(array[i])) {
					this.pBinsonTypeCheckArray("!!Nested!!", array[i]);
				}
			} catch (err) {
				throw new Error("Invalid array element: \n\t" +
					"Position: " + i + "\n\t" + 
					"Name: \"" + name + "\"\n\t" +
					"Element: " + array[i] + "\n\n\t" +
					err);
			}
		}
	};
	
	// Returns the bytes of the binson object as a string
	this.toString = function(){
		var buffer = this.toBytes();
		var uints = new Uint8Array(buffer);
		var res = "[";
		for (var i = 0; i < uints.length-1; i++) {
			if (uints[i] < 16) { // 16 = 0x10
				res += "0x0" + uints[i].toString(16).toLowerCase() + ", ";
			} else {
				res += "0x" + uints[i].toString(16).toLowerCase() + ", ";
			}
		}
		// Always 0x41, we don't need the if-statement or toLowerCase
		res += "0x" + uints[uints.length-1].toString(16) + "]";
		return res;
	};
}

//
// ======== BinsonParser object ========
//
// Used internally. Used by Binson object to parse.
//

function BinsonParser() {
	
	// buffer = ArrayBuffer, the bytes to parse.
	this.parse = function(buffer, offset = 0) {
		this.buffer = buffer;
		this.view = new DataView(this.buffer);
		this.offset = offset;
		return this.parseObject();
	};
	
	// Internal method to parse a Binson object.
	this.parseObject = function() {
		var result = new Binson();
		var b = this.view.getUint8(this.offset);
		this.offset += 1;
		if (b != 0x40) {
			throw new Error("bad first byte in object, 0x" + b.toString(16) + " expected 0x40");
		}
		var name, prevName, value;
		var prevName = "";
		while (true) {
			b = this.view.getUint8(this.offset);
			if (b == 0x41) {
				this.offset += 1;
				break;
			}
			var fieldOffset = this.offset;
			name = this.parseString();
			value = this.parseValue();   
			
			if (name < prevName) {
				throw new Error("Bad format. \n\t" +
					"Fields not in lexicographical order when parsing. \n\t\t" +
						"Previous field: " + prevName + "\n\t\t" +
						"Current field: " + name);
			}
			if (!(typeof(result.fields[name]) == "undefined" )) {
				var str = this.pParsedtoByteString();
				throw new Error("Bad format. \n\t" +
					"Found two fields with the same name when parsing. \n\t\t" +
						"Duplicate field name at: " + fieldOffset + "\n\t\t" +
						"Field name: \"" + name + "\"\n\t\t" +
						"1st value: " + result.fields[name].value + "\n\t\t" +
						"2nd value: " + value.value + "\n\t\t" +
						"Bytes: " + str);
			}
			prevName = name;
			
			result.pPut(value.type, name, value.value);
		}
		
		return result;
	};
	
	this.parseString = function() {
		var b = this.view.getUint8(this.offset);
		this.offset += 1;
		var len;
		
		switch (b) {
		case 0x14:
			len = this.view.getInt8(this.offset, true);
			this.offset += 1;
			break;
		case 0x15:
			len = this.view.getInt16(this.offset, true);
			this.offset += 2;
			break;
		case 0x16:
			len = this.view.getInt32(this.offset, true);
			this.offset += 4;
			break;
		default:
			throw new Error("bad byte, expected stringLen, got byte " + b);
			break;
		}
		
		var decoder = new TextDecoder("UTF-8");
		var stringBytes = new DataView(this.buffer, this.offset, len);
		var string = decoder.decode(stringBytes);
		this.offset += len;
		
		return string;
	};
	
	this.parseBytes = function() {
		var b = this.view.getUint8(this.offset);
		var len;
		
		this.offset += 1;
		
		switch (b) {
		case 0x18:
			len = this.view.getInt8(this.offset);
			this.offset += 1;
			break;
		case 0x19:
			len = this.view.getInt16(this.offset, true);
			this.offset += 2;
			break;
		case 0x1a:
			len = this.view.getInt32(this.offset, true);
			this.offset += 4;
			break;
		default:
			throw new Error("unexpected byte, " + b);
			break;
		}
		
		if (len < 0) {
			throw new Error("len negative, not allowed, bad format, " + b + ", " + len);
		}
		var buffer= new ArrayBuffer(len);
		var bytes = new Uint8Array(buffer);
		for (var i = 0; i < bytes.length; i++) {
			bytes[i] = this.view.getUint8(this.offset);
			this.offset += 1;
		}
		
		return buffer;
	};
	
	this.parseInteger = function() {
		var b = this.view.getUint8(this.offset);
		this.offset += 1;
		
		var result;
		
		switch(b) {
			case 0x10:
				result = this.view.getInt8(this.offset);
				this.offset += 1;
				break;
				
			case 0x11:
				result = this.view.getInt16(this.offset, true);
				this.offset += 2;
				break;
				
			case 0x12:
				result = this.view.getInt32(this.offset, true);
				this.offset += 4;
				break;
				
			case 0x13:
				// TODO: Get a 64-bit integer
				// JavaScript only supports 53 bit integers
				// binson.js only supports 32 bit integers
				result = this.pGet64BitInteger();
				
				// It's easy to represent positive 64-bit integers up
				// to Number.MAX_SAFE_INTEGER so this will have to do
				// in order to handle unix time in milliseconds
				if ( 0 < result && result <= Number.MAX_SAFE_INTEGER ) {
					this.offset += 8;
				} else {
					var bytes = "";
					for (var i = 0; i < 8; i++) {
						bytes += this.view.getUint8(this.offset).toString(16) + " ";
						this.offset += 1;
					}
					throw new Error("JavaScript cannot handle 64-bit integers.\n\t" +
						"Little-endian bytes: " + bytes);
				}
				break;
				
			default:
				throw new Error("unexpected start byte when parsing integer: " + b);
				break;
		}
		
		return result;
	};
	
	this.pGet64BitInteger = function() {
		var res = 0;
		var bytes = new Uint8Array(8);	// 64-bit is 8 bytes
		for (var i = 0; i < 8; i++) {
			bytes[i] = this.view.getUint8(this.offset + i);
		}
		// MAX_SAFE_INTEGER is 00 1F FF FF FF FF FF FF
		// So highest byte must be 0 and second highest
		// byte must be strictly smaller than 31
		if (bytes[7] !== 0 || bytes[6] > 31) {
			return -1;  
		}
		for (var i = 0; i < 8; i++) {
			res += bytes[i] * Math.pow(2, 8*i) ;
		}
		return res;
	};
	
	this.parseDouble = function() {
		this.offset += 1;
		
		var result = this.view.getFloat64(this.offset, true);
		this.offset += 8;
		
		return result;
	};
	
	this.parseArray = function() {
		this.offset += 1;
		var array = [];
		var b;
		while (true) {
			b = this.view.getUint8(this.offset);
			if (b == 0x43) {
				this.offset += 1;
				break;
			}
			
			// parseValue returns Object { type: <binsonType>, value: <value> }
			array.push(this.parseValue().value);
		}
		
		return array;
		
	};
	
	//
	// Parses any type of value and returns it.
	// result = {type:<type-as-a-string>, value:<the-value>}
	// ABNF: value = boolean / integer / double / string / bytes / array / object
	// Focus on: value = string / bytes / object.
	//
	this.parseValue = function() {
		// this.offset not increase here, do it in called functions.
		var b = this.view.getUint8(this.offset);
		var result = {};
		
		switch (b) {
		case 0x10:
		case 0x11:
		case 0x12:
		case 0x13:
			// int8/16/32/64
			result.type = "integer";
			result.value = this.parseInteger();
			break;
			
		case 0x14:
		case 0x15:
		case 0x16:
			// stringLen
			result.type = "string";
			result.value = this.parseString();
			break;
			
		case 0x18:
		case 0x19:
		case 0x1a:
			// bytesLen
			result.type = "bytes";
			result.value = this.parseBytes();
			break;
			
		case 0x40:
			// object
			result.type = "object";
			result.value = this.parseObject();
			break;
			
		case 0x42:
			// array
			result.type = "array";
			result.value = this.parseArray();
			break;
			
		case 0x44:
			// true
			result.type = "boolean";
			result.value = true;
			this.offset += 1;
			break;
			
		case 0x45:  
			// false
			result.type = "boolean";
			result.value = false
			this.offset += 1;
			break;
			
		case 0x46:
			// double
			result.type = "double";
			result.value = this.parseDouble();
			break;
			
		default:
			throw new Error("error, or unsupported type. \n\t"+
			"Byte: 0x" + b.toString(16) + "\n\t" +
			"Offset: " + this.offset);
			break;
		}
		
		return result;
	};
	
	//
	// Returns what has been parsed so far as a string of bytes 
	// as hexadecimal values
	// 
	this.pParsedtoByteString = function() {
		// this.offset points at the next thing to be parsed
		this.offset -= 1;
		
		var str = "[";
		var byte;
		for (var i = 0; i < this.offset-1; i++) {
			byte = this.view.getUint8(i);
			if (byte < 10) {
				str += "0x0" + byte.toString(16) + ", ";
			} else {
				str += "0x" + byte.toString(16) + ", ";
			}
		}
		byte = this.view.getUint8(this.offset);
		if (byte < 10) {
			str += "0x0" + byte.toString(16) + ", ... (not parsed)]";
		} else {
			str += "0x" + byte.toString(16) + ", ... (not parsed)]";
		}
		
		// So that this.offset is unchanged by the function
		this.offset += 1;
		return str
	};
}

