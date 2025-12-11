import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaAward, FaHeart, FaLightbulb, FaHandshake, FaRocket } from "react-icons/fa";
import Container from "../components/Shared/Container";
import GradientHeading from "../components/Shared/GradientHeading";

const About = () => {
  const stats = [
    { icon: FaUsers, number: "10,000+", label: "Active Students" },
    { icon: FaChalkboardTeacher, number: "2,500+", label: "Expert Tutors" },
    { icon: FaGraduationCap, number: "50,000+", label: "Successful Sessions" },
    { icon: FaAward, number: "98%", label: "Success Rate" }
  ];

  const values = [
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "We continuously innovate to provide the best learning experience through cutting-edge technology and modern teaching methods."
    },
    {
      icon: FaHeart,
      title: "Passion",
      description: "Our passion for education drives us to create meaningful connections between students and tutors for transformative learning."
    },
    {
      icon: FaHandshake,
      title: "Trust",
      description: "We build trust through transparency, reliability, and commitment to delivering quality educational services to our community."
    },
    {
      icon: FaRocket,
      title: "Excellence",
      description: "We strive for excellence in everything we do, ensuring the highest standards in education and student success."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Former educator with 15+ years in educational technology"
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Tech innovator passionate about educational solutions"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Education",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Curriculum specialist with expertise in personalized learning"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-soft)" }}>
      {/* Hero Section */}
      <section 
        
        
      >
        
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            
            <GradientHeading text={'About Edu Plus'}/>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2">
              Connecting passionate learners with expert tutors to unlock unlimited potential
            </p>
            <div className="flex justify-center">
              <FaGraduationCap className="text-4xl sm:text-5xl md:text-6xl opacity-20" />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center px-4">
            <div className="order-2 lg:order-1">
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
                style={{ color: "var(--color-text-dark)" }}
              >
                Our Mission
              </h2>
              <p 
                className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                At Edu Plus, we believe that quality education should be accessible to everyone. 
                Our mission is to bridge the gap between students seeking knowledge and experienced 
                tutors ready to share their expertise.
              </p>
              <p 
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                We're committed to creating a platform where learning is personalized, engaging, 
                and effective. Through our innovative approach, we empower students to achieve 
                their academic goals while providing tutors with meaningful opportunities to make 
                a difference.
              </p>
            </div>
            <div className="relative order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Students learning together"
                className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full h-64 sm:h-80 md:h-96 object-cover"
              />
              <div 
                className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <FaLightbulb className="text-2xl sm:text-4xl text-white" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section 
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        <Container>
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
              style={{ color: "var(--color-text-dark)" }}
            >
              Our Impact
            </h2>
            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto px-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              Numbers that reflect our commitment to educational excellence
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 sm:p-4">
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <stat.icon className="text-lg sm:text-2xl text-white" />
                </div>
                <div 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-xs sm:text-sm md:text-base font-medium px-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
              style={{ color: "var(--color-text-dark)" }}
            >
              Our Values
            </h2>
            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto px-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--color-card-bg)" }}
              >
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <value.icon className="text-lg sm:text-2xl text-white" />
                </div>
                <h3 
                  className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {value.title}
                </h3>
                <p 
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section 
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        <Container>
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
              style={{ color: "var(--color-text-dark)" }}
            >
              Meet Our Team
            </h2>
            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto px-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              The passionate individuals behind Edu Plus
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            {team.map((member, index) => (
              <div 
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--color-bg-soft)" }}
              >
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full object-cover border-3 sm:border-4 border-white shadow-lg"
                />
                <h3 
                  className="text-lg sm:text-xl font-bold mb-1"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {member.name}
                </h3>
                <p 
                  className="text-sm sm:text-base font-medium mb-2 sm:mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  {member.role}
                </p>
                <p 
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section 
        className="py-12 sm:py-16 md:py-20 lg:py-24 text-white relative overflow-hidden"
        style={{ 
          background: "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)"
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2">
              Join thousands of students and tutors who are already part of our community
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <button 
                className="btn btn-md sm:btn-lg bg-white text-gray-800 hover:bg-gray-100 border-none px-6 sm:px-8 w-full sm:w-auto"
              >
                Find a Tutor
              </button>
              <button 
                className="btn btn-md sm:btn-lg btn-outline text-white border-white hover:bg-white hover:text-gray-800 px-6 sm:px-8 w-full sm:w-auto"
              >
                Become a Tutor
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;