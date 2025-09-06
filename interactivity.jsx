const { useEffect, useState, useRef } = React;

function Carousel() {
  // Each item now has a title + the path to its HTML page
  const data = [
    { title: "Spotify Wrapped Dupe", url: "projects/dupify.html" },
    { title: "StarSync-GO",       url: "projects/starsync-GO.html" },
    { title: "StarSync Studio",       url: "projects/starsync-DAW.html" },
    { title: "Internship Trakr",       url: "projects/internship-trakr.html" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);

  // Auto-advance every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => (i === data.length - 1 ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [data.length]);

  const go = (dir) => {
    setCurrentIndex((i) => {
      const next = i + dir;
      if (next < 0) return data.length - 1;
      if (next >= data.length) return 0;
      return next;
    });
  };

  return (
    <div className="carousel">
      <button className="nav left" onClick={() => go(-1)} aria-label="Previous">‹</button>

      <div className="viewport">
        <div
          ref={trackRef}
          className="track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.map((item, idx) => (
            <a key={idx} className="slide" href={item.url}>
              <div className="slide-body">
                <h1>{item.title}</h1>
              </div>
            </a>
          ))}
        </div>
      </div>

      <button className="nav right" onClick={() => go(1)} aria-label="Next">›</button>

      <div className="dots">
        {data.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Mount React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Carousel />);
