# poolsketch

## About

Unofficial API wrapper for PoolSketch.

## Installation

```sh-session
npm install poolsketch
yarn add poolsketch
pnpm install poolsketch
```

## Usage

```ts
import { Client } from 'poolsketch'

const client = new Client()

client.openNote('kyunkyun05').then(async note => {
  await note.edit({
    content: '',
    darkMode: true
  })
})
```
