// ======== Header =========
// Binson implementation in JavaScript.
// Author: Frans Lundberg
//
// 2016-06-12. Status: not complete, supports types: string, bytes, object.
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
    // Status: not complete but supports types: string, bytes, object, boolean.
    // Left: integer, double, array.
    //
    
    this.fields = {};
    
    this.putString = function(name, value) {
        this.put("string", name, value);
        return this;
    };
    
    // ArrayBuffer value.
    this.putBytes = function(name, value) {
        if (!(value instanceof ArrayBuffer)) {
            throw new Error("expected ArrayBuffer");
        }
        this.put("bytes", name, value);
        return this;
    };
    
    this.putObject = function(name, value) {
        this.put("object", name, value);
        return this;
    };
    
    this.putBoolean = function(name, value) {
        this.put("boolean", name, value);
        return this;
    }
    
    this.put = function(type, name, value) {
        this.fields[name] = {type:type, value:value};
        return this;
    };
    
    // Returns value given its name
    this.get = function(name) {
        var f = this.fields[name];
        if (f === undefined) {
            return undefined;
        } else {
            return f.value;
        }
    }
    
    /**
     * Returns Binson bytes, ArrayBuffer.
     */
    this.toBytes = function() {
        var size = this.byteSize();
        
        if (isNaN(size) || size < 2) {
            throw new Error("bad size, " + size);
        }
               
        var bytes = new DataView(new ArrayBuffer(size));
        var offset = 0;
        var fieldNames = Object.keys(this.fields);
        
        if (bytes.byteLength != size) {
            throw new Error("bytes has unexpected length, " + bytes.byteLength + ", " + size);
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

    // value.type, value.value.
    this.pValueToBytes = function(bytes, offset, value) {
        switch (value.type) {
            case 'string':
                offset = this.pStringToBytes(bytes, offset, value.value);
                break;
            case 'bytes':
                offset = this.pBytesToBytes(bytes, offset, value.value);    // value.value is ArrayBuffer   TODO XXX
                break;
            case 'object':
                offset = this.pObjectToBytes(bytes, offset, value.value);   
                break;
            case 'boolean':
                offset = this.pBooleanToBytes(bytes, offset, value.value);
            // TODO more cases
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
    }
    
    this.pObjectToBytes = function(bytes, offset, obj) {
        if (bytes.byteLength < 2) {
            throw new Error("too few bytes left to parse object (pObjectToBytes), " 
                + bytes.byteLength + ", offset:" + offset);
        }
        
        bytes.setUint8(offset, 0x40);
        offset += 1;
        
        var fieldNames = Object.keys(obj.fields);
        
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
        for (var i = 0; i < utf8.length; i++) {
            bytes.setUint8(offset, utf8[i]);
            offset += 1;
        }
        
        return offset;
    };
    
    this.pBytesToBytes = function(bytes, offset, value) {
        if (!(value instanceof ArrayBuffer)) {
            throw new Error("expected ArrayBuffer");
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
            // TODO more cases
        }
        
        return size;
    };
    
    // ABNF: string = stringLen utf
    this.pStringSize = function(string) {
        var encoder = new TextEncoder("UTF-8");
        var utf8Size = encoder.encode(string).length;
        var size = 1 + this.pIntegerSize(utf8Size) + utf8Size;
        return size;
    };

    // bytes = ArrayBuffer  
    this.pBytesSize = function(bytes) {
        var len = bytes.byteLength;
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
            throw new Error("bad first byte in object, " + b + " expected 64 (0x40)");
        }
        
        while (true) {
            b = this.view.getUint8(this.offset);
            if (b == 0x41) {
                break;
            }
            
            var name = this.parseString();
            var value = this.parseValue();   
            
            result.put(value.type, name, value.value);
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
        default:
            throw new Error("error, or unsupported type, " + b);
            break;
        }
        
        return result;
    };
    
    this.parseBytes = function() {
        var b = this.view.getUint8(this.offset);
        var result;
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
        
        var bytes = new Uint8Array(len);
        for (var i = 0; i < bytes.length; i++) {
            bytes[i] = this.view.getUint8(this.offset);
            this.offset += 1;
        }
        
        return bytes;
    }
}

