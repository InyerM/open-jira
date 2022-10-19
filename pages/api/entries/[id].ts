import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry } from '../../../models'
import { Entry as IEntry } from '../../../interfaces'

type Data = { message: string } | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      return getEntry(id as string, res)
    case 'PUT':
      return putEntry(req, res, id as string)
    case 'DELETE':
      return deleteEntry(req, res, id as string)
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const getEntry = async (id: string, res: NextApiResponse<Data>) => {
  try {
    await db.connect()
    const entry = await Entry.findById(id)
    await db.disconnect()

    if (!entry) return res.status(404).json({ message: 'Entry not found' })

    return res.status(200).json( entry )
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const putEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, id: string) => {
  const { description = '', status = 'pending' } = req.body

  try {
    await db.connect()
    const entry = await Entry.findByIdAndUpdate(id, { description, status }, { new: true, runValidators: true })
    await db.disconnect()

    if (!entry) return res.status(404).json({ message: 'Entry not found' })

    return res.status(200).json( entry )
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, id: string) => {
  try {
    await db.connect()
    const entry = await Entry.findByIdAndDelete(id)
    await db.disconnect()

    if (!entry) return res.status(404).json({ message: 'Entry not found' })

    return res.status(200).json( entry )
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
