#!/usr/bin/env sh
set -e

npm run build
cd dist

git init
git remote add origin git@github.com:ZanyMonk/Decodapz.git
git checkout -b gh-pages
git add -A
git commit -m 'deploy'

git push -f origin gh-pages

cd -