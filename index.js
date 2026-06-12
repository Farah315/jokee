require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');
const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/', (req, res) => {
  res.send('Farah Joke API is running ✅');
});

app.get('/farah', (req, res) => {
  res.send(`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>نكت فراح</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Tajawal',sans-serif;background:#111;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.wrap{width:100%;max-width:520px}
.hero{background:#1a1a1a;border-radius:16px;overflow:hidden;position:relative;padding:32px 24px 24px;margin-bottom:16px}
.kufiya-bg{position:absolute;inset:0;opacity:.07;background-image:repeating-linear-gradient(45deg,#c8102e 0,#c8102e 2px,transparent 0,transparent 50%),repeating-linear-gradient(-45deg,#c8102e 0,#c8102e 2px,transparent 0,transparent 50%);background-size:20px 20px}
.flag{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,#000 25%,#fff 25% 50%,#009736 50% 75%,#c8102e 75%)}
.title{color:#fff;font-size:26px;font-weight:900;margin:0 0 4px;position:relative}
.sub{color:#aaa;font-size:14px;position:relative;margin:0}
.input-row{display:flex;gap:10px;margin-top:20px;position:relative}
input{flex:1;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:12px 16px;color:#fff;font-family:'Tajawal',sans-serif;font-size:16px;outline:none}
input:focus{border-color:#c8102e}
input::placeholder{color:rgba(255,255,255,.4)}
.btn{background:#c8102e;border:none;border-radius:10px;padding:12px 20px;color:#fff;font-family:'Tajawal',sans-serif;font-size:16px;font-weight:700;cursor:pointer;transition:background .2s}
.btn:hover{background:#a50d25}
.btn:disabled{background:#555;cursor:not-allowed}
.joke-card{background:#1e1e1e;border-radius:16px;padding:28px;display:none;margin-top:0;animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.city{font-size:12px;color:#c8102e;font-weight:700;margin:0 0 14px;letter-spacing:.5px}
.joke{font-size:22px;line-height:1.9;color:#fff;margin:0}
.footer{margin-top:20px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #2a2a2a;padding-top:16px}
.hashtag{font-size:13px;color:#555}
.again{background:transparent;border:1px solid #333;border-radius:8px;padding:7px 16px;font-family:'Tajawal',sans-serif;font-size:13px;color:#aaa;cursor:pointer;transition:all .2s}
.again:hover{background:#2a2a2a;color:#fff}
.loading{background:#1e1e1e;border-radius:16px;padding:32px;text-align:center;display:none}
.dots{display:flex;gap:8px;justify-content:center;margin-bottom:12px}
.dot{width:9px;height:9px;border-radius:50%;animation:bounce .9s infinite}
.dot:nth-child(1){background:#c8102e}
.dot:nth-child(2){background:#009736;animation-delay:.2s}
.dot:nth-child(3){background:#fff;animation-delay:.4s}
@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-10px)}}
.load-text{color:#666;font-size:14px}
</style>
</head>
<body>
<div class="wrap">
  <div class="hero">
    <div class="kufiya-bg"></div>
    <div class="flag"></div>
<p class="title">المفترض تضحك</p>
<p class="sub">من القدس لغزة — على كيف كيفك النكتة</p>
    <div class="input-row">
      <input id="wi" placeholder="اكتب كلمة... قهوة، امتحان، كهربا" />
<button class="btn" id="gb" onclick="go()">يلا بينا</button>
</div>
  </div>
  <div class="loading" id="lc">
    <div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
    <p class="load-text">عم نفكر بنكتة تضحككم...</p>
  </div>
  <div class="joke-card" id="jc">
    <p class="city" id="jcity">🇵🇸 نابلس</p>
    <p class="joke" id="jt"></p>
    <div class="footer">
      <span class="hashtag">#بنت_تضحك_يخال</span>
      <button class="again" onclick="go()">نكتة ثانية ↻</button>
    </div>
  </div>
</div>
<script>
const cities=['🇵🇸 نابلس','🇵🇸 الخليل','🇵🇸 غزة','🇵🇸 القدس','🇵🇸 جنين','🇵🇸 رام الله','🇵🇸 يافا','🇵🇸 الناصرة','🇵🇸 طولكرم','🇵🇸 بيت لحم'];
async function go(){
  const w=document.getElementById('wi').value.trim();
  if(!w)return;
  const gb=document.getElementById('gb'),lc=document.getElementById('lc'),jc=document.getElementById('jc');
  gb.disabled=true;jc.style.display='none';lc.style.display='block';
  try{
    const r=await fetch('/farah/joke?word='+encodeURIComponent(w));
    const d=await r.json();
    document.getElementById('jt').textContent=d.joke||d.error;
    document.getElementById('jcity').textContent=cities[Math.floor(Math.random()*cities.length)];
    lc.style.display='none';jc.style.display='block';
  }catch(e){
    document.getElementById('jt').textContent='صار في خطأ، حاول مرة ثانية 😅';
    lc.style.display='none';jc.style.display='block';
  }
  gb.disabled=false;
}
document.getElementById('wi').addEventListener('keypress',e=>{if(e.key==='Enter')go()});
<\/script>
</body>
</html>`);
});

