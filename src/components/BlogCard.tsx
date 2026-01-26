import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// We need to extend the BlogPost interface or just use `any` if importing from blog.ts failed in thought process
// but I will import from the new file
import type { BlogPost as IBlogPost } from "../content/blog";

interface BlogCardProps {
    post: IBlogPost;
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group flex flex-col bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors duration-300 h-full"
        >
            <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-800">
                {post.image ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-slate-900 flex items-center justify-center p-6">
                        <div className="text-blue-400 font-mono text-xs border border-blue-500/30 px-2 py-1 rounded">
                            POST // {index + 1}
                        </div>
                    </div>
                )}
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                </div>

                <Link to={`/blog/${post.slug}`} className="block">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                        {post.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-white/5 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Link
                        to={`/blog/${post.slug}`}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                    >
                        Read <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
