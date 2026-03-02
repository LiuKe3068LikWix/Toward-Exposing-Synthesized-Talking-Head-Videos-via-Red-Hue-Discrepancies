// ====== Optional links (set to "" to hide buttons) ======
const LINKS = {
  paper: "",   // e.g., "https://arxiv.org/abs/xxxx.xxxxx" or "assets/paper.pdf"
  code:  "",   // e.g., "https://github.com/yourname/yourrepo"
  dataset: "", // e.g., dataset landing page
};

// ====== Video configuration ======
const DEMOS = {
  ids: ["ID1", "ID2", "ID3", "ID4", "ID5"],
  files: ["1.mp4", "2.mp4", "3.mp4", "4.mp4", "5.mp4", "6.mp4"],
  root: "assets/videos",
  mutedByDefault: true,
};

function $(id){ return document.getElementById(id); }

// Mobile nav toggle
(function(){
  const btn = $("navToggle");
  const nav = $("mobileNav");
  if(!btn || !nav) return;
  btn.addEventListener("click", ()=>{
    nav.style.display = (nav.style.display === "block") ? "none" : "block";
  });
})();

// Buttons visibility
(function(){
  const row = $("btnRow");
  const bPaper = $("btnPaper");
  const bCode = $("btnCode");
  const bDataset = $("btnDataset");

  const setBtn = (btn, url) => {
    if(!url){
      btn.style.display = "none";
      return;
    }
    btn.href = url;
  };

  setBtn(bPaper, LINKS.paper);
  setBtn(bCode, LINKS.code);
  setBtn(bDataset, LINKS.dataset);

  // If all hidden, hide row container
  const allHidden = [bPaper, bCode, bDataset].every(b => b.style.display === "none");
  if(allHidden) row.style.display = "none";
})();

// Year
$("year").textContent = new Date().getFullYear();

// Demo tabs + grid
(function(){
  const tabsEl = $("tabs");
  const gridEl = $("videoGrid");
  let active = DEMOS.ids[0];

  function videoPath(id, fn){
    return `${DEMOS.root}/${id}/${fn}`;
  }

  function renderTabs(){
    tabsEl.innerHTML = "";
    DEMOS.ids.forEach(id=>{
      const btn = document.createElement("button");
      btn.className = "tab" + (id === active ? " active" : "");
      btn.textContent = id;
      btn.onclick = ()=>{ active = id; renderTabs(); renderGrid(); };
      tabsEl.appendChild(btn);
    });
  }

  function renderGrid(){
    gridEl.innerHTML = "";
    DEMOS.files.forEach((fn, idx)=>{
      const card = document.createElement("div");
      card.className = "vcard";

      const meta = document.createElement("div");
      meta.className = "vmeta";
      meta.innerHTML = `<b>${active}</b><span>Video ${idx + 1}</span>`;

      const v = document.createElement("video");
      v.controls = true;
      v.playsInline = true;
      v.preload = "metadata";
      v.muted = DEMOS.mutedByDefault;
      v.src = videoPath(active, fn);

      card.appendChild(meta);
      card.appendChild(v);
      gridEl.appendChild(card);
    });
  }

  renderTabs();
  renderGrid();
})();

// BibTeX modal (optional)
(function(){
  const modal = $("bibtexModal");
  const openBtn = $("btnBibtex");
  const closeBtn = $("bibtexClose");
  const closeBtn2 = $("closeBibtex2");
  const copyBtn = $("copyBibtex");
  const textEl = $("bibtexText");

  // If you don't want BibTeX, hide button
  // openBtn.style.display = "none"; return;

  openBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    modal.showModal();
  });
  closeBtn.addEventListener("click", ()=>modal.close());
  closeBtn2.addEventListener("click", ()=>modal.close());
  copyBtn.addEventListener("click", async ()=>{
    try{
      await navigator.clipboard.writeText(textEl.textContent);
      alert("Copied.");
    }catch{
      alert("Copy failed. Please copy manually.");
    }
  });

  // click outside to close
  modal.addEventListener("click", (e)=>{
    const rect = modal.getBoundingClientRect();
    const inside = rect.top<=e.clientY && e.clientY<=rect.bottom && rect.left<=e.clientX && e.clientX<=rect.right;
    if(!inside) modal.close();
  });
})();
