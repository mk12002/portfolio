import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCard({ p }: { p: any }) {
  const colorClass =
    p.category === "Vision"
      ? "text-ml-vision"
      : p.category === "Audio"
      ? "text-ml-audio"
      : "text-ml-reason";

  return (
    <motion.article whileHover={{ scale: 1.02 }} className="gradient-border p-4 rounded-lg bg-ml-surface">
      <h3 className={`font-semibold text-lg ${colorClass}`}>{p.title}</h3>
      <p className="mt-2 text-sm text-gray-300">{p.shortTagline}</p>

      <div className="mt-3 flex gap-2 flex-wrap">
        {p.tags?.map((t: string) => (
          <span key={t} className="text-xs px-2 py-1 bg-[rgba(255,255,255,0.03)] rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link href={`/projects/${p.slug}`} className="text-sm underline">
          View details
        </Link>
        <span className="text-xs text-gray-400">{p.primaryMetric}</span>
      </div>
    </motion.article>
  );
}
