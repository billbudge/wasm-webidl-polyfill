// var webIDL = require('./webIDL.js');
// load('webIDL.js');
let webIDL = {loadWasm};

// Table with an entry for the document and for the canvas context.
let table = new WebAssembly.Table({ initial: 8, element: "anyref"});
table.set(0, document);
table.set(1, {});

// let table2 = new WebAssembly.Table({ initial: 2, element: "anyfunc"});

function getPropertyDescriptor(obj, prop) {
  if (!obj)
    return;
  if (obj.hasOwnProperty(prop)) {
    return Object.getOwnPropertyDescriptor(obj, prop);
  }
  return getPropertyDescriptor(Object.getPrototypeOf(obj), prop);
}

let moduleImports = {
  env: {
    memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
    table: table,
    log: (val) => console.log(val),
  },
  document: {
    get_window: getPropertyDescriptor(document, "defaultView").get,
    get_root_node: HTMLDocument.prototype.getRootNode,
    get_first_child: getPropertyDescriptor(document, "firstChild").get,
    get_next_sibling: getPropertyDescriptor(document, "nextSibling").get,
    add_event_listener: EventTarget.prototype.addEventListener,
  },
  window: {
    fetch: document.defaultView.fetch,
  },
  host: {
    promise_then: Promise.prototype.then,
    response_ok: getPropertyDescriptor(Response.prototype, "ok").get,
    response_text: Response.prototype.text,

    array_new: Array,
    array_push: Array.prototype.push,
    array_forEach: Array.prototype.forEach,
  },
};

const use_js_glue = false;

if (use_js_glue) {
  moduleImports.document.get_window = (doc) => doc.defaultView;
  moduleImports.document.get_root_node = (doc) => doc.getRootNode();
  moduleImports.document.get_first_child = (node) => node.firstChild;
  moduleImports.document.get_next_sibling = (node) => node.nextSibling;

  moduleImports.window.fetch =
      (ptr, len) => document.defaultView.fetch(Pointer_stringify(ptr, len), {});

  moduleImports.host.promise_then =
      (promise, resolve, err) => promise.then(resolve, err);
  moduleImports.host.response_ok = (response) => response.ok;
  moduleImports.host.response_text = (response) => response.text();
}

const buffer = moduleImports['env']['memory'].buffer;

const HEAP8 = new Int8Array(buffer);
const HEAP16 = new Int16Array(buffer);
const HEAP32 = new Int32Array(buffer);
const HEAPU8 = new Uint8Array(buffer);
const HEAPU16 = new Uint16Array(buffer);
const HEAPU32 = new Uint32Array(buffer);
const HEAPF32 = new Float32Array(buffer);
const HEAPF64 = new Float64Array(buffer)

function Pointer_stringify(ptr, length) {
  return String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + length));
}

async function load() {
  let wasm = await webIDL.loadWasm('dom.wasm', moduleImports);

  wasm.exports.main();
}
load();

