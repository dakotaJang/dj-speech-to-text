/**
 * @license
 * Copyright (c) 2018 Dakota Jang. All rights reserved.
 * This code may only be used under the MIT license found
 * at https://github.com/dakotaJang/dj-speech-to-text/blob/master/LICENSE
 * Author: Dakota Jang @dakotaJang
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

declare global {
  interface Window {
    SpeechRecognition: any;
    SpeechGrammarList: any;
    SpeechRecognitionEvent: any;
    webkitSpeechRecognition: any;
    webkitSpeechGrammarList: any;
    webkitSpeechRecognitionEvent: any;
  }
}

const ON_START_MESSAGE = 'Listening...';
const ON_END_MESSAGE = 'Not Listening...';

class DjSpeechToText extends PolymerElement {
  $:any;
  _recognition: any;
  _isListening: boolean = false;

  public get isListening() : boolean {
    return this._isListening;
  }

  public set isListening(v : boolean) {
    this._isListening = v;
    if(this._isListening){
      this.$.listening.innerHTML = 'End Listening';
      this.$['toggle-listening'].className = 'listening';
    }else{
      this.$.listening.innerHTML = 'Start Listening';
      this.$['toggle-listening'].removeAttribute('class');
    }
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          text-align: center;
        }
        #final-transcript{
          font-weight: bold;
        }
        button{
          font-size: 14px;
          background-color: #0547ff;
          border-radius: 4px;
          color: white;
          height: 36px;
          line-height: 36px;
          margin:16px 0;
          padding: 0 16px;
          text-decoration: none;
          border: none;
        }
        button.listening{
          background-color: #f00;
        }
        #error{
          color:#f00;
          font-weight:bold;
        }
        #transcript{
          padding: 0 16px;
        }
      </style>
      <h1>&lt;dj-speech-to-text&gt;</h1>
      <div id="error"></div>
      <div>
        <button id="toggle-listening" on-click="toggleListening">
          <span id="listening">Start Listening</span>
        </button>
      </div>
      <div id="transcript"><span id="final-transcript"></span><span id="interim-transcript"></span></div>
    `;
  }

  constructor() {
    super();
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(SpeechRecognition){
      let isAndroid = /(android)/i.test(navigator.userAgent);

      this._recognition = new SpeechRecognition();
      this._recognition.continuous = true;
      this._recognition.interimResults = true;
      this._recognition.onresult = isAndroid ? this.showResultMobile.bind(this) : this.showResult.bind(this);
      this._recognition.onerror = this.onError.bind(this);
      this._recognition.onaudioend = this.endListening.bind(this);
    }
  }

  ready(){
    super.ready();
    if(!this._recognition){
      this.displayUnsupported();
    }
  }

  toggleListening(){
    if(this.isListening){
      this.endListening();
    }else{
      this.startListening();
    }
  }

  startListening(){
    this.isListening = true;
    this._recognition.start();
    this.$.error.hidden = true;
    this.$['final-transcript'].innerHTML = '';
    this.$['interim-transcript'].innerHTML = '';
  }

  endListening(){
    this.isListening = false;
    this._recognition.stop();
  }

  showResult(event){
    let interim_transcript  = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        this.$['final-transcript'].innerHTML += event.results[i][0].transcript;
      }else{
        interim_transcript += event.results[i][0].transcript;
      }
      this.$['interim-transcript'].innerHTML = interim_transcript;
    }
  }

  // interimResults behavior on android is different
  // temporary fix until API is standardized
  showResultMobile(event){
    this.$['final-transcript'].innerHTML = event.results[event.results.length-1][0].transcript;
  }

  onError(event){
    this.isListening = false;
    this.$.error.hidden = false;
    this.$.error.innerHTML = `Error: ${event.error}`;
  }

  displayUnsupported(){
    this.$['toggle-listening'].hidden = true;
    this.onError({error: 'This device/browser does not support speech recognition.'});
  }
}

window.customElements.define('dj-speech-to-text', DjSpeechToText);
