# User

## Attributes
- `username` - The username of the user.
- `password` - The password of the user.
- `name` - The name of the user.
- `surname` - The surname of the user.
- `email` - The email of the user.
- `type` - The type of the user. (Either `admin`, `teacher`, or `student`)

## Methods
- `serialize()` - Serializes the user. Returns the following:
    - `id` - The ID of the user.
    - `username` - The username of the user.
    - `name` - The name of the user.
    - `surname` - The surname of the user.
    - `email` - The email of the user.
    - `type` - The type of the user. (Either `admin`, `teacher`, or `student`)
- `serializePublic()` - Serializes the user for public use. Returns the following:
    - `id` - The ID of the user.
    - `name` - The name of the user.
    - `surname` - The surname of the user.
    - `type` - The type of the user. (Either `admin`, `teacher`, or `student`)
- `isAdmin()` - Returns `true` if the user is an admin, `false` otherwise.
- `isTeacher()` - Returns `true` if the user is a teacher or admin, `false` otherwise.
- `isStudent()` - Returns `true` if the user is a student, `false` otherwise.

## Routes

Main route: `/api/user`

- `GET /me` - Returns the current user with default serialization.
- `GET /:id` - Returns the user with the given ID with public serialization. Only teachers and admin can access this route for any user, while students can only access this route for themselves.
