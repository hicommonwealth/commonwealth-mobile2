# pending

- android back button should now work.

# 1.0.5

New release out!!! 

🤖 Android build details: https://expo.dev/accounts/kevin_common_xyz/projects/commonxyz/builds/58b7c8f7-df99-455f-92af-e6cb3d0604fc
🍏 iOS build details: https://expo.dev/accounts/kevin_common_xyz/projects/commonxyz/builds/9dad0632-9bbb-47f8-9a7f-524419dd5807

Here are the main release notes:

- Knock notifications SHOULD work in this release.  It's only tested with 'fake'
  notifications though.  The problem is this bug:

  https://github.com/hicommonwealth/commonwealth/issues/10453

This prevents me from authenticating with any of my secondary accounts.

I think it's a hard error and might be associated with frack because I can 
authenticate there.

Expo + Knock is better integrated with Knock and uses the templates properly.

I couldn't trigger the normal notification flow though because I can't auth
with a secondary email.

- We have to test the icons on iOS and Android.  They didn't work for me but
it might be because it's an unofficial build.  Both the docs AND Knock have said
that the app icons will be used - it's ust that we can't use custom icons. 

- The back button works on Android.  This calls the webview.goBack() method 
which works during auth but also our router history within react-router!

- Link handling should work for notifications. If we send a notification from
Knock into the mobile app we properly intercept that when it's 'pressed' and 
use the "react-native bridge" to push that link into the app at which point 
we use react-router navigate() to update the routes.  This means it properly 
works with the browser history.

We can't test it now though because of the auth bug.

- The latest code is pushed on Frack including all the mobile changes we wanted
but also the 'react-native bridge' code needed for customer handling of the UI.

# NEXT RELEASE

- I have to verify that notifications work properly once we fix auth
  - I have to verify link handling work for the same reason!
- I have to verify icons are properly swapped out
- Fix iOS 'back' gesture but gestures caused the app to crash before.  I might 
  have to implement a custom one like I did with our 'about' screen hack.
- Fix push notification settings in the webapp so they work on the mobile app
