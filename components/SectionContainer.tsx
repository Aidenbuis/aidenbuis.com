import { FC } from "react";
import { motion } from "framer-motion";

type SectionContainerProps = {
  id: number;
};

const SectionContainer: FC<SectionContainerProps> = ({ children, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0, left: -40 }}
      animate={{ opacity: 1, left: 0 }}
      className={id === 0 ? "" : "hidden" + " section-container"}
      id={`section-${id}`}
    >
      {children}
    </motion.div>
  );
};

export default SectionContainer;
