import Binson from './../src/binson.js';
import jsbi from './../lib/jsbi.mjs';
const test = typeof module !== 'undefined' && module.exports ? require('./tape.js') : self.test;

// Tests for binson.js.
// Run tests with code: [runBinsonTests()]. See JavaScript console for output.
//
// Authors: Frans Lundberg & Felix Grape
//

// ======== Functions ========
function arrayToBuffer(array) {
    const uints = new Uint8Array(array);
    return uints.buffer;
}

function bufferToArray(buffer) {
	return new Uint8Array(buffer);
}

//
// ======== BinsonParserTest object ========
//


test('ParseBytes', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x18, 0x04, 0x00, 0x01, 0x00, 0x00, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x18, 0x04, 0x00, 0x01, 0x02, 0x03, 0x41];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA);
	const binB = Binson.fromBytes(bufferB);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");


	if (!(parsedA instanceof ArrayBuffer)) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}
	if (!(parsedB instanceof ArrayBuffer)) {
		throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseBytesLong', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x19, 0x80, 0x00,
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

	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x19, 0x80, 0x00,
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

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");


	if (!(parsedA instanceof ArrayBuffer)) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}
	if (!(parsedB instanceof ArrayBuffer)) {
		throw new Error("unexpected type, " + typeof(parsedB) + ", " + parsedB);
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseString', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x14, 0x01, 0x62, 0x41];
	const a = "b";
	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();
	const parsedA = binA.get("a");

	if ((typeof(parsedA) !== "string")) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}
	if (a !== parsedA) {
		throw new Error("unexpected value.\n\t" +
					"Expected: " + a + "\n\t" +
					"Parsed: " + parsedA);
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseStringEmoji', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x14, 0x04, 0xF0, 0x9F, 0x98, 0x82, 0x41];
	const a = "😂";
	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA);

	const bytesA = binA.toBytes();
	const parsedA = binA.get("a");

	if ((typeof(parsedA) !== "string")) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}
	if (a !== parsedA) {
		throw new Error("unexpected value.\n\t" +
					"Expected: " + a + "\n\t" +
					"Parsed: " + parsedA);
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseStringLong', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x15, 0x80, 0x00,
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
    let a = "";
	a += "12345678901234567890123456789012345678901234567890";
	a += "12345678901234567890123456789012345678901234567890";
	a += "1234567890123456789012345678";

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();
	const parsedA = binA.get("a");

	if (typeof(parsedA) !== "string") {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}
	if (a !== parsedA) {
		throw new Error("unexpected value.\n\t" +
					"Expected: " + a + "\n\t" +
					"Parsed: " + parsedA);
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseBoolean', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x44, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x45, 0x41];

	const a = true;
	const b = false;

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");


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

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseInt8', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x10, 0x00, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x10, 0x7F, 0x41];
	const expectedC = [0x40, 0x14, 0x01, 0x61, 0x10, 0x80, 0x41];

	const a = 0;
	const b = 127;
	const c = -128;

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);
	const bufferC = arrayToBuffer(expectedC);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);
	const binC = Binson.fromBytes(bufferC, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();
	const bytesC = binC.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");
	const parsedC = binC.get("a");

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

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);
	t.deepEqual(bufferToArray(bytesC), expectedC);

	t.end();
});

test('ParseInt16', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x11, 0x80, 0x00, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x11, 0x7F, 0xFF, 0x41];
	const expectedC = [0x40, 0x14, 0x01, 0x61, 0x11, 0x00, 0x80, 0x41];
	const expectedD = [0x40, 0x14, 0x01, 0x61, 0x11, 0xFF, 0x7F, 0x41];

	const a = 128;
	const b = -129;
	const c = -32768;
	const d = 32767;

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);
	const bufferC = arrayToBuffer(expectedC);
	const bufferD = arrayToBuffer(expectedD);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);
	const binC = Binson.fromBytes(bufferC, 0);
	const binD = Binson.fromBytes(bufferD, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();
	const bytesC = binC.toBytes();
	const bytesD = binD.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");
	const parsedC = binC.get("a");
	const parsedD = binD.get("a");

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

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);
	t.deepEqual(bufferToArray(bytesC), expectedC);
	t.deepEqual(bufferToArray(bytesD), expectedD);

	t.end();
});

