import { Router } from "express";
import labels from "./labels";

const routes = Router();
routes.get("/",(_,res)=>res.render("./home"));
routes.use("/labels",labels);

export default routes;