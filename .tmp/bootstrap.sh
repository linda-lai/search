#!/usr/bin/env bash

# First line is the shebang which tells the system how to execute
# the script: https://en.wikipedia.org/wiki/Shebang_(Unix)
# Learn Bash: https://learnxinyminutes.com/docs/bash/

# TODO: Make Node program accept piped responses via shell scripting
cat << 'EOF' | node index.js -
tickets
_id
436bf9b0-1147-4c0a-8439-6f79833bff5b

EOF