test('ParseInt32', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x12, 0x00, 0x80, 0x00, 0x00, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x12, 0xFF, 0x7F, 0xFF, 0xFF, 0x41];
	const expectedC = [0x40, 0x14, 0x01, 0x61, 0x12, 0x00, 0x00, 0x00, 0x80, 0x41];
	const expectedD = [0x40, 0x14, 0x01, 0x61, 0x12, 0xFF, 0xFF, 0xFF, 0x7F, 0x41];

	const a = 32768;
	const b = -32769;
	const c = -2147483648;
	const d = 2147483647;

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);
	const bufferC = arrayToBuffer(expectedC);
	const bufferD = arrayToBuffer(expectedD);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);
	const binC = Binson.fromBytes(bufferC, 0);
	const binD = Binson.fromBytes(bufferD, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();
	const bytesC = binC.toBytes();
	const bytesD = binD.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");
	const parsedC = binC.get("a");
	const parsedD = binD.get("a");

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

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);
	t.deepEqual(bufferToArray(bytesC), expectedC);
	t.deepEqual(bufferToArray(bytesD), expectedD);

	t.end();
});

test('ParseInt53', function(t) {
	const a = 9007199254740991;
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x13, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x1F, 0x00, 0x41];
	const bufferA = arrayToBuffer(expectedA);
	const binA = Binson.fromBytes(bufferA, 0);
	const parsedA = binA.getInteger("a");
	if (typeof(parsedA) !== "number") {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}
	if (a !== parsedA) {
		throw new Error("unexpected value.\n\t" +
					"Expected: " + a + "\n\t" +
					"Parsed: " + parsedA);
	}

	t.end();
});

test('ParseInt64Pos', function(t) {
	// TODO: When there are 64-bit integers
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x13,
		0x00, 0x00, 0x00, 0x80, 0x81, 0x00, 0x00, 0x01, 0x41];
	const a = 8070451082003742720;
	const bufferA = arrayToBuffer(expectedA);
	let bin = Binson.fromBytes(bufferA, 0);
	let bigInt = bin.getBigInt("a");
	t.deepEqual(bigInt, jsbi.BigInt(a));

	t.end();
});

// Throws error! 64-bit integers are not implemented!
test('ParseInt64Neg', function(t) {
	// TODO: When there are 64-bit integers
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x13,
		0xFF, 0xFF, 0xFF, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0x41];
	const a = -2147483649;
	const bufferA = arrayToBuffer(expectedA);
	let bin = Binson.fromBytes(bufferA, 0);
	let bigInt = bin.getBigInt("a");
	t.deepEqual(bigInt, jsbi.BigInt(a));

	t.end();
});

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
test('ParseIntRandom', function(t) {
    let a1, a2, b1, b2;
	const tests = 32;		// if tests > 32 we may get a 33-bit integer

	for (let i = 0; i < tests; i++) {
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

	t.end();
});

test('ParseDouble', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40, 0x41];

	const a = -3.0316488E-13;		// 0xBD5555553D0617BA
	const b = 345.3456789456789;	// 0x40759587E6A569B5

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");


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

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseDoubleRandom', function(t) {
    let a1, a2, b1, b2;
	const tests = 100;

	for (let i = 0; i < tests; i++) {
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

	t.end();
});

test('ParseArrayEmpty', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x43, 0x41];

	const a = [];

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();
	const parsedA = binA.get("a");

	if (!(Array.isArray(parsedA))) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}

	if (a.length !== parsedA.length) {
		throw new Error("unexpected length.\n\t" +
					"Expected length: " + a.length + "\n\t" +
					"Parsed length: " + parsedA.length);
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseArrayBoolean', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x44, 0x43, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x45, 0x43, 0x41];

	const a = [true];
	const b = [false];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");

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

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA) + "]";
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (b[i] !== parsedB[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed: [" + parsedB + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseArrayInt8', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x00, 0x43, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x80, 0x43, 0x41];
	const expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x10, 0x7F, 0x43, 0x41];

	const a = [0];
	const b = [-128];
	const c = [127];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);
	const bufferC = arrayToBuffer(expectedC);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);
	const binC = Binson.fromBytes(bufferC, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();
	const bytesC = binC.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");
	const parsedC = binC.get("a");

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

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA) + "]";
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (b[i] !== parsedB[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed: [" + parsedB + "]");
		}
	}
	for (let i = 0; i < c.length; i++) {
		if (c[i] !== parsedC[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + c + "]\n\t" +
						"Parsed: [" + parsedC + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);
	t.deepEqual(bufferToArray(bytesC), expectedC);

	t.end();
});

