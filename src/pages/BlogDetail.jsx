import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaClock, FaArrowLeft, FaShare, FaBookmark, FaTag } from "react-icons/fa";
import Container from "../components/Shared/Container";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('/blog.json');
        const blogs = await response.json();
        
        const currentBlog = blogs.find(b => b.id === parseInt(id));
        setBlog(currentBlog);
        
        // Get related blogs from the same category
        if (currentBlog) {
          const related = blogs
            .filter(b => b.id !== currentBlog.id && b.category === currentBlog.category)
            .slice(0, 3);
          setRelatedBlogs(related);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-soft)" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: "var(--color-primary)" }}></div>
          <p style={{ color: "var(--color-text-muted)" }}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-soft)" }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text-dark)" }}>
            Article Not Found
          </h2>
          <p className="mb-6" style={{ color: "var(--color-text-muted)" }}>
            The article you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-soft)" }}>
      {/* Header */}
      <section className="py-8">
        <Container>
          <div className="px-4">
            <button
              onClick={() => navigate('/blogs')}
              className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors hover:scale-105"
              style={{ color: "var(--color-primary)" }}
            >
              <FaArrowLeft />
              Back to Blogs
            </button>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="pb-12">
        <Container>
          <div className="max-w-4xl mx-auto px-4">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm" style={{ color: "var(--color-text-muted)" }}>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  {blog.category}
                </span>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-xs" />
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-xs" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ color: "var(--color-text-dark)" }}
              >
                {blog.title}
              </h1>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--color-text-dark)" }}>
                      {blog.author}
                    </p>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                      Author
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: "var(--color-card-bg)", color: "var(--color-primary)" }}
                    title="Share article"
                  >
                    <FaShare />
                  </button>
                  <button 
                    className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: "var(--color-card-bg)", color: "var(--color-primary)" }}
                    title="Bookmark article"
                  >
                    <FaBookmark />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                    style={{ 
                      backgroundColor: "var(--color-card-bg)", 
                      color: "var(--color-text-muted)" 
                    }}
                  >
                    <FaTag className="text-xs" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              style={{ color: "var(--color-text-dark)" }}
            >
              <div className="text-lg leading-relaxed space-y-6">
                {blog.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Article Footer */}
            <div 
              className="border-t pt-8 mb-12"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg" style={{ color: "var(--color-text-dark)" }}>
                      {blog.author}
                    </p>
                    <p style={{ color: "var(--color-text-muted)" }}>
                      Educational Content Writer
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: "var(--color-primary)", 
                      color: "white" 
                    }}
                  >
                    Follow Author
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section 
          className="py-12"
          style={{ backgroundColor: "var(--color-card-bg)" }}
        >
          <Container>
            <div className="px-4">
              <h2 
                className="text-2xl sm:text-3xl font-bold mb-8 text-center"
                style={{ color: "var(--color-text-dark)" }}
              >
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <article 
                    key={relatedBlog.id}
                    onClick={() => navigate(`/blogs/${relatedBlog.id}`)}
                    className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
                    style={{ backgroundColor: "var(--color-bg-soft)" }}
                  >
                    <div className="relative">
                      <img 
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-48 object-cover"
                      />
                      <div 
                        className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        {relatedBlog.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt />
                          <span>{new Date(relatedBlog.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock />
                          <span>{relatedBlog.readTime}</span>
                        </div>
                      </div>
                      <h3 
                        className="text-lg font-bold mb-3 leading-tight line-clamp-2"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {relatedBlog.title}
                      </h3>
                      <p 
                        className="text-sm mb-4 leading-relaxed line-clamp-3"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {relatedBlog.description.substring(0, 120)}...
                      </p>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          <FaUser className="text-white text-xs" />
                        </div>
                        <span className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                          {relatedBlog.author}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;