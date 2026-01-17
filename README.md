# Strava Year Review

[![Vercel Status](https://img.shields.io/vercel/strava-hazel.vercel.app)](https://strava-hazel.vercel.app)

Strava Year Review is a web application that allows users to easily view and analyze their Strava data from the past year. Built with Next.js, Tailwind CSS, and various other libraries and frameworks, this application provides a visually appealing and intuitive user interface for viewing their running, cycling, and swimming data.

## Features

- **Responsive Design**: The web application is designed to be viewable on various screen sizes and devices, ensuring a seamless user experience across different platforms.

- **Visual Analytics**: Users can easily view their Strava data by year, month, and day. The application provides interactive charts and graphs to visualize their running, cycling, and swimming data.

- **Customizable Theme**: Users have ability to choose from different color schemes and light/dark mode options to customize their experience.

- **Integration with Strava**: The application leverages Strava API to fetch data from user's Strava account. Users must authenticate with their Strava account to view their data.

- **Secure and Private**: The application follows best practices for secure authentication and data storage, ensuring privacy and security of user data.

- **AI Running Coach**: Features an intelligent RAG-based AI coach that provides personalized training advice based on your recent Strava activities. The coach analyzes your running patterns, pace consistency, and training load to offer actionable insights.

## Technologies Used

- **Next.js**: A popular React framework for building server-side rendered React applications.

- **Tailwind CSS**: A utility-first CSS framework that provides a set of pre-defined utility classes to build responsive and consistent user interfaces.

- **Strava API**: The application integrates with Strava API to fetch running, cycling, and swimming data from user's Strava account.

- **TypeScript**: A statically-typed superset of JavaScript that provides better code readability and maintainability.

- **Groq LLM**: Advanced language model for generating personalized coaching advice.

- **HuggingFace Embeddings**: Vector embeddings for semantic search and activity retrieval.

- **Neon PostgreSQL**: Serverless PostgreSQL database with pgvector extension for similarity search.

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/strava-year-review.git`

2. Navigate to the project directory: `cd strava-year-review`

3. Install dependencies: `npm install`

4. Start the development server: `npm run dev`

5. Open your browser and visit `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the frontend directory with:

```env
DATABASE_URL=your_neon_database_url
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
GROQ_API_KEY=your_groq_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

## AI Coach Features

- **Real-time Data Analysis**: Fetches your latest Strava activities from the last 8 weeks
- **Qualitative Pace Labels**: Converts raw pace data to intuitive descriptions (fast, moderate, easy)
- **Derived Insights**: Analyzes training volume trends, pace consistency, and fatigue risk
- **Structured Coaching**: Provides concise, actionable advice with confidence levels and trade-offs
- **Date Formatting**: Consistent DD-MM-YY format for better readability

## Contributing

Contributions are welcome! If you find any issues or have feature requests, please create an issue or submit a pull request.

## License

This project is licensed under MIT License. See the [LICENSE](LICENSE) file for details.
