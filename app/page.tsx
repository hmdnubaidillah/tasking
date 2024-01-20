import CardTask from "@/components/CardTask";
import ProfileBar from "@/components/ProfileBar";
import CalendarComp from "@/components/Calendar";

export default function Home() {
  return (
    <main className="bg-whiteBlue text-textPrimary">
      <div className="py-[100px] sm:w-[80%] w-[90%] m-auto gap-5 flex sm:flex-row flex-col-reverse justify-between">
        <section className="flex flex-col gap-5 sm:w-[68%] w-full">
          <CardTask />
        </section>
        <section className="sm:w-[31%]">
          <ProfileBar />
          <CalendarComp />
        </section>
      </div>
    </main>
  );
}
