import { DatePicker } from "./ui/datePicker";
import { Button } from "./ui/button";

export default function CalendarComp() {
  return (
    <div className="mt-3 bg-white p-4 border border-gray-300 rounded-sm flex flex-col items-center justify-between">
      <DatePicker />
      <div className="w-full flex gap-2 mt-3">
        <Button className="bg-slate-400 hover:bg-slate-500 w-full">Today</Button>
        <Button className="bg-zinc-500 hover:bg-zinc-400 text-sm w-full">Find</Button>
      </div>
    </div>
  );
}
