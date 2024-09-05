"use strict";

import fs from "node:fs";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

async function prebuild() {
  try {
    console.log("Gathering data...");
    const spotifyToken = await getSpotifyAccessToken();
    const spotifySdk = SpotifyApi.withAccessToken("client-id", spotifyToken);

    const [albums, gigs] = await Promise.all([
      getAlbums(spotifySdk),
      getGigs(spotifySdk),
    ]);

    writeDataFile("albums", JSON.stringify(albums));
    writeDataFile("gigs", JSON.stringify(gigs));
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
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // TODO: querystring-ify
      body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}&redirect_uri=${process.env.SPOTIFY_CALLBACK_URI}}`,
    });
    return await response.json();
  } catch (error) {
    console.log("Could not fetch Spotify access token");
  }
}

async function getAlbums(sdk) {
  try {
    const data = await sdk.currentUser.topItems("tracks", "short_term", 50);
    const { items } = data;

    const albums = new Map();

    for (const item of items) {
      const { album } = item;
      if (!albums.has(album.uri)) {
        albums.set(album.uri, {
          artist: album.artists[0].name,
          image: album.images[0],
          id: album.uri,
          name: album.name,
          url: album.external_urls.spotify,
        });
      }
    }
    return Object.values(Object.fromEntries(albums));
  } catch (error) {
    console.log("Could not fetch albums");
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

    const gigs = items.filter(isGig).map((gig) => {
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
    console.log("Could not fetch gigs");
    console.log(error);
  }
}

async function writeDataFile(key, content) {
  const dataDir = "./app/data/";
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  fs.writeFileSync(`${dataDir}/${key}.json`, content);
  console.log(`Written ${key}.json`);
}

prebuild();
