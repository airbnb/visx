'use strict';

const jetpack = require('fs-jetpack'); // filesystem
const marked = require('marked'); // markdown parser
const { DOCS, PACKAGES, README } = require('./constants.js');

// Stop someone from running the script from it's directory
const ROOT = process.cwd();
if (ROOT === __dirname) {
  throw new Error(`Oops! It looks like you might not be running this from the project's
  root directory.`);
}

/**
 * Returns a fs-jetpack file pointer to the packages directory.
 */
function atPackagesDirectory() {
  return jetpack.cwd(ROOT).dir(PACKAGES);
}

function atDocsDirectory() {
  return jetpack.cwd(ROOT).dir(DOCS);
}

/**
 * Returns the text of a README at a specific package
 */
function getReadmeText(pkg) {
  const pkgDir = atPackagesDirectory().dir(pkg);
  const generatedDoc = pkgDir.read('./docs/docs.md');
  if (generatedDoc) pkgDir.write('Readme.md', generatedDoc);
  const text = pkgDir.read(README);
  if (text) return text;
  return ''; // don't return "undefined"
}

/**
 * From a package directory, get the html from the markdown
 * @return {pkg, html}
 */
function getDocObject(dir, info) {
  const markdown = getReadmeText(dir);
  const html = marked(markdown);
  const cleanedHTML = prepareHTML(html, info);
  return { pkg: dir, html: cleanedHTML };
}

/**
 * Wraps HTML content in a proper <html> and
 * adds css.
 */
function prepareHTML(html, info) {
  const cssPath = `../doc_styles.css`;
  const nav = info.map(p => {
    return `<li><a href="/static/docs/${p.name.replace('@vx/', 'vx-')}.html">${p.name}</a></li>`;
  });
  return `
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="${cssPath}">
    </head>
    <div class="nav-container">
      <div class="nav">
        <div class="nav-inner">
          <div class="logo"></div>
          <ul>
          <li class="Item">
            <a href="/">Home</a>
          </li>
          <li class="Item">
            <a href="/docs">Docs</a>
          </li>
          <li class="Item">
            <a href="https://medium.com/vx-code">Guides</a>
          </li>
          <li class="Item">
            <a href="/gallery">Gallery</a>
          </li>
          </ul>
          <a class="github-button" href="https://github.com/hshoff/vx" data-show-count="true" aria-label="Star hshoff/vx on GitHub">Star</a>
          </div>
        </div>
    </div>
    <div class="doc-container">
      <div class="doc-nav">
        <ul>
        <li>Packages</li>
        ${nav.join('')}
        </ul>
      </div>
      <div class="content">
      ${html}
      </div>
    </div>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
  </html>`;
}

function readDocs() {
  const dirs = atPackagesDirectory().list(); // Get all the pkg directories
  const info = dirs
    .map(d => {
      return atPackagesDirectory()
        .dir(d)
        .read('./package.json');
    })
    .map(JSON.parse);
  const docs = [];
  for (let pkg of dirs) {
    docs.push(getDocObject(pkg, info));
  }

  return docs;
}

function writeDocs(docs) {
  const filePointer = atDocsDirectory();

  docs.forEach(({ pkg, html }) => {
    const fileName = `${pkg}.html`;
    filePointer.write(fileName, html);
  });
}

const docs = readDocs();
writeDocs(docs);
