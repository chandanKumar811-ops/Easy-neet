<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Biological Classification — Specimen Cards</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&display=swap');
  :root{
    --parchment:#ECE4D3; --parchment-dark:#DED2B8; --ink:#242920;
    --moss:#5C6B45; --moss-dark:#3C4A2E; --amber:#B4842A;
    --card-shadow: 0 10px 30px rgba(36,41,32,0.18);
  }
  *{box-sizing:border-box;}
  body{margin:0;min-height:100vh;background:radial-gradient(circle at 20% 15%, rgba(92,107,69,0.07), transparent 40%),radial-gradient(circle at 85% 80%, rgba(180,132,42,0.08), transparent 45%),var(--parchment);font-family:'Source Serif 4', serif;color:var(--ink);display:flex;flex-direction:column;align-items:center;padding:28px 16px 60px;}
  header{text-align:center;max-width:520px;margin-bottom:22px;}
  .eyebrow{font-family:'JetBrains Mono', monospace;letter-spacing:0.18em;font-size:11px;color:var(--moss-dark);text-transform:uppercase;border:1px solid var(--moss-dark);display:inline-block;padding:3px 10px;border-radius:2px;margin-bottom:10px;}
  h1{font-family:'Playfair Display', serif;font-weight:700;font-size:26px;line-height:1.25;margin:0 0 6px;color:var(--moss-dark);}
  header p{font-size:13.5px;color:#54503f;margin:0;line-height:1.5;}
  .deck-wrap{width:100%;max-width:480px;}
  .meta-row{display:flex;justify-content:space-between;align-items:center;font-family:'JetBrains Mono', monospace;font-size:11px;color:var(--moss-dark);margin-bottom:8px;padding:0 4px;}
  .progress-track{height:3px;width:100%;background:var(--parchment-dark);border-radius:2px;margin-bottom:16px;overflow:hidden;}
  .progress-fill{height:100%;background:var(--moss);transition:width .35s ease;}
  .card-stage{perspective:1400px;height:360px;}
  .card{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.4,.2,.2,1);cursor:pointer;}
  .card.flipped{ transform:rotateY(180deg); }
  .face{position:absolute;inset:0;backface-visibility:hidden;background:#F5EFE1;border:1px solid #C9BB9A;border-radius:3px;box-shadow:var(--card-shadow);padding:22px 22px 18px;display:flex;flex-direction:column;}
  .face::before{content:'';position:absolute;top:0; left:0;width:26px; height:26px;background:linear-gradient(135deg, transparent 49%, #C9BB9A 50%, #C9BB9A 52%, transparent 53%);opacity:.6;}
  .tag{font-family:'JetBrains Mono', monospace;font-size:10.5px;letter-spacing:0.08em;color:var(--moss-dark);text-transform:uppercase;display:flex;justify-content:space-between;border-bottom:1px dashed #B7A87F;padding-bottom:10px;margin-bottom:14px;}
  .tag .catg{color:var(--amber);font-weight:600;}
  .face-back{ transform:rotateY(180deg); background:#EFE7D3; }
  .content{flex:1;overflow-y:auto;display:flex;align-items:center;}
  .q-label, .a-label{font-family:'JetBrains Mono', monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--moss);display:block;margin-bottom:8px;}
  .q-text{font-family:'Playfair Display', serif;font-weight:600;font-size:18px;line-height:1.4;color:var(--ink);}
  .a-text{font-size:14.5px;line-height:1.55;color:#2c3123;}
  .a-text b{ color:var(--moss-dark); }
  .a-text em{ color:var(--amber); font-style:italic; }
  .hint{text-align:center;font-family:'JetBrains Mono', monospace;font-size:10px;letter-spacing:0.1em;color:#8a8168;margin-top:10px;text-transform:uppercase;}
  .controls{display:flex;gap:10px;margin-top:18px;}
  button{flex:1;font-family:'JetBrains Mono', monospace;font-size:12px;letter-spacing:0.05em;text-transform:uppercase;padding:12px 10px;border-radius:3px;border:1px solid var(--moss-dark);background:transparent;color:var(--moss-dark);cursor:pointer;transition:background .2s, color .2s;}
  button:hover{ background:var(--moss-dark); color:#F5EFE1; }
  button.primary{background:var(--moss-dark);color:#F5EFE1;}
  button.primary:hover{ background:var(--moss); }
  button:active{ transform:scale(0.98); }
  .shuffle-row{display:flex;justify-content:center;margin-top:10px;}
  .shuffle-row button{flex:none;padding:8px 16px;font-size:11px;border:1px solid #B7A87F;color:#6b6446;}
  .shuffle-row button:hover{background:#B7A87F;color:#F5EFE1;}
  @media (max-width:400px){.card-stage{ height:420px; }.q-text{ font-size:16.5px; }.a-text{ font-size:13.5px; }}
</style>
</head>
<body>
<header>
  <span class="eyebrow">NCERT · Biology · Ch. 2</span>
  <h1>Biological Classification</h1>
  <p>25 specimen cards — Monera, Protista, Fungi and the acellular outliers NEET loves to test.</p>
</header>
<div class="deck-wrap">
  <div class="meta-row"><span id="counter">Specimen 01 / 25</span><span id="catg-label">MONERA</span></div>
  <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
  <div class="card-stage">
    <div class="card" id="card">
      <div class="face face-front">
        <div class="tag"><span id="tagFrontNum">No. 01</span><span class="catg" id="tagFrontCat">MONERA</span></div>
        <div class="content"><div><span class="q-label">Question</span><div class="q-text" id="qText"></div></div></div>
        <div class="hint">Tap to reveal answer</div>
      </div>
      <div class="face face-back">
        <div class="tag"><span id="tagBackNum">No. 01</span><span class="catg" id="tagBackCat">MONERA</span></div>
        <div class="content"><div><span class="a-label">Answer</span><div class="a-text" id="aText"></div></div></div>
        <div class="hint">Tap to flip back</div>
      </div>
    </div>
  </div>
  <div class="controls">
    <button id="prevBtn">&larr; Prev</button>
    <button id="flipBtn" class="primary">Flip</button>
    <button id="nextBtn">Next &rarr;</button>
  </div>
  <div class="shuffle-row"><button id="shuffleBtn">Shuffle deck</button></div>
</div>
<script>
const cards = [
  {cat:"MONERA", q:"What are the three broad groups within Kingdom Monera?", a:"<b>Archaebacteria, Eubacteria (true bacteria), and Cyanobacteria (blue-green algae)</b> — all prokaryotic, but grouped here for cell-wall/biochemical reasons, not because they're all 'the same kind' of organism."},
  {cat:"MONERA", q:"Why are Archaebacteria called 'ancient' and what makes their cell wall special?", a:"They survive in extreme habitats (salty areas — <b>halophiles</b>, hot springs — <b>thermoacidophiles</b>, marshy areas — <b>methanogens</b>) because their <b>cell wall structure</b> differs from other bacteria — this wall difference is exactly what lets them survive extremes most other life can't."},
  {cat:"MONERA", q:"Where in the human/animal body are methanogens found, and why does this matter economically?", a:"Methanogens live in the <b>gut of ruminant animals</b> (like cows and buffaloes) and produce methane from the dung — this is why <b>gobar gas (biogas)</b> is largely methane produced by these archaebacteria."},
  {cat:"MONERA", q:"What is unique about Mycoplasma compared to all other bacteria?", a:"Mycoplasma <b>completely lack a cell wall</b> — they are the smallest living cells known and can survive without oxygen. Many are pathogenic to animals and plants."},
  {cat:"MONERA", q:"What is a heterocyst, and which organisms have it?", a:"A heterocyst is a specialised <b>thick-walled cell</b> in filamentous cyanobacteria (like <em>Nostoc</em> and <em>Anabaena</em>) that is the site of <b>nitrogen fixation</b> — not every cell in the filament fixes nitrogen, only heterocysts do."},
  {cat:"MONERA", q:"List the modes of nutrition seen across Kingdom Monera.", a:"<b>Photosynthetic autotrophic, chemosynthetic autotrophic,</b> and <b>heterotrophic</b> (saprophytic or parasitic) — bacteria aren't uniformly one nutrition type, unlike what students often assume."},
  {cat:"PROTISTA", q:"Why is Protista called a 'boundary' or 'link' kingdom?", a:"Protists show characteristics that <b>connect other kingdoms</b> — some are photosynthetic like plants, some are predatory like animals, and some are decomposers like fungi — hence it bridges Monera with the more complex eukaryotic kingdoms."},
  {cat:"PROTISTA", q:"What makes diatom cell walls so indestructible, and what is this residue called?", a:"Diatom walls are embedded with <b>silica</b> and are indestructible; their accumulated 'shells' over millions of years form <b>'diatomaceous earth'</b>, used in polishing, filtration, and insulation."},
  {cat:"PROTISTA", q:"Why do dinoflagellates sometimes cause the sea to turn red, and is this dangerous?", a:"Rapid multiplication of pigmented dinoflagellates (e.g. <em>Gonyaulax</em>) causes <b>'red tides'</b>; the toxins they release can even kill marine animals through discoloured water — a fact often skipped as 'just algae.'"},
  {cat:"PROTISTA", q:"How many and what kind of flagella do dinoflagellates have?", a:"<b>Two flagella</b> — one longitudinal and one transverse, fitted into grooves between the wall plates — this specific arrangement is a frequently tested detail."},
  {cat:"PROTISTA", q:"What structure replaces the cell wall in Euglenoids, and why does this matter?", a:"A protein-rich layer called the <b>pellicle</b> replaces the cell wall, making the body <b>flexible</b> rather than rigid — this is why Euglena can change shape."},
  {cat:"PROTISTA", q:"What is unusual about Euglena's mode of nutrition?", a:"Euglena is <b>mixotrophic</b>: in sunlight it photosynthesises like a plant, but in the absence of sunlight it behaves like a heterotrophic predator — students often wrongly memorise it as purely autotrophic."},
  {cat:"PROTISTA", q:"What is a 'plasmodium' in the context of slime moulds, and is it the same as the malarial parasite?", a:"No — in slime moulds, the <b>plasmodium</b> is a network-like aggregation formed under favourable conditions that can grow to several feet, made of the mould's own body engulfing organic matter. It is NOT related to <em>Plasmodium</em>, the malaria-causing sporozoan — a classic exam trap due to the identical name."},
  {cat:"PROTISTA", q:"Name the four groups of Protozoans and one defining feature of each.", a:"<b>Amoeboid</b> (pseudopodia, e.g. <em>Amoeba</em>), <b>Flagellated</b> (whip-like flagella, free-living or parasitic, e.g. <em>Trypanosoma</em>), <b>Ciliated</b> (cilia-lined, cavity called a gullet, e.g. <em>Paramecium</em>), and <b>Sporozoans</b> (infectious spore-like stage in life cycle, e.g. <em>Plasmodium</em>)."},
  {cat:"FUNGI", q:"What is fungal cell wall made of, and how is this different from plant cell walls?", a:"Fungal cell walls are made of <b>chitin</b>, unlike plant cell walls which are made of <b>cellulose</b> — a very commonly confused pair."},
  {cat:"FUNGI", q:"What are the three modes of nutrition seen in fungi, with one example each?", a:"<b>Saprophytic</b> (on dead organic matter, e.g. bread moulds), <b>Parasitic</b> (on living plants/animals), and <b>Symbiotic</b> — with algae in <b>lichens</b>, and with roots of higher plants as <b>mycorrhiza</b>."},
  {cat:"FUNGI", q:"In fungal sexual reproduction, what is the correct sequence of the three fusion/division steps?", a:"<b>Plasmogamy</b> (fusion of protoplasms of two motile/non-motile gametes) → <b>Karyogamy</b> (fusion of the two nuclei) → <b>Meiosis</b> in the zygote, producing haploid spores. Students often skip plasmogamy as a distinct step."},
  {cat:"FUNGI", q:"Which class of fungi is 'imperfect' and why, and what happens if its sexual stage is later discovered?", a:"<b>Deuteromycetes</b> only show the asexual/vegetative phase — hence 'Fungi Imperfecti.' If a sexual stage is later found in a species, it is <b>reclassified into the appropriate class</b> (Ascomycetes or Basidiomycetes)."},
  {cat:"FUNGI", q:"How do Basidiomycetes achieve plasmogamy, given they lack distinct sex organs?", a:"Plasmogamy occurs by the <b>fusion of two vegetative/somatic cells of different strains or genotypes</b> — there are no separate male/female sex organs like in other fungal classes."},
  {cat:"FUNGI", q:"Which class of fungi is mostly aquatic with coenocytic (aseptate) mycelium, and name two genera in it.", a:"<b>Phycomycetes</b> — found in aquatic habitats and on decaying wood, mycelium is aseptate and coenocytic. Examples: <em>Mucor</em> and <em>Rhizopus</em>."},
  {cat:"ACELLULAR", q:"Why don't viruses fit anywhere in Whittaker's Five Kingdom classification?", a:"Because viruses are <b>acellular (non-cellular)</b> — they aren't made of cells at all, so a classification system built on cell structure and organisation simply cannot accommodate them."},
  {cat:"ACELLULAR", q:"A virus's genetic material is made of DNA or RNA — but can it have both?", a:"<b>No</b> — a virus has either DNA or RNA, never both together, unlike a normal cell which always has both types of nucleic acid."},
  {cat:"ACELLULAR", q:"Match the scientist to the discovery: Iwanowsky, Beijerinck, Stanley.", a:"<b>Iwanowsky (1892)</b> — first recognised infectious agent smaller than bacteria (tobacco mosaic disease). <b>Beijerinck (1898)</b> — showed the fluid was infectious, named it <em>contagium vivum fluidum</em>. <b>Stanley (1935)</b> — showed viruses could be <b>crystallised</b>, and that crystals are largely protein."},
  {cat:"ACELLULAR", q:"What is the key structural/molecular difference between a virus and a viroid?", a:"A viroid, discovered by <b>T.O. Diener (1971)</b>, consists only of <b>free RNA with no protein coat (capsid)</b>, unlike a virus which has its nucleic acid enclosed in a protein coat. Viroids also have a much <b>lower molecular weight</b> than viral RNA. They caused potato spindle tuber disease."},
  {cat:"ACELLULAR", q:"Why are lichens described as an 'association' rather than an organism, and why are they used as pollution indicators?", a:"A lichen is a <b>symbiotic partnership</b> between an alga (phycobiont — provides food via photosynthesis) and a fungus (mycobiont — provides shelter, water, minerals) — neither partner alone is 'the lichen.' They are extremely <b>sensitive to pollution</b> and don't grow in polluted areas, making them reliable bio-indicators."}
];
let order = cards.map((_,i)=>i); let idx = 0; let flipped = false;
const cardEl = document.getElementById('card');
const qText = document.getElementById('qText'); const aText = document.getElementById('aText');
const tagFrontNum = document.getElementById('tagFrontNum'); const tagFrontCat = document.getElementById('tagFrontCat');
const tagBackNum = document.getElementById('tagBackNum'); const tagBackCat = document.getElementById('tagBackCat');
const counter = document.getElementById('counter'); const catgLabel = document.getElementById('catg-label');
const progressFill = document.getElementById('progressFill');
function pad(n){ return n.toString().padStart(2,'0'); }
function render(){
  const c = cards[order[idx]];
  qText.textContent = c.q; aText.innerHTML = c.a;
  const numStr = 'No. ' + pad(idx+1);
  tagFrontNum.textContent = numStr; tagBackNum.textContent = numStr;
  tagFrontCat.textContent = c.cat; tagBackCat.textContent = c.cat;
  counter.textContent = 'Specimen ' + pad(idx+1) + ' / ' + cards.length;
  catgLabel.textContent = c.cat;
  progressFill.style.width = ((idx+1)/cards.length*100) + '%';
  cardEl.classList.remove('flipped'); flipped = false;
}
function flip(){ flipped = !flipped; cardEl.classList.toggle('flipped', flipped); }
function next(){ idx = (idx+1) % cards.length; render(); }
function prev(){ idx = (idx-1+cards.length) % cards.length; render(); }
function shuffle(){
  for(let i=order.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [order[i],order[j]]=[order[j],order[i]]; }
  idx = 0; render();
}
cardEl.addEventListener('click', flip);
document.getElementById('flipBtn').addEventListener('click', (e)=>{ e.stopPropagation(); flip(); });
document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);
document.getElementById('shuffleBtn').addEventListener('click', shuffle);
render();
</script>
</body>
</html>
