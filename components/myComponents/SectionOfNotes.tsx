"use client"
import TaskHeading from "@/components/myComponents/TaskHeading";
import NoteSearchAdd from "@/components/myComponents/NoteSearchAdd";
import Notes from "@/components/myComponents/Notes";
import NoNote from "@/components/myComponents/NoNote";
import AddNoteDialog from "./AddNoteDialog";
import { useEffect, useState } from "react";
import { deleteNote, getNotes } from "@/app/actions/notes";
import { toast } from "../ui/toast";

const SectionOfNotes = () => {
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [notesList, setNotesList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchNotes = async () => {
        setLoading(true);
        const res = await getNotes();
        if (res && res.notes) {
            setNotesList(res.notes);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    // إضافة الملاحظة الجديدة فوراً إلى الـ State محلياً دون الحاجة لـ fetch كامل
    const handleNoteAdded = (newNote: any) => {
        if (newNote) {
            setNotesList((prevNotes) => [newNote, ...prevNotes]);
        } else {
            // في حال لم تُرجع الدالة الكائن الجديد، نقوم بجلبها بالخلفية
            fetchNotes();
        }
    };

    // تحديث الملاحظة المُعدلة فوراً داخل الـ State محلياً
    const handleNoteUpdated = (updatedNote: any) => {
        if (updatedNote) {
            setNotesList((prevNotes) =>
                prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
            );
        } else {
            fetchNotes();
        }
    };

    const handleNoteDelete = async (id: string) => {
        // الحذف المحلي الفوري لشعور بالسرعة
        setNotesList((prevNotes) => prevNotes.filter((note) => note.id !== id));

        const result = await deleteNote(id);
        if (result?.error) {
            console.error(result.error);
            // إعادة جلب الملاحظات في حال فشل الحذف من السيرفر
            fetchNotes();
            toast.add({
                type: "error",
                title: "Error deleting note",
                description: "An error occurred while deleting the note.",
            });
        } else {
            toast.add({
                type: "info",
                title: "Note deleted",
                description: "The note has been permanently removed.",
            });
        }
    }

    const filteredNotes = notesList.filter((note) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;

        const titleMatch = note.title ? note.title.toLowerCase().includes(query) : false;
        const contentMatch = note.content ? note.content.toLowerCase().includes(query) : false;
        
        return titleMatch || contentMatch;
    });

    return (
        <>
            <TaskHeading title="MY NOTES" subtitle="Keep your thoughts." description="Quick notes, always within reach." />
            <NoteSearchAdd
                onOpenForm={() => setIsAddOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            {/* نمرر دالة handleNoteAdded لتستقبل الملاحظة الجديدة */}
            <AddNoteDialog open={isAddOpen} onOpenChange={setIsAddOpen} onNoteAdded={handleNoteAdded} />
            
            {loading && notesList.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">Loading notes...</div>
            ) : filteredNotes.length > 0 ? (
                <Notes 
                    notes={filteredNotes} 
                    onDelete={handleNoteDelete} 
                    onNoteUpdated={handleNoteUpdated} 
                />
            ) : (
                <NoNote />
            )}
        </>
    )
}

export default SectionOfNotes;