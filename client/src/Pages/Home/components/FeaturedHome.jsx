import FeatureCard from "./FeatureCard";


export default function FeaturesSection() {
  const featureData = [
    {
      id: 1,
      title: "Educator Support",
      desc: "Get complete guidance from experienced mentors who help you learn every concept with real-world examples.",
      icon: "https://course.super-club.xyz/core/resources/views/templates/basic/images/1_1.svg",
      delay: 0.2,
    },
    {
      id: 2,
      title: "Top Instructor",
      desc: "Learn from certified industry professionals with hands-on expertise in digital marketing and design.",
      icon: "https://course.super-club.xyz/core/resources/views/templates/basic/images/2_1.svg",
      delay: 0.4,
    },
    {
      id: 3,
      title: "Award Winning",
      desc: "Trusted by learners and recognized for delivering quality education and measurable career growth.",
      icon: "https://course.super-club.xyz/core/resources/views/templates/basic/images/3_2.svg",
      delay: 0.6,
    },
  ];

  return (
    <section
      className="relative py-20"
      style={{ background: "#003867" }}
    >
      {/* LEFT DOTTED SHAPE */}
      <img
        src="https://course.super-club.xyz/core/resources/views/templates/basic/images/shape-1_3.svg"
        className="absolute top-16 left-10 w-16 opacity-40"
        alt="shape"
      />

      {/* RIGHT FLOAT SHAPE */}
      <img
        src="https://course.super-club.xyz/core/resources/views/templates/basic/images/shape-2.svg"
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
