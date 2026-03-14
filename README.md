# ♻️ RecycleRight

> **Recycle Smarter, Live Greener** — a single-page web app that helps people learn what to recycle, how to sort it, and track their positive impact on the planet.

---

## 🚀 How to View the Website

### Option 1 — Open directly in your browser (quickest)

No server or installation needed:

1. [Download or clone this repository](https://github.com/Dhineshsaff/recycle/archive/refs/heads/main.zip)
2. Unzip the folder (if downloaded as a ZIP)
3. Double-click **`index.html`** — it opens straight in Chrome, Firefox, Edge, or Safari

> ℹ️ Some browser security policies block local fonts when opening files directly.  
> Use **Option 2** below if you notice any styling issues.

---

### Option 2 — Run a local development server (recommended)

A local server avoids browser cross-origin restrictions and gives you live-reload benefits.

**With Python (built into macOS / Linux / Windows 10+)**

```bash
# Clone the repo
git clone https://github.com/Dhineshsaff/recycle.git
cd recycle

# Start a server on port 8080
python3 -m http.server 8080
```

Then open **<http://localhost:8080>** in your browser.

---

**With Node.js / npx**

```bash
# Clone the repo
git clone https://github.com/Dhineshsaff/recycle.git
cd recycle

# Serve with npx (no global install needed)
npx serve .
```

Then follow the URL printed in the terminal (usually **<http://localhost:3000>**).

---

**With VS Code Live Server extension**

1. Open the project folder in [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **"Open with Live Server"**

Your browser will open automatically and hot-reload whenever you save a file.

---

### Option 3 — GitHub Pages (online, no setup)

This repository is configured for **GitHub Pages**. Once the `main` branch is enabled in the repository settings, the site is live at:

> **<https://dhineshsaff.github.io/recycle>**

To enable it (repository owner only):

1. Go to **Settings → Pages** in this repository
2. Under **"Source"**, select **Branch: `main`** and folder **`/ (root)`**
3. Click **Save** — GitHub will publish the site within a minute

---

## 🗂 Project Structure

```
recycle/
├── index.html   # Full single-page layout
├── styles.css   # Design system (green/teal palette, responsive)
├── script.js    # Interactivity (counters, modal, form validation)
└── README.md    # This file
```

---

## ✨ Features

| Section | Description |
|---------|-------------|
| **Hero** | Animated stat counters, floating info cards, rotating globe |
| **Categories** | 6 material cards (Plastic, Paper, Glass, Metal, Electronics, Organic) with detail modals |
| **How It Works** | 3-step Identify → Sort → Impact guide |
| **Impact** | Dark-green section with scroll-triggered animated counters |
| **Tips** | 6 recycling best-practice cards |
| **CTA** | Email sign-up with inline validation |
| **Footer** | Site links and social icons |

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

---

*Made with 💚 for the planet.*
