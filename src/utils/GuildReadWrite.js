import fs from 'fs'
import path from 'path'


const __dirname = path.resolve();

const GuildPath = path.join(__dirname, '/src/Data', 'Guild.json');

export const readGuildData = (callback) => {
    fs.readFile(GuildPath, 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        try {
            callback(null, JSON.parse(data));
        } catch (error) {
            callback(error)
        }
    });
}

export const writeGuildData = (prefixConfig, callback) => {
    fs.writeFile(GuildPath, JSON.stringify(prefixConfig, null, 2), 'utf8', (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    })
}