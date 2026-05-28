export function createPathList(input: string): string[] {
    const parts = input.split("/");
    const result: string[] = [];

    for (let i = 1; i <= parts.length; i++) {
        result.push(parts.slice(0, i).join("/"));
    }

    return result.slice(1);
}
