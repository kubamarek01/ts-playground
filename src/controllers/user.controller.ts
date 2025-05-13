import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export const getUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
}


export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const user = await prisma.user.findUnique({ where: { id } })
  
  if (user) {
    return res.json(user)
  }

  res.status(404).json({ error: 'User not found' })
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body

  try {
    const user = await prisma.user.create({ data: { name, email } })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  
  try {
    await prisma.user.delete({ where: { id } })
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(400).json({ error: 'User deletion failed' })
  }
}






async function createSampleUser() {

  const user = await prisma.user.create({
    data: {
      name: "test user",
      email: "test@test.com"
    }
  });

  console.log('User created:', user)
}

createSampleUser();