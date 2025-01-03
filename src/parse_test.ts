import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { lex } from "./parse.ts";

describe("parse.ts", () => {
  describe("lex", () => {
    it("lexes simple commands", () => {
      expect(lex("asdf")).toEqual({ command: "asdf", commandParts: [] });
      expect(lex("asdf 1 2 3")).toEqual({
        command: "asdf",
        commandParts: ["1", "2", "3"],
      });
    });
  });
});
