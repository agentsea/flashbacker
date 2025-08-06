export interface SessionState {
  session_id: string;
  timestamp: string;
  trigger: 'auto-compact' | 'manual-compact' | 'manual-record';
  conversation_summary: string;
  current_focus?: string;
  active_persona?: string;
  modified_files: string[];
  custom_restoration_prompt?: string;
}

export interface Persona {
  name: string;
  description: string;
  priorities: string[];
  principles: string[];
  focus_areas: string[];
  decision_framework: string;
  collaboration_style: string;
}

export interface FlashbackConfig {
  claude_settings_path: string;
  state_directory: string;
  archive_after_days: number;
  default_persona?: string;
  auto_archive: boolean;
}

export interface HookConfig {
  type: 'PreCompact' | 'SessionStart' | 'UserPromptSubmit';
  matcher: string;
  command: string;
}

export interface StateIndex {
  latest_session: string;
  session_count: number;
  total_size: number;
  last_cleanup: string;
  active_persona?: string;
}

// NEW: Discussion and Debate Types for Phase 2C

export interface Discussion {
  id: string;
  topic: string;
  participants: string[]; // persona names
  status: 'active' | 'consensus-reached' | 'stalemate' | 'archived';
  created_at: string;
  last_activity: string;
  format: DiscussionFormat;
  consensus_method: ConsensusMethod;
  positions: PersonaPosition[];
  evidence: Evidence[];
  criticisms: PersonaCriticism[];
  consensus_result?: ConsensusResult;
  criticism_phase_completed: boolean;
  // AI-specific fields for real AI conversations
  ai_transcript?: AITranscriptEntry[];
  subagent_conversations?: SubagentConversation[];
}

export interface PersonaPosition {
  persona: string;
  position: string;
  reasoning: string[];
  evidence_cited: string[];
  criticisms_made: string[];
  responses_to_criticism: string[];
  confidence_level: 1 | 2 | 3 | 4 | 5; // 1=low, 5=high
  timestamp: string;
}

export interface Evidence {
  id: string;
  content: string;
  source: string; // "experience", "documentation", "analysis", etc.
  provided_by: string; // persona name
  supporting_position: string;
  challenged_by?: string[]; // personas who challenged this evidence
  timestamp: string;
}

export interface ConsensusResult {
  method_used: ConsensusMethod;
  outcome: 'agreement' | 'majority-decision' | 'no-consensus';
  final_decision: string;
  supporting_personas: string[];
  dissenting_personas: string[];
  dissent_reasons: string[];
  confidence_score: number; // weighted average if using weighted consensus
  timestamp: string;
}

export type DiscussionFormat = 
  | 'sequential-criticism' // Each persona must critique before proposing
  | 'devil-advocate'       // Designated challenger
  | 'evidence-debate'      // All claims require citations
  | 'roundtable'          // Open discussion with facilitation

export type ConsensusMethod = 
  | 'simple-majority'     // >50% agreement
  | 'weighted-expertise'  // Personas weighted by domain relevance
  | 'byzantine'          // 2/3+ agreement required
  | 'unanimous'          // All must agree

export interface DiscussionTemplate {
  format: DiscussionFormat;
  title: string;
  description: string;
  rules: string[];
  phases: DiscussionPhase[];
}

export interface DiscussionPhase {
  name: string;
  description: string;
  required_actions: string[];
  completion_criteria: string;
  time_limit?: number; // optional timeout in minutes
}

export interface CriticismRequirement {
  persona: string;
  must_critique: string[]; // personas whose positions must be critiqued
  completed: boolean;
  criticisms: PersonaCriticism[];
}

export interface PersonaCriticism {
  critic: string;
  target: string;
  position_criticized: string;
  criticism: string;
  evidence_challenged?: string[];
  timestamp: string;
  response_received: boolean;
}

// AI-specific types for real AI conversations
export interface AITranscriptEntry {
  persona: string;
  type: 'position' | 'criticism' | 'evidence' | 'response';
  content: any; // Can be various structured content types
  timestamp: string;
}

export interface SubagentConversation {
  id: string;
  personas: string[];
  topic: string;
  task_description: string;
  subagent_prompt: string;
  ai_response: any;
  timestamp: string;
  duration_ms?: number;
}

export interface AIPersonaResponse {
  position?: string;
  reasoning?: string[];
  evidence?: string[];
  confidence?: 1 | 2 | 3 | 4 | 5;
  criticism?: string;
  evidenceChallenged?: string[];
  suggestions?: string[];
  supportingDetails?: string;
}

export interface TaskSubagentConfig {
  persona_name: string;
  system_prompt: string;
  task_description: string;
  expected_response_format: 'position' | 'criticism' | 'evidence';
}