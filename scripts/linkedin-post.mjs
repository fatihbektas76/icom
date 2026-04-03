import { readFileSync } from 'fs'
import matter from 'gray-matter'
import Anthropic from '@anthropic-ai/sdk'

const {
  ANTHROPIC_API_KEY,
  LINKEDIN_ACCESS_TOKEN,
  LINKEDIN_ORGANIZATION_ID,
  ARTICLE_FILE,
  SITE_URL,
} = process.env

if (!ARTICLE_FILE) {
  console.log('No article file detected. Skipping.')
  process.exit(0)
}

// Read article
const raw = readFileSync(ARTICLE_FILE, 'utf-8')
const { data: frontmatter, content } = matter(raw)
const title = frontmatter.title || 'Neuer Artikel'
const slug = ARTICLE_FILE.replace(/^content\//, '')
  .replace(/\.(md|mdx)$/, '')
const articleUrl = `${SITE_URL}/${slug}`

// Generate LinkedIn post via Claude
const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY })

const message = await client.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 600,
  messages: [
    {
      role: 'user',
      content: `Du schreibst einen LinkedIn-Post für die Unternehmensseite der iCOM Group (Payment-Beratung).

Artikel-Titel: ${title}
Artikel-Inhalt:
${content.slice(0, 3000)}

Regeln:
- Sprache: Deutsch
- Stil: professionell, direkt, kein Marketing-Kauderwelsch
- Länge: 150–220 Wörter
- Hook am Anfang: provokante Frage ODER überraschende Zahl ODER kühne These – KEIN "Ich" oder "Wir" am Anfang
- 3–5 Hashtags am Ende (Deutsch + Englisch gemischt)
- Kein Fließtext-Aufzählungszeichen, keine Emojis
- Am Ende: Artikel-URL als eigene Zeile: ${articleUrl}

Schreibe NUR den Post-Text, keine Erklärungen.`,
    },
  ],
})

const postText = message.content[0].text

console.log('Generated LinkedIn post:')
console.log('---')
console.log(postText)
console.log('---')

// Publish to LinkedIn
const linkedinResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'X-Restli-Protocol-Version': '2.0.0',
  },
  body: JSON.stringify({
    author: `urn:li:organization:${LINKEDIN_ORGANIZATION_ID}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: postText },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            originalUrl: articleUrl,
            title: { text: title },
          },
        ],
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  }),
})

if (!linkedinResponse.ok) {
  const err = await linkedinResponse.text()
  console.error('LinkedIn API error:', linkedinResponse.status, err)
  process.exit(1)
}

console.log('LinkedIn post published successfully!')
