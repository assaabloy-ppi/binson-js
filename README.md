binson-js
=========

A JavaScript library implementing Binson. Binson is an exceptionally simple 
data serialization format; see [binson.org](http://binson.org/).


Usage
=====

Just include binson.js in your project. It has no dependencies.


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


