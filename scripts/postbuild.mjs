"use strict";

import fs from "node:fs";

import { parse } from "node-html-parser";

async function postbuild() {
  try {
    const indexFilepath = "dist/client/index.html";
    const html = fs.readFileSync(indexFilepath, "utf8");
    let root = parse(html);
    const scriptEls = root.querySelectorAll("script");
    const preloadEls = root.querySelectorAll(`link[rel="modulepreload"]`);
    [...scriptEls, ...preloadEls].forEach((el) => el.remove());
    fs.writeFileSync(indexFilepath, root.toString(), (error) => {
      console.error(error);
    });
    console.log("Removed scripts from HTML");
  } catch (error) {
    console.error(error);
  }
}

postbuild();
