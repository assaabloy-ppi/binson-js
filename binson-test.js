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
        {name: "b.testInt8", f:b.testInt8},
        {name: "b.testInt16", f:b.testInt16},
        {name: "b.testInt32", f:b.testInt32},
        {name: "b.testDouble", f:b.testDouble},
        
        {name: "p.test1", f:p.test1},
        {name: "p.test1WithParseFunction", f:p.test1WithParseFunction},
        {name: "p.testTwoFields", f:p.testTwoFields},
        {name: "p.testEmpty", f:p.testEmpty},
        {name: "p.testNested", f:p.testNested},
        {name: "p.testBytes", f:p.testBytes},
        {name: "p.testParseBytes", f:p.testParseBytes},
        {name: "p.testLargeByteArray", f:p.testLargeByteArray},
        {name: "p.testBoolean", f:p.testBoolean},
        {name: "p.testMixed", f:p.testMixed},
        {name: "p.testParseInt8", f:p.testParseInt8},
        {name: "p.testParseInt16", f:p.testParseInt16},
        {name: "p.testParseInt32", f:p.testParseInt32},
        {name: "p.testParseIntRandom", f:p.testParseIntRandom},
        {name: "p.testParseDouble", f:p.testParseDouble},
        {name: "p.testParseDoubleRandom", f:p.testParseDoubleRandom}
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

function checkEquality(bytes, expected) {
    var uints = new Uint8Array(bytes);
    
    if (expected.length != uints.length) {
        throw new Error("Length does not equal expected length. \n\t" +
            "Expected length: " + expected.length + "\n\t" +
            "Length: " + uints.length);
    }
    for (var i = 0; i < expected.length; i++) {
        if ( uints[i] != expected[i]) {
            throw new Error("at index: " + i + "\n\t"
                + "Expected: " + expected[i].toString(16) + "\n\t"
                + "Value: " + uints[i].toString(16));
        }
    }
}


// ======== BinsonTest object ========

