#!/usr/bin/env bash
# Turns the three Higgsfield clips into everything the site's scroll film needs.
#
#   1. Put your clips in assets/video/ as clip-1.mp4, clip-2.mp4, clip-3.mp4
#   2. Run:  bash make-frames.sh
#
# Produces: assets/video/film-1080.mp4, film-720.mp4,
#           assets/frames/{desktop,mobile}/f_0001.jpg …, assets/img/poster-{1,2,3}.jpg,
#           assets/frames/manifest.json  (script.js reads this and switches from the
#           procedural stand-in to the real film automatically)
set -euo pipefail
cd "$(dirname "$0")"

V=assets/video
for i in 1 2 3; do
  [[ -f "$V/clip-$i.mp4" ]] || { echo "Missing $V/clip-$i.mp4"; exit 1; }
done
command -v ffmpeg >/dev/null || { echo "ffmpeg is required (brew install ffmpeg)"; exit 1; }

echo "→ Joining clips"
ffmpeg -loglevel error -y -i "$V/clip-1.mp4" -i "$V/clip-2.mp4" -i "$V/clip-3.mp4" \
  -filter_complex "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=24[a];\
[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=24[b];\
[2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=24[c];\
[a][b][c]concat=n=3:v=1:a=0[v]" \
  -map "[v]" -c:v libx264 -crf 18 -pix_fmt yuv420p "$V/film-raw.mp4"

echo "→ Scrub-friendly videos (every frame a keyframe)"
ffmpeg -loglevel error -y -i "$V/film-raw.mp4" -c:v libx264 -crf 23 -g 1 -pix_fmt yuv420p -an -movflags +faststart "$V/film-1080.mp4"
ffmpeg -loglevel error -y -i "$V/film-raw.mp4" -vf scale=1280:-2 -c:v libx264 -crf 25 -g 1 -pix_fmt yuv420p -an -movflags +faststart "$V/film-720.mp4"

echo "→ Image sequences"
rm -f assets/frames/desktop/*.jpg assets/frames/mobile/*.jpg
mkdir -p assets/frames/desktop assets/frames/mobile
ffmpeg -loglevel error -y -i "$V/film-raw.mp4" -vf "fps=12,scale=1600:-2" -q:v 5 assets/frames/desktop/f_%04d.jpg
ffmpeg -loglevel error -y -i "$V/film-raw.mp4" -vf "fps=6,scale=900:-2"  -q:v 6 assets/frames/mobile/f_%04d.jpg

echo "→ Posters (last frame of each scene)"
for i in 1 2 3; do
  ffmpeg -loglevel error -y -sseof -0.1 -i "$V/clip-$i.mp4" -frames:v 1 -vf scale=1600:-2 -q:v 4 "assets/img/poster-$i.jpg"
done

D=$(ls assets/frames/desktop | wc -l | tr -d ' ')
M=$(ls assets/frames/mobile | wc -l | tr -d ' ')
printf '{ "desktop": %s, "mobile": %s, "ext": "jpg" }\n' "$D" "$M" > assets/frames/manifest.json
rm -f "$V/film-raw.mp4"

echo "✓ Done: $D desktop frames, $M mobile frames"
du -sh assets/frames/desktop assets/frames/mobile "$V/film-1080.mp4" "$V/film-720.mp4"
