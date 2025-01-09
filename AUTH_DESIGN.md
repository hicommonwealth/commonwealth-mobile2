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
