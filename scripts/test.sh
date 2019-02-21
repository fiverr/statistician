args="$@"
: ${args:=""}
find . | grep "$args" | grep spec.js | grep -v node_modules | xargs mocha --require .mochaenv.js
