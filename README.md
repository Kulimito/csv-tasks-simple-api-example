## About the challenge 🚀🚀

In this challenge you will develop an API to perform the CRUD of your *tasks* (tasks).

The API must contain the following functionality:

- Creating a task
- List of all tasks
- Update a task by `id`
- Remove a task by `id`
- Mark a task as complete by `id`
- And the real challenge: Importing tasks in bulk via a CSV file

### Routes and business rules

Before the routes, let's understand what structure (properties) a task should have:

- `id` - Unique identifier of each task
- `title` - Title of the task
- `description` - Detailed description of the task
- `completed_at` - Date when the task was completed. The initial value must be `null`
- `created_at` - Date when the task was created.
- `updated_at` - Must always be changed to the date when the task was updated.

Routes:

- `POST - /tasks`
    
     It should be possible to create a task in the database, sending the fields `title` and `description` through the `body` of the request.
    
     When creating a task, the fields: `id`, `created_at`, `updated_at` and `completed_at` must be filled in automatically, according to the orientation of the properties above.
    
- `GET - /tasks`
    
     It should be possible to list all tasks saved in the database.
    
     It should also be possible to perform a search, filtering tasks by `title` and `description`
    
- `PUT - /tasks/:id`
    
     It should be possible to update a task by `id`.
    
     In the `body` of the request, it should only receive the `title` and/or `description` to be updated.
    
     If only the `title` is sent, it means that the `description` cannot be updated and vice versa.
    
     Before carrying out the update, validation must be carried out if the `id` belongs to a task saved in the database.
    
- `DELETE - /tasks/:id`
    
     It should be possible to remove a task by `id`.
    
     Before carrying out the removal, a validation must be done if the `id` belongs to a task saved in the database.
    
- `PATCH - /tasks/:id/complete`
    
     It must be possible to mark the task as complete or not. This means that if the task is completed, it should return to its “normal” state.
    
     Before the alteration, a validation must be done if the `id` belongs to a task saved in the database.
    
## Going beyond

Some suggestions of what can be implemented:

- Validate whether the `title` and `description` properties of the `POST` and `PUT` routes are present in the `body` of the request.
- In the routes that receive the `/:id`, in addition to validating whether the `id` exists in the database, return the request with a message informing that the record does not exist.


