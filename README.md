binson-js
=========

A JavaScript library implementing Binson. Binson is an exceptionally simple
data serialization format; see [binson.org](http://binson.org/).

Table of Contents
=================
* [Status](#status)
* [Visualizer](#visualizer)
* [Usage](#usage)
  * [Adding binson-js to your project](#adding-binson-js-to-your-project)
  * [Creating Binson objects](#creating-binson-objects)
  * [Serializing Binson objects](#serializing-binson-objects)
  * [Deserializing Binson objects](#deserializing-binson-objects)
  * [Getting the byte size of Binson objects](#getting-the-byte-size-of-binson-objects)
  * [Adding or replacing field values](#adding-or-replacing-field-values)
  * [Getting field values](#getting-field-values)
  * [Checking for field existance](#checking-for-field-existance)
  * [Getting a hex string](#getting-a-hex-string)
  * [Getting a human readable string](#getting-a-human-readable-string)
  * [Binson equality](#binson-equality)
* [For binson-js developers](#for-binson-js-developers)
  * [Requirements](#requirements)
  * [GIT repo](#git-repo)


Status
======

2017-11-15. Improve error messages

2017-10-27. Add methods toJoson() and equals()

2017-10-19. Update to use module.exports. Use public domain lib to do UTF-8 encoding and decoding.

2016-08-26. Complete.
There is support for all Binson types including integers up to 32-bit in size.

There is some support for 64 bit integers. In Javascript all numbers are are
64-bit floats. Therefore JavaScript have support for integers of size +/-2^53-1.

binson.js currently support positive integers up to and including
Number.MAX_SAFE_INTEGER (2^53-1). It is possible to use both putInteger
and to parse integers up to that size. There is currently NO SUPPORT for negative
numbers that does not fit in 32 bits.

Visualizer
==========

Here is a handy dandy Binson visualizer. Just paste hex strings into the text box and get a human readable string or a C array or a Swift array etc.

http://assaabloy-ppi.github.io/binson-js/ 

Usage
=====


Adding binson-js to your project
--------------------------------

Include js/src and js/lib folders in your project and include binson using require

    var Binson = require('./path/to/binson.js')

See js/src-test/ for more detailed examples of how to use binson.js

The Binson specification states that field names has to be unique. Therefore
if you try to add a second field with the same name the first field will be
overwritten.


Creating Binson objects
-----------------------

#### new Binson() or Binson()

Binson objects are creating using the constructor. The constructor
will always be called with the **new** keyword regardless of usage.

    var bin1 = new Binson()
    var bin2 = Binson()

    console.log(bin1 instanceof Binson) // true
    console.log(bin2 instanceof Binson) // true


Serializing Binson objects
--------------------------

#### object.toBytes()

Returns an ArrayBuffer with a serialized Binson object.

    var bin = getInterestingBinson()

    var buff = bin.toBytes()


Deserializing Binson objects
----------------------------

#### Binson.parse(buffer [, offset])

Returns a Binson object. The offset argument is optional, if omitted
parsing starts at the beginning of the ArrayBuffer. Throws an error
if the buffer could not be parsed.

    var bin = Binson.parse(buff)
    var bin = Binson.parse(buff, offset)


Getting the byte size of Binson objects
---------------------------------------

#### object.byteSize()

Returns the size of the resulting ArrayBuffer of a serialized Binson object

    var sizeInBytes = bin.byteSize();


Adding or replacing field values
--------------------------------

To add a new field or replace an existing field in a
Binson object there are a set of put-methods. The
put-methods are type checked, which means that trying
to store an integer using putString will thrown an
error. The put-methods take two parameters, a field name
and a value. If a field with the specified name already
exists in the Binson object the field value is replaced.

#### object.putString(name, value);

    var bin = new Binson().putString('a', 'a');
    var smallA = bin.get('a');  // "a"
    bin.putString('a', 'A');
    var bigA = bin.get('a');    // "A"

#### object.putBytes(name, value);

    var bin = new Binson();
    var buff = getMyArrayBuffer();
    bin.putBytes('buffer', buff);

#### object.putObject(name, value);

    var bin = new Binson();
    var innerBin = new Binson();
    bin.putObject('bin', innerBin);

#### object.putBoolean(name, value);

    var bin = new Binson();
    var bool = true;
    bin.putBoolean('trueOrFalse', bool);

#### object.putInteger(name, value);

binson-js can currently handle integer values in the the
range [-2^31, 2^53-1] instead of the full range [-2^63, 2^63-1]
because of how numbers are represented in JavaScript. putInteger
throws an error if the integer is not within the valid range.

    var bin = new Binson();
    var value = 235;
    bin.putInteger('number', value);

#### object.putDouble(name, value);

    var bin = new Binson();
    var value = 3.14;
    bin.putDouble('pi', vaue);

#### object.putArray(name, value);

When adding an array every element of the array is typecheked recursively

    var bin = new Binson();
    var value = [new Binson, 12, 'Hello', true];
    bin.putArray('array', value);


Getting field values
--------------------

For every put-method there is a corresponding get-method,
and in addition to this there is one get-method that is
not type checked. All get-methods returns undefined if
no field with the specified name. The typechecked get-methods
returns undefined if there is no field of the requested type.

#### object.get(name)

It is possible to get the value of a field without any typechecking

    var bin = getAuthorBin()
    var name = bin.get('name')
    var string = 'The authors name is ' + name

#### object.getString(name)

    var bin = getAuthorBin()
    var name = bin.getString('name')
    var string = 'The authors name is ' + name

#### object.getBytes(name)

    var bin = getAuthorBin()
    var pubkey = bin.getBytes('pubkey')
    var string = 'The authors public key is ' + bytes2string(pubkey)

#### object.getObject(name)

    var bin = getAuthorBin()
    var adress = bin.getObject('adress')
    var string = 'The author lives on ' + adress.getString('street')

#### object.getBoolean(name)

    var bin = getAuthorBin()
    var alive = bin.getBoolean('alive')
    var string = 'The author is ' + (alive ? 'alive' : 'dead')

#### object.getInteger(name)

    var bin = getAuthorBin()
    var birthyear = bin.getAge('birthyear')
    var string = 'The author was born in ' + birthyear

#### object.getDouble(name)

    var bin = getAuthorBin()
    var height = bin.getDouble('height')
    var string = 'The authors height is ' + height

#### object.getArray(name)

    var bin = getAuthorBin()
    var books = bin.getArray('books')
    var string = 'The authors first book was ' + books[0]


Checking for field existance
----------------------------

#### object.hasX(name)

Every get-method has a corresponding has-method that returns true or false
depending on if the corresponding get-method would return undefined or not.
If get would return *undefined* has returns *false*, otherwise has returns *true*.

    var bin = getAuthorBin()
    var name = bin.getString('name')
    if (bin.hasString('penName')) {
        name = bin.getString('penName')
    }
    var str = 'The authors name is ' + name


Getting a hex string
--------------------

#### object.hex()

Returns the Binson object as a hex string on the form
"[byte1, byte2, ..., byteN]", where byteI is on the
form 0xQQ where Q is a hexadecimal digit.

    var bin = new Binson()
        .putString('a')
    console.log(bin.hex())  // [0x40, 0x14, 0x01, 0x61, 0x14, 0x01, 0x61, 0x41]


Getting a human readable string
-------------------------------

#### object.toBinsonString()

Returns the Binson object as a human readable string.

    var bin = new Binson()
        .putInteger('a', 4711)
        .putArray('b', [7, true])

    console.log(bin.toBinsonString())
    //  {
    //    a := 4711,
    //    b := [
    //      7,
    //      true
    //    ]
    //  }

#### object.toJson()

Returns the Binson object as a JSON string

    var bin = new Binson()
        .putInteger('a', 4711)
        .putArray('b', [7, true])
        .putBytes('c', new ArrayBuffer(2))

    console.log(bin.toJson())
    //  {
    //    "a" : 4711,
    //    "b" : [
    //      7,
    //      true
    //    ]
    //  }


Binson equality
---------------

#### object.equals(bin)

Returns true if and only if *bin* is a Binson object and serializes to the exact same ArrayBuffer as *object*.

    var bin1 = new Binson()
        .putArray('a', [17, 4711])

    var bin2 = new Binson()
        .putArray('a', [17, 4711])

    var bin3 = new Binson()
        .putArray('a', [4711, 17])

    console.log(bin1.equals(bin1)) // true
    console.log(bin1.equals(bin2)) // true
    console.log(bin1.equals(bin3)) // false


For binson-js developers
========================

To run the tests

    node js/src-test/tests.js

Requirements
------------

* Readable code.
* Extensive unit test suite.
* BinsonTestCoverage.txt should detail the test coverage
* Must work on recent Firefox and Chrome browsers.
* Should work on most smart phone browsers.
* Should work on most tablet computers.
* Must work with node.js

GIT Repo
--------

To clone:

    git clone https://github.com/assaabloy-ppi/binson-js.git

Other useful commands:

    git pull                // get updates from Github to local repo
    git status              // status of local repo
    git add README.txt      // adds README.txt to index
    git commit -m "updated README with some important info"
    git push


