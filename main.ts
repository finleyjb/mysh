import { verbose } from "./src/log.ts";
import { lex } from "./src/parse.ts";
import * as readline from "node:readline/promises";
import process from "node:process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.addListener("SIGINT", () => {
  console.log("\ninterrupted!\n");
});

if (import.meta.main) {
  while (true) {
    const command = await rl.question(`${Deno.cwd()}$ `);
    console.log(command);
    // This promise weirdness is necessary because prompting in a loop would
    // otherwise prevent handling SIGTERM
    if (!command) {
      verbose("Empty input, exiting");
      break;
    }
    const commandParts = lex(command);

    const childProc = new Deno.Command(commandParts[0], {
      args: commandParts.slice(1),
    });
    let stdout: Uint8Array | undefined;
    try {
      ({ stdout } = await childProc.output());
    } catch (err) {
      verbose(err);
      if ((err as { code?: string }).code === "ENOENT") {
        console.error(`mysh: command not found: ${commandParts[0]}`);
      }
    }
    if (!stdout) {
      continue;
    }
    console.log(new TextDecoder().decode(stdout));
  }
}
