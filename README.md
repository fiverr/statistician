# statistician

## Create and compare files stats, and webpack bundle stats

Use webpack stats file and self created files stats file to compare between states of the package, and comment on GitHub pull requests

## CLI Examples

Create webpack stats
```sh
webpack --config <CONFIG_FILE> --profile --json > stats.json
```
See [webpack stats API for more details](https://webpack.js.org/api/stats/)

---

# `files`

Create file stats
```sh
npx statistician files --dir "./dist" --ignore "\.map$" --ignore "(^|\/)\." --ignore "(^|/)node_modules\/," > files.json
```

| Option | Meaning | Example
| - | - | -
| dir | Directory holding the files to measure | `--dir "./dist"`
| ignore | Pattern to exclude from summary | `--ignore "\.map$"`

Outputs JSON

## files output example
```json
{
  "dist/arrows.svg": 645,
  "dist/badges-sprite.svg": 948,
  "dist/index.css": 6004,
  "dist/index.js": 62304,
  "dist/outline.svg": 531,
  "dist/shields.svg": 345
}
```

---

# `github-pull-request`

Create pull request (Example using CircleCI env variables)
```sh
npx statistician github-pull-request --file "./files-before.json,./files-after.json" --bundle "./stats-before.json,./stats-after.json" --user $CIRCLE_PROJECT_USERNAME --repo $CIRCLE_PROJECT_REPONAME --pr $CIRCLE_PR_NUMBER --token $GITHUB_TOKEN
```

| Option | Meaning | Example
| - | - | -
| file | pair of file stats to compare (comma separated) | `--file "./files-before.json,./files-after.json"`
| bundle | pair of bundle stats to compare (comma separated) | `--file "./files-before.json,./files-after.json"`
| user | Repository owner / org (\* not necessarily commenter) | `--user fiverr`
| repo | Name of repository | `--repo some-package`
| pr | Pull request number | `--pr 24`
| token | [GitHub API Token](https://github.com/settings/tokens) | `--token s4f5ybwne84bodafzopayrtjrc2koa2k4qb3y1wp`

## Pull request comment example

![image](https://user-images.githubusercontent.com/516342/47003941-204c1c00-d139-11e8-86ac-fdec938448de.png)
