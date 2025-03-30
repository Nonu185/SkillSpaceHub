import { Link } from "wouter";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center cursor-pointer">
        <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-2 text-xl font-bold text-gray-900">
          Skill<span className="text-primary">Space</span>
        </span>
      </div>
    </Link>
  );
}
