import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid place-content-center h-screen text-textPrimary bg-secondaryBlue">
      <div className="text-center bg-white p-5 rounded-md">
        <h1 className="text-3xl font-semibold">404 Page Not Found</h1>
        <h2 className="text-xl font-medium">Looks like you{"'"}re lost</h2>
        <Link className="text-primaryBlue hover:underline" href={"/"}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
