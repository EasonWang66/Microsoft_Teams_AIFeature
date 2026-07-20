export type TranscriptEntry = {
  id: string;
  timestamp: string;
  speaker: string;
  role: string;
  text: string;
};

export type MeetingSummary = {
  keyPoints: string[];
  decisions: string[];
  risks: string[];
};

export type ActionItem = {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  confidence: number;
  sourceQuote: string;
};

export type WorkItem = {
  id: string;
  actionItemId: string;
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Suggested" | "Saved";
  tags: string[];
};

export type AuditResult = {
  meetingTitle: string;
  generatedAt: string;
  source: string;
  summary: MeetingSummary;
  actionItems: ActionItem[];
  workItems: WorkItem[];
};