test('ParseArrayInt16', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x80, 0x00, 0x43, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x00, 0x80, 0x43, 0x41];
	const expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0x7F, 0xFF, 0x43, 0x41];
	const expectedD = [0x40, 0x14, 0x01, 0x61, 0x42, 0x11, 0xFF, 0x7F, 0x43, 0x41];

	const a = [128];
	const b = [-32768];
	const c = [-129];
	const d = [32767];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);
	const bufferC = arrayToBuffer(expectedC);
	const bufferD = arrayToBuffer(expectedD);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);
	const binC = Binson.fromBytes(bufferC, 0);
	const binD = Binson.fromBytes(bufferD, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();
	const bytesC = binC.toBytes();
	const bytesD = binD.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");
	const parsedC = binC.get("a");
	const parsedD = binD.get("a");

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

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA) + "]";
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (b[i] !== parsedB[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed: [" + parsedB + "]");
		}
	}
	for (let i = 0; i < c.length; i++) {
		if (c[i] !== parsedC[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + c + "]\n\t" +
						"Parsed: [" + parsedC + "]");
		}
	}
	for (let i = 0; i < c.length; i++) {
		if (d[i] !== parsedD[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + d + "]\n\t" +
						"Parsed: [" + parsedD + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);
	t.deepEqual(bufferToArray(bytesC), expectedC);
	t.deepEqual(bufferToArray(bytesD), expectedD);

	t.end();
});

test('ParseArrayInt32', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0x00, 0x80, 0x00, 0x00, 0x43, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0xFF, 0x7F, 0xFF, 0xFF, 0x43, 0x41];
	const expectedC = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0x00, 0x00, 0x00, 0x80, 0x43, 0x41];
	const expectedD = [0x40, 0x14, 0x01, 0x61, 0x42, 0x12, 0xFF, 0xFF, 0xFF, 0x7F, 0x43, 0x41];

	const a = [32768];
	const b = [-32769];
	const c = [-2147483648];
	const d = [2147483647];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);
	const bufferC = arrayToBuffer(expectedC);
	const bufferD = arrayToBuffer(expectedD);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);
	const binC = Binson.fromBytes(bufferC, 0);
	const binD = Binson.fromBytes(bufferD, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();
	const bytesC = binC.toBytes();
	const bytesD = binD.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");
	const parsedC = binC.get("a");
	const parsedD = binD.get("a");

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

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA) + "]";
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (b[i] !== parsedB[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed: [" + parsedB + "]");
		}
	}
	for (let i = 0; i < c.length; i++) {
		if (c[i] !== parsedC[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + c + "]\n\t" +
						"Parsed: [" + parsedC + "]");
		}
	}
	for (let i = 0; i < c.length; i++) {
		if (d[i] !== parsedD[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + d + "]\n\t" +
						"Parsed: [" + parsedD + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);
	t.deepEqual(bufferToArray(bytesC), expectedC);
	t.deepEqual(bufferToArray(bytesD), expectedD);

	t.end();
});

// Throws error! 64-bit integers are not implemented!
test('ParseArrayInt64Pos', function(t) {
	// TODO: When there are 64-bit integers
	//10 1F FF FF FF FF FF FF
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
		0x13, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x1F, 0x10,
		0x43, 0x41];
	const a = 1161928703861587967;
	const bufferA = arrayToBuffer(expectedA);

	let bin = Binson.fromBytes(bufferA, 0);
	let bigInt = bin.getBigInt("a");
	t.deepEqual(bigInt, jsbi.BigInt(a));

	t.end();
});

// Throws error! 64-bit integers are not implemented!
test('ParseArrayInt64Neg', function(t) {
	// TODO: When there are 64-bit integers
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
		0x13, 0xFF, 0xFF, 0xFF, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF,
		0x43, 0x41];
	const a = -2147483649;
	const bufferA = arrayToBuffer(expectedA);

	let bin = Binson.fromBytes(bufferA, 0);
	let bigInt = bin.getBigInt("a");
	t.deepEqual(bigInt, jsbi.BigInt(a));

	t.end();
});

