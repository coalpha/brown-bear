# ~~tok5-tag-pos~~ tok-tag

*Tokenize and Tag Parts of Speech.*

View the git history from [@coarchive/tok5-tag-pos](https://github.com/coarchive/tok5-tag-pos).

This would have been so much easier if `wink-tokenizer` defined Token as

```ts
interface Token {
   token_type: TokenType,
   value: string,
};

// instead of 

interface Token {
   tag: Tag,
   value: string,
};
```

I could even patch the source but I'm too lazy to go that far.
Whenever you read `.tag`, think `.token_type`.
