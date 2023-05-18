#!/bin/sh
cp -r ~/app/noto-emoji/svg /tmp/
cd /tmp/svg
rename 's/^emoji_u//;s/_/-/g' *.svg
\cp * ~/app/emojione-picker-ubuntu/assets/svg
