import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Section, Divider } from "../components/Container";
import { blogPosts } from "../content/blog";
import { motion } from "framer-motion";

export function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find((p) => p.slug === slug);

    useEffect(() => {
        if (!post) {
            navigate("/blog", { replace: true });
        }
    }, [post, navigate]);

    if (!post) return null;

    // Use a default image if none provided
    const ogImage = post.image || "https://turbo-ai.ca/og.jpg"; // Fallback to site OG

    return (
        <>
            <Helmet>
                <title>{post.title} | Turbo AI</title>
                <meta name="description" content={post.excerpt} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={ogImage} />
                <meta property="article:published_time" content={post.date} />
                <meta property="article:author" content={post.author} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={post.title} />
                <meta property="twitter:description" content={post.excerpt} />
                <meta property="twitter:image" content={ogImage} />
            </Helmet>

            <main className="pt-24 min-h-screen bg-charcoal">
                <article>
                    {/* Header Section */}
                    <Section className="pb-8">
                        <Container>
                            <div className="max-w-4xl mx-auto">
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 mb-8 transition-colors"
                                >
                                    <span aria-hidden="true" className="mr-2">←</span> Back to Insights
                                </Link>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {post.tags?.map(tag => (
                                            <span key={tag} className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/20 px-3 py-1 rounded-full border border-blue-800/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                        {post.title}
                                    </h1>

                                    <div className="flex items-center gap-4 text-sm text-gray-400 font-mono border-l-2 border-blue-500 pl-4">
                                        <span>{post.date}</span>
                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                        <span>{post.author}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </Container>
                    </Section>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden bg-gray-900">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-80"></div>
                        </div>
                    )}

                    {/* Content Body */}
                    <Section className={post.image ? "pt-8" : "pt-0"}>
                        <Container>
                            <div className="max-w-3xl mx-auto">
                                <div
                                    className="prose prose-lg prose-invert max-w-none 
                     prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                     prose-p:text-gray-300 prose-p:leading-relaxed
                     prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-white
                     prose-blockquote:border-l-blue-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg"
                                    dangerouslySetInnerHTML={{ __html: post.body }}
                                />

                                <Divider className="my-16" />

                                <div className="flex justify-between items-center">
                                    <Link
                                        to="/blog"
                                        className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 font-medium"
                                    >
                                        More Articles
                                    </Link>

                                    {/* Share buttons could go here */}
                                </div>
                            </div>
                        </Container>
                    </Section>
                </article>
            </main>
        </>
    );
}
