# Session

## Attributes
- `name` - The name of the session.
- `password` - The password of the session.
- `students` - The student IDs enrolled in the session.
- `teachers` - The teacher IDs administering the session.
- `startDate` - The date the session starts.
- `endDate` - The date the session ends.
- `TP` - The TP ID of the session.

## Methods
- `serializeTeacher()` - Serializes the session for a teacher. Returns the following:
    - `id` - The ID of the session.
    - `name` - The name of the session.
    - `teachers` - The teacher IDs administering the session.
    - `students` - The student IDs enrolled in the session.
    - `startDate` - The date the session starts.
    - `endDate` - The date the session ends.
    - `TP` - The TP ID of the session.
    - `status` - The status of the session. (Either `scheduled`, `inProgress`, or `done`)
- `serializeStudent()` - Serializes the session for a student. Returns the following:
    - `id` - The ID of the session.
    - `name` - The name of the session.
    - `teachers` - The teacher IDs administering the session.
    - `startDate` - The date the session starts.
    - `endDate` - The date the session ends.
    - `TP` - The TP ID of the session.
    - `status` - The status of the session. (Either `scheduled`, `inProgress`, or `done`)
- `serialize()` - Default serialization method. By default, uses `serializeStudent()`.

## Routes
Main route: `/api/session`
- `GET /available` - Returns all available sessions with default serialization.
- `GET /all` - Returns all sessions. Takes into account the user's role and serializes accordingly :
  - If the user is an admin, uses `serializeTeacher()`, and returns all sessions.
  - If the user is a teacher, uses `serializeTeacher()` and returns all sessions where the user is a teacher.
  - If the user is a student, uses `serializeStudent()` and returns all sessions where the user is a student and are done or the sessions that are available.
