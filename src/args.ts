import { parseArgs } from "./deps.ts";

let flags = undefined;

function initFlags() {
  if (!flags) {
    flags = parseArgs(Deno.args, { boolean: ["v", "verbose"] });
  }
}

export function isVerbose() {
  initFlags();
  return flags!.v || flags!.verbose;
}
