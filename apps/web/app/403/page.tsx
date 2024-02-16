import Link from "next/link";

export default function Unauthorized() {
  return (
    <>
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <section className="flex items-center h-full p-16 text-gray-100">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
                <span className="sr-only">Forbidden</span>403
              </h2>
              <p className="text-2xl font-semibold md:text-3xl">
                Sorry, You do not have the permission to access this page.
              </p>
              <p className="mt-4 mb-8 text-gray-400">
                Please click the button below to go back.
              </p>
              <Link
                href="/"
                className="px-8 py-3 font-semibold rounded bg-red-400 text-gray-900"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
