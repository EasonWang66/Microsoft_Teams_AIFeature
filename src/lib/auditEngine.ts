import type { ActionItem, AuditResult, TranscriptEntry, WorkItem } from "./types";

const dummyActionItems: ActionItem[] = [
  {
    id: "action-api-route",
    title: "Create the transcript audit API route",
    owner: "Andre Patel",
    dueDate: "Tomorrow",
    priority: "High",
    confidence: 0.96,
    sourceQuote: "Create the Next.js route that accepts transcript JSON and returns summary bullets, decisions, risks, and at least five suggested work items."
  },
  {
    id: "action-dashboard-states",
    title: "Define review and saved dashboard states",
    owner: "Nora Williams",
    dueDate: "Wednesday afternoon",
    priority: "Medium",
    confidence: 0.94,
    sourceQuote: "I will define the visual hierarchy for suggested versus saved work items by Wednesday afternoon."
  },
  {
    id: "action-customer-scenario",
    title: "Prepare a customer scenario for the demo",
    owner: "Sam Rivera",
    dueDate: "Thursday morning",
    priority: "Medium",
    confidence: 0.9,
    sourceQuote: "I can prepare a customer scenario around quarterly business review prep, including a long meeting transcript with ambiguous follow-ups."
  },
  {
    id: "action-privacy-notes",
    title: "Write privacy, hallucination, and admin permission notes",
    owner: "Sam Rivera",
    dueDate: "Thursday morning",
    priority: "High",
    confidence: 0.95,
    sourceQuote: "I will also write three objection-handling notes for privacy, hallucination, and Teams admin permissions by Thursday morning."
  },
  {
    id: "action-fallback-output",
    title: "Add reliable fallback output for the demo",
    owner: "Andre Patel",
    dueDate: "Before demo",
    priority: "High",
    confidence: 0.93,
    sourceQuote: "I can add a local deterministic extractor so the demo never blocks on credentials."
  },
  {
    id: "action-demo-script",
    title: "Draft Friday demo script and success criteria",
    owner: "Maya Chen",
    dueDate: "Thursday afternoon",
    priority: "High",
    confidence: 0.96,
    sourceQuote: "Let's include a work item for me to draft the Friday demo script and define success criteria."
  }
];

const dummyWorkItems: WorkItem[] = [
  {
    id: "work-api-route",
    actionItemId: "action-api-route",
    title: "Build audit endpoint contract",
    description: "Create a prototype API endpoint that accepts Teams-style transcript data and returns summary, action item, and work item objects.",
    owner: "Andre Patel",
    dueDate: "Tomorrow",
    priority: "High",
    status: "Suggested",
    tags: ["Backend", "Prototype"]
  },
  {
    id: "work-dashboard-states",
    actionItemId: "action-dashboard-states",
    title: "Design dashboard review states",
    description: "Prepare visual states for extracted action items, suggested work items, and saved work items.",
    owner: "Nora Williams",
    dueDate: "Wednesday afternoon",
    priority: "Medium",
    status: "Suggested",
    tags: ["Design", "Dashboard"]
  },
  {
    id: "work-customer-scenario",
    actionItemId: "action-customer-scenario",
    title: "Write QBR demo scenario",
    description: "Create a realistic customer meeting scenario with ambiguous follow-ups for the prototype walkthrough.",
    owner: "Sam Rivera",
    dueDate: "Thursday morning",
    priority: "Medium",
    status: "Suggested",
    tags: ["Demo", "Customer"]
  },
  {
    id: "work-privacy-notes",
    actionItemId: "action-privacy-notes",
    title: "Prepare trust and permissions talking points",
    description: "Draft short notes that explain privacy, hallucination review, tenant consent, and Teams admin permissions.",
    owner: "Sam Rivera",
    dueDate: "Thursday morning",
    priority: "High",
    status: "Suggested",
    tags: ["Privacy", "Enablement"]
  },
  {
    id: "work-demo-script",
    actionItemId: "action-demo-script",
    title: "Create Friday demo script",
    description: "Draft the demo sequence and define what a successful prototype walkthrough should prove.",
    owner: "Maya Chen",
    dueDate: "Thursday afternoon",
    priority: "High",
    status: "Suggested",
    tags: ["Product", "Demo"]
  }
];

export function createDummyAudit(meetingTitle: string): AuditResult {
  return {
    meetingTitle,
    generatedAt: new Date().toISOString(),
    source: "dummy-prototype-data",
    summary: {
      keyPoints: [
        "The team aligned on a prototype that simulates a Microsoft Teams meeting audit without using live tenant permissions.",
        "The main workflow is Start, review the meeting summary, inspect extracted action items, then save converted work items to a personal dashboard.",
        "The prototype should be reliable enough for Framer/Vercel embedding, so the current version uses curated dummy outputs instead of a live AI call."
      ],
      decisions: [
        "Use dummy Teams-style meeting data and dummy extracted outputs for the Framer prototype.",
        "Keep Summary, Action Items, and Work Items as separate sections in the interface.",
        "Save selected work items locally in the browser for the prototype dashboard experience."
      ],
      risks: [
        "Live Teams integration will eventually require Microsoft Graph permissions, tenant consent, and transcript retention planning.",
        "A future AI-backed version should include source quotes and user review before creating or saving any work item."
      ]
    },
    actionItems: dummyActionItems,
    workItems: dummyWorkItems
  };
}

export async function auditTranscript(params: {
  meetingTitle: string;
  transcript: TranscriptEntry[];
}): Promise<AuditResult> {
  void params.transcript;
  return createDummyAudit(params.meetingTitle);
}
