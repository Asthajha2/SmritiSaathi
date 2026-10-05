# SmritiSaathi Android app

The React app is packaged with Capacitor 8 as **SmritiSaathi**, application ID `in.quadspark.smritisaathi`, Android 7.0/API 24 or newer. The web screens ship inside the APK, rather than loading a remote website as the entire application.

## Connect the installed app

The backend is not embedded inside the APK. Patient accounts and caregiver synchronization still use the supplied Express server. On first launch, enter the HTTPS origin of your deployed SmritiSaathi service. The app checks `/api/health` before saving it. Never enter an unknown third-party server: your sign-in and records go to the selected service.

The **debug APK** also accepts `http://localhost:3001` or `http://10.0.2.2:3001` for developer testing. Cleartext access is limited to these loopback/emulator hosts in the debug Android manifest. Release builds reject HTTP.

### Test with this computer and a USB-connected Android phone

1. Run the backend from this project (`npm start` after `npm run build`). Keep it running.
2. Enable USB debugging on your own phone, connect it, and approve the computer's debugging prompt.
3. Run `adb reverse tcp:3001 tcp:3001` using Android SDK platform-tools.
4. Install/open the debug APK and enter `http://localhost:3001` on the care-service screen.
5. Sign in or create a patient account. For a separate caregiver, use another browser/device with a connection to the same server.

The USB connection is a development arrangement, not public hosting. Without USB port forwarding, `localhost` on a phone refers to that phone, not this computer. On an Android emulator use `http://10.0.2.2:3001`.

## Native features

- **Location:** Capacitor Geolocation with runtime permission and foreground watch/cleanup. No background location permission or continuous background tracking is requested.
- **Phone reminders:** Capacitor Local Notifications, explicitly enabled by the user. Future reminders can be scheduled by Android after the app closes; Android notification permission, power management and scheduling policy can delay/prevent delivery. They are generic on the lock screen. This is distinct from caregiver push or emergency delivery.
- **Speech output:** an Android TextToSpeech bridge. Missing language voices return an error; install supported voices in phone settings.
- **Speech input:** Android's speech recognition activity. A compatible recognition provider is required; availability/offline support varies and the provider may process audio remotely.
- **Offline shell:** bundled screens do not need a service worker in the Android app. The same IndexedDB patient cache and foreground sync queue remain in use. First login requires a server.
- **Networking:** Capacitor native HTTP transports authenticated requests to the selected server. Cookies are handled by the native transport; no password or bearer token is placed in localStorage.
- **Privacy:** Android application backup is disabled. Location remains consent-gated and role-checked by the backend. See README for storage and prototype limitations.

Browser service workers and browser FCM registration are not used inside the native app. Native remote push is not implemented; local phone reminders do not replace caregiver FCM/SMS. Browser-only voice/Whisper recording, audio-file selection and file export still require device testing. No iOS binary or Play Store submission is included.

## Rebuild

Requirements: Node 24, JDK 21, Android SDK Platform 36, Build Tools 36.0.0, and Android Studio compatible with Capacitor 8. Set `JAVA_HOME` and `ANDROID_HOME` for your machine. Do not commit `android/local.properties` or signing keys.

```sh
npm ci
npm run android:sync
npm run android:open
```

Android Studio opens the generated `android/` project. Build a debug APK using **Build → Generate App Bundles or APKs → Generate APKs** (menu wording depends on version).

For loopback/USB testing, build web assets with `VITE_ANDROID_DEV=true` before syncing:

```powershell
$env:VITE_ANDROID_DEV='true'
npm run android:sync
cd android
.\gradlew.bat assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`. The test APK uses debug signing and is not a Play Store release.

For a release, remove `VITE_ANDROID_DEV`, rebuild/sync, configure a real HTTPS backend, and use Android Studio **Generate Signed Bundle / APK** with your own securely retained signing key. Do not share that private key. Finish real-device, language, consent and accessibility testing before distribution to patients.

Server origin checks: if the native transport sends an `Origin` header, explicitly include `https://localhost` in the backend's comma-separated `APP_ORIGIN` allowlist, alongside its public web origin. Do not enable wildcard credentialed CORS.

Sources: [Capacitor Android](https://capacitorjs.com/docs/android), [native HTTP](https://capacitorjs.com/docs/apis/http), [local notifications](https://capacitorjs.com/docs/apis/local-notifications), [geolocation](https://capacitorjs.com/docs/apis/geolocation).
