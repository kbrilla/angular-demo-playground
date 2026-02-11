# Angular Template Upgrades Playground

A focused playground showcasing Angular template expression upgrades that work in the runtime and compiler without requiring any VSIX extensions. This demo uses a custom Angular build with local tarballs for StackBlitz compatibility.

## Features

- **TypeScript Template Features**: Destructuring, BigInt, computed properties, arrow params, block comments, and more
- **Optional Chaining Semantics**: Legacy vs native modes side-by-side with migration guidance
- **Style Binding Bugs**: Live demos of precedence issues in standalone components

All features demonstrated here work in the browser and compiler — no language service extensions needed.

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
npm test
```

## StackBlitz

This playground is designed to work on StackBlitz thanks to the local Angular tarballs in the `tarballs/` directory.

## Additional Resources

For more information on Angular, visit the [Angular documentation](https://angular.dev/).
