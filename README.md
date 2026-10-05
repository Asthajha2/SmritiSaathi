# SmritiSaathi — स्मृति साथी

**Android app:** `android/` contains a Capacitor app with native GPS, local reminders and Android speech integration. See [ANDROID.md](ANDROID.md) for installation, server connection and APK rebuild instructions. The backend runs separately.

Runnable  prototype for Team , built from **SmritiSaathi_Project_Plan.docx** supplied in the referenced conversation. The document was read in full. No previous complete React source was available, so this is a fresh implementation of its requirements.

**Cognitive support and screening assistance, not diagnosis.** Activity results are practice telemetry, not validated cognitive scores. The application is not an emergency response service or a clinically validated device.

## Run locally

Install **Node.js 24 LTS**. Open this folder in VS Code and run:

```sh
npm ci
```

Copy `.env.example` to `.env` (Windows: `Copy-Item .env.example .env`). No external keys are needed for accounts, games, reminders, linking or database storage.

```sh
npm run dev
```

Open **http://localhost:5173**. Use this exact hostname; the development origin allowlist defaults to it. Vite proxies `/api` to the Express server on port 3001. To use `127.0.0.1`, add `http://127.0.0.1:5173` to the comma-separated `APP_ORIGIN` value. Do not open `index.html` directly.

1. Create a patient account with a password of at least ten characters and accept account-storage consent.
2. In a separate browser profile/private window, create a caregiver account.
3. Patient: **Care circle → Create invitation**, explicitly consenting to sharing.
4. Caregiver: enter that single-use, ten-minute invitation code. No patient data is readable before linking.
5. Patient: complete an activity. Caregiver: view its real result in Care circle. Data refreshes every fifteen seconds while connected.
6. Add familiar names/relationships, reminders and places. GPS sharing requires its own consent under Privacy & settings.

No seeded users, default passwords, invented API keys, fabricated scores or fake live weather are included.

## Production build / offline demonstration

```sh
npm test
npm run build
npm start
```

For local production-build testing, keep `NODE_ENV=development` and set `APP_ORIGIN=http://localhost:3001`. Open **http://localhost:3001**. HTTPS deployments must use `NODE_ENV=production`, which enables secure cookies.

The service worker is intentionally enabled only for production builds. Open the built app once online, sign into the patient account, then reload after the worker activates. Disconnect networking and complete a game or add a reminder. The pending count should increase. Reconnect with the app open: the queue replays and caregiver data refreshes. A service worker does not make initial installation or first account sign-in possible offline.

## Implementation status and boundaries

| Plan area | Delivered | Important boundary |
|---|---|---|
| Vite + React | Component-based app, responsive high-contrast UI, large controls, text enlargement | Custom CSS rather than Tailwind; no complete prior source was supplied |
| Accounts / database | Express + Node SQLite, scrypt password hashes, opaque HttpOnly-cookie sessions | SQLite is a runnable scaffold; managed Firestore/MongoDB integration is not included |
| Patient/caregiver linking | Explicit patient consent, random expiring single-use invitations, revoke connection | Possession of a privately shared invitation is the authorization mechanism; patient IDs alone do not authorize access |
| Seven languages | English, Hindi, Assamese, Khasi, Mizo, Manipuri, Bodo locale dictionaries, locale-aware speech, English fallback | **Draft / partial translations.** Core navigation is translated to varying coverage; many instructions remain English. Not seven fully reviewed translations. Native-speaker review is required, especially Khasi/Mizo/Manipuri/Bodo |
| Nine games | Symbol memory, pattern, sequence, routine, familiar people, detail, melody, arithmetic, attention | Five rounds each. Familiar people uses user-entered text; not face recognition. Melody uses generated tones. Local-only favourite audio playback is also available; neither is music therapy |
| Adaptive difficulty | Three-session accuracy/latency heuristic, levels 1–5, saved results | Increases recall length, distractors, arithmetic/pattern scale, or attention load where relevant. Routine/family content is constrained by its dataset. No trained AI or validated screening model |
| Speech | Browser STT/TTS, voice section navigation, optional 15-second Whisper recording | Language/device/network support varies. STT can send audio to providers. No claim of reliable offline speech |
| Reminders | Persistent reminders, title editing, completion toggle and deletion; local due alerts | Closed-app reminders need configured FCM and running backend; no exact-time delivery guarantee |
| Location / geofencing | Browser watchPosition, accuracy-aware distance checks, consent, saved safe circles, Leaflet map | Foreground browser operation only. GPS can stop in background. Multiple circles are evaluated independently; no continuous route history or native background tracking |
| Memory cues / weather | Nearby saved-place text cues, date grounding, actual optional weather API | Weather is explicitly unavailable until configured. Map tiles require internet. Weather description follows provider language |
| SOS | Trusted-contact telephone link, persistent caregiver alert, acknowledgment | No automatic call, SMS, ambulance dispatch, or delivery guarantee. Offline alerts stay queued |
| Caregiver dashboard | Real patient results, latest-ten bars, per-game recent trend changes, alerts | Polling, not real-time sockets. Trend changes are descriptive and unvalidated; changing levels complicate comparisons |
| Offline PWA | Build-hashed app-shell precache, manifest/icons, IndexedDB records and mutation queue | Patient-only offline cache; foreground retry on reconnection/poll. No unattended worker authentication or guaranteed closed-app sync |
| Consent/privacy/RBAC | Server-side role checks, origin/header CSRF protection, consent audit, unlink, account export/deletion, rate limits | No encryption-at-rest implementation or compliance certification. Offline records are plaintext browser data. Host disk encryption/TLS must be configured |
| Push | Firebase client-token enrollment, generic service-worker notifications, optional Admin scheduler | Real credentials and permission required; device-level delivery/retry testing remains. Scheduler supports one running instance; not a production queue |
| Deployment | Dockerfile, Render blueprint, Vercel/Firebase frontend configs, GitHub build/test workflow | No accounts were connected and nothing was deployed. Frontend-only hosting needs a same-origin backend proxy |