function BinsonTest() {    
    this.testBytes = function() {
        var aaaa = new ArrayBuffer(4);
        var b = new Binson().putBytes("aaaa", aaaa);
        var expected = [0x40, 0x14, 0x04, 0x61, 0x61, 0x61, 0x61, 
                0x18, 0x04, 0x00, 0x00, 0x00, 0x00, 0x41];
        var bytes = b.toBytes();
        
        checkEquality(bytes, expected);
    };
    
    this.testBytes2 = function() {
        var aaaa = new ArrayBuffer(4);
        var u8 = new Uint8Array(aaaa);
        u8[0] = 0;
        u8[1] = 1;
        u8[2] = 2;
        u8[3] = 3;
        var b = new Binson().putBytes("aaaa", aaaa);
        var expected = [0x40, 0x14, 0x04, 0x61, 0x61, 0x61, 0x61, 
                0x18, 0x04, 0x00, 0x01, 0x02, 0x03, 0x41];
        var bytes = b.toBytes();
        
        checkEquality(bytes, expected);
    };
    
    this.testBooleanTrue = function() {
        var b = new Binson().putBoolean("a", true);
        var expected = [0x40, 0x14, 0x01, 0x61, 0x44, 0x41];
        var bytes = b.toBytes();
        
        checkEquality(bytes, expected);
    };
    
    this.testBooleanFalse = function() {
        var b = new Binson().putBoolean("a", false);
        var expected = [0x40, 0x14, 0x01, 0x61, 0x45, 0x41];
        var bytes = b.toBytes();
        
        checkEquality(bytes, expected);
    };
    
    // Test edge cases:
    // Bitpattern:  0..0     01..1       10..0
    // Decimal:     0        127 (2^7-1) -128 (-2^7)
    this.testInt8 = function() {
        var expectedA = [0x40, 0x14, 0x01, 0x61, 0x10, 0x00, 0x41];
        var expectedB = [0x40, 0x14, 0x01, 0x61, 0x10, 0x7F, 0x41];
        var expectedC = [0x40, 0x14, 0x01, 0x61, 0x10, 0x80, 0x41];
    
        var a = 0;
        var b = 127;
        var c = -128;
        
        var binA = new Binson().putInteger("a", a);
        var binB = new Binson().putInteger("a", b);
        var binC = new Binson().putInteger("a", c);
        
        var bytesA = binA.toBytes();
        var bytesB = binB.toBytes();
        var bytesC = binC.toBytes();
        
        checkEquality(bytesA, expectedA);
        checkEquality(bytesB, expectedB);
        checkEquality(bytesC, expectedC);
    };
    
    // Test edge cases:
    // Bitpattern:  0..0 10..0    1..1 01..1    10..0 0..0      01..1 1..1
    // Decimal      128 (2^7)     -129 (-2^7-1) -32768 (-2^15)  32767 (2^15-1)
    this.testInt16 = function() {
        var expectedA = [0x40, 0x14, 0x01, 0x61, 0x11, 0x80, 0x00, 0x41];
        var expectedB = [0x40, 0x14, 0x01, 0x61, 0x11, 0x7F, 0xFF, 0x41];
        var expectedC = [0x40, 0x14, 0x01, 0x61, 0x11, 0x00, 0x80, 0x41];
        var expectedD = [0x40, 0x14, 0x01, 0x61, 0x11, 0xFF, 0x7F, 0x41];
        
        var a = 128;
        var b = -129;
        var c = -32768;
        var d = 32767;
        
        var binA = new Binson().putInteger("a", a);
        var binB = new Binson().putInteger("a", b);
        var binC = new Binson().putInteger("a", c);
        var binD = new Binson().putInteger("a", d);
        
        var bytesA = binA.toBytes();
        var bytesB = binB.toBytes();
        var bytesC = binC.toBytes();
        var bytesD = binD.toBytes();

        checkEquality(bytesA, expectedA);
        checkEquality(bytesB, expectedB);
        checkEquality(bytesC, expectedC);
        checkEquality(bytesD, expectedD);
    };
    
           
    // Test edge cases:
    // Bitpattern:  0..0 0..0 10..0 0..0    1..1 1..1 01..1 1..1    10..0 0..0 0..0 0..0    01..1 1..1 1..1 1..1
    // Decimal:     32768 (2^15)            -32769 (-2^15-1)        -2147483648 (-2^31)      2147483647 (2^31-1)     
    this.testInt32 = function() {
        var expectedA = [0x40, 0x14, 0x01, 0x61, 0x12, 0x00, 0x80, 0x00, 0x00, 0x41];
        var expectedB = [0x40, 0x14, 0x01, 0x61, 0x12, 0xFF, 0x7F, 0xFF, 0xFF, 0x41];
        var expectedC = [0x40, 0x14, 0x01, 0x61, 0x12, 0x00, 0x00, 0x00, 0x80, 0x41];
        var expectedD = [0x40, 0x14, 0x01, 0x61, 0x12, 0xFF, 0xFF, 0xFF, 0x7F, 0x41];
        
        var a = 32768;
        var b = -32769;
        var c = -2147483648;
        var d = 2147483647;
        
        var binA = new Binson().putInteger("a", a);
        var binB = new Binson().putInteger("a", b);
        var binC = new Binson().putInteger("a", c);
        var binD = new Binson().putInteger("a", d);
        
        var bytesA = binA.toBytes();
        var bytesB = binB.toBytes();
        var bytesC = binC.toBytes();
        var bytesD = binD.toBytes();
        
        checkEquality(bytesA, expectedA);
        checkEquality(bytesB, expectedB);
        checkEquality(bytesC, expectedC);
        checkEquality(bytesD, expectedD);
    };
    
    this.testDouble = function() {
        var expectedA = [0x40, 0x14, 0x01, 0x61, 0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 0x41];
        var expectedB = [0x40, 0x14, 0x01, 0x61, 0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40, 0x41];
        var a = -3.0316488E-13;     // 0xBD5555553D0617BA
        var b = 345.3456789456789;  // 0x40759587E6A569B5
        
        var binA = new Binson().putDouble("a", a);
        var binB = new Binson().putDouble("a", b);
        
        var bytesA = binA.toBytes();
        var bytesB = binB.toBytes();
        
        checkEquality(bytesA, expectedA);
        checkEquality(bytesB, expectedB);
    };
    
    // Sanity check
    this.test1 = function() {
        var expected = [0x40, 0x14, 0x02, 0x6B, 0x31, 
                0x14, 0x06, 0x76, 0x61, 0x6C, 0x75, 0x65, 0x31, 0x41];
        var b = new Binson().putString("k1", "value1");
        var bytes = b.toBytes();
        
        checkEquality(bytes, expected);
    };
    
    this.testEmpty = function() {
        var expected = [0x40, 0x41];
        var bytes = new Binson().toBytes();
        
        checkEquality(bytes, expected);
    };
    
    this.testTwoFields = function() {
        var expected = [0x40, 0x14, 0x02, 0x6B, 0x31, 0x14, 0x02, 0x76, 0x31, 
                        0x14, 0x02, 0x6B, 0x32, 0x14, 0x02, 0x76, 0x32, 0x41];
        var b = new Binson().putString("k1", "v1").putString("k2", "v2");
        var bytes = b.toBytes();
        
        checkEquality(bytes, expected);
    };
    
    this.testNested = function() {
        var a = new Binson().putObject("b", new Binson());
        var expected = [0x40, 0x14, 0x01, 0x62, 0x40, 0x41, 0x41];
        var bytes = a.toBytes();
        
        checkEquality(bytes, expected);
    };
}

