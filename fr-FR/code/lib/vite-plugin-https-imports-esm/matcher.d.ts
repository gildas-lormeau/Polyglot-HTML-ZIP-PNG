import { MatcherOptions } from './types';
export declare function matcher(options: MatcherOptions): (id: string | undefined) => boolean;
export type Matcher = ReturnType<typeof matcher>;
