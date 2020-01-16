// var webIDL = require('./webIDL.js');
// load('webIDL.js');
let webIDL = {loadWasm};

let table = new WebAssembly.Table({ initial: 9, element: "anyref"});
table.set(0, document);
table.set(1, 'a-canvas');
table.set(2, '2d');
table.set(8, 'nonzero');

let moduleImports = {
  env: {
    memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
    table: table,
  },
  // document,
  document: {
    getElementById: document.getElementById,
    // getElementById: document.getElementById,
  },
  host: {
    getContext: HTMLCanvasElement.prototype.getContext,

    getRedColor: () => "#ff2020",  // Make JS color strings
    getBlueColor: () => "#2020ff",

    getColor: (i) => ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'][i],

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
    lineWidth: (obj) => obj.lineWidth,
    setLineWidth: (obj, w) => obj.lineWidth = w,
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
  },
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

async function load() {
  let wasm = await webIDL.loadWasm('webgl.wasm', moduleImports);

  // Initialize memory
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

  function loop(){
    wasm.exports.draw();
    requestAnimFrame(loop);
  }
  loop();
}
load();


