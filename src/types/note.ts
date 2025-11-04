export interface Note {
  id: string;
  client_name: string;
  session_date: Date;
  notes: string;
  duration: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateNoteInput {
  clientName: string;
  sessionDate: Date;
  notes: string;
  duration: number;
}

export interface UpdateNoteInput extends CreateNoteInput {
  id: string;
}
