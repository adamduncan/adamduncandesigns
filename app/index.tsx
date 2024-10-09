import albums from "~/data/albums.json";
import books from "~/data/books.json";
import fitness from "~/data/fitness.json";
import gigs from "~/data/gigs.json";
import newsletters from "~/data/newsletters.json";
import readingList from "~/data/links.json";

const Meta = () => {
  const title = "Adam Duncan — Software Engineer, London, UK";
  const description = `I'm a front-end developer with ${Math.floor(
    new Date().getFullYear() - 2008
  )} years' experience, keen to work on a wide range of projects, and deepen my understanding of modern web technologies.`;
  const image = "https://www.adamduncandesigns.com/icon-512.png";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content="https://www.adamduncandesigns.com/" />
      <meta property="og:type" content="profile" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@duncanadam" />
      <meta name="twitter:creator" content="@duncanadam" />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export const links = () => {
  return [
    { rel: "manifest", href: "/manifest.webmanifest" },
    {
      rel: "icon",
      href: "/favicon.ico",
      sizes: "32x32",
    },
    {
      rel: "icon",
      href: "/icon.svg",
      type: "image/svg+xml",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "preload",
      as: "font",
      crossOrigin: "anonymous",
      href: "/fonts/national-2-condensed-medium.woff2",
      type: "font/woff2",
    },
    {
      rel: "preload",
      as: "font",
      crossOrigin: "anonymous",
      href: "/fonts/national-2-regular.woff2",
      type: "font/woff2",
    },
  ];
};

export default function Index() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Meta />
      <header className="flow card">
        <h1>Adam Duncan</h1>
        <p className="text-large">
          Software Engineer
          <br />
          London, UK
        </p>
      </header>

      <main>
        <section
          className="flow card bg-prominent col-span-2 lg:col-span-4"
          id="intro"
        >
          <h2>Hey</h2>
          <p className="max-w-prose">
            I’m a front-end developer with {Math.floor(currentYear - 2008)}{" "}
            years’ experience, keen to work on a wide range of projects, and
            deepen my understanding of modern web technologies. I’m passionate
            about design and technology, and excited to be part of an industry
            that’s constantly evolving.
          </p>
        </section>

        <section
          className="flow card bg-prominent col-start-1 lg:col-span-2"
          id="now"
        >
          <h2>Now</h2>
          <p>
            Senior Software Engineer at{" "}
            <a
              className="inline inline--gap-xs align-middle"
              href="https://www.shopify.com/"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <g clipPath="url(#a)">
                  <path
                    fill="#95BF46"
                    d="m19.9 4.7-.2-.2-2-.1L16.3 3c-.1-.2-.4-.1-.5-.1l-.7.2C14.7 2 13.9.8 12.6.8h-.1c-.4-.5-.9-.7-1.3-.7-3 0-4.5 3.8-5 5.8l-2.1.6c-.7.2-.7.3-.8.9l-1.8 14L15 23.9l7.4-1.6-2.6-17.6Zm-5.6-1.3-1.1.3v-.2c0-.8-.1-1.4-.3-1.9.7 0 1.1.9 1.4 1.8Zm-2.2-1.6c.2.4.3 1.1.3 2V4l-2.4.7c.5-1.8 1.3-2.6 2-3Zm-1-1 .5.2c-1 .5-2 1.7-2.5 4l-2 .6C7.8 3.8 9 .9 11.2.9Z"
                  />
                  <path
                    fill="#5E8E3E"
                    d="m19.7 4.5-2-.1L16.3 3l-.2-.1-1 21 7.4-1.6-2.6-17.6-.2-.2Z"
                  />
                  <path
                    fill="#fff"
                    d="m12.6 8.6-1 2.7s-.7-.4-1.7-.4c-1.4 0-1.5.9-1.5 1.1 0 1.2 3.2 1.7 3.2 4.6 0 2.3-1.4 3.8-3.4 3.8-2.3 0-3.5-1.5-3.5-1.5l.6-2s1.3 1 2.3 1c.7 0 1-.5 1-1 0-1.6-2.7-1.6-2.7-4.3 0-2.2 1.6-4.4 4.8-4.4a4 4 0 0 1 1.9.4Z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                  </clipPath>
                </defs>
              </svg>
              Shopify
            </a>
          </p>
        </section>

        <section
          className="flow card bg-prominent lg:col-span-2"
          id="previously"
        >
          <h2>Previously</h2>
          <ul className="flow flow--gap-sm list-none">
            <li>
              Manager, Digital Products at{" "}
              <a href="https://www.softiron.com/">SoftIron</a>
            </li>
            <li>
              Freelance Senior Developer at{" "}
              <a href="https://www.design.studio/">DesignStudio</a>,{" "}
              <a href="https://www.sampsonmay.com/">SampsonMay</a>,{" "}
              <a href="https://www.crumpled-dog.com/">Crumpled Dog</a>,{" "}
              <a href="https://www.shortlist.com/">ShortList Media</a>,{" "}
              <a href="https://www.atellio.com/">Atellio</a>,{" "}
              <a href="https://www.la-plage.london/">Studio La Plage</a>
            </li>
            <li>
              Head of Front-End Development at{" "}
              <a href="https://mslgroup.com/">MSL (Publicis)</a>
            </li>
            <li>
              <a
                className="inline inline--gap-xs mbs-sm"
                href="https://www.linkedin.com/in/adamduncandev"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 50 50"
                >
                  <path
                    fill="var(--color-text)"
                    d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                  ></path>
                </svg>
                Full work history on LinkedIn
              </a>
            </li>
          </ul>
        </section>

        <section
          className="flow card bg-prominent lg:col-span-2"
          id="education"
        >
          <h2>Education</h2>
          <p>
            BA, Multimedia Design
            <br />
            Curtin University of Technology
            <br />
            Perth, Australia
            <br />
            2006&#8202;&ndash;&#8202;2008
          </p>
        </section>

        <section
          className="flow card bg-prominent col-span-2  lg:col-span-4"
          id="projects"
        >
          <h2>Pet projects</h2>
          <ul className="flow flow--gap-sm list-none">
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
              (2020) &mdash; Eleventy internationalization and dictionary
              translations.
            </li>
            <li>
              <a href="https://github.com/frend/frend.co">Frend.co</a> (2016)
              &mdash; A collection of accessible, modern front-end components.
            </li>
          </ul>
        </section>

        <section className="flow card bg-prominent" id="social">
          <h2>“Social”</h2>
          <ul className="flow flow--gap-sm list-none">
            <li>
              <a
                className="inline inline--gap-xs"
                href="https://x.com/duncanadam"
              >
                <svg
                  aria-hidden="true"
                  className="p-3xs"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 1200 1227"
                >
                  <path
                    fill="var(--color-text)"
                    d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                  />
                </svg>
                @duncanadam
              </a>
            </li>
            <li>
              <a
                className="inline inline--gap-xs"
                href="https://github.com/adamduncan"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 98 96"
                  width="24"
                  height="24"
                >
                  <path
                    fill="var(--color-text)"
                    fillRule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a
                className="inline inline--gap-xs"
                href="https://www.linkedin.com/in/adamduncandev/"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 50 50"
                >
                  <path
                    fill="var(--color-text)"
                    d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                  ></path>
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </section>

        {readingList ? (
          <section
            className="flow card bg-prominent col-span-2 lg:col-span-6"
            id="links"
          >
            <h2>Recent links</h2>
            <ol className="flow list-none md:columns-2">
              {readingList.slice(0, 6).map((link) => {
                const hostname = new URL(link.url).hostname;
                return (
                  <li className="inline inline--gap-sm relative" key={link.id}>
                    <div>
                      <img
                        className="aspect-square size-md"
                        src={`https://icon.horse/icon/${hostname}`}
                        alt=""
                        height={24}
                        loading="lazy"
                        width={24}
                      />
                    </div>
                    <div>
                      <a className="link-cover" href={link.url}>
                        {link.title}
                      </a>
                      <div>{hostname}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p>
              <a
                className="inline inline--gap-xs items-baseline"
                href="https://x.com/FrontEndReads"
              >
                View more @FrontEndReads
                <svg
                  aria-hidden="true"
                  className="size-sm"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="var(--color-text)"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </p>
          </section>
        ) : null}

        {books ? (
          <section className="flow card bg-prominent lg:col-span-2" id="books">
            <h2>Recent reads</h2>
            <ol className="flow list-none">
              {books.slice(0, 4).map((book) => {
                return (
                  <li className="inline relative" key={book.id}>
                    <img
                      className="bg mbs-2xs width-3xl"
                      src={book.image.url}
                      alt={book.title}
                      height={book.image.height}
                      loading="lazy"
                      width={book.image.width}
                      style={{
                        aspectRatio: `${book.image.width} / ${book.image.height}`,
                      }}
                    />
                    <div>
                      <a
                        className="link-cover"
                        href={`https://hardcover.app/books/${book.slug}`}
                      >
                        {book.title}
                      </a>
                      <div>{book.author}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}

        {albums ? (
          <section className="flow card bg-prominent lg:col-span-2" id="albums">
            <h2>Recent listens</h2>
            <ol className="flow list-none">
              {albums.slice(0, 5).map((album) => {
                return (
                  <li className="inline relative" key={album.id}>
                    <img
                      className="aspect-square bg mbs-2xs width-3xl"
                      src={album.image.url}
                      alt={album.name}
                      height={album.image.width}
                      loading="lazy"
                      width={96}
                    />
                    <div>
                      <div>
                        <a className="link-cover" href={album.url}>
                          {album.name}
                        </a>
                      </div>
                      <div>{album.artist}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}

        {gigs ? (
          <section className="flow card bg-prominent lg:col-span-2" id="gigs">
            <h2>Recent gigs</h2>
            <ol className="flow list-none">
              {gigs.slice(0, 5).map((gig) => {
                return (
                  <li className="inline relative" key={gig.id}>
                    <img
                      className="aspect-square bg object-cover mbs-2xs width-3xl"
                      src={gig.image.url}
                      alt={gig.artist}
                      height={gig.image.height}
                      loading="lazy"
                      width={gig.image.width}
                    />
                    <div>
                      <a className="link-cover" href={gig.url}>
                        {gig.artist}
                      </a>
                      <div>{gig.venue}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}

        <section
          className="flow card bg-prominent col-span-2 lg:col-span-6"
          id="newsletters"
        >
          <h2>Newsroll</h2>
          <ol className="flow flow--gap-sm list-none md:columns-2 lg:columns-3">
            {newsletters
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((newsletter) => {
                return (
                  <li
                    className="inline inline--gap-sm relative"
                    key={newsletter.url}
                  >
                    <div>
                      <img
                        className="aspect-square size-md"
                        src={`https://icon.horse/icon/?uri=${newsletter.url}`}
                        alt=""
                        height={24}
                        loading="lazy"
                        width={24}
                      />
                    </div>
                    <a className="link-cover" href={newsletter.url}>
                      {newsletter.title}
                    </a>
                  </li>
                );
              })}
          </ol>
          <p className="inline inline--gap-xs items-baseline">
            <svg
              aria-hidden="true"
              className="size-sm"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
                clipRule="evenodd"
              />
            </svg>
            A non-exhaustive list of the newsletters that keep me going. Thanks
            all.
          </p>
        </section>

        <section className="flow card bg-prominent lg:col-span-4" id="stats">
          <h2>Stats</h2>
          <ul className="flow flow--gap-sm list-none">
            {/* TODO: Fetch from Website Carbon API */}
            <li>
              This page achieves a carbon{" "}
              <a href="https://www.websitecarbon.com/website/adamduncandesigns-com/">
                rating of B
              </a>
              , cleaner than 80% of all web pages globally.
            </li>
            <li>
              {(fitness.ytd_run_distance / 1000).toFixed(2)}km run so far this
              year. That’s{" "}
              {((fitness.ytd_run_distance / 40_075_000) * 100).toFixed(2)}%
              around the world.
            </li>
            {/* TODO: Fetch from GitHub */}
            <li>
              Starred 515 projects on GitHub. Just think of the{" "}
              <code>node_modules</code>.
            </li>
            <li>
              Estimated stay in London: 2 years. Actual: {currentYear - 2010}{" "}
              years and counting (sorry, Mum).
            </li>
            <li>Longest word on Spelling Bee: Annihilation.</li>
          </ul>
        </section>

        <section className="flow card bg-prominent lg:col-span-2" id="colophon">
          <h2>Colophon</h2>
          <p>
            Text is set in <em>National 2</em>, from the choice{" "}
            <a href="https://klim.co.nz/">Klim Type Foundry</a>. This site is
            (unnecessarily) built with <a href="https://remix.run/">Remix</a>{" "}
            and automatically deployed to{" "}
            <a href="https://www.netlify.com/">Netlify</a>. Life data pulled in
            from Spotify, Hardcover, Instapaper, GitHub, Strava, and Website
            Carbon Calculator.
            {/* TODO: TBD */}
            {/* It ain’t pretty, but the{" "}
            <a href="https://github.com/adamduncan/adamduncandesigns">
              source code for this site
            </a>{" "}
            is available on GitHub. */}
          </p>
        </section>
      </main>

      <footer className="card">
        <p>&copy; Adam Duncan {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
