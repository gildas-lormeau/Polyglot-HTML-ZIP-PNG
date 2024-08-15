<div align="right">

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/vite-plugin-https-imports@latest?color=black&label=&style=flat-square)](https://bundlephobia.com/package/vite-plugin-https-imports@latest)
[![npm](https://img.shields.io/npm/v/vite-plugin-https-imports?color=black&label=&style=flat-square)](https://www.npmjs.com/package/vite-plugin-https-imports)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/vite-plugin-https-imports/coverage.yml?label=&style=flat-square)](https://github.com/loreanvictor/vite-plugin-https-imports/actions/workflows/coverage.yml)

</div>

# vite-plugin-https-imports

A [Vite](https://vitejs.dev) plugin to bundle ESModules imported from remote URLs (e.g. CDNs).

```html
<script type="module">
  // 👇 import from a remote library
  import { something } from 'https://esm.sh/somelib'

  // ...
</script>
```
```js
// vite.config.js
import httpsImports from 'vite-plugin-https-imports'

export default {
  plugins: [
    // 👇 include the plugin in Vite config
    httpsImports()
  ]
}
```
```bash
vite build
# ☝ this will now download and bundle contents and
#   dependencies of https://esm.sh/somelib for faster 
#   loading on production without request waterfalls.
```

<br>

# Contents

- [Contents](#contents)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)

<br>

# Installation

[Node](https://nodejs.org/en/):

```bash
npm i vite-plugin-https-imports
```

Browser / [Deno](https://deno.land):

```js
import httpsImports from 'https://esm.sh/vite-plugin-https-imports'
```

<br>

# Usage

Importing modules from some remote (e.g. CDNs such as [esm.sh](https://esm.sh) or [Skypack](https://www.skypack.dev)) cool (and also allows specifying dependencies where they are needed, instead of in some other tool's configuration). However, using them means browsers will have to send at least one request (typically more) for each dependency, resulting in slow loading times.

`vite-plugin-https-imports` resolves that issue for [Vite](https://vitejs.dev). In development, it skips such imports so your browser will load them. During build time, it downloads the dependencies (and their dependencies) and has Vite bundle them, which allows you to have the best of both worlds.

**STEP 1**: Import a module from some remote, for example in a script tag:
```html
<script type="module">
  import { something } from 'https://esm.sh/somelib'

  // ...
</script>
```
Or in a JS/TS file:
```js
import { something } from 'https://esm.sh/somelib'

// ...
```

<br>

**STEP 2**: Add the plugin to your Vite config:
```js
// vite.config.js
import httpsImports from 'vite-plugin-https-imports'

export default {
  plugins: [
    httpsImports()
  ]
}
```

<br>

**STEP 3**: Build your app:
```bash
vite build
```

<br>

## Configuration

The plugin accepts the following configs:

- `include`: The URL patterns to include. If no pattern is given, all URLs starting with `https://` will be included. You can pass strings (globs), regular expressions, arrays, functions, etc.

```js
// vite.config.js
import httpsImports from 'vite-plugin-https-imports'

export default {
  plugins: [
    httpsImports({
      include: [
        'https://esm.sh/**',
        /https:\/\/cdn\.skypack\.dev\//,
        url => url.startsWith('https://unpkg.com/'),
      ]
    })
  ]
}
```

> **ONLY HTTPS URLS ARE INCLUDED**

- `exclude`: The URL patterns to exclude. If no pattern is given, no URLs will be excluded. You can pass strings (globs), regular expressions, arrays, functions, etc.

```js
// vite.config.js
import httpsImports from 'vite-plugin-https-imports'

export default {
  plugins: [
    httpsImports({
      exclude: [
        'https://esm.sh/somelib',
        /somelib/,
        url => url.includes('somelib'),
      ]
    })
  ]
}
```

<br>

- `silent`: Whether to log downloaded files or not. By default will log the downloaded files.

<br>

# Contribution

You need [node](https://nodejs.org/en/), [NPM](https://www.npmjs.com) to start and [git](https://git-scm.com) to start.

```bash
# clone the code
git clone git@github.com:loreanvictor/vite-plugin-https-imports.git
```
```bash
# install stuff
npm i
```

Make sure all checks are successful on your PRs. This includes all tests passing, high code coverage, correct typings and abiding all [the linting rules](https://github.com/loreanvictor/vite-plugin-https-imports/blob/main/.eslintrc). The code is typed with [TypeScript](https://www.typescriptlang.org), [Jest](https://jestjs.io) is used for testing and coverage reports, [ESLint](https://eslint.org) and [TypeScript ESLint](https://typescript-eslint.io) are used for linting. Subsequently, IDE integrations for TypeScript and ESLint would make your life much easier (for example, [VSCode](https://code.visualstudio.com) supports TypeScript out of the box and has [this nice ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)), but you could also use the following commands:

```bash
# run tests
npm test
```
```bash
# check code coverage
npm run coverage
```
```bash
# run linter
npm run lint
```
```bash
# run type checker
npm run typecheck
```
