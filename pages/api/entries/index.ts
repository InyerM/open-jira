import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry as IEntry } from '../../../interfaces'
import { Entry } from '../../../models'

type Data = { message: string } | IEntry[] | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries( res )
    case 'POST':
      return postEntry( req, res )
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const getEntries = async ( res: NextApiResponse<Data> ) => {
  try {
    await db.connect()
    const entries = await Entry.find().sort({ createdAt: 'ascending' })
    await db.disconnect()

    return res.status(200).json( entries )
  } catch (error) {
    res.status(500).json({ message: error as string })
  }
}

const postEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { description = '' } = req.body
  
  const newEntry = new Entry({ 
    description,
    createdAt: Date.now(),
  })
  try {
    await db.connect()
    await newEntry.save()
    await db.disconnect()

    return res.status(201).json( newEntry )
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}