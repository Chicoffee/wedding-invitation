# 💍 Wedding Invitation Website

A digital wedding invitation website for couples to share their special day with family and friends — featuring their love story, event details, entourage, and an RSVP system.

🌐 **Live Site:** [arwinandjen-wedding.vercel.app](https://arwinandjen-wedding.vercel.app)

---

## Features

- **Hero Section** — Animated opening with couple's names, wedding date, and background music
- **Save the Date Calendar** — Interactive calendar
- **Countdown Timer** — Live countdown to the ceremony
- **Venue & Location** — Embedded Google Maps for Villa Leonora Resort and Venue
- **Our Story** — A photo slider and timeline of the couple's journey
- **Entourage** — Full listing of the wedding party including principal sponsors, godparents, and bearers
- **Reminders** — Dress code, gift guide, and program reminders
- **RSVP Form** — Guest confirmation form with attendance status, party size, and guest names; supports re-submission to update responses
- **Admin Panel** — Password-protected admin page for managing RSVPs

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **RSVP Database:** Firebase
- **Hosting:** [Vercel](https://vercel.com)
- **Maps:** Google Maps Embed API
- **Media:** WebP images, MP3 background audio

---

## Project Structure

```
/
├── index.html              # Main invitation page
├── admin.html              # Admin RSVP management page
└── assets/
    ├── audio/
    │   └── bg-music.mp3    # Background music
    ├── slider-img/         # Our Story photo slider images
    │   └── slide1–6.webp
    ├── timeline/           # Timeline section images
    │   └── timeline1–3.webp
    ├── graphics/           # Attire guide illustrations
    └── icons/              # UI icons (rings, attire, etc.)
```

---

## Sections

| Section | Description |
|---|---|
| Hero | Opening animation with couple names and date |
| Save the Date | Calendar|
| Location | Venue address and embedded map |
| Countdown | Live timer to the ceremony |
| Our Story | Photo slider + milestone timeline |
| Entourage | Full wedding party listing |
| Reminders | Dress code, gift guide, and event reminders |
| RSVP | Guest attendance confirmation form |

---

## Deployment

The site is deployed on **Vercel**. To run locally, simply open `index.html` in a browser — no build step required.

```bash
# Clone the repository
git clone https://github.com/your-username/arwinandjen-wedding.git

# Open in browser
open index.html
```

---
