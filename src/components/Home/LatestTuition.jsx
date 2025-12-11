import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FiArrowRight, FiBookOpen, FiZap } from "react-icons/fi";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../Shared/Container";
import TuitionCard from "../TuitionCard";
import Spinner from "../Shared/Spinner";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const LatestTuition = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: latestTuitions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allLatestTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/latest-tuitions`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return (
      <div
        className="py-16"
        style={{ backgroundColor: "var(--color-bg-soft)" }}
      >
        <Container>
          <div className="text-center py-12">
            <div
              className="p-6 rounded-full mx-auto mb-4 w-fit"
              style={{ backgroundColor: "var(--color-error-hover)" }}
            >
              <FiBookOpen size={48} style={{ color: "var(--color-error)" }} />
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "var(--color-text-dark)" }}
            >
              Unable to Load Tuitions
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Please try again later
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <section className="py-16">
      <Container className={"px-5"}>
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 
                              px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs 
                              sm:text-sm font-medium self-start animate-pulse"
          style={{
            backgroundColor: "var(--color-primary-hover)",
            color: "var(--color-secondary)",
          }}
        >
          <FiZap className="text-sm sm:text-base" />
          <span className="xs:hidden">New</span>
        </div>
        {/* Tuitions Carousel */}

        {latestTuitions && (
          <div className="relative">
            {/* Custom Navigation Buttons */}
            <div className="flex justify-between items-center mb-6">
              {/* Heading */}

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="relative inline-block mt-1 sm:mt-0">
                  <span
                    className="text-transparent ml-2  bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                    }}
                  >
                    Latest Tuitions
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 rounded"
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                      transform: "translateY(0.25rem) sm:translateY(0.5rem)",
                    }}
                  />
                </span>{" "}
              </h1>
              <Link to="/all-tuitions" className=" gap-2 ">
                <p className="flex  text-orange-500 font-bold items-center justify-center">
                  more
                  <FiArrowRight size={16} />
                </p>
              </Link>
            </div>

            <Swiper
              loop={latestTuitions.length > 3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              modules={[Pagination, Autoplay, Navigation]}
              className="latest-tuitions-swiper pb-12"
            >
              {latestTuitions.map((tuition) => (
                <SwiperSlide key={tuition._id}>
                  <TuitionCard tuition={tuition} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </Container>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .latest-tuitions-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .latest-tuitions-swiper .swiper-pagination-bullet {
          background: var(--color-primary);
          opacity: 0.3;
        }

        .latest-tuitions-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .latest-tuitions-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default LatestTuition;
