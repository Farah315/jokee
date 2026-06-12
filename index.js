require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/', (req, res) => {
  res.send('Farah Joke API is running ✅');
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
