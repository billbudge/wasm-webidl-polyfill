(import "env" "memory" (memory $0 256 256))
(import "env" "table" (table $0 8 anyref))
;;(import "env" "table2" (table $1 2 funcref))

;;(data (i32.const 0) "http://example.com/movies.json") ;; 29 length
(data (i32.const 0) "http://localhost:8000/index.html") ;; 31 length
(data (i32.const 32) "click") ;; 5 length

;; Comments here.

(import "env" "log"
  (func $log (param anyref))
)

(import "document" "get_window"
  (func $window (param anyref) (result anyref))
)
(import "document" "get_root_node"
  (func $get_root (param anyref) (result anyref))
)
(import "document" "get_first_child"
  (func $get_first_child (param anyref) (result anyref))
)
(import "document" "get_next_sibling"
  (func $get_next_sibling (param anyref) (result anyref))
)
(import "document" "add_event_listener"
  (func $add_event_listener (param anyref i32 i32 anyref))
)
(import "window" "fetch"
  (func $fetch (param anyref i32 i32 anyref) (result anyref))
)
(import "host" "promise_then"
  (func $promise_then (param anyref anyref anyref))
)
(import "host" "response_ok"
  (func $response_ok (param anyref) (result anyref))
)
(import "host" "response_text"
  (func $response_text (param anyref) (result anyref))
)
(import "host" "array_new"
  (func $array_new (param i32) (result anyref))
)
(import "host" "array_push"
  (func $array_push (param anyref i32))
)
(import "host" "array_forEach"
  (func $array_forEach (param anyref anyref))
)

(func $for_node (param $node anyref)
  (local $child anyref)

  (call $log (local.get $node))

  (local.set $child
    (call $get_first_child (local.get $node))
  )
  (loop
    (br_if 1 (ref.is_null (get_local $child)))

    (call $for_node (local.get $child))
    (local.set $child
      (call $get_next_sibling (local.get $child))
    )
    (br 0)
  )
)

(func $forEach_cb (param $value anyref)
  (local.get $value)
  (call $log)
)

(func $onclick_cb (param $value anyref)
  (local.get $value)
  (call $log)
)

(func $on_response_text (param $text anyref)
  (local $array anyref)
  (local $root anyref)

  (local.get $text)
  (call $log)

  (call $array_new
    (i32.const 1)
  )
  (local.tee $array)
  (call $array_push
    (i32.const 42)
  )
  (local.get $array)
  (call $array_push
    (i32.const 43)
  )
  (local.get $array)
  (call $array_push
    (i32.const 44)
  )
  (local.get $array)
  (call $log)

  (call $array_forEach
    (local.get $array)
    (table.get $0 (i32.const 5))
  )

  (call $get_root
    (table.get $0 (i32.const 0))
  )
  (local.tee $root)
  (call $for_node)

  (call $add_event_listener
    (local.get $root)
    (i32.const 32)
    (i32.const 5)
    (table.get $0 (i32.const 6))
  )
)

(func $on_response (param $response anyref)
  (call $response_ok
    (local.get $response)
  )
  (call $log)

  (call $response_text
    (local.get $response)
  )
  (call $promise_then
    (table.get $0 (i32.const 4))
    (table.get $0 (i32.const 3))
  )
)

(func $on_error (param $result anyref)
  (local.get $result)
  (call $log)
)

;;(table $1 2 funcref)
(elem $0 (i32.const 2)
  $on_response
  $on_error
  $on_response_text
  $forEach_cb
  $onclick_cb)

(func $main (export "main")
  (call $window
    (table.get $0 (i32.const 0))
  )
  (call $fetch
    (i32.const 0)
    (i32.const 32)
    (table.get $0 (i32.const 1))
  )
  (call $promise_then
    (table.get $0 (i32.const 2))
    (table.get $0 (i32.const 3))
  )
)

;; WebIDL
(@webidl type $any any)
(@webidl type $float float)
(@webidl type $string DOMString)


