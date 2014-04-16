
module.exports = RecordParser;

function RecordParser(opts) {
  if (!(this instanceof RecordParser)) return new RecordParser(opts);
  opts = opts || {};
  this.opts = opts;
  this.exact = opts.exact == null? false : opts.exact;
  if (opts.header) this.header(opts.header);
  if (opts.row) this.row(opts.row);
}

RecordParser.prototype.header = function(header) {
  if (header == null) return this._header;
  this._header = header.reduce(function(obj, col, ind) {
    if (!this.exact) col = col.trim().toLowerCase();
    obj[col] = ind;
    return obj;
  }, {});
  return this;
};

RecordParser.prototype.row = function(row) {
  if (row == null) return this._row;
  this._row = row;
  return this;
};

RecordParser.prototype.col = function(name) {
  return this._row[this._header[name]];
};

RecordParser.prototype.ind = function(ind) {
  return this._row[ind];
};
