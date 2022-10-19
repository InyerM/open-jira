# Nextjs OpenJira
How to run this project

### Run db

```bash
docker-compose up -d
```

### MongoDB connection string

```bash
mongodb://localhost:27017/entriesdb
```

### Generate random info in database

Use the following endpoint to generate random info in database

```bash
curl --location --request POST 'http://localhost:3000/api/seed'
```

