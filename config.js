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
  // "desc" is optional flavor text shown under the name.
  designs: [
    { id: "darklord", name: "Darklord", image: "images/darklord.jpg",
      desc: "Et grinende dæmonkranie på sort baggrund. Fjenden skal ryste, før kampen overhovedet er begyndt." },
    { id: "dinho",    name: "Dinho",    image: "images/dinho.jpg",
      desc: "To ølkrus, der skåler, på kongeblåt. Ingen tvivl om, hvordan raidet bliver fejret bagefter." },
    { id: "glade",    name: "Glade",    image: "images/glade.png",
      desc: "Dybe kløemærker på hvidt, som om noget meget stort lige har været forbi. Enkelt, råt og lidt uhyggeligt." },
    { id: "kleist",   name: "Kleist",   image: "images/kleist.webp",
      desc: "En hummer med kløerne klar. Langsom? Måske. Men når den først har fat, giver den aldrig slip." },
    { id: "mowgli",   name: "Mowgli",   image: "images/mowgli.jpg",
      desc: "Lyn og ild i mørket. For dem, der hellere vil være stormen end vente på den." },
    { id: "muliens",  name: "Muliens",  image: "images/muliens.png",
      desc: "Et uendelighedstegn på rent hvidt. Biggus, for evigt." },
    { id: "pelle",    name: "Pelle",    image: "images/pelle.jpg",
      desc: "En knoglet brystkasse på sort. Det eneste, der er tilbage af dem, der udfordrede Biggus." },
    { id: "thaco",    name: "Thaco",    image: "images/thaco.png",
      desc: "Knaldpink og helt uden skam. De ser dig komme på lang afstand, og de glemmer det aldrig." },
  ],
};
