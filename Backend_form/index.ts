import express from 'express'
import {PrismaClient} from "@prisma/client";
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.post('/api', async (req, res) => {

    const {email,name} = req.body

    if(!email || !name ) return res.status(400).json({"message":"Email and Name required fields"})

    try{
        const createdRow = await prisma.waitList.create({
            data:{
                email,name
            },
        })

        res.json(createdRow)
    }catch (error){
         res.status(400).send({message:error})
    }
    console.log(req.body)

})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})