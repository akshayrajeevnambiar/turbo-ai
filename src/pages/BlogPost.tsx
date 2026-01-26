import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { Container, Section, Divider } from "../components/Container";
import { blogPosts } from "../content/blog";
import { motion, useScroll, useTransform } from "framer-motion";

export function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find((p) => p.slug === slug);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    useEffect(() => {
        if (!post) {
            navigate("/blog", { replace: true });
        }
    }, [post, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) return null;

    // Use a default image if none provided
    const ogImage = post.image || "https://turbo-ai.ca/home-og.png";

    return (
        <>
            <SEO
                title={`${post.title} | Turbo AI`}
                description={post.excerpt}
                image={ogImage}
                type="article"
                articleMeta={{
                    publishedTime: post.date,
                    author: post.author,
                    tags: post.tags
                }}
            />

            <main className="min-h-screen bg-charcoal" ref={containerRef}>
                <article>
                    {/* Hero Section */}
                    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                        {/* Background Image / Gradient */}
                        {post.image ? (
                            <motion.div style={{ y }} className="absolute inset-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-charcoal/40 mix-blend-multiply" />
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-charcoal" />
                        )}

                        {/* Overlay Gradient for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

                        <Container className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 md:pb-20">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="max-w-4xl"
                            >
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-white mb-6 transition-colors group"
                                >
                                    <span aria-hidden="true" className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                                    Back to Insights
                                </Link>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    {post.tags?.map(tag => (
                                        <span key={tag} className="text-xs font-bold uppercase tracking-wider text-white bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight">
                                    {post.title}
                                </h1>

                                <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 font-mono">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-charcoal">
                                            T
                                        </div>
                                        <span className="font-semibold text-white">{post.author}</span>
                                    </div>
                                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                                </div>
                            </motion.div>
                        </Container>
                    </div>

                    {/* Check if body starts with HTML tags or plain text and wrap properly if needed, but assuming HTML string from blog.ts */}
                    <Section className="py-12 md:py-20">
                        <Container>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                {/* Sidebar / Share (Desktop) */}
                                <div className="hidden lg:block lg:col-span-2 relative">
                                    <div className="sticky top-32 flex flex-col gap-4">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Share</p>
                                        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/5" aria-label="Share on LinkedIn">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/5" aria-label="Share on X">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="col-span-1 lg:col-span-8"
                                >
                                    <div className="prose prose-lg prose-invert max-w-none 
                                        prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                                        prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-emeraldNeon
                                        prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-200
                                        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                                        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline prose-a:font-medium
                                        prose-strong:text-white prose-strong:font-semibold
                                        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                                        prose-li:text-gray-300 prose-li:mb-2
                                        prose-blockquote:border-l-4 prose-blockquote:border-emeraldNeon prose-blockquote:bg-white/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-200 prose-blockquote:font-medium prose-blockquote:not-italic
                                        prose-hr:border-white/10 prose-hr:my-10"
                                        dangerouslySetInnerHTML={{ __html: post.body }}
                                    />

                                    <Divider className="my-16" />

                                    {/* Author Bio (Optional) */}
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 flex items-start gap-6">
                                        <div className="w-16 h-16 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-charcoal">
                                            T
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">About the Author</h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                Turbo AI is a focused team of engineers and strategists building intelligent systems that endure. We combine strategic clarity with technical depth to deliver measurable transformation.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <Link
                                            to="/blog"
                                            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-emeraldNeon text-white font-bold rounded-full overflow-hidden hover:bg-emeraldTint transition-all duration-300"
                                        >
                                            <span className="relative z-10">Read More Insights</span>
                                            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </Container>
                    </Section>
                </article>
            </main>
        </>
    );
}
