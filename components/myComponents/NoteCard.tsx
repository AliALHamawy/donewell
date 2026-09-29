"use client"
import { useState } from "react";
import { Pencil, Trash, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import AddNoteDialog from "./AddNoteDialog"; // تأكد من مطابقة المسار الصحيح لملف نافذة الإضافة/التعديل
import NoteInfo from "./NoteInfo";

const NoteCard = ({ note, onDelete, onNoteUpdated }: { note: any; onDelete?: (id: string) => Promise<void>; onNoteUpdated?: () => void }) => {
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openView, setOpenView] = useState<boolean>(false);

    const formattedDate = new Date(note.created_at).toLocaleDateString();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            if (onDelete) {
                await onDelete(note.id);
            }
            setOpenDelete(false);
            setOpenView(false);
        } catch (error) {
            console.error("Error deleting note:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <article
                role="button"
                className="group flex cursor-pointer flex-col rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-panel)] transition-all hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setOpenView(true)}
            >
                <h3 className="truncate font-display text-lg font-semibold text-foreground">
                    {note.title || "No Title"}
                </h3>
                <p className="mt-2 line-clamp-1 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                    {note.content}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground">{formattedDate}</span>
                    <div className="flex gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenEdit(true); // فتح نافذة التعديل
                            }}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground size-8"
                            aria-label="Edit note"
                        >
                            <Pencil className="size-4" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDelete(true);
                            }}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent size-8 text-destructive hover:text-destructive"
                            aria-label="Delete note"
                        >
                            <Trash className="size-4" />
                        </button>
                    </div>
                </div>
            </article>

            {/* نافذة التعديل (نفس نافذة الإضافة مع تمرير بيانات الملاحظة الحالية) */}
            <AddNoteDialog
                open={openEdit}
                onOpenChange={setOpenEdit}
                noteToEdit={note}
                onNoteAdded={onNoteUpdated}
            />

            <NoteInfo
                open={openView}
                onOpenChange={setOpenView}
                note={note}
                onEdit={() => {
                    setOpenView(false);
                    // استخدام setTimeout بسيط جداً لمنع تداخل الحركات (Animations) الخاصة بالديالوج
                    setTimeout(() => {
                        setOpenEdit(true);
                    }, 100);
                }}
                onDelete={() => setOpenDelete(true)}
            />
    
            {/* نافذة تأكيد الحذف */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent className="sm:max-w-[400px] border-border bg-card">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Delete Note</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm">
                            Are you sure you want to delete this note? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-end gap-3 pt-4">
                        <DialogClose
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium rounded-md border border-border bg-transparent hover:bg-muted transition-colors cursor-pointer disabled:opacity-50"
                        >
                            Cancel
                        </DialogClose>
                        <button
                            type="button"
                            disabled={isDeleting}
                            onClick={handleDelete}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NoteCard;