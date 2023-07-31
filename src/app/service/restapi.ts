export const API = {
  
    //login: "/CommonAPI/Login",
    login: "/crudInvestor/InvestorLogin",
    logout: "/crudInvestor/investorLogout",
    feedback:"/feedback/submitFeedback",
    signUp:"/CommonAPI/Signup",
    forget:"/CommonAPI/forgotPassword",
    setPassword:"/CommonAPI/setPasswordLink",
    setPasswordTimer:"/CommonAPI/setOnlyOnce",
    getProfile:"/CommonAPI/userProfile",
    updateProfile:"/CommonAPI/userEditProfile",
    changePassword:"/CommonAPI/changePassword",
    avatarCounterLimit:"/CommonAPI/counter",

    //openAI API
    openAI:"/crudInvestor/openAIInvestor",
    //

    // avatar
  uneeqAvatarToken:"/crudInvestor/initToken",

    // test series 
    getSeriesData:"/Question/Get_Question_For_Avatar",
    uneeqStartTest:"/uneeq/uneeqQuestionStart",
    recordTestDAta:"/crudInvestor/checkinvestorRecord",
    uneeqPromptMessege:"/uneeq/promptUser",
    InvestorUneeqQuestionInit:'/crudInvestor/InvestorUneeqQuestionInit',

 //
 getTopic:"/Topic/getTopicHeader",
 getByTopicID:"/Topic/getTopic", 

// presentation
getPresentation:"/Presentation/get_Presentation_Header_Avatar",
startPresentation:"/Presentation/Start_Presentation",
start1Presentation:"/Presentation/PresentationEvents",
PresentationSpeakAPI:"/Presentation/presentation_speak",
audioCount:"/Presentation/audiodownload",
recordLearningDAta:"/Presentation/Landing_Page_Presentation",
 //zoom link setup API 

  saveEmailData:"/CommonAPI/InvestorZoomEmail",
  conversationSaveData:"/CommonAPI/apiResponse"

}