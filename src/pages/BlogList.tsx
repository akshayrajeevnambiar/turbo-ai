import { Container, Section, Divider } from "../components/Container";
import { BlogCard } from "../components/BlogCard";
import { SEO } from "../components/SEO";
import { blogPosts } from "../content/blog";
import { motion } from "framer-motion";

export function BlogList() {
    return (
        <>
            <SEO pageKey="blog" />
            <main className="pt-24 min-h-screen bg-charcoal">
                <Section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 to-transparent opacity-50 pointer-events-none" />
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl mb-16"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                                Insights & <span className="text-blue-500">Perspectives</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                                Explore our latest thinking on artificial intelligence, strategic transformation, and digital architecture.
                            </p>
                        </motion.div>

                        <Divider className="mb-16" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post, index) => (
                                <BlogCard key={post.slug} post={post} index={index} />
                            ))}
                        </div>

                        {blogPosts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No posts found. Check back soon.</p>
                            </div>
                        )}
                    </Container>
                </Section>
            </main>
        </>
    );
}
