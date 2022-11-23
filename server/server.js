const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
//=================================================
const { dev_phase, pro_phase } = require("../next.config");

//=================================================

app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(dev_phase.port, (err) => {
      if (err) throw err;
      console.log(` > Server Ready on http://localhost:${dev_phase.port}`);
    });
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });
