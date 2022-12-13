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
- To lint and check the code use `yarn run lint && yarn run format:check`

## husky

There are precommit hooks that run tests, linter and formatter on all code. When the code will get larger, we should drop the tests from hooks and make it lint only the code that's changing. (In real life environment I would create JIRA/JIRA-like software ticket for tracking that issue)

## github actions

I've spared myself creating GH actions because of Husky, but I am aware of them and I would use them in real life environment.

## swagger 

After starting project, documentation is available under 
```
http://localhost:${PORT}/documentation
```

## postman collection

There is an example postman collection in the repository. In real life situation i tend to create a few smoke tests in this tool to aid QA team.

# important

1. Algorithm doesn't work for float numbers, as some values are used as a matrix index. In real life situation I would ask the business about that, since there is no requirement for that in a task and I am assuming that the app is only for the demonstration purposes.

2. Swagger doc is for demonstration purposes, it lacks types that should be moved to definitions folder, otherwise annotations would get too long in the controller. In final version of the app they would be available in YAML format under specific endpoint for swagger to consume.

3. Knapsack calculation function was inspired by the stuff I have found online, but I think my implementation is much cleaner and easier to read.