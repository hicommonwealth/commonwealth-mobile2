# How to run on an Android device

This guide will walk you through the process of running the development app on a physical Android device.

## Prerequisites

1.  **Node.js and npm**: Ensure you have Node.js (which includes npm) installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2.  **EAS CLI**: If you haven't already, install the Expo Application Services (EAS) CLI globally:
    ```bash
    npm install -g eas-cli
    ```
3.  **Android Device**: A physical Android device connected to your computer via USB.
4.  **Android Studio (Recommended)**: While not strictly required for building with EAS, it is the easiest way to get the necessary Android SDK, platform tools (like ADB), and drivers installed.

## Step 1: Log in to your Expo account

If you haven't already, log in to your Expo account using the EAS CLI:

```bash
eas login
```

You can verify that you're logged in by running `eas whoami`.

## Step 2: Enable USB Debugging on your device

You need to enable Developer Options on your Android device to install and debug the app.

1.  On your Android device, go to **Settings** > **About phone**.
2.  Tap on **Build number** 7 times to enable Developer Options.
3.  Go back to the main **Settings** menu, and you should now see **Developer options**. It might be under **System** or at the bottom of the list.
4.  Inside **Developer options**, find and enable **USB debugging**.
5.  Connect your device to your computer. You may see a prompt on your device to "Allow USB debugging". Tap "Allow".

## Step 3: Build the development client

Now, you will build the development client for your Android device.

1.  Your `eas.json` is already configured correctly with the `development` profile for internal distribution, which will produce an installable APK.

2.  Kick off the build process:

    ```bash
    eas build --platform android --profile development
    ```
    This process will build your app in the cloud. You'll be provided with a link to monitor the build progress.

## Step 4: Install the build on your device

Once the build is complete, you can install it on your Android phone.

1.  You'll get a URL and a QR code on the build details page (from the link provided in the previous step).
2.  Open the camera app on your phone and scan the QR code. This will open a link in your browser.
3.  Tap the "Install" button on the webpage to download the **.apk** file.
4.  Once downloaded, open the file. You may be prompted to allow installations from "unknown sources". You must enable this to install the app.
5.  After installation, you can open the app.

## Step 5: Update `MAIN_APP_URL` in `config.ts` (Using Ngrok)

For local development with a physical device, you need to provide a publicly accessible `https` URL for your local web server, because the authentication service (Privy/Magic) requires a secure connection. A local IP address will not work.

The best way to do this is with a tunneling service like **ngrok**.

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

5.  Make sure you are using the `test` config. You can change the default at the bottom of `util/config.ts`.

**Important:** The ngrok URL is temporary. You will get a new URL every time you restart ngrok, and you will need to update `util/config.ts` accordingly.

## Step 6: Run the development server

Start the development server on your computer:

```bash
npx expo start --dev-client
```

## Step 7: Open the app on your Android device

1.  Ensure your phone is on the same Wi-Fi network as your computer.
2.  Open the newly installed app (named "Common") on your phone.
3.  The app should automatically connect to the development server. If it doesn't, you might see a developer menu where you can enter the server address manually.
4.  You will now see the app load, and any changes you make to the code will reflect in the app on your phone.

You are now set up to develop your Expo app on your physical Android device!

---
## Understanding the Workflow: When to Rebuild

A common question is "When do I need to run `eas build` again?". Here's the breakdown:

### Fast Refresh (Hot Reload) WILL Work

With this setup, any changes you make to your JavaScript/TypeScript files (`.js`, `.tsx`, etc.) will trigger a Fast Refresh on your device automatically. For your day-to-day work of building screens, components, and writing logic, you do **not** need to rebuild the app.

### When You MUST Rebuild the App

You only need to run `eas build --platform android --profile development` again when you change the *native* parts of your application. The most common reasons are:

1.  **Installing or updating a library with native code:** If you run `npx expo install new-native-library`, you will need to rebuild.
2.  **Changing native configuration in `app.json`:** This includes things like:
    *   The app icon or splash screen.
    *   The Android package name (`package`).
    *   Android permissions (`permissions`).
    *   Adding or removing an Expo Plugin from the `plugins` array.

Think of the installed app as a mini web browser, and your code as the website. You can update the website anytime. You only need a new browser when you want to add a fundamental new feature to the browser itself (like a new extension).

---
## Wired vs. Wireless Development (Do I need the USB cable?)

A great advantage of this workflow is that **you do not need to keep the USB cable plugged in all the time.**

### For Daily Development (Changing JS/TS code)

Once the development build is installed on your phone, you can **unplug the USB cable**.

As long as your phone and your computer are connected to the **same Wi--Fi network**, the development workflow will work wirelessly:

1.  Run `npx expo start --dev-client` on your computer.
2.  Open the app on your phone.
3.  The app will automatically find and connect to the development server over the network, and you will get Fast Refresh updates as you save your files.

### For Re-installing the App

You only need the USB cable again if you need to re-install the `.apk` file (for example, after making native code changes).

However, you can also set up **Wireless Debugging** to install and run the app from your computer without a cable.

**How to Enable Wireless Debugging (on modern Android):**

1.  Make sure your phone and computer are on the same Wi-Fi.
2.  On your phone, go to **Settings > Developer options**.
3.  Scroll down to the **Debugging** section and tap on **Wireless debugging**.
4.  Turn it on. You can then use the "Pair device with QR code" option in Android Studio or use `adb pair` commands in your terminal to establish a wireless ADB connection.

Once paired, you can run commands like `npx expo run:android --device` completely wirelessly. 