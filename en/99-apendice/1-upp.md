## UPP
UPP (Unified Principles and Practices) is an attempt to consolidate the good practices we have gathered for the development of projects throughout all these years. Like everything else in Manas, and this handbook in particular, it is far from being written in stone and is entirely dynamic; should you have a suggestion on how to improve the process, just send a pull request with the changes.

UPP's format is a set of checklists that the project lead and the developers must verify at different stages throughout the project. To ensure it is brought into our daily working culture, we propose to remind each other these items as frequently as is needed.

### Artifacts

_Artifacts should be ready since the beginning of the project, and stay up-to-date whenever an issue is closed._

#### Code repository
* Follow **git-flow** as branching and tagging policy.
* Follow the [repository rules](./2-repository-rules.md) guidelines.
* Gather devtools and scripts useful for the project in a single `/tools` folder in the repository, with a brief explanation on the motivation and the usage of the tool.

#### Initial repository files
* **README.md**: include a brief explanation of the project (keeping in mind that it is the first thing anyone sees when opens the repository), how to set up a development environment, and a minimal description of its architecture.
* **LICENSE**: choose an appropriate license for the project and ensure it is clear.
* **CHANGELOG.MD**: keep a [changelog](http://keepachangelog.com/) up to date as each issue is closed, so that a _user_ of the system can understand the changes in each version.

#### Issue tracker
* **Milestones**: keep a set of future milestones with a description of their main goal and the epics it contains, noting that it might (actually should) change as the project moves on; this acts as a project's roadmap.
* **States**: define the states that compose a ticket's lifecycle, and the action items that trigger a transition between states.
* **Versioning**: keep a versioning policy following the repository rules.

#### Design repository
* **InVision** (or similar) to store the revisions of the project's design.
* **Design per milestone**: after designing the design goal for a major release, work together with the design team to define the screens for all intermediate versions that might reach production or be reviewed by an external audience; associate these intermediate UX versions to the roadmap's milestones, and always design them considering the current state of the application.
* **Design idioms catalog** for an app, showing how to filter, navigate, display buttons, etc; so it can be used when a developer needs to add a new related functionality.

#### Continuous Integration
* Ensure the project's status is visible and all efforts are made to ensure it stays green.
* Use the CI or another external service to generate binary artifacts (if any), to avoid inconsistencies that may arise from the different development environments.
* We prefer Travis or Circle.

#### Provisioning & Deployment
* Reproducibility: a developer without any particular context should be able to rely on the documentation, follow the deployment instructions, run the provided scripts and have an environment up and running.
* Lock the versions of all dependencies so there are no unforeseen changes when a new version of a dependency is released.
* Update the provisioning and deployment guide and/or scripts whenever an issue is closed, should there be any changes required.

#### Server maintenance
* Schedule backups on every server
* Periodically test that these backups can actually be restored.
* Keep the project's secrets in a secure and accessible location.
* Keep an inventory of all servers associated to the project.
* Monitor servers' health using New Relic or a similar tool.
* Monitor the running services using Monit or a similar tool.

#### Environments
* Nightly (optional, ideal for large and complex systems)
* Staging (for testing purposes, can be broken)
* Demo (optional, to showcase the current work before moving into production)
* Production (stable)

#### Testing
* Keep a list of test cases.
* Store the datasets used for tests.

#### Documentation
* Use Google Drive for documents and files in general, creating a folder for the project in `Manas.Projects` at [man.as/docs](http://man.as/docs); avoid sharing documents 1:1.
* Include a master document in such folder, which details how each item of this list is actually implemented and its location, using the template available in `Manas.Projects`.

#### Vault
* Create a 1password vault for all the project's secrets and share it with whomever it is necessary; keep the vault's password in a secure place, such as a personal vault.

### Tasks

_Checklist of tasks to execute on different stages of the project._

#### When starting the project
* Create the code repository with the initial files and issue tracker
* Create the Invision design repository
* Create a Slack channel and define a keyword in Brium
* Create a 1pass vault for storing the project secrets
* Create a folder for the project files in Drive at [Manas.Projects](http://man.as/docs)
* Create a master document using the template in `Manas.Projects` that acts as an index for all the project's artifacts

#### Upon the first deployment
* Set up the CI
* Set up the provisioning and deployment scripts and guides
* Set up the environments (staging at least) using such scripts
* Set up monitoring for each environment
* Share each environment's secrets in the shared vault

#### Upon closing an issue
* Honour the commit message format listed in the repository rules
* Focus on the _why_ over the _what_ in the commit messages
* Link to the corresponding issue in each commit
* Include a brief description of the motivation of the design decisions involved in the issue, including hints on how to test it
* Include requests to the design team inside the issue's thread
* Update the CHANGELOG
* Update any other artifact that is impacted by the issue
* Organise a code review if the issue is deemed complex enough

#### Upon closing a milestone
* Appropriately tag the code
* Update the roadmap if future releases changed
* Update the CHANGELOG including the new milestone
* Check if there are any artifacts that should have been updated when closing an issue in the milestone and were missed
* Organise a design review with the design and QA teams to evaluate the implemented design and evaluate its usability

#### Weekly
* Check that the budget in hours assigned to the Brium keyword is enough for 1 week of work of the entire team. For instance, if the team has 6 people assigned, ensure that there are at least 6 weeks of work left in Brium.

#### Monthly
* Update the versions of the dependencies used, ensure the project's components are up-to-date with the released patches, and check for any reported security vulnerabilities. Check if there is a nearby end-of-life of a component that requires a major update, and warn the client if necessary.

#### Every four months
* Set up a development environment from scratch
* Set up a production environment from scratch
* Restore a production environment from scratch using a backup
