/* ── KSH Partners Chatbot ─────────────────────────────────────── */
(function () {

  const RESPONSES = [
    {
      patterns: [/^(ahoj|hej|čau|dobrý den|dobrý|zdravím|hi|hello)/i],
      answer: 'Ahoj! 👋 Jsem asistent KSH Partners. Mohu vám pomoci s dotazy o našich službách, cenách nebo kontaktu. Na co se chcete zeptat?'
    },
    {
      patterns: [/co d(ě|e)l(á|a)te|jaké (jsou )?služby|co nab(í|i)z(í|i)te|čím se zabýv(á|a)te|o co jde/i],
      answer: 'Děláme tři věci:\n\n• <b>Weby a aplikace</b> — na míru, s online editorem obsahu\n• <b>Kamenné obchody</b> — provoz a optimalizace prodejen\n• <b>Výdejní automaty</b> — sítě vendingových automatů\n\nChcete vědět více o některé oblasti?'
    },
    {
      patterns: [/kolik stoj(í|i)|cena|cen(í|i)k|kolik to vyjde|kolik to stoj|co to stoj/i],
      answer: 'Ceny jsou vždy na míru podle rozsahu projektu. Základní firemní web začíná orientačně od <b>15 000 Kč</b>, složitější aplikace se pohybují výše.\n\nNejlepší je napsat nám — do 24 hodin pošleme konkrétní nabídku. <a href="#kontakt" onclick="closeChatbot()">Kontaktovat nás →</a>'
    },
    {
      patterns: [/jak dlouho|za jak dlouho|doba|do(d|t)ání|termín|kdy bude hotov/i],
      answer: 'Standardní firemní web dodáváme <b>do 3 týdnů</b> od schválení podkladů. Složitější aplikace nebo e-shopy trvají déle — domluvíme se na termínu předem.'
    },
    {
      patterns: [/online editor|sám (si )?(upravit|m(ě|e)nit)|editovat obsah|cms|správa obsahu|edit/i],
      answer: 'Ano! Každý web stavíme tak, aby ho klient <b>mohl sám upravovat</b> — texty, obrázky, ceny — bez znalosti kódu, bez volání webmastera.\n\nFunguje to přes jednoduchý webový editor, podobný Google Docs.'
    },
    {
      patterns: [/e.?shop|eshop|online obchod|prodej online|woocommerce|shopify/i],
      answer: 'Ano, e-shopy děláme. Napojíme platební bránu (Stripe, GoPay, Comgate), správu objednávek i sklad. Mohou fungovat samostatně nebo propojené s kamennou prodejnou.'
    },
    {
      patterns: [/aplikac|software|syst(é|e)m na míru|rezerva(ční|ce)|erp|crm/i],
      answer: 'Aplikace na míru jsou naše silná stránka — rezervační systémy, pokladní systémy, interní firemní nástroje nebo zákaznické portály.\n\nVše stavíme na Pythonu (Flask) nebo moderních JS frameworcích.'
    },
    {
      patterns: [/kontakt|ozvat|napsat|zavolat|e.?mail|telefon|schůzka|konzultace/i],
      answer: 'Nejrychleji nás dostihnete na:\n\n📧 <a href="mailto:info@ksh-partners.cz">info@ksh-partners.cz</a>\n📞 <a href="tel:+420774982675">+420 774 982 675</a>\n\nNebo rovnou přes <a href="#kontakt" onclick="closeChatbot()">kontaktní formulář →</a>'
    },
    {
      patterns: [/kde síd(l|)íte|kde jste|odkud jste|kancelář|adresa|jižní čechy|tábor|české budějovice/i],
      answer: 'Sídlíme v jižních Čechách, ale pracujeme online — takže vzdálenost nehraje roli. Projekty děláme pro firmy z celé České republiky.'
    },
    {
      patterns: [/reference|ukázka|portfolio|co jste dělali|projekty/i],
      answer: 'Z referencí mohu zmínit:\n\n• <b>KraKrám</b> — dvě kamenné prodejny (Tábor + J. Hradec)\n• <b>Rezervační systém</b> pro lyžařskou školu\n• <b>Rezervační systém</b> pro autocamp\n• Webové prezentace pro specializované prodejny\n\nDetaily najdete v <a href="#reference" onclick="closeChatbot()">sekci Reference →</a>'
    },
    {
      patterns: [/technologi|programov|python|flask|react|next|wordpress|php|jak d(ě|e)l(á|a)te/i],
      answer: 'Pracujeme s moderními technologiemi:\n\n• <b>Python / Flask</b> — backend a aplikace na míru\n• <b>Next.js / React</b> — moderní weby\n• <b>Tailwind CSS</b> — rychlý a čistý design\n\nWordPress nepoužíváme — stavíme vždy na míru.'
    },
    {
      patterns: [/díky|děkuji|děkuju|super|ok|dobře|perfekt/i],
      answer: 'Rádo se stalo! Pokud budete mít další otázky, jsem tu. Nebo nás rovnou <a href="#kontakt" onclick="closeChatbot()">kontaktujte →</a> 😊'
    }
  ];

  const DEFAULT = 'Tuhle otázku nedokážu spolehlivě zodpovědět. Nejlepší bude se obrátit přímo na nás — odpovídáme do 24 hodin.\n\n📧 <a href="mailto:info@ksh-partners.cz">info@ksh-partners.cz</a>\n📞 <a href="tel:+420774982675">+420 774 982 675</a>';

  function getResponse(text) {
    const t = text.trim();
    for (const r of RESPONSES) {
      if (r.patterns.some(p => p.test(t))) return r.answer;
    }
    return DEFAULT;
  }

  /* ── DOM ─────────────────────────────────────────────────────── */
  const css = `
    #ksh-chat-btn {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 9000;
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, #c49078, #8b5a3c);
      box-shadow: 0 4px 20px rgba(0,0,0,.25);
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s;
    }
    #ksh-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(0,0,0,.32); }
    #ksh-chat-btn svg { color: #fff; }

    #ksh-chat-box {
      position: fixed; bottom: 5.5rem; right: 2rem; z-index: 9000;
      width: 340px; max-width: calc(100vw - 2rem);
      background: #fff; border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,.18);
      display: none; flex-direction: column; overflow: hidden;
      font-family: 'Inter', system-ui, sans-serif;
    }
    #ksh-chat-box.open { display: flex; animation: chatSlideIn .22s ease; }
    @keyframes chatSlideIn {
      from { opacity: 0; transform: translateY(12px) scale(.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    #ksh-chat-head {
      background: linear-gradient(135deg, #2d1a0e, #5a3020);
      padding: 1rem 1.2rem;
      display: flex; align-items: center; gap: .75rem;
    }
    #ksh-chat-head .avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,.15);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    #ksh-chat-head .info { flex: 1; }
    #ksh-chat-head .name { color: #fff; font-weight: 700; font-size: .9rem; }
    #ksh-chat-head .status { color: rgba(255,255,255,.6); font-size: .75rem; }
    #ksh-chat-close {
      background: none; border: none; cursor: pointer; color: rgba(255,255,255,.6);
      padding: .2rem; line-height: 1; font-size: 1.2rem;
      transition: color .15s;
    }
    #ksh-chat-close:hover { color: #fff; }

    #ksh-chat-msgs {
      flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column;
      gap: .75rem; max-height: 320px; scroll-behavior: smooth;
    }
    .msg { max-width: 85%; line-height: 1.55; font-size: .875rem; }
    .msg.bot {
      background: #f5ede3; color: #2d1a0e; border-radius: 4px 12px 12px 12px;
      padding: .65rem .9rem; align-self: flex-start;
    }
    .msg.bot a { color: #8b5a3c; font-weight: 600; }
    .msg.user {
      background: linear-gradient(135deg, #c49078, #8b5a3c);
      color: #fff; border-radius: 12px 4px 12px 12px;
      padding: .65rem .9rem; align-self: flex-end;
    }
    .msg.typing { opacity: .6; }
    .msg.typing span { display: inline-block; animation: blink 1s infinite; }
    .msg.typing span:nth-child(2) { animation-delay: .2s; }
    .msg.typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes blink { 0%,80%,100%{opacity:.2} 40%{opacity:1} }

    #ksh-chat-footer {
      padding: .75rem 1rem; border-top: 1px solid #f0e4d8;
      display: flex; gap: .5rem;
    }
    #ksh-chat-input {
      flex: 1; border: 1.5px solid #e0cfc2; border-radius: 8px;
      padding: .55rem .8rem; font-size: .875rem; outline: none;
      font-family: inherit; transition: border-color .15s;
    }
    #ksh-chat-input:focus { border-color: #c49078; }
    #ksh-chat-send {
      background: linear-gradient(135deg, #c49078, #8b5a3c);
      border: none; border-radius: 8px; cursor: pointer;
      width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
      transition: opacity .15s; flex-shrink: 0;
    }
    #ksh-chat-send:hover { opacity: .85; }

    .chat-suggestions {
      display: flex; flex-wrap: wrap; gap: .4rem; padding: 0 1rem .75rem;
    }
    .chat-sugg-btn {
      background: #f5ede3; border: 1px solid #e0cfc2; border-radius: 20px;
      padding: .3rem .75rem; font-size: .78rem; color: #6b4030; cursor: pointer;
      font-family: inherit; transition: background .15s;
    }
    .chat-sugg-btn:hover { background: #e8d5c2; }
  `;

  const SUGGESTIONS = ['Kolik stojí web?', 'Jak rychle dodáte?', 'Online editor?', 'Kontakt'];

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  document.body.insertAdjacentHTML('beforeend', `
    <button id="ksh-chat-btn" aria-label="Chat s KSH Partners">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    </button>
    <div id="ksh-chat-box" role="dialog" aria-label="Chat asistent KSH Partners">
      <div id="ksh-chat-head">
        <div class="avatar">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        </div>
        <div class="info">
          <div class="name">KSH Partners</div>
          <div class="status">Asistent · odpovídá ihned</div>
        </div>
        <button id="ksh-chat-close" aria-label="Zavřít chat">✕</button>
      </div>
      <div id="ksh-chat-msgs"></div>
      <div class="chat-suggestions" id="ksh-suggestions"></div>
      <div id="ksh-chat-footer">
        <input id="ksh-chat-input" type="text" placeholder="Napište dotaz…" autocomplete="off" maxlength="200">
        <button id="ksh-chat-send" aria-label="Odeslat">
          <svg width="16" height="16" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  `);

  const btn   = document.getElementById('ksh-chat-btn');
  const box   = document.getElementById('ksh-chat-box');
  const msgs  = document.getElementById('ksh-chat-msgs');
  const input = document.getElementById('ksh-chat-input');
  const send  = document.getElementById('ksh-chat-send');
  const suggs = document.getElementById('ksh-suggestions');
  let opened  = false;

  function addMsg(text, role) {
    const d = document.createElement('div');
    d.className = 'msg ' + role;
    d.innerHTML = text.replace(/\n/g, '<br>');
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  function showSuggestions() {
    suggs.innerHTML = '';
    SUGGESTIONS.forEach(s => {
      const b = document.createElement('button');
      b.className = 'chat-sugg-btn';
      b.textContent = s;
      b.onclick = () => { suggs.innerHTML = ''; sendMsg(s); };
      suggs.appendChild(b);
    });
  }

  function sendMsg(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    input.value = '';
    suggs.innerHTML = '';

    const typing = addMsg('● <span>●</span> <span>●</span>', 'bot typing');
    setTimeout(() => {
      msgs.removeChild(typing);
      addMsg(getResponse(text), 'bot');
    }, 600 + Math.random() * 400);
  }

  function openChat() {
    box.classList.add('open');
    btn.innerHTML = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    if (!opened) {
      opened = true;
      setTimeout(() => {
        addMsg('Dobrý den! Jsem asistent KSH Partners. Mohu vám pomoci s dotazy o webech, aplikacích nebo naší práci.', 'bot');
        showSuggestions();
      }, 200);
    }
    setTimeout(() => input.focus(), 300);
  }

  function closeChat() {
    box.classList.remove('open');
    btn.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`;
  }

  window.closeChatbot = closeChat;

  btn.addEventListener('click', () => box.classList.contains('open') ? closeChat() : openChat());
  document.getElementById('ksh-chat-close').addEventListener('click', closeChat);
  send.addEventListener('click', () => sendMsg(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(input.value); });

})();
