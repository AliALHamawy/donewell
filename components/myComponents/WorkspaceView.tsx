"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import SectionOfTasks from "@/components/myComponents/SectionOfTasks";
import SectionOfNotes from "@/components/myComponents/SectionOfNotes";
import { useSearchParams } from "next/dist/client/components/navigation";
import { useEffect } from "react";
import { setView } from "@/store/viewSlice";

export default function WorkspaceView() {
    const dispatch = useAppDispatch();
    const activeView = useAppSelector((state) => state.view.activeView);
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    useEffect(() => {
        // إذا كان الرابط يطلب notes ولم تكن الحالة مطابقة، نقوم بتحديث الـ Redux
        if (tabParam === "notes" && activeView !== "notes") {
            dispatch(setView("notes"));
        } else if ((!tabParam || tabParam === "tasks") && activeView !== "tasks") {
            dispatch(setView("tasks"));
        }
    }, [tabParam, activeView, dispatch]);

    return (
        <>
            {activeView === "tasks" ? <SectionOfTasks /> : <SectionOfNotes />}
        </>
    );
}