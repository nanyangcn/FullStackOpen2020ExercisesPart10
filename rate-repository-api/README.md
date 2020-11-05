![CI](https://github.com/fullstack-hy2020/rate-repository-api/workflows/CI/badge.svg)

# Rate Repository API

This is a GraphQL API for the Rate Repository application.

## ✔️ Requirements

Node (versions `12.X.X` are tested, but later versions _might_ work as well) and npm. If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## 🚀 Getting started

1. Clone this repository and run `npm install` in the `rate-repository-api` directory.

2. Rate Repository API uses the GitHub API, which has a quite small rate limit (60 requests per hour) for unauthorized requests. Therefore, we need to register it as an OAuth application to obtain client credentials. Register your OAuth application [here](https://github.com/settings/applications/new) by setting "Application name" as "Rate Repository API", "Homepage URL" as https://github.com/fullstack-hy2020/rate-repository-api and "Authorization callback URL" as http://localhost:5000. Now you should see your application [here](https://github.com/settings/developers) and by going to the application's page, see the "Client ID" and "Client Secret" values.

3. Create a file `.env` in the `rate-repository-api` directory and copy the contents of the `.env.template` file there. In the `.env` file, replace `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` variable values with your newly registered OAuth application's credentials.

4. Run `npm run build`. This will setup the SQLite database and run the migrations.

5. **(Optional)** To populate the database with some seed data you can run `npm run seed:run`. **Note:** running this command will remove all existing data.

6. All done! Just run `npm start` to start the server. After the server has started you should be able to access the GraphQL playground at http://localhost:5000/graphql.

## 🔑 Authorization

To list all the registered users, you can run this query in the GraphQL playground:

```javascript
{
  users {
    edges {
      node {
        username
      }
    }
  }
}
```

You can retrieve an access token by performing the `authorize` mutation:

```javascript
mutation {
  authorize(credentials: { username: "kalle", password: "password" }) {
    accessToken
  }
}
```

All access tokens expire after **seven days**. If you performed step 3. in the "Getting started" section, users "kalle", "elina" and "matti" all have the password "password".

You can also register a new user by performing the `createUser` mutation:

```javascript
mutation {
  createUser(user: { username: "myusername", password: "mypassword" }) {
    id
    username
  }
}
```

### Authorize requests in the GraphQL playground

A handy way to authorize requests in the GraphQL playground is to retrieve an access token using the `authorize` mutation (see above for details) and then add the following in the "HTTP HEADERS" tab below the query editor:

```json
{
  "Authorization": "Bearer <ACCESS_TOKEN>"
}
```

Replace the `<ACCESS_TOKEN>` part with your access token.

## 📖 Documentation

GraphQL playground offers documentation on how to use the API. Start the server by running `npm start`, open the GraphQL playground at http://localhost:5000/graphql and click the "docs" tab.

## 🐛 Found a bug?

Submit an issue with the bug description and a way to reproduce the bug. If you have already come up with a solution, we will gladly accept a pull request.

## ❓ FAQ

- **How to reset the database?** If you are absolutely sure that you want to remove _all_ the existing data, just remove the `database.sqlite` file in the `rate-repository-api` directory and run `npm run build`. You can run `npm run seed:run` to initialize the new database with seed data.

- **Is this production ready?** Almost. The current version of the API utilizes the SQLite database, which is not quite suitable for production. Luckily, all database queries are performed with [Objection](https://vincit.github.io/objection.js/) ORM, and changing the underlying database driver is just a matter of [configuration](http://knexjs.org/#Installation-client).
