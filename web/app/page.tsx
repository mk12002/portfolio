export default function Home() {
  return (
    <div className="container py-24">
      <h1 className="text-5xl font-bold text-white leading-tight">
        Welcome to <span className="text-ml-vision">Mohit's ML Systems Lab</span>
      </h1>

      <p className="text-gray-300 text-lg mt-6 max-w-2xl">
        Applied Machine Learning · Hybrid Legal AI · Multi-Agent Systems · 
        Vision Models · Healthcare AI · AgriTech Intelligence.
      </p>

      <div className="mt-10 flex gap-6">
        <a
          href="/projects"
          className="px-6 py-3 bg-ml-vision rounded-lg text-black font-semibold shadow hover:bg-ml-vision/80 transition"
        >
          View Projects
        </a>

        <a
          href="/resume"
          className="px-6 py-3 border border-ml-vision rounded-lg text-ml-vision font-semibold hover:bg-ml-vision/10 transition"
        >
          View Resume
        </a>
      </div>
    </div>
  );
}
