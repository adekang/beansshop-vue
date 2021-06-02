 #!/usr/bin/env sh

rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M master &&
git remote add origin git@github.com:adekang/beansshop-vue-web.git &&
git push -f -u origin master &&
cd -
