interface FnDiscordCommandIO {
   (inp: string): string; 
}

declare const pureExports: { [command: string]: FnDiscordCommandIO };
export = pureExports; // I shouldn't need to do this but aaaaa

