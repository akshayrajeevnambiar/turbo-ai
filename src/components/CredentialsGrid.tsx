// Import credentials image
import credentialsImage from "../assets/credentials.png";

export default function CredentialsGrid() {
  return (
    <section
      aria-labelledby="cred-heading"
      className="w-full bg-black text-white py-2 md:py-3"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <img
          src={credentialsImage}
          alt="Our Credentials"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
