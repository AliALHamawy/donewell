import NoteCard from "./NoteCard";

interface NotesProps {
    notes: any[];
    onDelete: (id: string) => Promise<void>;
    onNoteUpdated?: (updatedNote?: any) => void; // إضافة خاصية التحديث
}

const Notes = ({ notes, onDelete, onNoteUpdated }: NotesProps) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
                {notes.map((note) => (
                    <NoteCard 
                        key={note.id} 
                        note={note} 
                        onDelete={onDelete} 
                        onNoteUpdated={onNoteUpdated} // تمرير الدالة لكل بطاقة
                    />
                ))}
            </div>
        </>
    )
}

export default Notes;