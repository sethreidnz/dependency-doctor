# Dependency Doctor

Dependency doctor is a set of MCP tools that will guide you through upgrading dependencies in your project using modern AI coding agents. We've broken down the steps you need to take so that you can work through the steps to safely update packages with ease.

## Contributing

This section is intended to help engineers work in the codebase

### Getting started

#### 1. Prerequisites

- Node 22 - [Install using Volta](https://docs.volta.sh/guide/getting-started)
- Powershell - [How to install](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.5)

#### 2. Clone the repo

Clone the repo to your machine:

```bash
git clone https://github.com/sethreidnz/dependency-doctor.git
```

#### 2. Install dependencies

From the root of the repository run:

```bash
npm install
```

#### 3. Build the project

To validate everything installed correctly run the build:

```bash
npm run build
```

### Available scripts

This project is setup to make locally validating your changes easy using npm scripts.

#### Type-checking

To run TypeScript typechecking for the whole workspace:

```bash
npm run typecheck
```

#### Linting

To run linting using eslint and prettier:

```bash
npm run lint
```

#### Testing

To run tests for the workspace:

```bash
npm run test
```

#### Spellcheck

To run spellchecking across all documentation and code comments:

```bash
npm run spellcheck
```

#### Validate all checks

To run all validation checks (lint, typecheck, test, spellcheck) in parallel before pushing:

```bash
npm run validate
```

#### Build

To build the `@dependency-doctor/mcp` package:

```bash
npm run build
```

#### Full list of commands

To see the full list of commands see the [./docs/internal/project-setup/npm-workspace-scripts.md](./docs/internal/project-setup/npm-workspace-scripts.md)

### Documentation

We have public and internal documentation which can be found here:

[./docs//README.md](./docs/README.md)
