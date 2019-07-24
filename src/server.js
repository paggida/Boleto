const express = require("express");
const cors = require("cors");
const youch = require('youch');

class App {
  constructor() {
    this.express = express();

    if (process.env.NODE_ENV === "development") {
      require("dotenv-safe").config({ allowEmptyValues: true });
    } else {
      require("dotenv").config({ path: "../.env" });
    }
    this.middlewares();
    this.security();
    this.routes();
    this.exception();
  }

  middlewares() {
    this.express.use(cors());
  }

  security() {
    this.express.disable("x-powered-by");
    this.express.disable("etag");
  }
  routes() {
    this.express.use(require("./routes"));
  }
  exception() {
    this.express.use(async (err, req, res, next)=>{
        if(process.env.NODE_ENV!=='production'){
          const errYouch = new youch(err,req)
          return res.json(await errYouch.toJSON())
        }
        return res.status(err.status||500).json({
          message:
            "Erro interno do servidor, por favor, tente novamente mais tarde"
        })
    });
  }
}

module.exports = new App().express;