## Project layout

```text
src/                  React screens, games, voice, Leaflet map, IndexedDB client
shared/logic.js       Adaptive heuristic, distance/geofence and trend functions
server/index.js       Authenticated REST API and server-side authorization
server/schema.sql     Users, sessions, links, records, consent audit, sync receipts
server/push.js         Optional Firebase Admin delivery worker
scripts/build-sw.js   App-shell precache generation
public/               PWA manifest, icons and worker template
tests/                Logic and API integration tests
```

## External service configuration

All secret values belong in server environment variables or your host's secret store. Never place server secrets in `VITE_` variables, which are public browser build configuration.

### Weather (optional)

Set `OPENWEATHER_API_KEY` on the backend to a valid OpenWeather current-weather key. **Check weather** sends the displayed coordinates through your backend to OpenWeather only when selected. Blank configuration returns an explicit unavailable message. No weather is invented.

### Voice (optional)

Browser speech is independent of API keys. Clicking Speak requests microphone/recognition access and uses the selected locale. Availability depends on the browser and installed voices.

For the alternative recording flow, set server-side `OPENAI_API_KEY`. **Record up to 15 seconds** obtains microphone permission, uploads WebM audio to the server and forwards it to `whisper-1`. Audio is not stored in this database. Choose a browser that supports MediaRecorder; provider errors are surfaced. Obtain appropriate user consent before using external transcription.

### Firebase Cloud Messaging (optional)

