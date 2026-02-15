import { motion } from "framer-motion";

export function WhatsAppButton() {
    const phoneNumber = "18257472650";
    const message = "Hi! I'm interested in your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors duration-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Chat with us on WhatsApp"
        >
            <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118 1.571-.088 1.758-.721 2.006-1.213.248-.492.248-.915.174-1.213-.075-.298-.273-.446-.57-.594z" />
                <path d="M12.04 2C6.494 2 1.99 6.505 1.99 12.05c0 1.774.457 3.486 1.328 5.013L2 22l5.06-1.317c1.473.805 3.125 1.259 4.908 1.259 5.545 0 9.949-4.505 9.949-10.05C21.917 6.505 17.585 2 12.04 2zm0 18.067c-1.604 0-3.15-.432-4.526-1.251l-.325-.192-3.32.864.887-3.235-.213-.339c-.911-1.453-1.391-3.116-1.391-4.832 0-4.99 4.051-9.05 9.049-9.05 4.998 0 9.05 4.06 9.05 9.05 0 4.99-4.052 9.05-9.051 9.05z" />
            </svg>
        </motion.a>
    );
}
