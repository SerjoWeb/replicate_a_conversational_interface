export default function Inbox() {
  return (
    <div className="w-full pb-[10px] border-b border-gray-divider">
      <h6 className="text-xl font-semibold">Inbox</h6>
      <div className="w-full flex items-center gap-x-[10px]">
        <p className="font-semibold text-gray-text">Total: 128</p>
        <p className="text-sm text-orange-text">Unread: 24</p>
      </div>
    </div>
  );
};
