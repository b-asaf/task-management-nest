# Postgres DB & PgAdmin (UI tool) inside docker:

## Option A - run via command line

1. Run Postgres container using Postgres image.
   in the terminal type: `docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres`
2. Define PostgreSQL database:

   2.1. Create a server:

   - Give an easy name to remember
   - In the connection tab define:

     - hostname / Address: When running on a local machine use `localhost`
     - port: No need to change, leave it as it is and make sure it is identical to the container port number in the command of step 1
     - username: No need to change
     - password: Define as the password in the command of step 1

       2.2 Create a database under the newly created server.

   - **This name will be used in the app**

### Short docker tutorial:

1. explanation of the following command: `docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres`

   - `docker run`: run the container
   - `--name [container name]`: an optional param, easy to maintain a container with names and not random strings
   - `-p [host/current machine port number]:[container port number]`: mapping between the ports to allow communication
   - `-e [env. variable name]=[env. variable value]`: optional params when we use the environmental variable that is well defined in the .env files
   - `-d`: running the container in detached mode, when the terminal is closed -> the container will continue to run
   - `[container name]`: the actual container name that is stored on the cloud in docker-hub

2. `docker container ls`: see all the containers and their status (running, stopped)
3. `docker container stop [container name]`: stop the running of a docker container with a specific name
4. `docker container start [container name]`: start the running of the docker container with a specific name
5. `docker container rm [container name]`: delete a container with a specific name, before deleting a container it must be stopped

## Option B - define docker-compose.yml file

1. define "docker-compose.yml" that contains definition for database and pgAdmin
2. follow next section to work with pgAdmin inside docker container

   2.1. If DB is not defined in the "docker-compose.yml", one can be defined via pgAdmin

### PgAdmin in container

1.  Make sure DB is up and running

    1.1. when running `docker-compose up -d` postgres DB should be up in the docker.

    1.2. pgAdmin in container (http://localhost:5050/browser/) or in client (app installed in computer) with credentials that are defined in pgAdmin service section in the "docker-compose.yml" file:

          default email: admin@example.com
          default password: admin

2.  Open pgAdmin and make sure that DB and tables exists, if not continue to step 3 (TBD).

    2.1. Click on "Add New Server" Or right click on 'Servers' -> 'Register' -> 'Server...'

    2.1.1. General tab, add name (in our case): `task-management-nest`

    2.1.2. Connection tab, add the following:

    - Hostname:

      - when pgAdmin run _locally_: "localhost"
      - when pgAdmin run in a _container_: "database" (the name of the db service that is defined in "docker-compose.yml" file)

    - Port: make sure its the same as in the "docker-compose.yml" file (TODO move it to ".env" file)
    - Username: make sure its the same as in the "docker-compose.yml" file (TODO move it to ".env" file)
    - Password: enter the same value as in the "docker-compose.yml" file (TODO move it to ".env" file)
    - Make sure to save the password

      2.1.3. Click "Save"

      2.1.4. New Server should be visible with `postgres` DB inside
