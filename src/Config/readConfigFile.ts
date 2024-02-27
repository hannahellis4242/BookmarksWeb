import { readFile } from "fs/promises";
import Config from "./Config";

const readConfigFile = async (path: string): Promise<Config> =>
  readFile(path)
    .then((data) => data.toString())
    .then((data) => JSON.parse(data))
    .then((config) => {
      const portStr = config.PORT;
      if (!portStr) {
        return Promise.reject(new Error("No PORT in config file"));
      }
      const port = parseInt(portStr);
      if (!Number.isInteger(port)) {
        return Promise.reject(new Error("PORT is not an integer"));
      }
      const bookmarksHost = config.BOOKMARKS_HOST;
      if (!bookmarksHost) {
        return Promise.reject(new Error("No BOOKMARKS_HOST in config file"));
      }
      const bookmarksPortStr = config.BOOKMARKS_PORT;
      if (!bookmarksPortStr) {
        return Promise.reject(new Error("No BOOKMARKS_PORT in config file"));
      }
      const bookmarksPort = parseInt(bookmarksPortStr);
      if (!Number.isInteger(bookmarksPort)) {
        return Promise.reject(new Error("BOOKMARKS_PORT is not an integer"));
      }
      return { port, bookmarks: { host: bookmarksHost, port: bookmarksPort } };
    });
export default readConfigFile;
