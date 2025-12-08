# Veo Studio PC Edition
*by Ajarn Spencer Littlewood*

![VEO Desktop Studio Icon](https://github.com/AjarnSpencer/veo-studio-pc-edition/blob/main/icons/veodesktopstudiopc.png)

### Describe any scene and get a stunning video in seconds. Veo Studio is an effortless, web-based video generator powered by Google's state-of-the-art Veo model.

## Features

- **Multiple Generation Modes**:
  - **Text-to-Video**: Create vibrant, high-quality videos from simple text descriptions.
  - **Frames-to-Video**: Generate a smooth video transition between a starting image and an optional ending image. You can also create seamless loops from a single image.
  - **References-to-Video**: Guide the generation process by providing up to three reference images to define characters, environments, or items.
  - **Extend Video**: Add a 7-second continuation to a previously generated 720p video.
- **Advanced Customization**:
  - **Model Selection**: Choose between the `veo-3.1-fast-generate-preview` for speed or the `veo-3.1-generate-preview` for advanced features like reference images.
  - **Aspect Ratio**: Generate videos in either landscape (16:9) or portrait (9:16).
  - **Resolution**: Select between 720p and 1080p for your final video output.
- **Secure & Simple API Key Integration**:
  - A clean, GUI-based prompt for your API key. The key is stored securely in your browser's session storage and is never written to a file.
  - A persistent **Manage API Key** button lets you change your key at any time.
- **Intuitive User Experience**:
  - **Session Gallery**: A history panel keeps track of all videos created in your current session, allowing you to easily revisit, download, or extend them.
  - **Smart Download**: Download your videos with filenames intelligently generated from your prompt.
  - **Cost Awareness**: The UI displays an estimated cost for each generation before you start.
  - A modern interface that makes video generation simple and accessible.
  - Real-time loading indicators with creative messages keep you informed.
  - Easy-to-use controls for downloading, retrying, extending, or starting a new video.
## Screenshot 1
![VEO Desktop Studio](https://github.com/AjarnSpencer/veo-studio-pc-edition/blob/main/icons/Veo-Studio%20.png)

## Screenshot 2

![VEO Desktop Studio](https://github.com/AjarnSpencer/veo-studio-pc-edition/blob/main/icons/veo-studio-pc-edition.png)
  - **Download the App**:
## Releases Page;
Download the latest releases here; https://github.com/AjarnSpencer/veo-studio-pc-edition/releases

## How to Use

Follow these steps to create your first video.

1.  **Provide Your API Key**
    Veo is a powerful, paid-only model and requires a Google Cloud API key with billing enabled.
    -   **When running locally (from GitHub):** The first time you open the app, a dialog will pop up asking for your API key. Paste it in and click "Save". The key is stored securely for your session. You can change it anytime by clicking the **key icon** in the top-right corner.
    -   **When running in Google AI Studio:** Click "Continue" in the dialog to select your key from the AI Studio environment.

2.  **Choose a Generation Mode**
    Click the icon on the left of the prompt bar to choose how you want to create your video.

    *   **(Default) Text to Video**: The simplest mode. Just type a description.
    *   **Frames to Video**: Create a video that transitions between images.
    *   **References to Video**: Use images to guide the AI's understanding of a character, place, or object.
    *   **Extend Video**: Add more time to a previously generated video.

3.  **Provide Your Creative Input**
    This is where the magic happens. Based on the mode you selected:

    *   **For Text to Video**: Write a descriptive prompt in the text box.
        > *Example: "A majestic eagle soaring through a dramatic canyon at sunset."*

    *   **For Frames to Video**:
        *   Upload a **Start Frame**. This is required.
        *   Optionally, upload an **End Frame**. The AI will generate a video that smoothly transitions from the start to the end image.
        *   If you only provide a start frame, you can check the **"Create a looping video"** box to generate a seamless, looping animation of that single image.
        *   You can also add a text prompt to guide the animation (e.g., "The car drives down the road").

    *   **For References to Video**:
        *   Upload 1 to 3 **Reference Images**. These images tell the model what you want to see. For example, you could provide an image of a specific person, a particular style of architecture, or a unique object.
        *   Write a prompt that describes the scene and *how to use* the reference images.
        > *Example: With a reference image of a blue robot, you could prompt: "The blue robot walking through a neon-lit city at night."*
        *   *Note: This mode requires the `veo-3.1-generate-preview` model and is locked to 720p landscape resolution.*

    *   **For Extend Video**:
        *   This mode becomes available after you've generated a 720p video.
        *   Click the "Extend" button on the results screen.
        *   The app will automatically load your previous video.
        *   Write a prompt to describe what should happen next.
        > *Example: If your video was "a cat sits on a fence", your extend prompt could be "suddenly, a bird lands next to it."*

4.  **Fine-Tune Your Settings (Optional)**
    Click the settings icon (sliders) to configure advanced options:
    *   **Model**: `fast-generate` is quicker, while `generate` supports more features like reference images.
    *   **Aspect Ratio**: Choose between Landscape (16:9) and Portrait (9:16).
    *   **Resolution**: Select 720p or 1080p. Note that only 720p videos can be extended.

5.  **Generate and Enjoy!**
    *   Hit the arrow button to start the generation. This can take a few minutes.
    *   Once finished, your video will appear. You can play it, download it, and decide your next step: **Download**, **Extend** it (if 720p), **Retry**, or start a **New Video**.
    *   Click the **clock icon** in the header to view your session history.

## Local Installation and Setup

This project is a web application that can be run on your computer (Windows, macOS, or Linux). The setup is designed to be simple for everyone.

### Prerequisites

- **Node.js**: [Download and install from nodejs.org](https://nodejs.org/en/download/)
- **Git**: [Download and install from git-scm.com](https://git-scm.com/downloads)

### Installation Steps for All Users

1.  **Clone the Repository**
    Open your terminal (like Command Prompt, PowerShell, or Terminal) and run the following commands:
    ```bash
    git clone https://github.com/AjarnSpencer/veo-studio-pc-edition.git
    cd veo-studio-pc-edition
    ```

2.  **Install Dependencies**
    In the same terminal window, run:
    ```bash
    npm install
    ```

3.  **Run the Application**
    Now, start the application:
    ```bash
    npm run dev
    ```
    This will start a local web server. Your terminal will show a URL, typically `http://localhost:5173`. Open this URL in your web browser.

4.  **Add Your API Key in the App**
    - The first time you use the app, a dialog box will appear asking for your Google Cloud API key.
    - Paste your key into the input field and click **"Save and Continue"**.
    - Your key is saved securely in your browser's session storage for the current session only. It is **not** written to any files on your computer.

That's it! The application is ready to use.

### (Optional) For Developers: Using a `.env` File
If you are a developer and prefer a more permanent setup during development, you can use a `.env` file:
1.  Create a file named `.env` in the project's root directory.
2.  Add the following line, replacing `YOUR_API_KEY_HERE` with your key:
    ```
    API_KEY="YOUR_API_KEY_HERE"
    ```
The application will automatically use this key, and you will not be prompted in the GUI.

## Technology Stack

-   **Frontend**: React with TypeScript
-   **Styling**: Tailwind CSS
-   **Icons**: Nano Banana 2
-   **Video Generation**: Google Gemini API (`@google/genai`) using the Veo model.
-   **Build Tool**: Vite

## Content and Licensing
The source code for this application is licensed under the **Apache-2.0 License**.

The videos you generate using this tool are subject to **Google's Generative AI Terms of Service**. Please review their terms to understand your rights and ownership of the created content.
