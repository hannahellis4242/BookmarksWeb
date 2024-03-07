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
        .get<string[]>(`http://${bookmarks.host}:${bookmarks.port}/label/all`)
        .then(({ data }) => data)
        .catch((e) => {
          console.log(`*** ERROR ***\n${e}\n=============`);
          return Promise.resolve([]);
        });
      console.log(`Got labels : ${JSON.stringify(labels)}`);
      const grouped = labels.reduce<Dictionary>((acc, x) => {
        const k = x.charAt(0);
        const cur = acc[k];
        cur.push(x);
        return acc;
      }, {});
      console.log(`groups : ${JSON.stringify(grouped)}`);
      res.render("./labels", { grouped, isEmpty: labels.length === 0 });
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

export default labels;
