import { Folder, LucideIcon } from "lucide-react";

interface CreationCarpProp {
  icon: LucideIcon;
  label: string;
}
export const CreationCard = ({ icon: Icon, label }: CreationCarpProp) => {
  return (
    <div className="w-[150px] py-4 cursor-pointer hover:bg-gray-300/20 rounded-md gap-3 border h-auto px-4   flex flex-col items-start">
      <Icon size="16" />
      <p className="text-xs">{label}</p>
    </div>
  );
};
