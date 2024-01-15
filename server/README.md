## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docs

### NestJS CLI

Useful commands:

- `nest -h`: Show helper documentation
- `nest g module [name]`: The relevant steps/logs will be visible in `cmd` window
- `nest g controller [name]`: The relevant steps/logs will be visible in `cmd` window
  - flag `--no-spec`: by default Nest will generate tests file for the controller (TDD approach ;) )
    adding this flag will prevent the creation of the test file

### NestJS Modules

- Each application has at least one module - the root module, the starting point of the application.
- A way to organize components based on features (i.e a module -> feature) when each module is in its own folder
- Module's are singletons, therefore a module can be imported by multiple other modules

#### Define a module

- defined by annotating a class with **@Module** decorator, which provides metadata that NestJS uses to organize the application structure
- **@Module** decorator properties:
  - **providers**: array of providers to be available within the module via dependency injection
  - **controllers**: array of controllers to be instantiated within the module
  - **exports**: array of providers to export to other modules
  - **import**: a list of modules required by this module, any exported providers by these modules will be available in the current module via dependency injection

example:

```javascript
@Module({
  providers: [XXXProvider],
  controllers: [XXXController],
  imports: [
    ModuleA,
    ModuleB,
    ModuleC,
  ],
  exports: [
    XXXServiceA,
  ]
});
export class XXXModule {}
```

### NestJS Controllers

- Responsible for handling incoming **requests** and returning a **response**
- Bound to a specific path
- Contain **handlers**, which handle **endpoints** and **request methods** (GET, POST, etc...)
- Can use dependency injection to consume providers within the same module

#### Define a controller

- defined by annotating a class with **@Controller** decorator
- **@Controller** decorator accepts a string, which is the **path** to be handled by the controller

#### define a handler

- handlers are simply methods within the controller class, decorated with decorators such as **@Get**, **@Post**, etc...

example:

```javascript
@Controller('/tasks'){
export class TasksController {
  @Get()
  getAllTasks() {
    // do stuff
    return ...;
  }

  @Post()
  createTask() {
    // do stuff
    return ...;
  }
}
```
