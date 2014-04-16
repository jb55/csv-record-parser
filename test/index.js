
var assert = require('better-assert');
var debug = require('debug')('csv-record-parser:test');
var recordParser = require('..');

function person(csv){
  return {
    name: csv.col('name'),
    age: +csv.col('age')
  }
}

describe('csv-record-parser', function(){
  it('works', function(){
    var header = ["name", "age"];
    var csv = recordParser().header(header);

    csv.row(["Bill", "25"]);

    var parsed = person(csv);
    debug("parsed %j", parsed);
    assert(parsed.name === "Bill");
    assert(parsed.age === 25);
  });

  it("works with spaces in header", function(){
    var header = ["name ", "age"];
    var csv = recordParser().header(header);

    csv.row(["Bill", "25"]);

    var parsed = person(csv);
    assert(parsed.name === "Bill");
    assert(parsed.age === 25);
  })

  it("works with explicit casing", function(){
    function person(csv){
      return {
        name: csv.col('Name'),
        age: +csv.col('age')
      }
    }
    var header = ["Name", "age"];

    var csv = recordParser().header(header);

    csv.row(["Bill", "25"]);

    var parsed = person(csv);
    assert(parsed.name === "Bill");
    assert(parsed.age === 25);
  })
});
