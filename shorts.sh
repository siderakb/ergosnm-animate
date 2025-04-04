#!/bin/bash

# libx265: CPU H.265
# h264_nvenc: NVIDIA GPU H.264
# hevc_nvenc: NVIDIA GPU H.265

ffmpeg -i output/ErgoSNM_intro_animate.mkv \
  -vf "subtitles=captions/en.srt:force_style='FontName=Noto Sans,FontSize=16,MarginV=65,PrimaryColour=&H00F0E9E5,Outline=0'" \
  -c:v hevc_nvenc -crf 24 -preset slow \
  -c:a copy output/ErgoSNM_intro_animate_shorts.mkv \
  -y
