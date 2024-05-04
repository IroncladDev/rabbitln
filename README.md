# RabbitLN

This will be an SPA

## Primary Features

- Speech/image with GPT-4 vision. One just speech, one multimodal
- Pay for usage with sats (fedimint clientd)

## Secondary Features

- AI Modes
- QR Code recognition and lookup
- Image quality mode (single/burst) & quality settings
- Fund withdrawal

## Screens

- Loading screen (done)
- Home screen (with time, speech button on left, eye button on right) (45mins). Hold button to speak or multimodal (timer/ring indication). Blur out buttons if user has no balance, show topup button in the bottom.
- Settings screen. Icon in upper-right corner of home screen. For modes / balance settings. (1.5h)
- Speech Listening screen. Audio visualizer (maybe). Once you release, switch to result screen with loading indicator (1.5h)
- Multimodal screen. Audio visualizer and camera. Once you release, switch to result screen with loading indicator (1h)
- Result screen. Takes a query param maybe, then uses a server component to fetch the result or uses an API route to stream with the vercel api sdk (3h). Shows one sentence at a time or follows along like closed captions.
- QR scanner integration. Recognizes bolt11 invoices and bitcoin addresses synchronously, can look them up on mempool or decode them. Sends them as a query param to the result screen. Result screen can call webln/ecash from Fedi to pay it. If not, can take a qr value and decode/inspect it. (4h)
- Conversations carry on as long as you're on the result screen for both multimodal **and** normal chat. Moving back clears the state.

## Polish Items

- Select time (military/normal)
