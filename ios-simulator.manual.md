# How to run on the iOS Simulator (Local Build)

This guide provides the simplest path to get the app running for development. It uses your local Mac to build the app and run it on the iOS Simulator, which **does not require a paid Apple Developer account, certificates, or provisioning profiles.**

## Prerequisites

1.  **A Mac computer:** Building for iOS can only be done on macOS.
2.  **Node.js and npm**: Ensure you have Node.js (LTS) installed.
3.  **Xcode**: Install the latest version of Xcode from the Mac App Store. This is essential as it includes the iOS Simulator and all the necessary build tools.
4.  **Xcode Command Line Tools**: After installing Xcode, you may need to install the command line tools. Open your terminal and run:
    ```bash
    xcode-select --install
    ```
    If it's already installed, it will let you know.

## Step 1: Install Project Dependencies

If you haven't already, make sure all the project's dependencies are installed by running this command in the project's root directory:

```bash
npm install
```

## Step 2: Configure for Local Development (Using Ngrok)

The authentication service used by the app (Privy/Magic) requires a secure `https` connection and will not work with a standard `http://localhost` address.

To solve this, you must expose your local web development server through a tunneling service like **ngrok**. This will give you a public `https` URL that both the simulator and the authentication service can access.

1.  **Run your other local web app** (the one that serves the web content) on its specified port (e.g., `8080`).
2.  **Expose it with ngrok:** In a new terminal, run `ngrok http 8080` (or whichever port your web app uses). Ngrok will give you a public URL like `https://xxxx-xx-xx-xx.ngrok-free.app`.
3.  **Update the config file:** Open `util/config.ts` and find the `TEST_CONFIG` object.
4.  Change the `MAIN_APP_URL` to your public ngrok URL.

    ```typescript
    const TEST_CONFIG: Config = {
      name: 'test',
      MAIN_APP_URL: 'https://your-unique-id.ngrok-free.app', // CHANGE THIS to your ngrok URL
      KNOCK_EXPO_CHANNEL_ID: "c416d699-c6ac-4288-8d76-9a792cf53ffa",
      KNOCK_PUBLIC_API_KEY: "pk_RLg22EIJ6jsuci6c7VvBU59gDQJZeFoeBKlOkgJLWvA",
      PRIVY_APP_ID: 'cm8er6mrm00fowbqy8bpw3956',
      PRIVY_CLIENT_ID: 'client-WY5i1Up82Zaa6pQzZqFQHHLGxnuXQkeik7oCbhMW1AwQC',
      PRIVY_MOBILE_ENABLED: true,
      PRIVY_DEBUG: false,
      WEBAPP_DEBUG_URL: null,
    }
    ```

5.  Ensure the `test` configuration is active at the bottom of the file:
    ```typescript
    export let config = TEST_CONFIG
    ```

**Important:** The ngrok URL is temporary. You will get a new URL every time you restart ngrok, and you will need to update `util/config.ts` accordingly.

## Step 3: Build and Run the App

This is the main step. The `npx expo run:ios` command handles everything for you.

1.  In your terminal, from the project root, run the following command:
    ```bash
    npx expo run:ios
    ```

**What this command does:**
*   It checks if an `ios` directory (the native Xcode project) exists. If not, it creates it for you.
*   It installs all the necessary native dependencies using CocoaPods.
*   It builds the app using Xcode's tools on your machine.
*   It automatically finds an available iOS Simulator, boots it up if needed, and installs the app.
*   Finally, it launches your app inside the simulator and starts the Metro development server to serve your JavaScript code.

The first time you run this, it can take several minutes to build the app. Subsequent builds will be much faster.

## Step 4: Develop with Fast Refresh

That's it! The app should now be running in the simulator. It is connected to your local development server.

Any changes you make to the JavaScript/TypeScript code will instantly appear in the simulator via **Fast Refresh** (hot reload). You do **not** need to run the `npx expo run:ios` command again unless you change native dependencies (as explained in the other manuals).

This local simulator workflow is the most common and efficient way to develop the UI and features of an Expo app.

---
## Troubleshooting Local Builds

### Build Error: 'React/.../...h' file not found

If you see an error like `'React/RCTThirdPartyFabricComponentsProvider.h' file not found`, it means the native `ios` project is out of sync.

**The Fix:** Delete the `ios` directory and let Expo rebuild it from scratch. This is a safe operation.

```bash
# First, stop the current build process.
# Then, run these commands:
rm -rf ios
npx expo run:ios
```

### Build Error: Swift Compiler Errors (in Privy library)

If you see errors from the Swift compiler like `cannot infer return type for closure` or `unexpected non-void return value in void function` originating from a file in `node_modules/@privy-io`, it means your local version of Xcode and its Swift compiler is stricter than the one used for cloud builds.

**The Fix:** We have already created a patch file to fix this. If you encounter it again (e.g., after reinstalling `node_modules`), ensure the patch is applied correctly by running:

```bash
npm install
```
This runs `patch-package` automatically as a `postinstall` script, which should fix the issue.

### Fast Refresh (Hot Reload) Not Working

If the app builds and runs, but your code changes do not appear automatically in the simulator, the Metro file watcher is likely in a bad state or misconfigured.

**The Fix (Part 1 - Reset Cache):**

First, try a hard reset of all caches. Stop the current server and run these commands:

```bash
# 1. Reset the file watcher
watchman watch-del-all

# 2. Clear Metro's cache
rm -rf $TMPDIR/metro-*

# 3. Restart the build with the --clear flag
npx expo run:ios --clear
```

**The Fix (Part 2 - Monorepo Config):**

If resetting the cache doesn't work, it is highly likely you have a monorepo setup (i.e., your web code is in a separate, linked folder). You need to explicitly tell Metro to watch those files too. This requires modifying `metro.config.js` to include the other project folders. 