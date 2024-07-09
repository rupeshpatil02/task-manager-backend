
export function toLowerCaseMultiple(...params: string[]): string[] {
    return params.map(param => param.toLowerCase());
}
