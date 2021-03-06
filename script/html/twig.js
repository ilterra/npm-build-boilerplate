const buildFolder = require('../helper').getBuildRootFolder();
const fs = require('fs');
const glob = require('glob');
const helper = require('../helper');
const path = require('path');
const Twig = require('twig');

const twigDir = path.join(__dirname, '..', '..', 'src', 'twig');
const templatePath = path.join(twigDir, 'template', '*.twig');
const dataPath = path.join(twigDir, 'data', 'data.json');
const data = require(dataPath);

helper.createBuildRootFolderIfNotAvailable();

glob(templatePath, (err, files) => {
  if (err) {
      throw err;
  }

  files.forEach(file => {
    Twig.renderFile(file, data, (err, html) => {
      if (err) {
        throw err;
      }

      const filename = file.split('/').pop().replace('.twig', '.html');
      const filepath = path.join(buildFolder, filename);
      fs.writeFile(filepath, html, err => {
        if (err) {
          throw err;
        }
        console.log(`Html template saved: ${filename}`);
      });
    });
  });
});