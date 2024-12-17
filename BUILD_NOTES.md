
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

To build for all we just don't use the --platform option.

# To register new devices:

eas device:create

https://expo.dev/register-device/ea964f87-4685-4274-b328-b907f5c4c8da
