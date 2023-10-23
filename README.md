# Next.js Template

This is a starter template for building web applications using Next.js, React.js, TypeScript, and Emotion.js.
It includes configuration files for Prettier, ESLint and Husky, and also includes Storybook for visual testing of components.

## Installation

To use this starter template, click on the "Use this template" on the [GitHub](https://github.com/Cinnamon-Agency/template-nextjs-internal) or you can simply clone this repository:

```
git clone git@github.com:Cinnamon-Agency/template-nextjs-internal.git
```

Then, install the dependencies:

```
yarn install
```

## Usage

To start the development server, run:

```
yarn dev
```

This will start the development server on http://localhost:3000.

To run Storybook, run:

```
yarn storybook
```

This will start the Storybook server on http://localhost:6006.

To build the project for production, run:

```
yarn build
```

This will create an optimized build of the project in the out directory.

To run the optimized production build, run

```
yarn start
```

## Configuration

This starter template includes configuration files for ESLint, Prettier and Husky.

- ESLint statically analyzes your code to quickly find problems
- Prettier is a code formatter that ensures consistent code style across the project
- Husky is a git hook manager that ensures that certain scripts are run before commits

## Docs

- [Development Process](./docs/development_process.md)
- [Pull Request Naming](./docs/pull_request_naming.md)
