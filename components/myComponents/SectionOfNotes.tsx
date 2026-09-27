import TaskHeading from "@/components/myComponents/TaskHeading";
import NoteSearchAdd from "@/components/myComponents/NoteSearchAdd";
import Notes from "@/components/myComponents/Notes";

const SectionOfNotes = () => {
    return (
        <>
            <TaskHeading title="MY NOTES" subtitle="Keep your thoughts." description="Quick notes, always within reach." />
            <NoteSearchAdd />
            <Notes />
        </>
    )
}

export default SectionOfNotes