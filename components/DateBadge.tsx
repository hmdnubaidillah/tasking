import moment from "moment";

export default function DateBadge() {
  const today = moment(new Date()).format("DD MMM YYYY");

  return (
    <div className="w-full bg-white border border-gray-300 p-3 text-textPrimary flex items-center gap-2 rounded-sm">
      <h1 className="text-lg font-normal">Date : </h1>
      <h1 className="text-lg font-medium">{today}</h1>
    </div>
  );
}
