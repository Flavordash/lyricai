AI-Powered Lyric Generator
A web-based platform that generates custom song lyrics using DeepSeek's API and OpenAI's GPT-4o Mini. It features BPM-based rhythm adjustments, automated content moderation, and a robust data pipeline.

A visual of the platform's clean and intuitive user interface.

Table of Contents
Introduction

Features

Getting Started

Prerequisites

Installation

Usage

Technical Approach

Contributing

License

Contact

Introduction
This project is a sophisticated lyric generation tool designed for musicians, songwriters, and creative enthusiasts. It leverages a combination of powerful large language models to create unique and contextually relevant song lyrics. The platform's core innovation lies in its ability to navigate the strict content policies of modern AI APIs and the hardware limitations of local development.
<img width="1276" height="636" alt="Screenshot 2025-02-12 at 2 27 32 PM copy" src="https://github.com/user-attachments/assets/af93b8f2-5d93-4154-b2b6-c6b11667d7d2" />
<img width="1104" height="617" alt="Screenshot 2025-03-28 at 1 42 05 PM copy" src="https://github.com/user-attachments/assets/6c180ccd-d57d-4079-8f88-6e026fe125e0" />
<img width="1086" height="677" alt="Screenshot 2025-03-28 at 2 42 02 PM copy" src="https://github.com/user-attachments/assets/d4747a8e-b622-40eb-99b1-25fbefb6d4a9" />


Features
Multi-Model Integration: Leverages both OpenAI's GPT-4o Mini and DeepSeek's API for dynamic and specialized lyrical output.

BPM-Based Rhythm Adjustment: Automatically adjusts the generated lyrics to fit a specified BPM (beats per minute), ensuring the text aligns naturally with a song's rhythm.

Automated Content Moderation: Integrates a robust moderation system to screen user input and AI-generated output, ensuring all content remains safe and compliant.

Data Pipeline for Fine-Tuning: Features a robust system for processing multi-language datasets using JSONL, ready for future model fine-tuning or advanced prompt engineering.

Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Node.js (v18.x or later)

Python (v3.10 or later)

An OpenAI API key

A DeepSeek API key

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/your-repository.git
cd your-repository
Install backend dependencies (Python):

Bash

pip install -r requirements.txt
Install frontend dependencies (Node.js):

Bash

npm install
Create a .env file in the root directory and add your API keys:

OPENAI_API_KEY=your_openai_api_key_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
Usage
<img width="1298" height="839" alt="Screenshot 2025-09-16 at 7 19 12 PM" src="https://github.com/user-attachments/assets/d38aba0b-360a-448a-bafa-644dcbd6a747" />
<img width="1298" height="839" alt="Screenshot 2025-09-16 at 7 19 40 PM" src="https://github.com/user-attachments/assets/752f3701-285b-4988-a9b2-e084f5046f29" />
<img width="1298" height="839" alt="Screenshot 2025-09-16 at 7 20 04 PM" src="https://github.com/user-attachments/assets/8287755b-a11e-4f11-9c3b-72c99c38b55f" />
<img width="1298" height="839" alt="Screenshot 2025-09-16 at 7 21 22 PM" src="https://github.com/user-attachments/assets/309748d1-5d3f-4daf-9a45-cb1c9903ace2" />


Technical Approach
This project's development required overcoming significant technical challenges, which shaped its final architecture.

Navigating Content Policies: The initial goal was to fine-tune a model on custom lyrical datasets. However, this was blocked by strict content policies that flagged data, forcing a pivot in strategy.

Addressing Hardware Limitations: The project then pivoted to using a local LLM for fine-tuning. Unfortunately, the high processing demands exceeded the available hardware, leading to performance bottlenecks.

The Solution: DeepSeek Integration: The final and most effective solution was to utilize the DeepSeek API. DeepSeek's models provided a powerful and flexible way to achieve a high-quality lyrical output through advanced prompt engineering, without the need for resource-intensive local training. This approach allowed the project to achieve its goals while working within real-world constraints.

The data processing pipeline, using JSONL, was a crucial part of this journey, preparing the datasets for both the attempted local fine-tuning and the advanced prompt engineering with DeepSeek.

Contributing
We welcome contributions! Please feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
If you have any questions, feel free to reach out.

KWANHOON LEE/ back7930@gmail.com
