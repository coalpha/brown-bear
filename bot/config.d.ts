interface Config {
   client: {
      id: string,
   },
   bot: {
      token: string,
   },
}

declare const config: Config;

export = config;
