import { useState, type FormEvent } from "react";
import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { Toast } from "./Toast";
import { copy } from "../content/turboai";

export function Connect() {
  const { addElement } = useReveal(60);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error" | "info",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate required fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data for submission
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        organization: formData.organization.trim() || 'Not specified',
        message: formData.message.trim(),
        to: 'hello@turbo-ai.ca',
        subject: `New Contact Form Submission from ${formData.name.trim()}`,
        timestamp: new Date().toISOString()
      };

      // Submit to Formspree (replace YOUR_FORM_ID with your actual Formspree form ID)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Show success toast
      showToast("Thank you for your message. We will be in touch soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        organization: "",
        message: "",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      showToast(
        "Sorry, there was an error sending your message. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Section id={copy.connect.id}>
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2
              id="connect-heading"
              ref={addElement}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8"
            >
              {copy.connect.heading}
            </h2>
            <p
              ref={addElement}
              className="text-lg sm:text-xl text-white/90 leading-relaxed"
            >
              {copy.connect.body}
            </p>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 mb-12"
            noValidate
            aria-label="Contact form"
            name="contact"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            {/* Hidden Netlify form detection */}
            <input type="hidden" name="form-name" value="contact" />
            <div className="hidden">
              <input name="bot-field" />
            </div>
            {/* Name */}
            <div ref={addElement}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-2"
              >
                Name <span aria-label="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-charcoalDeep border border-emeraldTint/20 rounded-md focus:outline-none focus:ring-2 focus:ring-emeraldTint focus:border-transparent text-white placeholder-white/50 min-h-[48px] transition-opacity ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                placeholder="Your name"
                aria-describedby="name-error"
                autoComplete="name"
              />
              <div id="name-error" className="sr-only" aria-live="polite"></div>
            </div>

            {/* Email */}
            <div ref={addElement}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email <span aria-label="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-charcoalDeep border border-emeraldTint/20 rounded-md focus:outline-none focus:ring-2 focus:ring-emeraldTint focus:border-transparent text-white placeholder-white/50 min-h-[48px]"
                placeholder="your@email.com"
                aria-describedby="email-error"
                autoComplete="email"
              />
              <div
                id="email-error"
                className="sr-only"
                aria-live="polite"
              ></div>
            </div>

            {/* Organization */}
            <div ref={addElement}>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-white mb-2"
              >
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-charcoalDeep border border-emeraldTint/20 rounded-md focus:outline-none focus:ring-2 focus:ring-emeraldTint focus:border-transparent text-white placeholder-white/50 min-h-[48px]"
                placeholder="Your organization"
                autoComplete="organization"
              />
            </div>

            {/* Message */}
            <div ref={addElement}>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white mb-2"
              >
                Message <span aria-label="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-charcoalDeep border border-emeraldTint/20 rounded-md focus:outline-none focus:ring-2 focus:ring-emeraldTint focus:border-transparent text-white placeholder-white/50 resize-vertical min-h-[120px]"
                placeholder="Tell us about your project or inquiry..."
                aria-describedby="message-error"
              />
              <div
                id="message-error"
                className="sr-only"
                aria-live="polite"
              ></div>
            </div>

            {/* Submit button */}
            <div ref={addElement}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto px-8 py-3 font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emeraldTint focus:ring-offset-2 focus:ring-offset-charcoal min-h-[48px] min-w-[48px] flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-emeraldTint/50 text-white/70 cursor-not-allowed"
                    : "bg-emeraldNeon text-charcoal hover:bg-emeraldTint"
                }`}
                aria-describedby="submit-description"
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isSubmitting ? "Sending..." : copy.connect.cta.label}
              </button>
              <div id="submit-description" className="sr-only">
                Submit your contact form to get in touch with Turbo AI
              </div>
            </div>
          </form>

          {/* Contact info and privacy */}
          <div className="text-center space-y-4">
            <div ref={addElement}>
              <p className="text-white opacity-70">
                Or reach us directly at{" "}
                <a
                  href={`mailto:${copy.connect.email}`}
                  className="cta-link"
                  aria-label={`Send email to ${copy.connect.email}`}
                >
                  {copy.connect.email}
                </a>
              </p>
            </div>

            <div ref={addElement}>
              <p className="text-sm text-midGray">{copy.connect.privacy}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
      />
    </Section>
  );
}
