// var webIDL = require('./webIDL.js');
// load('webIDL.js');
let webIDL = {loadWasm};

// Table with an entry for the document and for the canvas context.
let table = new WebAssembly.Table({ initial: 2, element: "anyref"});
table.set(0, document);

let moduleImports = {
  env: {
    memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
    table: table,
  },
  document: {
    getElementById: document.getElementById,
  },
  host: {
    getContext: HTMLCanvasElement.prototype.getContext,

    canvas: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "canvas").get,
    globalAlpha: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "globalAlpha").get,
    setGlobalAlpha: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "globalAlpha").set,
    globalCompositeOperation: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "globalCompositeOperation").get,
    setGlobalCompositeOperation: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "globalCompositeOperation").set,
    filter: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "filter").get,
    setFilter: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "filter").set,
    imageSmoothingEnabled: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "imageSmoothingEnabled").get,
    setImageSmoothingEnabled: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "imageSmoothingEnabled").set,
    imageSmoothingQuality: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "imageSmoothingQuality").get,
    setImageSmoothingQuality: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "imageSmoothingQuality").set,
    strokeStyle: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "strokeStyle").get,
    setStrokeStyle: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "strokeStyle").set,
    fillStyle: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "fillStyle").get,
    setFillStyle: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "fillStyle").set,
    shadowOffsetX: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "shadowOffsetX").get,
    setShadowOffsetX: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "shadowOffsetX").set,
    shadowOffsetY: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "shadowOffsetY").get,
    setShadowOffsetY: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "shadowOffsetY").set,
    shadowBlur: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "shadowBlur").get,
    setShadowBlur: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "shadowBlur").set,
    shadowColor: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "shadowColor").get,
    setShadowColor: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "shadowColor").set,
    lineWidth: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "lineWidth").get,
    setLineWidth: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "lineWidth").set,
    lineCap: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "lineCap").get,
    setLineCap: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "lineCap").set,
    lineJoin: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "lineJoin").get,
    setLineJoin: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "lineJoin").set,
    miterLimit: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "miterLimit").get,
    setMiterLimit: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "miterLimit").set,
    lineDashOffset: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "lineDashOffset").get,
    setLineDashOffset: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "lineDashOffset").set,
    font: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "font").get,
    setFont: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "font").set,
    textAlign: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "textAlign").get,
    setTextAlign: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "textAlign").set,
    textBaseline: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "textBaseline").get,
    setTextBaseline: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "textBaseline").set,
    direction: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "direction").get,
    setDirection: Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "direction").set,
    addHitRegion: CanvasRenderingContext2D.prototype.addHitRegion,
    arc: CanvasRenderingContext2D.prototype.arc,
    arcTo: CanvasRenderingContext2D.prototype.arcTo,
    beginPath: CanvasRenderingContext2D.prototype.beginPath,
    bezierCurveTo: CanvasRenderingContext2D.prototype.bezierCurveTo,
    clearHitRegions: CanvasRenderingContext2D.prototype.clearHitRegions,
    clearRect: CanvasRenderingContext2D.prototype.clearRect,
    clip: CanvasRenderingContext2D.prototype.clip,
    closePath: CanvasRenderingContext2D.prototype.closePath,
    createImageData: CanvasRenderingContext2D.prototype.createImageData,
    createLinearGradient: CanvasRenderingContext2D.prototype.createLinearGradient,
    createPattern: CanvasRenderingContext2D.prototype.createPattern,
    createRadialGradient: CanvasRenderingContext2D.prototype.createRadialGradient,
    drawFocusIfNeeded: CanvasRenderingContext2D.prototype.drawFocusIfNeeded,
    drawImage: CanvasRenderingContext2D.prototype.drawImage,
    ellipse: CanvasRenderingContext2D.prototype.ellipse,
    fill: CanvasRenderingContext2D.prototype.fill,
    fillRect: CanvasRenderingContext2D.prototype.fillRect,
    fillText: CanvasRenderingContext2D.prototype.fillText,
    getContextAttributes: CanvasRenderingContext2D.prototype.getContextAttributes,
    getImageData: CanvasRenderingContext2D.prototype.getImageData,
    getLineDash: CanvasRenderingContext2D.prototype.getLineDash,
    getTransform: CanvasRenderingContext2D.prototype.getTransform,
    isContextLost: CanvasRenderingContext2D.prototype.isContextLost,
    isPointInPath: CanvasRenderingContext2D.prototype.isPointInPath,
    isPointInStroke: CanvasRenderingContext2D.prototype.isPointInStroke,
    lineTo: CanvasRenderingContext2D.prototype.lineTo,
    measureText: CanvasRenderingContext2D.prototype.measureText,
    moveTo: CanvasRenderingContext2D.prototype.moveTo,
    putImageData: CanvasRenderingContext2D.prototype.putImageData,
    quadraticCurveTo: CanvasRenderingContext2D.prototype.quadraticCurveTo,
    rect: CanvasRenderingContext2D.prototype.rect,
    removeHitRegion: CanvasRenderingContext2D.prototype.removeHitRegion,
    resetTransform: CanvasRenderingContext2D.prototype.resetTransform,
    restore: CanvasRenderingContext2D.prototype.restore,
    rotate: CanvasRenderingContext2D.prototype.rotate,
    save: CanvasRenderingContext2D.prototype.save,
    scale: CanvasRenderingContext2D.prototype.scale,
    scrollPathIntoView: CanvasRenderingContext2D.prototype.scrollPathIntoView,
    setLineDash: CanvasRenderingContext2D.prototype.setLineDash,
    setTransform: CanvasRenderingContext2D.prototype.setTransform,
    stroke: CanvasRenderingContext2D.prototype.stroke,
    strokeRect: CanvasRenderingContext2D.prototype.strokeRect,
    strokeText: CanvasRenderingContext2D.prototype.strokeText,
    transform: CanvasRenderingContext2D.prototype.transform,
    translate: CanvasRenderingContext2D.prototype.translate,

    addColorStop: CanvasGradient.prototype.addColorStop,

    reportLineWidth: (w => console.log("line width", w)),
  },
};

