import { NextResponse } from "next/server";
import { auditTranscript } from "@/lib/auditEngine";
import { mockMeetingTitle, mockTeamsTranscript } from "@/lib/mockTeamsTranscript";
import type { TranscriptEntry } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      meetingTitle?: string;
      transcript?: TranscriptEntry[];
    };

    const result = await auditTranscript({
      meetingTitle: body.meetingTitle || mockMeetingTitle,
      transcript: body.transcript?.length ? body.transcript : mockTeamsTranscript
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to audit meeting transcript." },
      { status: 500 }
    );
  }
}
