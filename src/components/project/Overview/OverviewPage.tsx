import { Project } from "@/types/kanban";

interface OverviewPageProps {
  project: Project;
}

const OverviewPage = ({ project }: OverviewPageProps) => {
  return (
    <section className="h-screen m-4 space-y-8">
      <section className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Project Overview</h2>
        <div className="flex gap-8 items-center">
          <p className="border-2 border-lime-700 rounded-md bg-white py-1 px-4">
            Start Date: {project.startDate}
          </p>
          <p className="border-2 border-red-700 rounded-md bg-white py-1 px-4">
            Due Date: {project.dueDate}
          </p>
        </div>
      </section>
      <p className="text-xl">{project.description}</p>
      <section className="grid grid-cols-4 gap-8">
        <div className="bg-white border-2 rounded-md py-8 px-12 text-base">
          Last 7 days :
        </div>
        <div className="bg-white border-2 rounded-md py-8 px-12 text-base">
          Last 30 days :
        </div>
        <div className="bg-white border-2 rounded-md py-8 px-12 text-base">
          Last 7 days :
        </div>
        <div className="bg-white border-2 rounded-md py-8 px-12 text-base">
          Last 30 days :
        </div>
      </section>
      <section className="grid grid-cols-2 gap-8">
        <div className="bg-white border-2 rounded-md py-8 px-12 text-base h-80">
          General Statistics :
        </div>
        <div className="bg-white border-2 rounded-md py-8 px-12 text-base ">
          Latest Activiy :
        </div>
      </section>
    </section>
  );
};

export default OverviewPage;
