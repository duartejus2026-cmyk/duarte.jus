import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import BlogList from "./pages/Admin/BlogList";
import BlogPostEditor from "./pages/Admin/BlogPostEditor";
import SiteSettings from "./pages/Admin/SiteSettings";
import HeroManagement from "./pages/Admin/HeroManagement";
import TeamManagement from "./pages/Admin/TeamManagement";
import FAQManagement from "./pages/Admin/FAQManagement";
import BlogPost from "./pages/BlogPost";
import LoadingScreen from "./components/ui/LoadingScreen";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento inicial dos assets premium
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/hero" element={<HeroManagement />} />
        <Route path="/admin/about" element={<SiteSettings />} />
        <Route path="/admin/team" element={<TeamManagement />} />
        <Route path="/admin/faq" element={<FAQManagement />} />
        <Route path="/admin/blog" element={<BlogList />} />
        <Route path="/admin/blog/new" element={<BlogPostEditor />} />
        <Route path="/admin/blog/edit/:id" element={<BlogPostEditor />} />
      </Routes>
    </Router>
  );
}
