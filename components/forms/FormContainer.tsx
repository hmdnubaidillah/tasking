import React from "react";

export default function FormContainer({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <main className="grid place-content-center h-screen bg-secondaryBlue text-textPrimary">
      <section className="flex flex-col gap-3 bg-white h-fit sm:w-[400px] w-[300px] p-5 shadow-md rounded-lg ">
        <h1 className="text-2xl font-medium text-center my-2">{title}</h1>
        {children}
      </section>
    </main>
  );
}
