运动数值化网页使用说明

1. 网站代码：index.html、style.css、app.js、config.js。将这四个文件上传 GitHub 仓库根目录。
2. 视频与报告：推荐上传到腾讯云 COS，分别是 avatar.mp4、presentation_video.mp4、slides.pdf、slides.pptx。
3. 打开 config.js，把四个地址替换为 COS 提供的 HTTPS 可访问地址（只开放读取，不开放写入）。保存后上传 GitHub，EdgeOne Pages 会自动重新部署。
4. 如需本地预览，也可以在网站目录下创建 assets 文件夹，把四个媒体文件放进去；本地文件最好使用本地 HTTP 服务器预览。
5. 两个视频均保留声音，可分别静音；若两段原视频包含同一段讲解音频，建议默认静音其中一段，以免回声。
6. 两个视频最好时长一致。浏览器播放同步会有小幅误差，本页面使用周期性校正。
7. PDF 翻页采用浏览器 PDF 阅读器页码定位，部分浏览器可能不支持；可使用“在新窗口查看 PDF”按钮。
8. 中国大陆长期正式访问需留意 EdgeOne Pages 自定义域名、ICP 备案以及 COS 流量计费。
