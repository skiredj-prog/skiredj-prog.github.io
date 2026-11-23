# Vendored dependencies

## vis-network.min.js

* Version: 10.1.0
* Source: https://www.npmjs.com/package/vis-network
* License: Apache-2.0 OR MIT (see the package's own license terms)
* Why vendored: `index.html` previously loaded this from
  `unpkg.com/vis-network/standalone/umd/vis-network.min.js`. That's a
  single external dependency for the app's core graph-rendering
  feature — if the CDN is unreachable (offline use, a restrictive
  network, an institutional firewall), Explore Ontology fails outright
  with `vis is not defined` and no visible explanation to the user.
  Vendoring it makes the Workbench fully self-contained: no internet
  access is required beyond serving the directory over local HTTP.

To update: `npm install vis-network@<version>` anywhere, then copy
`node_modules/vis-network/standalone/umd/vis-network.min.js` here.
