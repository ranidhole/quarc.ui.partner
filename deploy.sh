#! /bin/bash

echo "Installing grunt-cli and bower"
npm install -g grunt-cli bower
npm list --depth=0
echo "Installing bower components"
bower install

echo "Starting build"
grunt build -f

echo "Changing Directory to ./dist"
cd dist

echo "Setting git config user.email and user.name"
git config --global user.email "manjesh@quetzal.in"
git config --global user.name "Manjesh V"

echo "Git Init"
git init

echo "Adding remote"
git remote add origin https://github.com/manjeshpv/circleci-test.dist

echo "Adding files to git"
git add *

echo "Commiting..."
git commit -m "Todo: comming Message"

echo "Started deploying"
git push origin master --force

echo "Pushed to git successfully Successfully!"
exit 0
