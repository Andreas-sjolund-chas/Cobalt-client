# Cobalt

<!--ts-->

* [Directory Layout](#directory-layout)
* [Quickstart](#quickstart)
* [Installation](#installation)
* [Usage](#usage)
  * [Bash Commands](#bash-commands)
* [Storybook](#storybook)
* [Git](#git)
  * [Branching](#branching)
  * [Merging](#merging)
  * [Releases](#releases)
* [Retrospectives](#retrospectives)

<!--te-->

## Links

[Live application](https://docs.google.com/document/d/1-92bxTM8nGuZrtYpmqrGB38ZoBNEBZ5O0U_xpF_lRxE/)

## Directory Layout

```bash
./
├── /api                    # Directory for backend, see below for more detail (created when running /bin/install)
├── /client                 # Directory for frontend, see below for more detail (created when running /bin/install)
├── /client/src/elements    # Directory for smaller components
├── /client/src/stories     # Directory for storybook stories
├── docker-compose.yml      # Defines Docker services, networks and volumes, do not touch unless you know what you are doing
└── README.md               # The file you are reading right now
```

**NOTE**: The `api` and `client` folders are in fact separate repositories (git submodules):

* Backend: [https://github.com/chas-academy/cobalt-api](https://github.com/chas-academy/cobalt-api)
* Frontend: [https://github.com/chas-academy/cobalt-client](https://github.com/chas-academy/cobalt-client)

This means when making changes to either you need to commit and push in the separate repositories.

## Quickstart

## Install and Start the Apps

1.  First download and install the [Docker Community Edition](https://www.docker.com/community-edition).
2.  From the root of the project, run `bin/install`, this will clone and install all the different apps, configure the database etc. – take a break while this runs.
3.  If the installation process is successful, both the API and client services shall be started and accesible locally at:

* API: <http://localhost:7770>
* APP: <http://localhost:7771>

# Usage

## Bash Commands

For easier access, you can run these following commands from the the `root` of the project.

| Command                                | Description                                                    |
| -------------------------------------- | -------------------------------------------------------------- |
| `./bin/install`                        | Clone the apps, build the Docker containers, and initialise db |
| `./bin/reinstall`                      | Delete the apps and run the installation process               |
| `./bin/update`                         | Pulls the latest changes from API and client                   |
| `./bin/start`                          | Start all the services (API, client, and database)             |
| `./bin/stop`                           | Stop all the services                                          |
| `./bin/console <container ID or Name>` | Access the terminal console of the API or client containers    |

Note: To manage separate Docker instance for API or client,
open another terminal console and change the project directory from `root` to `api` or `client` and run the commands above.

# Storybook

### Starting storybook locally

1.  `cd client`
2.  `npm run storybook` or `yarn run storybook` - Runs at http://localhost:9009

# Git

### Branching

From develop: `git checkout -b <github-issue-id>-feature/<your-feature-name>`

For git to work properly with waffle.io features should be name as shown below:

`<github-issue-id>-feature/<your-feature-name>`

> Example: `12-feature/button-defualt`

### Merging

1.  `git checkout develop`
2.  `git pull`
3.  `git checkout <feature-branch>`
4.  `git rebase develop`
5.  Resolve conflicts
6.  `git add` Add your resolved conflicts
7.  `git rebase --continue`
8.  Repeat step 6 and 7 until message: 'No rebase in progress?' appears
9.  `git push -f`
10. Add pullrequest on github

### Releases

Release branches should always be named as shown below:

`release/`major`.`minor`.`patch

> Example: `release/1.2.0`

#### Creation

`git checkout -b release/0.2.0 develop`

#### Sharing the release branch

1.  `git checkout release/0.2.0`
2.  `git push origin release/0.2.0`

#### Get latest changes for a release branch

`git pull --rebase origin release/0.2.0`

#### Finalize and tag a release branch

1.  `git checkout master`
2.  `git merge --no-ff release/0.2.0`
3.  `git tag -a 0.2.0`
4.  `git checkout develop`
5.  `git merge --no-ff release/0.2.0`
6.  When all the previous steps are done delete the branch with: `git branch -d release/0.2.0`
7.  If the branch was pushed to github delete the remote with: `git push origin :release/0.2.0`

#### Push the merged branches and tag

`git push origin master`

`git push origin develop`

`git push origin --tags`

# Retrospectives

2018-04-20: [Retrospective, Fri 18 Apr](https://docs.google.com/document/d/1-92bxTM8nGuZrtYpmqrGB38ZoBNEBZ5O0U_xpF_lRxE/)
