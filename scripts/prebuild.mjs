"use strict";

import fs from "node:fs";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { gql, request } from "graphql-request";
import Instapaper from "instapaper-node-sdk";

import "dotenv/config";

async function prebuild() {
  try {
    console.log("Gathering data...");
    const spotifyToken = await getSpotifyAccessToken();
    const spotifySdk = SpotifyApi.withAccessToken("client-id", spotifyToken);

    const [albums, books, fitness, gigs, links] = await Promise.all([
      getAlbums(spotifySdk),
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
        Authorization: `Bearer ${process.env.HARDCOVER_API_TOKEN}`,
      },
    });

    const books = response.me[0].user_books
      .map(({ user_book_reads }) => user_book_reads[0].user_book)
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
      })
      .sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

    return books;
  } catch (error) {
    console.log("Could not fetch books");
    console.log(error);
  }
}

async function getFitness() {
  try {
    const response = await fetch(
      "https://www.strava.com/api/v3/athletes/109281469/stats",
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    return {
      ytd_run_distance: data.ytd_run_totals.distance,
    };
  } catch (error) {
    console.log("Could not fetch fitness data");
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

async function getLinks() {
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
          hostname: new URL(item.url).hostname,
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
