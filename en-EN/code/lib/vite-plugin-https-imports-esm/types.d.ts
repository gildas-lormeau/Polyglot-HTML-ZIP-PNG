type PatternSingle = string | RegExp | ((id: string) => boolean);
export type Pattern = PatternSingle | PatternSingle[];
export interface MatcherOptions {
    include?: Pattern;
    exclude?: Pattern;
}
export interface LoggerOptions {
    silent?: boolean;
}
export interface HttpsImportsOptions extends MatcherOptions, LoggerOptions {
}
export {};
