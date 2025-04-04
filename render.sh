#!/bin/bash

# libx265: CPU H.265
# h264_nvenc: NVIDIA GPU H.264
# hevc_nvenc: NVIDIA GPU H.265

ffmpeg -framerate 60 -i output/project/%06d.png \
  -itsoffset 0.3394 -i audio/audio.mp3 \
  -i captions/en.srt \
  -i captions/zh.srt \
  -map 0:v:0 -map 1:a:0 -map 2 -map 3 \
  -c:v hevc_nvenc -preset slow -crf 24 \
  -c:a aac \
  -c:s srt \
  -metadata:s:s:0 language=eng -metadata:s:s:0 title="English" \
  -metadata:s:s:1 language=zho -metadata:s:s:1 title="中文" \
  output/ErgoSNM_intro_animate.mkv \
  -y
