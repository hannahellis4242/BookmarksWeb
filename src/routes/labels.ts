import axios from "axios";
import { Router } from "express";
import Config from "../Config/Config";

interface Dictionary {
  [key: string]: string[];
}

const labels = ({ bookmarks }: Config) =>
  Router().get("/", async (_, res) => {
    try {
      console.log("labels");
      const labels = await axios
        .get<string[]>(`${bookmarks.host}:${bookmarks.port}/label/all`)
        .then(({ data }) => data);
      console.log(`Got labels : ${JSON.stringify(labels)}`);
      const grouped = labels.reduce<Dictionary>((acc, x) => {
        const k = x.charAt(0);
        const cur = acc[k];
        cur.push(x);
        return acc;
      }, {});
      console.log(`groups : ${JSON.stringify(grouped)}`);
      res.render("./labels", grouped);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

export default labels;
