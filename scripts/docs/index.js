'use strict';

const jetpack = require('fs-jetpack'); // filesystem
const marked = require('marked'); // markdown parser
const {
  DOCS,
  PACKAGES,
  README,
  ASSETS,
  CSS_PATH,
} = require('./constants.js');

// Stop someone from running the script from it's directory
const ROOT = process.cwd();
if (ROOT === __dirname) {
  throw `Oops! It looks like you might not be running this from the project's
  root directory.`;
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
  const text = atPackagesDirectory().dir(pkg).read(README);
  if (text) return text;
  else return ''; // don't return "undefined"
}

/**
 * From a package directory, get the html from the markdown
 * @return {pkg, html}
 */
function getDocObject(dir) {
  const markdown = getReadmeText(dir);
  const html = marked(markdown);
  const cleanedHTML = prepareHTML(html);
  return {pkg: dir, html: cleanedHTML};
}

/**
 * Wraps HTML content in a proper <html> and
 * adds css.
 */
function prepareHTML(html) {
  const cssPath = `../doc_styles.css`;

  return `
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="${cssPath}">
    </head>

    ${html}
  </html>`;
}

function readDocs() {
  const dirs = atPackagesDirectory().list(); // Get all the pkg directories

  const docs = [];
  for (let pkg of dirs) {
    docs.push(getDocObject(pkg));
  }

  return docs;
}

function writeDocs(docs) {
  const filePointer = atDocsDirectory();

  for (let { pkg, html } of docs) {
    const fileName = `${pkg}.html`;
    filePointer.write(fileName, html);
  }
}

const docs = readDocs();
writeDocs(docs);
