#!/bin/bash
set -x #echo on

cd /home/indianpac/public_html/peopleipac

find . -name "*.js" -type f -delete
find . -name "*.css" -type f -delete

cd /home/indianpac/covid-19-crisis

rm -rf dist/

git stash

git checkout master

git pull origin master

cp -r dist/* /home/indianpac/public_html/peopleipac