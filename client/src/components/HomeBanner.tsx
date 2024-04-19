export default function HomeBanner() {
  return (
    <div className="h-screen w-screen relative">
      <img
        className="h-full w-full"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/c1366fb4-3292-4428-9639-b73f25539794/778c38e4-3f42-43f9-899c-0b65e2a1a5b1/US-en-20240408-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="banner"
      />
      <div className="absolute h-full w-full bg-black bg-opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-bold text-5xl">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-white text-3xl mt-3">
            Watch anywhere, Cancel anytime
          </p>
          <div className="mt-8">
            <a
              href="/login"
              className="bg-red-700 mt-8 text-white p-4 px-16 text-lg rounded font-semibold hover:bg-red-900"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
