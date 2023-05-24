import express from 'express'

let users = [
    { id: 1, name: 'Jorgito', age: 21 },
    { id: 2, name: 'Julito', age: 35 },
    { id: 3, name: 'Susanita', age: 19 },
    { id: 4, name: 'Felipito', age: 23 },
]

const cursos = [
    { id: 1, name: 'Backend', teacher: 'Alex Marin' },
    { id: 2, name: 'ReactJs', teacher: 'Mark Zuckerger' },
]

const app = express()
app.use(express.json()) //middleware!

app.get('/', (req, res) => res.status(200).json({ message: 'Server OK' }))
app.get('/users', (req, res) => {
    const limit = req.query.limit
    if (limit > users.length) {
        return res.status(400).json({ error: 'Limit is invalid' })
    }
    res.status(200).json({ users: users.slice(0, limit) })
})
app.get('/cursos', (req, res) => {
    res.status(200).json({ cursos })
})

app.post('/users', (req, res) => {
    const { id, name, age } = req.body
    if (!id || !name || !age) {
        return res.status(400).json({ error: 'Same fields are missing' })
    }
    const userCreated = { id: parseInt(id), name, age: parseInt(age) }
    users.push(userCreated)
    res.status(201).json({ message: 'User created!', data: userCreated })
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id
    const newData = req.body
    const user = users.find(item => item.id == id)
    const userIndex = users.findIndex(item => item.id == id)
    users[userIndex] = {
        ...user,
        ...newData //spread operator
    }
    res.status(200).json({ message: 'User update!' })
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    users = users.filter(item => item.id != id)
    console.log(users)
    res.status(200).json({ message: 'User deleted!' })
})
// app.delete('/users', (req, res) => {
//     const {id} = req.body
//     users = users.filter(item => item.id != id)
//     console.log(users)
//     res.status(200).json({ message: 'User deleted!' })
// })

app.listen(8080, () => console.log('Server Up'))