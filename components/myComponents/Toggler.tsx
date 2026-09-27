"use client";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setView } from "@/store/viewSlice"
import { useRouter, useSearchParams } from "next/navigation";

const Toggler = () => {
    const activeView = useAppSelector((state) => state.view.activeView)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const SearchParams = useSearchParams()

    const hasndleSwitch = (view: "tasks" | "notes") => {

        dispatch(setView(view))

        router.push(`?tab=${view}`, { scroll: false });

    }

    return (
        <div className="flex rounded-lg bg-muted p-1 gap-px" aria-label="Task filters">
            <button
                onClick={() => hasndleSwitch("tasks")}
                className={cn("inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-colors h-8 rounded-md px-3 text-xs" ,
                    activeView === "tasks"
                        ? "bg-card/60 text-secondary-foreground shadow-sm"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
            >
                Tasks
            </button>
            <button
                onClick={() => hasndleSwitch("notes")}
                className={cn("inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-colors h-8 rounded-md px-3 text-xs" ,
                    activeView === "notes"
                        ? "bg-card/60 text-secondary-foreground shadow-sm"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
            >
                Notes
            </button>
            
        </div >
    )
}

export default Toggler