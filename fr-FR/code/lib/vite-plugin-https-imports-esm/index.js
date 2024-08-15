import { matcher } from './matcher';
import { resolver } from './resolver';
import { loader } from './loader';
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
