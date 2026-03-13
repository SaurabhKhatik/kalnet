## Daily Learning Streak Tracker (Kalnet Task)

This is a full-stack **Daily Learning Streak Tracker** built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **API routes**.  
It implements all requirements from the **Kalnet Full Stack Task – Daily Learning Streak Tracker**.

### Features

- **Dashboard (Home page)**
  - Welcome message
  - Displays **current streak**, **total study days**, and **last study date**
  - Large **“I Studied Today”** button
  - Success / error messages (e.g. “You have already marked today.”)
- **Study History page**
  - Shows list of all study dates
  - Newest dates appear first
- **API routes**
  - `POST /api/study` – mark today as studied
  - `GET /api/streak` – get current streak stats
  - `GET /api/history` – get all study dates
- **Data storage**
  - Simple JSON file on the server (no external DB required)

### Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- API Routes as backend
- File-based JSON storage

---

## How the Streak Logic Works

All study dates are stored as strings in the format `YYYY-MM-DD`.

- When you click **“I Studied Today”**:
  - Today’s date is generated in local time.
  - If today is **already recorded**, the API returns:
    - `success: false`
    - Message: **"You have already marked today."**
  - If today is **not recorded**, it is appended to the list and saved.
- To compute the **current streak**:
  - Dates are **deduplicated** and **sorted ascending**.
  - Start from the most recent date and move backwards.
  - For each previous date:
    - If it is exactly **1 day earlier**, streak continues.
    - If there is any **gap bigger than 1 day**, streak stops.
  - Example:
    - 10 March – studied  
    - 11 March – studied  
    - 12 March – studied → streak = 3  
    - Skip 13 March, study on 14 March → **streak resets to 1**.
- **Total study days** = number of unique dates stored.
- **Last study date** = most recent date in the list.

The logic is implemented in `lib/streakLogic.ts` and reused by the API routes and pages.

---

## Running the Project Locally

From the `streak-tracker` folder:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Pages

- `http://localhost:3000` → Dashboard (Home)
- `http://localhost:3000/history` → Study History

---

## Data Storage

- Data is stored in `data/study-data.json` in the project root.
- The file is created automatically when you first click **“I Studied Today”**.
- Structure:

```json
{
  "dates": ["2026-03-10", "2026-03-11", "2026-03-12"]
}
```

This keeps the project simple and easy to deploy on Vercel while still behaving like a backend.

---

## Deploying to Vercel

1. **Push to GitHub**
   - Create a GitHub repository and push the `streak-tracker` project folder.
2. **Create a new Vercel project**
   - Go to `https://vercel.com`
   - Import your GitHub repository.
3. **Configure**
   - Framework preset: **Next.js**
   - Build command: `npm run build` (default)
   - Output directory: `.vercel/output` (Next default, no change usually needed)
4. **Deploy**
   - Click **Deploy** and wait for the build to finish.
5. **Share the live link**
   - The final URL will look like:
     - `https://your-project-name.vercel.app`

---

## Project Structure (Relevant Parts)

```text
app
├ page.tsx              # Dashboard (Home)
├ history
│ └ page.tsx            # Study history page
└ api
  ├ study
  │ └ route.ts          # POST /api/study
  ├ streak
  │ └ route.ts          # GET /api/streak
  └ history
    └ route.ts          # GET /api/history

components
├ StreakCard.tsx        # Dashboard stats card
├ StudyButton.tsx       # "I Studied Today" button + messages
└ HistoryList.tsx       # History list component

lib
└ streakLogic.ts        # Core streak logic + data helpers
```

This satisfies all the functional, UI, and deployment-oriented requirements defined in the Kalnet Full Stack Task.

