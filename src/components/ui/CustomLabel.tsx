interface CustomLabelProps {
  label: string;
  icon?: string;
  variant: "red" | "green" | "orange" | "primary" | "secondary";
}

const CustomLabel = ({ label, icon, variant }: CustomLabelProps) => {
  let baseClasses =
    "flex items-center gap-2 px-2 py-1 rounded-md border-2 font-sm focus:outline-none";

  switch (variant) {
    case "primary":
      baseClasses += " border-primary text-primary";
      break;
    case "secondary":
      baseClasses += " border-secondary text-secondary";
      break;
    case "red":
      baseClasses += " border-red-700 text-red-700";
      break;
    case "green":
      baseClasses += " border-lime-700 text-lime-700";
      break;
    case "orange":
      baseClasses += " border-orange-700 text-orange-700";
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
