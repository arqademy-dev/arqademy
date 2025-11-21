import { MdLightbulb, MdSchool, MdHandshake, MdExplore, MdCompress } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function ExtraSections() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full flex flex-col">

      {/* Mission & Vision */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            className="flex flex-col items-center text-center gap-4 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <MdLightbulb className="text-5xl text-green-500" />
            <h2 className="text-2xl font-semibold">OUR MISSION</h2>
            <p className="text-gray-700">
              Equip communities to build sustainable solutions to their challenges.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center gap-4 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MdSchool className="text-5xl text-blue-500" />
            <h2 className="text-2xl font-semibold">OUR VISION</h2>
            <p className="text-gray-700">
              To build purpose-driven problem solvers across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-[#D1EEE8] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR APPROACH</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We empower students with curiosity, knowledge, practical skills, and direction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <MdLightbulb className="text-4xl text-yellow-500" />
            <h3 className="text-xl font-semibold">SPARK</h3>
            <p className="text-gray-700 text-center">
              Spark curiosity and hope, helping students see new possibilities.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MdHandshake className="text-4xl text-green-500" />
            <h3 className="text-xl font-semibold">EDUCATE</h3>
            <p className="text-gray-700 text-center">
              Equip students with the skills, mindset, and confidence to succeed.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MdExplore className="text-4xl text-purple-500" />
            <h3 className="text-xl font-semibold">EQUIP</h3>
            <p className="text-gray-700 text-center">
              Provide practical ways to connect classroom learning to real-life challenges.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MdCompress className="text-4xl text-red-500" />
            <h3 className="text-xl font-semibold">DIRECT</h3>
            <p className="text-gray-700 text-center">
              Guide students to become purpose-driven problem solvers beyond school.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
