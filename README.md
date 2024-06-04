# Course

Manage orienteering maps data with Javascript/Typescript

## Installation

### Deno

```sh
deno add @orienteering-js/map
```

### Npm

```sh
npx jsr add @orienteering-js/map
```

### Yarn

```sh
yarn dlx jsr add @orienteering-js/map
```

### Pnpm

```sh
pnpm dlx jsr add @orienteering-js/map
```

### Bun

```sh
bunx jsr add @orienteering-js/map
```

## Usage

```ts
import { CoordinatesConverter } from "@orienteering-js/map";

const mapCalibration = [
  {
    gps: { lat: 45, lon: 6 },
    point: { x: 0, y: 0 },
  },
  {
    gps: { lat: 45.5, lon: 6.02 },
    point: { x: 0, y: 4053 },
  },
  {
    gps: { lat: 45.03, lon: 6.65 },
    point: { x: 2587, y: 0 },
  },
];

const converter = new CoordinatesConverter(mapCalibration);

console.log(converter.latLongToXY([45.0256, 6.1456]));
```
