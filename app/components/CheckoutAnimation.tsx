import checkout from "@/public/checkout.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

export default function CheckoutAnimation() {
	return (
		<div className="mt-24 flex flex-col items-center justify-center">
			<motion.div
				className="text-2xl font-medium"
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
			>
				Prepping your order ✨
			</motion.div>
			<Player src={checkout} autoplay loop />
		</div>
	);
}
