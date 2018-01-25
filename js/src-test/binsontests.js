var Binson = require('./../src/binson.js')


// Tests for binson.js.
// Run tests with code: [runBinsonTests()]. See JavaScript console for output.
//
// Authors: Frans Lundberg & Felix Grape
//

// ======== Functions ========

exports.run = () => {
	runBinsonTests()
}

// Takes array of numbers, returns ArrayBuffer
function arrayToBuffer(array) {
	var uints = new Uint8Array(array);
	return uints.buffer;
}

function runBinsonTests() {
	var b = new BinsonTest();

	var testSuit = [
		// Binson Object Testing
		{name: "b.testBytes", f:b.testBytes},
		{name: "b.testBytesLong", f:b.testBytesLong},
		{name: "b.testBytesString", f:b.testBytesString},

		{name: "b.testString", f:b.testString},
		{name: "b.testStringEmoji", f:b.testStringEmoji},
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
		{name: "b.testOrdering", f:b.testOrdering}
	];

	console.log("Binson tests starting...")

	var passed = 0;
	for (var i = 0; i < testSuit.length; i++) {
		var test = testSuit[i];
		try {
			test.f();
			passed++
			//console.log("OK " + test.name);
		} catch (ex) {
			console.error("ERROR " + test.name + ", " + ex);
		}
	}

	if (passed == testSuit.length) {
		console.log("All " + testSuit.length + " binson tests passed")
	} else {
		console.log(passed + "/" + testSuit.length + " binson tests passed")
	}
	console.log()
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

		if (binA.hasBytes("a")) {
			var res = binA.getBytes("a");
		} else {
			throw new Error("Field a not found");
		}

		if (binA.hasBytes("B")) {
			throw new Error("Field B found");
		}

		if (binB.hasBytes("a")) {
			var res = binB.getBytes("a");
		} else {
			throw new Error("Field a not found");
		}

		if (binB.hasBytes("B")) {
			throw new Error("Field B found");
		}
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
		var exception = false;
		try {
			new Binson().putBytes("a", "a");
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put string with putBytes");
		}
	};

	this.testString = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x14, 0x01, 0x62, 0x41];
		var b = new Binson().putString("a", "b");
		var bytes = b.toBytes();

		checkEquality(bytes, expected);

		if (b.hasString("a")) {
			var res = b.getString("a");
			if (res !== "b") {
				throw new Error("Field value not as expected");
			}
		} else {
			throw new Error("Field a not found");
		}

		if (b.hasString("B")) {
			throw new Error("Field B found");
		}
	};

	this.testStringEmoji = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x14, 0x04, 0xF0, 0x9F, 0x98, 0x82, 0x41];
		var b = new Binson().putString("a", "😂");
		var bytes = b.toBytes();

		checkEquality(bytes, expected);

		if (b.hasString("a")) {
			var res = b.getString("a");
			if (res !== "😂") {
				throw new Error("Field value not as expected");
			}
		} else {
			throw new Error("Field a not found");
		}
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
		var exception = false;
		try {
			new Binson().putString("a", true);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put boolean with putString");
		}
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

		if (binA.hasBoolean("a")) {
			var res = binA.getBoolean("a");
			if (res !== true) {
				throw new Error("Field value not as expected");
			}
		} else {
			throw new Error("Field a not found");
		}

		if (binA.hasBoolean("B")) {
			throw new Error("Field B found");
		}
	};

	// Throws error! Putting a double with putBoolean should not work!
	this.testBooleanDouble = function() {
		var exception = false;
		try {
			new Binson().putBoolean("a", Math.PI);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put double with putBoolean");
		}
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

		if (binA.hasInteger("a")) {
			var res = binA.getInteger("a");
			if (res !== a) {
				throw new Error("Field value not as expected");
			}
		} else {
			throw new Error("Field a not found");
		}

		if (binA.hasInteger("B")) {
			throw new Error("Field B found");
		}
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
		var c = 9007199254740991;

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

	this.testInt64Pos = function() {
		var exception = false;
		try {
			new Binson().putInteger("a", 9223372036854775807);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put 2^63-1 with putInteger");
		}
	};

	// Throws error! Only 32-bit integers are supported in binson.js
	this.testInt64Neg = function() {
		var exception = false;
		try {
			new Binson().putInteger("a", -9223372036854775808);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put -2^63 with putInteger");
		}
	};

	// Throws error! You can only put integers with putInteger
	this.testIntDouble = function() {
		var exception = false;
		try {
			new Binson().putInteger("a", Math.PI);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put double with putInteger");
		}

	};

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

		if (binA.hasDouble("a")) {
			var res = binA.getDouble("a");
			if (res !== a) {
				throw new Error("Field value not as expected");
			}
		} else {
			throw new Error("Field a not found");
		}

		if (binA.hasDouble("B")) {
			throw new Error("Field B found");
		}
	};

	// Throws error! Putting an ArrayBuffer with putDouble should not work
	this.testDoubleBytes = function() {
		var exception = false;
		try {
			new Binson().putDouble("a", new ArrayBuffer(10));
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put array with putDouble");
		}

	};

	this.testArrayEmpty = function() {
		var expected = [0x40, 0x14, 0x01, 0x61, 0x42, 0x43, 0x41];

		var a = [];

		var b = new Binson().putArray("a", a);
		var bytes = b.toBytes();

		checkEquality(bytes, expected);

		if (b.hasArray("a")) {
			var res = b.getArray("a");

		} else {
			throw new Error("Field a not found");
		}

		if (b.hasArray("B")) {
			throw new Error("Field B found");
		}
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
		var exception = false;
		try {
			new Binson().putArray("a", [9223372036854775807]);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put 64 bit integer in array");
		}
	};

	// Throws error! Binson.js cannot handle 64-bit integers
	this.testArrayInt64Neg = function() {
		var exception = false;
		try {
			new Binson().putArray("a", [-9223372036854775807]);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put 64 bit integer in array");
		}
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
		var exception = false;
		try {
			new Binson().putArray("a", [1, 2, null, 3]);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put null element in array");
		}
	};

	// Throws error! Undefined is an invalid array element
	this.testArrayNestedUndefined = function() {
		// arr[1][1][2] = undefined
		var exception = false;
		try {
			new Binson().putArray("a", [true, [Math.PI, [0, 0, undefined]], false, [1,[],new Binson()]]);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put undefined element in nested array");
		}
	};

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