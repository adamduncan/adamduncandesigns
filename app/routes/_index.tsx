import type { MetaFunction } from "@remix-run/node";

import albums from "~/data/albums.json";
import books from "~/data/books.json";
import gigs from "~/data/gigs.json";
import links from "~/data/links.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Adam Duncan — Software Engineer, London, UK" },
    {
      name: "description",
      // TODO: Description + social meta, etc.
      content: "Adam Duncan — Software Engineer, London, UK",
    },
  ];
};

export default function Index() {
  const subs = [
    {
      title: "Bytes",
      url: "https://bytes.dev/",
    },
    {
      title: "Frontend Focus",
      url: "https://frontendfoc.us/",
    },
    {
      title: "Remix",
      url: "https://remix.run/newsletter",
    },
    {
      title: "It’s Nice That",
      url: "https://www.itsnicethat.com/newsletters",
    },
    {
      title: "Adam Silver",
      url: "https://adamsilver.io/newsletter/",
    },
    {
      title: "Kent C. Dodds",
      url: "https://kentcdodds.com/subscribe",
    },
    {
      title: "Total TypeScript",
      url: "https://www.totaltypescript.com/newsletter",
    },
    {
      title: "Robin Sloan",
      url: "https://www.robinsloan.com/newsletters/",
    },
    {
      title: "Matthias Ott",
      url: "https://buttondown.com/ownyourweb",
    },
    {
      title: "Robin Rendle",
      url: "https://robinrendle.com/essays/newsletters/",
    },
    {
      title: "funfun.email",
      url: "https://fff.dev/mail",
    },
    {
      title: "The Index",
      url: "https://piccalil.li/the-index/",
    },
    {
      title: "Design Systems Weekly",
      url: "https://news.design.systems/",
    },
    {
      title: "Josh W. Comeau",
      url: "https://www.joshwcomeau.com/subscribe/",
    },
    {
      title: "Human Who Codes",
      url: "https://newsletter.humanwhocodes.com/",
    },
    {
      title: "The Overflow",
      url: "https://stackoverflow.blog/newsletter",
    },
    {
      title: "Syntax.fm",
      url: "https://syntax.fm/snackpack",
    },
  ];

  return (
    <>
      <header>
        <h1>Adam Duncan</h1>
        <p>
          Software Engineer
          <br />
          London, UK
        </p>
      </header>

      <main>
        <section>
          <h2>Hey</h2>
          <p>
            I’m a front-end developer with 16 years’ experience, keen to work on
            a wide range of projects, and deepen my understanding of modern web
            technologies. I’m passionate about design and technology, and
            excited to be part of an industry that’s constantly evolving.
          </p>
        </section>

        <section>
          <h2>Now</h2>
          <p>
            Senior Software Engineer @{" "}
            <a href="https://www.shopify.com/">Shopify</a>
          </p>
        </section>

        <section>
          <h2>Previously</h2>
          <ul>
            <li>
              Manager, Digital Products @{" "}
              <a href="https://www.softiron.com/">SoftIron</a>
            </li>
            <li>
              Freelance Senior Developer @{" "}
              <a href="https://www.design.studio/">DesignStudio</a>,{" "}
              <a href="https://www.sampsonmay.com/">SampsonMay</a>,{" "}
              <a href="https://www.crumpled-dog.com/">Crumpled Dog</a>,{" "}
              <a href="https://www.shortlist.com/">ShortList Media</a>,{" "}
              <a href="https://www.atellio.com/">Atellio</a>,{" "}
              <a href="https://www.la-plage.london/">Studio La Plage</a>
            </li>
            <li>
              Head of Front-End Development @{" "}
              <a href="https://mslgroup.com/">MSL (Publicis)</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/adamduncandev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="26"
                  height="26"
                  viewBox="0 0 50 50"
                >
                  <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>
                Full work history on LinkedIn
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>Education</h2>
          <p>BA, Multimedia Design @ Curtin University of Technology</p>
          <p>Perth, Australia</p>
          <p>2006&#8202;&ndash;&#8202;2008</p>
        </section>

        <section>
          <h2>Around the web</h2>
          <ul>
            <li>
              <a href="https://x.com/duncanadam">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="none"
                  viewBox="0 0 1200 1227"
                >
                  <path
                    fill="#000"
                    d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                  />
                </svg>
                @duncanadam
              </a>
            </li>
            <li>
              <a href="https://github.com/adamduncan">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 98 96"
                  width="26"
                  height="26"
                >
                  <path
                    fill="#24292f"
                    fillRule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/adamduncandev/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 50 50"
                >
                  <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>Pet projects</h2>
          <ul>
            <li>
              <a href="https://www.jamrollgame.com/">JamRoll</a> &mdash; A new
              daily game for music buffs.
            </li>
            <li>
              <a href="https://x.com/FrontEndReads">@FrontEndReads</a> &mdash;
              Links on front-end development and design.
            </li>
            <li>
              <a href="https://github.com/adamduncan/eleventy-plugin-i18n">
                eleventy-plugin-i18n
              </a>{" "}
              (2020) &mdash; Alley-oop for Eleventy internationalization and
              dictionary translations.
            </li>
            <li>
              <a href="https://github.com/frend/frend.co">Frend.co</a> (2016)
              &mdash; A collection of accessible, modern front-end components.
            </li>
          </ul>
        </section>

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
            <a href="https://x.com/FrontEndReads">View more @FrontEndReads</a>
          </section>
        ) : null}

        <section>
          <h2>Subs</h2>
          <p>
            A non-exhaustive list of the mailers that keep me going, in no
            particular order.
          </p>
          <ul>
            {subs
              .sort(() => 0.5 - Math.random())
              .map((sub) => {
                return (
                  <li key={sub.url}>
                    <a href={sub.url}>
                      <img
                        src={`https://icon.horse/icon/?uri=${sub.url}`}
                        alt=""
                        height={100}
                        width={100}
                      />
                      {sub.title}
                    </a>
                  </li>
                );
              })}
          </ul>
        </section>

        {books ? (
          <section>
            <h2>Recent reads</h2>
            {books.slice(0, 5).map((book) => {
              return (
                <div key={book.id}>
                  <img
                    src={book.image.url}
                    alt={book.title}
                    height={book.image.height}
                    width={book.image.width}
                  />
                  <div>
                    <a href={`https://hardcover.app/books/${book.slug}`}>
                      {book.title}
                    </a>
                  </div>
                  <div>{book.author}</div>
                </div>
              );
            })}
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
                    height={album.image.width}
                    width={album.image.height}
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

        <section>
          <h2>Stats</h2>
          <p>
            427.3km run so far this year. That’s{" "}
            {((427.3 / 42000) * 100).toFixed(2)}% around the world.
          </p>
          <p>
            Starred 512 projects on GitHub. Just think of the{" "}
            <code>node_modules</code>.
          </p>
          <p>
            Estimated stay in London: 2 years. Actual:{" "}
            {new Date().getFullYear() - 2010} years and counting (sorry, Mum).
          </p>
        </section>

        <section>
          <h2>Energy</h2>
          <p>
            This page achieves a carbon rating of A+, cleaner than 98% of all
            web pages globally (
            <a href="https://www.websitecarbon.com/website/adamduncandesigns-com/">
              source
            </a>
            ).
          </p>
        </section>

        <section>
          <h2>Colophon</h2>
          <p>
            Headings set in Font Name. Body text set in Other Font. This site is
            (unnecessarily) built with Remix and automatically deployed to
            Netlify. Life data pulled in from Spotify, Hardcover, Instapaper,
            GitHub, Strava, and Website Carbon Calculator.{" "}
            <u>Source available on GitHub</u> (soon).
          </p>
        </section>
      </main>

      <footer>&copy; Adam Duncan {new Date().getFullYear()}</footer>
    </>
  );
}
