# starterkit

[![npm version](https://badge.fury.io/js/starterkit.svg)](https://badge.fury.io/js/starterkit) [![Build Status](https://travis-ci.org/ifrost/starterkit.svg?branch=master)](https://travis-ci.org/ifrost/starterkit) [![codecov](https://codecov.io/gh/ifrost/starterkit/branch/master/graph/badge.svg)](https://codecov.io/gh/ifrost/starterkit) [![Known Vulnerabilities](https://snyk.io/test/github/ifrost/starterkit/badge.svg)](https://snyk.io/test/github/ifrost/starterkit) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/f5cb26d7c6304aeca5d8550876b9aa24)](https://www.codacy.com/app/ifrost/starterkit?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ifrost/starterkit&amp;utm_campaign=Badge_Grade) [![Greenkeeper badge](https://badges.greenkeeper.io/ifrost/starterkit.svg)](https://greenkeeper.io/)

## Starter kit includes:

  * Node app + webpack (dist/starterkit.js)
  * Test suite with mocha/chai/sinon
  * Code coverage generated with istanbul
  * TravisCI config
  * ESLint config
  * JSDoc config
  * Build & publish npm-scripts
  * README.md with badges
  * scripts/
    * changelog.js - generates changes since last tag
    * version.js - update and tags current version

## Installation:

```
> mkdir my-project
> cd my-project
> npm init
> npm install -g starterkit
> starterkit-install
> npm install
```

## Configure Travis CI

  * Add GITHUB_API_KEY - GitHub / Profile / Settings / Personal Access Tokens (select public_repo)
  * Add NPM_API_KEY - authToken from ~/.npmrc
  * Add NPM_EMAIL - your email
  * Select Auto cancel branch builds
  * Select General section:
    * Build only if .travis.yml is present
    * Build branch updates
    * Build pull request updates
 
## Create branches

  * release
  * gh-pages
 
## Add project to:

  * https://travis-ci.org - to test branches continuously
  * https://codecov.io - to report test coverage
  * https://snyk.io - to check vulnerabilities in your code and dependencies
  * https://www.codacy.com - for automatic code checks
  ** Add Codacy badge to README.md
  * https://greenkeeper.io - to keep dependencies up to date

# NPM script commands

  * **eslint** - runs linting with esliint
  * **doc** - generates documentation in docs/code
  * **build** - creates browser build
  * **test** - runs tests
  * **coverage** - generates test coverage report
  * **codecov** - publishes coverage report (part of travisCI config, see .travis.yml)
  * **version** - releases new version (runs tests, generates changelog, builds the project, adds changes to git and tags it)
