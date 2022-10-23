import { useEffect } from "react";
import Image from "next/image";
import { usePresence } from "framer-motion";

export default function LoadingOverlay(props) {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 500);
  }, [isPresent, safeToRemove]);

  return (
    <div className="absolute flex h-screen w-screen items-center justify-center bg-white z-50">
      <Image
        src="https://strapi.jala.tech/uploads/transition_680db31f88.gif"
        alt="transition"
        width={100}
        height={100}
      />
    </div>
    // <motion.div
    //     className="absolute flex h-screen w-screen items-center justify-center bg-white z-50"
    //     initial="enter"
    //     animate="hidden"
    //     variants={{hidden: {opacity: 0}, enter: {opacity: 1}}}
    //     transition={{type: "linear", duration: 2}}
    // >
    //     <motion.div
    //         initial={{rotate: "0deg"}}
    //         animate={{rotate: "360deg"}}
    //         transition={{type: "spring", duration: 2, repeat: Infinity}}
    //     >
    //         <JalaJali
    //             aria-hidden="true"
    //             // color="#0084F3"
    //             height={150}
    //             width={"100%"}
    //         />
    //     </motion.div>
    // </motion.div>
  );
}
