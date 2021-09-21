# README

Within the scope of 1 hour, I was able to write an API client that
reliably and safely marshalls responses from the
postcodes API into the typescript type-system.

I decided to concentrate on this element, as this is the area where
the most risk of errors and bugs exists. Once one is confident that
the types do accurately reflect the information received from the
external source, the rest of the app is much more straightforward.

As a result, you won't see much except the "create react app" starter
app if you run `yarn start`. However, if you look in the dev console,
you will see the result of two requests, one valid, one invalid.

Next steps:
- [ ] Unit tests for `PostcodeClient`, using mock of `fetch`.
- [ ] API shortcut didn't work - need extra API call for info on original
- [ ] Write form
- [ ] Write some GUI tests
- [ ] Improve CSS
- [ ] Better spinner icon