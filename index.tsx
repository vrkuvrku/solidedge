/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

const res = await fetch('https://apiland.deno.dev/v2/modules')
type Pkg = { name: string, description: string }
const data = await res.json()
const pkgs: Pkg[] = data.items

function App() {
	const items = pkgs.map(pkg => <li>{pkg.name} - {pkg.description}</li>)
  return (
    <html>
      <head>
        <title>BankIdentity</title>
      </head>
      <body>
        <h1>BankIdentity</h1>
				{items}
      </body>
    </html>
  );
}

function handler(req) {
  const html = renderSSR(<App />);
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

serve(handler);
