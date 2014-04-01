
# csv-record-parser

  Create CSV record parsers in an abstract way

  [![Build Status](https://travis-ci.org/jb55/csv-record-parser.png)](https://travis-ci.org/jb55/csv-record-parser)

## Installation

  Install with npm

    $ npm install csv-record-parser

## Example

The purpose of this library is to create abstract csv record parsers:

### person.js

Abstract person parser

```js
var parseNumber = require('parse-number');

module.exports = function person(csv){
  return {
    name: csv.col("name"),
    age: parseNumber(csv.col("age")),
    unknown: csv.ind(4)
  }
}
```

### csv.js

When reading csv:

```js
var recordParser = require('csv-record-parser');
var person = require('person');

var csv = recordParser();

input.on('header', function(header){
  csv.header(header);
});

input.on('row', function(row){
  csv.row(row);
  people.emit(person(csv));
}) 
```

## API

### parser(options)

headers are `.trim().toLowercase()`d before lookups unless `exact: true` is
passed to options

* `options` (`Object`)
  - `exact` (`Boolean`): header lookups match exactly (default: `false`)

returns: a new `RecordParser` instance

### Methods

#### .header(header)

Set the header, used for `col` lookups

* `header` (`Array`): array of strings representing the header

#### .row(row)

Set the row, used for `col` and `ind` lookups

* `row` (`Array`): row data

#### .col(name)

* `name` (`String`): name of column

returns: row data in specified column

#### .ind(ind)

* `ind` (`Number`): index into row

returns: row[ind]

## License

  The MIT License (MIT)

  Copyright (c) 2014 William Casarin

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
