import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../Layouts/UserLayout";
import {
  FaPlayCircle,
  FaChevronLeft,
  FaLock,
  FaImage,
  FaFilePdf,
  FaCheckCircle,
  FaDownload,
  FaListUl,
  FaInfoCircle,
  FaTrophy
} from "react-icons/fa";
import Hls from "hls.js";

import { getCourse, getCourseContentByCourseId } from "../../redux/slices/courseSlice";
import { saveVideoProgress, getUserCourseProgress } from "../../redux/slices/progressSlice";

const LIB_ID = "548872";

const VideoCoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  /* ================= REDUX STATE ================= */
  const { singleCourse: course, courseContent = [], loading } = useSelector((s) => s.courses);
  const { videos = [], } = useSelector((s) => s.progress);




  /* ================= LOCAL STATE ================= */
  const [currentVideo, setCurrentVideo] = useState(null);
  const [blackout, setBlackout] = useState({ show: false, msg: "" });
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [unlockedVideos, setUnlockedVideos] = useState(new Set());
  const [activeTab, setActiveTab] = useState("lessons");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!id) return;
    dispatch(getCourse(id));
    dispatch(getCourseContentByCourseId(id));
    dispatch(getUserCourseProgress(id));
  }, [dispatch, id]);



  /* ================= BUILD VIDEO LIST ================= */
  useEffect(() => {
    const list = Array.isArray(courseContent)
      ? courseContent.flatMap(m => m?.videos || [])
      : [];

    setAllVideos(list);

    if (list.length && !currentVideo) {
      setCurrentVideo(list[0]);
      setActiveVideoId(list[0]._id);
    }
  }, [courseContent]);

  /* ================= PROGRESS LOGIC ================= */
  const completedVideoIds = useMemo(
    () => new Set(videos.map((v) => v.video_id)),
    [videos]
  );

  useEffect(() => {
    if (!allVideos.length) return;
    const unlocked = new Set();
    unlocked.add(allVideos[0]._id);

    for (let i = 0; i < allVideos.length; i++) {
      if (completedVideoIds.has(allVideos[i]._id)) {
        unlocked.add(allVideos[i]._id);
        if (allVideos[i + 1]) unlocked.add(allVideos[i + 1]._id);
      }
    }
    setUnlockedVideos(unlocked);
  }, [allVideos, completedVideoIds]);

  /* ================= VIDEO PLAYER (HLS) ================= */
  const getHlsUrl = (src) => {
    if (!src) return "";
    if (src.includes(".m3u8")) return src;
    if (src.includes("b-cdn.net")) {
      const parts = src.split("/").filter(Boolean);
      const domain = parts.find(p => p.includes("b-cdn.net"));
      const guid = parts.find(p => p.length === 36);
      if (domain && guid) return `https://${domain}/${guid}/playlist.m3u8`;
    }
    return `https://vz-${LIB_ID}.b-cdn.net/${src}/playlist.m3u8`;
  };

  useEffect(() => {
    if (!currentVideo || !videoRef.current) return;

    const hlsUrl = getHlsUrl(currentVideo.video_path);
    if (hlsRef.current) hlsRef.current.destroy();

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(videoRef.current);
      hlsRef.current = hls;
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = hlsUrl;
    }
  }, [currentVideo]);

  /* ================= AUTO-SAVE PROGRESS ================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideo || !allVideos.length) return;

    const onEnded = () => {
      // 1️⃣ Save progress
      dispatch(
        saveVideoProgress({
          course_id: id,
          video_id: currentVideo._id,
          progress_percent: 100,
        })
      );

      // 2️⃣ Find next video
      const currentIndex = allVideos.findIndex(
        (v) => v._id === currentVideo._id
      );

      const nextVideo = allVideos[currentIndex + 1];

      // 3️⃣ AUTO PLAY NEXT VIDEO (NO UNLOCK CHECK)
      if (nextVideo) {
        setTimeout(() => {
          setCurrentVideo(nextVideo);
          setActiveVideoId(nextVideo._id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 700);
      }
    };

    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [
    currentVideo,
    allVideos,
    dispatch,
    id
  ]);


  useEffect(() => {
    const triggerBlackout = (msg = "Action Blocked") => {
      setBlackout({ show: true, msg });

      // Clear clipboard → screenshot blank
      if (navigator.clipboard?.writeText) {
        try {
          navigator.clipboard.writeText("");
        } catch { }
      }

      setTimeout(() => {
        setBlackout({ show: false, msg: "" });
      }, 2000);
    };

    // Disable Right Click
    const onContext = (e) => {
      e.preventDefault();
      triggerBlackout("Right Click Disabled");
    };
    document.addEventListener("contextmenu", onContext);

    // Disable Copy Paste Cut
    const onCopyCutPaste = (e) => {
      e.preventDefault();
      triggerBlackout("Copy/Paste Disabled");
    };
    document.addEventListener("copy", onCopyCutPaste);
    document.addEventListener("paste", onCopyCutPaste);
    document.addEventListener("cut", onCopyCutPaste);
    document.addEventListener("selectstart", (e) => e.preventDefault());

    // MAIN KEY PROTECTION
    const onKey = (e) => {
      const key = e.key.toLowerCase();

      // ================================
      // 🔥 1. BLOCK SHIFT KEY
      // ================================
      if (key === "shift") {
        e.preventDefault();
        triggerBlackout("Shift Key Disabled");
        return;
      }

      // FN + PRINTSCREEN
      if (e.keyCode === 44) {
        e.preventDefault();
        triggerBlackout("Screenshot Blocked (Fn + PrtSc)");
        return;
      }

      // FN + F12
      if (e.keyCode === 123) {
        e.preventDefault();
        triggerBlackout("DevTools Blocked (Fn + F12)");
        return;
      }

      // FN + F1-F12 (Generic Block)
      if (e.keyCode >= 112 && e.keyCode <= 123) {
        e.preventDefault();
        triggerBlackout("Function Keys Disabled (Fn Combo)");
        return;
      }

      if (e.keyCode === 44) {
        e.preventDefault();
        triggerBlackout("Screenshot Blocked (Fn + PrtSc)");
        return;
      }

      // FN + F12 (DevTools shortcut on many laptops)
      if (e.key === "f12" || e.keyCode === 123) {
        e.preventDefault();
        triggerBlackout("DevTools Blocked (Fn/F12)");
        return;
      }

      // FN + SHIFT + F Keys (Some laptops screenshot key)
      if (e.shiftKey && key.startsWith("f")) {
        e.preventDefault();
        triggerBlackout("Function Key Blocked (Fn + Shift)");
        return;
      }

      // ================================
      // 🔥 3. META KEY (Windows / Command)
      // ================================
      if (e.metaKey || key === "meta") {
        e.preventDefault();
        triggerBlackout("Windows Key Disabled");
        return;
      }


      if (
        key === "printscreen" ||
        key === "prtsc" ||
        key === "snapshot" ||
        e.keyCode === 44
      ) {
        e.preventDefault();
        triggerBlackout("Screenshot Blocked");
        return;
      }

      // ALT + PRINTSCREEN
      if (e.altKey && key === "printscreen") {
        e.preventDefault();
        triggerBlackout("Screenshot Blocked");
        return;
      }

      // WIN/CMD + SHIFT + S → Snipping Tool
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === "s") {
        e.preventDefault();
        triggerBlackout("Snipping Tool Disabled");
        return;
      }

      // ================================
      // 🔥 5. BASIC CTRL BLOCK LIST
      // ================================
      const ctrlBlock = ["c", "v", "x", "p", "s", "u"];

      if (e.ctrlKey && ctrlBlock.includes(key)) {
        e.preventDefault();
        triggerBlackout(`CTRL + ${key.toUpperCase()} Blocked`);
        return;
      }

      // CTRL + SHIFT + DevTools Keys
      const ctrlShiftBlock = ["i", "j", "c"];
      if (e.ctrlKey && e.shiftKey && ctrlShiftBlock.includes(key)) {
        e.preventDefault();
        triggerBlackout("Developer Tools Blocked");
        return;
      }

      // BLOCK F12 ALONE
      if (key === "f12") {
        e.preventDefault();
        triggerBlackout("DevTools Blocked");
        return;
      }
    };

    window.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("copy", onCopyCutPaste);
      document.removeEventListener("paste", onCopyCutPaste);
      document.removeEventListener("cut", onCopyCutPaste);
      window.removeEventListener("keydown", onKey, true);
    };
  }, []);


  /* ================= HANDLERS ================= */
  const handleVideoSelect = (video) => {
    if (!unlockedVideos.has(video._id)) return;
    setCurrentVideo(video);
    setActiveVideoId(video._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ REAL TOTAL VIDEOS (current courseContent)
  const realTotalVideos = allVideos.length;

  // ✅ REAL COMPLETED VIDEOS
  const realCompletedVideos = useMemo(() => {
    return allVideos.filter(v =>
      completedVideoIds.has(v._id)
    ).length;
  }, [allVideos, completedVideoIds]);

  // ✅ REAL COURSE PERCENT
  const realCoursePercent = useMemo(() => {
    if (!realTotalVideos) return 0;
    return Math.round((realCompletedVideos / realTotalVideos) * 100);
  }, [realCompletedVideos, realTotalVideos]);

  const handleDownload = async (url) => {
    if (!url) return;

    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
    }
  };



  /* ================= SUB-COMPONENTS ================= */
  const LessonList = () => (
    <div className="space-y-6">
      {courseContent.map((module, idx) => (
        <div key={module._id || idx} className="group">
          <div className="flex items-center gap-3 mb-3 px-2">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest truncate">
              Section {idx + 1}: {module.title}
            </h3>
          </div>
          <div className="space-y-2">
            {module.videos?.map((video) => {
              const isUnlocked = unlockedVideos.has(video._id);
              const isActive = activeVideoId === video._id;
              const isDone = completedVideoIds.has(video._id);

              return (
                <button
                  key={video._id}
                  disabled={!isUnlocked}
                  onClick={() => handleVideoSelect(video)}
                  className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${isActive
                    ? "bg-indigo-600 text-white shadow-lg translate-x-1"
                    : "bg-white hover:bg-slate-50 border border-slate-100"
                    } ${!isUnlocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="shrink-0">
                    {isDone ? <FaCheckCircle className={isActive ? "text-white" : "text-emerald-500"} />
                      : !isUnlocked ? <FaLock className="text-slate-300" />
                        : <FaPlayCircle className={isActive ? "text-white" : "text-indigo-500"} />}
                  </div>
                  <span className="text-[13px] font-semibold truncate">{video.video_title}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  /* ================= LOADING RENDER ================= */
  if (loading || !course) {
    return (
      <UserLayout>
        <div className="flex flex-col justify-center items-center h-[70vh] bg-slate-50">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-4" />
          <p className="text-slate-500 font-medium animate-pulse">Loading your classroom...</p>
        </div>
      </UserLayout>
    );
  }

  /* ================= MAIN RENDER ================= */
  return (
    <UserLayout>
      {/* Container: h-screen on desktop, auto height on mobile to prevent hiding content */}
      <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-white overflow-y-auto lg:overflow-hidden">

        {/* LEFT SIDE: Video & Content */}
        <main className="flex-1 flex flex-col h-full bg-slate-50/50 overflow-y-auto">

          {/* Sticky Nav */}
          <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between scrollbar-hide top-0 z-50">
            <div className="flex items-center gap-4 min-w-0">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg border border-slate-100">
                <FaChevronLeft size={16} />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-indigo-600 uppercase">Course Player</p>
                <h2 className="font-bold text-slate-800 truncate text-sm md:text-base">
                  {course?.title || "Course"}
                </h2>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg">
              <FaTrophy className="text-indigo-600" size={12} />
              <span className="text-xs font-bold text-indigo-700">
                {realCoursePercent}%
              </span>
            </div>
          </nav>

          {/* VIDEO ALIGNMENT: 16:9 Black Box, never hidden on mobile */}
          <div className="w-full bg-white flex items-center justify-center sticky top-[73px] mt-5 lg:relative lg:top-0 z-40">
            <div className="w-full max-w-5xl aspect-video bg-black shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
              />
              {blackout.show && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
                  <span className="text-white font-bold text-sm tracking-widest">
                    {blackout.msg}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-5xl mx-auto w-full p-6 lg:p-10">
            <div className="mb-8">
              <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
                {currentVideo?.video_title}
              </h1>
            </div>

            {/* Mobile Tab Toggle */}
            <div className="flex bg-slate-200 p-1 rounded-xl mb-8 lg:hidden">
              <button
                onClick={() => setActiveTab("lessons")}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === "lessons" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
              >
                <FaListUl className="inline mr-2" /> Lessons
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === "resources" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
              >
                <FaInfoCircle className="inline mr-2" /> Resources
              </button>
            </div>

            {/* Resources Section */}
            <div className={`${activeTab === "resources" ? "block" : "hidden lg:block"} mb-10`}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FaDownload size={14} /> Course Materials
                </h3>
                {!currentVideo?.pdf_path && !currentVideo?.image_path ? (
                  <p className="text-sm text-slate-400 italic">No files for this lesson.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentVideo?.pdf_path && (
                      <button
                        onClick={() => handleDownload(currentVideo.pdf_path)}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100 transition-all w-full"
                      >
                        <div className="flex items-center gap-3">
                          <FaFilePdf className="text-red-500" size={20} />
                          <span className="text-sm font-bold text-slate-700">
                            Lecture PDF
                          </span>
                        </div>
                        <FaDownload size={12} className="text-slate-400" />
                      </button>
                    )}

                    {currentVideo?.image_path && (
                      <button
                        onClick={() => handleDownload(currentVideo.image_path)}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all w-full"
                      >
                        <div className="flex items-center gap-3">
                          <FaImage className="text-indigo-500" size={20} />
                          <span className="text-sm font-bold text-slate-700">
                            Infographic
                          </span>
                        </div>
                        <FaDownload size={12} className="text-slate-400" />
                      </button>
                    )}

                  </div>
                )}
              </div>
            </div>

            {/* Mobile Lesson List (Visible when 'lessons' tab active) */}
            <div className={`${activeTab === "lessons" ? "block" : "hidden"} lg:hidden`}>
              <LessonList />
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: Desktop Only */}
        <aside className="hidden lg:flex flex-col w-[400px] border-l border-slate-200 h-full bg-white">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-black text-slate-900 text-lg mb-4">
              Curriculum
            </h2>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-700"
                style={{ width: `${realCoursePercent}%` }}
              />
            </div>

            <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase">
              {realCoursePercent === 100 && (
                <button
                  onClick={() =>
                    navigate(
                      `/course/${id}/certificate`,
                    )
                  }
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-black text-sm uppercase transition-all shadow-lg shadow-emerald-100"
                >
                  <FaTrophy />
                  Download Certificate
                </button>
              )} / {realTotalVideos} Lessons Completed
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <LessonList />
          </div>
        </aside>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}} />
    </UserLayout>
  );
};

export default VideoCoursePlayer;