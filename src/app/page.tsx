"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SummaryMessage = {
  id: string;
  kind: "summary";
  title: string;
  body: string;
};

type ActionMessage = {
  id: string;
  kind: "actions";
  title: string;
  items: string[];
};

type WorkItemsMessage = {
  id: string;
  kind: "work-items";
  title: string;
  intro: string;
  workItems: WorkItem[];
};

type ChatMessage = SummaryMessage | ActionMessage | WorkItemsMessage;

type SaveState = "idle" | "saving" | "saved";
type ModalView = "detail" | "dashboard";

type WorkItem = {
  title: string;
  system: string;
  assignee: string;
  assigneeInitials: string;
  tag: string;
  avatars: {
    initials: string;
    color: string;
  }[];
  attachments: number;
  comments: number;
  description: string;
  rationale: string;
  sourceContext: string;
  areaPath: string;
  iterationPath: string;
  state: string;
  priority: string;
  startDate: string;
  dueDate: string;
  tasks: string[];
  attachmentUrl: string;
};

const participants = [
  {
    name: "Serena Davis",
    image: "/teams-meeting-photo/1.jpeg"
  },
  {
    name: "Babak Shammas",
    image: "/teams-meeting-photo/2.jpeg"
  },
  {
    name: "Aadi Kapoor",
    image: "/teams-meeting-photo/3.jpeg"
  },
  {
    name: "Charlotte de Crum",
    image: "/teams-meeting-photo/4.jpg",
    active: true
  }
];

const chatMessages: ChatMessage[] = [
  {
    id: "summary",
    kind: "summary",
    title: "Summary",
    body:
      "The team aligned on a simplified onboarding flow for the dashboard prototype, agreed to keep the Teams extension experience lightweight, and flagged privacy copy plus Azure DevOps sync as the next areas to refine."
  },
  {
    id: "actions",
    kind: "actions",
    title: "Action Items",
    items: [
      "Nora to deliver updated onboarding wireframes by Friday.",
      "Sam to draft privacy and meeting-recording copy before the next review.",
      "Maya to prepare a short demo script using the dummy Teams transcript.",
      "Andre to define the Azure DevOps work item fields and fallback states.",
      "Charlotte to review the final prototype flow with stakeholders."
    ]
  },
  {
    id: "work-items",
    kind: "work-items",
    title: "Work Items",
    intro: "Based on what I captured, I created the following suggested work items:",
    workItems: [
      {
        title: "Onboarding Wireframes",
        system: "DB Console UI System",
        assignee: "Dave Franco",
        assigneeInitials: "DF",
        tag: "UI Design",
        avatars: [
          { initials: "DF", color: "gold" },
          { initials: "EP", color: "green" }
        ],
        attachments: 3,
        comments: 1,
        description: "Create onboarding wireframes with simplified flow.",
        rationale:
          "During the onboarding review, the team agreed that the first-run dashboard path needs fewer decision points before users can save suggested work items.",
        sourceContext:
          "Auto-extracted by Align from the UI Team Meeting transcript when Charlotte asked for a simplified first-run flow.",
        areaPath: "DB Console UI System",
        iterationPath: "Q3 Discovery",
        state: "Not Started",
        priority: "2",
        startDate: "04/03/2026",
        dueDate: "07/15/2026",
        tasks: ["Map first-run dashboard states", "Create wireframes for suggested item review", "Prepare clickable Figma prototype"],
        attachmentUrl: "figma.com/file/db-console/onboarding-wireframes"
      },
      {
        title: "Meeting Privacy Copy",
        system: "Align Extension Content",
        assignee: "Sam Wilson",
        assigneeInitials: "SW",
        tag: "Content",
        avatars: [
          { initials: "SW", color: "blue" },
          { initials: "MC", color: "pink" }
        ],
        attachments: 2,
        comments: 4,
        description: "Draft privacy language for real-time meeting audit behavior.",
        rationale:
          "The prototype needs concise language that explains when meeting content is analyzed and how generated work items are handled before saving.",
        sourceContext:
          "Auto-extracted by Align after Sam flagged privacy copy as a blocker for stakeholder review.",
        areaPath: "Align Extension Content",
        iterationPath: "Q3 Discovery",
        state: "Not Started",
        priority: "1",
        startDate: "04/04/2026",
        dueDate: "07/12/2026",
        tasks: ["Draft short disclosure copy", "Review wording with product lead", "Add approved copy to welcome panel"],
        attachmentUrl: "figma.com/file/align/privacy-copy-notes"
      },
      {
        title: "Demo Script",
        system: "Prototype Review",
        assignee: "Maya Kapoor",
        assigneeInitials: "MK",
        tag: "Prototype",
        avatars: [
          { initials: "MK", color: "purple" },
          { initials: "AC", color: "teal" }
        ],
        attachments: 1,
        comments: 2,
        description: "Prepare a guided demo using the long dummy Teams transcript.",
        rationale:
          "The team wants a short guided walkthrough that shows the Start interaction, generated messages, and the work item review moment without relying on a live AI API.",
        sourceContext:
          "Auto-extracted by Align when Maya volunteered to prepare the prototype narration for the next checkpoint.",
        areaPath: "Prototype Review",
        iterationPath: "Q3 Discovery",
        state: "Not Started",
        priority: "2",
        startDate: "04/05/2026",
        dueDate: "07/18/2026",
        tasks: ["Write two-minute demo narration", "Pair script with dummy transcript moments", "Review flow with Charlotte"],
        attachmentUrl: "figma.com/file/align/demo-script-outline"
      }
    ]
  }
];

