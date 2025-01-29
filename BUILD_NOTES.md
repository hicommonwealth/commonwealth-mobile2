
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
