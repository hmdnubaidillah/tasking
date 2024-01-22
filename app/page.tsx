import Nav from "@/components/Nav";
import CardTask from "@/components/CardTask";
import ProfileBar from "@/components/ProfileBar";
import CalendarComp from "@/components/Calendar";
import DateBadge from "@/components/DateBadge";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-whiteBlue text-textPrimary">
        <div className="py-[100px] sm:w-[80%] w-[90%] m-auto gap-5 justify-between flex flex-col">
          <section className="flex sm:flex-row flex-col-reverse gap-5 relative">
            <div className="flex flex-col gap-3 sm:w-[68%] w-full">
              <DateBadge />
              <CardTask />
            </div>

            <aside className="sm:w-[31%]">
              <ProfileBar />
              <CalendarComp />
            </aside>
          </section>
        </div>
        <ScrollToTop />
      </main>
    </>
  );
}
