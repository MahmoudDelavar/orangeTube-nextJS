const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
//=================================================

//----------------Logs config----------------
const debug = require("debug")("app:main");
const dbDebug = require("debug")("app:database");
const connDebug = require("debug")("app:connection");
const fechDebug = require("debug")("app:fech-data");
//=================================================
const { dev_phase, pro_phase } = require("../next.config");

app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(dev_phase.port, (err) => {
      if (err) throw err;
      connDebug(` > Server Ready on http://localhost:${dev_phase.port}`);
    });
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });
