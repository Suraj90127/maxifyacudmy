const CourseContent = require("../models/CourseContent");
const axios = require("axios");
const FormData = require("form-data");

// =====================================================
// HELPER 1: Upload Image to IMGBB
// =====================================================
async function uploadToIMGBB(buffer) {
  try {
    const base64 = buffer.toString("base64");

    const formData = new FormData();
    formData.append("image", base64);

    const upload = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      { headers: formData.getHeaders() }
    );

    return upload.data.data.url;
  } catch (err) {
    console.log("IMGBB Error:", err.response?.data || err.message);
    return null;
  }
}

// =====================================================
// HELPER 2: Upload Video to Bunny Stream
// =====================================================
async function uploadToBunny(buffer, filename) {
  try {
    const libraryId = process.env.BUNNY_LIBRARY_ID;      // 553622
    const apiKey = process.env.BUNNY_API_KEY;            // Access key
    const cdnHostname = process.env.BUNNY_CDN_HOSTNAME;  // vz-1c2107a9-39a.b-cdn.net

    // STEP 1 – Create Bunny Video Entry
    const createRes = await axios.post(
      `https://video.bunnycdn.com/library/${libraryId}/videos`,
      { title: filename },
      { headers: { AccessKey: apiKey } }
    );

    const videoId = createRes.data.guid; // <-- IMPORTANT

    // STEP 2 – Upload Video File
    await axios.put(
      `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`,
      buffer,
      {
        headers: {
          AccessKey: apiKey,
          "Content-Type": "video/mp4",
        },
      }
    );

    // STEP 3 – Return correct CDN playback URL
    const finalUrl = `https://${cdnHostname}/${videoId}/play`;

    console.log("Bunny Final Video URL:", finalUrl);

    return finalUrl;

  } catch (err) {
    console.log("Bunny Error:", err.response?.data || err.message);
    return null;
  }
}



// =====================================================
// CREATE COURSE CONTENT
// =====================================================
exports.createCourseContent = async (req, res) => {
  try {
    let { course_id, title, video_title, video_description, video_duration } =
      req.body;

    const files = req.files;

    if (!Array.isArray(video_title)) video_title = [video_title];
    if (!Array.isArray(video_description)) video_description = [video_description];
    if (!Array.isArray(video_duration)) video_duration = [video_duration];

    let videos = [];

    for (let i = 0; i < video_title.length; i++) {
      const videoFile = files?.videos?.[i] || null;
      const pdfFile = files?.video_pdfs?.[i] || null;
      const imageFile = files?.video_images?.[i] || null;

      // upload image to imgbb
      let imageURL = imageFile ? await uploadToIMGBB(imageFile.buffer) : null;

      // upload video to bunny
      let bunnyURL = videoFile
        ? await uploadToBunny(videoFile.buffer, videoFile.originalname)
        : null;

      videos.push({
        video_title: video_title[i],
        video_description: video_description[i],
        video_duration: video_duration[i],
        video_path: bunnyURL, // Bunny Stream URL
        pdf_path: pdfFile ? `/uploads/pdfs/${pdfFile.filename}` : null,
        image_path: imageURL,
      });
    }

    const newContent = await CourseContent.create({
      course_id,
      title,
      videos,
    });

    res.status(201).json({
      message: "Course content created successfully",
      data: newContent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// =====================================================
// GET ALL COURSE CONTENT
// =====================================================
exports.getAllCourseContent = async (req, res) => {
  try {
    const contents = await CourseContent.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All course contents fetched",
      data: contents,
    });
  } catch (error) {
    console.log("Get All Error:", error);
    res.status(500).json({ message: "Unexpected error", error: error.message });
  }
};

// =====================================================
// GET SINGLE COURSE CONTENT
// =====================================================
exports.getSingleCourseContent = async (req, res) => {
  try {
    const content = await CourseContent.findById(req.params.id);

    if (!content)
      return res.status(404).json({ message: "Course content not found" });

    res.status(200).json({
      message: "Course content fetched",
      data: content,
    });
  } catch (error) {
    console.log("Get Single Error:", error);
    res.status(500).json({ message: "Unexpected error", error: error.message });
  }
};

// =====================================================
// DELETE COURSE CONTENT
// =====================================================
exports.deleteCourseContent = async (req, res) => {
  try {
    const content = await CourseContent.findById(req.params.id);

    if (!content)
      return res.status(404).json({ message: "Course content not found" });

    await content.deleteOne();

    res.status(200).json({
      message: "Course content deleted successfully",
    });
  } catch (error) {
    console.log("Delete Error:", error);
    res.status(500).json({ message: "Unexpected error", error: error.message });
  }
};

// =====================================================
// UPDATE COURSE CONTENT
// =====================================================
exports.updateCourseContent = async (req, res) => {
  try {
    let {
      title,
      video_title = [],
      video_description = [],
      video_duration = [],
      remove_videos = [],
    } = req.body;

    const files = req.files;
    let content = await CourseContent.findById(req.params.id);

    if (!content)
      return res.status(404).json({ message: "Content not found" });

    if (!Array.isArray(remove_videos)) remove_videos = [remove_videos];

    // remove selected old videos
    content.videos = content.videos.filter(
      (vid) => !remove_videos.includes(vid._id.toString())
    );

    // add new videos
    if (!Array.isArray(video_title)) video_title = [video_title];
    if (!Array.isArray(video_description))
      video_description = [video_description];
    if (!Array.isArray(video_duration)) video_duration = [video_duration];

    for (let i = 0; i < video_title.length; i++) {
      if (!video_title[i]) continue;

      const videoFile = files?.videos?.[i] || null;
      const pdfFile = files?.video_pdfs?.[i] || null;
      const imageFile = files?.video_images?.[i] || null;

      let imageURL = imageFile ? await uploadToIMGBB(imageFile.buffer) : null;

      let bunnyURL = videoFile
        ? await uploadToBunny(videoFile.buffer, videoFile.originalname)
        : null;

      content.videos.push({
        video_title: video_title[i],
        video_description: video_description[i] || "",
        video_duration: video_duration[i] || "00:00:00",
        video_path: bunnyURL,
        pdf_path: pdfFile ? `/uploads/pdfs/${pdfFile.filename}` : null,
        image_path: imageURL,
      });
    }

    if (title) content.title = title;

    await content.save();

    res.status(200).json({
      message: "Course content updated successfully",
      data: content,
    });
  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({ message: "Unexpected error", error: error.message });
  }
};
