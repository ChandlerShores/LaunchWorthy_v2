/**
 * Client-side Job Description parser
 * Extracts structured data from job postings using pattern matching
 */

export interface ParsedJD {
  jobTitle: string;
  seniority: 'entry' | 'mid' | 'senior' | 'lead' | 'unknown';
  hardSkills: string[];
  tools: string[];
  softSkills: string[];
  mustHaves: string[];
  niceToHaves: string[];
}

/**
 * Parse job description text
 */
export function parseJobDescription(jdText: string): ParsedJD {
  const lines = jdText.split('\n').map(line => line.trim());
  const fullText = jdText.toLowerCase();

  return {
    jobTitle: extractJobTitle(jdText, lines),
    seniority: extractSeniority(fullText),
    hardSkills: extractHardSkills(fullText),
    tools: extractTools(fullText),
    softSkills: extractSoftSkills(fullText),
    mustHaves: extractRequirements(jdText, 'required'),
    niceToHaves: extractRequirements(jdText, 'nice'),
  };
}

/**
 * Extract job title from JD
 */
function extractJobTitle(jdText: string, lines: string[]): string {
  // Try first non-empty line
  for (const line of lines) {
    if (line.length > 0 && line.length < 100) {
      // Common patterns: "Senior Software Engineer", "Product Manager - Remote"
      const cleaned = line
        .replace(/\s*-\s*(remote|hybrid|onsite).*/i, '')
        .replace(/\s*\(.*?\)/g, '')
        .trim();
      
      if (cleaned.length > 5 && cleaned.length < 80) {
        return cleaned;
      }
    }
  }

  // Fallback: look for "position:", "role:", "title:"
  const titleMatch = jdText.match(/(?:position|role|title|job)\s*:?\s*([^\n]{10,80})/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  return 'Position';
}

/**
 * Extract seniority level
 */
function extractSeniority(text: string): 'entry' | 'mid' | 'senior' | 'lead' | 'unknown' {
  if (/\b(senior|sr\.?|staff|principal|architect)\b/i.test(text)) {
    return 'senior';
  }
  if (/\b(lead|director|head of|chief|vp|vice president)\b/i.test(text)) {
    return 'lead';
  }
  if (/\b(junior|jr\.?|entry|associate|intern)\b/i.test(text)) {
    return 'entry';
  }
  if (/\b(mid|intermediate|level ii|ii)\b/i.test(text)) {
    return 'mid';
  }
  
  // Default to mid if we find years of experience mentioned
  const yearsMatch = text.match(/(\d+)[\+\s]*years?/i);
  if (yearsMatch) {
    const years = parseInt(yearsMatch[1]);
    if (years <= 2) return 'entry';
    if (years <= 5) return 'mid';
    return 'senior';
  }

  return 'unknown';
}

/**
 * Extract hard/technical skills
 */
function extractHardSkills(text: string): string[] {
  const hardSkills = new Set<string>();

  // Programming languages
  const languages = [
    'python', 'javascript', 'typescript', 'java', 'c\\+\\+', 'c#', 'ruby', 'php',
    'swift', 'kotlin', 'go', 'golang', 'rust', 'scala', 'r\\b', 'matlab', 'sql'
  ];

  // Frameworks & libraries
  const frameworks = [
    'react', 'angular', 'vue', 'node\\.?js', 'express', 'django', 'flask', 'spring',
    'rails', '\\.net', 'laravel', 'next\\.?js', 'svelte', 'ember'
  ];

  // Technical concepts
  const concepts = [
    'machine learning', 'deep learning', 'ai', 'artificial intelligence', 'data science',
    'backend', 'frontend', 'full[\\s-]?stack', 'devops', 'cloud', 'microservices',
    'rest\\s?api', 'graphql', 'ci/cd', 'agile', 'scrum', 'tdd', 'api design',
    'database design', 'system design', 'distributed systems', 'scalability'
  ];

  // Combine all skill patterns
  const allPatterns = [...languages, ...frameworks, ...concepts];

  allPatterns.forEach(pattern => {
    const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      // Normalize the skill name
      const skillName = normalizeSkillName(matches[0]);
      hardSkills.add(skillName);
    }
  });

  return Array.from(hardSkills);
}

/**
 * Extract tools and technologies
 */
function extractTools(text: string): string[] {
  const tools = new Set<string>();

  const toolList = [
    // Cloud platforms
    'aws', 'azure', 'gcp', 'google cloud', 'heroku', 'vercel', 'netlify',
    
    // Databases
    'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'dynamodb', 'cassandra', 'oracle', 'sql server',
    
    // DevOps & Tools
    'docker', 'kubernetes', 'jenkins', 'gitlab', 'github', 'bitbucket', 'jira',
    'terraform', 'ansible', 'circleci', 'travis ci',
    
    // Data tools
    'tableau', 'power bi', 'looker', 'spark', 'hadoop', 'airflow', 'kafka',
    
    // Design tools
    'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator',
    
    // Other
    'git', 'linux', 'unix', 'bash', 'powershell', 'postman', 'swagger',
  ];

  toolList.forEach(tool => {
    const regex = new RegExp(`\\b${tool.replace(/\s/g, '\\s')}\\b`, 'gi');
    if (regex.test(text)) {
      tools.add(capitalizeFirst(tool));
    }
  });

  return Array.from(tools);
}

