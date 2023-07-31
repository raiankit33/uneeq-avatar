

// var apiKey = 'eyJzb3VsSWQiOiJkZG5hLXZhaWJoYXYtYWdhcndhbC0tZWR5b3UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9hYzMzNTk0Yy0zYTRiLTQ3NTQtYmFlZS03MmJhYTAyMTU4ODYifQ=='


// // var apiKey = 'eyJzb3VsSWQiOiJkZG5hLXZhaWJoYXYtYWdhcndhbC0tZGVtb2F2YXRhciIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzA3YThkYzMxLWI5MjItNDE3OS04NGY3LWVlMjg1NjY2YWZkYiJ9';
// //server api key
// // var apiKey = 'eyJzb3VsSWQiOiJkZG5hLXZhaWJoYXYtYWdhcndhbC0tZGVtb2F2YXRhciIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzhjZWUzODc1LTFiMDAtNGYyNS1hMzdiLTQ0ZDgxYjc2MDc2OSJ9'


// let scene;



// function toggleUserMicrophone() {
//   if(scene){
//     const active = scene.isMicrophoneActive();
//     scene.setMediaDeviceActive({
//         microphone: !active,
//     });
//   console.log('off')
//   }else{

//   }
// } 

// function toggleUserVideo() {
//   if(scene){
//     const active = scene.isCameraActive();
//     scene.setMediaDeviceActive({
//         camera: !active,
//     });
//   console.log('off')
//   }else{

//   }
// }

// function unmuteDigitalPerson() {
//   const videoEl = document.getElementById('sm-video');
//   videoEl.muted = false;
// }

// function disconnectPerson(){
//   if(scene){
//     scene.Disconnect()
//   }
// }


// function stopSpeakingAvatar(){
//   var persona = new Persona(scene, "1");
//     if (!persona) console.error('persona not initiated!');
//     else persona.stopSpeaking();

// }


// async function connects() {
//  // console.log('fun start')
//   const videoEl = document.getElementById('sm-video');
//   // create a new scene object
//   scene = new Scene({
//     apiKey: apiKey,
//     videoElement: videoEl,
//     requestedMediaDevices: { microphone: true, camera: true },
//     requiredMediaDevices: { microphone: true, camera: true},
//   });

//   await scene
//     .connect()
//     .then((sessionId) => onConnectionSuccess(sessionId))
//     .catch((error) => onConnectionError(error));

//     scene.conversation.onCardChanged.addListener((activeCards) => {
//     //  thunk.dispatch(actions.setActiveCards({ activeCards }));
//       addConversationResult({
//         source: 'persona',
//         card: activeCards[0],
//       });
//     })
// }


// function onConnectionSuccess(sessionId) {


//   console.info('success! session id:', sessionId);
//    scene.session().setLogging(false);
// $('#loader').css('display','none')
// var persona = new Persona(scene, "1");
// persona.onSpeechMarkerEvent.addListener(onSpeechMarker);


//   scene
//     .startVideo()
//     .then((videoState) => console.info('started video with state:', videoState))
//     .catch((error) => console.warn('could not start video:', error)); 
//    // persona = new Persona(scene, "1");
//     setvideoWith(215,310)



// }


// function onSpeechMarker(persona, message) {
//   const markerType = message.name;
//   const cardIds = message.arguments;
//   // scene.conversation.onCardChanged.addListener((activeCards) => {
//   //   // active cards will be an array of the cards or an empty array when cards are cleared
//   //   console.warn('cccccccccc',activeCards)
//   // });
//  console.warn(message,'m')
//   if (markerType === 'hidecards') {
//     $('#ImageContent').attr('src','')
//     if (cardsIds.length === 0) {
//       console.log('hide all cards');
//     } else {
//       console.log('hide these cards:', cardIds);
//     }
//   } else if (markerType === 'showcards') {
//     $('#avada').removeClass('showI')
//     console.log('show these cards:', cardIds);


//     newA = JSON.parse(localStorage.getItem('content') || '[]') 
//   // if(newA == null) newA = []
//   console.warn(newA)
//   var cc = newA['public-card']
//   console.log(cc.data.url,'jjjjjj')

// $('#ImageContent').attr('src',cc.data.url)
//   } 
//  // scene.conversation.onCardChanged.addListener(datacoming)
// }



// function datacoming(mess){
// console.log(mess,'vv')
// }

