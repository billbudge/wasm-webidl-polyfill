(import "env" "memory" (memory $0 256 256))
(import "env" "table" (table $0 2 anyref))

(data (i32.const 80) "a-canvas\00") ;; canvas element name
(data (i32.const 96) "webgl\00")    ;; canvas context name
(data (i32.const 112) "lighter\00") ;; composite operation
(data (i32.const 128) "nonzero\00") ;; fill rule

(import "document" "getElementById"
  (func $document_getElementById (param anyref i32 i32) (result anyref))
)
(import "host" "getContext"
  (func $getContext (param anyref i32 i32) (result anyref))
)
(import "host" "clear"
  (func $clear (param anyref i32))
)
(import "host" "clearColor"
  (func $clearColor (param anyref i32 i32 i32 i32))
)

(func $draw (export "draw")
  (call $clearColor
    (table.get $0 (i32.const 1))
    (i32.const 255)  ;; red
    (i32.const 0)
    (i32.const 0)
    (i32.const 255)  ;; alpha
  )
  (call $clear
    (table.get $0 (i32.const 1))
    (i32.const 16384)
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
      (i32.const 5)
    )
  )
)

;; WebIDL
(@webidl type $any any)
(@webidl type $int int)
(@webidl type $float float)
(@webidl type $string DOMString)
(@webidl func-binding
  import "document" "getElementById"
  method
  (param
    (as (webidl-type $any) (idx 0))
    (utf8-cstr (type $string) (off-idx 1))
  )
  (result (as (wasm-type anyref) (get 0)))
)
(@webidl func-binding
  import "host" "getContext"
  method
  (param
    (as (webidl-type $any) (idx 0))
    (utf8-cstr (type $string) (off-idx 1))
  )
  (result (as (wasm-type anyref) (get 0)))
)
(@webidl func-binding
  import "host" "clear"
  method
  (param
    (as (webidl-type $any) (idx 0))
    (as (webidl-type $int) (idx 1))
  )
)
(@webidl func-binding
  import "host" "clearColor"
  method
  (param
    (as (webidl-type $any) (idx 0))
    (as (webidl-type $int) (idx 1))
    (as (webidl-type $int) (idx 2))
    (as (webidl-type $int) (idx 3))
    (as (webidl-type $int) (idx 4))
  )
)

