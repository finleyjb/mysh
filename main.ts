import { verbose } from "./src/log.ts";
import { lex } from "./src/parse.ts";

Deno.addSignalListener("SIGINT", () => {
  console.log("interrupted!");
});

if (import.meta.main) {
  while (true) {
    const command = prompt(`${Deno.cwd()}$`);
    // This promise weirdness is necessary because prompting in a loop would 
    // otherwise prevent handling SIGTERM
    let promise = new Promise((resolve) => {
      setTimeout(async () => {
        if (!command) {
          verbose("Empty input, exiting");
          resolve(null);
          return;
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
          resolve(null);
          return;
        }
        console.log(new TextDecoder().decode(stdout));
      }, 0);
    });
    await promise;
  }
}
