import Binson from './../src/binson.js';


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
	var uints = new Uint8Array(array)
	return uints.buffer;
}

function runBinsonTests() {
	var p = new BinsonParserTest();

	var testSuit = [
		// Binson Parser Testing
		{name: "p.testParseBytes", f:p.testParseBytes},
		{name: "p.testParseBytesLong", f:p.testParseBytesLong},

		{name: "p.testParseString", f:p.testParseString},
		{name: "p.testParseStringEmoji", f:p.testParseStringEmoji},
		{name: "p.testParseStringLong", f:p.testParseStringLong},

		{name: "p.testParseBoolean", f:p.testParseBoolean},

		{name: "p.testParseInt8", f:p.testParseInt8},
		{name: "p.testParseInt16", f:p.testParseInt16},
		{name: "p.testParseInt32", f:p.testParseInt32},
		{name: "p.testParseInt53", f:p.testParseInt53},
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

	console.log("Parser tests starting...")

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
		console.log("All " + testSuit.length + " parser tests passed")
	} else {
		console.log(passed + "/" + testSuit.length + " parser tests passed")
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

//
// ======== BinsonParserTest object ========
//

function BinsonParserTest() {
	this.testParseBytes = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x18, 0x04, 0x00, 0x01, 0x00, 0x00, 0x41];
		var expectedB = [0x40, 0x14, 0x01, 0x61, 0x18, 0x04, 0x00, 0x01, 0x02, 0x03, 0x41];

		var bufferA = arrayToBuffer(expectedA);
		var bufferB = arrayToBuffer(expectedB);

		var binA = Binson.fromBytes(bufferA);
		var binB = Binson.fromBytes(bufferB);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);

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

	this.testParseStringEmoji = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x14, 0x04, 0xF0, 0x9F, 0x98, 0x82, 0x41];
		var a = "😂";
		var bufferA = arrayToBuffer(expectedA);

		var binA = Binson.fromBytes(bufferA);

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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);
		var binC = Binson.fromBytes(bufferC, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);
		var binC = Binson.fromBytes(bufferC, 0);
		var binD = Binson.fromBytes(bufferD, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);
		var binC = Binson.fromBytes(bufferC, 0);
		var binD = Binson.fromBytes(bufferD, 0);

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

	this.testParseInt53 = function() {
		var a = 9007199254740991;
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x13, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x1F, 0x00, 0x41];
		var bufferA = arrayToBuffer(expectedA);
		var binA = Binson.fromBytes(bufferA, 0);
		var bytesA = binA.toBytes();
		var parsedA = binA.getInteger("a");
		if (typeof(parsedA) !== "number") {
			throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
		}
		if (a !== parsedA) {
			throw new Error("unexpected value.\n\t" +
						"Expected: " + a + "\n\t" +
						"Parsed: " + parsedA);
		}
	};

	this.testParseInt64Pos = function() {
		// TODO: When there are 64-bit integers
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x13,
			0x00, 0x00, 0x00, 0x80, 0x81, 0x00, 0x00, 0x01, 0x41];
		var a = 8070451082003742720;
		var bufferA = arrayToBuffer(expectedA);
		var bin;
		var exception = false;
		try {
			bin = Binson.fromBytes(bufferA, 0);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			console.log(bin.getInteger("a"));
			throw new Error("Able to parse 64 bit integer");
		}
	};

	// Throws error! 64-bit integers are not implemented!
	this.testParseInt64Neg = function() {
		// TODO: When there are 64-bit integers
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x13,
			0xFF, 0xFF, 0xFF, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0x41];
		var a = -2147483649;
		var bufferA = arrayToBuffer(expectedA);

		var exception = false;
		try {
			Binson.fromBytes(bufferA, 0);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put 64 bit integer");
		}
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
			b2 = Binson.fromBytes(b1.toBytes());
			a2 = b2.getInteger("a");

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);

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
			b2 = Binson.fromBytes(b1.toBytes());
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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);
		var binC = Binson.fromBytes(bufferC, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);
		var binC = Binson.fromBytes(bufferC, 0);
		var binD = Binson.fromBytes(bufferD, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);
		var binC = Binson.fromBytes(bufferC, 0);
		var binD = Binson.fromBytes(bufferD, 0);

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
		//10 1F FF FF FF FF FF FF
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
			0x13, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x1F, 0x10,
			0x43, 0x41];
		var a = 1161928703861587967;
		var bufferA = arrayToBuffer(expectedA);

		var exception = false;
		try {
			Binson.fromBytes(bufferA, 0);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to parse 64 bit integer element in array");
		}
	};

	// Throws error! 64-bit integers are not implemented!
	this.testParseArrayInt64Neg = function() {
		// TODO: When there are 64-bit integers
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
			0x13, 0xFF, 0xFF, 0xFF, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF,
			0x43, 0x41];
		var a = -2147483649;
		var bufferA = arrayToBuffer(expectedA);

		var exception = false;
		try {
			Binson.fromBytes(bufferA, 0);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Able to put undefined element in array");
		}
	};

	this.testParseArrayInts = function() {
		var expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
						0x10, 0x7F,						// int8		127
						0x11, 0xFF, 0x7F,				// int16	32767
						0x12, 0xFF, 0xFF, 0xFF, 0x7F,	// int32	2147483647
						0x43, 0x41];

		var a = [127, 32767, 2147483647];

		var bufferA = arrayToBuffer(expectedA);

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);


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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);
		var binB = Binson.fromBytes(bufferB, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var binA = Binson.fromBytes(bufferA, 0);

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

		var exception = false;
		try {
			Binson.fromBytes(bufferA, 0);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Parsed fields not in lexicographical order");
		}
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

		var exception = false;
		try {
			Binson.fromBytes(bufferA, 0);
		} catch (err) {
			exception = true;
		}
		if (!exception) {
			throw new Error("Duplicate field names parsed");
		}
	};
}