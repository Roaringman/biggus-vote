// Talks to the Google Sheet (via Apps Script), or to localStorage in demo mode.
const DEMO = !CONFIG.scriptUrl;
const DEMO_KEY = "biggus-demo-votes";

function demoLoad() {
  try { return JSON.parse(localStorage.getItem(DEMO_KEY)) || []; } catch { return []; }
}

async function submitVote(name, choices) {
  if (DEMO) {
    const all = demoLoad();
    if (all.some(v => v.round === CONFIG.round && v.name.toLowerCase() === name.toLowerCase())) {
      return { ok: false, error: "already voted" };
    }
    all.push({ time: new Date().toISOString(), round: CONFIG.round, name, choices });
    localStorage.setItem(DEMO_KEY, JSON.stringify(all));
    return { ok: true };
  }
  // text/plain avoids a CORS preflight, which Apps Script can't answer.
  const res = await fetch(CONFIG.scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ round: CONFIG.round, name, choices, max: CONFIG.votesPerPerson }),
  });
  return res.json();
}

async function getVotes(round) {
  if (DEMO) return demoLoad().filter(v => v.round === round);
  const res = await fetch(`${CONFIG.scriptUrl}?round=${encodeURIComponent(round)}`);
  const data = await res.json();
  return data.votes || [];
}
