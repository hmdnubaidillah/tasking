import { DatePicker } from "./ui/datePicker";
import { Button } from "./ui/button";

export default function CalendarComp() {
  return (
    <div className="mt-3 bg-white p-4 border border-gray-300 rounded-sm flex items-center justify-between">
      <DatePicker />
      <div className="flex gap-2 ml-2">
        <Button className="bg-zinc-500 hover:bg-zinc-400 text-sm">Find</Button>
        <Button className="bg-slate-400 hover:bg-slate-500">Today</Button>
      </div>
    </div>
  );
}
