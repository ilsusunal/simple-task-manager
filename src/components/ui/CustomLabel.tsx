interface CustomLabelProps {
  label: string;
  icon?: string;
  variant: "red" | "green" | "orange" | "primary" | "secondary" | "basic";
}

const CustomLabel = ({ label, icon, variant }: CustomLabelProps) => {
  let baseClasses =
    "flex items-center gap-2 px-2 py-1  font-sm focus:outline-none";

  switch (variant) {
    case "primary":
      baseClasses += " rounded-md border-2  border-primary text-primary";
      break;
    case "secondary":
      baseClasses += " rounded-md border-2 border-secondary text-secondary";
      break;
    case "red":
      baseClasses += " rounded-md border-2 border-red-700 text-red-700";
      break;
    case "green":
      baseClasses += " rounded-md border-2 border-lime-700 text-lime-700";
      break;
    case "orange":
      baseClasses += " rounded-md border-2 border-orange-700 text-orange-700";
      break;
    case "basic":
      baseClasses += " bg-white rounded-full w-10 font-bold text-gray-400";
      break;
    default:
      break;
  }

  return (
    <>
      <div className={`${baseClasses}`}>
        <i className={`ri-${icon}`} />
        <p>{label}</p>
      </div>
    </>
  );
};

export default CustomLabel;
