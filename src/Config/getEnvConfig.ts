import Config from "./Config";

const getEnvConfig = async (): Promise<Config> => {
  const portStr = process.env.PORT;
  if (!portStr) {
    return Promise.reject(new Error("No PORT in environment"));
  }
  const port = parseInt(portStr);
  if (!Number.isInteger(port)) {
    return Promise.reject(new Error("PORT is not an integer"));
  }
  const bookmarksHost = process.env.BOOKMARKS_HOST;
  if (!bookmarksHost) {
    return Promise.reject(new Error("No BOOKMARKS_HOST in environment"));
  }
  const bookmarksPortStr = process.env.BOOKMARKS_PORT;
  if (!bookmarksPortStr) {
    return Promise.reject(new Error("No BOOKMARKS_PORT in config file"));
  }
  const bookmarksPort = parseInt(bookmarksPortStr);
  if (!Number.isInteger(bookmarksPort)) {
    return Promise.reject(new Error("BOOKMARKS_PORT is not an integer"));
  }
  return { port, bookmarks: { host: bookmarksHost, port: bookmarksPort } };
};
export default getEnvConfig;
