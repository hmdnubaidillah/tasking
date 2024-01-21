import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = {
  title: "Tasking | Register",
};

export default function page() {
  return (
    <main className="grid place-content-center h-screen bg-secondaryBlue text-textPrimary">
      <section className="flex flex-col gap-3 bg-white h-fit sm:w-[350px] w-[300px] p-5 shadow-md rounded-lg ">
        <h1 className="text-2xl font-medium text-center my-5">Make an account</h1>
        <RegisterForm />
      </section>
    </main>
  );
}
