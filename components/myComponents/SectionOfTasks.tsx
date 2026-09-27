import TaskHeading from "@/components/myComponents/TaskHeading";
import TasksSection from "@/components/myComponents/TasksSection";

const SectionOfTasks = () => {
    return (
        <>
            <TaskHeading title="MY TASKS" subtitle="What needs doing?" description="One clear list for a focused day." />
            <TasksSection />
        </>
    )
}

export default SectionOfTasks