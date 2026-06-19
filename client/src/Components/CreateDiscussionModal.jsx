import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDiscussion } from "../redux/slices/courseDiscussionSlice";
import { FaTimes, FaPaperclip } from "react-icons/fa";

const CreateDiscussionModal = ({
    courseId,
    videoId,
    onClose,
}) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(
        (state) => state.courseDiscussion
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("course_id", courseId);
        formData.append("video_id", videoId);
        formData.append("title", title);
        formData.append("description", description);

        files.forEach((file) => {
  formData.append("files", file);
});

        const res = await dispatch(
            createDiscussion(formData)
        );

        if (
            res?.payload?.success
        ) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b">
                    <h2 className="font-bold text-lg">
                        Create Discussion
                    </h2>

                    <button onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-5 space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Discussion title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                        className="w-full border rounded-xl p-3"
                    />

                    <textarea
                        rows={6}
                        placeholder="Describe your issue..."
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                        className="w-full border rounded-xl p-3 resize-none"
                    />

                    <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer">
                        <FaPaperclip
                            size={22}
                            className="mb-2"
                        />

                        <span className="text-sm text-slate-500">
                            Upload screenshots/files
                        </span>

                        <input
                            multiple
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                                setFiles(
                                    Array.from(e.target.files)
                                )
                            }
                        />
                    </label>

                    {files.length > 0 && (
                        <div className="space-y-2">
                            {files.map((file, i) => (
                                <div
                                    key={i}
                                    className="text-sm bg-slate-100 rounded-lg p-2"
                                >
                                    {file.name}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 border rounded-xl"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-3 bg-indigo-600 text-white rounded-xl"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Discussion"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDiscussionModal;