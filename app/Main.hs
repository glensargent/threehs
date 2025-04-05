{-# LANGUAGE ForeignFunctionInterface #-}
{-# LANGUAGE OverloadedStrings #-}

module Main where
import GHC.Wasm.Prim

main :: IO ()
main = putStrLn "Hello from Haskell"


foreign import javascript unsafe "console.log($1)"
  js_print :: JSString -> IO ()

foreign import javascript unsafe "typeof $1 === 'object'"
  js_is_obj :: JSVal -> Bool

foreign import javascript unsafe "let acc = 1; for (let i = 1; i <= $1; ++i) acc *= i; return acc;"
  js_fac :: Word -> Word
