import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { read } from 'node:fs'
import { csvParserHandler } from './utils/csv-helper.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search,
            }
          : null
      )

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (title && description) {
        const task = {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: new Date(),
          updated_at: null,
        }

        database.insert('tasks', task)

        return res.writeHead(201).end(JSON.stringify(task))
      }

      return res.writeHead(400).end(
        JSON.stringify({
          Error:
            "O corpo da requisição deve conter 'title' e/ou 'description'.",
        })
      )
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (title || description) {
        const updatedTask = database.update('tasks', id, {
          ...(title ? { title } : {}),
          ...(description ? { description } : {}),
        })

        if (updatedTask) {
          return res.writeHead(200).end(JSON.stringify(updatedTask))
        }
        return res
          .writeHead(400)
          .end(JSON.stringify({ Error: "'id' incorreto." }))
      }

      return res.writeHead(400).end(
        JSON.stringify({
          Error:
            "O corpo da requisição deve conter 'title' e/ou 'description'.",
        })
      )
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const updatedTask = database.update('tasks', id, {
        completed_at: new Date(),
      })

      if (updatedTask) {
        return res.writeHead(200).end(JSON.stringify(updatedTask))
      }

      return res
        .writeHead(400)
        .end(JSON.stringify({ Error: "'id' incorreto." }))
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const deletedUser = database.delete('tasks', id)

      if (deletedUser) {
        return res.writeHead(200).end(JSON.stringify(deletedUser))
      } else {
        return res
          .writeHead(400)
          .end(JSON.stringify({ Error: "'id' incorreto." }))
      }
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/upload'),
    handler: (req, res) => csvParserHandler(req, res),
  },
]
