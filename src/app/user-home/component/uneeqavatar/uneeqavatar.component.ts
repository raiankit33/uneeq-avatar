import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Uneeq } from 'uneeq-js';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

import { AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';

declare var $: any;
declare var tour: any



@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-uneeqavatar',
  templateUrl: './uneeqavatar.component.html',
  styleUrls: ['./uneeqavatar.component.css']
})
export class UneeqavatarComponent implements OnInit {
  fullScreen: boolean = false;
  userText: any
  isSpinner: boolean = true
  iconShow: boolean = false
  contentCard: any;
  user: any = [];
  uneeq: any
  showMic: boolean = false
  token: any = '';
  msgDisplay: any;
  avatarTextActive: any;

  counting: number = 0
  QuestionListData: any;
  ccOnOff: boolean = true;
  styleWidthSize: any;
  stleHeightSize: any
  ischatBoxOpen: boolean = false
  idleTimeout: any;
  messageForQueueAvatar: boolean = false;
  mobileAvatarOnOff: any = false;
  showImage: boolean = false;

  smallSizeImage: boolean = false
  bigSizeImage: boolean = true
  avatarHideOnOff: boolean = false
  stopAvatarOnClick: boolean = false;
  mic: any
  isvoiceAnimationOn: boolean = false;
  UserccOnOff: boolean = false;
  questionList: any;
  optionList: any = [
    // 'A Give blood', 'B Look fff','C dgdgdgdgd' ,'D sssssssss'
  ];
  DescAnswer: any;
  QuestionccOnOff: boolean = true;

  checkFullScreenB: any = false
  accod1: boolean = true;
  accod2: boolean = false;
  CorrectAnswer: any;
  ImageData: any;
  linkDisData: any;
  dashboardTour: any
  followup: any;
  followName: any;
  feedback: boolean = false;
  openFeedbackForm: boolean = false;
  isClick: boolean = false;
  checkTestSeriespage: any;
  expandOn: boolean = false
  @Output() storedErrorCode = new EventEmitter<any>();
  mediaStream: any;
  audioTrack: any;
  pdfShow: any
  //= "https://pollydemo2022.s3.us-west-2.amazonaws.com/Presentation/49b4c467f429f846989cde5dbe9da95ffc.pdf";
  runLoderGPT: boolean = false;
  @ViewChild('childPdf') childPdf: any;
  userSpeakValue: any;
  pageReload: boolean = true;


  recognition: any;
  isListening = false;


  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  voiceText: any;
  showGraph = true;
  tourGuideValueCheck: any;
  micToggle: boolean = true;
  microphone: MediaStreamAudioSourceNode | any

  //
  recognizer: SpeechRecognizer | any;
  //subscriptionKey = '534c5018271443ed87e693c63f82a66b'; // old one 
  subscriptionKey = '9a9e0a9d5d7e4cebb5deee50ed7aa3db';
  serviceRegion = 'eastus';
  language = 'en-US'; // e.g. 'en-US'
  recognizer2: any
  speechRecognizer: any;
  spaceBarActive: boolean = false;
  isMicButtonActive: boolean = false;
  lastRecognized: any;
  recognizing: boolean = false;

  speechConfig: any;

  //
  timeoutID: any;
  isSubtitleAnimationRunning: boolean = false;
  isSubtitleON: boolean = true;
  SaveNewContData: any;
  isManualScrolling: any;

  constructor(private router: Router, private ngZone: NgZone, private service: AuthService, private elementRef: ElementRef, private renderer: Renderer2,
    private ser: UserService) {

  }


  ngOnInit(): void {
    this.isSpinner = true

    this.onLoadCard('')
    this.user = JSON.parse(localStorage.getItem('user') || '[]')
    this.token = JSON.parse(localStorage.getItem('token') || '{}')
    //  this.fullScreen = true
   // if (this.user.Presentation_View == "PPT with avatar") {
     this.funavatar()
  // } else {


   // }
    window.addEventListener('resize', this.functionName);
    // remove item on page refresh 
    window.onbeforeunload = function () {
      localStorage.removeItem('Avatar');
      localStorage.removeItem('screen');
      localStorage.removeItem('learningId');
    };
  }


  startTours() {
    setTimeout(() => {
      tour()
    }, 1000)
  }


  accordQestionhit() {
    if (this.accod1 === true) {
      // If accod1 is true, collapse the accordion panel
      $('#accod1').css('display', 'none')
      $('#accodH1').removeClass('active')
    } else if (this.accod1 === false) {
      // If accod1 is false, expand the accordion panel and collapse other panels
      $('#accod1').css('display', 'block')
      $('#accodH1').addClass('active')
      //
      this.accod2 = false
      $('#accod2').css('display', 'none')
      $('#accodH2').removeClass('active')
    }
    // Toggle the value of accod1
    this.accod1 = !this.accod1
  }

  accordAnswerHit() {
    if (this.accod2 === true) {
      // If accod1 is true, collapse the accordion panel
      $('#accod2').css('display', 'none')
      $('#accodH2').removeClass('active')
    } else if (this.accod2 === false) {
      // If accod1 is false, expand the accordion panel and collapse other panels
      this.accod1 = false
      $('#accod1').css('display', 'none')
      $('#accodH1').removeClass('active')
      //
      //  console.log('false')
      $('#accod2').css('display', 'block')
      $('#accodH2').addClass('active')

    }
    // Toggle the value of accod1
    this.accod2 = !this.accod2
  }


