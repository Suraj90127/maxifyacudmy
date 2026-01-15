import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import categoryCourseReducer from "./slices/categoryCourseSlice";
import courseReviewReducer from "./slices/courseReviewSlice";
import blogReducer from "./slices/blogSlice";
import purchaseReducer from "./slices/purchaseSlice";
import productReducer from "./slices/productSlice";
import contactReducer from "./slices/contactSlice";
import supportTicketReducer from "./slices/supportTicketSlice";
import withdrawalReducer from "./slices/withdrawalSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

// ⭐ Existing
import progressReducer from "./slices/progressSlice";

// ⭐ NEW – Social Links
import socialLinksReducer from "./slices/socialLinksSlice";
import courseProgressReducer from "./slices/courseProgressSlice";
import certificateReducer from "./slices/certificateSlice";
import amountReducer from './slices/amountSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    categoryCourse: categoryCourseReducer,
    courseReview: courseReviewReducer,
    blogs: blogReducer,
    purchase: purchaseReducer,
    products: productReducer,
    contact: contactReducer,
    support: supportTicketReducer,
    withdrawal: withdrawalReducer,
    subscription: subscriptionReducer,

    progress: progressReducer,

    socialLinks: socialLinksReducer,
    courseProgress: courseProgressReducer,
    amount: amountReducer,
    certificate: certificateReducer,



  },
});

export default store;
