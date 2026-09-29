"use client"
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { createNote, updateNote } from "@/app/actions/notes";

interface AddNoteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onNoteAdded?: (updatedNote?: any) => void;
    noteToEdit?: any;
}

const AddNoteDialog = ({ open, onOpenChange, onNoteAdded, noteToEdit }: AddNoteDialogProps) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // تعبئة الحقول فقط عند فتح النافذة بناءً على الملاحظة المراد تعديلها أو تركها فارغة للإضافة
    useEffect(() => {
        if (open) {
            if (noteToEdit) {
                setTitle(noteToEdit.title || '');
                setContent(noteToEdit.content || '');
            } else {
                setTitle('');
                setContent('');
            }
            setError(null);
        }
    }, [open, noteToEdit]);

    const handleOpenChange = (isOpen: boolean) => {
        // إذا أردت تفريغ الحقول فقط عند الإغلاق التام للنافذة
        if (!isOpen) {
            setError(null);
            // ملاحظة: لا نفرغ title و content هنا فجأة لكي لا نحذف بيانات المستخدم إذا حصل رندر مفاجئ
        }
        onOpenChange(isOpen);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        let result;
        if (noteToEdit) {
            result = await updateNote(noteToEdit.id, formData);
        } else {
            result = await createNote(formData);
        }

        setIsSubmitting(false);

        if (result?.error) {
            setError(result.error);
        } else {
            onOpenChange(false);
            onNoteAdded?.();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {noteToEdit ? "Edit note" : "New note"}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">
                        The title is optional.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    {/* حقل العنوان */}
                    <input
                        type="text"
                        placeholder="Title (optional)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md border border-emerald-500/50 bg-background px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-foreground placeholder:text-muted-foreground"
                    />

                    {/* حقل المحتوى */}
                    <textarea
                        placeholder="Write your note..."
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full rounded-md border border-emerald-500/50 bg-background px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-foreground placeholder:text-muted-foreground resize-none"
                    />

                    {/* الأزرار */}
                    <div className="flex justify-end gap-3 pt-2">
                        <DialogClose
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium rounded-md border border-border bg-transparent hover:bg-muted transition-colors cursor-pointer disabled:opacity-50"
                        >
                            Cancel
                        </DialogClose>
                        <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-emerald-500 text-black hover:bg-emerald-600 transition-colors cursor-pointer disabled:opacity-50 font-semibold"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    {noteToEdit ? "Saving..." : "Adding..."}
                                </>
                            ) : (
                                noteToEdit ? "Save changes" : "Add note"
                            )}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddNoteDialog;