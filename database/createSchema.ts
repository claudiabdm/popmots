// @ts-ignore
import dictJson from '../10000-most-common-words-en-fr-dict.json';
import { DictionaryWord } from 'most-common-words-fr-dict-generator/types';
import fs from 'fs';

function generateSQLSchemaFromJson() {
    const entries = Object.entries(dictJson) as unknown as Array<[string, Array<DictionaryWord>]>;
    let sql = `DROP TABLE IF EXISTS Dictionary;\nCREATE TABLE  IF NOT EXISTS Dictionary (word TEXT, category TEXT, rank INTEGER, senses TEXT, ipa TEXT, pronunciation_ogg TEXT, pronunciation_mp3 TEXT, head TEXT);\n`
    for (const [word, wordEntries] of entries) {
        for (const entry of wordEntries) {
            sql += `INSERT INTO Dictionary (word, category, rank, senses, ipa, pronunciation_ogg, pronunciation_mp3, head) VALUES ("${word}", "${entry.category}", ${entry.rank}, '${JSON.stringify(entry.senses, replacer)}', "${entry.ipa}", "${entry.pronunciation_ogg}", "${entry.pronunciation_mp3}", '${JSON.stringify(entry.head, replacer)}');\n`;
        }
    }

    const ouputFile = 'workers/schema.sql';
    fs.writeFileSync(ouputFile, sql);
}

generateSQLSchemaFromJson();

function replacer(key, value) {
    if (typeof value === "string") {
        return value.replace(/'/g, "''");
    }
    return value;
}

