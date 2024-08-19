const express = require("express");
const authRoute = require("./authRoute");
const assetRoute = require("./assetRoute");
const kecamatanRoute = require("./kecamatanRoute");
const skpdRoute = require("./skpdRoute");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/aset",
    route: assetRoute,
  },
  {
    path: "/kecamatan",
    route: kecamatanRoute,
  },
  {
    path: "/skpd",
    route: skpdRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
