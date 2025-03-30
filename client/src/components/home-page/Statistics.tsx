import useCountUp from "@/hooks/useCountUp";

const statistics = [
  {
    value: "1.5M+",
    label: "Learners in the platform and growing every day",
    countTo: 1.5,
    suffix: "M+"
  },
  {
    value: "87%",
    label: "Of students report higher career satisfaction after our courses",
    countTo: 87,
    suffix: "%"
  },
  {
    value: "364+",
    label: "Expert mentors providing guidance across industries",
    countTo: 364,
    suffix: "+"
  }
];

export default function Statistics() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Building a lifelong learning community</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statistics.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label, countTo, suffix }: { 
  value: string; 
  label: string; 
  countTo: number;
  suffix: string;
}) {
  const count = useCountUp(countTo);
  
  return (
    <div className="text-center">
      <p className="text-4xl font-bold tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-lg font-medium">{label}</p>
    </div>
  );
}
