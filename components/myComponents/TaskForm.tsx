"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "@/components/ui/toast";

interface TaskType {
    id: string;
    title: string;
    is_completed: boolean;
    user_id: string;
}

interface TaskFormProps {
    onTaskAdded?: (newTask: TaskType) => void;
}

const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
    const [task, setTask] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!task.trim()) {
            toast.add({
                type: "error",
                title: "Empty task",
                description: "Please enter a task description before submitting.",
            });
            return;
        }

        if (loading) return;

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.add({
                    type: "error",
                    title: "Authentication required",
                    description: "Please sign in to add tasks.",
                });
                return;
            }

            const { data, error } = await supabase
                .from("tasks")
                .insert([
                    {
                        title: task.trim(),
                        is_completed: false,
                        user_id: user.id,
                    },
                ])
                .select()
                .single();

            if (error) throw error;

            setTask("");

            toast.add({
                type: "success",
                title: "Task added",
                description: "Your task has been successfully created.",
            });

            if (onTaskAdded && data) {
                onTaskAdded(data);
            }
        } catch (err: any) {
            toast.add({
                type: "error",
                title: "Failed to add task",
                description: err?.message || "Could not save the task to the server.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="flex gap-2 rounded-xl border border-border bg-card p-2 shadow-(--shadow-panel) w-full"
            onSubmit={handleSubmit}
            noValidate
        >
            <input
                className="flex w-full rounded-md border-input px-3 py-1 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 md:text-sm h-12 border-0 bg-transparent shadow-none"
                placeholder="Add a new task…"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 h-12 shrink-0 px-4 sm:px-6 disabled:opacity-50"
                type="submit"
            >
                {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <Plus className="size-4" />
                )}
                <span className="hidden sm:inline">Add task</span>
            </button>
        </form>
    );
};

export default TaskForm;