import { parseArgs } from "jsr:@std/cli/parse-args";

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
