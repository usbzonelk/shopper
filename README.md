
# shopper

  

**This is a e-commerce website backend (like: https://www.nanotek.lk/) powered completely with NodeJS as runtime, MongoDB as the database and GrpahQL for api querying.**

  

## **Should include features like:**

## product listings, shopping cart functionality, user reviews, product blog, chat application and order processing.

  

## File structure:

 - **src**: This directory contains all the source code for the project.
   
 -  **config**: Contains configuration files.
   
 -  **database.js**: Handles database connection setup, using a MongoDB
   client library like Mongoose.
   
  - **controllers:** Contains the controllers responsible for handling
   business logic and interactions with the database.
   
  - **models**: Defines the Mongoose models that represent the data
   structures in the MongoDB database.
   
-   **resolvers**: Contains the GraphQL resolver functions that handle the
   GraphQL queries and mutations.
   
 -  **schemas**: Defines the GraphQL schemas using the GraphQL schema
   definition language (SDL).
   
  - **utils**: Contains utility functions or modules that can be used across
   the project.
   
 -  **server.js**: The entry point of the application that sets up the
   Express.js server, GraphQL middleware, and starts the server.
   
  - **.env:** Configuration file where you can store environment variables,
   such as database connection details or API keys.
   
   - package.json: Configuration file for npm dependencies and scripts.
