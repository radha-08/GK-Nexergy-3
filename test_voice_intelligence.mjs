import { askGKChatbot } from "./src/utils/aiKnowledgeEngine.js";
import { detectLanguage, getLanguageLocale } from "./src/utils/multilingualVoiceEngine.js";

async function testVoiceAI() {
  console.log("=== 1. Testing Real-time Language Recognition ===");
  const testInputs = [
    { text: "Hello, what does GK Nexergy do?", expected: "en" },
    { text: "నమస్కారం, మీ కోర్సులు ఏమున్నాయి?", expected: "te" },
    { text: "meeru em courses offer chestaru?", expected: "te" },
    { text: "नमस्ते, आपके पास क्या कोर्सेज हैं?", expected: "hi" },
    { text: "aapke software development services kya hai?", expected: "hi" },
  ];

  for (const input of testInputs) {
    const detected = detectLanguage(input.text);
    const locale = getLanguageLocale(detected);
    console.log(`Input: "${input.text}" -> Detected: ${detected} -> Locale: ${locale}`);
  }

  console.log("\n=== 2. Testing Interactive Real-Time Responses ===");
  const sampleQueries = [
    "What services do you offer?",
    "కోర్సులు ఏమున్నాయి?",
    "meeru em courses offer chestaru?",
    "How can I contact GK Nexergy?",
    "సాఫ్ట్‌వేర్ ప్రాజెక్ట్ గురించి మాట్లాడాలి",
  ];

  for (const query of sampleQueries) {
    console.log(`\n--- Query: "${query}" ---`);
    const res = await askGKChatbot(query, "", { language: "auto" });
    console.log(`Topic: ${res.topic} | Lang: ${res.lang} | Source: ${res.source}`);
    console.log(`Answer:\n${res.text.slice(0, 180)}...`);
    if (res.routes && res.routes.length) {
      console.log(`Routes: ${res.routes.map(r => r.label).join(", ")}`);
    }
  }
}

testVoiceAI().catch(console.error);
