// var webIDL = require('./webIDL.js');
// load('webIDL.js');
let webIDL = {loadWasm};

// Table with an entry for the document and for the canvas context.
let table = new WebAssembly.Table({ initial: 8, element: "anyref"});
table.set(0, document);

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
    getElementById: document.getElementById,
  },
  host: {
    getContext: HTMLCanvasElement.prototype.getContext,

    clear: WebGLRenderingContext.prototype.clear,
    clearColor: WebGLRenderingContext.prototype.clearColor,
  },
};

console.log(moduleImports);
console.log(WebGLRenderingContext.COLOR_BUFFER_BIT);

const use_js_glue = false;

if (use_js_glue) {
  moduleImports.document.getElementById =
      (doc, ptr, len) => doc.getElementById(Pointer_stringify(ptr, len)),

  moduleImports.host.getContext =
      (canvas, ptr, len) => canvas.getContext(Pointer_stringify(ptr, len));

  moduleImports.host.clear = (ctx, bits) => ctx.clear(bits);
  moduleImports.host.clearColor = (ctx, r, g, b, a) => ctx.clearColor(r, g, b, a);
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
  let wasm = await webIDL.loadWasm('gl.wasm', moduleImports);

  wasm.exports.main();
  wasm.exports.draw();
}
load();

