(import "env" "memory" (memory $0 256 256))
(import "env" "table" (table $0 2 anyref))

;; Colors array at easily indexable location.
(data (i32.const 00) "#f35d4f\00")
(data (i32.const 16) "#f36849\00")
(data (i32.const 32) "#c0d988\00")
(data (i32.const 48) "#6ddaf1\00")
(data (i32.const 64) "#f1e85b\00")

(data (i32.const 80) "a-canvas\00") ;; canvas element name
(data (i32.const 96) "2d\00")       ;; canvas context name
(data (i32.const 112) "lighter\00") ;; composite operation
(data (i32.const 128) "nonzero\00") ;; fill rule

;; 256 pages * 64KiB bytes per page:
;; [256, 49408)       => items, 2000 * 6 * sizeof(float) = 49152 bytes.

(import "document" "getElementById"
  (func $document_getElementById (param anyref i32 i32) (result anyref))
)
(import "host" "getContext"
  (func $getContext (param anyref i32 i32) (result anyref))
)
(import "host" "clearRect"
  (func $clearRect (param anyref f32 f32 f32 f32))
)
(import "host" "setGlobalCompositeOperation"
  (func $setGlobalCompositeOperation (param anyref i32 i32))
)
(import "host" "fillRect"
  (func $fillRect (param anyref f32 f32 f32 f32))
)
(import "host" "setFillStyle"
  (func $setFillStyle (param anyref i32 i32))
)
(import "host" "setStrokeStyle"
  (func $setStrokeStyle (param anyref i32 i32))
)
(import "host" "lineWidth"
  (func $lineWidth (param anyref) (result f32))
)
;; for testing return values
(import "host" "reportLineWidth"
  (func $reportLineWidth (param f32))
)
(import "host" "setLineWidth"
  (func $setLineWidth (param anyref f32))
)
(import "host" "beginPath"
  (func $beginPath (param anyref))
)
(import "host" "closePath"
  (func $closePath (param anyref))
)
(import "host" "stroke"
  (func $stroke (param anyref))
)
(import "host" "fill"
  (func $fill (param anyref))
)
(import "host" "moveTo"
  (func $moveTo (param anyref f32 f32))
)
(import "host" "lineTo"
  (func $lineTo (param anyref f32 f32))
)
(import "host" "arc"
  (func $arc (param anyref f32 f32 f32 f32 f32 i32))
)

(func $distanceSquared (param $x1 f32) (param $y1 f32) (param $x2 f32) (param $y2 f32) (result f32)
  (local $temp f32)
  local.get $x1
  local.get $x2
  f32.sub
  local.tee $temp
  local.get $temp
  f32.mul
  local.get $y1
  local.get $y2
  f32.sub
  local.tee $temp
  local.get $temp
  f32.mul
  f32.add
)