// function onConnectionError(error) {
//   switch (error.name) {
//     case 'noUserMedia':
//       console.warn('user blocked device access');
//       break;
//     case 'noScene':
//     case 'serverConnectionFailed':
//       console.warn('server connection failed');
//       break;
//     default:
//       console.warn('unhandled error:', error);
//   }
// }







// function sendTextMessage(text) {
//   var persona = new Persona(scene, "1");

//   const ORCHESTRATION_MODE =  false;
//   if (text === '' ) return 0
//   if (scene !== null && persona !== null) {
//    // scene.sendUserText(text);
//     if (ORCHESTRATION_MODE === true) scene.sendUserText(text);
//     else persona.conversationSend(text);
//     //  return addConversationResult({
//     //   source: 'user',
//     //   text,
//     // });

//   } 

// }


// function setvideoWith(he,wi) { 
//   if(scene){

//  // const { videoWidth, videoHeight } = payload;
//  var videoHeight = he
//  var videoWidth =  wi


//   // update video dimensions in persona
//   // calc resolution w/ device pixel ratio
//   const deviceWidth = Math.round(videoWidth * window.devicePixelRatio);
//   const deviceHeight = Math.round(videoHeight * window.devicePixelRatio);
//   scene.sendVideoBounds(deviceWidth, deviceHeight);
// }else{

// }

// }


// function testing(){
//   scene.onMessage = (message) => {
//     console.log('is running-------------------------------000000000000000000000000000000')
//     // removing this will break smwebsdk eventing, call smwebsdk's message handler
//    // smwebsdkOnMessage(message);
//     switch (message.name) {
//       // handles output from TTS (what user said)
//       case ('recognizeResults'): {
//         const output = message.body.results[0];
//         console.log('kkkkkkkkkkkkk',output)
//         // sometimes we get an empty message, catch and log
//         if (!output) {
//           console.warn('undefined output!', message.body);
//           return false;
//         }
//         const { transcript: text } = output.alternatives[0];
//         console.log('oooooooo',transcript)
//         // we get multiple recognizeResults messages, so only add the final one to transcript
//         // but keep track of intermediate one to show the user what they're saying
//         if (output.final === false) {
//           return setIntermediateUserUtterance({
//             text,
//           });
//         }
//         return addConversationResult({
//           source: 'user',
//           text,
//         });
//       }

//     }
// }

// }


var tg = new tourguide.TourGuideClient({
     targetPadding : 0 ,
    exitOnEscape:false,
    exitOnClickOutside:true,
    closeButton:true,
    dialogClass:'ppp',
    steps: [
     
        {
            content: "<b> If you would like to provide feedback, click here. </b>",
            title: " Feedback Button",
            target: "#feedback", // target element
            order: "2",
            group: "",
       
        },
        {
            target: "#infobtnn", // target element
            order: "3",
            content: "<b> Click here to get info regarding the interaction with Hannah. </b>",
            title: "Info Button",

            group: "",
            placement: 'bottom-start',
        }, {
            content: "<b> Click here for options to turn on/off User and Hannah captions. </b>",
            title: "CC Button",
            target: "#ccbtnn", // target element
            order: "4",
            group: "",
        },
        {
            content: "<b> If you need to interrupt Hannah while she is speaking, click here. </b>",
            title: "Stop Button",
            target: "#stopIcon", // target element
            order: "5",
            group: "",
        },
        {
            content: "<b> Use the chat box to interact with Hannah by typing. </b>",
            title: "Chat Button",
            target: "#chatID", // target element
            order: "1",
            group: "",
        },
        {
           // content: "<b> Press and hold the spacebar or the microphone button to speak. </b>",
            content: "<b> Click the microphone button or press the spacebar once to speak. </b>",
            title: "Microphone Button",
            target: "#audioMicBut", // target element
            order: "0",
            group: "",
            dialogPlacement: 'Side' ,
        },
        {
            content: "<b> To minimize the interaction screen and go to the dashboard, click here. </b>",
            title: "Minimize Button",
            target: "#cross", // target element
            order: "6",
            group: "",
       
        },
       
    ],

})


function tour() {

    tg.start()


//     tg.onFinish(()=>{
  
//   });
}



// function check(){

   
//         // Create a new instance of the SpeechRecognition object
//         var SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        
//         const recognition = new SpeechRecognition();

//         console.warn('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    
// }

function getSpeechRecognition() {
    return window.webkitSpeechRecognition || window.SpeechRecognition;
  }