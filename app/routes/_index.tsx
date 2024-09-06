import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import albums from "~/data/albums.json";
import gigs from "~/data/gigs.json";
import links from "~/data/links.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Adam Duncan" },
    {
      name: "description",
      content: "Adam Duncan — Senior Software Engineer, London, UK",
    },
  ];
};

export const loader = async () => {
  return json({ albums, gigs });
};

export default function Index() {
  const { albums, gigs } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Adam Duncan</h1>
      <p>Senior Software Engineer</p>

      {links ? (
        <section>
          <h2>Recent links</h2>
          {links.slice(0, 5).map((link) => {
            return (
              <div key={link.id}>
                <img
                  src={`https://icon.horse/icon/${link.hostname}`}
                  alt=""
                  height={100}
                  width={100}
                />
                <div>
                  <a href={link.url}>{link.title}</a>
                </div>
              </div>
            );
          })}
          <a href="https://x.com/FrontEndReads">View more FrontEndReads</a>
        </section>
      ) : null}

      {albums ? (
        <section>
          <h2>Recent listens</h2>
          {albums.slice(0, 5).map((album) => {
            return (
              <div key={album.id}>
                <img
                  src={album.image.url}
                  alt={album.name}
                  height={album.image.height}
                  width={album.image.width}
                />
                <div>{album.artist}</div>
                <div>
                  <a href={album.url}>{album.name}</a>
                </div>
              </div>
            );
          })}
        </section>
      ) : null}

      {gigs ? (
        <section>
          <h2>Recent gigs</h2>
          {gigs.slice(0, 5).map((gig) => {
            return (
              <div key={gig.id}>
                <img
                  src={gig.image.url}
                  alt={gig.artist}
                  height={gig.image.height}
                  width={gig.image.width}
                />
                <div>
                  <a href={gig.url}>{gig.artist}</a>
                </div>
                <div>{gig.venue}</div>
              </div>
            );
          })}
        </section>
      ) : null}
    </div>
  );
}
