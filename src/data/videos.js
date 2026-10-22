/**
 * Hero film paths.
 *
 * The hero is scrubbed — its `currentTime` is driven by scroll position rather
 * than played — so these encodes are built for random-access seeking:
 *
 *   - 8 s @ 24 fps, keyframe every 8 frames (0.33 s), `scenecut=0` so the
 *     interval is uniform; a seek therefore decodes at most 7 frames.
 *   - No B-frames and 1 reference frame: the shortest possible decode path
 *     from a keyframe (B-frames would need a future frame first, which is
 *     exactly what makes scrubbing stutter).
 *   - `-movflags +faststart` — the moov atom sits first, so the browser can
 *     range-request a byte offset near the wanted keyframe instead of waiting
 *     for the whole file.
 *   - Audio stripped (nothing to play, and it would keep the file open for a
 *     decode path we never use).
 *
 * Desktop is the master: 1568x672, CRF 23, ~3.7 MB. Mobile is the same footage
 * at 1024x439, CRF 24, ~1.5 MB — phones crop the frame hard in portrait, and a
 * lower pixel count is the cheapest scrub win available. The WebM is an
 * alternative source for engines without H.264; the MP4 is listed first on
 * purpose because hardware H.264 decoding scrubs more reliably than VP9.
 *
 * Re-encoding recipe (ffmpeg), for reference:
 *   ffmpeg -i source.mp4 -an -c:v libx264 -preset slow -profile:v high -crf 23 \
 *     -g 8 -keyint_min 8 -bf 0 -refs 1 -sc_threshold 0 -movflags +faststart \
 *     public/video/hero-desktop.mp4
 */
export const VIDEOS = {
  hero: {
    desktop: '/video/hero-desktop.mp4',
    mobile: '/video/hero-mobile.mp4',
    webm: '/video/hero-desktop.webm',
  },
}
