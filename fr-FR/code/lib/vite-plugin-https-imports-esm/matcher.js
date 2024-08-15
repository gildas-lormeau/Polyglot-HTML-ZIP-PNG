import { minimatch } from 'minimatch';
function test(pattern, id) {
    if (pattern instanceof RegExp) {
        return pattern.test(id);
    }
    else if (typeof pattern === 'function') {
        return pattern(id);
    }
    else if (Array.isArray(pattern)) {
        return pattern.some(p => test(p, id));
    }
    else {
        return minimatch(id, pattern);
    }
}
export function matcher(options) {
    return (id) => !!id && id.startsWith('https://')
        && test(options.include || '**', id)
        && !test(options.exclude || [], id);
}
