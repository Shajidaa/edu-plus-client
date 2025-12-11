const GradientHeading = ({
  text = { text },
  from = "var(--color-primary)",
  to = "var(--color-secondary)",
  className,
}) => {
  return (
    <h1
      className={`${className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight`}
    >
      <span className="relative inline-block mt-1 sm:mt-0">
        <span
          className="text-transparent ml-2 bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
          }}
        >
          {text}
        </span>

        <span
          className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 rounded"
          style={{
            background: `linear-gradient(to right, ${from}, ${to})`,
            transform: "translateY(0.25rem)",
          }}
        />
      </span>
    </h1>
  );
};

export default GradientHeading;
