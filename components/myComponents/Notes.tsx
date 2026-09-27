import { File } from "lucide-react";

const Notes = () => {
    return (
        <div className="w-full flex min-h-64 flex-col items-center justify-center rounded-xl border border-border bg-card px-6 text-center shadow-[var(--shadow-panel)]">
            <span className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground" data-tsd-source="/src/components/notes-view.tsx:133:13">
                <File className="size-6" />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold">No notes yet</h2>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">Create your first note to get started.</p>
        </div>
    )
}

export default Notes