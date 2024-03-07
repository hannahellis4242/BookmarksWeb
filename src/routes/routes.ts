import { Router } from "express";
import labels from "./labels";
import Config from "../Config/Config";

const routes = (config: Config) =>
  Router()
    .use("/labels", labels(config))
    .get("/", (_, res) => res.render("./home"));

export default routes;
