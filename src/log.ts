import { isVerbose } from "./args.ts";

export function verbose(input: unknown) {
  if (isVerbose()) {
    console.log(input);
  }
}
