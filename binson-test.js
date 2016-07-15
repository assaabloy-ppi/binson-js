// Tests for binson.js.
// Run tests with code: [runBinsonTests()]. See JavaScript console for output.
//
// Authors: Frans Lundberg & Felix Grape
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
		// Binson Object Testing
		{name: "b.testBytes", f:b.testBytes},
		{name: "b.testBytesLong", f:b.testBytesLong},
		{name: "b.testBytesString", f:b.testBytesString},
		
		{name: "b.testString", f:b.testString},
		{name: "b.testStringLong", f:b.testStringLong},
		{name: "b.testStringBoolean", f:b.testStringBoolean},
		
		{name: "b.testBoolean", f:b.testBoolean},
		{name: "b.testBooleanDouble", f:b.testBooleanDouble},
		
		{name: "b.testInt8", f:b.testInt8},
		{name: "b.testInt16", f:b.testInt16},
		{name: "b.testInt32", f:b.testInt32},
		{name: "b.testInt53", f:b.testInt53},
		{name: "b.testInt64Pos", f:b.testInt64Pos},
		{name: "b.testInt64Neg", f:b.testInt64Neg},
		{name: "b.testIntDouble", f:b.testIntDouble},
		
		{name: "b.testDouble", f:b.testDouble},
		{name: "b.testDoubleBytes", f:b.testDoubleBytes},
		
		{name: "b.testArrayEmpty", f:b.testArrayEmpty},
		{name: "b.testArrayBoolean", f:b.testArrayBoolean},
		{name: "b.testArrayInt8", f:b.testArrayInt8},
		{name: "b.testArrayInt16", f:b.testArrayInt16},
		{name: "b.testArrayInt32", f:b.testArrayInt32},
		{name: "b.testArrayInt64Pos", f:b.testArrayInt64Pos},
		{name: "b.testArrayInt64Neg", f:b.testArrayInt64Neg},
		{name: "b.testArrayInts", f:b.testArrayInts},
		{name: "b.testArrayDouble", f:b.testArrayDouble},
		{name: "b.testArrayDoubles", f:b.testArrayDoubles},
		{name: "b.testArrayString", f:b.testArrayString},
		{name: "b.testArrayStringLong", f:b.testArrayStringLong},
		{name: "b.testArrayObject", f:b.testArrayObject},
		{name: "b.testArrayObjects", f:b.testArrayObjects},
		{name: "b.testArrayBytes", f:b.testArrayBytes},
		{name: "b.testArrayBytesLong", f:b.testArrayBytesLong},
		{name: "b.testArrayNested", f:b.testArrayNested},
		{name: "b.testArrayNull", f:b.testArrayNull},
		{name: "b.testArrayNestedUndefined", f:b.testArrayNestedUndefined},
		
		{name: "b.testObjectEmpty", f:b.testObjectEmpty},
		{name: "b.testObjectInteger", f:b.testObjectInteger},
		
		{name: "b.testEmptyObject", f:b.testEmptyObject},
		{name: "b.testNameUnique", f:b.testNameUnique},
		{name: "b.testOrdering", f:b.testOrdering},
		
		// Binson Parser Testing
		{name: "p.testParseBytes", f:p.testParseBytes},
		{name: "p.testParseBytesLong", f:p.testParseBytesLong},
		
		{name: "p.testParseString", f:p.testParseString},
		{name: "p.testParseStringLong", f:p.testParseStringLong},
		
		{name: "p.testParseBoolean", f:p.testParseBoolean},
		
		{name: "p.testParseInt8", f:p.testParseInt8},
		{name: "p.testParseInt16", f:p.testParseInt16},
		{name: "p.testParseInt32", f:p.testParseInt32},
		{name: "p.testParseInt64Pos", f:p.testParseInt64Pos},
		{name: "p.testParseInt64Neg", f:p.testParseInt64Neg},
		{name: "p.testParseIntRandom", f:p.testParseIntRandom},
		
		{name: "p.testParseDouble", f:p.testParseDouble},
		{name: "p.testParseDoubleRandom", f:p.testParseDoubleRandom},
		
		{name: "p.testParseArrayEmpty", f:p.testParseArrayEmpty},
		{name: "p.testParseArrayBoolean", f:p.testParseArrayBoolean},
		{name: "p.testParseArrayInt8", f:p.testParseArrayInt8},
		{name: "p.testParseArrayInt16", f:p.testParseArrayInt16},
		{name: "p.testParseArrayInt32", f:p.testParseArrayInt32},
		{name: "p.testParseArrayInt64Pos", f:p.testParseArrayInt64Pos},
		{name: "p.testParseArrayInt64Neg", f:p.testParseArrayInt64Neg},
		{name: "p.testParseArrayInts", f:p.testParseArrayInts},
		{name: "p.testParseArrayDouble", f:p.testParseArrayDouble},
		{name: "p.testParseArrayDoubles", f:p.testParseArrayDoubles},
		{name: "p.testParseArrayString", f:p.testParseArrayString},
		{name: "p.testParseArrayStringLong", f:p.testParseArrayStringLong},
		{name: "p.testParseArrayObject", f:p.testParseArrayObject},
		{name: "p.testParseArrayObjects", f:p.testParseArrayObjects},
		{name: "p.testParseArrayBytes", f:p.testParseArrayBytes},
		{name: "p.testParseArrayBytesLong", f:p.testParseArrayBytesLong},
		{name: "p.testParseArrayNested", f:p.testParseArrayNested},
		
		{name: "p.testParseObjectEmpty", f:p.testParseObjectEmpty},
		{name: "p.testParseObjectInteger", f:p.testParseObjectInteger},
		
		{name: "p.testParseEmptyObject", f:p.testParseEmptyObject},
		{name: "p.testParseOrdering", f:p.testParseOrdering},
		{name: "p.testParseNameUnique", f:p.testParseNameUnique}
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
	var lenTxt = "";
	
	if (expected.length != uints.length) {
		lenTxt = "\n\t" + "Also: Length does not equal expected length. \n\t" +
			"Expected length: " + expected.length + "\n\t" +
			"Length: " + uints.length;
	}

	for (var i = 0; i < expected.length; i++) {
		if ( uints[i] != expected[i]) {
			throw new Error("at index: " + i + "\n\t"
				+ "Expected: " + expected[i].toString(16) + "\n\t"
				+ "Value: " + uints[i].toString(16) + lenTxt);
		}
	}
}


