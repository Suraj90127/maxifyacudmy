import FeatureCard from "./FeatureCard";

import shape1 from "../../../assets/shape-1 edu.svg";
import shape2 from "../../../assets/ding.svg";

// ✅ ICONS IMPORT (IMPORTANT)
import Educator from "../../../assets/man.svg";
import TopInstructor from "../../../assets/Top Instructor.svg";
import Award from "../../../assets/award.svg";

export default function FeaturesSection() {
  const featureData = [
    {
      id: 1,
      title: "Educator Support",
      desc: "Get complete guidance from experienced mentors who help you learn every concept with real-world examples.",
      icon: Educator,
      delay: 0.2,
    },
    {
      id: 2,
      title: "Top Instructor",
      desc: "Learn from certified industry professionals with hands-on expertise in digital marketing and design.",
      icon: TopInstructor,
      delay: 0.4,
    },
    {
      id: 3,
      title: "Award Winning",
      desc: "Trusted by learners and recognized for delivering quality education and measurable career growth.",
      icon: Award,
      delay: 0.6,
    },
  ];

  return (
    <section className="relative py-20 bg-[#003867] overflow-hidden">
      {/* LEFT DOTTED SHAPE */}
      <img
        src={shape1}
        className="absolute top-16 left-10 w-16 opacity-40"
        alt="shape"
      />

      {/* RIGHT FLOAT SHAPE */}
      <img
        src={shape2}
        className="absolute bottom-12 right-10 w-20 opacity-40"
        alt="shape"
      />

      <div className="container mx-auto px-6">
        <div className="grid gap-16 md:grid-cols-3">
          {featureData.map((item) => (
            <FeatureCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
