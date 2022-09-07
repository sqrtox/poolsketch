# poolsketch

## About

API wrapper for PoolSketch.

## Installation

```sh-session
npm install poolsketch
yarn add poolsketch
pnpm install poolsketch
```

## Usage

```ts
import { Client } from 'poolsketch';

const client = new Client();

client.notes.fetch('kyunkyun05').then(async note => {
  const edited = await note.edit({ darkMode: true });

  console.log(edited.editedAt);
});
```
