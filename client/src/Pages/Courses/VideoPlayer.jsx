const VideoPlayer = ({ src }) => {
  const LIB_ID = "553622";

  if (!src) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center text-white">
        No video found
      </div>
    );
  }

  let finalUrl = src;

  // If only GUID is sent
  if (typeof src === "string" && !src.startsWith("http")) {
    finalUrl = `https://iframe.mediadelivery.net/play/${LIB_ID}/${src}`;
  }
  // If CDN URL is provided (bunny or b-cdn)
  else if (typeof src === "string" && src.includes("b-cdn.net")) {
    const parts = src.split("/");
    const guid = parts[3];
    finalUrl = `https://iframe.mediadelivery.net/play/${LIB_ID}/${guid}`;
  }

  return (
    <div className="w-full h-full bg-black">
      <iframe
        src={finalUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};