export function loadWords(): string[] {
  return (require("./sowpods.json") as string[]).filter((_, i) => !(i % 500));
}
