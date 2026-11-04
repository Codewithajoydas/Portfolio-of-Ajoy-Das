import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: "AQ.Ab8RN6JftvpHxxd-CMNugEhr_zRATWRSpq9cLA6IoyMMwimPbw",
});
/**
 * I have attched a js object fill the object with my actual data from my Github Repo example.com and give me the response only with filled ojbject nothing else 
 * {
  "name": "",
  "slug": "",
  "type": "",
  "role": "",
  "shortDescription": "",
  "description": "",
  "githubUrl": "",
  "liveUrl": "",
  "documentationUrl": "",
  "thumbnail": "",
  "banner": "",
  "screenshots": [],
  "techStack": [],
  "category": "",
  "status": "",
  "year": 0,
  "featured": false,
  "published": false,
  "features": [],
  "challenges": "",
  "learnings": "",
  "seoTitle": "",
  "seoDescription": ""
}
 */
export async function getResponse(repo_url: string) {
  try {
    console.log("PROMPT:", prompt);
    const response = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: `You are an expert software engineer, GitHub repository analyst, and technical documentation specialist.
I will provide you with a GitHub repository URL. Your task is to thoroughly analyze the actual repository and generate a complete, accurate project metadata object using the JavaScript schema provided below.
Repository URL: ${repo_url}
INSTRUCTIONS
1. Analyze the repository thoroughly before generating the object. Inspect the README, source code, package.json, dependencies, configuration files, project structure, GitHub metadata, releases, and other relevant files.
2. Extract information exclusively from the actual repository and its publicly available resources.
3. Do not invent, assume, or fabricate project details, features, technologies, URLs, or implementation capabilities.
4. Use the actual implementation rather than relying exclusively on the README.
5. Generate professional, engaging, technically accurate descriptions suitable for a developer portfolio.
6. Keep the descriptions concise but informative, highlighting the project's purpose, functionality, and value.
7. Use the actual technologies and libraries found in the repository for techStack.
8. Identify the appropriate project category, type, role, development status, and year based on available evidence.
9. Include only features that are actually implemented. Distinguish completed features from planned or partially implemented features.
10. For thumbnail, banner, and screenshots, use actual publicly accessible image URLs from the repository or its associated project resources. Never generate or fabricate image URLs. Use empty strings or empty arrays when unavailable.
11. Use the actual live deployment URL and documentation URL when available. Otherwise, use empty strings.
12. Write challenges and learnings based on the actual architecture, implementation, and technical decisions. If insufficient evidence exists, use an empty string.
13. Make slug URL-friendly, lowercase, and hyphen-separated.
14. Write SEO metadata naturally, incorporating relevant project keywords without keyword stuffing.
15. Use the repository's actual creation or release year when verifiable. Otherwise, use 0.
16. Set featured and published to false unless the repository provides explicit evidence for these portfolio-specific decisions. Do not assume these values.
OUTPUT REQUIREMENTS
- Return ONLY one valid JSON object.
- Do not include Markdown code fences.
- Do not include explanations, introductions, conclusions, or additional text.
- Preserve every property and its original data type.
- Use double quotes for all JSON keys and string values.
- Use valid JSON syntax without trailing commas.
- Use empty strings, empty arrays, or 0 for unavailable information, as appropriate.
- Never return placeholders such as "N/A", "Unknown", or "Not available".
- Ensure the final JSON can be directly parsed using JSON.parse().
REQUIRED JSON SCHEMA
{
  "name": "",
  "slug": "",
  "type": "",
  "role": "",
  "shortDescription": "",
  "description": "",
  "githubUrl": "",
  "liveUrl": "",
  "documentationUrl": "",
  "thumbnail": "",
  "banner": "",
  "screenshots": [],
  "techStack": [],
  "category": "",
  "status": "",
  "year": 0,
  "featured": false,
  "published": false,
  "features": [],
  "challenges": "",
  "learnings": "",
  "seoTitle": "",
  "seoDescription": ""
}
      ACCURACY IS MORE IMPORTANT THAN COMPLETENESS. NEVER FABRICATE INFORMATION TO FILL AN EMPTY FIELD.`,
    });
    return response.output_text;
  } catch (error: any) {
    console.error("FAILED:", error.message);
    console.error("STATUS:", error.status);
    console.error("CAUSE:", error.cause);
  }
}

getResponse("https://github.com/Codewithajoydas/Photomart");