// ======== BinsonTest object ========
// See BinsonTestCoverage.txt for more information
function BinsonTest() {
	// VALUE TESTS START HERE
	this.testBytes = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x18, 0x04, 0x00, 0x00, 0x00, 0x00, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x18, 0x04, 0x00, 0x01, 0x02, 0x03, 0x41];
		
		var a = new ArrayBuffer(4);
		var b = new ArrayBuffer(4);
		var u8 = new Uint8Array(b);
		u8[0] = 0;
		u8[1] = 1;
		u8[2] = 2;
		u8[3] = 3;
		
		var binA = new Binson().putBytes("a", a);
		var binB = new Binson().putBytes("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testBytesLong = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x19, 0x80, 0x00, 
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x41];
		
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x19, 0x80, 0x00, 
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x41];
						
		var data = [0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38];
		
		var a = new ArrayBuffer(128);
		var b = new ArrayBuffer(128);
		var u8 = new Uint8Array(b);
		
		for (var i = 0; i < b.byteLength; i++) {
			u8[i] = data[i];
		}
		
		var binA = new Binson().putBytes("a", a);
		var binB = new Binson().putBytes("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);

	};
	
	// Throws error! Putting a string with putBytes should not work!
	this.testBytesString = function() {
		new Binson().putBytes("a", "a");
	};
	
	this.testString = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x14, 0x01, 0x62, 0x41];
		var b = new Binson().putString("a", "b");
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	};
	
	this.testStringLong = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x15, 0x80, 0x00,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x41];
		
		var str = "";
		str += "12345678901234567890123456789012345678901234567890";
		str += "12345678901234567890123456789012345678901234567890";
		str += "1234567890123456789012345678";
		
		var b = new Binson().putString("a", str);
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	};
	
	// Throws error! Putting a boolean with putString should not work!
	this.testStringBoolean = function() {
		new Binson().putString("a", true);
	};
	
	this.testBoolean = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x44, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x45, 0x41];
		
		var binA = new Binson().putBoolean("a", true);
		var binB = new Binson().putBoolean("a", false);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	// Throws error! Putting a double with putBoolean should not work!
	this.testBooleanDouble = function() {
		new Binson().putBoolean("a", Math.PI);
	};
	
	// Test edge cases: (bitpatterns are big-endian)
	// Bitpattern:  0..0	01..1	   		10..0
	// Decimal:		0		127 (2^7-1)		-128 (-2^7)
	// Hexadecimal:	0x00	0x7F			0x80
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
	
	// Test edge cases:	(bitpatterns and hex are big-endian)
	// Bitpattern:	0..0 10..0		1..1 01..1		10..0 0..0		01..1 1..1
	// Decimal		128 (2^7)		-129 (-2^7-1)	-32768 (-2^15)	32767 (2^15-1)
	// Hexadecimal:	0x0080			0xFF7F			0x8000			0x7FFF
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
	
		   
	// Test edge cases:	(bitpatterns are big-endian)
	// Bitpattern:  0..0 0..0 10..0 0..0	1..1 1..1 01..1 1..1	10..0 0..0 0..0 0..0	01..1 1..1 1..1 1..1
	// Decimal:	 	32768 (2^15)			-32769 (-2^15-1)		-2147483648 (-2^31)		2147483647 (2^31-1)	 
	// Hexadecimal:	0x00008000				0xFFFF7FFF				0x80000000				0x7FFFFFFF
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
	
	this.testInt53 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x13, 0x01, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x13, 0xFE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x1F, 0x00, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x13, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x1F, 0x00, 0x41];
		
		var a = 2147483649;
		var b = 9007199254740990; // Number.MAX_SAFE_INTEGER = 9007199254740991
		var c = Number.MAX_SAFE_INTEGER;
		
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
	
	// Throws error! Only 32-bit integers are supported in binson.js
	this.testInt64Pos = function() {
		// TODO: When 64-bit integers work
		var a = 2147483648;
		// This call _WILL_ throw a new Error
		var bin = new Binson().putInteger("a", a);
	};
	
	// Throws error! Only 32-bit integers are supported in binson.js
	this.testInt64Neg = function() {
		// TODO: When 64-bit integers work
		var a = -2147483649;
		// This call _WILL_ throw a new Error
		var bin = new Binson().putInteger("a", a);
	};
	
	// Throws error! You can only put integers with putInteger
	this.testIntDouble = function() {
		new Binson().putInteger("a", Math.PI);
	}
	
	// See http://www.exploringbinary.com/floating-point-converter/
	// in order to generate bitpatterns for 64-bit floats
	this.testDouble = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40, 0x41];
		
		var a = -3.0316488E-13;		// 0xBD5555553D0617BA
		var b = 345.3456789456789;	// 0x40759587E6A569B5
		
		var binA = new Binson().putDouble("a", a);
		var binB = new Binson().putDouble("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	// Throws error! Putting an ArrayBuffer with putDouble should not work
	this.testDoubleBytes = function() {
		new Binson().putDouble("a", new ArrayBuffer(10));
	}
	
	this.testArrayEmpty = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x42, 0x43, 0x41];
		
		var a = [];
		
		var b = new Binson().putArray("a", a);
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	};
	
	this.testArrayBoolean = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x44, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x45, 0x43, 0x41];
		
		var a = [true];
		var b = [false];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testArrayInt8 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x00, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x80, 0x43, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x7F, 0x43, 0x41];
		
		var a = [0];
		var b = [-128];
		var c = [127];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		var binC = new Binson().putArray("a", c);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
	};
	
	this.testArrayInt16 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x80, 0x00, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x00, 0x80, 0x43, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x7F, 0xFF, 0x43, 0x41];
		var expectedD = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0xFF, 0x7F, 0x43, 0x41];
		
		var a = [128];
		var b = [-32768];
		var c = [-129];
		var d = [32767];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		var binC = new Binson().putArray("a", c);
		var binD = new Binson().putArray("a", d);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		var bytesD = binD.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
		checkEquality(bytesD, expectedD);
	};
	
	this.testArrayInt32 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0x00, 0x80, 0x00, 0x00, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0xFF, 0x7F, 0xFF, 0xFF, 0x43, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0x00, 0x00, 0x00, 0x80, 0x43, 0x41];
		var expectedD = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0xFF, 0xFF, 0xFF, 0x7F, 0x43, 0x41];
		
		var a = [32768];
		var b = [-32769];
		var c = [-2147483648];
		var d = [2147483647];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		var binC = new Binson().putArray("a", c);
		var binD = new Binson().putArray("a", d);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		var bytesD = binD.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
		checkEquality(bytesD, expectedD);
	};
	
	// Throws error! Binson.js cannot handle 64-bit integers
	this.testArrayInt64Pos = function() {
		// TODO: When 64-bit integers work
		var a = [2147483648];
		// This call _WILL_ throw a new Error
		var bin = new Binson().putArray("a", a);
	};
	
	// Throws error! Binson.js cannot handle 64-bit integers
	this.testArrayInt64Neg = function() {
		// TODO: When 64-bit integers work
		var a = [-2147483649];
		// This call _WILL_ throw a new Error
		var bin = new Binson().putArray("a", a);
	};
	
	this.testArrayInts = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x42,
						0x10, 0x7F,						// int8		127
						0x11, 0xFF, 0x7F,				// int16	32767
						0x12, 0xFF, 0xFF, 0xFF, 0x7F,	// int32	2147483647
						0x43, 0x41];

		var a = [127, 32767, 2147483647];
		var b = new Binson().putArray("a", a);
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);		
	};
	
	// See: http://www.exploringbinary.com/floating-point-converter/
	// in order to generate bitpatterns for 64-bit floats
	this.testArrayDouble = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x46, 0xBA, 0x17, 
							0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x46, 0xB5, 0x69, 
							0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40, 0x43, 0x41];
		
		var a = [-3.0316488E-13];
		var b = [345.3456789456789];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	// See: http://www.exploringbinary.com/floating-point-converter/
	// in order to generate bitpatterns for 64-bit floats
	this.testArrayDoubles = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x42, 
						0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 	// First double		-3.0316488E-13
						0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40,	// Second double	345.3456789456789
						0x46, 0x18, 0x2D, 0x44, 0x54, 0xFB, 0x21, 0x09, 0x40,	// Third double		Math.PI (3.141592653589793)
						0x43, 0x41];
						
		var a = [-3.0316488E-13, 345.3456789456789, Math.PI];
		var b = new Binson().putArray("a", a);
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	};
	
	this.testArrayString = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x42, 0x14, 0x01, 0x62, 0x43, 0x41];
		var a = ["b"];
		
		var b = new Binson().putArray("a", a);
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	};
	
	this.testArrayStringLong = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x42, 0x15, 0x80, 0x00,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x43, 0x41];
		
		var str = "";
		str += "12345678901234567890123456789012345678901234567890";
		str += "12345678901234567890123456789012345678901234567890";
		str += "1234567890123456789012345678";
		
		var a = [str];
		
		var b = new Binson().putArray("a", a);
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	};
	
	this.testArrayObject = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 	
						0x40, 0x41, 							// Binson object without fields
						0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 
						0x40, 0x14, 0x01, 0x61, 0x44, 0x41, 	// Binson object with a boolean field a = true
						0x43, 0x41];
		
		var a = [new Binson()];
		var b = [new Binson().putBoolean("a", true)];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testArrayObjects = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x42,
						0x40, 0x41,									// Binson object without fields
						0x40, 0x14, 0x01, 0x61, 0x44, 0x41,			// Binson object with a boolean field a = true
						0x40, 0x14, 0x01, 0x62, 0x40, 0x41, 0x41,	// Binson object with a object field b, object without fields
						0x43, 0x41];

		var a = [];
		a.push(new Binson());
		a.push(new Binson().putBoolean("a", true));
		a.push(new Binson().putObject("b", new Binson()));
		
		var b = new Binson().putArray("a", a);
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);	
	};
	
	this.testArrayBytes = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x18, 0x04, 0x00, 0x00, 0x00, 0x00, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x18, 0x04, 0x00, 0x01, 0x02, 0x03, 0x43, 0x41];
		
		var aBuff = new ArrayBuffer(4);
		var bBuff = new ArrayBuffer(4);
		var u8 = new Uint8Array(bBuff);
		u8[0] = 0;
		u8[1] = 1;
		u8[2] = 2;
		u8[3] = 3;
		
		var a = [aBuff];
		var b = [bBuff];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testArrayBytesLong = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x19, 0x80, 0x00, 
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x43, 0x41];
		
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x19, 0x80, 0x00, 
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x43, 0x41];
						
		var data = [0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38];
		
		var aBuff = new ArrayBuffer(128);
		var bBuff = new ArrayBuffer(128);
		var u8 = new Uint8Array(bBuff);
		
		for (var i = 0; i < data.length; i++) {
			u8[i] = data[i];
		}
		
		var a = [aBuff];
		var b = [bBuff];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testArrayNested = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x42, 0x43, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x42, 0x44, 0x45, 0x43, 0x43, 0x41];
		
		var a = [[]];
		var b = [[true, false]];
		
		var binA = new Binson().putArray("a", a);
		var binB = new Binson().putArray("a", b);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	// Throws error! Binson does not support null.
	this.testArrayNull = function() {
		new Binson().putArray("a", [1, 2, null, 3]);
	}
	
	// Throws error! Undefined is an invalid array element
	this.testArrayNestedUndefined = function() {
		// arr[1][1][2] = undefined
		new Binson().putArray("a", [true, [Math.PI, [0, 0, undefined]], false, [1,[],new Binson()]]);
	}
	
	this.testObjectEmpty = function() {
		var a = new Binson().putObject("b", new Binson());
		var expected = [0x40, 0x14, 0x01, 0x62, 0x40, 0x41, 0x41];
		var bytes = a.toBytes();
		
		checkEquality(bytes, expected);
	};
	
	this.testObjectInteger = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x40, 0x14, 0x01, 0x61, 0x10, 0x00, 0x41, 0x41];
		
		var bInner = new Binson().putInteger("a", 0);
		var b = new Binson().putObject("a", bInner);
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	};
	
	// PROPERTY TESTS START
	this.testEmptyObject = function() {
		var expected = [0x40, 0x41];
		var bytes = new Binson().toBytes();
		
		checkEquality(bytes, expected);
	};
	
	this.testOrdering = function() {
		// k12 and k2 in lexicographical order here
		var expected = [0x40, 0x14, 0x03, 0x6B, 0x31, 0x32, 0x14, 0x02, 0x76, 0x31, 
						0x14, 0x02, 0x6B, 0x32, 0x14, 0x02, 0x76, 0x32, 0x41];
		
		// k12 and k2 not in lexicographical order here
		var b = new Binson().putString("k2", "v2").putString("k12", "v1");
		
		// toBytes has to put k12 before k2
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	
	};
	
	this.testNameUnique = function() {
		// Make sure a2 overwrites a1
		var expected = [0x40, 0x14, 0x01, 0x61, 0x10, 0x00, 0x41];
		var a1 = true;
		var a2 = 0;
		
		var b = new Binson();
		
		b.putBoolean("a", a1); 	// bytes of b: [0x40, 0x14, 0x01, 0x61, 0x10, 0x0A, 0x41];
		b.putInteger("a", a2);
		
		var bytes = b.toBytes();
		
		checkEquality(bytes, expected);
	};
}

