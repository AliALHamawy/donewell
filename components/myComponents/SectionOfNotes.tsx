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

    const handleNoteDelete = async (id: string) => {
        const result = await deleteNote(id);
        if (result?.error) {
            console.error(result.error);
            toast.add({
                type: "error",
                title: "Error deleting note",
                description: "An error occurred while deleting the note.",
            });
        } else {
            setNotesList(notesList.filter((note) => note.id !== id))

            toast.add({
                type: "info",
                title: "Note deleted",
                description: "The note has been permanently removed.",
            });

        }
    }

   const filteredNotes = notesList.filter((note) => {
        // نقوم بإزالة المسافات الزائدة من أطراف نص البحث وتصغير الحروف
        const query = searchQuery.trim().toLowerCase();
        
        // إذا كان حقل البحث فارغاً (أو يحتوي فقط على مسافات)، نعرض كل الملاحظات
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
            <AddNoteDialog open={isAddOpen} onOpenChange={setIsAddOpen} onNoteAdded={fetchNotes} />
            {loading ? (
                <div className="py-10 text-center text-muted-foreground">Loading notes...</div>
            ) : filteredNotes.length > 0 ? (
                <Notes notes={filteredNotes} onDelete={handleNoteDelete} onNoteUpdated={fetchNotes} />
            ) : (
                <NoNote />
            )}
        </>
    )
}

export default SectionOfNotes