"use client";

import { useAppSelector } from "@/store/hooks";
import SectionOfTasks from "@/components/myComponents/SectionOfTasks";
import SectionOfNotes from "@/components/myComponents/SectionOfNotes";

export default function WorkspaceView() {
    const activeView = useAppSelector((state) => state.view.activeView);

    return (
        <>
            {activeView === "tasks" ? <SectionOfTasks /> : <SectionOfNotes />}
        </>
    );
}