"use client";

import NoTasks from "@/components/myComponents/NoTasks";
import Task from "@/components/myComponents/Task";
import TaskForm from "@/components/myComponents/TaskForm";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TaskType {
    id: string;
    title: string;       // تم تعديلها لتوافق عمود Supabase
    is_completed: boolean; // تم تعديلها لتوافق عمود Supabase
    user_id: string;
}

const TasksSection = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setTasks([]);
                return;
            }

            const { data, error } = await supabase
                .from("tasks")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setTasks(data || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();

        // 💡 الاستماع للتغيرات في جدول tasks عبر Supabase Realtime
        const channel = supabase
            .channel("public:tasks")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "tasks" },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        const newTask = payload.new as TaskType;
                        setTasks((prev) => {
                            if (prev.some((t) => t.id === newTask.id)) return prev;
                            return [newTask, ...prev];
                        });
                    } else if (payload.eventType === "UPDATE") {
                        const updatedTask = payload.new as TaskType;
                        setTasks((prev) =>
                            prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
                        );
                    } else if (payload.eventType === "DELETE") {
                        const deletedId = payload.old.id;
                        setTasks((prev) => prev.filter((t) => t.id !== deletedId));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // إضافة مهمة محلياً فوراً
    const handleTaskAdded = useCallback((newTask: TaskType) => {
        setTasks((prev) => {
            if (prev.some((t) => t.id === newTask.id)) return prev;
            return [newTask, ...prev];
        });
    }, []);

    // تحديث حالة المهمة محلياً (Optimistic Update)
    const handleStatusChange = useCallback((updatedTask: TaskType) => {
        setTasks((prev) =>
            prev.map((item) => (item.id === updatedTask.id ? updatedTask : item))
        );
    }, []);

    // حذف المهمة محلياً
    const handleTaskDeleted = useCallback((deletedId: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== deletedId));
    }, []);

    const filteredTasks = tasks.filter((item) => {
        const matchesFilter =
            filter === "all"
                ? true
                : filter === "active"
                    ? !item.is_completed
                    : item.is_completed;

        const matchesSearch = item.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const completedCount = tasks.filter((t) => t.is_completed).length;

    return (
        <div className="flex w-full flex-col gap-3">
            {/* نموذج الإضافة */}
            <TaskForm onTaskAdded={handleTaskAdded} />

            {/* أزرار الفلاتر والبحث */}
            <div className="flex flex-col md:flex-row gap-2 w-full justify-between mt-2">
                <div className="flex rounded-lg bg-muted p-1 gap-px" aria-label="Task filters">
                    <button
                        onClick={() => setFilter("all")}
                        className={`inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-colors h-8 rounded-md px-3 text-xs ${
                            filter === "all"
                                ? "bg-card/60 text-secondary-foreground shadow-sm"
                                : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("active")}
                        className={`inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-colors h-8 rounded-md px-3 text-xs ${
                            filter === "active"
                                ? "bg-card/60 text-secondary-foreground shadow-sm"
                                : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={`inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-colors h-8 rounded-md px-3 text-xs ${
                            filter === "completed"
                                ? "bg-card/60 text-secondary-foreground shadow-sm"
                                : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                    >
                        Completed
                    </button>
                </div>

                <div className="relative sm:w-64 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-search absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    >
                        <path d="m21 21-4.34-4.34"></path>
                        <circle cx="11" cy="11" r="8"></circle>
                    </svg>
                    <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9"
                        placeholder="Search tasks"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* قائمة المهام */}
            <section className="mt-5 overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-panel)">
                {loading ? (
                    <div className="p-6 text-center text-sm text-muted-foreground">
                        Loading tasks...
                    </div>
                ) : filteredTasks.length > 0 ? (
                    <AnimatePresence initial={false} mode="popLayout">
                        {filteredTasks.map((t) => (
                            <motion.div
                                key={t.id}
                                layout
                                initial={{ opacity: 0, height: 0, y: -15 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="border-b border-border last:border-b-0"
                            >
                                <Task
                                    taskData={t}
                                    onDelete={() => handleTaskDeleted(t.id)}
                                    onStatusChange={handleStatusChange}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (
                    <NoTasks />
                )}
            </section>

            <p className="text-sm text-muted-foreground">
                {completedCount} of {tasks.length} tasks completed
            </p>
        </div>
    );
};

export default TasksSection;