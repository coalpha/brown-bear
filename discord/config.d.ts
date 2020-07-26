interface config {
   client: {
      id: string,
   },
   bot: {
      token: string,
   },
}

declare const config: config;
export default config;
