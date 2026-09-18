# Watch Fit Tic-tac-toe

This is the first implementation slice for a two-player, offline Tic-tac-toe game intended for the HUAWEI WATCH FIT 5.

## Current state

- Game rules are isolated in `game.js`.
- Rule tests cover turns, invalid moves, wins, draws, and diagonals.
- `index.html` is a watch-sized interaction reference for the eventual wearable UI.
- The Huawei wearable SDK and device deployment tools are not installed on this machine yet.

## Run locally

```text
npm test
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser. A local HTTP server is needed because the UI uses ES modules.

## Next device step

Install the Huawei-supported DevEco Studio and wearable SDK, then confirm that WATCH FIT 5 is a valid custom-app target. The first device build should be a blank Hello World app. Once that deploys, port the state and rendering from `game.js` and `app.js` into the supported Huawei project format.

## Development plan

See [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) for the complete Fedora setup, device-support verification, native port, testing, signing, and installation plan.