/**
 * diffSummary
 * @description Create markdown summary of file sizes and bundle diffs
 */
module.exports.diffSummary = require('./programs/diff-summary');

/**
 * githubPullRequest
 * @description Comment on a pull request with the results of diffSummary
 */
module.exports.githubPullRequest = require('./programs/github-pull-request');

/**
 * summary
 * @description Create markdown summary of file sizes and bundle
 */
module.exports.summary = require('./programs/summary');