app.get('/farah/joke', async (req, res) => {
  const word = req.query.word;
  if (!word) {
    return res.status(400).json({ error: 'You must send a word via query parameter: word' });
  }
  const safeWord = String(word).slice(0, 50).replace(/[\n\r"`{}<>]/g, '');
  if (!safeWord) {
    return res.status(400).json({ error: 'Invalid word' });
  }
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 1.4,
      top_p: 0.95,
      messages: [
        {
          role: 'system',
          content: `
You are an old-school Palestinian joke writer, the type of jokes shared on Facebook pages and family WhatsApp groups for years.
These jokes follow a very specific style. Study these examples carefully:
EXAMPLE 1:
شو اسرع شي بالدنيا؟ بخيل مدعو على الغدا.
EXAMPLE 2:
واحد قصير كتير اتجوز وحدة قصيرة كتير، جابوا ولد طوله متر وعشرين، الجيران قالوا: هاد طلع لأهل الحارة الثانية!
EXAMPLE 3:
محشش راح للدكتور قاله: دكتور صار لي شهر ما بنام. الدكتور قاله: ليش؟ قاله: لأني صاحي.
EXAMPLE 4:
وحدة سألت جارتها: ليش زوجك دايم زعلان؟ قالتلها: من يوم ما عرف إنه أنا اخترته بنفسي.
EXAMPLE 5:
واحد فات على محل ساعات قال للبياع: بدي ساعة توقف الزمن. البياع قاله: خذ هاي، بطاريتها خلصت من سنة.
What makes these funny:
- Setup feels normal, then the last word/phrase flips the meaning completely.
- Often uses a "logical but absurd" twist (like the joke being on the person who thought they were clever).
- Self-deprecating Palestinian humor about daily life, marriage, work, money, smoking, neighbors.
- Very short — usually 1-2 sentences.
- Dialect is casual Levantine/Palestinian, not formal Arabic.
Your task:
- Write ONE original joke in this exact style, about the given topic.
- The topic is just inspiration — connect it cleverly to the punchline, don't force it awkwardly.
- No racism, no offensive content, no religious mockery.
- Arabic Palestinian dialect only. No English.
- Return ONLY the joke, nothing else (no intro, no quotes, no explanation).
- Make sure there's a real twist at the end — if your first idea isn't surprising, think of a better one.
`,
        },
        {
          role: 'user',
          content: `الموضوع: "${safeWord}"\n\nاكتب نكتة واحدة أصلية بهذا الستايل عن هذا الموضوع.`,
        },
      ],
    });
    const joke = completion.choices[0].message.content.trim();
    return res.json({ name: 'Farah', word: safeWord, joke });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while generating the joke, please try again' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
