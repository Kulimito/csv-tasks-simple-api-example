import csv from 'csv-parser'

export async function csvParserHandler(req, res) {
  for await (const chunk of req.pipe(csv())) {
    const entries = Object.entries(chunk)

    if (entries.length == 2) {
      const [[_, titleValue], [__, descriptionValue]] = entries
      if (titleValue !== 'title' && descriptionValue !== 'description') {
        try {
          const data = {
            title: titleValue,
            description: descriptionValue,
          }

          await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          })
        } catch (e) {
          return res
            .writeHead(400, {
              'Content-Type': 'application/json',
            })
            .end(
              JSON.stringify({
                ErrorMessage:
                  'Ocorreu algum erro durante a criação das tasks via csv upload. Tente novamente.',
              })
            )
        }
      }
    }
  }
  return res
    .writeHead(201, {
      'Content-Type': 'application/json',
    })
    .end(JSON.stringify({ message: 'Tasks criadas com sucesso.' }))
}
