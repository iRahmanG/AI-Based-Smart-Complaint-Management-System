const express = require('express');
const router = express.Router();
const axios = require('axios');

// AI Complaint Analyzer using OpenRouter
// POST /api/ai/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ message: 'OpenRouter API Key not configured' });
    }

    const prompt = `
      Analyze the following citizen complaint and provide a JSON response with these exact keys:
      1. "priority": "High", "Medium", or "Low" based on urgency
      2. "department": The responsible government department (e.g., "Water Supply Department", "Electricity Board", "Municipal Roads Dept", "Sanitation Dept", "Public Safety Authority")
      3. "summary": A concise 1-2 sentence summary of the issue
      4. "response": A polite auto-reply to the citizen acknowledging the complaint and naming the assigned department
      5. "urgency": "Immediate", "Within 48 hours", "Within a week", or "Non-urgent"
      6. "sentiment": "Frustrated", "Concerned", "Neutral", or "Urgent"

      Complaint Title: ${title}
      Complaint Category: ${category}
      Complaint Description: ${description}

      Respond ONLY with a valid JSON object. No markdown. No extra text.
    `;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "google/gemini-2.5-flash",
      max_tokens: 400,
      messages: [
        { role: "system", content: "You are a government AI complaint routing assistant. You ONLY respond with valid JSON." },
        { role: "user", content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    let aiContent = response.data.choices[0].message.content.trim();
    
    // Strip markdown if present
    if (aiContent.startsWith('```json')) {
      aiContent = aiContent.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (aiContent.startsWith('```')) {
      aiContent = aiContent.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const aiResult = JSON.parse(aiContent);

    res.json({
      priority: aiResult.priority || 'Medium',
      department: aiResult.department || 'General Services Department',
      summary: aiResult.summary || 'Summary unavailable.',
      response: aiResult.response || 'Your complaint has been registered and will be reviewed shortly.',
      urgency: aiResult.urgency || 'Within 48 hours',
      sentiment: aiResult.sentiment || 'Neutral'
    });

  } catch (err) {
    console.error('AI Analysis Error:', err.response?.data || err.message);
    // Graceful fallback so frontend still works
    res.json({
      priority: 'Medium',
      department: 'General Services Department',
      summary: 'AI analysis temporarily unavailable. Complaint has been logged.',
      response: 'Thank you for submitting your complaint. It has been registered and will be reviewed by the appropriate department.',
      urgency: 'Within 48 hours',
      sentiment: 'Neutral'
    });
  }
});

module.exports = router;
