import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const ROTATION_RANGE = 25;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltImage = ({ src }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const transform = useMotionTemplate`
    rotateX(${xSpring}deg) 
    rotateY(${ySpring}deg)
  `;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = (mouseY / height - 0.5) * -ROTATION_RANGE;
    const rY = (mouseX / width - 0.5) * ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-[320px] h-105 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 shadow-2xl"
    >
      {/* الصورة */}
      <div
        style={{ transform: "translateZ(60px)" }}
        className="absolute inset-0 p-4"
      >
        <img
          src={src}
          alt="product"
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        />
      </div>

      {/* Glow */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="absolute inset-0 rounded-2xl bg-white/10 blur-xl opacity-50"
      />
    </motion.div>
  );
};

export default TiltImage;