
import streamlit as st
import requests
from datetime import datetime
import json
import time
from PIL import Image
import io
import base64
from typing import List, Dict, Any, Literal, Optional, Union

# Set page configuration
st.set_page_config(
    page_title="AutoPost - AI Content Generator",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# API Keys (in production, use st.secrets)
OPENROUTER_API_KEY = "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"
REPLICATE_API_KEY = "1cd68328dd23eadabe0488a3b4e924a4ca6074c69f225e5de973ef9651469e25"

# Custom CSS for styling
st.markdown("""
<style>
    /* Dark theme with paper texture */
    .stApp {
        background-color: #1e1e24;
        background-image: url('https://raw.githubusercontent.com/your-username/autopost-streamlit/main/assets/paper_texture.png');
        background-size: cover;
        background-blend-mode: overlay;
    }
    
    /* Card styling */
    .card {
        background: rgba(30, 30, 36, 0.7);
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* Gradient text */
    .gradient-text {
        background: linear-gradient(90deg, #f0f0f0, #d0d0d0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
    }
    
    /* Button styling */
    .stButton button {
        background: linear-gradient(90deg, #3a3a4a, #2a2a35);
        color: white;
        border: none;
        transition: all 0.3s;
    }
    
    .stButton button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    /* Animations */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease forwards;
    }
    
    /* Platform buttons */
    .platform-btn {
        display: inline-block;
        margin-right: 10px;
        padding: 5px 15px;
        border-radius: 20px;
    }
    
    .platform-twitter {
        background-color: #1DA1F2;
        color: white;
    }
    
    .platform-linkedin {
        background-color: #0A66C2;
        color: white;
    }
    
    .platform-facebook {
        background-color: #1877F2;
        color: white;
    }
    
    /* Glass effect */
    .glass {
        background: rgba(30, 30, 36, 0.4);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 10px;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'content' not in st.session_state:
    st.session_state.content = ""
if 'image_url' not in st.session_state:
    st.session_state.image_url = ""
if 'scheduled_posts' not in st.session_state:
    st.session_state.scheduled_posts = []

# Helper functions
def generate_text(prompt: str, platform: str, tone: str) -> str:
    """Generate AI text content using OpenRouter API"""
    try:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }
        
        system_prompt = f"You are an expert social media content creator. Create a {tone} post for {platform}."
        
        data = {
            "model": "anthropic/claude-3-sonnet",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Write a {tone} social media post about {prompt} for {platform}."}
            ],
            "max_tokens": 500
        }
        
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        response_data = response.json()
        
        if response.status_code == 200:
            return response_data["choices"][0]["message"]["content"]
        else:
            st.error(f"Error generating content: {response_data.get('error', {}).get('message', 'Unknown error')}")
            return ""
    except Exception as e:
        st.error(f"Error: {str(e)}")
        return ""

def generate_image(prompt: str, style: str) -> str:
    """Generate AI image using Replicate API"""
    try:
        headers = {
            "Authorization": f"Token {REPLICATE_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # Adjust prompt based on style
        if style == "photorealistic":
            style_prompt = f"{prompt}, photorealistic, detailed, high resolution"
        elif style == "cartoon":
            style_prompt = f"{prompt}, cartoon style, vibrant colors, stylized"
        elif style == "abstract":
            style_prompt = f"{prompt}, abstract art style, expressionist, non-representational"
        elif style == "3d-render":
            style_prompt = f"{prompt}, 3D rendered, blender style, soft lighting, ray tracing"
        else:
            style_prompt = prompt
        
        # Using Flux.1 as specified
        data = {
            "version": "flux.1",
            "input": {
                "prompt": style_prompt
            }
        }
        
        # Create prediction
        response = requests.post("https://api.replicate.com/v1/predictions", headers=headers, json=data)
        response_data = response.json()
        
        if response.status_code == 201:
            # Get prediction ID
            prediction_id = response_data["id"]
            
            # Poll for result
            while True:
                response = requests.get(f"https://api.replicate.com/v1/predictions/{prediction_id}", headers=headers)
                prediction = response.json()
                
                if prediction["status"] == "succeeded":
                    return prediction["output"]
                elif prediction["status"] == "failed":
                    st.error("Image generation failed")
                    return ""
                
                time.sleep(1)
        else:
            st.error(f"Error starting image generation: {response_data.get('detail', 'Unknown error')}")
            return ""
    except Exception as e:
        st.error(f"Error: {str(e)}")
        return ""

# Header
st.markdown("<div class='fade-in'><h1 class='gradient-text'>AutoPost AI Content Generator</h1></div>", unsafe_allow_html=True)
st.markdown("<div class='fade-in'><p>Create engaging social media content with AI assistance, then schedule it across platforms.</p></div>", unsafe_allow_html=True)

# Create two columns for the layout
col1, col2 = st.columns([2, 1])

with col1:
    # AI Content Generator Card
    st.markdown("<div class='card fade-in'><h2>🪄 AI Content Generator</h2></div>", unsafe_allow_html=True)
    
    topic = st.text_input("Topic/Prompt", placeholder="E.g., New product launch, Industry trends, Customer success story")
    
    col_tone, col_platform = st.columns(2)
    
    with col_tone:
        tone = st.selectbox("Tone", options=["professional", "casual", "humorous"])
        
    with col_platform:
        platform = st.selectbox("Platform", options=["Twitter", "LinkedIn", "Facebook"])
    
    if st.button("Generate Content"):
        with st.spinner("Generating content..."):
            st.session_state.content = generate_text(topic, platform.lower(), tone)
    
    content = st.text_area("Content", value=st.session_state.content, height=200)
    
    # Update session state when content is edited
    if content != st.session_state.content:
        st.session_state.content = content
    
    # AI Image Generator Card
    st.markdown("<div class='card fade-in'><h2>🖼️ AI Image Generator</h2></div>", unsafe_allow_html=True)
    
    col_prompt, col_style = st.columns([3, 1])
    
    with col_prompt:
        image_prompt = st.text_input("Image Description", value=topic)
        
    with col_style:
        image_style = st.selectbox("Style", options=["photorealistic", "cartoon", "abstract", "3d-render"])
    
    if st.button("Generate Image"):
        with st.spinner("Generating image..."):
            image_url = generate_image(image_prompt, image_style)
            if image_url:
                st.session_state.image_url = image_url
    
    if st.session_state.image_url:
        st.image(st.session_state.image_url, caption="Generated Image", use_column_width=True)

with col2:
    # Schedule Post Card
    st.markdown("<div class='card fade-in'><h2>🕒 Schedule Post</h2></div>", unsafe_allow_html=True)
    
    # Platforms
    st.markdown("<h3>Platforms</h3>", unsafe_allow_html=True)
    col_tw, col_li, col_fb = st.columns(3)
    
    with col_tw:
        twitter = st.checkbox("Twitter")
    
    with col_li:
        linkedin = st.checkbox("LinkedIn")
    
    with col_fb:
        facebook = st.checkbox("Facebook")
    
    # Date and Time
    st.markdown("<h3>Date & Time</h3>", unsafe_allow_html=True)
    post_date = st.date_input("Date", min_value=datetime.now().date())
    post_time = st.selectbox("Time", options=["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"])
    
    # Post Summary
    st.markdown("<div class='glass' style='padding: 15px; margin-top: 20px;'>", unsafe_allow_html=True)
    st.markdown("<h4>Post Summary</h4>", unsafe_allow_html=True)
    
    if st.session_state.content:
        summary = st.session_state.content[:60] + "..." if len(st.session_state.content) > 60 else st.session_state.content
        st.markdown(f"<p>{summary}</p>", unsafe_allow_html=True)
    else:
        st.markdown("<p>No content yet</p>", unsafe_allow_html=True)
    
    # Selected platforms
    platforms = []
    if twitter:
        platforms.append("Twitter")
    if linkedin:
        platforms.append("LinkedIn")
    if facebook:
        platforms.append("Facebook")
    
    if platforms:
        platform_html = ""
        for p in platforms:
            class_name = f"platform-{p.lower()}"
            platform_html += f'<span class="platform-btn {class_name}">{p}</span>'
        st.markdown(f"<p>Platforms: {platform_html}</p>", unsafe_allow_html=True)
    else:
        st.markdown("<p>No platforms selected</p>", unsafe_allow_html=True)
    
    # Date and time
    st.markdown(f"<p>Scheduled for: {post_date.strftime('%b %d')} at {post_time}</p>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
    
    # Schedule button
    if st.button("Schedule Post", key="schedule_post"):
        if not st.session_state.content:
            st.error("Please generate or write content before scheduling")
        elif not platforms:
            st.error("Please select at least one platform")
        else:
            # Add post to scheduled posts
            scheduled_post = {
                "content": st.session_state.content,
                "image_url": st.session_state.image_url,
                "platforms": platforms,
                "date": post_date.strftime("%Y-%m-%d"),
                "time": post_time,
                "status": "scheduled"
            }
            
            st.session_state.scheduled_posts.append(scheduled_post)
            st.success(f"Post scheduled for {', '.join(platforms)} on {post_date.strftime('%b %d')} at {post_time}")
            
            # Clear form
            st.session_state.content = ""
            st.session_state.image_url = ""

# Display scheduled posts if any
if st.session_state.scheduled_posts:
    st.markdown("<div class='card fade-in'><h2>📅 Scheduled Posts</h2></div>", unsafe_allow_html=True)
    
    for i, post in enumerate(st.session_state.scheduled_posts):
        with st.expander(f"Post {i+1} - {post['date']} at {post['time']}"):
            st.write("Content:")
            st.write(post["content"])
            
            st.write("Platforms:")
            platform_html = ""
            for p in post["platforms"]:
                class_name = f"platform-{p.lower()}"
                platform_html += f'<span class="platform-btn {class_name}">{p}</span>'
            st.markdown(platform_html, unsafe_allow_html=True)
            
            if post["image_url"]:
                st.image(post["image_url"], caption="Post Image", width=200)

# Footer
st.markdown("---")
st.markdown("<p style='text-align: center;'>© 2025 AutoPost AI - Built with Streamlit</p>", unsafe_allow_html=True)
