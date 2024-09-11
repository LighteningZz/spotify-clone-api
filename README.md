
# This Project is in progress

## Prerequisites

[Nodejs](https://nodejs.org/)  version 20

[Pnpm](https://pnpm.io/) package manager

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Before begin need manual run on your machine

This project need to initial music data from tools
a tool scraping music data from [ncs.io](https://ncs.io/)
and download and generate additional music track metadata such as track duration if they missing.
data size around 4GB 500+ song

## Initial data command

``` bash
cd tools
pnpm install
# fetch data and generated from ncs.io
pnpm run fetch
# if you skip download media but missing some property eg. duration
pnpm run fetch:skip
```

<!-- if you want store your s3
```
# require .env place at tools directory
# S3_REGION=
# S3_KEY=
# S3_SECRET=
# S3_BUCKET=
pnpm run push

``` -->

## Project setup

```bash
pnpm install
```

## Env

```bash
DATABASE_URL="postgresql://{User}:{Password}@localhost:5432/{database_name}?schema=public"
AUTH_SECRET='this_is_secret'
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
