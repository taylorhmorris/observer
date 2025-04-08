# observer
![tests](https://github.com/taylorhmorris/observer/actions/workflows/npm-test.yml/badge.svg)
[![docs](https://github.com/taylorhmorris/observer/actions/workflows/pages.yml/badge.svg?event=push)](https://taylorhmorris.github.io/observer/)
[![npm-ver](https://img.shields.io/npm/v/%40taylorhmorris/observer)](https://www.npmjs.com/package/@taylorhmorris/observer)

`observer` is a TypeScript package implementing a simple version of the Observer design pattern.

## Installation

Use npm to install `observer`
```bash
npm install taylorhmorris/observer
```

## Usage

Example of an observer which logs all notifications that it receives.

```ts
const broadcaster = new Broadcaster();
const observer = new Observer(console.log);

broadcaster.subscribe(observer);
broadcaster.notify('bob', 'says hi');
broadcaster.notify('john', 'says goodbye');
```

Output
```
bob says hi
john says goodbye
```
