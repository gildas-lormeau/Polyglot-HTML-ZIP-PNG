#!/usr/bin/env bash

rm -rf ./build
rm -rf ./dist

mkdir ./build

cp -R images ./build/images
cp -R reveal ./build/reveal
cp -R plugin ./build/plugin

mkdir ./build/code

cp -R code/01/ ./build/code/01/
for i in {2..16}; do
  npx vite build --mode production --emptyOutDir ./code/$(printf "%02d" $i)/
done
npx vite build --mode production --emptyOutDir ./code/final/

cp index.html ./build/index.html
node -e "
const fs = require('fs');
const oldHtml = fs.readFileSync('./build/index.html', 'utf-8');
const newHtml = oldHtml.replace(/<code data-src=\"([^\"]+)\"([^>]*)><\/code>/g, (_, src, attrs) => '<code' + attrs + '>' + fs.readFileSync(src, 'utf-8').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code>');
fs.writeFileSync('./build/index.html', newHtml);
"

mkdir ./dist
npx single-file --dump-content --save-raw-page --remove-hidden-elements=false --compress-HTML=false --block-scripts=false --remove-unused-styles=false --remove-unused-fonts=false --remove-alternative-fonts=false --remove-alternative-medias=false --remove-alternative-images=false --compress-content=true --self-extracting-archive=true --embedded-image=./images/qr-code-mini.png --insert-single-file-comment=false ./build/index.html > ./dist/presentation-polyglot-png-zip-html_en-EN.html

rm -rf ./build
