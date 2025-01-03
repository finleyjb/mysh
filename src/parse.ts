export interface LexedCommand {
  readonly command: string;
  readonly commandParts: string[];
}

export function lex(command: string): LexedCommand {
  const parts = command.split(/\s/);
  return { command: parts[0], commandParts: parts.slice(1) };
}
