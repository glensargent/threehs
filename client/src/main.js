import './style.css'


// shim reference here:
// https://www.jsdelivr.com/package/npm/@bjorn3/browser_wasi_shim
// recommended for browsers via this:
// https://gitlab.haskell.org/haskell-wasm/ghc-wasm-meta
import { WASI, File, OpenFile, ConsoleStdout, PreopenDirectory } from 'https://cdn.jsdelivr.net/npm/@bjorn3/browser_wasi_shim@0.4.0/+esm'

(async () => {
  const args = []
  const env = []
  let fds = [
    new OpenFile(new File([])), // stdin
    ConsoleStdout.lineBuffered(msg => console.log(`[WASI stdout] ${msg}`)),
    ConsoleStdout.lineBuffered(msg => console.warn(`[WASI stderr] ${msg}`)),
  ];

  let wasi = new WASI(args, env, fds);

  let wasm = await WebAssembly.compileStreaming(fetch("output.wasm"));
  let inst = await WebAssembly.instantiate(wasm, {
    "wasi_snapshot_preview1": wasi.wasiImport,
  });
  wasi.start(inst);
})();


