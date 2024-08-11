#!/usr/bin/env bash

rm -rf ./build
rm -rf ./dist

mkdir ./build

cp -R images ./build/images
cp -R reveal ./build/reveal
cp -R plugin ./build/plugin

mkdir ./build/code

cp -R code/01/ ./build/code/01/
npx vite build --mode production ./code/02/
npx vite build --mode production ./code/03/
npx vite build --mode production ./code/04/
npx vite build --mode production ./code/05/
npx vite build --mode production ./code/06/
npx vite build --mode production ./code/07/
npx vite build --mode production ./code/08/
npx vite build --mode production ./code/09/
npx vite build --mode production ./code/10/
npx vite build --mode production ./code/11/
npx vite build --mode production ./code/12/
npx vite build --mode production ./code/13/
npx vite build --mode production ./code/14/
npx vite build --mode production ./code/15/
npx vite build --mode production ./code/16/
npx vite build --mode production ./code/final/

cp index.html ./build/index.html
node -e "require('fs').writeFileSync('./build/index.html', require('fs').readFileSync('./build/index.html', 'utf-8').replace(/<code data-src=\"([^\"]+)\"([^>]*)><\/code>/g, (_, src, attrs) => '<code' + attrs + '>' + require('fs').readFileSync(src, 'utf-8').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code>'))"

npx http-server ./build -p 8080 &
npx single-file --dump-content --save-raw-page --remove-hidden-elements=false --compress-HTML=false --block-scripts=false --remove-unused-styles=false --remove-unused-fonts=false --remove-alternative-fonts=false --remove-alternative-medias=false --remove-alternative-images=false --compress-content=true --self-extracting-archive=true --insert-single-file-comment=false http://localhost:8080 > result.html
pgrep http-server | xargs kill -9

rm -rf ./build
mkdir ./dist
mv result.html ./dist/index.html
