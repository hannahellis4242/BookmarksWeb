import axios, { Axios, AxiosError } from "axios";
import { Router, response } from "express";
import Config from "../Config/Config";

interface Link {
  link: string;
  labels: string[];
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

const links = ({ bookmarks }: Config) =>
  Router()
    .get("/", async (_, res) => {
      try {
        const data = await axios
          .get<Link[]>(`http://${bookmarks.host}:${bookmarks.port}/all`)
          .then(({ data }) => data)
          .catch(recover);
        res.render("./links", { data, isEmpty: data.length === 0 });
      } catch (e) {
        console.error(e);
        throw e;
      }
    })
    .post("/submit", async (req, res) => {
      try {
        //would use zod here but....this'll do for now
        const { body } = req;
        if (!body) {
          throw new Error("error no body in link submit");
        }
        const { link } = body;
        if (!link) {
          throw new Error("error no link in submit body in link submit");
        }
        await axios.post(`http://${bookmarks.host}:${bookmarks.port}\link`, {
          link,
        });
        res.redirect("/links");
      } catch (e) {
        console.log(e);
        throw e;
      }
    });

export default links;
