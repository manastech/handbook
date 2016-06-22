## Repository rules
El principal material con el que trabajamos es código, con lo que se vuelve menester para la salud de todos los proyectos (y la nuestra) que mantengamos una serie de reglas para trabajar ordenadamente en los repositorios.

### Gitflow
Seguimos [gitflow](http://nvie.com/posts/a-successful-git-branching-model/) como modelo de branching y tagging, donde `master` actúa como branch de develop y mantenemos un branch `stable`.

### Versionado
Las versiones se notan como `MAJOR.MINOR.PATCH(-preX)`. Seguimos la política de [semantic versioning](http://semver.org/) para MAJOR, MINOR y PATCH.

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

Las `-pre1`, `-pre2`, etc se corresponden con los sucesivos deploys a staging hasta que la versión esté aprobada por QA.

### Commit messages
Buscamos seguir las siguientes [guidelines](http://chris.beams.io/posts/git-commit/):

* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Wrap the body at 72 characters
* Use the body to explain what and why vs. how

#### Ejemplo
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

Items varios a tener en cuenta sobre cómo trabajar en los repositorios.

#### No Half-baked Features in Master
Al momento de comenzar a escribir código para un feature nuevo, no es imprescindible hacer el feature-branch. Si cuando se hace el primer commit, el feature está listo, puede pushearse a master. Si el feature va a implicar varios commits, entonces hacer un feature-branch y pushearlo ahí. En otras palabras: nunca debe haber un feature por la mitad en master.

#### Merge to Master Before Release
Cuando se decide sacar un release, antes de hacer el release-branch y deployar a Staging, hay que verificar exactamente qué features van y asegurarse de que todos los feature-branches estén mergeados a master, ya que luego no podrán agregarse features al release (Don’t Add Features on Frozen Milestones) aunque sí se podrán hacer bugfixes (Bugfix on Branch).

#### Bugfix On release-branch
Cualquier bugfix que se quiera deployar como hotfix rápido sobre Production o incluir en un Release que está en Staging debe ser realizado sobre el release-branch correspondiente. En general, un bugfix sobre master implica que el severity es bajo y que puede esperar a salir a la próxima versión.

#### Bugs Not In Production
Cuando QA reporta un bug detectado sobre una versión pre en staging, debe verificar que en Production no suceda. Si el bug está presente en Production, en el issue debe reportar la versión de Production, NO la de Staging. Si el bug solamente está en la versión pre de Staging, entonces Bug Issues on Frozen Milestones. Esto último significa que el bug nunca estuvo presente en Production, y por ende el commit del fix de ese bug tiene que ser eliminado luego al generar release notes desde el changelog.

#### Don’t Close Issue Before Merging
NO cerrar un issue hasta que no esté mergeado su feature-branch a master. Si el dev se acuerda de poner el “fixes #n”, el issue se cerrará sólo al hacer el merge a master. (Github provee esto último automáticamente, poniendo ‘fixes #’ en el último commit del feature branch o en la descripción del del pull request, el issue se cierra al hacer merge).

#### No release-branch With Open Issues
NO hacer un release-branch A MENOS que todos los issues del milestone correspondiente a ese release estén cerrados. Si se necesita hacer un release con menos features de lo originalmente planeado en el milestone, Postpone feature BEFORE merging.

#### Postpone feature BEFORE merging
Se puede posponer un issue a un milestone posterior, solamente si su feature-branch NO fue mergeado a master. Dado “Don’t Close Issue Before Merging”, solamente se pueden posponer issues que estén abiertos.

#### Comment on Done but not Merged Issue
Si el feature está terminado, pero no va a salir en el próximo release, comentar que está listo pero no mergeado, pero NO cerrar el feature. Si el dev se acuerda de agregar el “fixes #n” en el commit que resuelve el issue, esta regla se cumple gratis.

#### Bring Forward a Feature
Si antes de cerrar y mergear un issue, se decide que se quiere adelantar de milestone, esto puede hacerse solamente si el milestone en el que se quiere incluir no estaba cerrado y por ende su release-branch aún no existe.

#### Freeze Milestone when Branching a Release
Cuando se realiza el release-branch correspondiente a un milestone, agregarle un FROZEN al nombre del Milestone para garantizar Don’t Add Features on Frozen Milestones.

#### Don’t Add Features on Frozen Milestones
Nunca asignar un issue de feature a un milestone FROZEN.

#### Bug Issues on Frozen Milestones
QA puede agregar issues de bugs a milestones FROZEN, eso implica que el bugfix debe ser hecho sobre el release-branch correspondiente a ese milestone (Bugfix On Branch).
