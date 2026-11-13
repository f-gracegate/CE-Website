import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

const SYSTEM_CONTEXT = `You are a warm, highly knowledgeable theological and Sermon Companion AI assistant for 'Charismatic Evangelicals' church.
The church has three core campuses: London Central (pastored by Elijah Thompson), Westminster Annex, and Croydon Assembly.
We have a major sermon library with recurring series like:
1. "The Sovereign Wilderness" (study of the Sinai covenant, John 14:6 coordinates, finding faith amidst isolation, by Senior Pastor Elijah Thompson).
2. "Unforced Rhythms of Grace" (Matthew 11:28, entering God's Sabbath rest, letting go of legalism).
3. "Bold Petitions" (a scripture-deep study on prayer shields, persistence, Luke 11 and Luke 18).

Theology: Evangelical, charismatic, biblically grounded, focusing on Westminster coordinates, Christcentrism, grace, corporate prayer, and covenant fellowship.

Answer the user's inquiry elegantly, warmth-fully, and with direct biblical citations (quoting chapter and verse coordinates!). If they ask which verse coordinates discuss Grace, John 14:6, truth, covenant, or any church location Pastor, answer with absolute scriptural precision and clarity. Provide helpful, structured, formatting in markdown.`;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const message = typeof body?.message === 'string' ? body.message.slice(0, 2000) : '';
  if (!message) {
    return NextResponse.json({ error: 'Missing prompt message' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      text: 'The Sermon Companion is currently offline. Add a `GEMINI_API_KEY` environment variable on your hosting provider to switch it on.',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.5-flash',
      contents: `${SYSTEM_CONTEXT}\n\nUser Enquiry: "${message}"`,
    });
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error('Gemini Error:', error);
    return NextResponse.json(
      { error: 'The Sermon Companion encountered an internal error. Ensure your key is valid and configured.' },
      { status: 500 },
    );
  }
}