const defaultDashboardItems = [
  {
    title: "Extract Reqs: Dark",
    system: "DB Console UI System",
    description: "Review the recorded sync with the front-end team to extract accessibility constraints for the new dashboard theme.",
    status: "Synced",
    column: "not-started",
    attachments: 3,
    comments: 1
  },
  {
    title: "Simplify Onboarding",
    system: "Onboarding Experience",
    description: "Synthesize chat feedback from PMs regarding friction points in the compute scaling flow.",
    column: "not-started",
    attachments: 3,
    comments: 1
  },
  {
    title: "Standardize Button",
    system: "Design System Optimization",
    description: "Generate an updated user journey map before Thursday's sync.",
    column: "not-started",
    attachments: 3,
    comments: 1
  },
  {
    title: "Standardize Data Gr...",
    system: "DB Console UI System",
    description: "Update the main data grid to support inline editing.",
    column: "in-progress",
    attachments: 3,
    comments: 1
  },
  {
    title: "Document rationale",
    system: "DB Console UI System",
    description: "Draft the \"why\" behind removing the advanced filter panel based on yesterday's usability testing.",
    column: "in-progress",
    attachments: 3,
    comments: 1
  },
  {
    title: "Redesign Banner",
    system: "Notification UX",
    description: "Ensure the connection wizard meets WCAG 2.1 AA requirements.",
    column: "completed",
    attachments: 3,
    comments: 1,
    imageSrc: "/align-panel/dashboard-redesign-banner.jpg"
  },
  {
    title: "Resolve Nav Bug",
    system: "DB Console UI System",
    description: "Address the missing hover states on the top navigation based on the QA team's chat log.",
    column: "completed",
    attachments: 3,
    comments: 1
  }
];

