import mongoose, { Model, Schema } from 'mongoose'
import { Entry as IEntry } from './../interfaces'

const entrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: Number,
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: 'Status must be pending, in-progress or finished',
    },
    default: 'pending',
  },
})

const Entry: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default Entry
