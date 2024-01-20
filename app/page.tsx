import CardTask from "@/components/CardTask";

export default function Home() {
  return (
    <main className="bg-whiteBlue text-textPrimary">
      <div className="pt-[100px] sm:w-[80%] w-[90%] m-auto h-[150vh]">
        <section className="flex flex-col gap-5">
          <CardTask />
        </section>
      </div>
    </main>
  );
}
