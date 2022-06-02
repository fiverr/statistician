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
## Create file stats

```sh
npx statistician@0 files --dir "./dist" --ignore "\.map$" --ignore "(^|\/)\." --ignore "(^|/)node_modules\/," > files.json
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
## Create pull request

Example using CircleCI env variables
```sh
npx statistician@0 github-pull-request --file "./files-before.json,./files-after.json" --bundle "./stats-before.json,./stats-after.json" --user $CIRCLE_PROJECT_USERNAME --repo $CIRCLE_PROJECT_REPONAME --pr $(basename $CIRCLE_PULL_REQUEST) --token $GITHUB_API_TOKEN
```

or with Gith App authentication
```sh
npx statistician@0 github-pull-request --file "./files-before.json,./files-after.json" --bundle "./stats-before.json,./stats-after.json" --user $CIRCLE_PROJECT_USERNAME --repo $CIRCLE_PROJECT_REPONAME --pr $(basename $CIRCLE_PULL_REQUEST) --appId $GITHUB_APP_ID --appPrivateKey $GITHUB_APP_PRIVATE_KEY
```

| Option | Meaning | Example
| - | - | -
| file | pair of file stats to compare (comma separated) | `--file "./files-before.json,./files-after.json"`
| bundle | pair of bundle stats to compare (comma separated) | `--file "./files-before.json,./files-after.json"`
| user | Repository owner / org (\* not necessarily commenter) | `--user fiverr`
| repo | Name of repository | `--repo some-package`
| pr | Pull request number | `--pr 24`
| token | [GitHub API Token](https://github.com/settings/tokens) | `--token s4f5ybwne84bodafzopayrtjrc2koa2k4qb3y1wp`
| appId | [GitHub AppID](https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps) | `206123`
| appPrivateKey | [GitHub App Private Key](https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps#authenticating-as-a-github-app) | `-----BEGIN RSA PRIVATE KEY----- \n ABXEogIBCDSKCAQEA1....`


> Two ways of authentication are available.
> - Use a personal access token - in this case you will provide the `token` but you don't need to provide `appId` and `appPrivateKey`.
> - Use a Github application - in this case, you will provide `appId` and `appPrivateKey` but you don't need to provide `token`.

## Pull request comment example

<img src="https://user-images.githubusercontent.com/516342/47106363-03a20800-d24f-11e8-9c3c-ec89546c6975.png" width="780">

---

# `diff-summary`
## Creates the markdown summary

```sh
npx statistician@0 diff-summary --file "./files-before.json,./files-after.json" --bundle "./stats-before.json,./stats-after.json"
```

| Option | Meaning | Example
| - | - | -
| file | pair of file stats to compare (comma separated) | `--file "./files-before.json,./files-after.json"`
| bundle | pair of bundle stats to compare (comma separated) | `--bundle "./stats-before.json,./stats-after.json"`

---

# `summary`
## Creates a markdown summary of all the information

```sh
npx statistician@0 summary --file "./files.json" --bundle "./stats.json" [--html]
```

| Option | Meaning | Example
| - | - | -
| file | file stats | `--file "./files.json"`
| bundle | bundle stats | `--bundle "./stats-after.json"`
| html | output in HTML | `--html`
