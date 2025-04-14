
# 🚀 AutoPost Chatbot

A powerful social media management platform that enables users to generate AI-powered content, schedule posts across multiple platforms, and track engagement analytics - all from a single dashboard.

![AutoPost Banner](https://i.imgur.com/example.png)

## ✨ Features

- 🤖 **AI-powered content generation** for text and images
- 📅 **Advanced post scheduling** with calendar integration
- 📊 **Cross-platform analytics** and performance tracking
- 🔄 **Seamless publishing** to Twitter, LinkedIn, and Facebook

## 💻 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **UI Components**: Custom components with Tailwind
- **Data Visualization**: Recharts
- **Backend**: Supabase for authentication and data storage
- **AI Integration**: OpenRouter API for text generation, Replicate API for image generation

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/autopost-chatbot.git
cd autopost-chatbot
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
   - Copy `.env.example` to `.env.local`
   - Add your API keys for OpenRouter and Replicate
   - Configure Supabase settings if using

```bash
cp .env.example .env.local
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📝 Usage Guide

### Generating and Scheduling a Post

1. **Create Content**:
   - Navigate to the 'Create Post' page
   - Write your post content or use AI assistance by clicking "AI Suggestions"
   - Generate a relevant image by clicking "Generate Image with AI"

2. **Configure Post Settings**:
   - Select social media platforms (Twitter, LinkedIn, Facebook)
   - Choose scheduling options (specific date/time or optimal posting time)

3. **Schedule or Publish**:
   - Click "Schedule Post" to add it to your content calendar
   - Monitor scheduled posts from the Dashboard

4. **Track Performance**:
   - Visit the Analytics page to monitor engagement across platforms
   - View detailed metrics for each post

## 🔮 Future Roadmap

- Advanced AI personalization for platform-specific content
- Team collaboration features with role-based permissions
- Custom branding and white-label options
- Advanced analytics with custom reporting
- Mobile application for on-the-go management

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/autopost-chatbot/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
