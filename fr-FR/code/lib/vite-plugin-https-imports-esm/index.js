import { matcher } from './matcher.js';
import { resolver } from './resolver.js';
import { loader } from './loader.js';
export default function (options = {}) {
    const match = matcher(options);
    return {
        name: 'vite-plugin-https-imports-esm',
        enforce: 'pre',
        apply: 'build',
        resolveId: resolver(match),
        load: loader(match, options),
    };
}
export * from './types';
