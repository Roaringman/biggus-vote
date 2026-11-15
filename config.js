// ============================================================
//  BIGGUS TABARD VOTE - the only file you edit between rounds
// ============================================================

const CONFIG = {
  // Paste your Google Apps Script web app URL here (see README.md).
  // Leave empty to run in local "demo mode" (votes saved only in your browser).
  scriptUrl: "https://script.google.com/macros/s/AKfycbwJDvqh15rlh9Aq-Nc6ajNVxzJYKRWDiPj-peFzYEFxWQ12ANiCibKbDdoivROwuftx/exec",

  // Which round is running. Votes are stored per round, so round 2
  // starts with a clean count automatically.
  round: 1,

  // How many designs each member must pick this round.
  // Round 1 = 2, tie-breaker round = 1.
  votesPerPerson: 2,

  // Set to false to close voting (the results page keeps working).
  open: true,

  // Voting unlocks at this time (shows a countdown until then).
  // +01:00 = Danish winter time, +02:00 = Danish summer time. Use "" to open immediately.
  opensAt: "2026-11-15T21:00:00+01:00",

  // Designs in this round. Put the screenshots in the images/ folder.
  // For a tie-breaker round, keep only the tied designs in this list.
  designs: [
    { id: "A", name: "Design A", image: "images/design-a.svg" },
    { id: "B", name: "Design B", image: "images/design-b.svg" },
    { id: "C", name: "Design C", image: "images/design-c.svg" },
    { id: "D", name: "Design D", image: "images/design-d.svg" },
  ],
};
