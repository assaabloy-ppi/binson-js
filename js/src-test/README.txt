
============ OBJECT PROPERTIES ============

    1. The byte sequence must follow the format of the ABNF rule object.
    2. Values must be stored using as few bytes as possible.
    3. Fields must be stored in order. The order must be the lexicographical
        order of the [UTF-8] bytes of the name of the fields.
    4. Two fields of the same object cannot have the same name.
    5. Little-endian byte-order must be used.

    From: http://binson.org/ on 2016-06-20

    VALUE TYPE TESTS tests properties 1, 2 & 5.
    OBJECT PROPERTY TESTS tests properties 3 & 4

========= END OBJECT PROPERTIES ==========

############# BinsonTest object #############

============ VALUE TYPE TESTS ============

    Tests putting a single field. Test
    functions that tests multiple values
    does this by creating multiple
    Binson objects, one for each test case.

------ <VALUE TYPE TESTED> TESTS <(#test functions)> -------
testFunctionName - <number of tested> - <type (possibly with more details)> - <test specific info>
----------------------- END -----------------------


-------------- BYTES TESTS (3) -------------
testBytes       - 2 - bytes     - [0x00, 0x00, 0x00, 0x00] & [0x00, 0x01, 0x02, 0x03]
testBytesLong   - 2 - bytes     - 128 bytes [0x00, 0x00, ..., 0x00], and bitpattern from StringLong
testBytesString - 1 - string    - tests putBytes("a", "a")
------------------- END --------------------


-------------- STRING TESTS (4) -------------
testString          - 1 - string    - "b"
testStringEmoji     - 1 - string    - "😂"
testStringLong      - 1 - string    - 128 characters "123456789012...012345678"
testStringBoolean   - 1 - boolean   - tests putString("a", true)
-------------------- END --------------------


-------------- BOOLEAN TESTS (2) -------------
testBoolean         - 2 - boolean   - both true and false
testBooleanDouble   - 1 - double    - tests putDouble("a", Math.PI)
--------------------- END --------------------


-------------- INTEGER TESTS (7) -------------
testInt8        - 3 - integer    - 127 (largest), -128 (smallest) and 0
testInt16       - 4 - integer    - 128 (smallest+), -129 (largest-), 32767 (largest), -32768 (smallest)
testInt32       - 4 - integer    - 32768 (smallest+), -32769(largest-), 2147483647 (largest), -2147483648 (smallest)
testInt53       - 3 - integer    - 2147483649 (smallest+), 9007199254740990, 9007199254740991 (largest)
testInt64Pos    - 1 - integer    - 2^63-1 (biggest+) FAILS!
testInt64Neg    - 1 - integer    - -2^63 (biggest-) FAILS!
testIntDouble   - 1 - double     - tests putInteger("a", Math.PI)
-------------------- END --------------------


-------------- DOUBLE TESTS (2) -------------
testDouble      - 2 - double    - both negative and positive
testDoubleBytes - 1 - bytes     - tests putDouble("a", new ArrayBuffer(10))
-------------------- END --------------------


-------------- ARRAY TESTS (19) --------------
testArrayEmpty            - 1 - array                             - an empty array
testArrayBoolean          - 2 - array containing one boolean      - same as testBoolean
testArrayInt8             - 3 - array containing one int8         - same as testInt8
testArrayInt16            - 4 - array containing one int16        - same as testInt16
testArrayInt32            - 4 - array containing one int32        - same as testInt32
testArrayInt64Pos         - 1 - try to put one int64              - same as testInt64Pos
testArrayInt64Neg         - 1 - try to put one int64              - same as testInt64Neg
testArrayInts             - 1 - array containing multiple ints    - of all sizes
testArrayDouble           - 2 - array containing one double       - same as testDouble
testArrayDoubles          - 1 - array containing multilpe doubles -
testArrayString           - 1 - array containing one string       - same as testString
testArrayStringLong       - 1 - array containing one string       - same as testStringLong
testArrayObject           - 2 - array containing one object       - one empty & one non-empty
testArrayObjects          - 1 - array containing multiple objects - empty and non-empty
testArrayBytes            - 2 - array containing one bytes        - same as testBytes
testArrayBytesLong        - 2 - array containing one bytes        - same as testBytesLong
testArrayNested           - 2 - array containing one array        - both empty and non-empty
testArrayNull             - 1 - array containing a Null           -
testArrayNestedUndefined  - 1 - nested array containing an undefined value
-------------------- END --------------------


-------------- OBJECT TESTS (2) -------------
testObjectEmpty     - 1 - object    - empty
testObjectInteger   - 1 - object    - containing an integer
-------------------- END --------------------

============ END VALUE TYPE TESTS ============

______________________________________________

========= OBJECT PROPERTY TESTS (3) ========

testEmptyObject     - Property 1:   Empty object is created and written to bytes properly

testOrdering        - Property 3:   The field ordering is verified by adding fields
                                    out of order and then verifying that toBytes()
                                    writes the fields in lexicographical order.

testNameUnique     - Property 4:    Puts a boolean field a = true and then an int8 field
                                    a = 0. Expect Binson object with one field, a = 0.

========== END OBJECT PROPERTY TESTS =========

##################### END ####################


########## BinsonParserTest object ###########

============ VALUE TYPE TESTS ============

    Tests input a predefined ArrayBuffer
    to parser. The field names are fetched
    with the get method and compared
    with the expected value. Each parsed
    Binson object only contains one field.

    Test functions that tests multiple
    values does this by creating multiple
    Binson objects, one for each test case.

------ <VALUE TYPE TESTED> TESTS <(#tests)> -------
testFunctionName - <number of tested> - <object/array info> - <test specific info>
----------------------- END -----------------------


-------------- BYTES TESTS (2) -------------
testParseBytes          - 2    - bytes    - bytes as testBytes
testParseBytesLong      - 2    - bytes    - bytes as testBytesLong
------------------- END -------------------


-------------- STRING TESTS (3) -------------
testParseString        - 1  - string    - string as testString
testParseStringEmoji   - 1  - string    - string as testStringEmoji
testParseStringLong    - 1  - string    - string as testStringLong
-------------------- END -------------------


-------------- BOOLEAN TESTS (1) -------------
testParseBoolean       - 2  - boolean - boolean as testBoolean
--------------------- END -------------------


-------------- INTEGER TESTS (6) -------------
testParseInt8        - 3    - integer - integer as testInt8
testParseInt16       - 4    - integer - integer as testInt16
testParseInt32       - 4    - integer - integer as testInt32
testParseInt64Pos    - 1    - integer - integer as testInt64Pos, FAILS!
testParseInt64Neg    - 1    - integer - integer as testInt64Neg, FAILS!
testParseIntRandom   - 32   - integer - uses putInteger, not predef array, pos and neg,
                                        Pr[all integer types are tested] = very close to 1
-------------------- END --------------------


-------------- DOUBLE TESTS (2) --------------
testParseDouble        - 2    - double - double as testDouble
testParseDoubleRandom  - 100  - double - uses putDouble not predefined array,
                                         pos and neg, from ~1e-10 to ~1e20
-------------------- END --------------------


-------------- ARRAY TESTS (17) ---------------
testParseArrayEmpty        - 1 - array                             - an empty array
testParseArrayBoolean      - 2 - array containing one boolean      - as testArrayBoolean
testParseArrayInt8         - 3 - array containing one int8         - as testArrayInt8
testParseArrayInt16        - 4 - array containing one int16        - as testArrayInt16
testParseArrayInt32        - 4 - array containing one int32        - as testArrayInt32
testParseArrayInt64Pos     - 1 - array containing one int64        - as testParseInt64Pos, FAILS!
testParseArrayInt64Neg     - 1 - array containing one int64        - as testParseInt64Neg, FAILS!
testParseArrayInts         - 1 - array containing multiple ints    - as testArrayInts
testParseArrayDouble       - 2 - array containing one double       - as testArrayDouble
testParseArrayDoubles      - 1 - array containing multilpe doubles - as testArrayDoubles
testParseArrayString       - 1 - array containing one string       - as testArrayString
testParseArrayStringLong   - 1 - array containing one string       - as testArrayStringLong
testParseArrayObject       - 2 - array containing one object       - as testArrayObject
testParseArrayObjects      - 1 - array containing multiple objects - as testArrayObjects
testParseArrayBytes        - 2 - array containing one bytes        - as testArrayBytes
testParseArrayBytesLong    - 2 - array containing one bytes        - as testArrayBytesLong
testParseArrayNested       - 2 - array containing one array        - as testArrayNested
-------------------- END --------------------


-------------- OBJECT TESTS (2) --------------
testParseObjectEmpty        - 1 - object    - same as testObjectEmtpy
testParseObjectInteger      - 1 - object    - same as testObjectInteger
-------------------- END --------------------

========= OBJECT PROPERTY TESTS (3) ========

testParseEmptyObject    - Property 1:    Empty object is created and written to bytes

testParseOrdering       - Property 3:    The field ordering is verified by trying to parse an
                                            ArrayBuffer of a Binson object where the fields are
                                            not stored in lexicographical order. FAILS!

testParseNameUnique     - Property 4:    The uniqueness of names is verified by trying to parse
                                            an ArrayBuffer of a Binson object containing two
                                            fields with the same name. FAILS!

========== END OBJECT PROPERTY TESTS =========

##################### END ####################

