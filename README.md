
# AI-Powered Lyric Generator

> A web-based platform that generates custom song lyrics using **DeepSeek's API** and **OpenAI's GPT-4o Mini**. It features BPM-based rhythm adjustments, automated content moderation, and a robust data pipeline.

<img width="1298" height="839" alt="Screenshot 2025-09-16 at 7 19 12 PM" src="https://github.com/user-attachments/assets/0eb1476c-c5bd-4d87-85b7-5205ed4ba7b4" />


-----

## Table of Contents

  - [Introduction](https://www.google.com/search?q=%23introduction)
  - [Features](https://www.google.com/search?q=%23features)
  - [Getting Started](https://www.google.com/search?q=%23getting-started)
      - [Prerequisites](https://www.google.com/search?q=%23prerequisites)
      - [Installation](https://www.google.com/search?q=%23installation)
  - [Usage](https://www.google.com/search?q=%23usage)
  - [Technical Approach](https://www.google.com/search?q=%23technical-approach)
  - [Contributing](https://www.google.com/search?q=%23contributing)
  - [Contact](https://www.google.com/search?q=%23contact)

-----

## Introduction

This project is a sophisticated lyric generation tool designed for musicians, songwriters, and creative enthusiasts. It leverages a combination of powerful large language models to create unique and contextually relevant song lyrics. The platform's core innovation lies in its ability to navigate the strict content policies of modern AI APIs and the hardware limitations of local development.

From data scraping 
<img width="1192" height="669" alt="Screenshot 2025-03-28 at 2 01 10 PM copy" src="https://github.com/user-attachments/assets/4c54c0ac-9bc2-43dc-8b88-01340d81f706" />
<img width="1276" height="636" alt="Screenshot 2025-02-12 at 2 27 32 PM copy" src="https://github.com/user-attachments/assets/e0980448-3e37-4ccb-bb50-025e2615a304" />
<img width="1086" height="677" alt="Screenshot 2025-03-28 at 2 42 02 PM copy" src="https://github.com/user-attachments/assets/d244aac8-57bb-4096-aabd-b3c2d4085799" />
<img width="1116" height="641" alt="Screenshot 2025-03-28 at 2 27 55 PM copy" src="https://github.com/user-attachments/assets/b651c180-ce59-41b6-8c24-a4dd9c4050ac" />
<img width="1183" height="514" alt="Screenshot 2025-03-28 at 2 29 43 PM copy" src="https://github.com/user-attachments/assets/4c596062-0da1-4b5e-93ad-b732a81fb2a0" />

and Fine-Tune Failing
<img width="1104" height="617" alt="Screenshot 2025-03-28 at 1 42 05 PM copy" src="https://github.com/user-attachments/assets/f63c6f73-4488-4a7a-824f-a0b234e01e73" />


Now using DeepSeekAPI


## Features

  - **Multi-Model Integration:** Leverages both OpenAI's GPT-4o Mini and DeepSeek's API for dynamic and specialized lyrical output.
  - **BPM-Based Rhythm Adjustment:** Automatically adjusts the generated lyrics to fit a specified BPM (beats per minute), ensuring the text aligns naturally with a song's rhythm.
  - **Automated Content Moderation:** Integrates a robust moderation system to screen user input and AI-generated output, ensuring all content remains safe and compliant.
  - **Data Pipeline for Fine-Tuning:** Features a robust system for processing multi-language datasets using JSONL, ready for future model fine-tuning or advanced prompt engineering.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

  - `Node.js` (v18.x or later)
  - `Python` (v3.10 or later)
  - An OpenAI API key
  - A DeepSeek API key

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```
2.  Install backend dependencies (Python):
    ```bash
    pip install -r requirements.txt
    ```
3.  Install frontend dependencies (Node.js):
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add your API keys:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    DEEPSEEK_API_KEY=your_deepseek_api_key_here
    ```

## Usage
<img width="1298" height="839" alt="Screenshot 2025-09-16 at 7 19 40 PM" src="https://github.com/user-attachments/assets/35b4e2c8-484d-4dce-99f0-e4561e2a26f3" />
<img width="1298" height="839" alt="Screenshot 2025-09-16 at 7 20 04 PM" src="https://github.com/user-attachments/assets/5918624e-3690-40bb-ab02-345fe95a2c32" />
<img width="1298" height="839" alt="Screenshot 2025-09-16 at 7 21 22 PM" src="https://github.com/user-attachments/assets/f2ce5be7-6e95-4092-950c-53e3249162eb" />


## Technical Approach

This project's development required overcoming significant technical challenges, which shaped its final architecture.

1.  **Navigating Content Policies:** The initial goal was to fine-tune a model on custom lyrical datasets. However, this was blocked by strict content policies that flagged data, forcing a pivot in strategy.

2.  **Addressing Hardware Limitations:** The project then pivoted to using a local LLM for fine-tuning. Unfortunately, the high processing demands exceeded the available hardware, leading to performance bottlenecks.

3.  **The Solution: DeepSeek Integration:** The final and most effective solution was to utilize the **DeepSeek API**. DeepSeek's models provided a powerful and flexible way to achieve a high-quality lyrical output through advanced prompt engineering, without the need for resource-intensive local training. This approach allowed the project to achieve its goals while working within real-world constraints.

The data processing pipeline, using JSONL, was a crucial part of this journey, preparing the datasets for both the attempted local fine-tuning and the advanced prompt engineering with DeepSeek.

## Contributing

We welcome contributions\! Please feel free to open an issue or submit a pull request.

## Contact

If you have any questions, feel free to reach out.

KWANHOON LEE - back7930@gmail.com
