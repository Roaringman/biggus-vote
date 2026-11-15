// Biggus Tabard Vote - Google Apps Script backend.
// Paste this whole file into Extensions > Apps Script of your Google Sheet.
// Each vote becomes one row: Time | Round | Name | Choices

function sheet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(["Time", "Round", "Name", "Choices"]);
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function rows_() {
  const values = sheet_().getDataRange().getValues();
  return values.slice(1).map(r => ({
    time: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
    round: Number(r[1]),
    name: String(r[2]),
    choices: String(r[3]).split(",").map(s => s.trim()).filter(Boolean),
  }));
}

// GET ?round=1  -> { votes: [...] }
function doGet(e) {
  const round = Number((e && e.parameter && e.parameter.round) || 0);
  const votes = rows_().filter(v => !round || v.round === round);
  return json_({ votes: votes });
}

// POST { round, name, choices, max } -> { ok: true } or { ok: false, error }
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents);
    const name = String(body.name || "").trim().slice(0, 40);
    const round = Number(body.round);
    const choices = (body.choices || []).map(String).slice(0, Number(body.max) || 2);
    if (!name) return json_({ ok: false, error: "Please enter your name." });
    if (!choices.length) return json_({ ok: false, error: "Please pick a design." });

    const key = name.toLowerCase().replace(/\s+/g, "");
    const already = rows_().some(v => v.round === round && v.name.toLowerCase().replace(/\s+/g, "") === key);
    if (already) return json_({ ok: false, error: `"${name}" has already voted in round ${round}. Ask an officer if this is a mistake.` });

    sheet_().appendRow([new Date(), round, name, choices.join(",")]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}
