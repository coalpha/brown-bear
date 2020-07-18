interface IConfig {
   client: {
      id: string,
   },

   bot: {
      token: string,
   },
}

declare const config: IConfig;

export = config;
