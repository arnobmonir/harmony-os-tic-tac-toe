# HUAWEI WATCH FIT 5 Development Plan

## Goal

Install a simple offline, two-player Tic-tac-toe game on the HUAWEI WATCH FIT 5:

- 3 x 3 touch grid
- X and O in different colors
- Local turn-based play
- Win, draw, and restart behavior
- Winning-line indicator
- No account, network, AI, ads, or phone companion in version one

## Current project state

- `game.js` contains the platform-independent game rules.
- `game.test.js` contains four passing rule tests.
- `index.html`, `app.js`, and `styles.css` are a browser/watch-sized UI prototype.
- Fedora is used for Git, browser testing, and game-logic tests. The Mac with DevEco Studio is the native Huawei development machine.
- The prototype can be run locally with `python3 -m http.server 8080`.

## Phase 1: Prepare the Mac

1. Install or update **DevEco Studio for Mac** using the package matching the Mac processor: Mac (ARM64) for Apple Silicon or Mac (x86) for Intel.
2. Install the wearable SDK, toolchains, emulator/device tools, and signing components through DevEco Studio.
3. Sign in to the Huawei Developer account.
4. Clone or pull this repository on the Mac:

   ```text
   git clone https://github.com/arnobmonir/harmony-os-tic-tac-toe.git
   cd harmony-os-tic-tac-toe
   npm test
   ```

5. Confirm `hdc` and `ohpm` are available through the DevEco Studio installation if required.
6. Create a blank Hello World wearable project and verify whether WATCH FIT 5 appears as a supported target.

## Phase 2: Verify the watch platform

1. Check whether WATCH FIT 5 supports a public HarmonyOS wearable app model.
2. Check developer mode, debugging, signing, and direct test installation support.
3. Build and deploy the Hello World project to the physical watch.
4. If Hello World installs, continue with the game port. If it does not, use the official Watch AppGallery submission route if available; do not sideload an arbitrary package.

## Phase 3: Fedora support workflow

Use Fedora for source changes, browser testing, documentation, and GitHub synchronization:

```text
git pull origin main
npm test
git add .
git commit -m "Describe the change"
git push origin main
```

## Optional Fedora command-line tools

1. Confirm the computer architecture:

   ```text
   uname -m
   ```

   For a normal Intel/AMD Fedora installation, use **Command Line Tools for Linux (x86) 6.1.1.280** from the Huawei download page. Use the ARM package only if `uname -m` reports an ARM architecture.

2. Install the Linux command-line tools and extract them according to Huawei's included instructions.
3. Add the tool binaries to `PATH` if Huawei's instructions require it.
4. Confirm the tools are available:

   ```text
   hdc version
   ohpm --version
   ```

5. Keep the downloaded archive and its SHA-256 value so the package can be verified before installation.

## Phase 2: Verify the watch platform first

The screenshot provides Linux command-line tools but no Linux DevEco Studio IDE. Before porting the game:

1. Check Huawei documentation and the installed SDK for an exact **WATCH FIT 5** application/device target.
2. Check whether the watch supports a public HarmonyOS wearable app model or only approved Watch AppGallery apps/watch faces.
3. Check whether developer mode, USB/Bluetooth debugging, signing, and direct test installation are available for this model.
4. Create the smallest official Hello World project using the supported Huawei project format.
5. Build it and attempt deployment to the physical watch.

### Platform decision

- **If Hello World installs:** continue to Phase 3 and port the game.
- **If the watch is not a supported custom-app target:** do not try to sideload an arbitrary package. Use Huawei AppGallery Connect/Watch AppGallery submission if Huawei allows it, or stop the watch-native path and keep the browser prototype as a design reference.
- **If the IDE is required:** use a supported Windows/macOS machine, dual boot, or a compatible virtual machine. Fedora can still be used for source code, tests, and any supported command-line deployment tools.

## Phase 3: Port the game

1. Create the wearable project using the exact API level and device profile confirmed in Phase 2.
2. Port the state model from `game.js`:
   - nine cells
   - current player
   - winner or draw
   - winning line
   - game-over state
3. Port the UI from the browser prototype:
   - full-screen square board
   - large touch targets
   - high-contrast X and O colors
   - no top headings or status text
   - soft winning stroke
   - restart icon shown inside the board after a 3-second result pause
4. Keep the game offline and avoid unsupported browser APIs, SVG behavior, CSS-only features, or desktop layout assumptions if the wearable framework does not support them.

## Phase 4: Test

### Automated logic checks

Run from the project directory:

```text
npm test
```

Verify all eight winning lines, draws, occupied-cell taps, moves after game over, and reset behavior.

### Watch checks

- Board fits the complete display without clipping.
- Every cell is easy to tap.
- X and O colors are readable in indoor and outdoor brightness.
- Winning line points in the correct direction and covers the complete winning line.
- The result remains visible for 3 seconds.
- Restart control appears inside the board and works by touch.
- Back gesture/button exits or behaves according to Huawei wearable guidelines.
- Screen sleep, app resume, and repeated rounds do not corrupt state.

## Phase 5: Sign, install, and distribute

1. Create or configure the required Huawei developer account.
2. Create the application entry/package identity in AppGallery Connect if required.
3. Generate the required signing certificate/profile using Huawei's supported process.
4. Build a signed debug/release package.
5. Install it through the official developer deployment route if WATCH FIT 5 supports direct testing.
6. If direct installation is unavailable, submit the package to Huawei's Watch AppGallery review process and install it through HUAWEI Health after approval.
7. Keep the package ID, signing files, and version number consistent for future updates.

## Immediate next actions

1. Download **Command Line Tools for Linux (x86) 6.1.1.280** on Fedora.
2. Run `uname -m` and install the matching package.
3. Verify `hdc` and `ohpm` are available.
4. Search the installed SDK/documentation for a WATCH FIT 5 target.
5. Report the exact result of the Hello World build/deployment attempt before starting the native port.

## Success criteria

The project is complete only when the game builds with the supported Huawei toolchain and is either successfully installed on the physical WATCH FIT 5 or accepted through Huawei's official Watch AppGallery route. A browser build alone is not considered a watch installation.