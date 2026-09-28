"use client"
import TaskHeading from "@/components/myComponents/TaskHeading";
import NoteSearchAdd from "@/components/myComponents/NoteSearchAdd";
import Notes from "@/components/myComponents/Notes";
import NoNote from "@/components/myComponents/NoNote";
import AddNoteDialog from "./AddNoteDialog";
import { useState } from "react";

const SectionOfNotes = () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    return (
        <>
            <TaskHeading title="MY NOTES" subtitle="Keep your thoughts." description="Quick notes, always within reach." />
            <NoteSearchAdd onOpenForm={() => setIsAddOpen(true)} />
            <AddNoteDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
            <NoNote />
            <Notes />
        </>
    )
}

export default SectionOfNotes