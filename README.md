# Biggus Tabard Vote

A tiny voting site for picking the Biggus guild tabard.

- **Voting page:** `index.html`. Members type their character name and pick designs.
- **Results page:** `results.html`. Shows the tally, who voted for what, and the full vote log, and flags ties.
- **Storage:** a Google Sheet. GitHub Pages can only host static files, so votes go to a free Google Apps Script attached to the sheet. You can also read or fix votes directly in the sheet.
- **Controls:** one vote per name per round, enforced by the script. Names that look the same (different case or spacing) are shown in red on the results page. Anyone could still vote under a fake name, and the public log is how you spot that.

## One-time setup (about 10 minutes)

### 1. Google Sheet + script
1. Create a new Google Sheet (name it e.g. "Biggus Tabard Votes").
2. Open **Extensions → Apps Script**, delete what's there, and paste in all of `apps-script/Code.gs`. Save.
3. Click **Deploy → New deployment**, pick the gear icon and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy** and approve the permissions. Google will warn that the app is unverified: choose *Advanced → Go to project*. It's your own script.
5. Copy the **Web app URL** (it ends in `/exec`).

### 2. Configure the site
1. Open `config.js` and paste the URL into `scriptUrl: "..."`.
2. Put the tabard screenshots in `images/` (e.g. `images/tabard-1.png`) and list them in `designs`:
   ```js
   designs: [
     { id: "1", name: "Red Boar",     image: "images/tabard-1.png" },
     { id: "2", name: "Golden Skull", image: "images/tabard-2.png" },
   ],
   ```
   Keep each `id` short and never change it once voting starts. Votes are stored by id.
   Delete the placeholder `design-*.svg` files.

### 3. Publish on GitHub Pages
1. Create a public GitHub repo (e.g. `biggus-vote`) and upload all the files.
2. Go to **Settings → Pages → Source: Deploy from a branch → `main` / root**. Save.
3. After about a minute the site is live at `https://<your-username>.github.io/biggus-vote/`. Share that link in guild chat.

## Running the rounds

You manage everything from `config.js`. Each change goes live about a minute after you commit (GitHub's web editor is fine).

**Round 1:** `round: 1`, `votesPerPerson: 2`, `open: true`, and all designs listed.

**Close round 1:** set `open: false`. Then check `results.html`:
- One clear leader means that's the tabard. Done.
- A tie at the top shows a red "Tie at the top" banner listing the tied designs.

**Round 2 (tie-breaker):** edit `config.js` to
```js
round: 2,
votesPerPerson: 1,
open: true,
designs: [ /* only the tied designs, same ids as before */ ],
```
Round 2 starts at zero votes because every vote is tagged with its round, and everyone can vote again (one vote each). The results page has a round picker, so round 1 results stay visible.

Still tied after round 2? Repeat with `round: 3`, or let the guild master decide.

## Fixing mistakes
- **Someone voted under the wrong name or wants to redo it:** delete their row in the Google Sheet. They can then vote again.
- **Fake or duplicate voter:** delete the row in the sheet. The results page updates on refresh.

## Trying it out without the sheet
Leave `scriptUrl` empty and open `index.html` in a browser. It runs in demo mode and stores votes only in your own browser.
To clear demo votes, run `localStorage.removeItem("biggus-demo-votes")` in the browser console.

## Changing the script later
If you edit `Code.gs`, use **Deploy → Manage deployments → edit (pencil) → Version: New version**. That keeps the same URL.
