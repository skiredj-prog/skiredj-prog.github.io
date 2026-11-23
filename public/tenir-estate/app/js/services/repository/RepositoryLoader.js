var RepositoryLoader = (function() {
  'use strict';

  async function load(manifestUrl) {
    console.log('RepositoryLoader: loading manifest…');

    const manifest = await JSONAdapter.load(manifestUrl);
    SchemaValidator.validateManifest(manifest);

    // Resolve all source paths relative to the manifest location
    const basePath = manifestUrl.substring(
      0,
      manifestUrl.lastIndexOf('/') + 1
    );

    const sources = manifest.sources || [];
    const result = { manifest, data: {} };

    for (const source of sources) {
      const sourcePath = basePath + source.path;

      console.log(
        `RepositoryLoader: loading ${source.type} from ${source.path}`
      );

      const data = await JSONAdapter.load(sourcePath);

      if (source.type === 'ontology') {
        SchemaValidator.validateOntology(data);
        result.data.ontology = data;

      } else if (source.type === 'corpus') {
        SchemaValidator.validateCorpus(data);
        result.data.corpus = data;

      } else {
        // Generic future sources
        result.data[source.type] = data;
      }
    }

    return result;
  }

  return { load };

})();