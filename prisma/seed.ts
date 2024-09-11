import { Albums, Artists, Tracks, PrismaClient, Prisma } from '@prisma/client'
import _ from 'underscore';
import data from '../tools/data.json'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

function initializeData() {
    const groupedArtist = _.chain(data).groupBy('artist').value();
    const seedData = Object.keys(groupedArtist).map(artistName => {
        const artist = groupedArtist[artistName];
        const groupedAlbum = _.chain(artist).groupBy('album').value();
        const albums = Object.keys(groupedAlbum).map(album => {
            const albumImage = groupedAlbum[album][0].imageUrl;
            const tracks = groupedAlbum[album].map(track => {
                return <Prisma.TracksCreateInput>{
                    duration: track.duration,
                    durationText: track.durationText,
                    title: track.title,
                    image: track.imageUrl,
                    url: track.trackUrl
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
    await prisma.users.deleteMany({ where: {} });
    const seedTasks = await seedData.map(async (seed) => {
        const artist = await prisma.artists.upsert({
            where: { name: seed.name },
            update: {},
            create: {
                image: seed.image,
                name: seed.name
            },
        });
        const seedAlbums = await seed.albums.map(async x => {
            const tracks = x.tracks.map(t => ({ title: t.title, duration: t.duration, durationText: t.durationText, image: t.image, artistsId: artist.id, url: t.url }));
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
        return await Promise.all(seedAlbums);
    })
    const mockUser: Prisma.UsersCreateInput = {
        email: 'a@a.com',
        password: 'P@ssw0rd',
        name: 'Smith Erbach',
        image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
    const hashedPassword: string = await bcrypt.hash(mockUser.password, 10);

    await prisma.users.create({
        data: {
            ...mockUser,
            password: hashedPassword
        }
    })

    await Promise.all(seedTasks);

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