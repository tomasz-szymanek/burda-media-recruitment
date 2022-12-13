# burda-media-recruitment

Recruitment task for Burda Media


# Setup

## assumption

I am assuming that you use `yarn` in your local environment (not on docker). If not, replace any `yarn` occurance in this document to your favourite package manager.

## docker environment

1. install docker

2. create .env file in root of the project

```
PORT = 3000
```

3. start docker

```
docker compose up
```

## npm scripts

- To run tests use `yarn run test`
- To start the app use `yarn run start`
- To lint and check the code use `yarn run lint && yarn run prettier`

## husky

There are precommit hooks that run tests, linter and formatter on all code. When the code will get larger, we should drop the tests from hooks and make it lint only the code that's changing. (In real life environment I would create JIRA/JIRA-like software ticket for tracking that issue)

## github actions

I've spared myself creating GH actions because of Husky, but I am aware of them and I would use them in real life environment.

## swagger 

After starting project, documentation is available under 
```
http://localhost:${PORT}/documentation
```