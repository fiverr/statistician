echo "\n\033[33m[files]\033[00m"
./cli.js files --dir "./fixtures/files" --ignore "\.map$" --ignore "(^|\/)\." --ignore

echo "\n\033[33m[diff-summary (file)]\033[00m"
./cli.js diff-summary --file "./fixtures/a/files-before.json,./fixtures/a/files-after.json"
