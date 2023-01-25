import React from "react";
import type { Movie } from "~/types/movie";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const Index: React.FC<Movie> = ({
  id,
  title,
  overview,
  vote_average,
  poster_path,
  release_date,
  backdrop_path,
}) => {
  return (
    <>
      <div className="mb-2 w-80">
        <div className="h-30 w-80 mb-2 rounded-2xl overflow-clip">
          <Image
            src={`${BASE_IMAGE_URL}${backdrop_path}`}
            alt={title}
            width={320}
            height={120}
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <p className="flex-1 truncate text-neutral-50">{title}</p>
          <div className="flex gap-2 text-sm text-neutral-500">
            <span>{new Date(release_date).getFullYear()}</span>
            <div className="flex items-center gap-1">
              <StarIcon width={16} height={16} className="text-orange-500" />
              <span>{vote_average}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