  recognizerSetup() {

  }

  onclickMic() {
    if (this.isMicButtonActive === true) {
      this.stop();
      this.isMicButtonActive = false;
      this.isSubtitleAnimationRunning = false;
    }
    else {
      this.recognizerSetup()
      if (this.voiceText) {
        this.voiceText = ""
        this.uneeq.stopSpeaking()
        this.stopSubtitleAnimation()
      }

      this.showMic = true
      this.isvoiceAnimationOn = true
      this.isMicButtonActive = true;

      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      const speechConfig = sdk.SpeechConfig.fromSubscription(this.subscriptionKey, this.serviceRegion);
      speechConfig.speechRecognitionLanguage = this.language;
      this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)

      //  console.log(this.recognizer)
      this.recognizer.recognizing = (s: any, e: any) => {
        //  console.log(`RECOGNIZING: Text=${e.result.text}`);
      };


      this.recognizer.recognized = (s: any, e: any) => {
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
          //  console.log(`RECOGNIZED: Text=${e.result.text}`);
          console.log('final', e.result.text);
          this.voiceText = e.result.text;
          this.uneeq.sendTranscript(this.voiceText)

          // this.recognizer.close();

          //this.recognizer.AudioConfig.turnOff()
          if (this.voiceText) {
            this.stop()

          }



        } else if (e.result.reason === sdk.ResultReason.NoMatch) {

          const noMatchDetail = sdk.NoMatchDetails.fromResult(e.result);
          console.log("No speech recognized." + " | NoMatchReason: " + sdk.NoMatchReason[noMatchDetail.reason]);
          // this.recognizer.AudioConfig.turnOff()
          // this.recognizer.close();
          this.isMicButtonActive = false;
          this.showMic = false
          this.isvoiceAnimationOn = false
          //  this.recognizer.stopContinuousRecognitionAsync(() => {
          //   this.recognizer.close();

          // })

          // Perform actions when no speech is recognized.
        } else {
          console.log(`ERROR: ${e.errorDetails}`);
        }
      };

      this.recognizer.canceled = (s: any, e: any) => {
        console.log(`CANCELED: Reason=${e.reason}`);

        if (e.reason == sdk.CancellationReason.Error) {
          console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
          console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);

        }

        this.recognizer.stopContinuousRecognitionAsync();
      };

      this.recognizer.speechEndDetected = (s: any, e: any) => {
        //   console.log(`(speechEndDetected) SessionId: ${e.sessionId}`);
        this.recognizer.close();
        this.recognizer = undefined;
      };

      this.recognizer.sessionStopped = (s: any, e: any) => {
        //  console.log("\n    Session stopped event.");
        this.recognizer.stopContinuousRecognitionAsync();
        // Perform actions when speech ends, such as stopping the recognition or handling the final result.
      };


      this.recognizer.startContinuousRecognitionAsync();

      // }
    }
  }


  stopOnclickMic() {
    this.recognizer.stopContinuousRecognitionAsync(
      () => {
        console.log("Speech recognition stopped.");
        // Perform actions after stopping the recognition.
      },
      (error: any) => {

        console.log(`Error stopping recognition: ${error}`);
        // Handle the error if the recognition couldn't be stopped.
      }
    );

    this.showMic = false
    this.isvoiceAnimationOn = false
    this.isMicButtonActive = false

  }

  stop() {

    this.showMic = false
    this.isvoiceAnimationOn = false
    this.recognizing = false;
    this.isMicButtonActive = false;
    this.recognizer.stopContinuousRecognitionAsync(

      this.stopRecognizer.bind(this),

    )
  }


  stopRecognizer() {
    this.recognizer.close()
    this.recognizer = undefined
    console.log('stopped')
  }


  chatbar() {
    const chatB = this.elementRef.nativeElement.querySelector('#chat-bar');
    if (this.ischatBoxOpen === true) {
      chatB.style.display = 'none';
    } else if (this.ischatBoxOpen === false) {
      chatB.style.display = 'block'; 
    }
    this.ischatBoxOpen = !this.ischatBoxOpen
  }


  // user cc button On/Off 
  userCCOnOf() {
    const userText = this.elementRef.nativeElement.querySelector('#userText');
    if (this.UserccOnOff == true) {
      this.renderer.addClass(userText, 'showI');
      //  $('#userText').addClass('showI')
    } else if (this.UserccOnOff == false) {
      this.renderer.removeClass(userText, 'showI');
      // $('#userText').removeClass('showI')
    }
    this.UserccOnOff = !this.UserccOnOff
    // localStorage.setItem('cc', JSON.stringify(this.ccOnOff))
  }

  // question CC on test series
  QuestionCCOnOf() {
    const QuestionDisplay = this.elementRef.nativeElement.querySelector('#QuestionDisplay');
    if (this.QuestionccOnOff == true) {
      this.renderer.addClass(QuestionDisplay, 'hideMessage');
      // $('#QuestionDisplay').addClass('hideMessage')
    } else if (this.QuestionccOnOff == false) {
      this.renderer.removeClass(QuestionDisplay, 'hideMessage');
      // $('#QuestionDisplay').removeClass('hideMessage')
    }
    this.QuestionccOnOff = !this.QuestionccOnOff
  }


  // uneeq mic start function
  uneeqStartSpeak() {
    this.showMic = true
    this.uneeq.startRecording();
  }

  // uneeq mic stop function
  uneeqStopSpeak() {
    this.showMic = false
    this.uneeq.stopRecording();
  }




  hideMethod() {
    const div1 = this.elementRef.nativeElement.querySelector('#movableCard');
    const div2 = this.elementRef.nativeElement.querySelector('#centerDiv');
    if (this.mobileAvatarOnOff === true) {
      this.renderer.removeClass(div1, 'showI');
      this.renderer.removeClass(div2, 'showI');
   
    } else if (this.mobileAvatarOnOff === false) {
      this.renderer.addClass(div1, 'showI');
      this.renderer.addClass(div2, 'showI');
    }
    this.mobileAvatarOnOff = !this.mobileAvatarOnOff
  }


  // uneeq avatar start function
  funavatar() {
    this.msgDisplay = document.getElementById('msg');
    const v1: any = document.getElementById('sm-video');

    let options = {
      url: 'https://api.us.uneeq.io',
      // prod
      // conversationId: 'e8b92f57-d619-4090-9450-4b47a0e375a5',
      // dev 
      conversationId: '8e4e7e90-a17d-441e-afdf-37b87394f04c',
      avatarVideoContainerElement: v1,
      localVideoContainerElement: v1,
      messageHandler: (msg: any) => this.messageHandler(msg),
      sendLocalVideo: false,
      enableMicrophone: false,
      speechToTextLocales: 'en-US:ja-JP:de-DE',
      micActivityMessages: true,
      playWelcome: true,
      //logging:true,
      // When holding down spacebar, durations shorter that this will trigger

      enableTransparentBackground: true,
      voiceInputMode: "PUSH_TO_TALK",
      // voiceInputMode: "VOICE_ACTIVITY",
      sendLocalAudio: true
    }

    this.uneeq = new Uneeq(options);

    let data = JSON.stringify({
      "token": "VAnXf3zGIbtJjS8xwFTnKMZxP2M",
      "name": "Hannah Edyou",
      "email": "hannah@yopmail.com",
      "lastlogin": "2023-07-31,08:17:33"
    });
    this.service.uneeqAvatar(data).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.ser.updateSharedData(this.uneeq);
        this.tourGuideValueCheck = res.loginCheck
        this.uneeq.initWithToken(res.token);

        // 30 sec prompt to
        document.body.addEventListener('click', () => this.reset());
        document.body.addEventListener('mouseover', () => this.reset());
        document.body.addEventListener('keypress', () => this.reset());
       

      } else if (res.statusCode == 400) {
        var error = res.statusCode
        // console.log('error', error)
        this.storedErrorCode.emit(error);
      } else {
        var error = res.statusCode
        this.storedErrorCode.emit(error);
      }
    })
  }

  // reset function for avatar idle are you there feature 
  reset() {
    //console.log("click")
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(() => {
      this.start()
      // }, 10000)
    }, 5 * 60 * 1000)
  }


  start() {
    var session = localStorage.getItem('sessionId')
    let data = {
      "sessionId": session,
      "message": "Are you there?"
    }
    this.ser.uneeqPromptBox(data).subscribe(res => {

    })
  }


  // uneeq avatar message handle function
  messageHandler(msg: any) {
    switch (msg.uneeqMessageType) {
      // SessionLive: Everything has loaded and the digital human is ready for interaction
      case 'SessionLive':
      this.sessionLiveForAvatar()
        break;
      // The digital human has received a question (utterance) from the user
      case 'AvatarQuestionText': 
      this.userAskQuestionDisplayText(msg.question) 
        break;
      // The digital human has an answer to the question
      case 'AvatarAnswer':

        var data = msg.answerAvatar
        var det = JSON.parse(data)
        console.log('after parse', det)

        this.questionList = det.instructions.customData.Question

        if (this.questionList != '') {
          // setTimeout(() => {
          this.accod1 = false
          this.accordQestionhit()
          var aa: any = document.getElementById('QQ')
          aa.innerHTML = this.questionList;
          // },1000)
        }

        this.optionList = det.instructions.customData.options
        this.DescAnswer = det.instructions.customData.Output
        this.CorrectAnswer = det.instructions.customData.Test
        var imageDisplay = det.instructions.customData.imageUrl
        var linkDisplay = det.instructions.customData.link
        var text = det.instructions.customData.description
        var followup = det.instructions.customData.link
        this.followName = det.instructions.customData.followup
        this.isClick = det.instructions.customData.click
        var pdfValue = det.instructions.customData.PDF


        // 
        if (pdfValue !== '') {
          $('#pdfSet').addClass('showMessage')
          setTimeout(() => {
            this.pdfShow = pdfValue
          }, 1000)
        } else {

        }

        //
        if (text != '') {
          setTimeout(() => {
            $('#textDisplay').addClass('showMessage')
            var aT: any = document.getElementById('descpText')
            aT.innerHTML = text
          }, 2000)
        } else if (text == "") {
          setTimeout(() => {
            $('#textDisplay').removeClass('showMessage')
          }, 2000)
        }

        if ((localStorage.getItem('screen') === "TestSeries") || (localStorage.getItem('screen') === "LearningScreen")) {
        
        } else {
          setTimeout(() => {
            if (this.expandOn === false) {

              if (imageDisplay !== '') {
                $('#ImageDisplay').addClass('showMessage');
                this.ImageData = imageDisplay;
              } else {
                $('#ImageDisplay').removeClass('showMessage');
                this.ImageData = ""
              }
            }
          }, 2000);

        }

        if (linkDisplay !== '') {
          setTimeout(() => {
            $('#LinkDisplay').addClass('showMessage')
            this.linkDisData = linkDisplay
          }, 2000)
          // } else if (linkDisplay == "") {
        } else {
          setTimeout(() => {
            $('#LinkDisplay').removeClass('showMessage')
          }, 2000)
        }

        if (followup != '') {
          setTimeout(() => {
            $('#followDisplay').addClass('showMessage')
            this.followup = followup
          }, 2000)
        } else if (followup == "") {
          setTimeout(() => {
            $('#followDisplay').removeClass('showMessage')
          }, 2000)
        }

        //  var option = det.instructions.customData.options
        if (this.CorrectAnswer != '') {
          setTimeout(() => {
            this.accod2 = false
            this.accordAnswerHit()
            var answer: any = document.getElementById('answerD')
            answer.innerHTML = this.CorrectAnswer;
          }, 1400)
        }


        if (
          this.DescAnswer === 'Let me ponder regarding this.' ||
          this.DescAnswer === 'Let me think a bit.' ||
          this.DescAnswer === 'Getting the answer from other data sources.' ||
          this.DescAnswer === 'Allow me a moment to think.' ||
          this.DescAnswer === "I'll need a moment to access the data." ||
          this.DescAnswer === 'Give me few seconds to gather my thoughts.'
        ) {
          // console.log(' condition has to run-------------------------------------');
          this.runLoderGPT = true;
          if (localStorage.getItem('screen') === "TestSeries") {
            setTimeout(() => {
              var m: any = document.getElementById('outputDesc')
              m.innerHTML = '';
            }, 0)
          } else {
            var d: any = document.getElementById('outputDesc')
            d.innerHTML = '';
          }

          this.callOpenAI()
        } else {
          //  console.log('condition has to stop-------------------------------------');
          this.runLoderGPT = false;
        }


        if (this.DescAnswer != '') {
          setTimeout(() => {
            if (this.ccOnOff == true) {
              // $('#message').addClass('showMessage')
              var item: any = localStorage.getItem('AvatResCC')
              this.checkFullScreenB = item

              if (this.checkFullScreenB == 'false') {
                $('#message').addClass('showMessage')
              }
            }
            var d: any = document.getElementById('outputDesc')
            $('.avatarspeak-s').scrollTop(0);
            if (this.DescAnswer === 'Let me think a bit.') {
              d.innerHTML = ''
            }
            else {
              d.innerHTML = this.DescAnswer;
              var test: any = document.getElementById('local-transcript')
              test = ""
              this.isSubtitleAnimationRunning = true
              this.subtitleAnimationRun(this.DescAnswer)
              if (localStorage.hasOwnProperty("learningId")) {
                  this.isManualScrolling = false
                  this.startScrolling();
              }
            }
        
          }, 1900)
        }


        if (this.ccOnOff == true) {
     
          if (this.iconShow == true) {
            $('#message').addClass('showMessage')
          }
        }

        // verbal command function
        this.verbalCommandNavigation(det.instructions.customData.text)
        // Mi-- DeviceError
        break;
      default:
        //   console.log('uneeq-js: Unhandled message \'' + msg.uneeqMessageType + '\'', msg);
     
        this.avatarConnectionStatus(msg.uneeqMessageType)

        if (msg.uneeqMessageType == 'Instructions') {
          var tt = 'Hi test test, welcome to the world of e-dee-YOU. I am Hannah. How can I help you?'
          var r = tt.split('.')
          setTimeout(() => {
            localStorage.setItem('Avatar', msg.uneeqMessageType)
          }, 2000)
        }

        break;
    }
  }


  sessionLiveForAvatar(){   // session live start code 
    $('#avatarLoaders').css('display', 'none')
    $('#chat-widget-minimized').css('display', 'none');
    $('#chat-widget-container').css('height', '4px');
    this.isSpinner = false
    //  this.checkConnectionSpeed()
    this.avatarsizechangeonCall()
    // Add key listeners on spacebar for start and stop recording
    this.addPTTKeyListeners();
    localStorage.setItem('sessionId', this.uneeq.sessionId)
    let zoomPayload = {
      "sessionID": this.uneeq.sessionId,
      "email": this.user.email,
      token: this.token,
    }
    //  console.log("zoom payload =>", zoomPayload)
    this.ser.zoomSetting(zoomPayload).subscribe((res: any) => {
    })
  }

  userAskQuestionDisplayText(msg:any){  // user question show by mic 
    if (this.UserccOnOff == true) {
      $('#userText').removeClass('showI')
    }
    // Display the question spoken by the user on screen
    var yy: any = document.getElementById('local-transcript')
    yy.innerHTML = 'User: ' + msg;
    this.userSpeakValue = msg;
  }



   startScrolling() {  /// start auto scrolling animation for learning modules
    const  lineHeight = 140;
    const  scrollSpeed = 21000; // Total time for the scrolling animation (in milliseconds)
    const  delayBetweenMovements = 0; // Time to wait between each 20% movement (in milliseconds)
    const  totalMovements = 30; // Number of times to move down by 20%
    //let isManualScrolling = false; // Flag to indicate manual scrolling
    let animationInProgress = false;

    var scroll = $('#outputDesc');
    const scrollToPosition = (position: any) => {
      if (this.isManualScrolling) {
        return;
      }

      const  newScrollTop = position * lineHeight;
      animationInProgress = true;
      scroll.animate({ scrollTop: newScrollTop }, scrollSpeed, function () {
          if (position < totalMovements && scroll.scrollTop() + scroll.innerHeight() < scroll[0].scrollHeight) {
            scrollToPosition(position + 1); // Move down by another 20%
            console.warn('========>', position + 1)
          } else {
            // Scrolling reached the bottom or the total number of movements, stop the animation
            console.warn('========> Scrolling animation stopped');
           // scroll.stop()
           scroll.off('scroll'); // Remove the scroll event listener when the animation stops
           animationInProgress = false;
          }
       // }, delayBetweenMovements);
      });
    }

 
    setTimeout(function () {
      const  t = 1
      scrollToPosition(t); // Start scrolling from the second position (20%)
    }, 5000);

  }



  avatarConnectionStatus(value: any) {
    //  "ConnectionLost"
    if (value == 'ConnectionLost') {
      Swal.fire({
        title: 'Connection lost!',
        text: 'Sorry the connection is lost, please click the button below to refresh.',
        confirmButtonText: 'Refresh',
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.reload();
        }

      })
    }

    if (value == 'SessionEnded' && localStorage.hasOwnProperty("sessionId")) {
      Swal.fire({
        title: 'Session expired!',
        text: ' Oops! It seems like your session has expired, please log in again..',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        //timer: 5000
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['/'])
        }

      })
    }

    if (value == 'SessionError') {
      Swal.fire({
        title: 'Session Error!',
        text: ' Oops! A session error has occurred., please retry',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        timer: 5000
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['/'])
        }

      })
    }

    if (value == 'AvatarUnavailable') {
      this.messageForQueueAvatar = true
      var IP = localStorage.getItem('IPAdress')
      let payloadC = {
        "email": this.user.email,
        "name": this.user.name,
        "ip_address": IP,
        "status": 'Unavailable'
      }
      this.ser.avatarCounter(payloadC).subscribe(res => {

      })
      this.isSpinner = false
      $('#avatarLoaders').css('display', 'none')
    }



    if (value == 'AvatarAvailable') {
      // localStorage.setItem('Avatar', msg.uneeqMessageType)
      if (this.tourGuideValueCheck == true) {
        setTimeout(() => {
          this.startTours()
        }, 6000)
      }
      this.messageForQueueAvatar = false
      var IP = localStorage.getItem('IPAdress')
      let payloadC = {
        "email": this.user.email,
        "name": this.user.name,
        "ip_address": IP,
        "status": 'Available'
      }
      this.ser.avatarCounter(payloadC).subscribe(res => {

      })
    }

  }

  subtitleAnimationRun(result: any) {
    //  if(this.UserccOnOff == true){  // check subtitle cc off 
    var splitResult = result.split(' ');
    var finalStr: any = [];
    for (var i = 0; i < splitResult.length; i += 6) {
      finalStr.push(splitResult.slice(i, i + 6).join(' '));
    }
    //console.log(finalStr);
    this.displaySubtitles(finalStr);
    // }

  }

  displaySubtitles(final: any) {
    var container: any = document.getElementById('local-transcript')
    let delay = 0;
    let index = 0;

    const displaySubtitle = (data: any) => {
      container.innerHTML = 'Hannah: ' + data;
    };

    const animateSubtitles = () => {
      if (!this.isSubtitleAnimationRunning) return; // Stop if flag is set to false

      if (index < final.length) {
        displaySubtitle(final[index]);

        index++;
        setTimeout(animateSubtitles, delay); // Delay in milliseconds between each subtitle
        delay += 1800;
        delay = Math.min(delay, 2300); // Limit the maximum delay to 1800 milliseconds
        //  console.log(delay)
        // 1700 and 2200
      }
    };

    animateSubtitles();
  }


  // Function to stop the subtitle animation
  stopSubtitleAnimation() {
    this.isSubtitleAnimationRunning = false;

    if (localStorage.hasOwnProperty("learningId")) {
      this.isManualScrolling = true
      var scroll = $('#outputDesc');
      scroll.stop();
      $('.avatarspeak-s').scrollTop(0);
    }
  }


  // all verbal command function
  verbalCommandNavigation(msg: any) {

    switch (msg) {
      case 'Closing the quiz.':
     
        break;

      case 'Sure, hiding myself.':

     

        break;

      case 'Here I am.':

       

        break;

      case 'Turning to full screen mode.':


        break;

      case 'Changing to smaller view.':

     

        break;

      case 'Opening the dashboard.':

     


        break;

      case 'Ok, going to the profile page.':

        break;

      case 'Sure, opening the test series.':



        break;

      case 'Sure, turning on your subtitles.':
        this.UserccOnOff = false;
        this.userCCOnOf();
        break;

      case 'Sure, turning off your subtitles.':
        this.UserccOnOff = true;
        this.userCCOnOf();
        break;

      case 'Sure, turning on my subtitles.':
        this.ccOnOff = false;
        this.avatarCCOnOf();
        break;

      case 'Sure, turning off my subtitles.':
        this.ccOnOff = true;
        this.avatarCCOnOf();
        break;

      case 'Showing the question.':

        this.QuestionccOnOff = false;
        this.QuestionCCOnOf();

        break;

      case 'Hiding the question.':
        // if (localStorage.getItem('screen') !== 'LearningScreen' ) {
        this.QuestionccOnOff = true;
        this.QuestionCCOnOf();
        // }
        break;

      case 'Opening the learning module':

    

        break;

      case 'Moving to the next slide':
    
        break;

      case 'Moving to the previous slide':
   
        break;

      case 'Sure, repeating the slide':
      

        break;

      case 'Closing the module':
      
        break;

      case 'Logging out, see you soon.':
        setTimeout(() => {
          this.router.navigate(['/'])
          this.logOut()
          this.oncrossTest()
        }, 2000);
        break;
    }

  }


  // uneeq end senssion
  endSession() {
    this.uneeq.endSession();
  }

  //stop hand button function
  stopSpeak() {
    this.uneeq.uneeqStopSpeaking()
  }


  // Add push to talk spacebar key listeners
  addPTTKeyListeners() {
    document.addEventListener('keydown', (e: any) => {
      if (e.code === 'Space' && !e.repeat && e.target.type !== 'text') {
        this.onclickMic()
        this.stopSubtitleAnimation() 

      }
    });

  }


  //screen size 
  functionName() {
    if (window.screen.width < 480) {
      $('#mainData').addClass('main-content_large')
      $('#sidebar').addClass('sidebar_small')
      $('#movableCard').addClass('mobile_speaking')
      $('#sidebar').addClass('showI')    // this is for mobile responsive

      this.showImage = false
    } else {
      $('#mainData').removeClass('main-content_large')
      $('#sidebar').removeClass('sidebar_small')
      $('#movableCard').removeClass('mobile_speaking')
      $('#sidebar').removeClass('showI')    // this is for mobile responsive

      this.showImage = true
    }
  }


  // send chat function
  sendTextFun() {
    var tt = this.userText.trim();
    // this.userText.trim();
    if (tt.length > 0) {
      this.uneeq.sendTranscript(tt)
      this.userText = ''
    }
    this.userText = ''
  }


  stopSpeaking() {
    this.stopSubtitleAnimation()
    this.stopAvatarOnClick = !this.stopAvatarOnClick
    this.uneeq.stopSpeaking()

  }



  // card expand button function  
  onLoadCard(id: any) {
    if (this.fullScreen === true) {
  
    } else if (this.fullScreen === false) {
      this.checkFullScreenB = false
      this.expandOn = false
      console.log('false--->', this.checkFullScreenB)
      localStorage.setItem('AvatResCC', this.checkFullScreenB)
    
      //  $('#chat-widget-container').css('z-index', '11000');
      //  $('#chat-widget-minimized').css('display', 'none');
      //  $('#chat-widget-container').css('height', '4px');

      $('#iconShow').removeClass('showI')
      $('#sm-video').removeClass('uneeqAvatar')
      //  $('#message').addClass('showMessage') 
      $('#userCC').addClass('showMessage')
      $('#sm-video').addClass('uneeqAv')
      $('#stopIcon').addClass('bottomleft-large')
      $('#stopIcon').removeClass('bottomleft')
      $('#movableCard').addClass('full_screen')
      $('#movableCard-main').addClass('full_screen')
      $('#isvideo').addClass('rightDiv-large')
      $('#isvideo').removeClass('rightDIv')
      $('#ccSubtitle').removeClass('showI')
      $('#chatbarOnly').removeClass('showI')
      $('#chat-bar').css('display', 'none')
      $('#mobileAvatarButton').addClass('showI')
      $('#cross').addClass('speakingsss_large')
      $('#ruleSeries').removeClass('showI')
      $('#feedback').removeClass('showI')
      $('#audioMicBut').css('background-color', '#7393c4')
      $('#messDescription').removeClass('hideMessage')
      //this.setvideoWiths()
      this.iconShow = true
      this.changeAvatarSize()
      if (this.ccOnOff == true) {
        $('#message').addClass('showMessage')
      }
    }
    this.fullScreen = !this.fullScreen

  }


  changeAvatarSize() {
    if (this.fullScreen === false) {
      var t: any = document.querySelector('#sm-video canvas')
      // console.log('canvas',t)
      if (t !== null) {
        t.style.width = '100%';
        // $(t).css('margin-left', '70px')
        // var tr = window.screen.width * window.devicePixelRatio
        // var yy = window.screen.height * window.devicePixelRatio
        // t.setAttribute("width", tr);
        // t.setAttribute("height",yy);
        // console.log(t,'after')
        if (window.screen.height === 1440 && window.screen.width === 2560) { // imac 27
          t.style.height = '900px'
          console.log('dfdfdfdfdfdfdfddf')
        } else if (window.screen.height == 1180 && window.screen.width == 820) {

          t.style.height = '680px'
          // $(t).css('margin-left', '20px')
        } else if (window.screen.height == 1194 && window.screen.width == 834) {

          t.style.height = '680px'
          // $(t).css('margin-left', '20px')
        } else if (window.screen.height == 1133 && window.screen.width == 774) {
          t.style.height = '590px'
        } else if (window.screen.height == 1024 && window.screen.width == 768) {
          t.style.height = '590px'
          // $(t).css('margin-left', '20px')
        } else if (window.screen.height == 1366 && window.screen.width == 1024) {
          t.style.height = '760px'
          // $(t).css('margin-left', '20px')
        } else if (window.screen.height == 1138 && window.screen.width == 712) {
          t.style.height = '600px'
          // $(t).css('margin-left', '20px')
        } else if (window.screen.height == 720 && window.screen.width == 540) {
          t.style.height = '520px'
          // $(t).css('margin-left', '20px')
        } else if (window.screen.height == 1368 && window.screen.width == 912) {
          t.style.height = '650px'
          // $(t).css('margin-left', '20px')
        } else if (window.screen.height == 1280 && window.screen.width == 800) {
          t.style.height = '640px'
          // $(t).css('margin-left', '20px')
        }
        else if (window.screen.height == 960 && window.screen.width == 600) {
          t.style.height = '520px'
          // $(t).css('margin-left', '20px')
        }

        else if (window.screen.width < 480) {
          t.style.height = '490px'
          t.style.width = '100%'
          // $(t).css('margin-left', '0px')
          $('#sidebar').addClass(' sidebar_small')

        } else {
          t.style.height = '100%'
        }
      }




    } else {
      var t: any = document.querySelector('#sm-video canvas')
      console.log('canvas', 'else consition')
      if (t !== null) {
        t.style.width = '100%'
        t.style.height = '100%'
      }
    }
  }


  avatarsizechangeonCall() {
    // setTimeout(() => {
    var t: any = document.querySelector('#sm-video canvas')
    // console.log('canvas',t)
    if (t !== null) {
      t.style.width = '100%';
      // $(t).css('margin-left', '70px')
      // var tr = window.screen.width * window.devicePixelRatio
      // var yy = window.screen.height * window.devicePixelRatio
      // t.setAttribute("width", tr);
      // t.setAttribute("height",yy);
      // console.log(t,'after')
      if (window.screen.height == 1180 && window.screen.width == 820) {
        //  console.log('ggffddssaaa')
        t.style.height = '680px'
        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1194 && window.screen.width == 834) {
        t.style.height = '680px'
      } else if (window.screen.height == 1133 && window.screen.width == 774) {
        t.style.height = '590px'
      } else if (window.screen.height == 1024 && window.screen.width == 768) {
        t.style.height = '590px'
        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1366 && window.screen.width == 1024) {
        t.style.height = '760px'
        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1138 && window.screen.width == 712) {
        t.style.height = '600px'
        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 720 && window.screen.width == 540) {
        t.style.height = '520px'
        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1368 && window.screen.width == 912) {
        t.style.height = '650px'
        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1280 && window.screen.width == 800) {
        t.style.height = '640px'
        // $(t).css('margin-left', '20px')
      } else if (window.screen.height == 1440 && window.screen.width == 2560) {
        t.style.height = '900px'
        console.log('dfdfdfdfdfdfdfddf')
      }
      else if (window.screen.height == 960 && window.screen.width == 600) {
        t.style.height = '520px'
        // $(t).css('margin-left', '20px')
      }
      else if (window.screen.width < 480) {
        t.style.height = '490px'
        t.style.width = '100%'
        // $(t).css('margin-left', '0px')
        $('#sidebar').addClass(' sidebar_small')

      } else {
        t.style.height = '100%'
      }
    } else {
      var t: any = document.querySelector('#sm-video canvas')
      // console.log('canvas',t)
      if (t !== null) {
        t.style.width = '100%'
        t.style.height = '100%'
      }
    }

    //},1000)

  }

  // select from the option 
  selectOptionForTest(answer: any) {
    this.isClick = true
    //var y = answer.slice(3)
    var y = answer
    this.uneeq.sendTranscript(y)

  }

  // avatar cc button On/Off 
  avatarCCOnOf() {
    const message22 = this.elementRef.nativeElement.querySelector('#message');
    if (this.ccOnOff == true) {
      this.renderer.removeClass(message22, 'showMessage');
    } else if (this.ccOnOff == false) {
      this.renderer.addClass(message22, 'showMessage');
    }
    this.ccOnOff = !this.ccOnOff
    localStorage.setItem('cc', JSON.stringify(this.ccOnOff))
  }


  //openAI API function call
  callOpenAI() {
    var session = localStorage.getItem('sessionId')
    let payloadData = {
      "data": this.userSpeakValue,
      "gptPrompt": 'Everything',
      "sessionID": session,
      "instance_pvt_ip": '172.31.58.92',
      "email": "hannah@yopmail.com",
      "time": "2023-07-31,08:17:33"
    }

    if (localStorage.hasOwnProperty("learningId")) {
    
    $('.avatarspeak-s').scrollTop(0);

    }
    this.ser.openAICall(payloadData).subscribe((res: any) => {
      this.runLoderGPT = false;
    })
  }


  // logout application function
  logOut() {
    let p = {
      "email": this.user.email,
      "time": this.user.lastlogin,
      "token": this.user.token
    }
    this.service.logOut(p).subscribe(res => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    })
    this.router.navigate(['/'])
  }


  // exit test series page button function
  exitTestSeries() {
    this.uneeq.sendTranscript('stop')
  }


  exitpresentationFun() {
    // var learningid = localStorage.getItem('learningId')
    // let p = {
    //   "learning_status": false,
    //   "time": this.user.lastlogin,
    //   "email": this.user.email,
    //   "id": learningid
    // }
    // localStorage.removeItem("learningId");
    // this.uneeq.stopSpeaking();
    // this.childPdf.clearPdfViewer()
    // this.ser.IndexLearningNo = 1
    // this.ser.stopPresentation(p).subscribe((res: any): any => {

    //   if (res.statusCode == 200) {
    //     this.oncrossTest()
    //     this.router.navigate(['user/learning'])
    //   } else {
    //     this.oncrossTest()
    //     this.router.navigate(['user/learning'])
    //   }
    // })
  }


  // this function  is for when the test is stop it will run
  oncrossTest() {
    // this.pdfShow = ""
    // console.log('true')
    // this.expandOn = true
    // localStorage.removeItem('screen')
    // localStorage.setItem('AvatResCC', 'true')
    // $('#chat-widget-minimized').css('display', 'block');
    // $('#chat-widget-container').css('height', '84px');

    // $('#message').css('margin-top', '32px')
    // $('#message').css('width', '')
    // $('#iconShow').addClass('showI')
    // $('#ImageDisplay').removeClass('showMessage')
    // $('#pdfDataSet').addClass('hideMessage')
    // $('#sm-video').removeClass('uneeqAv')
    // $('#sm-video').addClass('uneeqAvatar')
    // $('#message').removeClass('showMessage')
    // $('#movableCard').removeClass('full_screen')
    // $('#movableCard-main').removeClass('full_screen')
    // $('#stopIcon').removeClass('bottomleft-large')
    // $('#stopIcon').addClass('bottomleft')
    // $('#isvideo').removeClass('rightDiv-large')
    // $('#isvideo').addClass('rightDIv')
    // $('#ruleSeries').addClass('showI')
    // $('#feedback').addClass('showI')
    // $('#ccSubtitle').addClass('showI')
    // this.changeAvatarSize()
    // $('#cross').removeClass('showI')
    // $('#cross-test').addClass('showI')
    // $('#chatbarOnly').addClass('showI')
    // $('#chat-bar').css('display', 'block')
    // $('#mobileAvatarButton').removeClass('showI')
    // $('#exitExam').addClass('showI')
    // $('#exitpresentation').addClass('showI')
    // $('#downloadpdf').addClass('showI')

    // $('#userCC').removeClass('showMessage')
    // $('#cross').removeClass('speakingsss_large')
    // $('#openOnTestOnly').addClass('showI')
    // $('#openOnLearningOnly').addClass('showI')
    // $('#normalOpen').removeClass('showI')
    // $('#OnlyDisplayOnTest').addClass('showI')
    // $('#audioMicBut').css('background-color', '#d9e9fd')
    // $('#QuestionDisplay').addClass('hideMessage')
    // $('#optionMessage').addClass('hideMessage')
    // this.ischatBoxOpen = false
    // this.iconShow = false
    // var t: any = document.querySelector('#sm-video canvas')
    // if (t !== null) {
    //   t.style.width = '100%'
    //   t.style.height = '100%'
    //   $(t).css('margin-left', '0px')
    // }
    // var aa: any = document.getElementById('outputDesc')
    // aa.innerHTML = 'welcome to the world of edYOU. I am Hannah. How can I help you?';

  }





  InstructionNormal() {
    var session = localStorage.getItem('sessionId')
    let data = {
      "sessionId": session,
      "message": `Following are a few instructions to interact with me.
      <ol type="1">
       <li>Hold the mic or spacebar to speak to me.</li>
      <li>You can also text me by clicking the button on the bottom right.</li>
      <li>Click the pause button on bottom left to interrupt me while I am speaking.</li>
      <li>For closed captions, click on the CC button on bottom left.</li>
      <li>To minimise or maximise, click on the top right square corner button.</li>
      <li>You can ask me about edYOU and questions related to the medical field. I can also quiz you on a medical topic.</li>
      </ol>`
    }
    this.ser.uneeqPromptBox(data).subscribe(res => {

    })
  }



  InstructionTestSeries() {
    var session = localStorage.getItem('sessionId')
    let data = {
      "sessionId": session,
      "message": ` 
      Following are a few instructions to interact with me.
      <ol type="1">
      <li>Hold the mic or spacebar to speak to me.</li>
      <li>You can also text me by clicking the button on the bottom right.</li>
      <li>Click the pause button on bottom left to interrupt me while I am speaking.</li>
      <li>For closed captions, click on the CC button on bottom left.</li>
      <li>To answer a question you can simply click, say or text an option.</li>
      
      <li>Say or text “Yes” or “Sure” after the answer is given to move to the next question.</li>
      <li>Say or text “Repeat” to repeat the question.</li>
      <li>Say or text “Stop” or click on the cross button to exit the test.</li>
     
      </ol> `
    }
    this.ser.uneeqPromptBox(data).subscribe(res => {

    })


  }

  InstructionLearning() {
    var session = localStorage.getItem('sessionId')
    let data = {
      "sessionId": session,
      "message": ` 
      Following are a few instructions to interact with me.
      <ol type="1">
      <li>Hold the mic or spacebar to speak to me.</li>
      <li>You can also text me by clicking the button on the bottom right.</li>
      <li>To move to the next slide, please click on the Next button or say/type - Next.</li>
      <li>To move to the previous slide, please click on the Previous button or say/type - Previous.</li>
      <li>If you wish to repeat the current slide, please click on the Repeat button or say/type - Repeat</li>
      <li>To close the presentation, please click on the Close button or say/type - Close.</li>
      <li>Click the pause button on bottom left to interrupt me while I am speaking.</li>
      <li>For closed captions, click on the CC button on bottom left.</li>
     
      </ol> `
    }
    this.ser.uneeqPromptBox(data).subscribe(res => {

    })


  }


  openFeedback() {
    if (this.feedback == true) {
      this.openFeedbackForm = false
    } else if (this.feedback == false) {
      this.openFeedbackForm = true
    }
    this.feedback = !this.feedback
  }


  // close feedbackForm 
  closeFeedback(d: any) {
    this.openFeedbackForm = d
    this.feedback = false
  }

}


