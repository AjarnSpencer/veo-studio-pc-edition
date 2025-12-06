/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Creates a thumbnail from a video URL.
 * @param videoUrl The URL of the video (can be a blob URL).
 * @returns A promise that resolves with a data URL (base64) of the thumbnail.
 */
export const createThumbnail = (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.style.display = 'none';
    video.crossOrigin = 'anonymous'; // Important for CORS if video is not a blob URL
    video.currentTime = 1; // Seek to 1 second into the video

    video.addEventListener('loadeddata', () => {
      // Wait for the video frame to be ready
      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context.'));
          return;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');

        // Clean up
        video.remove();
        canvas.remove();

        resolve(dataUrl);
      });
    });

    video.addEventListener('error', (e) => {
      reject(new Error(`Failed to load video for thumbnail: ${e.message}`));
      video.remove();
    });

    video.src = videoUrl;
    document.body.appendChild(video); // Needs to be in the DOM to load
  });
};
