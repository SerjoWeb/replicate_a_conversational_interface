interface LeadStatusProps {
  color: string;
  status: string;
}

export default function LeadStatus({ color, status }: LeadStatusProps) {
  return (
    <div
      className="flex justify-center items-center rounded-full py-[2px] px-[10px] w-fit h-[20px] text-xs text-white"
      style={{ backgroundColor: color }}
    >
      {status}
    </div>
  );
};
