import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import {environment} from '../../environments/environment';
import {API} from '../service/restapi';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  dataVoice:any=[]

  IndexLearningNo:any ;

  private sharedData = new BehaviorSubject({});
  currentSharedData =this.sharedData.asObservable(); 

  private sharedPDFData = new BehaviorSubject({});
  currentPDFLinkData =this.sharedPDFData.asObservable(); 

  private audioFileData = new BehaviorSubject({});
  audioLinkData =this.audioFileData.asObservable(); 

  
  constructor(private http: HttpClient) { }

//------------- shared data -------------------
  updateSharedData(data:any){
    this.sharedData.next(data);
    this.dataVoice = data
   // console.log('data coming ---',this.dataVoice)
}

updatePDFLinkData(link:any){
  this.sharedPDFData.next(link);
}

updateAudioLinkData(audio:any){
  this.audioFileData.next(audio);
}
//--------------- shared data --------------------

  getTestSeries(data:any){
    return this.http.post(this.baseUrl+API.getSeriesData,data)
  
  }


  // OpenAI API call
  openAICall(data:any){
    return this.http.post(this.baseUrl+API.openAI,data)
  
  }

// zoom link setup 
  zoomSetting(data:any){
    return this.http.post(this.baseUrl+API.saveEmailData,data)
  }

  avatarCounter(data:any){
    return this.http.post(this.baseUrl+API.avatarCounterLimit,data)
  }


  // feedback form -------------

  feedbackForm(uneeqRes:any){
    return this.http.post(this.baseUrl+API.feedback,uneeqRes)
  
  }

  // ----- feedback form ------

 // ------------------------- unsolidated response of uneeq avatar api -------------------------------

 unsolidatedResponse(uneeqRes:any){
  return this.http.post('https://1i4zp3969d.execute-api.us-west-2.amazonaws.com/Development/uneeq/unsolicitedResponses',uneeqRes)

}

////  -------------- start Test series -----------------------
startTestSeries(data:any){
  return this.http.post(this.baseUrl+API.InvestorUneeqQuestionInit,data)
} 

recordTest(data:any){
  return this.http.post(this.baseUrl+API.recordTestDAta,data)
} 

////  -------------- end  Test series -----------------------

///
uneeqPromptBox(data:any){
 
  return this.http.post(this.baseUrl+API.uneeqPromptMessege,data)

}

 // ------------------------- end unsolidated response of uneeq avatar api -------------------------------

 getsssss(uneeqRes:any){
  return this.http.post('https://1i4zp3969d.execute-api.us-west-2.amazonaws.com/Development/Question/getQuestion',uneeqRes)

}


// ------------------------- end prepare API-------------------------------
getTopicData(getData:any){
  return this.http.post(this.baseUrl+API.getTopic,getData)
}

getByIdTopic(getData:any){
  return this.http.post(this.baseUrl+API.getByTopicID,getData)
}
// ------------------------- end prepare API------------------------------- 


   // ------------------------ Start presentation API --------------------------------------------


  getPresentation(getData:any){
    return this.http.post(this.baseUrl+API.getPresentation,getData)
  }

  stopPresentation(startPres:any){
    return this.http.post(this.baseUrl+API.startPresentation,startPres)
  }

  startPresentation(startPres:any){
    return this.http.post(this.baseUrl+API.start1Presentation,startPres)
  }

  presentationSpeak(startPres:any){
    return this.http.post(this.baseUrl+API.PresentationSpeakAPI,startPres)
  }

  audioCountSpeak(audiostartPres:any){
    return this.http.post(this.baseUrl+API.audioCount,audiostartPres)
  }


  recordPresentation(data:any){
    return this.http.post(this.baseUrl+API.recordLearningDAta,data)
  } 

 // ------------------------ end presentation API --------------------------------------------



 storedLocalStorageData(){
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("Avatar");
}


}



  