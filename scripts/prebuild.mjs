"use strict";

import fs from "node:fs";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { gql, request } from "graphql-request";
import Instapaper from "instapaper-node-sdk";
import { env } from "node:process";
import { Buffer } from "node:buffer";

import "dotenv/config";

async function prebuild() {
  try {
    console.log("Gathering data...");
    const spotifyToken = await getSpotifyAccessToken();
    const spotifySdk = SpotifyApi.withAccessToken("client-id", spotifyToken);

    const [albums, books, fitness, gigs, links] = await Promise.all([
      getAlbums(),
      getBooks(),
      getFitness(),
      getGigs(spotifySdk),
      getLinks(),
    ]);

    writeDataFile("albums", JSON.stringify(albums));
    writeDataFile("books", JSON.stringify(books));
    writeDataFile("fitness", JSON.stringify(fitness));
    writeDataFile("gigs", JSON.stringify(gigs));
    writeDataFile("links", JSON.stringify(links));
  } catch (error) {
    console.log(error);
  }
}

async function getSpotifyAccessToken() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // TODO: querystring-ify
      body: `grant_type=refresh_token&refresh_token=${env.SPOTIFY_REFRESH_TOKEN}&redirect_uri=${env.SPOTIFY_CALLBACK_URI}`,
    });
    return await response.json();
  } catch (error) {
    console.log("Could not fetch Spotify access token");
  }
}

async function getAlbums() {
  try {
    const lastFm = async (method, params) => {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?${new URLSearchParams({
          method,
          user: env.LASTFM_USERNAME,
          api_key: env.LASTFM_API_KEY,
          format: "json",
          ...params,
        })}`,
      );
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      return data;
    };

    const [recentTracks, topAlbums] = await Promise.all([
      lastFm("user.getrecenttracks", { limit: 50 }),
      lastFm("user.gettopalbums", { period: "1month", limit: 20 }),
    ]);

    const albums = new Map();
    const minPlays = 3;
    // Last.fm returns a single object rather than an array when there's only one result.
    const asArray = (items = []) => [].concat(items);

    // Treat albums with a few recent plays as recent listens, ahead of "top" albums.
    const recentAlbums = asArray(recentTracks.recenttracks.track).map(
      (track) => ({
        artist: track.artist["#text"],
        image: track.image,
        name: track.album["#text"],
      }),
    );
    for (const album of recentAlbums) {
      const albumListenCount = recentAlbums.filter(
        ({ artist, name }) => artist === album.artist && name === album.name,
      ).length;

      if (albumListenCount >= minPlays) {
        addAlbum(album, albums);
      }
    }

    for (const album of asArray(topAlbums.topalbums.album)) {
      if (Number(album.playcount) < minPlays) continue;
      addAlbum(
        { artist: album.artist.name, image: album.image, name: album.name },
        albums,
      );
    }

    // Top up with fallback albums if Last.fm doesn't have enough.
    const key = ({ artist, name }) => `${artist}|${name}`.toLowerCase();
    const seen = new Set([...albums.values()].map(key));
    const fallback = albumsFallback().filter((album) => !seen.has(key(album)));

    return [...albums.values(), ...fallback].slice(0, 5);
  } catch (error) {
    console.log("Could not fetch albums, using fallback");
    return albumsFallback();
  }
}

async function getBooks() {
  const document = gql`
    {
      me {
        user_books {
          user_book_reads(limit: 5) {
            user_book {
              book {
                id
                title
                contributions {
                  author {
                    name
                  }
                }
                release_year
                image {
                  url
                  width
                  height
                }
                slug
              }
              created_at
            }
          }
        }
      }
    }
  `;

  try {
    const response = await request({
      url: "https://api.hardcover.app/v1/graphql",
      document,
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.HARDCOVER_API_TOKEN}`,
      },
    });

    const books = response.me[0].user_books
      .map(({ user_book_reads }) => user_book_reads[0].user_book)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(({ book, created_at }) => {
        return {
          author: book.contributions[0].author.name,
          date_added: created_at,
          id: book.id,
          image: book.image,
          release_year: book.release_year,
          slug: book.slug,
          title: book.title,
        };
      });

    return books;
  } catch (error) {
    console.log("Could not fetch books, using fallback");
    console.log(error);
    return JSON.parse(fs.readFileSync("./data/books-fallback.json", "utf-8"));
  }
}

