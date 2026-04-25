import { motion, AnimatePresence } from "framer-motion"
import { assesst } from "../../public/assesst"

const SplashScreen = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-999 flex flex-col overflow-hidden pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="h-1/2 w-full bg-primary flex items-end justify-center pb-0"
          >
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              src={assesst.logo1}
              alt="logoUp"
              className="w-48 md:w-72 object-contain"
            />
          </motion.div>

          {/* Bottom Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="h-1/2 w-full bg-primary flex items-start justify-center pt-0"
          >
            <motion.img
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              src={assesst.logo2}
              alt="logoDowen"
              className="w-48 md:w-72 object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen