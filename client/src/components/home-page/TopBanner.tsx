import { Link } from "wouter";

export default function TopBanner() {
  return (
    <div className="bg-gray-900 text-white text-center py-3 px-4 text-sm">
      <Link href="/courses" className="font-medium hover:underline cursor-pointer">
        Get courses from ₹1,499 for a limited time | A special offer for new students
      </Link>
    </div>
  );
}
