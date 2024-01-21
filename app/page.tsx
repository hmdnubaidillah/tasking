import CardTask from "@/components/CardTask";
import ProfileBar from "@/components/ProfileBar";
import CalendarComp from "@/components/Calendar";
import DateBadge from "@/components/DateBadge";

export default function Home() {
  return (
    <main className="bg-whiteBlue text-textPrimary">
      <div className="py-[100px] sm:w-[80%] w-[90%] m-auto gap-5 justify-between flex flex-col">
        <section className="flex sm:flex-row flex-col-reverse gap-5">
          <div className="flex flex-col gap-5 sm:w-[68%] w-full">
            <DateBadge />
            <CardTask />
          </div>
          <div className="sm:w-[31%]">
            <ProfileBar />
            <CalendarComp />
          </div>
        </section>
      </div>
    </main>
  );
}
