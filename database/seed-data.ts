interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  createdAt: number
  status: string
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Entry 1',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'Entry 2',
      status: 'finished',
      createdAt: Date.now() - 500000,
    },
    {
      description: 'Entry 3',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Entry 4',
      status: 'pending',
      createdAt: Date.now() - 100000,
    },
  ]
}