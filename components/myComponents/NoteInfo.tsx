"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";

interface NoteInfoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    note: any;
    onEdit: () => void;
    onDelete: () => void;
}

const NoteInfo = ({ open, onOpenChange, note, onEdit, onDelete }: NoteInfoProps) => {
    if (!note) return null;

    const formattedDate = new Date(note.created_at).toLocaleDateString();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-card border-border max-h-[85vh] flex flex-col">
                <DialogHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
                    <div>
                        <DialogTitle className="text-sm font-medium text-muted-foreground">Note</DialogTitle>
                    </div>
                    {/* أزرار التعديل والحذف في الأعلى مثل الصورة */}
                    <div className="flex items-center gap-2 pr-6">
                        <button
                            onClick={() => {
                                onOpenChange(false);
                                onEdit();
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md border border-border hover:bg-muted transition-colors cursor-pointer text-foreground"
                        >
                            <Pencil className="size-3.5" />
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                onOpenChange(false);
                                onDelete();
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
                        >
                            <Trash className="size-3.5" />
                            Delete
                        </button>
                    </div>
                </DialogHeader>

                {/* محتوى الملاحظة مع إمكانية التمرير (Scroll) إذا كانت طويلة */}
                <div className="overflow-y-auto py-4 space-y-3 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <h3 className="text-xl font-bold text-foreground break-words">
                        {note.title || "No Title"}
                    </h3>
                    <p className="text-xs text-muted-foreground">{formattedDate}</p>
                    
                    <div className="pt-2 text-sm text-muted-foreground whitespace-pre-wrap break-words leading-relaxed">
                        {note.content}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NoteInfo;