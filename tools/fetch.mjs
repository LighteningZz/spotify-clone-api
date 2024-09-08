import html from 'node-html-parser'
import http from 'axios'
import fs from 'fs'
import url, { fileURLToPath } from "url"
import path from "path"
import { parseFile } from 'music-metadata'
import NodeID3 from 'node-id3';
import Mime from 'mime'
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const baseUrl = 'https://ncs.io/'
const limitPage = 10;
const downloadDir = path.join(__dirname, './download')
const tracksDir = path.join(downloadDir, 'tracks');
const imagesDir = path.join(downloadDir, 'images');
const output = [];

async function download(url, destination) {
    // axios image download with response type "stream"
    const res = await http.get(url, {
        responseType: 'stream'
    })
    // pipe the result stream into a file on disc
    res.data.pipe(fs.createWriteStream(destination))
    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
        res.data.on('end', () => {
            resolve()
        })
        res.data.on('error', () => {
            reject()
        })
    })
}
async function downloadAsBuffer(url) {
    const res = await http.get(url, {
        responseType: 'arraybuffer'
    })
    return res.data;
}
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function fetcher() {
    let skipDownload = false;
    if (process.argv.filter(x => x == '--skip').length) {
        skipDownload = true;
    }
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir)
    }
    if (!fs.existsSync(tracksDir)) {
        fs.mkdirSync(tracksDir)
    }
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir)
    }
    for (let index = 0; index < limitPage; index++) {
        const page = index + 1;
        const res = await http.get(baseUrl, {
            params: {
                page: page
            }
        })
        console.log("page: ", page)
        const docs = html.parse(res.data).querySelectorAll('body > main > article.module.artists > div > div:not(.featured-tracks) .item');
        for (const doc of docs) {
            let isExisting = true;
            const getTrackAttr = doc.querySelector('.player-play')
            const artistName = getTrackAttr.attributes['data-artistraw']
            const trackName = getTrackAttr.attributes['data-track']
            const trackUrl = getTrackAttr.attributes['data-url']
            let trackInfo = {
                artist: artistName,
                title: trackName,
                trackUrl
            };
            try {
                const parsedUrl = url.parse(trackUrl)
                const filename = path.join(tracksDir, path.basename(parsedUrl.pathname))
                const imageUrl = url.parse(doc.querySelector('.img').rawAttributes?.style?.slice(23, -2))
                const imageName = path.join(imagesDir, path.basename(imageUrl.pathname))
                trackInfo = { ...trackInfo, imageUrl: imageUrl.href }
                if (!skipDownload) {
                    if (!fs.existsSync(filename)) {
                        isExisting = false;
                        if (!skipDownload) {
                            await download(trackUrl, filename);
                        }
                        console.log(`Download ${artistName} - ${trackName}`);
                    }
                    const data = await parseFile(filename)
                    let tags = { ...data.common };
                    trackInfo = { ...trackInfo, duration: data.format.duration }
                    if (trackInfo.duration) {
                        const minutes = Math.floor(trackInfo.duration / 60)
                        const seconds = Math.floor(trackInfo.duration - minutes * 60)
                        trackInfo = { ...trackInfo, durationText: `${minutes}.${('00' + seconds).slice(-2)}` }
                    }
                    if (!fs.existsSync(imageName)) {
                        isExisting = false;

                        const imageBuffer = await downloadAsBuffer(imageUrl.href);
                        if (!data.common.picture && imageUrl) {
                            tags = {
                                ...tags,
                                ...{
                                    image: {
                                        mime: Mime.getType(imageUrl), // หรือ 'image/png' ถ้าเป็นไฟล์ PNG
                                        description: 'Cover image',
                                        imageBuffer: imageBuffer
                                    }
                                }
                            }
                            console.log("update picture cover " + filename)
                        }
                        fs.writeFileSync(imageName, imageBuffer)
                    } else {
                        const file = fs.readFileSync(imageName);
                        if (!data.common.picture && imageUrl) {
                            tags = {
                                ...tags,
                                ...{
                                    image: {
                                        mime: Mime.getType(imageUrl), // หรือ 'image/png' ถ้าเป็นไฟล์ PNG
                                        description: 'Cover image',
                                        imageBuffer: file
                                    }
                                }
                            }
                            console.log("update picture cover " + filename)
                        }
                    }
                    trackInfo = { ...trackInfo, imagePath: imageName }
                    if (!tags.title) {
                        tags = { ...tags, title: trackName }
                    }
                    if (!tags.artist) {
                        tags = { ...tags, artist: artistName }
                    }
                    if (!tags.album) {
                        tags = { ...tags, album: artistName }
                    }
                    NodeID3.update(tags, filename)

                    // console.log(writeMetaData)
                    if (!isExisting) {
                        await sleep(100)
                    }
                    trackInfo = {
                        ...trackInfo,
                        trackPath: filename,
                        album: tags.album,
                    }
                } else {
                    trackInfo = { ...trackInfo, album: artistName }
                }
                output.push(trackInfo)
                console.log(`Write ${artistName} - ${trackName}`);
            } catch (error) {
                console.error(error)
                console.log(`Skip ${artistName} - ${trackName}`);
            }
        }
    }
    fs.writeFileSync('data.json', JSON.stringify(output))
}

await fetcher()

