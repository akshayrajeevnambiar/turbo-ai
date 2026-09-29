import { Container, Section, Divider } from "../components/Container";
import { BlogCard } from "../components/BlogCard";
import { SEO } from "../components/SEO";
import { blogPosts } from "../content/blog";
import { motion } from "framer-motion";
import { useState } from "react";
import { cmsPublicEnabled } from "../cms/client";
import { usePublishedEntries } from "../cms/hooks";
import type { BlogPost } from "../content/blog";

export function BlogList() {
    const [visibleCount, setVisibleCount] = useState(12);
    const { entries, loading, failed } = usePublishedEntries("blog", visibleCount + 1);
    const posts: BlogPost[] = cmsPublicEnabled
        ? entries.map((entry) => ({ slug: entry.slug, title: entry.title, excerpt: entry.summary,
            date: entry.published_at || entry.created_at, author: entry.author, image: entry.hero_image,
            tags: entry.tags, keywords: entry.seo_keywords, body: "" }))
        : blogPosts;
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const visiblePosts = cmsPublicEnabled ? sortedPosts.slice(0, visibleCount) : sortedPosts;
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
                            {visiblePosts.map((post, index) => (
                                    <BlogCard key={post.slug} post={post} index={index} />
                                ))}
                        </div>

                        {loading && <p data-cms-loading className="mt-8 text-center text-slate-400">Loading posts…</p>}
                        {failed && <p data-cms-error role="alert" className="mt-8 text-center text-rose-300">Posts are temporarily unavailable.</p>}
                        {cmsPublicEnabled && visibleCount < sortedPosts.length && <div className="mt-10 text-center"><button onClick={() => setVisibleCount((count) => count + 12)} className="rounded-lg border border-blue-300/40 px-6 py-3 font-semibold text-blue-200 hover:bg-white/5">Load more posts</button></div>}
                        {!loading && !failed && posts.length === 0 && (
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
