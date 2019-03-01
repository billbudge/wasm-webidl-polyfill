var webIDL = require('./webIDL.js');

var memory = new WebAssembly.Memory({ 'initial': 256, 'maximum': 256 });
var moduleImports = {
  env: {
    memory: memory,
  },
  host: {
    console_log: console.log,
    document_title: function() { return process.title; },
  },
};

var main = webIDL.loadWasm('hello_world.wasm', moduleImports);
main.exports.main();
