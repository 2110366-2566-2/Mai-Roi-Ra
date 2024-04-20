import GroupsIcon from "@mui/icons-material/Groups";

interface Participant {
  username: string;
  user_image: string;
  first_name: string;
  last_name: string;
  num_participant: number;
}

interface Props {
  participant: Participant;
  onClick: (participant: Participant) => void;
}

export default function ParticipantListItem({ participant, onClick }: Props) {
  return (
    <div
      className="flex items-center space-x-4 border-b border-gray-200 justify-between py-4 hover:bg-gray-200 px-4"
      onClick={() => onClick(participant)}
    >
      <div className="flex items-center w-full">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={participant.user_image || "/img/profile_picture.png"}
          alt={`${participant.first_name} ${participant.last_name}`}
        />
        <div className="flex flex-col ml-3">
          <p className="font-bold text-sm">{participant.username}</p>
          <p className="text-sm text-gray-500">
            {participant.first_name} {participant.last_name}
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <GroupsIcon className="mr-4" />
        <span>{participant.num_participant}</span>
      </div>
    </div>
  );
}