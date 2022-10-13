# API EXPRESS

## Libraries used:

### Utilities:

#### dotenv

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env

#### Redis:

redis database cache to improve performance

#### Mongoose

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

#### swagger-ui-express

Swagger UI is a collection of HTML, Javascript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API.

#### swagger-jsdoc

Swagger JSDoc is a tool that generates Swagger-compliant documentation from JSDoc comments in your source code.

### Development utilities:

#### nodemon

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

#### eslint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

#### Hidden files:

vs code addon to hide unnesesary files and folders (in this case: .vscode, node_modules and dist folders)

#### Prettier:

Prettier is a code formatter. (only using the vs code addon)

#### supertest

Supertest is used to mock out our express server so we do not have to run a http server in order to test our routes.

**How to run the project:**

1. Clone the project
2. Run npm install
3. Configure the .env variables, check the env.sample for details.
4. Run npm run dev
5. Open the browser and go to http://localhost:3001/docs
6. You can test the endpoints using the swagger UI
7. You can also test the endpoints using postman
8. You can also test the endpoints using the test files in the test folder

**How to run the tests:**
from SWAGGER UI: (similar with other tools like insomnia or postman)

1. Open the browser and go to http://localhost:3001/docs
2. Create a user
3. Login (to set the "token" cookie, or get the JWT token to put it in insomnia or postman)
4. (new cookie created in the browser) now you can test the other endpoints

TODO:
Deploy in server
