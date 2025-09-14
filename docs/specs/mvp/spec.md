# Analyze Dependencies

This spec is for the initial feature of dependency doctor to allow the user to run a prompt to analyze their dependencies. This will result in running various commands, collecting the information and outputting summaries in a particular location for the user and the AI agent to use as context going forward.

## Background

Keeping packages up to date in a software project is challenging and timeconsuming work which most engineers would rather not do. But regularly upgrading packages is important from a security perspective and to ensure the project doesn't become stuck on stale dependencies resulting in "dependency hell". Dependency doctor is a project aimed at making this process easier, initially for npm, but in a more general sense for all package managers and languages.

The project has already been bootstrapped with code quality and testing tools, and scaffolded out a Typescript MCP server using [xmcp](https://xmcp.io/docs) and you can read more in the [internal docs](../../internal/README.md)

## The proposal

The proposal is to build a simple MCP server that is able to automate away the steps that an engineer would usually take to analyze, prioritize and carry out package upgrade tasks. One key aspect that needs to be considered is making this a "pluggable" system so that people who want their language or package manager supported can implement just to code carry out the steps dependency doctor defines and then they can take advantage of the same features.

## Using NPM as an MVP

The idea is that we will use npm as the first use case and test it on some existing projects to get the abstraction right. Once that is done we can then implement the plugins for other package managers such as yarn or pnpm, and then other languages such as dotnet or golang.

The rest of the document will focus on the npm MVP.

### Workspace files

As part of the running of dependency doctor we will consider the main config file, and also create documentation and session notes to have context for next time an engineer runs the tool.

```bash
.dependency-doctor/
    /data
      analyzed.json
    /session-notes
      2025-08-12-analyze.md # notes from a particular analyze run
      2025-08-12-upgrade.md # notes from a particular upgrade run
    config.yml # main config file to allow users to define settings for dependency-doctor
    status.md # the main status document that has the groupings and the details from the analysis
```

#### `config.yml`

```yml
validate-command:
  - npm run validate
```

### Desired install process

We want this to be super easy to install, and I think xmcp gives us this by making it an npm package. The steps would ideally be:

```bash
npm install -g @dependency-doctor/mcp
```

We will need to support an init command so that people can setup their config file

```bash
npx @dependency-doctor/mcp init
```

Which will create:

```bash
.dependency-doctor/
    config.yml # empty file ready for the user to enter stuff (or we build later a way to collect settings from them in the init)
```

### The high-level upgrade tasks

The process to update packages can be split into two main phases which I think we can translate into mcp prompts

#### 1. Analyze

1. Create the `/session-notes/{date}-analyze.md` based on the template [analyze.md](../../../templates/session-notes/analyze.md)
1. Get dependency status - Run `npm outdated`, `npm audit` and outputs it into `raw.json` like `{ outdated: {}, audit: {} }`
1. Upgrade classification - Inject the raw dependency data and carry out classification steps and outputs it into `analyzed.json` in a domain specific format for use in next steps
   - Group packages by peer-dependencies, common dependencies, groups defined in config.yml
   - Major vs minor updates
   - Difficultly of upgrading
1. Giving the agent the context from the analyze step and the status.md template and get it to update the status and groupings and get user input
1. Giving the agent the context from the analyze step and the plan.md and suggest any changes based on the new understanding

#### 2. Upgrade

1. Create the `/session-notes/{date}-upgrade.md` based on the template [upgrade.md](../../../templates/session-notes/upgrade.md)
1. Determine a package or package group to upgrade
1. Create a plan in the session notes with a plan to carry out the upgrade
1. Get human input
1. Carry out update
1. Run validate command
1. If successful then get approval from human approval and update session notes to reflect
1. If failed then get update session notes with issue and get human input

## Work streams

We are going to split this into two sequential work streams

- Analyze - Build the analyze prompt/workflow
- Upgrade - Build the upgrade prompt/workflow

## Planning

The planning will be done in this document to meet the requirements:

- [analyze-plan.md](./analyze-plan.md)
- [upgrade-plan.md](./upgrade-plan.md)
