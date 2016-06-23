## Repository rules
Since the main resource we work with is code, it is paramount for the projects' health (and our own) that we keep a set of rules to work in all repositories in an orderly fashion.

### Gitflow
We follow [gitflow](http://nvie.com/posts/a-successful-git-branching-model/) as a branching and tagging model, where `master` acts as a development branch and a `stable` branch is kept.

### Versioning
Versions should be noted as `MAJOR.MINOR.PATCH(-preX)`. We follow [semantic versioning](http://semver.org/) for MAJOR, MINOR and PATCH.

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

The `-pre1`, `-pre2`, etc are consecutive deploys to staging until such version is given the go ahead by the QA team.

### Commit messages
We aim for these [guidelines](http://chris.beams.io/posts/git-commit/):

* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Wrap the body at 72 characters
* Use the body to explain what and why vs. how

#### Example
```
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequenses of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

### Guidelines

Several other things to consider when working in a repository.

* No Half-baked Features in Master
* Merge to Master Before Release
* Bugfix On release-branch
* Bugs Not In Production
* Don't Close Issue Before Merging
* No release-branch With Open Issues
* Postpone feature BEFORE merging
* Comment on Done but not Merged Issue
* Bring Forward a Feature
* Freeze Milestone when Branching a Release
* Don't Add Features on Frozen Milestones
* Bug Issues on Frozen Milestones
