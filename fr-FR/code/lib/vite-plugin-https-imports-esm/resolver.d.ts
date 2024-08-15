import { Matcher } from './matcher';
export declare function resolver(matcher: Matcher): (id: string, importer?: string) => string | undefined;
export type Resolver = ReturnType<typeof resolver>;
