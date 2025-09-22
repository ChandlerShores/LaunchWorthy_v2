export type ServiceKey = "consult" | "resume" | "accelerator" | "mentorship";

export const SERVICES: Record<ServiceKey, {
  title: string;
  slug: string;
  price: string;
  blurb: string;
  badge?: "Most Popular";
}> = {
  consult: {
    title: "30-min Career Consult",
    slug: "/services/consult",
    price: "$50",
    blurb: "Quick read on resume, LinkedIn, and interview style with 2–3 fixes.",
  },
  resume: {
    title: "Resume + LinkedIn Polish",
    slug: "/services/resume-linkedin",
    price: "$125",
    blurb: "Align your story across resume and profile with a short walkthrough.",
  },
  accelerator: {
    title: "Stop Getting Ghosted",
    slug: "/services/stop-getting-ghosted",
    price: "$300",
    blurb: "Baseline mock → coaching → final mock. Recordings + detailed notes.",
    badge: "Most Popular",
  },
  mentorship: {
    title: "Monthly Mentorship",
    slug: "/services/mentorship",
    price: "$150/mo",
    blurb: "Two 30-min sessions/month for ongoing prep, negotiation, and growth.",
  },
};

export type Option = {
  id: string;
  label: string;
  weights: Partial<Record<ServiceKey, number>>;
};

export type Question = {
  id: string;
  prompt: string;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: "challenge",
    prompt: "What's your biggest interview challenge right now?",
    options: [
      { id: "no_offers", label: "I'm getting interviews but no offers", weights: { accelerator: 3, consult: 1 } },
      { id: "no_interviews", label: "My resume isn't getting me interviews", weights: { resume: 3, consult: 1 } },
      { id: "not_sure", label: "I'm not sure what I'm doing wrong", weights: { consult: 3, accelerator: 1 } },
      { id: "ongoing_guidance", label: "I need ongoing career guidance", weights: { mentorship: 3, accelerator: 1 } },
    ],
  },
  {
    id: "urgency",
    prompt: "How urgent is this for you?",
    options: [
      { id: "this_week", label: "I have interviews coming up this week", weights: { consult: 3, accelerator: 2 } },
      { id: "actively_searching", label: "I'm actively job searching now", weights: { accelerator: 3, resume: 2 } },
      { id: "next_opportunity", label: "I want to be ready for the next opportunity", weights: { resume: 2, accelerator: 2, mentorship: 1 } },
      { id: "thinking_about_it", label: "I'm thinking about making a career change", weights: { mentorship: 3, consult: 1 } },
    ],
  },
  {
    id: "experience",
    prompt: "What's your current situation?",
    options: [
      { id: "early_career", label: "Recent grad or early career (0-3 years)", weights: { consult: 2, accelerator: 2, resume: 1 } },
      { id: "mid_career", label: "Mid-career professional (3-10 years)", weights: { accelerator: 3, resume: 2, mentorship: 1 } },
      { id: "experienced", label: "Experienced professional (10+ years)", weights: { mentorship: 3, accelerator: 2, consult: 1 } },
      { id: "career_changer", label: "Career changer or returning to work", weights: { consult: 3, mentorship: 2, resume: 1 } },
    ],
  },
  {
    id: "learning_style",
    prompt: "How do you learn best?",
    options: [
      { id: "feedback_and_implement", label: "Give me feedback and I'll implement it myself", weights: { consult: 3, resume: 2 } },
      { id: "examples_and_walkthrough", label: "Show me examples and walk me through it", weights: { resume: 3, consult: 1 } },
      { id: "practice_until_right", label: "Practice with me until I get it right", weights: { accelerator: 3, mentorship: 1 } },
      { id: "regular_checkins", label: "Check in regularly to keep me accountable", weights: { mentorship: 3, accelerator: 1 } },
    ],
  },
];

// Tiebreakers (in order): Most signal on Q1 (challenge) → service badge "Most Popular" → alphabetical.
export const TIEBREAK_ORDER: ("challenge" | "urgency" | "experience" | "learning_style")[] = ["challenge", "urgency", "experience", "learning_style"];
