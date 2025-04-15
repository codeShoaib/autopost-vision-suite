
# 🚀 AutoPost AI - Streamlit Edition

A powerful social media management application that enables users to generate AI-powered content, schedule posts across multiple platforms, and track engagement analytics - all from a single dashboard. This version is built with Streamlit for easy deployment to Hugging Face Spaces.

## ✨ Features

- 🤖 **AI-powered content generation** for text and images
- 📅 **Advanced post scheduling** with calendar integration
- 🔄 **Seamless publishing** to Twitter, LinkedIn, and Facebook
- 🎨 **Beautiful dark UI** with animations and glass morphism effects

## 💻 Tech Stack

- **Frontend/Backend**: Python with Streamlit
- **AI Text Generation**: OpenRouter API (Claude-3-Sonnet model)
- **AI Image Generation**: Replicate API (Flux.1 model)
- **Styling**: Custom CSS with animations

## 🛠️ Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/autopost-streamlit.git
cd autopost-streamlit
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Set up environment variables or Streamlit secrets
   - For local development, create a `.streamlit/secrets.toml` file:
   ```toml
   OPENROUTER_API_KEY = "your-openrouter-api-key"
   REPLICATE_API_KEY = "your-replicate-api-key"
   ```
   - For Hugging Face Spaces, add these as secrets in the repository settings

4. Run the app
```bash
streamlit run app.py
```

5. Open your browser and navigate to the URL shown in the terminal

## 🌐 Hugging Face Spaces Deployment

1. Create a new Space on Hugging Face with the Streamlit SDK
2. Add your API secrets in the Space settings
3. Upload the app.py file and requirements.txt
4. The Space will automatically build and deploy your application

## 📝 Usage Guide

### Generating and Scheduling a Post

1. **Create Content**:
   - Enter a topic/prompt for your post
   - Select the tone and target platform
   - Click "Generate Content" to create AI-written text

2. **Generate an Image** (optional):
   - Enter an image description 
   - Choose an image style
   - Click "Generate Image" to create an AI visual

3. **Schedule Your Post**:
   - Select the platforms (Twitter, LinkedIn, Facebook)
   - Choose the date and time
   - Review your post summary
   - Click "Schedule Post"

4. **Manage Scheduled Posts**:
   - View all scheduled posts at the bottom of the page
   - Expand each post to see details

## 📄 License

This project is licensed under the MIT License.
