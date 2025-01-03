import { Input } from "@cliffy/prompt";

import { verbose } from "./src/log.ts";
import { lex } from "./src/parse.ts";

if (import.meta.main) {
  while (true) {
    const command = await Input.prompt({
      message: Deno.cwd(),
      pointer: "$",
      prefix: "",
    });

    if (!command) {
      verbose("Empty input");
      continue;
    }
    const lexedCommand = lex(command);

    const childProc = new Deno.Command(lexedCommand.command, {
      args: lexedCommand.commandParts,
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

    await Deno.stdout.write(stdout);
  }
}
