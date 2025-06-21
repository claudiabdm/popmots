npx wrangler r2 object get dictionary/10000-most-common-words-en-fr-dict.json
npx tsx ./database/createSchema.ts
npx wrangler d1 execute dictionary --local --file=./database/schema.sql