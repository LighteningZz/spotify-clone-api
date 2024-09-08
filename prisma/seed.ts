import { Albums, Artists, Tracks, PrismaClient, Prisma } from '@prisma/client'
import _ from 'underscore';
import data from '../tools/data.json'
const prisma = new PrismaClient()

function initializeData() {
    const groupedArtist = _.chain(data).groupBy('artist').value();
    const seedData = Object.keys(groupedArtist).map(artistName => {
        const artist = groupedArtist[artistName];
        const groupedAlbum = _.chain(artist).groupBy('album').value();
        const albums = Object.keys(groupedAlbum).map(album => {
            const albumImage = groupedAlbum[album][0].imageUrl;
            const tracks = groupedAlbum[album].map(track => {
                return {
                    duration: track.duration,
                    durationText: track.durationText,
                    title: track.title,
                    image: track.imageUrl,
                }
            })
            return {
                artist: artistName,
                name: album,
                image: albumImage,
                tracks: tracks
            }
        });
        return {
            name: artistName,
            image: artist[0].imageUrl,
            albums: albums
        };;
    });
    return seedData
}

async function main() {
    const seedData = initializeData();
    await prisma.tracks.deleteMany({ where: {} });
    await prisma.albums.deleteMany({ where: {} });
    await prisma.artists.deleteMany({ where: {} });
    seedData.map(async (seed) => {
        const artist = await prisma.artists.upsert({
            where: { name: seed.name },
            update: {},
            create: {
                image: seed.image,
                name: seed.name
            },
        });
        const seedAlbums = await seed.albums.map(async x => {
            const tracks = _.uniq(x.tracks.map(t => ({ title: t.title, duration: t.duration, durationText: t.durationText, image: t.image, artistsId: artist.id })), u => { u.title, u.artistsId });
            const album = await prisma.albums.create({
                data: {
                    artistsId: artist.id,
                    image: x.image,
                    name: x.name,
                    tracks: {
                        createMany: {
                            data: tracks
                        }
                    }
                },
                include: {
                    tracks: true
                }
            });
            return album;
        });
        await Promise.all(seedAlbums);
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });