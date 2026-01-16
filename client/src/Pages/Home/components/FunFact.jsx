import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import light from '../../../assets/light.svg'
import butterfly from '../../../assets/butterfly.svg'

export default function FunFact() {

  const [counts, setCounts] = useState({
    students: 0,
    classes: 0,
    learners: 0,
    instructors: 0,
  });

  useEffect(() => {
    const targets = {
      students: 1525,
      classes: 1050,
      learners: 800,
      instructors: 10,
    };

    const duration = 2000;
    const interval = 20;

    const steps = {};
    Object.keys(targets).forEach(
      key => (steps[key] = Math.ceil(targets[key] / (duration / interval)))
    );

    const timer = setInterval(() => {
      setCounts(prev => {
        const updated = { ...prev };
        let done = true;

        Object.keys(targets).forEach(key => {
          if (updated[key] < targets[key]) {
            updated[key] += steps[key];
            if (updated[key] > targets[key]) {
              updated[key] = targets[key];
            }
            done = false;
          }
        });

        if (done) clearInterval(timer);
        return updated;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white  md:py-0 lg:h-70">
      <div className="mx-auto p-6 relative overflow-hidden bg-[#003867] max-w-[85%] rounded-md md:-top-40">

        {/* Shapes */}
        <motion.img
          src={light}
          alt="shape"
          className="absolute top-43 left-175 w-10 animate-bounce"
        />
        <motion.img
          src={butterfly}
          alt="shape"
          className="absolute bottom-10 right-145 w-25 animate-spin-slow"
        />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full">

          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src="https://i.ibb.co/234kD331/funfact-img-min.png"
              alt="funfact"
              className="w-full object-cover sm:w-[90%] rounded-br-[30%]"
            />
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 gap-20 md:w-1/2">

            <div>
              <h4 className="text-4xl font-bold text-white">
                {counts.students}+
              </h4>
              <p className="text-gray-100 text-xl mt-2">Student enrolled</p>
            </div>

            <div>
              <h4 className="text-4xl font-bold text-white">
                {counts.classes}+
              </h4>
              <p className="text-gray-100 text-xl mt-2">Classes completed</p>
            </div>

            <div>
              <h4 className="text-4xl font-bold text-white">
                {counts.learners}+
              </h4>
              <p className="text-gray-100 text-xl mt-2">Learners report</p>
            </div>

            <div>
              <h4 className="text-4xl font-bold text-white">
                {counts.instructors}+
              </h4>
              <p className="text-gray-100 text-xl mt-2">Top instructors</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