export default function Home() {
  const chatPanelRef = useRef<HTMLElement | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const [panelStarted, setPanelStarted] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [selectedWorkItem, setSelectedWorkItem] = useState<WorkItem | null>(null);
  const [detailClosing, setDetailClosing] = useState(false);
  const [modalView, setModalView] = useState<ModalView>("detail");
  const [dashboardTransitioning, setDashboardTransitioning] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const hasMoreMessages = panelStarted && visibleMessages < chatMessages.length;

  const messageTimers = useMemo(() => [650, 1700, 2950], []);

  useEffect(() => {
    if (!panelStarted) {
      return;
    }

    const timers = messageTimers.map((delay, index) =>
      window.setTimeout(() => {
        setVisibleMessages(index + 1);
      }, delay)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [messageTimers, panelStarted]);

  useEffect(() => {
    if (!panelStarted || visibleMessages === 0) {
      return;
    }

    chatPanelRef.current?.scrollTo({
      top: chatPanelRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [panelStarted, visibleMessages]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  function startAudit() {
    setPanelStarted(true);
    setVisibleMessages(0);
  }

  function closeWorkItemDetails() {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    setDetailClosing(true);
    window.setTimeout(() => {
      setSelectedWorkItem(null);
      setDetailClosing(false);
      setModalView("detail");
      setDashboardTransitioning(false);
      setSaveState("idle");
      setShowSaveSuccess(false);
    }, 360);
  }

  function saveWorkItemToProject() {
    if (saveState !== "idle") {
      return;
    }

    setSaveState("saving");
    setShowSaveSuccess(false);
    saveTimerRef.current = window.setTimeout(() => {
      setSaveState("saved");
      setShowSaveSuccess(true);
      saveTimerRef.current = null;
    }, 1100);
  }

  function viewInAlignDashboard() {
    if (!selectedWorkItem || dashboardTransitioning) {
      return;
    }

    setDashboardTransitioning(true);
    window.setTimeout(() => {
      setModalView("dashboard");
      setDashboardTransitioning(false);
    }, 260);
  }

  function renderDashboardCard(
    item: {
      title: string;
      system: string;
      description: string;
      status?: string;
      attachments: number;
      comments: number;
      imageSrc?: string;
    },
    isNew = false
  ) {
    const syncButton = (
      <div className={item.status === "Synced" ? "sync-chip is-synced" : "sync-chip"} aria-hidden="true">
        <img src="/align-panel/detail-icons/arrow-sync.png" alt="" aria-hidden="true" />
        {item.status ?? "Sync to DevOps"}
      </div>
    );

    return (
      <article className={isNew ? "dashboard-card is-new" : "dashboard-card"} key={`${item.title}-${item.system}`}>
        {item.imageSrc ? <img className="dashboard-card-image" src={item.imageSrc} alt="" aria-hidden="true" /> : null}
        {isNew ? (
          <>
            <div className="dashboard-new-row">
              <div className="dashboard-new-tag">New</div>
              {syncButton}
            </div>
            <h3>{item.title}</h3>
            <p className="dashboard-card-system">{item.system}</p>
          </>
        ) : (
          <div className="dashboard-card-top">
            <div>
              <h3>{item.title}</h3>
              <p className="dashboard-card-system">{item.system}</p>
            </div>
            {syncButton}
          </div>
        )}
        <p className="dashboard-card-copy">{item.description}</p>
        <div className="dashboard-card-footer">
          <div className="avatar-group" aria-hidden="true">
            <span className="work-avatar gold">DF</span>
            <span className="work-avatar green">EP</span>
          </div>
          <div className="work-card-actions" aria-label="Work item activity">
            <span>
              <img src="/align-panel/actions/attach.png" alt="" aria-hidden="true" />
              {item.attachments}
            </span>
            <span>
              <img src="/align-panel/actions/comment.png" alt="" aria-hidden="true" />
              {item.comments}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <main className="teams-shell" aria-label="Microsoft Teams meeting background">
      <header className="teams-window-bar">
        <div className="window-title">
          <img src="/teams-background/teams-logo.png" alt="" aria-hidden="true" />
          <span>UI Team Meeting</span>
        </div>
        <div className="window-actions" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>

      <section className="meeting-toolbar" aria-label="Meeting toolbar">
        <img src="/teams-background/meeting-header.png" alt="" aria-hidden="true" />
        <span className="align-active-line" aria-hidden="true" />
      </section>

      <section className="meeting-body" aria-label="Meeting with Align panel">
        <section className="meeting-stage" aria-label="Participant video grid">
          <div className="video-grid">
            {participants.map((participant) => (
              <article
                className={participant.active ? "video-tile active-speaker" : "video-tile"}
                key={participant.name}
              >
                <img src={participant.image} alt="" aria-hidden="true" />
                <div className="participant-name">{participant.name}</div>
              </article>
            ))}
          </div>
        </section>

        <aside className={panelStarted ? "align-panel is-chatting" : "align-panel"} aria-label="Align side panel">
          <div className="align-panel-header">
            <div className="align-title">
              <img src="/align-panel/icon-small.png" alt="" aria-hidden="true" />
              <span>Align</span>
            </div>
            <div className="panel-actions" aria-hidden="true">
              <span>...</span>
              <span>×</span>
            </div>
          </div>
          <div className="align-controls" aria-hidden="true">
            <div className="create-work-item">
              <span>+</span>
              <span>Create Work Item</span>
            </div>
            <div className="pause-button">
              <span>Ⅱ</span>
              <span>Pause</span>
            </div>
          </div>
          <div className="panel-rule" />
          <div className="align-panel-content" aria-live="polite">
            {!panelStarted ? (
              <section className="panel-welcome">
                <img className="align-mark" src="/align-panel/icon-large.png" alt="" aria-hidden="true" />
                <h1>Welcome</h1>
                <p>
                  Align captures your Teams meeting and turns conversations into structured work
                  items in real time.
                </p>
                <div className="panel-copy-block">
                  <h2>Summarize as you go</h2>
                  <p>Get live summaries of key discussions so you can stay aligned without taking notes.</p>
                </div>
                <div className="panel-copy-block">
                  <h2>Capture action items instantly</h2>
                  <p>Align detects and suggests work items during the meeting, ready for you to review and save.</p>
                </div>
                <div className="panel-copy-block">
                  <h2>Share with one click</h2>
                  <p>Send work items directly to the meeting chat to keep everyone aligned.</p>
                </div>
                <div className="panel-copy-block">
                  <h2>Sync to Azure DevOps</h2>
                  <p>Push approved work items to Azure DevOps in one click to keep execution moving.</p>
                </div>
                <button className="panel-start" type="button" onClick={startAudit}>
                  Start
                </button>
              </section>
            ) : (
              <section className="panel-chat" ref={chatPanelRef}>
                {chatMessages.slice(0, visibleMessages).map((message) => (
                  <article className={`ai-message ${message.kind}`} key={message.id}>
                    <div className="message-meta">
                      <img src="/align-panel/icon-chat.png" alt="" aria-hidden="true" />
                      <strong>Align AI generated</strong>
                      <span>11:15 AM</span>
                    </div>
                    <div className="message-bubble">
                      <h2>{message.title}</h2>
                      {message.kind === "summary" ? <p>{message.body}</p> : null}
                      {message.kind === "actions" ? (
                        <ul className="action-list">
                          {message.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      {message.kind === "work-items" ? (
                        <>
                          <p>{message.intro}</p>
                          <div className="work-card-stack">
                            {message.workItems.map((workItem) => (
                              <section className="work-card" key={workItem.title}>
                                <h3>{workItem.title}</h3>
                                <p className="work-card-system">{workItem.system}</p>
                                <p>{workItem.description}</p>
                                <div className="work-card-meta">
                                  <div className="avatar-group" aria-label={`${workItem.assignee} collaborators`}>
                                    {workItem.avatars.map((avatar) => (
                                      <span className={`work-avatar ${avatar.color}`} key={avatar.initials}>
                                        {avatar.initials}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="work-card-actions" aria-label="Work item activity">
                                    <span>
                                      <img src="/align-panel/actions/attach.png" alt="" aria-hidden="true" />
                                      {workItem.attachments}
                                    </span>
                                    <span>
                                      <img src="/align-panel/actions/comment.png" alt="" aria-hidden="true" />
                                      {workItem.comments}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  className="work-card-view"
                                  type="button"
                                  onClick={() => {
                                    if (saveTimerRef.current) {
                                      window.clearTimeout(saveTimerRef.current);
                                      saveTimerRef.current = null;
                                    }
                                    setDetailClosing(false);
                                    setSaveState("idle");
                                    setShowSaveSuccess(false);
                                    setSelectedWorkItem(workItem);
                                  }}
                                >
                                  View
                                </button>
                              </section>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </article>
                ))}
                {hasMoreMessages ? (
                  <div className="typing-row" aria-label="Align is generating">
                    <img src="/align-panel/icon-chat.png" alt="" aria-hidden="true" />
                    <span />
                    <span />
                    <span />
                  </div>
                ) : null}
              </section>
            )}
          </div>
        </aside>
      </section>
      {selectedWorkItem ? (
        <section
          className={detailClosing ? "work-detail-overlay is-closing" : "work-detail-overlay"}
          aria-label={modalView === "dashboard" ? "Align project board" : "Work item details"}
        >
          <div className="work-detail-backdrop" onClick={closeWorkItemDetails} aria-hidden="true" />
          {modalView === "detail" ? (
          <article className={dashboardTransitioning ? "work-detail-modal is-switching" : "work-detail-modal"}>
            <div className="detail-topline">
              <span>{selectedWorkItem.system}</span>
              <div className="detail-toolbar" aria-label="Work item actions">
                <div className="detail-secondary-action" aria-hidden="true">
                  <img src="/align-panel/detail-icons/arrow-sync.png" alt="" aria-hidden="true" />
                  Sync to DevOps
                </div>
                <div className="detail-secondary-action" aria-hidden="true">
                  <span aria-hidden="true">✎</span>
                  Edit
                </div>
              </div>
            </div>

            <div className="detail-title-row">
              <span className="detail-status-dot" aria-hidden="true" />
              <h2>{selectedWorkItem.title}</h2>
            </div>

            <div className="detail-owner-row">
              <img className="owner-icon" src="/align-panel/detail-icons/person-add.png" alt="" aria-hidden="true" />
              <span className={`work-avatar ${selectedWorkItem.avatars[0]?.color ?? "gold"}`}>
                {selectedWorkItem.assigneeInitials}
              </span>
              <span>{selectedWorkItem.assignee}</span>
              <img className="tag-icon" src="/align-panel/detail-icons/tag.png" alt="" aria-hidden="true" />
              <span className="detail-tag">
                {selectedWorkItem.tag}
                <span aria-hidden="true">×</span>
              </span>
            </div>

            <div className="detail-grid">
              <section className="detail-fields" aria-label="Work item fields">
                <label>
                  <span>Area Path</span>
                  <div className="detail-input muted">
                    <span className="detail-value">{selectedWorkItem.areaPath}</span>
                    <span>⌄</span>
                  </div>
                </label>
                <label>
                  <span>State</span>
                  <div className="detail-input">
                    <span className="detail-value with-status">
                      <span className="mini-status" />
                      <span className="detail-value-text">{selectedWorkItem.state}</span>
                    </span>
                    <span>⌄</span>
                  </div>
                </label>
                <label>
                  <span>Priority</span>
                  <div className="detail-input muted">
                    <span className="detail-value">{selectedWorkItem.priority}</span>
                    <span>⌄</span>
                  </div>
                </label>
                <label>
                  <span>Iteration Path</span>
                  <div className="detail-input muted">
                    <span className="detail-value">{selectedWorkItem.iterationPath}</span>
                    <span>⌄</span>
                  </div>
                </label>
                <label>
                  <span>Start Date</span>
                  <div className="detail-input">
                    <span className="detail-value">{selectedWorkItem.startDate}</span>
                    <img className="input-icon" src="/align-panel/detail-icons/calendar.png" alt="" aria-hidden="true" />
                  </div>
                </label>
                <label>
                  <span>Due Date</span>
                  <div className="detail-input">
                    <span className="detail-value">{selectedWorkItem.dueDate}</span>
                    <img className="input-icon" src="/align-panel/detail-icons/calendar.png" alt="" aria-hidden="true" />
                  </div>
                </label>
              </section>

              <section className="detail-description" aria-label="Description">
                <h3>Description</h3>
                <div>
                  <p>Description: {selectedWorkItem.description}</p>
                  <p>Rationale: {selectedWorkItem.rationale}</p>
                  <p>Source Context: {selectedWorkItem.sourceContext}</p>
                </div>
              </section>
            </div>

            <div className="detail-lower-grid">
              <section className="detail-tasks">
                <h3>Tasks</h3>
                {selectedWorkItem.tasks.map((task) => (
                  <p key={task}><span className="task-circle" aria-hidden="true" />{task}</p>
                ))}
              </section>

              <section className="detail-attachments">
                <h3>Attachments</h3>
                <div className="attachment-pill">
                  <img src="/align-panel/detail-icons/link.png" alt="" aria-hidden="true" />
                  {selectedWorkItem.attachmentUrl}
                </div>
                <div className="add-attachment-button" aria-hidden="true">Add Attachment</div>
              </section>
            </div>

            <div className="detail-footer">
              <button
                type="button"
                className={`save-project-button ${saveState}`}
                onClick={saveWorkItemToProject}
                disabled={saveState !== "idle"}
              >
                {saveState === "saving" ? <span className="save-spinner" aria-hidden="true" /> : null}
                {saveState === "idle" ? "Save to Project" : null}
                {saveState === "saving" ? "Saving..." : null}
                {saveState === "saved" ? "Saved" : null}
              </button>
              <div className="share-team-button" aria-hidden="true">Share with Team</div>
            </div>
            {showSaveSuccess ? (
              <section className="save-success-popover" aria-label="Saved successfully">
                <div className="success-icon" aria-hidden="true">✓</div>
                <div>
                  <h3>Saved to your Align project</h3>
                  <p>{selectedWorkItem.title} is now ready to review from your dashboard.</p>
                </div>
                <button type="button" className="view-align-button" onClick={viewInAlignDashboard}>View in Align</button>
              </section>
            ) : null}
          </article>
          ) : (
          <article className="align-dashboard-modal">
            <header className="dashboard-header">
              <div className="dashboard-breadcrumb">
                <span className="work-avatar gold">DF</span>
                <span>DB Console UI System</span>
                <span aria-hidden="true">›</span>
                <strong>Project Board</strong>
              </div>
              <div className="dashboard-actions" aria-hidden="true">
                <div className="dashboard-command">
                  <span className="command-plus">+</span>
                  Generate Weekly Report
                </div>
                <div className="dashboard-command">
                  <img src="/align-panel/detail-icons/arrow-sync.png" alt="" aria-hidden="true" />
                  DevOps Multi Sync
                </div>
              </div>
            </header>
            <section className="dashboard-tabs" aria-label="Board filters">
              <div className="dashboard-pill active">All</div>
              <div className="dashboard-pill">Assigned Items</div>
              <div className="dashboard-pill">Private Items</div>
              <div className="dashboard-pill">Devops Synced items</div>
              <div className="dashboard-view-controls" aria-hidden="true">
                <div className="dashboard-view active"><span className="grid-glyph" />Grid</div>
                <div className="dashboard-view"><span className="list-glyph" />List</div>
                <div className="dashboard-divider" />
                <div className="dashboard-filter"><span className="filter-glyph" />Filters<span className="filter-chevron">⌄</span></div>
                <div className="dashboard-more">...</div>
              </div>
            </section>
            <section className="dashboard-board" aria-label="Align dashboard work items">
              <div className="dashboard-column has-new-card">
                <h2>Not Started</h2>
                <div className="dashboard-add" aria-hidden="true">+</div>
                <div className="dashboard-card-lane">
                  {renderDashboardCard(
                    {
                      title: selectedWorkItem.title,
                      system: selectedWorkItem.system,
                      description: selectedWorkItem.description,
                      attachments: selectedWorkItem.attachments,
                      comments: selectedWorkItem.comments
                    },
                    true
                  )}
                  {defaultDashboardItems
                    .filter((item) => item.column === "not-started")
                    .map((item) => renderDashboardCard(item))}
                </div>
                <div className="new-card-popover" role="status">
                  Newly saved from the Teams meeting. Ready to review, sync, or assign from Align.
                </div>
              </div>
              <div className="dashboard-column">
                <h2>In Progress</h2>
                <div className="dashboard-add" aria-hidden="true">+</div>
                <div className="dashboard-card-lane">
                  {defaultDashboardItems
                    .filter((item) => item.column === "in-progress")
                    .map((item) => renderDashboardCard(item))}
                </div>
              </div>
              <div className="dashboard-column">
                <h2>Completed</h2>
                <div className="dashboard-add" aria-hidden="true">+</div>
                <div className="dashboard-card-lane">
                  {defaultDashboardItems
                    .filter((item) => item.column === "completed")
                    .map((item) => renderDashboardCard(item))}
                </div>
              </div>
            </section>
          </article>
          )}
        </section>
      ) : null}
    </main>
  );
}
