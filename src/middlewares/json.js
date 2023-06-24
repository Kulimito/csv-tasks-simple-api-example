export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (e) {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}

// export function json(req, res) {
//   return new Promise((resolve, reject) => {
//     const buffers = []

//     req
//       .on('data', (chunk) => buffers.push(chunk))
//       .on('end', () => {
//         try {
//           req.body = JSON.parse(Buffer.concat(buffers).toString())
//           resolve()
//         } catch (e) {
//           req.body = null
//         }
//       })
//   })
// }
