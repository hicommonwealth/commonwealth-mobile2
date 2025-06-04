
First install the expo client:

```text
npm install --global eas-cli
```

Then do ```eas login``` to login to expo.

# ```npx expo install``` will install new packages. 

DO NOT do ```npm install``` because ```expo install``` will check for compatible 
package versions.

With pnpm we should do ```expo install```, then invalidate the package-locks.json
then do a ```pnpm install``` again.

# ```npx eas update``` will push a new build to the Expo servers

##

Installed knock via push notifications here:

https://docs.knock.app/sdks/expo/push-notifications

## To build for iOS preview:

https://github.com/expo/fyi/blob/main/apple-2fa-sms-issues-workaround.md

```bash
eas build --profile preview --platform ios 
```

or 

```bash
eas build --profile preview --platform all 
```

for all platforms.

To build for all we just don't use the --platform option.

# To register new devices:

eas device:create

https://expo.dev/register-device/ea964f87-4685-4274-b328-b907f5c4c8da





# For prod

```bash
eas build  --platform ios --profile production 
eas submit --platform ios --profile production

```

Using push key with ID HB42U77ZXH


Invalid Provisioning Profile for Apple App Store distribution. The application
was signed with an Ad Hoc/Enterprise Provisioning Profile, which is meant for
"Internal Distribution". In order to distribute an app on the store, it must be
signed with a Distribution Provisioning Profile. Ensure that you are submitting
the correct build, or rebuild the application with a Distribution Provisioning
Profile and submit that new build.


## eas.json

We MUST have our configuration NOT be set to the following:

```json
  "developmentClient": false,
  "distribution": "internal",
  "channel": "production"
```

which is set by default. 


# Android

Follow these instructions:


https://docs.expo.dev/submit/android/

https://github.com/expo/fyi/blob/main/creating-google-service-account.md

## Upload Key Management

You will have to upload a new certificate to the play store at some point.

eas will manage the certificates for you but you need to upload the upload certificate.

Here's how to export it

- run eas credentials, select android, product, then keystore, then download existing credentials.
- it will PRINT the full details of the keystore for you including the password.

Then, you have to export the keystore, with the path and alias it provides.

```text
keytool -export -rfc -keystore "@kevin_common_xyz__commonxyz.jks" -alias 6b4b5b92044f12b34b71c7545b1b9342 -file upload_certificate.pem
```

# Releasing iOS versions

Once you've released done a 'submit' in a few minutes it will show up in TestFlight.

Which is here:

https://appstoreconnect.apple.com/teams/7df71a49-6b07-4e12-a53e-2b3b86e7855a/apps/6739505409/testflight/ios

once you see that version ready to release:

- Click on the 'Distribution' tab at the top of the browser.
- Then next to the 'iOS app' at the top left you'll see a blue 'plus' button
- Click that and add the version number you want to release.  
