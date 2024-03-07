import express, { json, urlencoded } from "express";
import getConfig from "./Config/getConfig";
import { exit } from "process";
import { join } from "path";
import routes from "./routes/routes";

(async () =>
  getConfig()
    .then((config) => {
      const app = express();
      app.use(urlencoded({ extended: true, parameterLimit: 12 }));
      app.use(json());

      app.set("view engine", "ejs");
      app.set("views", join(__dirname, "..", "views"));

      app.use(express.static(join(__dirname, "..", "public")));

      app.use("/", routes(config));

      app.listen(config.port, "0.0.0.0", () =>
        console.log(`listening on port ${config.port}`)
      );
    })
    .catch((reason) => {
      console.error(reason);
      exit(1);
    }))();
