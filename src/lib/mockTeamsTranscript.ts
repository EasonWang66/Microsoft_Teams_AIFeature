import type { TranscriptEntry } from "./types";

export const mockMeetingTitle = "Teams Sync: Launch Readiness Review";

export const mockTeamsTranscript: TranscriptEntry[] = [
  {
    id: "t-001",
    timestamp: "09:00",
    speaker: "Maya Chen",
    role: "Product Lead",
    text: "Thanks everyone. Goal today is to confirm launch readiness for the Teams extension prototype: permissions, dashboard flow, first-run experience, and what we need before the Friday demo."
  },
  {
    id: "t-002",
    timestamp: "09:02",
    speaker: "Andre Patel",
    role: "Engineering",
    text: "The core transcript listener is stubbed right now. For the prototype I can wire the meeting audit API to dummy transcript events and make the response shape match what we expect from the real Teams graph webhook later."
  },
  {
    id: "t-003",
    timestamp: "09:04",
    speaker: "Nora Williams",
    role: "Design",
    text: "The dashboard needs one review state and one saved state. Extracted action items should show owner, due date, confidence, and the source sentence from the meeting. I will send the Figma components after this meeting."
  },
  {
    id: "t-004",
    timestamp: "09:07",
    speaker: "Sam Rivera",
    role: "Customer Success",
    text: "In the demo we need to show a real use case. I can prepare a customer scenario around quarterly business review prep, including a long meeting transcript with ambiguous follow-ups."
  },
  {
    id: "t-005",
    timestamp: "09:10",
    speaker: "Maya Chen",
    role: "Product Lead",
    text: "Decision: for the prototype we will not request live Teams permissions. We will simulate the meeting stream, explain the future Graph integration, and focus on the AI review-to-dashboard workflow."
  },
  {
    id: "t-006",
    timestamp: "09:13",
    speaker: "Andre Patel",
    role: "Engineering",
    text: "Action for me: create the Next.js route that accepts transcript JSON and returns summary bullets, decisions, risks, and at least five suggested work items. I can have that ready tomorrow."
  },
  {
    id: "t-007",
    timestamp: "09:16",
    speaker: "Nora Williams",
    role: "Design",
    text: "I will define the visual hierarchy for suggested versus saved work items by Wednesday afternoon. The saved state should feel personal and persistent, even if we use local storage for now."
  },
  {
    id: "t-008",
    timestamp: "09:19",
    speaker: "Sam Rivera",
    role: "Customer Success",
    text: "Please assign me the customer scenario. I will also write three objection-handling notes for privacy, hallucination, and Teams admin permissions by Thursday morning."
  },
  {
    id: "t-009",
    timestamp: "09:22",
    speaker: "Maya Chen",
    role: "Product Lead",
    text: "We need a short privacy disclaimer in the prototype. It should say transcript data is simulated for the demo and that production usage would require tenant consent and retention settings."
  },
  {
    id: "t-010",
    timestamp: "09:25",
    speaker: "Andre Patel",
    role: "Engineering",
    text: "Risk: if the live AI path is not part of this Framer prototype, we need polished dummy output. I can add deterministic summary, action item, and work item data so the demo never depends on credentials."
  },
  {
    id: "t-011",
    timestamp: "09:29",
    speaker: "Nora Williams",
    role: "Design",
    text: "Another action: I will prepare empty, loading, and error states for the dashboard. Even the prototype should show what happens if the audit is still running or fails."
  },
  {
    id: "t-012",
    timestamp: "09:33",
    speaker: "Maya Chen",
    role: "Product Lead",
    text: "Let's include a work item for me to draft the Friday demo script and define success criteria. Due Thursday afternoon. Priority high because it affects the whole presentation."
  },
  {
    id: "t-013",
    timestamp: "09:38",
    speaker: "Sam Rivera",
    role: "Customer Success",
    text: "I also recommend a post-meeting export option eventually, but for the prototype we can just save to the personal dashboard and show a count of saved items."
  },
  {
    id: "t-014",
    timestamp: "09:42",
    speaker: "Andre Patel",
    role: "Engineering",
    text: "One more dependency: someone needs to create the GitHub repository and Vercel project so preview links work once we start iterating against the Figma design."
  },
  {
    id: "t-015",
    timestamp: "09:45",
    speaker: "Maya Chen",
    role: "Product Lead",
    text: "I will own GitHub and Vercel setup. Andre owns API shape and fallback extraction, Nora owns Figma states, Sam owns customer scenario and objection notes. We will regroup Thursday at 3 PM."
  }
];