test('ParseArrayInts', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
					0x10, 0x7F,						// int8		127
					0x11, 0xFF, 0x7F,				// int16	32767
					0x12, 0xFF, 0xFF, 0xFF, 0x7F,	// int32	2147483647
					0x43, 0x41];

	const a = [127, 32767, 2147483647];

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();

	const parsedA = binA.get("a");

	if (!(Array.isArray(parsedA))) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}

	if (a.length !== parsedA.length) {
		throw new Error("unexpected length.\n\t" +
					"Expected length: " + a.length + "\n\t" +
					"Parsed length: " + parsedA.length);
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseArrayDouble', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
			0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD,
			0x43, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42,
			0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40,
			0x43, 0x41];

	const a = [-3.0316488E-13];		// 0xBD5555553D0617BA
	const b = [345.3456789456789];	// 0x40759587E6A569B5

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");

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


	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA + "]");
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (b[i] !== parsedB[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed: [" + parsedB + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseArrayDoubles', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
					0x46, 0xBA, 0x17, 0x06, 0x3d, 0x55, 0x55, 0x55, 0xBD, 	// First double		-3.0316488E-13
					0x46, 0xB5, 0x69, 0xA5, 0xE6, 0x87, 0x95, 0x75, 0x40,	// Second double	345.3456789456789
					0x46, 0x18, 0x2D, 0x44, 0x54, 0xFB, 0x21, 0x09, 0x40,	// Third double		Math.PI (3.141592653589793)
					0x43, 0x41];

	const a = [-3.0316488E-13, 345.3456789456789, Math.PI];

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();

	const parsedA = binA.get("a");

	if (!(Array.isArray(parsedA))) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}

	if (a.length !== parsedA.length) {
		throw new Error("unexpected length.\n\t" +
					"Expected length: " + a.length + "\n\t" +
					"Parsed length: " + parsedA.length);
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseArrayString', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x14, 0x01, 0x62, 0x43, 0x41];
	const a = ["b"];

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();

	const parsedA = binA.get("a");

	if (!(Array.isArray(parsedA))) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}

	if (a.length !== parsedA.length) {
		throw new Error("unexpected length.\n\t" +
					"Expected length: " + a.length + "\n\t" +
					"Parsed length: " + parsedA.length);
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseArrayStringLong', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x15, 0x80, 0x00,
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

    let str = "";
	str += "12345678901234567890123456789012345678901234567890";
	str += "12345678901234567890123456789012345678901234567890";
	str += "1234567890123456789012345678";

	const a = [str];

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();

	const parsedA = binA.get("a");

	if (!(Array.isArray(parsedA))) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}

	if (a.length !== parsedA.length) {
		throw new Error("unexpected length.\n\t" +
					"Expected length: " + a.length + "\n\t" +
					"Parsed length: " + parsedA.length);
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== parsedA[i]) {
			throw new Error("unexpected value in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed: [" + parsedA + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseArrayObject', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
					0x40, 0x41,
					0x43, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42,
					0x40, 0x14, 0x01, 0x61, 0x44, 0x41, 	// Binson object with a boolean field a = true
					0x43, 0x41];

	const a = [new Binson()];
	const b = [new Binson().putBoolean("a", true)];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);


	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");

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

	for (let i = 0; i < a.length; i++) {
		if (!(parsedA[i] instanceof Binson)) {
			throw new Error("unexpected type in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed array: [" + parsedA + "]");
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (!(parsedB[i] instanceof Binson)) {
			throw new Error("unexpected type in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed array: [" + parsedB + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseArrayObjects', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42,
					0x40, 0x41,									// Binson object without fields
					0x40, 0x14, 0x01, 0x61, 0x44, 0x41,			// Binson object with a boolean field a = true
					0x40, 0x14, 0x01, 0x62, 0x40, 0x41, 0x41,	// Binson object with a object field b, object without fields
					0x43, 0x41];

	const a = [];
	a.push(new Binson());
	a.push(new Binson().putBoolean("a", true));
	a.push(new Binson().putObject("b", new Binson()));

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();

	const parsedA = binA.get("a");

	if (!(Array.isArray(parsedA))) {
		throw new Error("unexpected type, " + typeof(parsedA) + ", " + parsedA);
	}

	if (a.length !== parsedA.length) {
		throw new Error("unexpected length.\n\t" +
					"Expected length: " + a.length + "\n\t" +
					"Parsed length: " + parsedA.length);
	}

	for (let i = 0; i < a.length; i++) {
		if (!(parsedA[i] instanceof Binson)) {
			throw new Error("unexpected type in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed array: [" + parsedA + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseArrayBytes', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x18, 0x04, 0x00, 0x00, 0x00, 0x00, 0x43, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x18, 0x04, 0x00, 0x01, 0x02, 0x03, 0x43, 0x41];

	const aBuff = new ArrayBuffer(4);
	const bBuff = new ArrayBuffer(4);
	const u8 = new Uint8Array(bBuff);
	u8[0] = 0;
	u8[1] = 1;
	u8[2] = 2;
	u8[3] = 3;

	const a = [aBuff];
	const b = [bBuff];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");

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

	for (let i = 0; i < a.length; i++) {
		if (!(parsedA[i] instanceof ArrayBuffer)) {
			throw new Error("unexpected type in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed array: [" + parsedA + "]");
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (!(parsedB[i] instanceof ArrayBuffer)) {
			throw new Error("unexpected type in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed array: [" + parsedB + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseArrayBytesLong', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x19, 0x80, 0x00,
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

	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x19, 0x80, 0x00,
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

	const data = [0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30,
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

	const aBuff = new ArrayBuffer(128);
	const bBuff = new ArrayBuffer(128);
	const u8 = new Uint8Array(bBuff);

	for (let i = 0; i < data.length; i++) {
		u8[i] = data[i];
	}

	const a = [aBuff];
	const b = [bBuff];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");

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

	for (let i = 0; i < a.length; i++) {
		if (!(parsedA[i] instanceof ArrayBuffer)) {
			throw new Error("unexpected type in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + a + "]\n\t" +
						"Parsed array: [" + parsedA + "]");
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (!(parsedB[i] instanceof ArrayBuffer)) {
			throw new Error("unexpected type in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed array: [" + parsedB + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseArrayNested', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x42, 0x42, 0x43, 0x43, 0x41];
	const expectedB = [0x40, 0x14, 0x01, 0x61, 0x42, 0x42, 0x44, 0x45, 0x43, 0x43, 0x41];

	const a = [[]];
	const b = [[true, false]];

	const bufferA = arrayToBuffer(expectedA);
	const bufferB = arrayToBuffer(expectedB);

	const binA = Binson.fromBytes(bufferA, 0);
	const binB = Binson.fromBytes(bufferB, 0);

	const bytesA = binA.toBytes();
	const bytesB = binB.toBytes();

	const parsedA = binA.get("a");
	const parsedB = binB.get("a");

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

	for (let i = 0; i < b.length; i++) {
		if (!(Array.isArray(parsedB[i]))) {
			throw new Error("unexpected type in array.\n\t" +
						"Position: " + i + "\n\t" +
						"Expected: [" + b + "]\n\t" +
						"Parsed array: [" + parsedB + "]");
		}
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);
	t.deepEqual(bufferToArray(bytesB), expectedB);

	t.end();
});

test('ParseObjectEmpty', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x62, 0x40, 0x41, 0x41];

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();

	const parsedA = binA.get("b");

	if (!(parsedA instanceof Binson)) {
		throw new Error("unexpected type. \n\t" +
					"Expected: Binson\n\t" +
					"Parsed: " + parsedA);
	}

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseObjectInteger', function(t) {
	const expectedA = [0x40, 0x14, 0x01, 0x61, 0x40, 0x14, 0x01, 0x61, 0x10, 0x00, 0x41, 0x41];

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();

	const parsedAbin = binA.get("a");

	if (!(parsedAbin instanceof Binson)) {
		throw new Error("unexpected type. \n\t" +
					"Expected: Binson\n\t" +
					"Parsed: " + typeof(parsedAbin));
	}

	const parsedAbinInt = parsedAbin.get("a");

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

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

test('ParseEmptyObject', function(t) {
	const expectedA = [0x40, 0x41];

	const bufferA = arrayToBuffer(expectedA);

	const binA = Binson.fromBytes(bufferA, 0);

	const bytesA = binA.toBytes();

	t.deepEqual(bufferToArray(bytesA), expectedA);

	t.end();
});

// Throws error!
// First field is b = "v2"
// Second field is a = "v1"
// Violates sorted order of fields
test('ParseOrdering', function(t) {
	const expectedA = [0x40,
					0x14, 0x02, 0x6B, 0x32, 0x14, 0x02, 0x76, 0x32,
					0x14, 0x03, 0x6B, 0x31, 0x32, 0x14, 0x02, 0x76, 0x31, 0x41];

	const bufferA = arrayToBuffer(expectedA);

    let exception = false;
	try {
		Binson.fromBytes(bufferA, 0);
	} catch (err) {
		exception = true;
	}
	if (!exception) {
		throw new Error("Parsed fields not in lexicographical order");
	}

	t.end();
});

// Throws error!
// Two fields with same name!
test('ParseNameUnique', function(t) {
	const expectedA = [0x40,
					0x14, 0x01, 0x61, 0x14, 0x01, 0x61, 		// a = "a"
					0x14, 0x01, 0x61, 0x14, 0x02, 0x61, 0x62, 	// a = "ab"
					0x14, 0x01, 0x62, 0x14, 0x01, 0x63,
					0x41];

	const bufferA = arrayToBuffer(expectedA);

    let exception = false;
	try {
		Binson.fromBytes(bufferA, 0);
	} catch (err) {
		exception = true;
	}
	if (!exception) {
		throw new Error("Duplicate field names parsed");
	}

	t.end();
});