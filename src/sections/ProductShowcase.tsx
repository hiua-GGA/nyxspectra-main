// "use client";
// import productImage from "@/assets/product-image.png";
// import pyramidImage from "@/assets/pyramid.png";
// import tubeImage from "@/assets/tube.png";
// // import nyx from "@/assets/nyx.mp4";
// import Image from "next/image";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export const ProductShowcase = () => {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

//   return (
//     <section ref={sectionRef} className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip">
//       <div className="container">
//         <div className="max-w-[540px] mx-auto">
//           <div className="flex justify-center">
//             {/* <div className="tag">More </div> */}
//           </div>

//           {/* <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
//             More About Us
//           </h2>
//           <p className="section-des mt-5">
//             Effortlessly turn your ideas into a fully functional, responsive, SaaS website in just minutes
//             with this template.
//           </p> */}
//         </div>

//         <div className="relative">
//           {/* <Image src={productImage} alt="Product image" className="mt-10" /> */}
//           <video
//             src="/src/assets/nyx.mp4"
//             // alt="Product Video"
//             className="mt-10 w-full max-w-[600px] mx-auto rounded-lg shadow-lg"
//             autoPlay
//             muted
//             loop
//           />
//           <motion.img
//             src={pyramidImage.src}
//             alt="Pyramid image"
//             height={262}
//             width={262}
//             className="hidden md:block absolute -right-36 -top-32"
//             style={{
//               translateY: translateY,
//             }}
//           />
//           <motion.img
//             src={tubeImage.src}
//             alt="Tube image"
//             height={248}
//             width={248}
//             className="hidden md:block absolute bottom-24 -left-36"
//             style={{
//               translateY: translateY,
//             }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };
