import { isVerbose } from "./args.ts";

export function verbose(input: string) {
  if (isVerbose()) {
    console.log(input);
  }
}
