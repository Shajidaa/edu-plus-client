import { FaCalendarAlt, FaUser, FaClock, FaArrowRight, FaBookOpen, FaGraduationCap, FaLightbulb, FaUsers, FaSearch } from "react-icons/fa";
import Container from "../components/Shared/Container";
import GradientHeading from "../components/Shared/GradientHeading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/blog.json');
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
  }, [blogs, selectedCategory, searchTerm]);

  // Determine how to display articles based on count and category
  const shouldShowFeatured = selectedCategory === "All" && filteredBlogs.length > 3;
  const featuredPost = shouldShowFeatured ? filteredBlogs[0] : null;
  const regularPosts = shouldShowFeatured ? filteredBlogs.slice(1) : filteredBlogs;

  // Generate categories dynamically from blog data
  const categories = [
    { name: "All", count: blogs.length, icon: FaBookOpen },
    ...Array.from(new Set(blogs.map(blog => blog.category))).map(category => ({
      name: category,
      count: blogs.filter(blog => blog.category === category).length,
      icon: category === "Study Environment" ? FaLightbulb :
            category === "Study Tips" ? FaGraduationCap :
            category === "Tutoring" ? FaUsers :
            category === "Mathematics" ? FaBookOpen :
            FaBookOpen
    }))
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-soft)" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: "var(--color-primary)" }}></div>
          <p style={{ color: "var(--color-text-muted)" }}>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-soft)" }}>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <GradientHeading text={'Educational Insights & Tips'} />
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2" style={{ color: "var(--color-text-muted)" }}>
              Discover expert advice, study tips, and educational insights to enhance your learning journey
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:border-primary transition-colors"
                  style={{ 
                    backgroundColor: "var(--color-card-bg)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-dark)"
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-12 sm:pb-16 lg:pb-20">
          <Container>
            <div className="px-4">
              <div 
                className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
                style={{ backgroundColor: "var(--color-card-bg)" }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img 
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 sm:h-80 lg:h-full object-cover"
                    />
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      Featured
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: "var(--color-secondary)", color: "white" }}
                      >
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <h2 
                      className="text-xl  sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {featuredPost.title}
                    </h2>
                    <p 
                      className="text-base sm:text-lg mb-6 leading-relaxed line-clamp-4"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {featuredPost.description.substring(0, 200)}...
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: "var(--color-bg-soft)", 
                            color: "var(--color-text-muted)" 
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          <FaUser className="text-white text-sm" />
                        </div>
                        <div>
                          <p className="font-medium text-sm" style={{ color: "var(--color-text-dark)" }}>
                            {featuredPost.author}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/blogs/${featuredPost.id}`)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: "var(--color-primary)", 
                          color: "white" 
                        }}
                      >
                        Read More
                        <FaArrowRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Categories and Blog Posts */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="px-4">
            {/* Categories Filter */}
            <div className="mb-8 sm:mb-12">
              <h3 
                className="text-xl sm:text-2xl font-bold mb-6 text-center"
                style={{ color: "var(--color-text-dark)" }}
              >
                Browse by Category
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105"
                    style={{ 
                      borderColor: "var(--color-primary)",
                      color: selectedCategory === category.name ? "white" : "var(--color-primary)",
                      backgroundColor: selectedCategory === category.name ? "var(--color-primary)" : "transparent"
                    }}
                  >
                    <category.icon className="text-sm" />
                    <span className="text-sm font-medium">{category.name}</span>
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: selectedCategory === category.name ? "rgba(255,255,255,0.2)" : "var(--color-bg-soft)",
                        color: selectedCategory === category.name ? "white" : "var(--color-text-muted)"
                      }}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Info */}
            {(searchTerm || selectedCategory !== "All") && (
              <div className="mb-6 text-center">
                <p style={{ color: "var(--color-text-muted)" }}>
                  {filteredBlogs.length === 0 ? "No articles found" : 
                   `Showing ${filteredBlogs.length} article${filteredBlogs.length !== 1 ? 's' : ''}`}
                  {searchTerm && ` for "${searchTerm}"`}
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                </p>
              </div>
            )}

            {/* Blog Posts Grid */}
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {regularPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
                    style={{ backgroundColor: "var(--color-card-bg)" }}
                    onClick={() => navigate(`/blogs/${post.id}`)}
                  >
                    <div className="relative">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 sm:h-56 object-cover"
                      />
                      <div 
                        className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        {post.category}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-4 mb-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 
                        className="text-lg sm:text-xl font-bold mb-3 leading-tight line-clamp-2"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {post.title}
                      </h3>
                      <p 
                        className="text-sm sm:text-base mb-4 leading-relaxed line-clamp-3"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {post.description.substring(0, 120)}...
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 rounded-full text-xs"
                            style={{ 
                              backgroundColor: "var(--color-bg-soft)", 
                              color: "var(--color-text-muted)" 
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span 
                            className="px-2 py-1 rounded-full text-xs"
                            style={{ 
                              backgroundColor: "var(--color-bg-soft)", 
                              color: "var(--color-text-muted)" 
                            }}
                          >
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            <FaUser className="text-white text-xs" />
                          </div>
                          <span className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                            {post.author}
                          </span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/blogs/${post.id}`);
                          }}
                          className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Read More
                          <FaArrowRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaBookOpen 
                  className="mx-auto mb-4 text-6xl opacity-50" 
                  style={{ color: "var(--color-text-muted)" }} 
                />
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  No articles found
                </h3>
                <p style={{ color: "var(--color-text-muted)" }}>
                  Try adjusting your search terms or category filter
                </p>
                {(searchTerm || selectedCategory !== "All") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    className="mt-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: "var(--color-primary)", 
                      color: "white" 
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}

          </div>
        </Container>
      </section>

   
    </div>
  );
};

export default Blogs;