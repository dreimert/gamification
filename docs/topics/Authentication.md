# Authentication

For development purposes, if the `ENV` variable is set to `dev`, the server will automatically attempt to login to the user with the following credentials:

- `username`: `test`
- `password`: `test`

If the user does not exist, it will be created.

## Routes
To force login, use the following route:

- `GET /login` - Logs in the user with the following parameters:
  - `username` - The username of the user.
  - `password` - The password of the user.
