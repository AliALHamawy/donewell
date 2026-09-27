
import SectionOfNotes from "@/components/myComponents/SectionOfNotes";
import SectionOfTasks from "@/components/myComponents/SectionOfTasks";
import Toggler from "@/components/myComponents/Toggler";
import WorkspaceView from "@/components/myComponents/WorkspaceView";
import { ClientProviders } from "@/store/ClientProviders";

interface PageProps {
  searchParams: Promise<{tap?: "tasks" | "notes"}>;
}

export default async function Home({ searchParams }: PageProps) {

  const params = await searchParams;

  const currentView = params.tap === "notes" ? "notes" : "tasks";

  return (
    <>
    <ClientProviders initialView={currentView}>

      <div className="max-w-3xl w-full m-auto flex flex-col items-start justify-center gap-8 p-3">
        <Toggler />
        <WorkspaceView />
      </div>
    </ClientProviders>
    </>
  );
}
