# dj-speech-to-text
Creating speech recognition web-component using SpeechRecognition API and Polymer.

Demo: https://dakotajang.github.io/speech-to-text/

**The SpeechRecognition API is experimental technology. Please check compatibility before using this API.**

## Start Project
First clone the project
```
git clone https://github.com/dakotaJang/dj-speech-to-text.git
```

Change directory to root project
```
cd dj-speech-to-text
```

Install dependencies
```
npm install
```

Start project
```
npm start
```

Open a browser and go to http://localhost:8081/dev/

This development files are found in ```./dev``` folder.

## Build Project
Build production code using webpack.
```
npm run build
```
This distribution files are found in ```./dist``` folder.

## Troubleshoot

Errors:
- ```Error: not-allowed```
  - Microphone blocked: Check the site settings and enable microphone.
  - No microphone found: Check if the mic is connected
- ```Error: This device/browser does not support speech recognition.```
  - This browser does not support the SpeechRecognition API. Please try using Chrome on desktop or on Android.

### References
- SpeechRecognition API: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
- SpeechRecognition API Demo: https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API