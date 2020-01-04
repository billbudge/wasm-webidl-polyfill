(import "env" "memory" (memory $0 256 256))
(import "env" "table" (table $0 7 anyref))

(data (i32.const 16) "a-canvas\00") ;; canvas ID
(data (i32.const 32) "2d\00")       ;; 2D context
(data (i32.const 48) "#ff2020\00")  ;; red color
(data (i32.const 64) "#2020ff\00")  ;; blue color
(data (i32.const 80) "lighter\00")  ;; global composite operation
(data (i32.const 96) "nonzero\00")  ;; fill rule

;; 256 pages * 64KiB bytes per page:
;; [256, 49408)       => items, 2000 * 6 * sizeof(float) = 49152 bytes.

(import "document" "getElementById"
  (func $document_getElementById (param i32) (result anyref))
)
(import "host" "getContext"
  (func $getContext (param anyref i32) (result anyref))
)
(import "host" "getRedColor"
  (func $getRedColor (result anyref))
)
(import "host" "getBlueColor"
  (func $getBlueColor (result anyref))
)
(import "host" "getColor"
  (func $getColor (param i32) (result anyref))
)
(import "host" "clearRect"
  (func $clearRect (param anyref f64 f64 f64 f64))
)
(import "host" "setGlobalCompositeOperation"
  (func $setGlobalCompositeOperation (param anyref i32))
)
(import "host" "fillRect"
  (func $fillRect (param anyref f64 f64 f64 f64))
)
(import "host" "setFillStyle"
  (func $setFillStyle (param anyref anyref))
)
(import "host" "setStrokeStyle"
  (func $setStrokeStyle (param anyref anyref))
)
(import "host" "setLineWidth"
  (func $setLineWidth (param anyref f64))
)
(import "host" "createLinearGradient"
  (func $createLinearGradient (param anyref f64 f64 f64 f64) (result anyref))
)
(import "host" "addColorStop"
  (func $addColorStop (param anyref f64 i32))
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
  (func $fill (param anyref) (param i32))
)
(import "host" "moveTo"
  (func $moveTo (param anyref) (param f64) (param f64))
)
(import "host" "lineTo"
  (func $lineTo (param anyref) (param f64) (param f64))
)
(import "host" "arc"
  (func $arc (param anyref f64 f64 f64 f64 f64 i32))
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
  (local $x f64)
  (local $y f64)
  (local $x1 f32)
  (local $y1 f32)
  (local $x2 f32)
  (local $y2 f32)
  (local $rgba1 i32)
  (local $rgba2 i32)
  (local $rad f64)
  (local $factor f64)
  (local $tmp f64)

  (call $clearRect
    (table.get $0 (i32.const 1))
    (f64.const 0)
    (f64.const 0)
    (f64.const 1000)
    (f64.const 1000)
  )
  (call $setGlobalCompositeOperation
    (table.get $0 (i32.const 1))
    (i32.const 80)
  )
  (call $setLineWidth
    (table.get $0 (i32.const 1))
    (f64.const 1)
  )

  (local.set $i (i32.const 0))
  (loop $outer
    (local.set $factor (f64.const 1))
    (local.set $x
      (f64.promote_f32
        (f32.load offset=256 align=4 (local.get $i))
      )
    )
    (local.set $y
      (f64.promote_f32
        (f32.load offset=260 align=4 (local.get $i))
      )
    )
    (local.set $rad
      (f64.promote_f32
        (f32.load offset=12256 align=4 (local.get $i))
      )
    )
    (local.set $rgba1
      (i32.load offset=264 align=4 (local.get $i))
    )

    (call $setFillStyle
      (table.get $0 (i32.const 1))
      (table.get $0
        (local.get $rgba1)
        (i32.const 2)
        (i32.add)
      )
    )
    (call $setStrokeStyle
      (table.get $0 (i32.const 1))
      (table.get $0
        (local.get $rgba1)
        (i32.const 2)
        (i32.add)
      )
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
          (f64.promote_f32
            (local.get $x1)
          )
          (f64.promote_f32
            (local.get $y1)
          )
        )
        (call $lineTo
          (table.get $0 (i32.const 1))
          (f64.promote_f32
            (local.get $x2)
          )
          (f64.promote_f32
            (local.get $y2)
          )
        )
        (call $stroke
          (table.get $0 (i32.const 1))
        )
        (local.set $factor
          (local.get $factor)
          (f64.const 1)
          (f64.add)
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
      (f64.mul)
      (f64.const 0)
      (f64.const 6.28318530718)  ;; 2 * PI
      (i32.const 1)              ;; true
    )
    (call $closePath
      (table.get $0 (i32.const 1))
    )
    (call $fill
      (table.get $0 (i32.const 1))
      (i32.const 96)
    )

    (call $beginPath
      (table.get $0 (i32.const 1))
    )
    (call $arc
      (table.get $0 (i32.const 1))
      (local.get $x)
      (local.get $y)
      (local.get $rad)
      (f64.const 5)
      (f64.add)
      (local.get $factor)
      (f64.mul)
      (f64.const 0)
      (f64.const 6.28318530718)  ;; 2 * PI
      (i32.const 1)              ;; true
    )
    (call $closePath
      (table.get $0 (i32.const 1))
    )
    (call $stroke
      (table.get $0 (i32.const 1))
    )

    (local.set $tmp
      (f64.promote_f32
        (f32.load offset=12260 align=4 (local.get $i))
      )
    )
    (f32.store offset=256 align=4 (local.get $i)
      (local.get $x)
      (local.get $tmp)
      (f64.add)
      (select
        (local.tee $tmp)
        (f64.const 0)
        (f64.lt (local.get $tmp) (f64.const 1000))
      )
      (select
        (local.tee $tmp)
        (f64.const 1000)
        (f64.ge (local.get $tmp) (f64.const 0))
      )
      (f32.demote_f64)
    )

    (local.set $tmp
      (f64.promote_f32
        (f32.load offset=12264 align=4 (local.get $i))
      )
    )
    (f32.store offset=260 align=4 (local.get $i)
      (local.get $y)
      (local.get $tmp)
      (f64.add)
      (select
        (local.tee $tmp)
        (f64.const 0)
        (f64.lt (local.get $tmp) (f64.const 1000))
      )
      (select
        (local.tee $tmp)
        (f64.const 1000)
        (f64.ge (local.get $tmp) (f64.const 0))
      )
      (f32.demote_f64)
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
;;  (local $redColor anyref)
;;  (local $blueColor anyref)
;;  (local $gradient anyref)

  (local $i i32)

  (table.set $0 (i32.const 0)
    (call $document_getElementById
      (i32.const 16)
    )
  )

  (table.set $0 (i32.const 1)
    (call $getContext
      (table.get $0 (i32.const 0))
      (i32.const 32)
    )
  )

  (local.set $i (i32.const 4))
  (loop
    (local.get $i)
    (i32.const 2)
    (i32.add)
    (call $getColor
      (local.get $i)
    )
    (table.set $0)

    ;; loop if i - 1 != 0
    (br_if 0
      (local.tee $i (i32.sub (local.get $i) (i32.const 1)))
    )
  )

;;  (local.set $redColor
;;    (call $getRedColor)
;;  )
;;  (local.set $blueColor
;;    (call $getBlueColor)
;;  )
;;
;;  (call $fillRect
;;    (table.get $0 (i32.const 1))
;;    (f64.const 100)
;;    (f64.const 100)
;;    (f64.const 200)
;;    (f64.const 200)
;;  )
;;
;;  (call $setFillStyle
;;    (table.get $0 (i32.const 1))
;;    (local.get $redColor)
;;  )
;;  (call $fillRect
;;    (table.get $0 (i32.const 1))
;;    (f64.const 175)
;;    (f64.const 175)
;;    (f64.const 200)
;;    (f64.const 200)
;;  )
;;  (local.set $gradient
;;    (call $createLinearGradient
;;      (table.get $0 (i32.const 1))
;;      (f64.const 200)
;;      (f64.const 200)
;;      (f64.const 500)
;;      (f64.const 500)
;;    )
;;  )
;;  (call $addColorStop
;;    (local.get $gradient)
;;    (f64.const 0)
;;    (i32.const 48)
;;  )
;;  (call $addColorStop
;;    (local.get $gradient)
;;    (f64.const 0.5)
;;    (i32.const 64)
;;  )
;;  (call $addColorStop
;;    (local.get $gradient)
;;    (f64.const 1)
;;    (i32.const 48)
;;  )
;;  (call $setStrokeStyle
;;    (table.get $0 (i32.const 1))
;;    (local.get $gradient)
;;  )
;;  (call $setLineWidth
;;    (table.get $0 (i32.const 1))
;;    (f64.const 30)
;;  )
;;  (call $beginPath
;;    (table.get $0 (i32.const 1))
;;  )
;;  (call $arc
;;    (table.get $0 (i32.const 1))
;;    (f64.const 300)
;;    (f64.const 300)
;;    (f64.const 100)
;;    (f64.const 0)
;;    (f64.const 360)
;;    (i32.const 0)
;;  )
;;  (call $stroke
;;    (table.get $0 (i32.const 1))
;;  )
)

;; WebIDL
(@webidl type $any any)
(@webidl type $float float)
(@webidl type $string DOMString)


