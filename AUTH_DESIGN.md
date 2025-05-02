# Privy Auth

Privy is the source of truth for auth.

We make the webapp auth last LONGER than privy auth.

The following assumes they're using the mobile app, with privy enabled.

## Not authenticated

This is the default/initial state.  RequireAuth forces them through the auth
flow.  We then push the auth status information into the client and it triggers
auth.

## Authenticated 

This is the status when they are authenticated already in the client.  

They're already authenticated in react-native, so the webview loads up properly.

Their session in the browser is still active, so the app loads as normal. 

## Accidental DE-authentication

If *somehow* the user is not authenticated, we call SignOut again which triggers
the auth flow in react-native.  

This could happen with clock skew or a lost cookie but normally shouldn't happen.

## Sign Out 

If the user tries to "Sign Out" in the webapp, we actually sign them out in
react-native via RPC

At this point the RequireAuth component loads, and they're forced through the local auth status.

## RPS required for this

- privySignOut: forcibly sign out the user in react-native so RequireAuth is triggered 

# Magic Auth

Here's how auth works.

The client only loads the webapp. 

Any external URL loaded loads via Linking and opens the native browser app.

We do not load it inside the app.

When the user wants to auth in the webapp, they click the login button.

That then sends a postMessage to react-native of:

```json
{
  "type": "auth-started"
}
```

This causes the webapp view to unmount, them mount the main Login view.

That pushes us through the auth view which loads the Magic react-native SDK
and triggers the workflow.

Once the auth workflow is done with magic, we get back a bearer token.

That token then is pushed to the frontend with:

```json
{
  "type": "auth-requested",
  "bearer": "...12345..."
}
```

Then we call the normal auth flow in the browser..
