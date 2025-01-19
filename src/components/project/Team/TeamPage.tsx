import Avatar from "@/components/ui/Avatar";
import { Team } from "@/types/kanban";

interface TeamPageProps {
  team: Team;
}

const TeamPage = ({ team }: TeamPageProps) => {
  return (
    <div className="space-y-12 h-screen">
      <section className="text-base">
        <h2 className="text-xl font-bold mb-2">{team.title}</h2>
        <p>{team.description}</p>
        <div className="flex gap-8 flex-wrap mt-4">
          {team.teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col bg-white py-8 px-12 rounded-lg items-center gap-4"
            >
              <Avatar
                src={member.avatar.src}
                alt={member.avatar.alt}
                size={80}
              />
              <p className="font-semibold my-4">{member.fullName}</p>
              <p>{member.title}</p>
              <p className="text-sm">{member.email}</p>
            </div>
          ))}
        </div>
      </section>
      {/* <section>
        <h2 className="text-xl font-bold mb-2">Assignees From Other Teams</h2>
      </section> */}
    </div>
  );
};
export default TeamPage;
