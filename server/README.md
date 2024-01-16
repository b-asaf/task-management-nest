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
- `nest g service [name]`: The relevant steps/logs will be visible in `cmd` window

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

### NestJS Providers

- Can be injected into constructors if decorated as an **@Injectable** via dependant injection
- Can be a plain value, a class, sync/async factory etc...
- Providers must be provided to a module for them to be usable
- Can be exported from a module, and then be available to other modules that import this provider

#### NestJS Services

- Services are implemented using providers, **Not all providers are services**
- Can be implemented as Singleton when wrapped with **@Injectable()** and provided to a module, this means that the same instance will be shared across the application acting as a single source of truth
- Most of the heavy business logic will reside inside a service. for example, the service will be called from a controller to validate data, create an item in DB, return a response, etc...

example:

```javascript
import { XXXControllerA } from './path/name';
import { XXXServiceA } from './path/name'; // this service is injectable
import { XXXServiceB } from './path/name'; // this service is injectable

@Module({
  controller: [
    XXXControllerA
  ],
  providers: [
    XXXServiceA,
    XXXServiceB
  ]
})
export class XXXModule;
```

### Dependency Injection in NestJS

- Any component within NestJS ecosystem can inject a provider that is decorated with the **@injectable** decorator
- The dependencies are defined in the constructor of the class, NestJs will handle the injection behind the scene and it will behave as a class property

example:

```javascript
import { TasksService } from './tasks.service'; // this service is injectable

@Controller('/tasks')
export class TaskController {
  // injecting the service in the constructor
  // - NestJS will initialize a service instance if its not already exists,
  // - if its already exists NestJs will provide that instance
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    // taskService is a property of the TaskController class
    // getAllTasks is a public method inside the tasksService
    return await this.tasksService.getAllTasks();
  }
}
```