1. Create a Firebase project and web app, enable the FCM HTTP v1 API and create a web-push VAPID key.
2. Set the five `VITE_FIREBASE_*` values from `.env.example` before building. These are the Firebase web app configuration, not Admin secrets.
3. Store a service-account JSON **outside the repository** and point `GOOGLE_APPLICATION_CREDENTIALS` to it on the backend (or adapt `server/push.js` to the host's workload identity).
4. Run the production-built app over HTTPS, accept notification permission, then click **Enable push notifications**.
5. Keep one backend instance running. It checks due reminders and alerts every 30 seconds and sends generic lock-screen messages. Delayed reminders older than one day are not pushed.

This is a basic delivery scaffold: partial multicast failures are not independently retried, invalid tokens need cleanup, and browser/OS policy controls delivery. Test with real devices before relying on it. There are no SMS or WhatsApp integrations.

### Maps

Leaflet uses OpenStreetMap standard tiles without an API key. Attribution is retained. Do not bulk-download or pre-cache these tiles. For wider deployment use a suitable tile provider and follow its policy. External maps expose requested map areas to the provider.

## Deployment

### Recommended: one origin, persistent backend

The whole application runs in the supplied Docker image. This avoids cross-site-cookie complications and preserves SQLite state on a mounted disk.

```sh
docker build -t smritisaathi .
docker run -p 3001:3001 -e APP_ORIGIN=https://YOUR-DOMAIN -v smriti-data:/app/data smritisaathi
```

Put it behind an HTTPS reverse proxy, set `APP_ORIGIN` to the exact public origin, and retain the disk. If using a proxy, configure Express `trust proxy` for that exact topology before relying on per-client rate limiting. Do not set it blindly to trust arbitrary forwarded headers.

`render.yaml` is ready for Render's “New Blueprint” flow after pushing this folder as a repository. It requests a persistent disk and a paid starter instance; review the host's cost before provisioning. Supply the final HTTPS origin when prompted. The SQLite backend must remain a single instance.

### Vercel / Firebase Hosting

The provided configurations build/serve **only the frontend**. They do not turn SQLite into a serverless database. To enable login:

1. Deploy the backend with persistent storage first.
2. Configure a **same-origin `/api/**` reverse proxy** to that backend. In Vercel, add an `/api/:path*` rewrite to `https://YOUR-BACKEND/api/:path*` **before** the SPA fallback. For Firebase, configure a supported Cloud Run/function rewrite that forwards to the backend, or host the full Docker app on Cloud Run with a durable database adaptation.
3. Set backend `APP_ORIGIN` to the frontend's exact HTTPS origin; rebuild the frontend with any public Firebase configuration.
4. Deploy the frontend. Keep `VITE_API_URL` empty when using the recommended same-origin proxy.

Direct cross-origin `VITE_API_URL` is not ready by default: the server deliberately does not expose credentialed CORS, and strict SameSite cookies require a same-site setup. Do not treat a standalone static deployment as a working multi-device app.

A universal one-click full-stack URL cannot be supplied without a repository URL, hosting account and backend/secret configuration. The repository and host templates are prepared; no credentials or repository URLs have been invented.

## Data, synchronization and security notes

- Each mutation carries a unique event ID. The server records its receipt in the same transaction as the write so retries do not duplicate scores or reminders.
- Patient writes are queued in IndexedDB, then replayed in order. Network failures keep them queued. Unauthorized/invalid events remain marked failed for review. Mutable records currently use last-arrival-wins; this is not conflict-free collaborative editing.
- Linked caregivers must be online. Their records are not persisted to IndexedDB. Revocation blocks subsequent reads/writes immediately at the API; previously viewed/copied information cannot be recalled.
- Latest GPS point replaces the prior one. Withdrawing location consent deletes the server's latest location; already-synced place definitions and alert messages remain until removed or the account is deleted.
- Sign-out clears local app records and queued changes after confirmation if any are pending. Sessions expire after seven days. Expired online authentication requires signing in again.
- Account deletion removes owned records, sessions, invitation/link rows, push tokens and audit rows associated with the account. Hosting backups need their own retention/deletion policy.
- Passwords are scrypt-hashed with random salts. TLS, encrypted volumes, backups, audit retention, password reset, email verification, stronger abuse controls, privacy review and clinical validation remain deployment work.
- No secret is baked into source. API responses are `no-store`; the service worker caches only the static shell and never `/api` or third-party tiles.
- Optional WebMCP navigation tool is feature-detected and has no data-writing action. It has not been validated in a WebMCP-capable browser.

## Verification and next milestones

`npm test` exercises adaptive thresholds, geofence uncertainty, patient/caregiver RBAC, consent-gated location, invitation reuse protection, idempotent submissions, revocation and account deletion. `npm run build` compiles the frontend and creates the offline shell.

Before a real pilot: manually test on target Android devices, large text and keyboards; verify offline reload/replay and account switching; test real STT/TTS in all target locales; recruit native speakers to finish translations; configure and test actual push/geolocation/Whisper/weather credentials; review accessibility and privacy with users. No browser/device or clinical validation is implied by unit tests.

Roadmap items from the plan not implemented: native background geofencing, SMS reminders, WhatsApp bot, ASHA portal, personalized music therapy, photo/face recognition, learned cognitive model and a managed-database migration.

Technical references: [Vite build/deployment](https://vite.dev/guide/static-deploy), [Firebase Web FCM setup](https://firebase.google.com/docs/cloud-messaging/web/get-started), [MDN Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), [MDN Web Speech](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

## Memory Garden — main game

Open Games → Memory Garden, also featured on the patient home screen. Play 1,000 deterministic, distinct matching boards in 20 chapters, increasing from 3 to 12 pairs. Levels unlock sequentially; replay completed levels for better stars. These are seeded boards, not 1,000 hand-authored puzzles.

Includes moves, elapsed play time, three-star move targets, preview, hints, pause, restart, optional sounds, chapter map, large responsive cards and reduced-motion support. No time limit or lives. Hints affect stars. Completed runs use the existing offline sync queue; unfinished boards save per user in IndexedDB and resume paused. English/Hindi game text is supplied; other languages fall back to English. Results are practice telemetry, not evidence of clinical improvement.

Automated checks cover all levels for uniqueness, exact pairs and completion, plus mismatch locking, pause, hints, restoration, unlocks and server result validation. Physical-device visual/accessibility testing remains necessary. Android version 1.1 needs a rebuilt APK; an installed APK does not update from web-source changes.
