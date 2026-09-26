import TaskForm from "@/components/myComponents/TaskForm";
import TaskHeading from "@/components/myComponents/TaskHeading";
import TasksSection from "@/components/myComponents/TasksSection";

export default function Home() {

  return (
    <>
      <div className="max-w-3xl w-full m-auto flex flex-col items-start justify-center gap-8 p-3">
        <TaskHeading />
        <TasksSection />
      </div>
    </>
  );
}
