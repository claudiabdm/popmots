import { readFile, writeFile } from 'fs';
import fs from 'fs';
import path from 'path';
import { PluginOption } from 'vite';
import { parseString } from 'xml2js';

export default function generateIconNames(svgFilePath: string, typesFilePath: string = 'src/types/icon-names.ts', typeName: string = 'IconName'): PluginOption {
    return {
        name: 'generate-icon-names',
        apply: 'serve',
        buildStart() {
            if (existSvgFile(svgFilePath)) {
                this.addWatchFile(svgFilePath);
            }
        },
        watchChange(id, change) {
            if (existSvgFile(svgFilePath)) {
                const svgFilePathResolved = path.resolve(svgFilePath);
                if (id === svgFilePathResolved && change.event === 'update') {
                    console.log(`File ${svgFilePath} updated`);
                    generateIconNamesTsFile(svgFilePath, typesFilePath, typeName);
                }

                if (id.includes('generate-icon-names.ts') && change.event === 'update') {
                    console.log(`File generate-icon-names.ts updated`);
                    generateIconNamesTsFile(svgFilePath, typesFilePath, typeName);
                }
            }
        },
    };
}

function existSvgFile(svgFilePath: string) {
    const svgFilePathResolved = path.resolve(svgFilePath);
    if (!fs.existsSync(svgFilePathResolved)) {
        console.error(`File not found: ${svgFilePathResolved}`);
        return false;
    } else {
        return true;
    }
}

function generateIconNamesTsFile(svgFilePath: string, typesFilePath: string = 'src/types/icon-names.ts', typeName: string = 'IconName') {
    console.log(`Generating ${typesFilePath}`);
    const typesFilePathResolved = path.resolve(typesFilePath);

    if (!fs.existsSync(typesFilePathResolved)) {
        const dir = path.dirname(typesFilePath);
        fs.mkdirSync(dir, { recursive: true });
    }

    const iconNames: Set<string> = new Set();

    readFile(svgFilePath, 'utf8', (err, result) => {
        consoleError(err)

        parseString(result, (err, result) => {
            consoleError(err);

            const symbols = result?.svg?.symbol || [];
            for (const symbol of symbols) {
                const id = symbol.$.id;
                if (id) {
                    iconNames.add(`"${id}"`);
                }
            }

            const iconNamesString = [...iconNames].join(' | ');
            const typesFileContent = `export type ${typeName} = ${iconNamesString};\n`;

            writeFile(typesFilePathResolved, typesFileContent, consoleError);
        });

    });
}

function consoleError(err: any) {
    console.error(err);
    return;
}