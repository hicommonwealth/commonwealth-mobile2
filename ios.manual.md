# How to run on an iOS device

> **A Note on Physical Device vs. Simulator Development**
>
> The following guide explains the process for running on a physical iPhone. Be aware that this process is complex due to Apple's strict code-signing requirements. It is very common to get stuck on persistent errors like **"Cannot install because its integrity could not be verified"**, even after following all troubleshooting steps.
>
> **If you are running into issues, we strongly recommend switching to the much simpler and more reliable iOS Simulator development workflow outlined in `ios-simulator.manual.md`.** The simulator does not require any certificates or paid developer accounts and provides an almost identical development experience.

This guide will walk you through the process of running the development app on a physical iOS device.

## Prerequisites

1.  **Apple Developer Account**: You need an active Apple Developer account.
2.  **Node.js and npm**: Ensure you have Node.js (which includes npm) installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
3.  **EAS CLI**: Install the Expo Application Services (EAS) CLI globally by running:
    ```bash
    npm install -g eas-cli
    ```
4.  **Xcode**: Install Xcode from the Mac App Store.

## Step 1: Log in to your Expo account

If you haven't already, log in to your Expo account using the EAS CLI:

```bash
eas login
```

You can verify that you're logged in by running `eas whoami`.

## Step 2: Configure the project for EAS Build

Run the following command in your project's root directory to configure it for EAS Build. This will create an `eas.json` file if it doesn't exist.

```bash
eas build:configure
```

## Step 3: Register your iOS device with Apple

To run a development build on your physical device, you need to register it with your Apple Developer account.

1.  Connect your iPhone to your Mac.
2.  Run the following command to register your device:

    ```bash
    eas device:create
    ```

    Follow the prompts. It will likely ask for your Apple ID. This process will generate a provisioning profile that allows builds to be installed on your device.

    > **Note on Permissions:** If you receive an "Apple 403 detected - Access forbidden" error at this step, it means your Apple Developer account does not have Admin permissions for your team. You will need to contact your team's Account Holder or an Admin to get the necessary permissions to register devices and bundle identifiers.

## Step 4: Build the development client

Now, you will build the development client for your iOS device.

1.  Make sure your `eas.json` has a `development` profile that looks something like this. The changes from a previous step should have handled this.

    ```json
    {
      "build": {
        "development": {
          "developmentClient": true,
          "distribution": "internal"
        },
        ...
      }
    }
    ```

2.  Kick off the build process:

    ```bash
    eas build --platform ios --profile development
    ```
    This process will take some time as it's building your app in the cloud. You'll be provided with a link to monitor the build progress.

## Step 5: Install the build on your device

Once the build is complete, you can install it on your iPhone.

1.  You'll get a URL and a QR code on the build details page (the link from the previous step).
2.  Open the camera app on your iPhone and scan the QR code.
3.  This will prompt you to download and install the app. Follow the on-screen instructions.
4.  You may need to trust the developer profile in your iPhone's settings. Go to `Settings > General > VPN & Device Management` and trust the profile associated with your Apple Developer account.

## Step 6: Update `MAIN_APP_URL` in `config.ts` (Using Ngrok)

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

5.  Make sure you are using the `test` config. You can change it at the bottom of `util/config.ts`.

**Important:** The ngrok URL is temporary. You will get a new URL every time you restart ngrok, and you will need to update `util/config.ts` accordingly.

## Step 7: Run the development server

Start the development server on your computer:

```bash
npx expo start --dev-client
```

## Step 8: Open the app on your iPhone

1.  Ensure your iPhone is on the same Wi-Fi network as your computer.
2.  Open the newly installed app on your iPhone.
3.  It should connect to the development server running on your machine. You will see the app load, and any changes you make to the code will now reflect in the app on your phone.

You are now set up to develop your Expo app on your physical iOS device!

---
## Understanding the Workflow: When to Rebuild

A common question is "When do I need to run `eas build` again?". Here's the breakdown:

### Fast Refresh (Hot Reload) WILL Work

With this setup, any changes you make to your JavaScript/TypeScript files (`.js`, `.tsx`, etc.) will trigger a Fast Refresh on your device automatically. For your day-to-day work of building screens, components, and writing logic, you do **not** need to rebuild the app.

### When You MUST Rebuild the App

You only need to run `eas build --platform ios --profile development` again when you change the *native* parts of your application. The most common reasons are:

1.  **Installing or updating a library with native code:** If you run `npx expo install new-native-library`, you will need to rebuild.
2.  **Changing native configuration in `app.json`:** This includes things like:
    *   The app icon or splash screen.
    *   The iOS bundle identifier (`bundleIdentifier`).
    *   iOS `infoPlist` configurations.
    *   Adding or removing an Expo Plugin from the `plugins` array.

Think of the installed app as a mini web browser, and your code as the website. You can update the website anytime. You only need a new browser when you want to add a fundamental new feature to the browser itself (like a new extension).

---
## Troubleshooting Common Errors

### "Cannot install... its integrity could not be verified"

This is a common iOS error. If you see it after scanning the QR code, it means your iPhone does not trust the app. Follow these steps to fix it:

1.  **Enable Developer Mode (Most Common Fix):** On iOS 16+, you must enable Developer Mode.
    *   Go to **Settings > Privacy & Security > Developer Mode**.
    *   Turn the switch **ON**.
    *   **Restart** your iPhone when prompted.
    *   After restarting, tap **Turn On** on the final confirmation alert.
    *   Try installing the app again. If it still fails, continue to the next step.

2.  **Rebuild the App:** The provisioning profile used to sign the app is created during the build. If you registered your device (`eas device:create`) *after* the build was completed, that build doesn't know about your device. You must create a new one.
    ```bash
    eas build --platform ios --profile development
    ```
    Wait for the new build to finish and use the new QR code.

3.  **Trust the Developer Profile:** After a successful installation, you may need to manually trust the developer profile.
    *   Go to **Settings > General > VPN & Device Management**.
    *   Tap on your developer profile (e.g., "Cow Moon Wealth Software Inc.").
    *   Tap the **Trust** button.

### The "Nuclear Option": Resetting All Credentials

If you have tried all of the above and are still getting the integrity error, the signing credentials themselves may be in a bad or mismatched state. The most reliable fix is to delete all existing credentials and have EAS generate new ones.

1.  **Delete Credentials on EAS Dashboard:**
    *   Log in to your account on [expo.dev](https://expo.dev).
    *   Navigate to your project's dashboard.
    *   In the sidebar, click on **Credentials**.
    *   Select your app's bundle identifier (`xyz.common.mobile`).
    *   Find the **iOS Distribution Certificate** and **iOS Provisioning Profile** for your development profile.
    *   Use the on-screen options to **Revoke** or **Delete** both the certificate and the provisioning profile.

2.  **Run a New Build:**
    *   In your terminal, start a new build:
        ```bash
        eas build --platform ios --profile development
        ```
    *   EAS will detect that the credentials are missing and will guide you through logging into your Apple account to generate brand new ones. Follow the prompts.

3.  **Install the New Build:**
    *   Once the build is complete, use the new QR code to install the app. This fresh build with new credentials should resolve the integrity issue. 