import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  published_at: string;
  author: string;
  image_url: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section id="blog-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-widest font-sans uppercase font-bold text-gold">Conteúdo Especializado</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-primary font-medium mt-2 mb-4">Postagens Recentes no Blog</h2>
          <div className="h-1 w-20 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-primary p-8 sm:p-10 rounded-2xl flex flex-col h-full hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 text-white/50 text-[10px] uppercase tracking-widest font-bold mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gold-light" /> 
                  {new Date(post.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-gold-light" /> 
                  {post.author}
                </span>
              </div>
              
              <h3 className="font-serif text-xl sm:text-2xl text-white font-bold leading-tight mb-6 group-hover:text-gold-light transition-colors">
                {post.title}
              </h3>
              
              <p className="font-sans text-white/70 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              
              <Link 
                to={`/blog/${post.slug}`}
                className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-300"
              >
                Leia mais <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
