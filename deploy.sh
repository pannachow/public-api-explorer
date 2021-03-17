#!/usr/bin/env sh
# https://cli.vuejs.org/guide/deployment.html#github-pages

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'pannachow.io' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:pannachow/public-api-explorer.git master:gh-pages

cd -
