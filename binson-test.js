// Tests for binson.js.
// Run tests with code: [runBinsonTests()]. See JavaScript console for output.
//
// Author: Frans Lundberg
//

// ======== Functions ========

// Takes array of numbers, returns ArrayBuffer
function arrayToBuffer(array) {
    var len = array.length;
    var buffer = new ArrayBuffer(len);
    var view = new DataView(buffer);
    
    for (var i = 0; i < len; i++) {
        view.setUint8(i, array[i]);
    }
    
    return buffer;
}

function runBinsonTests() {
    var b = new BinsonTest();
    var p = new BinsonParserTest();
        
    var testSuit = [
        {name: "b.testBytes", f:b.testBytes},
        {name: "b.testBytes2", f:b.testBytes2},
        {name: "b.testEmpty", f:b.testEmpty},
        {name: "b.testNested", f:b.testNested},
        {name: "b.test1", f:b.test1},
        {name: "b.testTwoFields", f:b.testTwoFields},
        {name: "b.testBooleanTrue", f:b.testBooleanTrue},
        {name: "b.testBooleanFalse", f:b.testBooleanFalse},
        
        {name: "p.test1", f:p.test1},
        {name: "p.test1WithParseFunction", f:p.test1WithParseFunction},
        {name: "p.testTwoFields", f:p.testTwoFields},
        {name: "p.testEmpty", f:p.testEmpty},
        {name: "p.testNested", f:p.testNested},
        {name: "p.testBytes", f:p.testBytes},
        {name: "p.testParseBytes", f:p.testParseBytes},
        {name: "p.testLargeByteArray", f:p.testLargeByteArray}
    ];
    
    for (var i = 0; i < testSuit.length; i++) {
        var test = testSuit[i];
        try {
            test.f();
            console.log("OK " + test.name);
        } catch (ex) {
            console.error("ERROR " + test.name + ", " + ex);
        }
    }
}


// ======== BinsonTest object ========

function BinsonTest() {    
    this.testBytes = function() {
        var aaaa = new ArrayBuffer(4);
        var b = new Binson().putBytes("aaaa", aaaa);
        var expected = [64, 20, 4, 97, 97, 97, 97, 24, 4, 0, 0, 0, 0, 65];
        var bytes = b.toBytes();
        var uints = new Uint8Array(bytes);
        
        for (var i = 0; i < expected.length; i++) {
            if (uints[i] != expected[i]) {
                
                console.log("uints: " + uints + ", " + uints.length);
                console.log("expected: " + expected);
                
                throw new Error("testBytes - ERROR, i=" + i + ", " + uints[i] + ", " + expected[i]);
                break;
            }
        }
    };
    
    this.testBytes2 = function() {
        var aaaa = new ArrayBuffer(4);
        var u8 = new Uint8Array(aaaa);
        u8[0] = 0;
        u8[1] = 1;
        u8[2] = 2;
        u8[3] = 3;
        var b = new Binson().putBytes("aaaa", aaaa);
        var expected = [64, 20, 4, 97, 97, 97, 97, 24, 4, 0, 1, 2, 3, 65];
        var bytes = b.toBytes();
        var uints = new Uint8Array(bytes);
        
        for (var i = 0; i < expected.length; i++) {
            if (uints[i] != expected[i]) {
                
                console.log("uints: " + uints + ", " + uints.length);
                console.log("expected: " + expected);
                
                throw new Error("testBytes - ERROR, i=" + i + ", " + uints[i] + ", " + expected[i]);
                break;
            }
        }
    };
    
    this.testBooleanTrue = function() {

        var b = new Binson().putBoolean("aaaa", true);
        var expected = [64, 20, 4, 97, 97, 97, 97, 68, 65];
        var bytes = b.toBytes();
        var uints = new Uint8Array(bytes);
        for (var i = 0; i < expected.length; i++) {
            if (uints[i] != expected[i]) {
                console.log("uints: " + uints + ", " + uints.length);
                console.log("expected: " + expected);
                
                throw new Error("testBooleanTrue - ERROR; i=" + i + ", " + uints[i] + ", " + expected[i]);
                break;
            }
        }
    }
    
    this.testBooleanFalse = function() {

        var b = new Binson().putBoolean("aaaa", false);
        var expected = [64, 20, 4, 97, 97, 97, 97, 69, 65];
        var bytes = b.toBytes();
        var uints = new Uint8Array(bytes);
        for (var i = 0; i < expected.length; i++) {
            if (uints[i] != expected[i]) {
                console.log("uints: " + uints + ", " + uints.length);
                console.log("expected: " + expected);
                
                throw new Error("testBooleanTrue - ERROR; i=" + i + ", " + uints[i] + ", " + expected[i]);
                break;
            }
        }
    }
    
    // Sanity check
    this.test1 = function() {
        var expected = [64, 20, 2, 107, 49, 20, 6, 118, 97, 108, 117, 101, 49, 65];
        
        var b = new Binson().putString("k1", "value1");
        var bytes = b.toBytes();
        
        for (var i = 0; i < bytes.length; i++) {
            if (bytes[i] != expected[i]) {
                throw "test1 - ERROR, " + i + ", " + bytes[i] + ", " + expected[i];
                break;
            }
        }
    };
    
    this.testEmpty = function() {
        var expected = [64, 65];
        var bytes = new Binson().toBytes();
        
        for (var i = 0; i < bytes.length; i++) {
            if (bytes[i] != expected[i]) {
                throw "testEmpty - ERROR, " + i + ", " + bytes[i] + ", " + expected[i];
                break;
            }
        }
    };
    
    this.testTwoFields = function() {
        var expected = [64, 20, 2, 107, 49, 20, 2, 118, 49, 20, 2, 107, 50, 20, 2, 118, 50, 65];
        var b = new Binson().putString("k1", "v1").putString("k2", "v2");
        
        var size = b.byteSize();
        if (size != 18) {
            throw "bad byteSize computed, was " + size + ", expected " + expected.length;
        }
        
        var bytes = b.toBytes();
        
        for (var i = 0; i < bytes.length; i++) {
            if (bytes[i] != expected[i]) {
                throw "testTwoFields - ERROR, i=" + i;
                break;
            }
        }
    };
    
    this.testNested = function() {
        var a = new Binson().putObject("b", new Binson());
        var expected = [64, 20, 1, 98, 64, 65, 65];
        var bytes = a.toBytes();
        
        for (var i = 0; i < bytes.length; i++) {
            if (bytes[i] != expected[i]) {
                console.log("bytes: " + bytes + ", " + bytes.length);
                console.log("expected: " + expected);
                throw "testNested - ERROR, i=" + i + ", " + bytes[i] + ", " + expected[i];
            }
        }
    };
}