async function getFitness() {
  try {
    const responseToken = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: env.STRAVA_CLIENT_ID,
        client_secret: env.STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: env.STRAVA_REFRESH_TOKEN,
      }),
    });
    const { access_token } = await responseToken.json();

    const responseStats = await fetch(
      "https://www.strava.com/api/v3/athletes/109281469/stats",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await responseStats.json();

    return {
      ytd_run_distance: data.ytd_run_totals.distance,
    };
  } catch (error) {
    console.log("Could not fetch fitness data, using fallback");
    return JSON.parse(fs.readFileSync("./data/fitness-fallback.json", "utf-8"));
  }
}

async function getGigs(sdk) {
  try {
    const data = await sdk.currentUser.playlists.playlists(50);
    const { items } = data;

    const isGig = (gig) =>
      gig.owner.id === "adamduncan" &&
      gig.name.includes(" — ") &&
      gig.name.includes(" at ");

    const gigs = items
      .filter(isGig)
      .slice(0, 5)
      .map((gig) => {
        const title = gig.name.split(" — ")[0];

        return {
          artist: title.split(" at ")[0],
          description: gig.description,
          id: gig.id,
          image: {
            url: gig.images[0].url,
            height: 300,
            width: 300,
          },
          venue: title.split(" at ")[1],
          url: gig.external_urls.spotify,
        };
      });
    return gigs;
  } catch (error) {
    console.log("Could not fetch gigs, using fallback");
    return JSON.parse(fs.readFileSync("./data/gigs-fallback.json", "utf-8"));
  }
}

async function getLinks() {
  try {
    // TODO: Deprecated use of `crypto` module.
    // Probs just replicate its behaviour ourselves with more modern implementation.
    // https://github.com/bryantchan/instapaper-node-sdk/blob/master/index.js
    const client = new Instapaper(
      env.INSTAPAPER_CONSUMER_ID,
      env.INSTAPAPER_CONSUMER_SECRET
    );
    client.setCredentials(env.INSTAPAPER_USERNAME, env.INSTAPAPER_PASSWORD);
    const list = await client.list({ limit: 10 });

    return list
      .filter((item) => item.type === "bookmark")
      .slice(0, 6)
      .map((item) => {
        return {
          id: item.bookmark_id,
          title: item.title,
          url: item.url,
        };
      });
  } catch (error) {
    console.log("Could not fetch reading list, using fallback");
    console.log(error);
    return JSON.parse(fs.readFileSync("./data/links-fallback.json", "utf-8"));
  }
}

function albumsFallback() {
  return JSON.parse(fs.readFileSync("./data/albums-fallback.json", "utf-8"));
}

function addAlbum({ artist, image, name }, albums) {
  const url = `https://www.last.fm/music/${encodeURIComponent(
    artist,
  )}/${encodeURIComponent(name)}`;
  const imageUrl = image.at(-1)?.["#text"];

  // Last.fm serves a grey star placeholder when it has no artwork.
  const isPlaceholder = imageUrl?.includes("2a96cbd8b46e442fc41c2b86b821562f");

  if (!name || !imageUrl || isPlaceholder || albums.has(url)) return;

  albums.set(url, {
    artist,
    image: { url: imageUrl, height: 300, width: 300 },
    id: url,
    name: name.split("(")[0].trim(),
    url,
  });
}

async function writeDataFile(key, content) {
  const dataDir = "./data/";
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  fs.writeFileSync(`${dataDir}/${key}.json`, content);
  console.log(`Written ${key}.json`);
}

prebuild();
