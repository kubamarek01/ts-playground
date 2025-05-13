import express from 'express'
import cors from 'cors'

import userRoutes from './routes/user.routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, TypeScript!')
})

app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})