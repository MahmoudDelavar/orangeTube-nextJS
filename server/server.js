const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
const mongoose = require("mongoose");
//=================================================
const router = require("./routes");
//=================================================

//----------------Logs config----------------
const debug = require("debug")("app:main");
const dbDebug = require("debug")("app:database");
const connDebug = require("debug")("app:connection");
const fechDebug = require("debug")("app:fech-data");
//=================================================
const { dev_phase, pro_phase } = require("../next.config");
server.use(express.json({ extended: true }));

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    //-----------handle all routes-----------
    server.use("/api", router);

    //---------connecting to database---------
    mongoose
      .connect(dev_phase.db_Address)
      .then(() => dbDebug("Connected to Database"))
      .catch((err) => dbDebug("Cant be Connetc:", err));

    //--------------runing serve--------------
    server.listen(dev_phase.port, (err) => {
      if (err) throw err;
      connDebug(` > Server Ready on http://localhost:${dev_phase.port}`);
    });
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });
