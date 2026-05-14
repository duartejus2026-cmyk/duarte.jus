import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Share2, MessageSquare } from "lucide-react";
import { supabase } from "../services/supabase";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

interface Post {
  id: string;
  title: string;
  content: string;
  published_at: string;
  author: string;
  category: string;
  image_url: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        navigate("/");
        return;
      }

      setPost(data);
      setLoading(false);
      window.scrollTo(0, 0);
    }
    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-primary">
      <Header onOpenBooking={() => {}} onExploreAreas={() => {}} />
      
      <main className="pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb & Back */}
          <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors text-xs font-bold uppercase tracking-widest mb-12">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
          </Link>

          {/* Header */}
          <header className="space-y-6 mb-12">
            <span className="inline-block px-3 py-1 bg-primary/5 text-gold font-bold text-[10px] uppercase tracking-widest rounded">
              {post.category}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-bold leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <Calendar className="w-4 h-4 text-gold" />
                {new Date(post.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <User className="w-4 h-4 text-gold" />
                {post.author}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.image_url && (
            <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="font-sans text-lg text-text-dark leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Footer of Article */}
          <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Gostou do conteúdo?</span>
              <button 
                onClick={() => {
                  navigator.share?.({ title: post.title, url: window.location.href });
                }}
                className="flex items-center gap-2 text-primary hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>
            
            <Link to="/#contact-section" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary-light transition-all shadow-lg hover:shadow-primary/20">
              Falar com um Especialista
            </Link>
          </footer>

        </article>
      </main>

      <Footer />
    </div>
  );
}
