#!/usr/bin/env sh

# abort on errors
set -e

# build
pnpm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B gh-pages
git config user.email "fhal.mohamed.amine@gmail.com"
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:medaminefh/blogs.git gh-pages

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:medaminefh/portfolio.git main:gh-pages

cd -