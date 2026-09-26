"use client";

import { memo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Ellipsis, Pencil, Trash, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

interface TaskProps {
  taskData?: {
    id: string;
    title: string;
    is_completed: boolean;
    user_id: string;
  };
  onDelete?: () => void;
  onStatusChange?: (updatedTask: { id: string; title: string; is_completed: boolean; user_id: string }) => void;
}

const Task = memo(({ taskData, onDelete, onStatusChange }: TaskProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [taskText, setTaskText] = useState(taskData?.title || "");
  const [isCompleted, setIsCompleted] = useState<boolean>(
    taskData?.is_completed ?? false
  );

  // 1. تغيير حالة الـ Checkbox
  const handleToggleComplete = async (checked: boolean) => {
    setIsCompleted(checked);
    if (!taskData?.id) return;

    const updated = { 
      id: taskData.id, 
      title: taskText, 
      is_completed: checked, 
      user_id: taskData.user_id 
    };

    if (onStatusChange) {
      onStatusChange(updated);
    }

    try {
      const { error } = await supabase
        .from("tasks")
        .update({ is_completed: checked })
        .eq("id", taskData.id);

      if (error) throw error;

      toast.add({
        type: "success",
        title: checked ? "Task completed" : "Task reactivated",
        description: checked ? "Great job finishing this task!" : "Task marked as active.",
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      setIsCompleted(!checked);

      if (onStatusChange) {
        onStatusChange({ 
          id: taskData.id, 
          title: taskText, 
          is_completed: !checked, 
          user_id: taskData.user_id 
        });
      }

      toast.add({
        type: "error",
        title: "Update failed",
        description: "Could not update task status.",
      });
    }
  };

  // 2. تعديل نص المهمة
  const handleEditTask = async () => {
    if (!taskData?.id) return;

    if (!taskText.trim()) {
      toast.add({
        type: "error",
        title: "Empty task",
        description: "Task title cannot be empty.",
      });
      return;
    }

    try {
      setIsUpdating(true);
      const { error } = await supabase
        .from("tasks")
        .update({ title: taskText.trim() })
        .eq("id", taskData.id);

      if (error) throw error;

      if (onStatusChange) {
        onStatusChange({
          id: taskData.id,
          title: taskText.trim(),
          is_completed: isCompleted,
          user_id: taskData.user_id,
        });
      }

      setOpenEdit(false);

      toast.add({
        type: "success",
        title: "Task updated",
        description: "Changes saved successfully.",
      });
    } catch (error) {
      console.error("Error updating task text:", error);
      toast.add({
        type: "error",
        title: "Update failed",
        description: "Could not update the task title.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // 3. حذف المهمة
  const handleDelete = async () => {
    if (!taskData?.id) return;

    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskData.id);

      if (error) throw error;

      setOpenDelete(false);

      if (onDelete) onDelete();

      toast.add({
        type: "info",
        title: "Task deleted",
        description: "The task has been permanently removed.",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.add({
        type: "error",
        title: "Deletion failed",
        description: "Failed to delete the task. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="group flex min-h-16 items-center gap-4 px-4 transition-colors hover:bg-muted/45 sm:px-5">
        <div className="flex gap-5 items-center">
          <Checkbox
            className="shrink-0 cursor-pointer"
            checked={isCompleted}
            onCheckedChange={(checked) => handleToggleComplete(!!checked)}
          />
          <span
            className={`text-sm transition-all ${
              isCompleted
                ? "line-through text-muted-foreground"
                : "text-foreground"
            }`}
          >
            {taskText}
          </span>
        </div>

        {/* قائمة الخيارات */}
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-primary/10">
            <Ellipsis className="size-5" />
            <span className="sr-only">Open menu</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-32 bg-card space-y-1">
            <DropdownMenuItem
              onClick={() => setOpenEdit(true)}
              className="cursor-pointer flex items-center gap-2"
            >
              <Pencil className="size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenDelete(true)}
              className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive"
            >
              <Trash className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dialog التعديل */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit task</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Update the title for this task.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="w-full rounded-md border border-emerald-500/50 bg-background px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />

            <div className="flex justify-end gap-3">
              <DialogClose
                disabled={isUpdating}
                className="px-4 py-2 text-sm font-medium rounded-md border border-border bg-transparent hover:bg-muted transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </DialogClose>
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleEditTask}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-emerald-500 text-black hover:bg-emerald-600 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog الحذف */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Delete Task</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Are you sure you want to delete this task? This action cannot be undone.
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
});

Task.displayName = "Task";

export default Task;