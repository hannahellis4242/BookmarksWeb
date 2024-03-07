import axios, { Axios, AxiosError } from "axios";
import { Router, response } from "express";
import Config from "../Config/Config";

interface Dictionary {
  [key: string]: string[];
}

const recover = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return Promise.reject(error);
  }
  const { response } = error;
  if (!response) {
    return Promise.reject(error);
  }
  const { status } = response;
  if (!status) {
    return Promise.reject(error);
  }
  if (status !== 404) {
    return Promise.reject(error);
  }
  return Promise.resolve([]);
};

const labels = ({ bookmarks }: Config) =>
  Router().get("/", async (_, res) => {
    try {
      const labels = await axios
        .get<string[]>(`http://${bookmarks.host}:${bookmarks.port}/label/all`)
        .then(({ data }) => data)
        .catch(recover);
      const grouped = labels.reduce<Dictionary>((acc, x) => {
        const k = x.charAt(0);
        const cur = acc[k];
        cur.push(x);
        return acc;
      }, {});
      res.render("./labels", { grouped, isEmpty: labels.length === 0 });
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

export default labels;
