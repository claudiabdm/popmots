npx wrangler r2 object get dictionary/10000-most-common-words-en-fr-dict.json
npx tsx ./workers/createSchema.ts
npx wrangler d1 execute dictionary --remote --file=./workers/schema.sql