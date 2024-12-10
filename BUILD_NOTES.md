
# ```npx expo install``` will install new packages. 

DO NOT do ```npm install``` because ```expo install``` will check for compatible 
package versions.

With pnpm we should do ```expo install```, then invalidate the package-locks.json
then do a ```pnpm install``` again.

# ```npx eas update``` will push a new build to the Expo servers

##

Installed knock via push notifications here:

https://docs.knock.app/sdks/expo/push-notifications
