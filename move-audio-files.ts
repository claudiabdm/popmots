// Script to move kaikki audio files to public folder
import fs from 'fs';
import { dictionary } from 'most-common-words-fr-dict-generator';
import { stdout } from 'process';

export function moveAudioFiles() {
    const audiosInDict = [...new Set([...dictionary].map(([, dw]) => dw.map(s => s.pronunciation_mp3?.split('/')?.pop())).flat())];
    const root = '/Users/claudiabenito/Downloads/audios';
    const folder = './public/audios';

    // Read filenames from root
    const files = fs.readdirSync(root);

    // Copy files that includes "fra" or "fr-" in their filenames to folder
    files.forEach((file, i) => {
        // Console log in same line
        stdout.write('\r' + i / files.length * 100 + '%');
        const filename = file.split('/').pop();
        if (audiosInDict.includes(filename)) {
            // Copy file to folder
            fs.copyFileSync(root + '/' + file, folder + '/' + filename);
        }
    })
}

moveAudioFiles()