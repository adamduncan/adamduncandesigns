"use strict";

import fs from "node:fs";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import Instapaper from "instapaper-node-sdk";

import "dotenv/config";

async function prebuild() {
  try {
    console.log("Gathering data...");
    const spotifyToken = await getSpotifyAccessToken();
    const spotifySdk = SpotifyApi.withAccessToken("client-id", spotifyToken);

    const [albums, gigs, readingList] = await Promise.all([
      getAlbums(spotifySdk),
      getGigs(spotifySdk),
      getReadingList(),
    ]);

    writeDataFile("albums", JSON.stringify(albums));
    writeDataFile("gigs", JSON.stringify(gigs));
    writeDataFile("links", JSON.stringify(readingList));
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
    console.log(error);
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

async function getReadingList() {
  try {
    // TODO: Deprecated use of `crypto` module.
    // Probs just replicate its behaviour ourselves with more modern implementation.
    // https://github.com/bryantchan/instapaper-node-sdk/blob/master/index.js
    const client = new Instapaper(
      process.env.INSTAPAPER_CONSUMER_ID,
      process.env.INSTAPAPER_CONSUMER_SECRET
    );
    client.setCredentials(
      process.env.INSTAPAPER_USERNAME,
      process.env.INSTAPAPER_PASSWORD
    );
    const list = await client.list({ limit: 10 });

    return list
      .filter((item) => item.type === "bookmark")
      .map((item) => {
        return {
          id: item.bookmark_id,
          title: item.title,
          url: item.url,
        };
      });
  } catch (error) {
    console.log("Could not fetch reading list");
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