const use_js_glue = false;

if (use_js_glue) {
  moduleImports.document.getElementById =
      (doc, ptr, len) => doc.getElementById(Pointer_stringify(ptr, len)),

  moduleImports.host.getContext =
      (canvas, ptr, len) => canvas.getContext(Pointer_stringify(ptr, len));
  moduleImports.host.setStrokeStyle =
      (ctx, ptr, len) => ctx.strokeStyle = Pointer_stringify(ptr, len);
  moduleImports.host.setFillStyle =
      (ctx, ptr, len) => ctx.fillStyle = Pointer_stringify(ptr, len);
  moduleImports.host.fill = (ctx) => ctx.fill();

  moduleImports.host.setLineWidth = (ctx, x) => ctx.lineWidth = x;
  moduleImports.host.arc = (ctx, a, b, c, d, e, f) => ctx.arc(a, b, c, d, e, f),
  moduleImports.host.beginPath = (ctx) => ctx.beginPath();
  moduleImports.host.closePath = (ctx) => ctx.closePath();
  moduleImports.host.lineTo = (ctx, a, b) => ctx.lineTo(a, b);
  moduleImports.host.moveTo = (ctx, a, b) => ctx.moveTo(a, b);
  moduleImports.host.stroke = (ctx) => ctx.stroke();
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

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

async function load() {
  let wasm = await webIDL.loadWasm('canvas.wasm', moduleImports);

  // Initialize data in Wasm memory (easier to do here and not in the hot loop)
  let memory = moduleImports['env']['memory'],
      f32 = new Float32Array(memory.buffer),
      u32 = new Uint32Array(memory.buffer);

  let w = 1000, h = 1000, num_particles = 1000;

  function init_particle(i) {
    let idx = i * 3;
    f32[idx + 64] =  Math.round( Math.random() * w);     // x
    f32[idx + 65] =  Math.round( Math.random() * h);     // y
    u32[idx + 66] = Math.round( Math.random() * 4);      // color index
    f32[idx + 64 + 3000] = Math.round( Math.random() * 1) + 1;  // radius
    f32[idx + 65 + 3000] = Math.round( Math.random() * 3) - 1.5;  // dx
    f32[idx + 66 + 3000] = Math.round( Math.random() * 3) - 1.5;  // dy
  }

  for (let i = 0; i < num_particles; i++) {
    init_particle(i);
  }

  wasm.exports.main();

  let min = Infinity;

  function loop(){
    const start = performance.now();

    wasm.exports.draw();

    const end = performance.now();
    min = Math.min(min, end - start);

    console.log(`${min} ms`);

    requestAnimFrame(loop);
  }
  loop();
}
load();

