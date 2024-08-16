// Script to move kaikki audio files to public folder
import fs from 'fs';
// import https from 'https';
import * as dict from 'most-common-words-fr-dict-generator';
import { stdout } from 'process';
import { Dictionary } from 'most-common-words-fr-dict-generator/types';

// @ts-ignore
const dictionary: Dictionary = dict.default.dictionary;

export function moveAudioFiles() {
    const audiosInDict = [...new Set([...dictionary].map(([, dw]) => dw.map(s => s.pronunciation_mp3?.split('/')?.pop())).flat())];
    const root = '/Users/claudiabenito/Downloads/audios-2';
    const folder = './public/audios';

    // Read filenames from root
    const files = fs.readdirSync(root);
    files.forEach((file, i) => {
        // Console log in same line
        stdout.write('\r' + i / files.length * 100 + '%');

        // If filename is the same as in the dictionary, copy it to the public folder
        // Otherwise, look for another audio file for the same word
        if (audiosInDict.includes(file)) {
            const filename = file.split('/').pop();
            if (filename) fs.copyFileSync(root + '/' + file, folder + '/' + decodeURI(filename));

        }
        // WIP
        // else if (file?.endsWith('.mp3') && (file.includes('%28fra%29') || file.startsWith('Fr-'))) {
        //     let word: string | undefined = undefined;

        //     // Get word from filename
        //     if (file.includes('%28fra%29')) word = file?.split('-')?.pop()?.split('.')[0];
        //     if (file.startsWith('Fr-')) word = file?.replace(/Fr-|-fr-ouest|-fr-Paris|-fr_FR-Paris/gi, '').split('.')[0];

        //     // Get audio url from dictionary
        //     const urlWithWord = word ? audiosUrlInDict.get(word) : undefined;

        //     if (!addedWords.has(word) && urlWithWord) {
        //         addedWords.add(word);
        //         const fileFromDict = urlWithWord.split('/').pop();
        //         if (word === 'aller') console.log(word, file, fileFromDict);
        //         if (fileFromDict) fs.copyFileSync(root + '/' + file, folder + '/' + decodeURI(fileFromDict));
        //     }
        // }
    })
}

moveAudioFiles()