//
// ======== BinsonParserTest object ========
//

function BinsonParserTest() {
    	
	this.test1 = function() {
	    // Result should be equal to new Binson().putString("k1", "value1").
	    
		var buffer = arrayToBuffer([0x40, 0x14, 0x02, 0x6B, 0x31, 
		                            0x14, 0x06, 0x76, 0x61, 0x6C, 0x75, 0x65, 0x31, 0x41]);
		var binson = new BinsonParser().parse(buffer, 0);
		var k1 = binson.get("k1");
		
		if (!(k1 === "value1")) {
		    throw new Error("test1 - " + k1);
		}
	};
	
	this.test1WithParseFunction = function() {
        // Result should be equal to new Binson().putString("k1", "value1").
        
        var buffer = arrayToBuffer([0x40, 0x14, 0x02, 0x6B, 0x31, 
                                    0x14, 0x06, 0x76, 0x61, 0x6C, 0x75, 0x65, 0x31, 0x41]);
        var binson = Binson.parse(buffer, 0);
        var k1 = binson.get("k1");
        
        if (!(k1 === "value1")) {
            throw new Error("test1 - " + k1);
        }
    };
	
	this.testTwoFields = function() {
	    var buffer = arrayToBuffer([0x40, 0x14, 0x02, 0x6B, 0x31, 0x14, 0x02, 0x76, 0x31, 
	                                0x14, 0x2, 0x6B, 0x32, 0x14, 0x02, 0x76, 0x32, 0x41]);
	    var binson = new BinsonParser().parse(buffer, 0);
	    var k1 = binson.get("k1");
	    var k2 = binson.get("k2");
	    
	    if (!(k1 === "v1")) {
	        throw new Error("testTwoFields, k1 - " + k1);
	    }
	    
	    if (!(k2 === "v2")) {
            throw new Error("testTwoFields, k2 - " + k2);
        }
	};
	
	this.testEmpty = function() {
	    var buffer = arrayToBuffer([0x40, 0x41]);
        var binson = new BinsonParser().parse(buffer, 0);
	};
	
	this.testNested = function() {
	    var buffer = arrayToBuffer([0x40, 0x14, 0x01, 0x62, 0x40, 0x41, 0x41]);    // {b={};}
	    var binson = new BinsonParser().parse(buffer, 0);
	    var nested = binson.get("b");
	    
	    if (nested === undefined) {
	        throw new Error("testNested, undefined");
	    }
	};
	
	this.testBytes = function() {
	    var buffer = arrayToBuffer([0x40, 0x14, 0x04, 0x61, 0x61, 0x61, 0x61, 
	                                0x18, 0x04, 0x00, 0x00, 0x00, 0x00, 0x41]);
	           // {aaaa=0x00000000;}
	    var binson = new BinsonParser().parse(buffer, 0);
	    var aaaa = binson.get("aaaa");
	    
	    if (aaaa === undefined) {
            throw new Error("testBytes, aaaa undefined");
        }
        
        if (!(aaaa instanceof Uint8Array)) {
            throw new Error("testBytes, unexpected type, " + typeof(aaaa) + ", " + aaaa);
        }
	};
	
    this.testParseBytes = function() {
        var buffer = new ArrayBuffer(40);
        var u8 = new Uint8Array(buffer);
        
        // {ek=0x111...;}   32-long byte array ("ek").       
        var data = [
            0x40, 0x14, 0x02, 0x65, 0x6B, 0x18, 0x20, 0xDE,
            0x52, 0xA1, 0xB7, 0xF1, 0xB6, 0x7E, 0xB4, 0x61, 
            0x28, 0x53, 0xCC, 0xFB, 0xBC, 0x72, 0xC3, 0xEC, 
            0x54, 0xA8, 0x80, 0x77, 0xD9, 0x2C, 0x74, 0xFD, 
            0xF8, 0xAB, 0x7B, 0x6C, 0x6C, 0x64, 0x38, 0x41
        ];
        
        for (var i = 0; i < data.length; i++) {
            u8[i] = data[i];
        }
        
        var b = Binson.parse(buffer, 0);
        var ek = b.get("ek");
        if (ek === undefined) {
            throw new Error("testParseBytes, ek undefined");
        }
    };
    
  
    this.testLargeByteArray = function() {
        var buffer = new ArrayBuffer(300);   // more than 127, size in two bytes
        var b1 = new Binson();
        b1.putBytes("bytes", buffer);
        
        var b2 = Binson.parse(b1.toBytes());
        
        var byteLen = b2.get("bytes").byteLength;
        if (byteLen != 300) {
            throw new Error("byteLen " + byteLen);
        }
    };
    
    this.testBoolean = function() {
        var b1 = new Binson();
        var boolName = "aaa";
        var boolValue = true;
        b1.putBoolean(boolName, boolValue);
        
        var b2 = Binson.parse(b1.toBytes());
        var bool = b2.get(boolName);
        if (bool !== boolValue) {
            throw new Error("input boolean does not match parsed boolean. \n\t" +
                    "Input: " + boolValue + "\n\t" +
                    "Parsed: " + bool);
        } 
    };
    
    this.testMixed = function() {
        var b1 = new Binson();
        var aName = "a";
        var aVal = true;
        var bName = "b";
        var bVal = new ArrayBuffer(10);
        var cName = "c";
        var cVal = "ABCDE";
        
        b1.putBoolean(aName, aVal);
        b1.putBytes(bName, bVal);
        b1.putString(cName, cVal);
        
        var b2 = Binson.parse(b1.toBytes());
        var bool = b2.get(aName);
        var arr = b2.get(bName);
        var str = b2.get(cName);
        
        if(!bool) {
            throw new Error("bool not true, is: " + bool);
        }
        if(arr.byteLength != 10) {
            throw new Error("byte buffer not 10 bytes, is: " + arr.byteLength);
        }
        if(str !== cVal) {
            throw new Error("string not " + cVal + ", is: " + str);
        }
    };
    
    this.testParseDouble = function() {
        var b1 = new Binson();
        var aName = "a";
        var aVal  = 345.3456789456789;
        
        b1.putDouble(aName, aVal);
        
        var b2 = Binson.parse(b1.toBytes());
        var double = b2.get(aName);
        
        if (aVal !== double) {
            throw new Error("input double does not match parsed double. \n\t" + 
                    "Input: " + aVal + "\n\t" +
                    "Parsed: " + double);
        }
    }
    
    this.testParseDoubleRandom = function() {
        var a1, a2, b1, b2;
        var tests = 50;
        
        for (var i = 0; i < tests; i++) {
            a1 = Math.random() * Math.pow(2, i);
            b1 = new Binson().putDouble("a", a1);
            b2 = Binson.parse(b1.toBytes());
            a2 = b2.get("a");
            
            if (a1 !== a2) {
                throw new Error("input double does not match parsed double. \n\t" +
                        "Input: " + a1 + "\n\t" + 
                        "Parsed: " + a2);
            }
        }
        
    }
    
    // Test for:
    // i in [0xFF, 0x7F]
    this.testParseInt8 = function() {
        var expected = [0x40, 0x14, 0x01, 0x61, 0x10, 0x00, 0x41];
        var b1 = new Binson();
        var aName = "a";
        var aVal = 0x00;
        b1.putInteger(aName, aVal);
        
        var b2 = Binson.parse(b1.toBytes());
        var int = b2.get(aName);
        
        if (int !== aVal) {
            throw new Error("input integer does not match parsed integer. \n\t" +
                    "Input: " + aVal + "\n\t" +
                    "Parsed: " + int);
        }
    };

    
    
    // Test for:
    // i in [0xFFFF, 0x7FFF], except [0xFF7F, 0x007F]
    this.testParseInt16 = function() {
        var expected = [0x40, 0x14, 0x01, 0x61, 0x11, 0x34, 0x12, 0x41];
        var b1 = new Binson();
        var aName = "a";
        var aVal = 0x1234;
        b1.putInteger(aName, aVal);
        
        var b2 = Binson.parse(b1.toBytes());
        var int = b2.get(aName);
        
        if (int !== aVal) {
            throw new Error("input integer does not match parsed integer. \n\t" +
                    "Input: " + aVal + "\n\t" +
                    "Parsed: " + int);
        }
    };
    
    // Test for:
    // i in [0xFFFFFFFF, 0x7FFFFFFF], except [0xFFFF7FFF, 0x0000FFFF]
    this.testParseInt32 = function() {
        var expected = [0x40, 0x14, 0x01, 0x61, 0x12, 0x78, 0x56, 0x34, 0x12, 0x41];
        var b1 = new Binson();
        var aName = "a";
        var aVal = 0x12345678;
        b1.putInteger(aName, aVal);
        
        var b2 = Binson.parse(b1.toBytes());
        var int = b2.get(aName);
        
        if (int !== aVal) {
            throw new Error("input integer does not match parsed integer. \n\t" +
                    "Input: " + aVal + "\n\t" +
                    "Parsed: " + int);
        }
    };
    
    this.testParseIntRandom = function() {
        var a1, a2, b1, b2;
        var tests = 32;
        
        for (var i = 0; i < tests; i++) {
            a1 = Math.floor((Math.random() * 2 * Math.pow(2, i)) - Math.pow(2, i));
            b1 = new Binson().putInteger("a", a1);
            b2 = Binson.parse(b1.toBytes());
            a2 = b2.get("a");
            
            if (a1 !== a2) {
                throw new Error("input integer does not match parsed integer. \n\t" +
                        "Input: " + a1 + "\n\t" +
                        "Parsed: " + a2);
            }
        }
    };
}
 
