import { verbose } from "./src/log.ts";
import { lex } from "./src/parse.ts";

if (import.meta.main) {
  while (true) {
    const command = prompt(`${Deno.cwd()}$`);
    setTimeout(() => {}, 5000);
    if (!command) {
      verbose("Empty input, exiting");
      Deno.exit(0);
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
      if (err.code === "ENOENT") {
        console.error(`mysh: command not found: ${commandParts[0]}`);
      }
    }
    if (!stdout) {
      continue;
    }
    console.log(new TextDecoder().decode(stdout));
  }
}
