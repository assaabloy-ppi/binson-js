binson-js
=========

A JavaScript library implementing Binson. Binson is an exceptionally simple 
data serialization format; see [binson.org](http://binson.org/).


Usage
=====

Just include binson.js in your project. It has no dependencies.

Public Functions
----------------

See binson-test.js for more detailed examples of how to use binson.js

new Binson();

    Returns a new Binson object.
    Example:
        var bin = new Binson();

Binson.parse(buffer, offset);

    Tries to parse an arraybuffer as a Binson object. The 
    parameter offset specifies where in the buffer the Binson
    object starts.
    Example:
        var buff = getArrayBuffer();
        var bin = Binson.parse(buff);

toBytes();

    Returns the Binson object as an ArrayBuffer.
    Example:
        var buff = bin.toBytes();

byteSize();

    Returns the size of the ArrayBuffer returned by toBytes();
    Example:
        var size = bin.byteSize();

toString();

    Returns a string representation of the Binson object. The 
    string is on the form "[byte1, byte2, ..., byteN]" where 
    byteI is on the form 0xQQ where QQ is a two digit 
    hexadecimal number.
    This function is first and foremost useful for Binson developers.
    Example:
        var hexString = bin.toString();

get(name);

    Returns the value with the specified name. Similar to the 
    get of a Java HashMap. Returns undefined if the Binson object
    does not have a field with the specified name.
    Example: 
        var name = bin.get("name");
        var string = "The authors name is " + name;

The following holds for ALL put functions. If there already exists 
a field with the same name it will be overwritten.

putString(name, value);

    Adds a string field with the name and value as specified. 
    Throws Error if value is not a string.
    Example:
        var bin = new Binson().putString("a", "a");
        var smallA = bin.get("a");  // "a"
        bin.putString("a", "A");
        var bigA = bin.get("a");    // "A"

putBytes(name, value);

    Adds a byte field with the name and value as specified. 
    Throws Error if value is not an ArrayBuffer.
    Example:
        var bin = new Binson();
        var u8s = getMyUint8Array();
        var buff = u8s.buffer;
        bin.putBytes(name, buff);

putObject(name, value);

    Adds a Binson field with the name and value as specified.
    Throws Error if value is not a Binson object.
    Example:
        var bin = new Binson();
        var innerBin = new Binson();
        bin.putObject(name, innerBin);

putBoolean(name, value);

    Adds a boolean field with the name and value as specified.
    Throws Error if value is not a boolean.
    Example:
        var bin = new Binson();
        var bool = true;
        bin.putBoolean(name, bool);
    
putInteger(name, value);

    Adds an integer field with the name and value as specified.
    Can currently handle values in the the range 
    2,147,483,648 <= value <= 2^53-1
    Throws Error if value is not an integer.
    Throws Error if value is not in the range specified above.
    Example:
        var bin = new Binson();
        var value = 235;
        bin.putInteger(name, value);

putDouble(name, value);

    Adds a double field with the name and value as specified.
    Throws Error if value is not a number.
    Example:
        var bin = new Binson();
        var value = 3.14;
        bin.putDouble(name, vaue);
    
putArray(name, value);

    Adds an array field with the name and value as specified.
    Throws Error if value is not an array.
    Example:
        var bin = new Binson();
        var value = [new Binson, 12, "Hello", true];
        bin.putArray(name, value);


Status
======

2016-07-15. This is work in progress. There is support for 
all Binson types except for 64-bit integers due to the fact
that all numbers in JavaScript are 64-bit floats.

There are however support for positive integers up to and including
Number.MAX_SAFE_INTEGER (9007199254740991). It is possible to both
input and parse integers up to that size. Negative numbers have to 
fit in 32 bits.


For binson-js developers
========================

View binson-test.html in your browser to run the tests. Enable the 
web console to see the output.

Requirements
------------

* Readable code.
* Extensive unit test suit.
* Must work on recent Firefox and Chrome browsers.
* Should work on most smart phone browsers.
* Should work on most tablet computers.


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


