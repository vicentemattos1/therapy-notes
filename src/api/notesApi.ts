import { supabase } from "@/lib/supabase"
import { Note } from "@/types/note"

async function validateNoteDuration(duration: number) {
  const { data } = await supabase.functions.invoke('validate-session-note', {
    body: { duration },
  })
  return data
}

export const getNotes = async () =>{

  const {data, error} = await supabase
  .from('session_notes')
  .select('*')
  .order('updated_at', { ascending: false })

  if(error){
    throw new Error(error.message)
  }

  return data as Note[]


}
export const getNoteById = async (id: number): Promise<Note> => {

    const {data, error} = await supabase
    .from('session_notes')
    .select()
    .eq('id', id)

    if(error){
      throw new Error(error.message)
    }
    const response = data[0] as Note
    return response 

}

export const updateNote = async (id: number, updatedNote: Omit<Note, 'created_at' | 'id'>)=>{
  const check = await validateNoteDuration(updatedNote.duration);
  if (!check.valid) {
    throw new Error(check.error ?? "Invalid note payload");
  }

  const { error } = await supabase
  .from('session_notes')
  .update({ ...updatedNote })
  .eq('id', id)
  .select()

  if(error){
    throw new Error(error.message)
  }
}
export const createNote = async (newNote: Omit<Note, 'created_at' | 'id' | 'updated_at'>)=>{
  const check = await validateNoteDuration(newNote.duration);
  if (!check.valid) {
    throw new Error(check.error ?? "Invalid note payload");
  }

  const { error } = await supabase
  .from('session_notes')
  .insert({ ...newNote })

  if(error){
    throw new Error(error.message)
  }
    
}

export const deleteNote = async (id: number)=>{

  const { error } = await supabase
  .from('session_notes')
  .delete()
  .eq('id', id)

  if(error){
    throw new Error(error.message)
  }
}
