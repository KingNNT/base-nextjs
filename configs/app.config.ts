export const APP_CONFIG = {
  WEB_NAME: "Website Base NextJS",
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || "localhost",
  GRAPHQL_URI: process.env.NEXT_PUBLIC_GRAPHQL_URI || "localhost",
};

export const PAGINATION_CONFIG = {
  DEFAULT_SIZE: 10,
};
