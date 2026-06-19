import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    submitAssignment, 
    getAssignmentSubmission,
    resetAssignmentSubmissionState 
} from "../redux/slices/assignmentSubmissionSlice";

const AssignmentComponent = ({
    assignment,
    courseId,
    videoId,  // ← Make sure this is received
}) => {
    const dispatch = useDispatch();
    const { loading, submission, error } = useSelector(
        (state) => state.assignmentSubmission
    );

    const [answers, setAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!assignment) return null;

    // Check for existing submission when component mounts
    useEffect(() => {
        const checkExistingSubmission = async () => {
            const result = await dispatch(getAssignmentSubmission(assignment._id));
            if (getAssignmentSubmission.fulfilled.match(result) && result.payload?.data) {
                setIsSubmitted(true);
            }
        };
        
        checkExistingSubmission();
        
        // Cleanup on unmount
        return () => {
            dispatch(resetAssignmentSubmissionState());
        };
    }, [dispatch, assignment._id]);

    // Update isSubmitted when submission comes in
    useEffect(() => {
        if (submission && !error) {
            setIsSubmitted(true);
        }
    }, [submission, error]);

    const handleAnswerChange = (questionId, selectedAnswer) => {
        setAnswers((prev) => {
            const existing = prev.find(
                (item) => item.questionId === questionId
            );

            if (existing) {
                return prev.map((item) =>
                    item.questionId === questionId
                        ? { ...item, selectedAnswer }
                        : item
                );
            }

            return [
                ...prev,
                { questionId, selectedAnswer },
            ];
        });
    };

    const handleSubmit = async () => {
        // Validate all questions are answered
        const totalQuestions = assignment.questions?.length || 0;
        const answeredQuestions = answers.length;
        
        if (answeredQuestions !== totalQuestions) {
            alert(`Please answer all questions. (${answeredQuestions}/${totalQuestions} answered)`);
            return;
        }

        // Make sure videoId is included
        const submissionData = {
            courseId,
            videoId,  // ← CRITICAL: videoId must be here
            assignmentId: assignment._id,
            answers,
        };

        console.log("Submitting assignment with data:", submissionData);

        const result = await dispatch(submitAssignment(submissionData));
        
        if (submitAssignment.fulfilled.match(result)) {
            alert("Assignment submitted successfully!");
        } else {
            alert(result.payload || "Failed to submit assignment");
        }
    };

    // If already submitted
    if (isSubmitted && submission) {
        return (
            <div className="bg-white rounded-2xl border border-green-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                    {assignment.title}
                </h2>

                <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
                    <h4 className="font-bold text-green-700 mb-3">
                        ✅ Assignment Submitted
                    </h4>

                    <p>
                        Marks Obtained:
                        <strong>
                            {" "}
                            {submission.obtainedMarks || 0}
                        </strong>
                        /{submission.totalMarks || assignment.totalMarks || 0}
                    </p>

                    <p className="mb-4">
                        Percentage:
                        <strong>
                            {" "}
                            {submission.percentage || 0}%
                        </strong>
                    </p>

                    {submission.answers?.length > 0 && (
                        <div className="space-y-3">
                            <h5 className="font-semibold text-slate-700 mb-2">Your Answers:</h5>
                            {submission.answers.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border ${
                                        item.isCorrect
                                            ? "bg-green-50 border-green-200"
                                            : "bg-red-50 border-red-200"
                                    }`}
                                >
                                    <p className="font-medium text-slate-700 mb-2">
                                        Question {index + 1}
                                    </p>
                                    <p>
                                        Your Answer:
                                        <strong> {item.selectedAnswer}</strong>
                                    </p>
                                    <p>
                                        Correct Answer:
                                        <strong> {item.correctAnswer}</strong>
                                    </p>
                                    <p
                                        className={`font-semibold mt-2 ${
                                            item.isCorrect ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {item.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                    {assignment.title}
                </h2>

                {assignment.description && (
                    <p className="text-slate-500 mt-2">
                        {assignment.description}
                    </p>
                )}

                {assignment.totalMarks && (
                    <p className="text-sm text-slate-500 mt-2">
                        Total Marks: {assignment.totalMarks}
                    </p>
                )}
            </div>

            <div className="space-y-6">
                {assignment.questions?.map((question, index) => (
                    <div key={question._id} className="border rounded-xl p-5">
                        <h3 className="font-semibold text-slate-800 mb-4">
                            {index + 1}. {question.questionText || question.question}
                            {question.marks && (
                                <span className="text-sm text-slate-500 ml-2">
                                    ({question.marks} marks)
                                </span>
                            )}
                        </h3>

                        <div className="space-y-3">
                            {question.options?.map((option, idx) => (
                                <label
                                    key={idx}
                                    className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        onChange={() =>
                                            handleAnswerChange(question._id, option)
                                        }
                                        className="w-4 h-4 text-indigo-600"
                                    />
                                    <span className="text-slate-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Submitting..." : "Submit Assignment"}
                </button>
            </div>
        </div>
    );
};

export default AssignmentComponent;