//
// ======== BinsonParserTest object ========
//

function BinsonParserTest() {
    	
	this.test1 = function() {
	    // Result should be equal to new Binson().putString("k1", "value1").
	    
		var buffer = arrayToBuffer([64, 20, 2, 107, 49, 20, 6, 118, 97, 108, 117, 101, 49, 65]);
		var binson = new BinsonParser().parse(buffer, 0);
		var k1 = binson.get("k1");
		
		if (!(k1 === "value1")) {
		    throw new Error("test1 - " + k1);
		}
	}
	
	this.test1WithParseFunction = function() {
        // Result should be equal to new Binson().putString("k1", "value1").
        
        var buffer = arrayToBuffer([64, 20, 2, 107, 49, 20, 6, 118, 97, 108, 117, 101, 49, 65]);
        var binson = Binson.parse(buffer, 0);
        var k1 = binson.get("k1");
        
        if (!(k1 === "value1")) {
            throw new Error("test1 - " + k1);
        }
    }
	
	this.testTwoFields = function() {
	    var buffer = arrayToBuffer([64, 20, 2, 107, 49, 20, 2, 118, 49, 20, 2, 107, 50, 20, 2, 118, 50, 65]);
	    var binson = new BinsonParser().parse(buffer, 0);
	    var k1 = binson.get("k1");
	    var k2 = binson.get("k2");
	    
	    if (!(k1 === "v1")) {
	        throw new Error("testTwoFields, k1 - " + k1);
	    }
	    
	    if (!(k2 === "v2")) {
            throw new Error("testTwoFields, k2 - " + k2);
        }
	}
	
	this.testEmpty = function() {
	    var buffer = arrayToBuffer([64, 65]);
        var binson = new BinsonParser().parse(buffer, 0);
	}
	
	this.testNested = function() {
	    var buffer = arrayToBuffer([64, 20, 1, 98, 64, 65, 65]);    // {b={};}
	    var binson = new BinsonParser().parse(buffer, 0);
	    var nested = binson.get("b");
	    
	    if (nested === undefined) {
	        throw new Error("testNested, undefined");
	    }
	}
	
	this.testBytes = function() {
	    var buffer = arrayToBuffer([64, 20, 4, 97, 97, 97, 97, 24, 4, 0, 0, 0, 0, 65]);
	           // {aaaa=0x00000000;}
	    var binson = new BinsonParser().parse(buffer, 0);
	    var aaaa = binson.get("aaaa");
	    
	    if (aaaa === undefined) {
            throw new Error("testBytes, aaaa undefined");
        }
        
        if (!(aaaa instanceof Uint8Array)) {
            throw new Error("testBytes, unexpected type, " + typeof(aaaa) + ", " + aaaa);
        }
	}
	
    this.testParseBytes = function() {
        var buffer = new ArrayBuffer(40);
        var u8 = new Uint8Array(buffer);
        
        // {ek=0x111...;}   32-long byte array ("ek").       
        var data = [
            0x40, 0x14, 0x02, 0x65, 0x6b, 0x18, 0x20, 0xde, 0x52, 0xa1, 0xb7, 0xf1, 0xb6, 
            0x7e, 0xb4, 0x61, 0x28, 0x53, 0xcc, 0xfb, 0xbc, 0x72, 0xc3, 0xec, 0x54, 0xa8, 
            0x80, 0x77, 0xd9, 0x2c, 0x74, 0xfd, 0xf8, 0xab, 0x7b, 0x6c, 0x6c, 0x64, 0x38, 0x41
        ];
        
        for (var i = 0; i < data.length; i++) {
            u8[i] = data[i];
        }
        
        var b = Binson.parse(buffer, 0);
        var ek = b.get("ek");
        if (ek === undefined) {
            throw new Error("testParseBytes, ek undefined");
        }
    }
    
    this.testLargeByteArray = function() {
        var buffer = new ArrayBuffer(300);   // more than 127, size in two bytes
        var b1 = new Binson();
        b1.putBytes("bytes", buffer);
        
        var b2 = Binson.parse(b1.toBytes());
        
        var byteLen = b2.get("bytes").byteLength;
        if (byteLen != 300) {
            throw new Error("byteLen " + byteLen);
        }
    }
}

