# How to run on the Android Emulator (Local Build)

This guide provides a straightforward path to get the app running for development on the Android Emulator. It uses your local machine to build the app, which avoids many of the complexities of physical device builds.

## Prerequisites

1.  **Node.js and npm**: Ensure you have Node.js (LTS) installed.
2.  **Android Studio**: You must install the latest version of Android Studio. This is the official IDE for Android development and the easiest way to manage the Android SDK, platform tools (like ADB), and virtual devices (emulators).
3.  **An Android Emulator**:
    *   Open Android Studio.
    *   Go to **Tools > Device Manager**.
    *   Click **Create device**.
    *   Choose a device definition (e.g., "Pixel 7 Pro") and click **Next**.
    *   Select a recommended system image (the Android OS version) and click the download icon if it's not already downloaded. Click **Next**.
    *   Give your device a name and click **Finish**.

## Step 1: Install Project Dependencies

If you haven't already, make sure all the project's dependencies are installed by running this command in the project's root directory:

```bash
npm install
```

## Step 2: Configure for Local Development (Using Ngrok)

The authentication service used by the app (Privy/Magic) requires a secure `https` connection and will not work with a standard local IP address.

To solve this, you must expose your local web development server through a tunneling service like **ngrok**. This will give you a public `https` URL that both the emulator and the authentication service can access.

1.  **Run your other local web app** (the one that serves the web content) on its specified port (e.g., `8080`).
2.  **Expose it with ngrok:** In a new terminal, run `ngrok http 8080` (or whichever port your web app uses). Ngrok will give you a public URL like `https://xxxx-xx-xx-xx.ngrok-free.app`.
3.  **Update the config file:** Open `util/config.ts` and find the `TEST_CONFIG` object.
4.  Change the `MAIN_APP_URL` to your public ngrok URL.

    ```typescript
    const TEST_CONFIG: Config = {
      name: 'test',
      MAIN_APP_URL: 'https://your-unique-id.ngrok-free.app', // CHANGE THIS to your ngrok URL
      // ... other config ...
    }
    ```
5.  Ensure the `test` configuration is active at the bottom of the file:
    ```typescript
    export let config = TEST_CONFIG
    ```

**Important:** The ngrok URL is temporary. You will get a new URL every time you restart ngrok, and you will need to update `util/config.ts` accordingly.

## Step 3: Build and Run the App

This is the main step. The `npx expo run:android` command handles the entire process.

1.  **Launch the Emulator:** Before running the command, open Android Studio, go to the **Device Manager**, and launch the emulator you created by clicking the "Play" icon. Wait for it to fully boot up.
2.  **Run the Build Command:** In your terminal, from the project root, run:
    ```bash
    npx expo run:android
    ```

**What this command does:**
*   It checks for an `android` directory (the native Android project). If not, it creates it.
*   It builds the app using Gradle (Android's build tool).
*   It automatically finds your running emulator, installs the app (`.apk`), and launches it.
*   Finally, it starts the Metro development server to serve your JavaScript code.

The first build can take a few minutes. Subsequent builds are much faster.

## Step 4: Develop with Fast Refresh

The app should now be running in the emulator. Any changes you make to the JavaScript/TypeScript code will instantly appear via **Fast Refresh** (hot reload). You only need to run the command again if you change native dependencies. 