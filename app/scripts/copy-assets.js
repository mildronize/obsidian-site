const copy = require('recursive-copy');
const siteMetadata = require('../data/siteMetadata');

const option = {
  overwrite: true,
  filter: ['**/*', '!**/**.md'],
};

async function main() {
  try {
    const results = await copy(siteMetadata.posts.contentDirectory, 'out', option);
    for(const result of results){
        console.info(`Copied "${result.dest}"`);
    }
    console.info('Done copied assets file ' + results.length + ' files');
  } catch (error) {
    console.error('Copy failed: ' + error);
  }
}

main();
