import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
        updated_at: data.completed_at
          ? this.#database[table][rowIndex].updated_at
          : new Date(),
        completed_at: data.completed_at
          ? this.#database[table][rowIndex].completed_at
            ? null
            : data.completed_at
          : null,
      }
      this.#persist()
      return this.#database[table][rowIndex]
    } else {
      return false
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)
    const userToBeDeleted = this.#database[table][rowIndex]
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
      return userToBeDeleted
    } else {
      return false
    }
  }
}
