 command for extracting frames:
 ffmpeg -i background.mp4 -start_number 1 -vsync 0 -q:v 1 frames/frame_%04d.jpg

 command for merging frames:
 ffmpeg -framerate 30 -i frame_%04d.jpg -c:v libx264 -pix_fmt yuv420p output.mp4
