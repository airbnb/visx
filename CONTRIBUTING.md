# Contributing to VX

## Development

[Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) are used to manage dependencies and
build config across packages in the umbrella `vx` monorepo, and
[lerna](https://github.com/lerna/lerna/) is used to manage releases and versioning.

```
vx/
  lerna.json
  package.json
  packages/
    vx-package-1/
      src/
      test/
      lib/
      esm/
      package.json
      ...
    vx-package-2/
      ...same

    ...more packages
```

Run the following to setup your local dev environment:

```sh
# Install `yarn`, alternatives at https://yarnpkg.com/en/docs/install
curl -o- -L https://yarnpkg.com/install.sh | bash

# Clone or fork `vx`
git clone git@github.com:hshoff/vx.git # or your fork
cd vx

# install dependencies, and have `yarn` symlink within-`vx` dependencies
yarn

# build packages and generate types for local development
yarn build
```

Upon modification of a single `package` you can run `yarn build-one --workspaces=@vx/package` from
the `vx` monorepo root to re-build the package with your changes. You can use the local
[`next.js`](https://nextjs.org) dev server within `packages/vx-demo` to view and iterate on your
changes in the gallery. From the `packages/vx-demo` folder run `yarn dev` to start the next server
which (if correctly sym-linked) will also watch for changes you make to other packages (upon
re-building them).

`vx` uses [`@airbnb/nimbus`](https://github.com/airbnb/nimbus) to generate build configuration for
`eslint`, `prettier`, `jest`, `babel`, and `typescript`.

## 📄 Pull Request Titles

The PR title is also the changelog line item, and as such, should be clear, concise, and easily
understandable when groking the changelog.

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- When adding a new component, be direct and explicit ("Add Button component" or "New Button
  component").
- When updating a component, prefix with the component name wrapped in parens ("new(Button): Add new
  size prop").
- When touching a non-component, be as descriptive as possible ("Update NewRelic metrics config").

### Release Prefixes

VX utilizes [lerna](https://lernajs.io/) and
[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) to enable
automatic releases when a PR is merged to master. For this to work correctly, all PR titles must be
prefixed with one of the following tags defined in the
[beemo preset](https://github.com/beemojs/conventional-changelog-beemo).