(func $draw (export "draw")
  (local $i i32)
  (local $j i32)
  (local $x f32)
  (local $y f32)
  (local $x1 f32)
  (local $y1 f32)
  (local $x2 f32)
  (local $y2 f32)
  (local $rgba1 i32)
  (local $rgba2 i32)
  (local $rad f32)
  (local $factor f32)
  (local $tmp f32)

  (call $clearRect
    (table.get $0 (i32.const 1))
    (f32.const 0)
    (f32.const 0)
    (f32.const 1000)
    (f32.const 1000)
  )
  (call $setGlobalCompositeOperation
    (table.get $0 (i32.const 1))
    (i32.const 112)
    (i32.const 7)
  )
  (call $setLineWidth
    (table.get $0 (i32.const 1))
    (f32.const 1)
  )

  (local.set $i (i32.const 0))
  (loop $outer
    (local.set $factor (f32.const 1))
    (local.set $x
      (f32.load offset=256 align=4 (local.get $i))
    )
    (local.set $y
      (f32.load offset=260 align=4 (local.get $i))
    )
    (local.set $rad
      (f32.load offset=12256 align=4 (local.get $i))
    )
    (local.set $rgba1
      (i32.load offset=264 align=4 (local.get $i))
    )

    (call $setFillStyle
      (table.get $0 (i32.const 1))
      (i32.shl (local.get $rgba1) (i32.const 4))
      (i32.const 7)
    )
    (call $setStrokeStyle
      (table.get $0 (i32.const 1))
      (i32.shl (local.get $rgba1) (i32.const 4))
      (i32.const 7)
    )

    (local.set $j (i32.const 0))
    (loop $inner
      (local.set $rgba2
        (i32.load offset=264 align=4 (local.get $j))
      )
      (local.get $rgba1)
      (local.get $rgba2)
      (i32.eq)
      (local.set $x1
        (f32.load offset=256 align=4 (local.get $i))
      )
      (local.set $y1
        (f32.load offset=260 align=4 (local.get $i))
      )
      (local.set $x2
        (f32.load offset=256 align=4 (local.get $j))
      )
      (local.set $y2
        (f32.load offset=260 align=4 (local.get $j))
      )
      (call $distanceSquared
        (local.get $x1)
        (local.get $y1)
        (local.get $x2)
        (local.get $y2)
      )
      (f32.const 2500)
      (f32.lt)
      (if (i32.and)
        (then
          (call $beginPath
            (table.get $0 (i32.const 1))
          )
          (call $moveTo
            (table.get $0 (i32.const 1))
            (local.get $x1)
            (local.get $y1)
          )
          (call $lineTo
            (table.get $0 (i32.const 1))
            (local.get $x2)
            (local.get $y2)
          )
          (call $stroke
            (table.get $0 (i32.const 1))
          )
          (local.set $factor
            (local.get $factor)
            (f32.const 1)
            (f32.add)
          )
        )
      )

      ;; loop if j != 12000
      (br_if $inner
        (i32.ne
          (i32.const 12000)
          (local.tee $j (i32.add (local.get $j) (i32.const 12)))
        )
      )
    )

    (call $beginPath
      (table.get $0 (i32.const 1))
    )
    (call $arc
      (table.get $0 (i32.const 1))
      (local.get $x)
      (local.get $y)
      (local.get $rad)
      (local.get $factor)
      (f32.mul)
      (f32.const 0)
      (f32.const 6.28318530718)  ;; 2 * PI
      (i32.const 1)              ;; true
    )
    (call $closePath
      (table.get $0 (i32.const 1))
    )
    (call $fill
      (table.get $0 (i32.const 1))
;;      (i32.const 128)
;;      (i32.const 7)
    )

    (call $beginPath
      (table.get $0 (i32.const 1))
    )
    (call $arc
      (table.get $0 (i32.const 1))
      (local.get $x)
      (local.get $y)
      (local.get $rad)
      (f32.const 5)
      (f32.add)
      (local.get $factor)
      (f32.mul)
      (f32.const 0)
      (f32.const 6.28318530718)  ;; 2 * PI
      (i32.const 1)              ;; true
    )
    (call $closePath
      (table.get $0 (i32.const 1))
    )
    (call $stroke
      (table.get $0 (i32.const 1))
    )

    (local.set $tmp
      (f32.load offset=12260 align=4 (local.get $i))
    )
    (f32.store offset=256 align=4 (local.get $i)
      (local.get $x)
      (local.get $tmp)
      (f32.add)
      (select
        (local.tee $tmp)
        (f32.const 0)
        (f32.lt (local.get $tmp) (f32.const 1000))
      )
      (select
        (local.tee $tmp)
        (f32.const 1000)
        (f32.ge (local.get $tmp) (f32.const 0))
      )
    )

    (local.set $tmp
      (f32.load offset=12264 align=4 (local.get $i))
    )
    (f32.store offset=260 align=4 (local.get $i)
      (local.get $y)
      (local.get $tmp)
      (f32.add)
      (select
        (local.tee $tmp)
        (f32.const 0)
        (f32.lt (local.get $tmp) (f32.const 1000))
      )
      (select
        (local.tee $tmp)
        (f32.const 1000)
        (f32.ge (local.get $tmp) (f32.const 0))
      )
    )

    ;; loop if i != 12000
    (br_if $outer
      (i32.ne
        (i32.const 12000)
        (local.tee $i (i32.add (local.get $i) (i32.const 12)))
      )
    )
  )
)

(func $main (export "main")
  (table.set $0 (i32.const 1)
    (call $document_getElementById
      (table.get $0 (i32.const 0))
      (i32.const 80)
      (i32.const 8)
    )
  )

  (table.set $0 (i32.const 1)
    (call $getContext
      (table.get $0 (i32.const 1))
      (i32.const 96)
      (i32.const 2)
    )
  )
)

;; WebIDL
(@webidl type $any any)
(@webidl type $float float)
(@webidl type $string DOMString)


