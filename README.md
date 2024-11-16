
# Word Frequency

## Demo

Check out the deployed website: [Word Frequency](https://wordfrequencycal.netlify.app)


**Description:**
A web application that extracts, analyzes, and displays the top N most frequently occurring words from a given webpage URL, featuring interactive navigation, dynamic feedback, and a streamlined user experience.

**Features:**
- **Analyze Word Frequency:** Enter any webpage URL, set the desired number of words (N), and view the most frequent words, ranked by frequency.
- **Interactive Navigation:** Results are displayed in segments, allowing smooth navigation across multiple pages.
- **User Feedback and Notifications:** Instantly see alerts for errors (e.g., invalid URLs) and receive real-time status messages for a seamless experience.
- **Loading Indicator:** A subtle loading spinner is shown while data is being retrieved and processed, enhancing user feedback.
- **Comprehensive Error Handling:** Gracefully handles invalid inputs, server errors, and connectivity issues, with clear notifications.

**Backend:**
- **Tech Stack:** Node.js with Express.js for server routing and managing user interactions.
- **Data Processing:** Axios for fetching webpage data, Cheerio for parsing HTML content.
- **Word Frequency Calculation:** Efficiently extracts top words using frequency mapping and a min-heap for sorting results.
- **Security Measures:** To implement security measures in an Express.js application, I have used Helmet for security headers, CORS to restrict resource sharing, a rate limiter to limit requests, and validation to ensure only HTTP/HTTPS URLs are accepted. 

**Frontend**
- **Tech Stack:** Reactjs.
- **Error Notifications:** Utilized React Toastify to display error messages and notifications, ensuring a user-friendly error handling experience.
- **Pagination:** Implemented pagination for smoother navigation through large datasets, enhancing user experience by breaking content into manageable pages with smooth transition.

**Getting Started:**
1) Go to frontend
- `cd frontend`
- `npm install`
- `npm run dev`
2) Go to backend
- `cd backend`
- `touch .env` (make a file .env)
- write `PORT=3000` inside .env file
- `npm install`
- `npm run start`
4) Open http://localhost:5173



