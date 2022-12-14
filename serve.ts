const abortController = new AbortController();

const timeoutId = setTimeout(() => {
  console.log("60 seconds passed and the server was killed.");
  abortController.abort();
}, 60 * 1000);
Deno.unrefTimer(timeoutId);

Deno.serve(() => new Response("hello world"), {
  async onListen() {
    const res1 = await fetch("http://localhost:9000/1");
    console.log("res1: ", await res1.text());

    const res2 = await fetch("http://localhost:9000/2");
    console.log("res2: ", await res2.text());

    abortController.abort();
  },
  signal: abortController.signal,
});

// import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
//
// serve(() => new Response("hello world"), {
//   async onListen() {
//     const res1 = await fetch("http://localhost:8000/1");
//     console.log("res1: ", await res1.text());
//     const res2 = await fetch("http://localhost:8000/2");
//     console.log("res2: ", await res2.text());
//     abortController.abort();
//   },
//   signal: abortController.signal,
// });
