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
    const jokeStyles = [
      'why joke',
      'one person joke',
      'two friends joke',
      'misunderstanding',
      'wordplay',
      'school joke',
      'technology joke',
      'family joke',
      'daily life joke',
    ];

    const randomStyle = jokeStyles[Math.floor(Math.random() * jokeStyles.length)];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 1.5,
      top_p: 0.95,
      messages: [
        {
          role: 'system',
          content: `
You are a Palestinian stand-up comedian.

Your task is to create ONE funny joke.

VERY IMPORTANT:

A joke must have:

1. Setup
2. Punchline
3. Surprise

BAD EXAMPLE:
"القهوة زعلت من السكر."
This is not funny.

GOOD EXAMPLES:

ليش الكمبيوتر ما بروح عالجامعة؟
لأنه عنده ويندوز ومش محتاج شهادة.

واحد اشترى ساعة ذكية،
بعد يومين رجعها،
قال: كثير ذكية... صارت تذكرني بالشغل.

ليش الطالب بحب الواي فاي؟
لأنه الوحيد اللي بوصل بدون واسطة.

Rules:

* Palestinian Arabic only.
* No English.
* No Russian.
* No mixed languages.
* Maximum 2 sentences.
* Sound like a joke people share on WhatsApp.
* Use simple words.
* Make the ending unexpected.
* Return ONLY the joke.
* The user word is only a topic.
* Never explain the joke.

If the joke is not funny, generate another one until it is.
`,
        },
        {
          role: 'user',
          content: `
Topic: ${safeWord}

Write one WhatsApp-style Palestinian joke.

Make people laugh.

Return only the joke.
`,
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
