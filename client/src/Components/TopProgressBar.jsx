const TopProgressBar = ({ percent }) => {
  return (
    <div className="w-full h-2 fixed top-0 left-0 bg-gray-200 z-50">
      <div
        className="h-full bg-yellow-400 transition-all"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default TopProgressBar;