/**
 * Extract soft skills
 */
function extractSoftSkills(text: string): string[] {
  const softSkills = new Set<string>();

  const softSkillPatterns = [
    { pattern: '\\b(leadership|leading teams?)\\b', skill: 'Leadership' },
    { pattern: '\\b(communication|communicat(e|ing))\\b', skill: 'Communication' },
    { pattern: '\\b(collaboration|collaborative|team\\s?work)\\b', skill: 'Collaboration' },
    { pattern: '\\b(problem[\\s-]?solving)\\b', skill: 'Problem Solving' },
    { pattern: '\\b(critical thinking|analytical)\\b', skill: 'Critical Thinking' },
    { pattern: '\\b(adaptab(le|ility))\\b', skill: 'Adaptability' },
    { pattern: '\\b(time management|priorit(y|ization))\\b', skill: 'Time Management' },
    { pattern: '\\b(mentor(ing|ship))\\b', skill: 'Mentorship' },
    { pattern: '\\b(presentation|presenting)\\b', skill: 'Presentation Skills' },
    { pattern: '\\b(negotiation)\\b', skill: 'Negotiation' },
    { pattern: '\\b(creativity|creative thinking)\\b', skill: 'Creativity' },
    { pattern: '\\b(attention to detail|detail[\\s-]?oriented)\\b', skill: 'Attention to Detail' },
  ];

  softSkillPatterns.forEach(({ pattern, skill }) => {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(text)) {
      softSkills.add(skill);
    }
  });

  return Array.from(softSkills);
}

/**
 * Extract requirements (must-haves vs nice-to-haves)
 */
function extractRequirements(jdText: string, type: 'required' | 'nice'): string[] {
  const requirements = new Set<string>();
  const lines = jdText.split('\n');

  let inRequiredSection = false;
  let inNiceSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    // Detect section headers
    if (lowerLine.match(/\b(required|must[\\s-]have|requirements|qualifications|minimum)\b.*:?/)) {
      inRequiredSection = true;
      inNiceSection = false;
      continue;
    }

    if (lowerLine.match(/\b(nice[\\s-]to[\\s-]have|preferred|bonus|plus|desired)\b.*:?/)) {
      inNiceSection = true;
      inRequiredSection = false;
      continue;
    }

    // Reset sections on new major header
    if (lowerLine.match(/^(about|responsibilities|benefits|what we offer)/)) {
      inRequiredSection = false;
      inNiceSection = false;
      continue;
    }

    // Extract items based on current section
    if ((type === 'required' && inRequiredSection) || (type === 'nice' && inNiceSection)) {
      const cleaned = line
        .replace(/^[•\-\*⚫○▪▫→➤✓]\s*/, '')
        .replace(/^\d+[\.\)]\s*/, '')
        .trim();

      if (cleaned.length > 10 && cleaned.length < 200) {
        requirements.add(cleaned);
      }
    }
  }

  return Array.from(requirements).slice(0, 10); // Limit to 10 items
}

/**
 * Normalize skill names
 */
function normalizeSkillName(skill: string): string {
  const normalized = skill.toLowerCase().trim();
  
  // Special cases
  const specialCases: Record<string, string> = {
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'nodejs': 'Node.js',
    'node.js': 'Node.js',
    'nextjs': 'Next.js',
    'next.js': 'Next.js',
    'react': 'React',
    'angular': 'Angular',
    'vue': 'Vue.js',
    'python': 'Python',
    'java': 'Java',
    'c++': 'C++',
    'c#': 'C#',
    'golang': 'Go',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'mongodb': 'MongoDB',
    'graphql': 'GraphQL',
  };

  return specialCases[normalized] || capitalizeFirst(normalized);
}

/**
 * Capitalize first letter
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get parsing statistics
 */
export function getParsingStats(parsed: ParsedJD): {
  totalSkills: number;
  totalRequirements: number;
  completeness: number;
} {
  const totalSkills = parsed.hardSkills.length + parsed.tools.length + parsed.softSkills.length;
  const totalRequirements = parsed.mustHaves.length + parsed.niceToHaves.length;
  
  // Calculate completeness score (0-100)
  let completeness = 0;
  if (parsed.jobTitle && parsed.jobTitle !== 'Position') completeness += 20;
  if (parsed.seniority !== 'unknown') completeness += 10;
  if (parsed.hardSkills.length > 0) completeness += 25;
  if (parsed.tools.length > 0) completeness += 15;
  if (parsed.softSkills.length > 0) completeness += 10;
  if (parsed.mustHaves.length > 0) completeness += 20;

  return {
    totalSkills,
    totalRequirements,
    completeness,
  };
}











