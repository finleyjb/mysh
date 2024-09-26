import { verbose } from "./src/log.ts";

if (import.meta.main) {
  while (true) {
    const command = prompt(`${Deno.cwd()}$`);
    setTimeout(() => {}, 5000);
    if (!command) {
      verbose("Empty input, exiting");
      Deno.exit(0);
    }
    const commandParts = command.split(/\s/);

    const childProc = new Deno.Command(commandParts[0], {
      args: commandParts.slice(1),
    });
    const { stdout } = await childProc.output();
    console.log(new TextDecoder().decode(stdout));
  }
}
