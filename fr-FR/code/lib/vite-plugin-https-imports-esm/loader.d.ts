import { Matcher } from './matcher';
import { LoggerOptions } from './types';
export declare function loader(matcher: Matcher, options: LoggerOptions): (id: string) => Promise<any>;
