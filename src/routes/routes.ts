import { Router } from "express";
import labels from "./labels";
import Config from "../Config/Config";
import links from "./links";

const routes = (config: Config) =>
  Router()
    .use("/labels", labels(config))
    .use("/links", links(config))
    .get("/", (_, res) => res.render("./home"));

export default routes;