//
// ======== BinsonParserTest object ========
//

function BinsonParserTest() {
	this.testParseBytes = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x18, 0x04, 0x00, 0x01, 0x00, 0x00, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x18, 0x04, 0x00, 0x01, 0x02, 0x03, 0x41];
									
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		
		
		if (!(parsedA instanceof ArrayBuffer)) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(parsedB instanceof ArrayBuffer)) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testParseBytesLong = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x19, 0x80, 0x00, 
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x41];
						
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x19, 0x80, 0x00, 
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x41];
									
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		
		
		if (!(parsedA instanceof ArrayBuffer)) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(parsedB instanceof ArrayBuffer)) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	
	};
	
	this.testParseString = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x14, 0x01, 0x62, 0x41];
		var a = "b";				
		var bufferA = arrayToBuffer(expectedA);		
						
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		var parsedA = binA.get("a");
		
		if ((typeof(parsedA) !== "string")) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (a !== parsedA) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + a + "\n\t" +
						"Parsed: " + parsedA);
		}
		
		checkEquality(bytesA, expectedA);
	};
	
	this.testParseStringLong = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x15, 0x80, 0x00,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x41];
		var a = "";
		a += "12345678901234567890123456789012345678901234567890";
		a += "12345678901234567890123456789012345678901234567890";
		a += "1234567890123456789012345678";
		
		var bufferA = arrayToBuffer(expectedA);		
						
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		var parsedA = binA.get("a");
		
		if (typeof(parsedA) !== "string") {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (a !== parsedA) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + a + "\n\t" +
						"Parsed: " + parsedA);
		}
		
		checkEquality(bytesA, expectedA);
	};

	this.testParseBoolean = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x44, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x45, 0x41];
		
		var a = true;
		var b = false;
									
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		
		
		if (typeof(parsedA) !== "boolean") {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (typeof(parsedB) !== "boolean") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a !== parsedA) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + a + "\n\t" +
						"Parsed: " + parsedA);
		}
		if (b !== parsedB) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + b + "\n\t" +
						"Parsed: " + parsedB);
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testParseInt8 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x10, 0x00, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x10, 0x7F, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x10, 0x80, 0x41];
		
		var a = 0;
		var b = 127;
		var c = -128;
									
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		var bufferC = arrayToBuffer(expectedC);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		var binC = new BinsonParser().parse(bufferC, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		var parsedC = binC.get("a");
		
		if (typeof(parsedA) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (typeof(parsedB) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		if (typeof(parsedC) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a !== parsedA) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + a + "\n\t" +
						"Parsed: " + parsedA);
		}
		if (b !== parsedB) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + b + "\n\t" +
						"Parsed: " + parsedB);
		}
		if (c !== parsedC) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + c + "\n\t" +
						"Parsed: " + parsedC);
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
	};
	
	this.testParseInt16 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x11, 0x80, 0x00, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x11, 0x7F, 0xFF, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x11, 0x00, 0x80, 0x41];
		var expectedD = [0x40, 0x14, 0x01, 0x61, 0x11, 0xFF, 0x7F, 0x41];
		
		var a = 128;
		var b = -129;
		var c = -32768;
		var d = 32767;
									
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		var bufferC = arrayToBuffer(expectedC);
		var bufferD = arrayToBuffer(expectedD);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		var binC = new BinsonParser().parse(bufferC, 0);
		var binD = new BinsonParser().parse(bufferD, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		var bytesD = binD.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		var parsedC = binC.get("a");
		var parsedD = binD.get("a");
		
		if (typeof(parsedA) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (typeof(parsedB) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		if (typeof(parsedC) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		if (typeof(parsedD) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a !== parsedA) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + a + "\n\t" +
						"Parsed: " + parsedA);
		}
		if (b !== parsedB) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + b + "\n\t" +
						"Parsed: " + parsedB);
		}
		if (c !== parsedC) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + c + "\n\t" +
						"Parsed: " + parsedC);
		}
		if (d !== parsedD) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + d + "\n\t" +
						"Parsed: " + parsedD);
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
		checkEquality(bytesD, expectedD);
	};
	
	this.testParseInt32 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x12, 0x00, 0x80, 0x00, 0x00, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x12, 0xFF, 0x7F, 0xFF, 0xFF, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x12, 0x00, 0x00, 0x00, 0x80, 0x41];
		var expectedD = [0x40, 0x14, 0x01, 0x61, 0x12, 0xFF, 0xFF, 0xFF, 0x7F, 0x41];
		
		var a = 32768;
		var b = -32769;
		var c = -2147483648;
		var d = 2147483647;
									
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		var bufferC = arrayToBuffer(expectedC);
		var bufferD = arrayToBuffer(expectedD);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		var binC = new BinsonParser().parse(bufferC, 0);
		var binD = new BinsonParser().parse(bufferD, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		var bytesD = binD.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		var parsedC = binC.get("a");
		var parsedD = binD.get("a");
		
		if (typeof(parsedA) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (typeof(parsedB) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		if (typeof(parsedC) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		if (typeof(parsedD) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a !== parsedA) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + a + "\n\t" +
						"Parsed: " + parsedA);
		}
		if (b !== parsedB) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + b + "\n\t" +
						"Parsed: " + parsedB);
		}
		if (c !== parsedC) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + c + "\n\t" +
						"Parsed: " + parsedC);
		}
		if (d !== parsedD) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + d + "\n\t" +
						"Parsed: " + parsedD);
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
		checkEquality(bytesD, expectedD);
	};
	
	// Throws error! 64-bit integers are not implemented!
	this.testParseInt64Pos = function() {
		// TODO: When there are 64-bit integers
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x13, 
			0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x41];
		var a = 2147483648;				
		var bufferA = arrayToBuffer(expectedA);		
		
		// This call WILL throw an error
		var binA = new BinsonParser().parse(bufferA, 0);
	};
	
	// Throws error! 64-bit integers are not implemented!
	this.testParseInt64Neg = function() {
		// TODO: When there are 64-bit integers
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x13, 
			0xFF, 0xFF, 0xFF, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0x41];
		var a = -2147483649;				
		var bufferA = arrayToBuffer(expectedA);		
		
		// This call WILL throw an error
		var binA = new BinsonParser().parse(bufferA, 0);
	};
	
	/*
	 * This works and generates integers of all sizes with high probability
	 * for the same reasons as why Benford's law is correct.
	 *
	 * Quick reasoning: 
	 * Math.random() generates numbers in [0,1[ with uniform
	 * probability. This means that:
	 * 		* 1/2 of the generated numbers are >=1/2.
	 *		* 3/4 of the generated numbers are >=1/4.
	 *		* 7/8 of the generated numbers are >=1/8
	 *		* 2^(i-1)/2^i of the generated numbers are >=1/2^i for i > 1
	 * 
	 * In order to generate a number of size smaller than 2^(i-k) in round i, 
	 * Math.random() have to return a number of size 1/2^k or smaller.
	 *
	 * The implication of this is that it is very improbable for a generated
	 * number a in round i of the for loop to have log(a) differ from i by a lot.
	 * 
	 * More specifically: Pr[|i - log(a)| > 8] = 1/2^8 = 1/256 < 0.4% 
	 *
	 * Benford's law: https://en.wikipedia.org/wiki/Benford%27s_law
	 */
	this.testParseIntRandom = function() {
		var a1, a2, b1, b2;
		var tests = 32;		// if tests > 32 we may get a 33-bit integer
		
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
	
	this.testParseDouble = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40, 0x41];
		
		var a = -3.0316488E-13;		// 0xBD5555553D0617BA
		var b = 345.3456789456789;	// 0x40759587E6A569B5
									
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		
		
		if (typeof(parsedA) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (typeof(parsedB) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a !== parsedA) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + a + "\n\t" +
						"Parsed: " + parsedA);
		}
		if (b !== parsedB) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + b + "\n\t" +
						"Parsed: " + parsedB);
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testParseDoubleRandom = function() {
		var a1, a2, b1, b2;
		var tests = 100;
		
		for (var i = 0; i < tests; i++) {
			a1 = Math.random() * Math.pow(2, i-25) - Math.pow(2, i-26);
			b1 = new Binson().putDouble("a", a1);
			b2 = Binson.parse(b1.toBytes());
			a2 = b2.get("a");
			
			if (a1 !== a2) {
				throw new Error("input double does not match parsed double. \n\t" +
						"Input: " + a1 + "\n\t" + 
						"Parsed: " + a2);
			}
		}  
	};

	this.testParseArrayEmpty = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x43, 0x41];
		
		var a = [];

		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		var parsedA = binA.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
	};
	
	this.testParseArrayBoolean = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x44, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x45, 0x43, 0x41];
		
		var a = [true];
		var b = [false];

		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA) + "]";
			}
		}
		for (var i = 0; i < b.length; i++) {
			if (b[i] !== parsedB[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed: [" + parsedB + "]");
			}
		}

		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testParseArrayInt8 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x00, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x80, 0x43, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x7F, 0x43, 0x41];
		
		var a = [0];
		var b = [-128];
		var c = [127];

		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		var bufferC = arrayToBuffer(expectedC);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		var binC = new BinsonParser().parse(bufferC, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		var parsedC = binC.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		if (!(Array.isArray(parsedC))) {
			throw new Error("unexpected type, " + typeof(parsedC) + ", " + parsedC);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}
		if (c.length !== parsedC.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + c.length + "\n\t" +
						"Parsed length: " + parsedC.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA) + "]";
			}
		}
		for (var i = 0; i < b.length; i++) {
			if (b[i] !== parsedB[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed: [" + parsedB + "]");
			}
		}
		for (var i = 0; i < c.length; i++) {
			if (c[i] !== parsedC[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + c + "]\n\t" +
							"Parsed: [" + parsedC + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
	};
	
	this.testParseArrayInt16 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x80, 0x00, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x00, 0x80, 0x43, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x7F, 0xFF, 0x43, 0x41];
		var expectedD = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0xFF, 0x7F, 0x43, 0x41];
		
		var a = [128];
		var b = [-32768];
		var c = [-129];
		var d = [32767];

		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		var bufferC = arrayToBuffer(expectedC);
		var bufferD = arrayToBuffer(expectedD);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		var binC = new BinsonParser().parse(bufferC, 0);
		var binD = new BinsonParser().parse(bufferD, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		var bytesD = binD.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		var parsedC = binC.get("a");
		var parsedD = binD.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		if (!(Array.isArray(parsedC))) {
			throw new Error("unexpected type, " + typeof(parsedC) + ", " + parsedC);
		}
		if (!(Array.isArray(parsedD))) {
			throw new Error("unexpected type, " + typeof(parsedD) + ", " + parsedD);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}
		if (c.length !== parsedC.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + c.length + "\n\t" +
						"Parsed length: " + parsedC.length);
		}
		if (d.length !== parsedD.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + d.length + "\n\t" +
						"Parsed length: " + parsedD.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA) + "]";
			}
		}
		for (var i = 0; i < b.length; i++) {
			if (b[i] !== parsedB[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed: [" + parsedB + "]");
			}
		}
		for (var i = 0; i < c.length; i++) {
			if (c[i] !== parsedC[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + c + "]\n\t" +
							"Parsed: [" + parsedC + "]");
			}
		}
		for (var i = 0; i < c.length; i++) {
			if (d[i] !== parsedD[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + d + "]\n\t" +
							"Parsed: [" + parsedD + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
		checkEquality(bytesD, expectedD);
	};

	this.testParseArrayInt32 = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0x00, 0x80, 0x00, 0x00, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0xFF, 0x7F, 0xFF, 0xFF, 0x43, 0x41];
		var expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0x00, 0x00, 0x00, 0x80, 0x43, 0x41];
		var expectedD = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0xFF, 0xFF, 0xFF, 0x7F, 0x43, 0x41];
		
		var a = [32768];
		var b = [-32769];
		var c = [-2147483648];
		var d = [2147483647];

		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		var bufferC = arrayToBuffer(expectedC);
		var bufferD = arrayToBuffer(expectedD);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		var binC = new BinsonParser().parse(bufferC, 0);
		var binD = new BinsonParser().parse(bufferD, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		var bytesC = binC.toBytes();
		var bytesD = binD.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		var parsedC = binC.get("a");
		var parsedD = binD.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		if (!(Array.isArray(parsedC))) {
			throw new Error("unexpected type, " + typeof(parsedC) + ", " + parsedC);
		}
		if (!(Array.isArray(parsedD))) {
			throw new Error("unexpected type, " + typeof(parsedD) + ", " + parsedD);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}
		if (c.length !== parsedC.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + c.length + "\n\t" +
						"Parsed length: " + parsedC.length);
		}
		if (d.length !== parsedD.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + d.length + "\n\t" +
						"Parsed length: " + parsedD.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA) + "]";
			}
		}
		for (var i = 0; i < b.length; i++) {
			if (b[i] !== parsedB[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed: [" + parsedB + "]");
			}
		}
		for (var i = 0; i < c.length; i++) {
			if (c[i] !== parsedC[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + c + "]\n\t" +
							"Parsed: [" + parsedC + "]");
			}
		}
		for (var i = 0; i < c.length; i++) {
			if (d[i] !== parsedD[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + d + "]\n\t" +
							"Parsed: [" + parsedD + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		checkEquality(bytesC, expectedC);
		checkEquality(bytesD, expectedD);
	};
	
	// Throws error! 64-bit integers are not implemented! 
	this.testParseArrayInt64Pos = function() {
		// TODO: When there are 64-bit integers
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 
			0x13, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 
			0x43, 0x41];
		var a = 2147483648;				
		var bufferA = arrayToBuffer(expectedA);		
		
		// This call WILL throw an error
		var binA = new BinsonParser().parse(bufferA, 0);
	};
	
	// Throws error! 64-bit integers are not implemented!
	this.testParseArrayInt64Neg = function() {
		// TODO: When there are 64-bit integers
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
			0x13, 0xFF, 0xFF, 0xFF, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 
			0x43, 0x41];
		var a = -2147483649;				
		var bufferA = arrayToBuffer(expectedA);		
		
		// This call WILL throw an error
		var binA = new BinsonParser().parse(bufferA, 0);
	};
	
	this.testParseArrayInts = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
						0x10, 0x7F,						// int8		127
						0x11, 0xFF, 0x7F,				// int16	32767
						0x12, 0xFF, 0xFF, 0xFF, 0x7F,	// int32	2147483647
						0x43, 0x41];

		var a = [127, 32767, 2147483647];

		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		
		var parsedA = binA.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
	};
	
	this.testParseArrayDouble = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 
				0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 
				0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42,
				0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40, 
				0x43, 0x41];
		
		var a = [-3.0316488E-13];		// 0xBD5555553D0617BA
		var b = [345.3456789456789];	// 0x40759587E6A569B5

		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}

		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA + "]");
			}
		}
		for (var i = 0; i < b.length; i++) {
			if (b[i] !== parsedB[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed: [" + parsedB + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testParseArrayDoubles = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 
						0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 	// First double		-3.0316488E-13
						0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40,	// Second double	345.3456789456789
						0x46, 0x18, 0x2D, 0x44, 0x54, 0xFB, 0x21, 0x09, 0x40,	// Third double		Math.PI (3.141592653589793)
						0x43, 0x41];
						
		var a = [-3.0316488E-13, 345.3456789456789, Math.PI];

		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		
		var parsedA = binA.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
	};
	
	this.testParseArrayString = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x14, 0x01, 0x62, 0x43, 0x41];
		var a = ["b"];

		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		
		var parsedA = binA.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
	};
	
	this.testParseArrayStringLong = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x15, 0x80, 0x00,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
			0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x43, 0x41];
		
		var str = "";
		str += "12345678901234567890123456789012345678901234567890";
		str += "12345678901234567890123456789012345678901234567890";
		str += "1234567890123456789012345678";
		
		var a = [str];

		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		
		var parsedA = binA.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== parsedA[i]) {
				throw new Error("unexpected value in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed: [" + parsedA + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
	};
	
	this.testParseArrayObject = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 
						0x40, 0x41, 
						0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 
						0x40, 0x14, 0x01, 0x61, 0x44, 0x41, 	// Binson object with a boolean field a = true
						0x43, 0x41];
		
		var a = [new Binson()];
		var b = [new Binson().putBoolean("a", true)];
		
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");

		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}
			
		for (var i = 0; i < a.length; i++) {
			if (!(parsedA[i] instanceof Binson)) {
				throw new Error("unexpected type in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed array: [" + parsedA + "]");
			}
		}
		for (var i = 0; i < b.length; i++) {
			if (!(parsedB[i] instanceof Binson)) {
				throw new Error("unexpected type in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed array: [" + parsedB + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
		
	};
	
	this.testParseArrayObjects = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
						0x40, 0x41,									// Binson object without fields
						0x40, 0x14, 0x01, 0x61, 0x44, 0x41,			// Binson object with a boolean field a = true
						0x40, 0x14, 0x01, 0x62, 0x40, 0x41, 0x41,	// Binson object with a object field b, object without fields
						0x43, 0x41];
						
		var a = [];
		a.push(new Binson());
		a.push(new Binson().putBoolean("a", true));
		a.push(new Binson().putObject("b", new Binson()));
		
		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		
		var parsedA = binA.get("a");
		
		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
			
		for (var i = 0; i < a.length; i++) {
			if (!(parsedA[i] instanceof Binson)) {
				throw new Error("unexpected type in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed array: [" + parsedA + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		
	};
	
	this.testParseArrayBytes = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x18, 0x04, 0x00, 0x00, 0x00, 0x00, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x18, 0x04, 0x00, 0x01, 0x02, 0x03, 0x43, 0x41];
		
		var aBuff = new ArrayBuffer(4);
		var bBuff = new ArrayBuffer(4);
		var u8 = new Uint8Array(bBuff);
		u8[0] = 0;
		u8[1] = 1;
		u8[2] = 2;
		u8[3] = 3;
		
		var a = [aBuff];
		var b = [bBuff];
		
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		
		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (!(parsedA[i] instanceof ArrayBuffer)) {
				throw new Error("unexpected type in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed array: [" + parsedA + "]");
			}
		}
		for (var i = 0; i < b.length; i++) {
			if (!(parsedB[i] instanceof ArrayBuffer)) {
				throw new Error("unexpected type in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed array: [" + parsedB + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testParseArrayBytesLong = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x19, 0x80, 0x00, 
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x43, 0x41];
		
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x19, 0x80, 0x00, 
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
						0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x43, 0x41];
						
		var data = [0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
					0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38];
		
		var aBuff = new ArrayBuffer(128);
		var bBuff = new ArrayBuffer(128);
		var u8 = new Uint8Array(bBuff);
		
		for (var i = 0; i < data.length; i++) {
			u8[i] = data[i];
		}
		
		var a = [aBuff];
		var b = [bBuff];
		
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		
		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}
		
		for (var i = 0; i < a.length; i++) {
			if (!(parsedA[i] instanceof ArrayBuffer)) {
				throw new Error("unexpected type in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + a + "]\n\t" +
							"Parsed array: [" + parsedA + "]");
			}
		}
		for (var i = 0; i < b.length; i++) {
			if (!(parsedB[i] instanceof ArrayBuffer)) {
				throw new Error("unexpected type in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed array: [" + parsedB + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testParseArrayNested = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x42, 0x43, 0x43, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x42, 0x44, 0x45, 0x43, 0x43, 0x41];
		
		var a = [[]];
		var b = [[true, false]];
		
		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		var binB = new BinsonParser().parse(bufferB, 0);
		
		var bytesA = binA.toBytes();
		var bytesB = binB.toBytes();
		
		var parsedA = binA.get("a");
		var parsedB = binB.get("a");
		
		if (!(Array.isArray(parsedA))) {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (!(Array.isArray(parsedB))) {
			throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
		}
		
		if (a.length !== parsedA.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + a.length + "\n\t" +
						"Parsed length: " + parsedA.length);
		}
		if (b.length !== parsedB.length) {
			throw new Error("unexpected length.\n\t" +
						"Expected length: " + b.length + "\n\t" +
						"Parsed length: " + parsedB.length);
		}
		
		for (var i = 0; i < b.length; i++) {
			if (!(Array.isArray(parsedB[i]))) {
				throw new Error("unexpected type in array.\n\t" +
							"Position: " + i + "\n\t" +
							"Expected: [" + b + "]\n\t" +
							"Parsed array: [" + parsedB + "]");
			}
		}
		
		checkEquality(bytesA, expectedA);
		checkEquality(bytesB, expectedB);
	};
	
	this.testParseObjectEmpty = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x62, 0x40, 0x41, 0x41];
						
		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		
		var parsedA = binA.get("b");
		
		if (!(parsedA instanceof Binson)) {
			throw new Error("unexpected type. \n\t" + 
						"Expected: Binson\n\t" +
						"Parsed: " + parsedA);
		}
		
		checkEquality(bytesA, expectedA);
	};
	
	this.testParseObjectInteger = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x40, 0x14, 0x01, 0x61, 0x10, 0x00, 0x41, 0x41];
						
		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		
		var parsedAbin = binA.get("a");
		
		if (!(parsedAbin instanceof Binson)) {
			throw new Error("unexpected type. \n\t" + 
						"Expected: Binson\n\t" +
						"Parsed: " + parsedA);
		}
		
		var parsedAbinInt = parsedAbin.get("a");
		
		if (typeof(parsedAbinInt) !== "number") {
			throw new Error("unexpected type of inner field.\n\t" +
						"Expected: number\n\t" + 
						"Parsed: " + typeof(parsedAbinInt));
		}
		
		if (parsedAbinInt !== 0) {
			throw new Error("unexpected value of inner field.\n\t" +
						"Expected: " + 0 + "\n\t" + 
						"Parsed: " + parsedAbinInt);
		}
		
		checkEquality(bytesA, expectedA);
	};
	
	this.testParseEmptyObject = function() {
		var expectedA = [0x40, 0x41];
		
		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
		
		var bytesA = binA.toBytes();
		
		checkEquality(bytesA, expectedA);
	};
	
	// Throws error! 
	// First field is b = "v2"
	// Second field is a = "v1"
	// Violates sorted order of fields
	this.testParseOrdering = function() {
		var expectedA = [0x40, 
						0x14, 0x02, 0x6B, 0x32, 0x14, 0x02, 0x76, 0x32, 
						0x14, 0x03, 0x6B, 0x31, 0x32, 0x14, 0x02, 0x76, 0x31, 0x41];
		
		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
	};
	
	// Throws error!
	// Two fields with same name!
	this.testParseNameUnique = function() {
		var expectedA = [0x40, 
						0x14, 0x01, 0x61, 0x14, 0x01, 0x61, 		// a = "a"
						0x14, 0x01, 0x61, 0x14, 0x02, 0x61, 0x62, 	// a = "ab"
						0x14, 0x01, 0x62, 0x14, 0x01, 0x63,
						0x41];
		
		var bufferA = arrayToBuffer(expectedA);
		
		var binA = new BinsonParser().parse(bufferA, 0);
	};
}
