import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  title,
  link,
  image,
  type,
}: {
  title: string;
  type: string;
  link: string;
  image: string;
}) {
  return (
    <article
      className="
        group relative m-4 w-[45%] min-w-2xs
        cursor-pointer
        overflow-hidden
        border border-gray-200
        bg-white
        p-2
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-gray-300
        hover:shadow-[5px_5px_0px_#193cb8]
      "
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-[1.03]
          "
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0
            bg-black/0
            transition-colors duration-300
            group-hover:bg-black/40
          "
        />

        {/* Hover content */}
        <div
          className="
            absolute inset-x-0 bottom-0
            translate-y-3
            p-5
            opacity-0
            transition-all duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs text-white/70">{type}</p>

          <div className="mt-4 flex items-center gap-2">
            {/* Github */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                bg-white
                px-4 py-2
                text-sm font-medium text-gray-900
                transition-colors
                hover:bg-gray-100
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              GitHub
            </a>

            {/* Project */}
            <Link
              href={`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`}
              className="
                inline-flex items-center gap-2
                border border-white/70
                px-4 py-2
                text-sm font-medium text-white
                transition-colors
                hover:bg-white
                hover:text-gray-900
              "
            >
              View project
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom information */}
      <div className="flex items-center justify-between px-2 py-4">
        <h3 className="text-lg font-semibold tracking-tight text-gray-900">
          {title}
        </h3>

        <ArrowUpRight
          size={18}
          className="
            text-gray-400
            transition-all duration-300
            group-hover:-translate-y-1
            group-hover:translate-x-1
            group-hover:text-blue-800
          "
        />
      </div>
    </article>
  );
}
