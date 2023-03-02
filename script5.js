let showHereDiv = document.getElementById('show-here');

let quesArea = document.getElementById('question');
let subjectInput = document.getElementById('subject');
let searchQuesInput = document.getElementById('search-questions');
let uNameInput = document.getElementById('respone-enter-name');
let cmntArea = document.getElementById('responeTxt');

let voteCntP = document.getElementById('vote-cnt');

let rightPane2H3 = document.getElementById('right-pane2-h3');
let rightPane2P = document.getElementById('right-pane2-p');

let newQuesFormBtn = document.getElementById('new-ques-form');
let submitBtn = document.getElementById('submit');
let allFavBtn = document.getElementById('all-Fav');
let resolveBtn = document.getElementById('resolveBtn');
let responseSubmitBtn = document.getElementById('responseSubmitBtn');

let upVoteBtn = document.getElementById("up-vote");
let downVoteBtn = document.getElementById("down-vote");

let rightPane = document.getElementById('right-pane');
let rightPane2 = document.getElementById('right-pane2');
let theDivParent = document.getElementById('response-list-parent');


// temp hide right pane 
rightPane.style.display="";
rightPane2.style.display="none";

let qStr;
let subStr;
let dataRetrieved;
let currQuesId;
let isAllFavClicked = false;
// let voteCnt = 0;

if(JSON.parse(localStorage.getItem('data'))==null){
    dataRetrieved=[];
    localStorage.setItem('data',JSON.stringify(dataRetrieved));
}
else{
    // dataRetrieved = JSON.parse(localStorage.getItem('data'));
    // console.log(dataRetrieved, typeof dataRetrieved);
}

submitBtn.addEventListener('click',function(){
    console.log('submit btn clicked');

    qStr = quesArea.value;
    subStr = subjectInput.value;

    subStr = removeExcessSpacesAndNewlines(subStr);
    qStr = removeExcessSpacesAndNewlines(qStr);

    if(subStr == "" || qStr == ""){
        alert("Subject or Ques field empty!");
    }
    else{
        let obj = {
            sub:subStr,
            ques:qStr,
            voteCnt:0,
            isFav:0,
            time:parseInt(Date.now()),
            response:[]
        }
        console.log(typeof parseInt(Date.now()),"inside submit 1");

        dataRetrieved = JSON.parse(localStorage.getItem('data'));
        dataRetrieved.push(obj);

        dataRetrieved = JSON.stringify(dataRetrieved);
        localStorage.setItem('data',dataRetrieved);

        clearFields();
        showHereDiv.innerHTML="";
        showData();
    }
});

function getdate(time){
    let curr=parseInt(Date.now());
    
    let sec=parseInt((curr-time)/1000);
    let s=sec%60;
    let min=parseInt(sec/60);
    let m=min%60;
    let hour=parseInt(m/60);
    let h=hour%60;
    if(m==0){
        return s+" seconds ago";
    }
    else if(h==0){
        return m+" minutes ago";
    }
    else
        return h+" hours ago";
}

newQuesFormBtn.addEventListener('click',function(){
    // console.log('new Ques Form btn clicked');

    rightPane.style.display="";
    rightPane2.style.display="none";
});

resolveBtn.addEventListener('click',function(){
    console.log("resolve btn clicked")

    // console.log(currQuesId,"inside resolve");
    // currQuesId = currQuesId.replace("subh3-","");
    currQuesId = currQuesId.replace("quesH3-","");
    console.log(currQuesId,"inside resolve");

    dataRetrieved = JSON.parse(localStorage.getItem('data'));

    dataRetrieved.splice(currQuesId,1);

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);
    
    rightPane.style.display="";
    rightPane2.style.display="none";

    showHereDiv.innerHTML="";
    showData();
});

responseSubmitBtn.addEventListener('click',function(){
    console.log("response Submit btn clicked");

    let uName = uNameInput.value;
    let uCmnt = cmntArea.value;

    uName = removeExcessSpacesAndNewlines(uName);
    uCmnt = removeExcessSpacesAndNewlines(uCmnt);

    // console.log("q >",qStr,"s >",subStr);

    if(uName == "" || uCmnt == ""){
        alert("Name and Comment field can't be empty!");
    }
    else{
        // console.log(uName,uCmnt);

        console.log(currQuesId,"inside response submit btn");

        dataRetrieved = JSON.parse(localStorage.getItem('data'));

        let responseObj = {
            name:"",
            response:"",
            rspnseVote:0
        }

        responseObj.name = uName;
        responseObj.response = uCmnt;

        console.log(currQuesId,"currid inside submit btn");
        
        // currQuesId = currQuesId.replace("subh3-","");
        currQuesId = currQuesId.replace("quesH3-","");

        dataRetrieved[currQuesId].response.push(responseObj);

        dataRetrieved = JSON.stringify(dataRetrieved);
        localStorage.setItem('data',dataRetrieved);

        // console.log(currQuesId,"inside response submi btn");
        dataRetrieved = JSON.parse(localStorage.getItem('data'));
        theDivParent.innerHTML = "";
        for(let i=0;i<dataRetrieved[currQuesId].response.length;i++){

            let subHeaderDiv = document.createElement('div');
            subHeaderDiv.className = "sub-header";

                let respnseDataDiv = document.createElement('div');
                respnseDataDiv.className = "respnse-data";

                    let theH3 = document.createElement('h3');
                    theH3.className = "right-pane2-h3";
                    theH3.innerText = dataRetrieved[currQuesId].response[i].name;
                    respnseDataDiv.appendChild(theH3);

                    let theP = document.createElement('p');
                    theP.className = "right-pane2-p";
                    theP.innerText = dataRetrieved[currQuesId].response[i].response;
                    respnseDataDiv.appendChild(theP);

                subHeaderDiv.appendChild(respnseDataDiv);

                let theVoteP = document.createElement('p');
                theVoteP.className = "vote-cnt";
                theVoteP.id = `vote-cnt-${i}`;
                theVoteP.innerText = dataRetrieved[currQuesId].response[i].rspnseVote;
                subHeaderDiv.appendChild(theVoteP);
            
            let voteDiv = document.createElement('div');
            voteDiv.className = "vote-div";

                let btnUp = document.createElement('button');
                btnUp.className = "up-vote";
                btnUp.id = `up-vote-${i}`;
                btnUp.innerHTML = "&uarr;";
                voteDiv.appendChild(btnUp);
                btnUp.addEventListener('click',function(){
                    console.log(currQuesId,"inside rspnde upbtn openthiss()");
                    console.log(this.id);

                    let curResId = this.id;
                    curResId = curResId.replace("up-vote-","");

                    dataRetrieved = JSON.parse(localStorage.getItem('data'));
                    dataRetrieved[currQuesId].response[curResId].rspnseVote++;

                    let resVoteCntP = document.getElementById(`vote-cntP-${curResId}`);
                    resVoteCntP.innerText = dataRetrieved[currQuesId].response[curResId].rspnseVote;

                    dataRetrieved = JSON.stringify(dataRetrieved);
                    localStorage.setItem('data',dataRetrieved);
                });

                let btnDown = document.createElement('button');
                btnDown.className = "down-vote";
                btnDown.id = `down-vote-${i}`;
                btnDown.innerHTML = "&darr;";
                voteDiv.appendChild(btnDown);
                btnDown.addEventListener('click',function(){
                    console.log(currQuesId,"inside rspnde dwnbtn openthiss()");
                    console.log(this.id);

                    let curResId = this.id;
                    curResId = curResId.replace("down-vote-","");

                    dataRetrieved = JSON.parse(localStorage.getItem('data'));
                    dataRetrieved[currQuesId].response[curResId].rspnseVote--;

                    let resVoteCntP = document.getElementById(`vote-cntP-${curResId}`);
                    resVoteCntP.innerText = dataRetrieved[currQuesId].response[curResId].rspnseVote;

                    dataRetrieved = JSON.stringify(dataRetrieved);
                    localStorage.setItem('data',dataRetrieved);
                });


            subHeaderDiv.appendChild(voteDiv);
            theDivParent.appendChild(subHeaderDiv);
        }

        clearFields();
    }
});

searchQuesInput.addEventListener('input',inputData);

allFavBtn.addEventListener('click',function(){
    console.log("clicked");

    if(!isAllFavClicked){
        allFavBtn.innerHTML = "&#9733;";
        isAllFavClicked = true;
        showHereDiv.innerHTML="";

        showFavs();

    }else{
        allFavBtn.innerHTML = "&#9734;";
        isAllFavClicked = false;

        showHereDiv.innerHTML="";
        showData();
    }
});

function inputData(){
    let input = searchQuesInput.value.toLowerCase();
    
    dataRetrieved = JSON.parse(localStorage.getItem('data'));

    for(let i=0;i<dataRetrieved.length;i++){

        let text = dataRetrieved[i].ques;

        // console.log(text,"text");

        // lp-quesData-container-0
        // ques-data-1

        // let theDiv2Id = `div-ques-${i}`;
        let theDiv2Id = `lp-quesData-container-${i}`;
        let theDiv2 = document.getElementById(theDiv2Id);

        let thePId2 = `quesP-${i}`;
        let theHId2 = `quesH3-${i}`;
        let theP2 = document.getElementById(thePId2);
        let theH2z = document.getElementById(theHId2);
        // console.log(theP2.innerText,"theP2Innertext...");

        if(text.toLowerCase().includes(input.toLowerCase())){
            //style ""
            // console.log("if `` ");
            theDiv2.style.display = '';

            let regExp = new RegExp(input,"gi");
            theP2.innerHTML = (theP2.textContent).replace(regExp, "<mark>$&</mark>");
            theH2z.innerHTML = (theH2z.textContent).replace(regExp, "<mark>$&</mark>");
        }
        else{
            theDiv2.style.display = 'none';
        }
    }
}

downVoteBtn.addEventListener('click',function(){
    console.log('down vote btn clicked');
    // console.log(currQuesId, typeof currQuesId,"down");
    dataRetrieved = JSON.parse(localStorage.getItem('data'));
    // currQuesId = currQuesId.replace("subh3-","");
    currQuesId = currQuesId.replace("quesH3-","");
    dataRetrieved[currQuesId].voteCnt--;

    voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;
    // voteCntP.id = ;
    // document.getElementById(`vote-cntP-LP-${currQuesId}`).innerText= `Votes: ${dataRetrieved[currQuesId].voteCnt}`;
    document.getElementById(`vote-cnt-${currQuesId}`).innerText= `${dataRetrieved[currQuesId].voteCnt}`;

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);
});

upVoteBtn.addEventListener('click',function(){
    console.log('up vote btn clicked');
    // console.log(currQuesId, typeof currQuesId,"up");
    dataRetrieved = JSON.parse(localStorage.getItem('data'));
    // currQuesId = currQuesId.replace("subh3-","");
    currQuesId = currQuesId.replace("quesH3-","");

    dataRetrieved[currQuesId].voteCnt++;

    voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;

    // document.getElementById(`vote-cntP-LP-${currQuesId}`).innerText= `Votes: ${dataRetrieved[currQuesId].voteCnt}`;
    document.getElementById(`vote-cnt-${currQuesId}`).innerText= `${dataRetrieved[currQuesId].voteCnt}`;

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);
});

function removeExcessSpacesAndNewlines(str) {
    return str.replace(/[\s\n]+/g, ' ').trim();
}

function showData(){
    
    dataRetrieved = JSON.parse(localStorage.getItem('data'));
    console.log(dataRetrieved,typeof dataRetrieved,"show data");

    dataRetrieved = dataRetrieved.sort(function(a,b){
        console.log("sorting");
        if(a.isFav == b.isFav && a.isFav == 1) return 0;
        if(a.isFav > b.isFav) return -1; // -1
        else if( a.voteCnt > b.voteCnt ) return -1; // -1
        else return 1; // 1
    });

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);

    dataRetrieved = JSON.parse(localStorage.getItem('data'));

    for(let i = 0; i < dataRetrieved.length; i++){
        
        let div1 = document.createElement('div');
        div1.className = "lp-quesData-container";
        div1.id = `lp-quesData-container-${i}`;
        
            let div2 = document.createElement('div');
            div2.className = "ques-data";
            div2.id = `ques-data-${i}`;

            div2.addEventListener('click',function(){
                rightPane.style.display="none";
                rightPane2.style.display="";
                currQuesId = theH3.id;

                openThisQues(currQuesId);
            });

                let theH3 = document.createElement('h3');
                theH3.className = "quesH3";
                theH3.innerText = dataRetrieved[i].sub;
                theH3.id = `quesH3-${i}`;
                div2.appendChild(theH3);

                let theP = document.createElement('p');
                theP.className = "quesP";
                theP.innerText = dataRetrieved[i].ques;
                theP.id = `quesP-${i}`;
                div2.appendChild(theP);

                let theTimeP = document.createElement('p');
                theTimeP.className = "time";
                // theTimeP.innerText = `just now`;
                // theTimeP.innerText = getdate(dataRetrieved[i].time);
                // console.log(dataRetrieved[i].time, "inside show data function 2", typeof dataRetrieved[i].time);
                theTimeP.id = `time-${i}`;
                div2.appendChild(theTimeP);

            div1.appendChild(div2);

            let div3 = document.createElement('div');
            div3.className = "fav-vote-container";
            div3.id = `fav-vote-container-${i}`;

                let div4 = document.createElement('div');
                div4.className = "favBtn-voteCnt";
                div4.id = `favBtn-voteCnt-${i}`;

                    let theFav = document.createElement('button');
                    theFav.className = "fav-btn";
                    theFav.id = `fav-btn-${i}`;
                    // theFav.innerHTML = "&#9734;";
                    if(dataRetrieved[i].isFav == 0){
                        theFav.innerHTML = "&#9734;";
                    }else{
                        theFav.innerHTML = "&#9733;";
                    }
                    
                    theFav.addEventListener('click',function(){
                        dataRetrieved = JSON.parse(localStorage.getItem('data'));
                        // let btnId = this.id;
                        // btnId = btnId.replace("","");

                        if(dataRetrieved[i].isFav == 0){
                            theFav.innerHTML = "&#9733;";
                            dataRetrieved[i].isFav = 1;
                        }else{
                            theFav.innerHTML = "&#9734;";
                            dataRetrieved[i].isFav = 0;
                        }
                        dataRetrieved  =JSON.stringify(dataRetrieved);
                        localStorage.setItem('data',dataRetrieved);
                    });
                    div4.appendChild(theFav);

                div3.appendChild(div4);

                let div5 = document.createElement('div');
                div5.className = "vote-div";
                div5.id = `vote-div-${i}`;

                    let theUpBtn = document.createElement('button');
                    theUpBtn.className = "up-vote";
                    theUpBtn.id = `up-vote-${i}`;
                    theUpBtn.innerHTML = "&uarr;";
                    theUpBtn.addEventListener('click',function(){
                        dataRetrieved = JSON.parse(localStorage.getItem('data'));

                        console.log(currQuesId,"up",this.id);
                        currQuesId = this.id;
                        currQuesId = currQuesId.replace("up-vote-","");
                        dataRetrieved[currQuesId].voteCnt++;

                        // voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;
                        document.getElementById(`vote-cnt-${currQuesId}`).innerText= `${dataRetrieved[currQuesId].voteCnt}`;

                        dataRetrieved = JSON.stringify(dataRetrieved);
                        localStorage.setItem('data',dataRetrieved);
                    });
                    div5.appendChild(theUpBtn);

                    let theVoteP = document.createElement('p');
                    theVoteP.className = "vote-cnt";
                    theVoteP.id = `vote-cnt-${i}`;
                    theVoteP.innerText=dataRetrieved[i].voteCnt;
                    div5.appendChild(theVoteP);

                    let theDownBtn = document.createElement('button');
                    theDownBtn.className = "down-vote";
                    theDownBtn.id = `down-vote-${i}`;
                    theDownBtn.innerHTML="&darr;";
                    theDownBtn.addEventListener('click',function(){
                        dataRetrieved = JSON.parse(localStorage.getItem('data'));
                        console.log(currQuesId,"down",this.id);
                        currQuesId = this.id;
                        currQuesId = currQuesId.replace("down-vote-","");
                        dataRetrieved[currQuesId].voteCnt--;
                        // voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;
                        document.getElementById(`vote-cnt-${currQuesId}`).innerText= `${dataRetrieved[currQuesId].voteCnt}`;
                        dataRetrieved = JSON.stringify(dataRetrieved);
                        localStorage.setItem('data',dataRetrieved);
                    });
                    div5.appendChild(theDownBtn);

                div3.appendChild(div5);

            div1.appendChild(div3);

        showHereDiv.appendChild(div1);

    }

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);
}


function showFavs(){
    dataRetrieved = JSON.parse(localStorage.getItem('data'));
    console.log(dataRetrieved,typeof dataRetrieved,"show data");


    for(let i = 0; i < dataRetrieved.length; i++){
        if(dataRetrieved[i].isFav == 1){
            let div1 = document.createElement('div');
            div1.className = "lp-quesData-container";
            div1.id = `lp-quesData-container-${i}`;
            
                let div2 = document.createElement('div');
                div2.className = "ques-data";
                div2.id = `ques-data-${i}`;

                div2.addEventListener('click',function(){
                    rightPane.style.display="none";
                    rightPane2.style.display="";
                    currQuesId = theH3.id;

                    openThisQues(currQuesId);
                });

                    let theH3 = document.createElement('h3');
                    theH3.className = "quesH3";
                    theH3.innerText = dataRetrieved[i].sub;
                    theH3.id = `quesH3-${i}`;
                    div2.appendChild(theH3);

                    let theP = document.createElement('p');
                    theP.className = "quesP";
                    theP.innerText = dataRetrieved[i].ques;
                    theP.id = `quesP-${i}`;
                    div2.appendChild(theP);

                    let theTimeP = document.createElement('p');
                    theTimeP.className = "time";
                    theTimeP.innerText = `just now`;
                    theTimeP.id = `time-${i}`;
                    div2.appendChild(theTimeP);

                div1.appendChild(div2);

                let div3 = document.createElement('div');
                div3.className = "fav-vote-container";
                div3.id = `fav-vote-container-${i}`;

                    let div4 = document.createElement('div');
                    div4.className = "favBtn-voteCnt";
                    div4.id = `favBtn-voteCnt-${i}`;

                        let theFav = document.createElement('button');
                        theFav.className = "fav-btn";
                        theFav.id = `fav-btn-${i}`;
                        // theFav.innerHTML = "&#9734;";
                        if(dataRetrieved[i].isFav == 0){
                            theFav.innerHTML = "&#9734;";
                        }else{
                            theFav.innerHTML = "&#9733;";
                        }
                        
                        theFav.addEventListener('click',function(){
                            dataRetrieved = JSON.parse(localStorage.getItem('data'));
                            // let btnId = this.id;
                            // btnId = btnId.replace("","");

                            if(dataRetrieved[i].isFav == 0){
                                theFav.innerHTML = "&#9733;";
                                dataRetrieved[i].isFav = 1;
                            }else{
                                theFav.innerHTML = "&#9734;";
                                dataRetrieved[i].isFav = 0;
                            }
                            dataRetrieved  =JSON.stringify(dataRetrieved);
                            localStorage.setItem('data',dataRetrieved);
                        });
                        div4.appendChild(theFav);

                    div3.appendChild(div4);

                    let div5 = document.createElement('div');
                    div5.className = "vote-div";
                    div5.id = `vote-div-${i}`;

                        let theUpBtn = document.createElement('button');
                        theUpBtn.className = "up-vote";
                        theUpBtn.id = `up-vote-${i}`;
                        theUpBtn.innerHTML = "&uarr;";
                        theUpBtn.addEventListener('click',function(){
                            dataRetrieved = JSON.parse(localStorage.getItem('data'));

                            console.log(currQuesId,"up",this.id);
                            currQuesId = this.id;
                            currQuesId = currQuesId.replace("up-vote-","");
                            dataRetrieved[currQuesId].voteCnt++;

                            // voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;
                            document.getElementById(`vote-cnt-${currQuesId}`).innerText= `${dataRetrieved[currQuesId].voteCnt}`;

                            dataRetrieved = JSON.stringify(dataRetrieved);
                            localStorage.setItem('data',dataRetrieved);
                        });
                        div5.appendChild(theUpBtn);

                        let theVoteP = document.createElement('p');
                        theVoteP.className = "vote-cnt";
                        theVoteP.id = `vote-cnt-${i}`;
                        theVoteP.innerText=dataRetrieved[i].voteCnt;
                        div5.appendChild(theVoteP);

                        let theDownBtn = document.createElement('button');
                        theDownBtn.className = "down-vote";
                        theDownBtn.id = `down-vote-${i}`;
                        theDownBtn.innerHTML="&darr;";
                        theDownBtn.addEventListener('click',function(){
                            dataRetrieved = JSON.parse(localStorage.getItem('data'));
                            console.log(currQuesId,"down",this.id);
                            currQuesId = this.id;
                            currQuesId = currQuesId.replace("down-vote-","");
                            dataRetrieved[currQuesId].voteCnt--;
                            // voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;
                            document.getElementById(`vote-cnt-${currQuesId}`).innerText= `${dataRetrieved[currQuesId].voteCnt}`;
                            dataRetrieved = JSON.stringify(dataRetrieved);
                            localStorage.setItem('data',dataRetrieved);
                        });
                        div5.appendChild(theDownBtn);

                    div3.appendChild(div5);

                div1.appendChild(div3);

            showHereDiv.appendChild(div1);
        }
    }

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);
}

function openThisQues(currQuesId){
    // console.log(currQuesId, typeof currQuesId, "1");
    // currQuesId = currQuesId.replace("subh3-","");
    currQuesId = currQuesId.replace("quesH3-","");

    console.log(currQuesId, typeof currQuesId, "2");


    dataRetrieved = JSON.parse(localStorage.getItem('data'));

    rightPane2H3.innerText = dataRetrieved[currQuesId].sub;
    rightPane2P.innerText = dataRetrieved[currQuesId].ques;
    voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;

    theDivParent.innerHTML = "";

    // sorting responses
    let respnseArr = dataRetrieved[currQuesId].response;
    respnseArr.sort(function(a,b){
        if(a.rspnseVote > b.rspnseVote) return -1;
        else return 1;
    });
    dataRetrieved[currQuesId].response = respnseArr;
    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);

    dataRetrieved = JSON.parse(localStorage.getItem('data'));

    for(let i=0;i<dataRetrieved[currQuesId].response.length;i++){
        let subHeaderDiv = document.createElement('div');
            subHeaderDiv.className = "sub-header";

                let respnseDataDiv = document.createElement('div');
                respnseDataDiv.className = "respnse-data";

                    let theH3 = document.createElement('h3');
                    theH3.className = "right-pane2-h3";
                    theH3.innerText = dataRetrieved[currQuesId].response[i].name;
                    respnseDataDiv.appendChild(theH3);

                    let theP = document.createElement('p');
                    theP.className = "right-pane2-p";
                    theP.innerText = dataRetrieved[currQuesId].response[i].response;
                    respnseDataDiv.appendChild(theP);

                subHeaderDiv.appendChild(respnseDataDiv);

                let theVoteP = document.createElement('p');
                theVoteP.className = "vote-cnt";
                theVoteP.id = `vote-cntR-${i}`;
                theVoteP.innerText = dataRetrieved[currQuesId].response[i].rspnseVote;
                subHeaderDiv.appendChild(theVoteP);
            
            let voteDiv = document.createElement('div');
            voteDiv.className = "vote-div";

                let btnUp = document.createElement('button');
                btnUp.className = "up-vote";
                btnUp.id = `up-vote-${i}`;
                btnUp.innerHTML = "&uarr;";
                voteDiv.appendChild(btnUp);
                btnUp.addEventListener('click',function(){
                    console.log(currQuesId,"inside rspnde upbtn openthiss()");
                    console.log(this.id);

                    let curResId = this.id;
                    curResId = curResId.replace("up-vote-","");

                    dataRetrieved = JSON.parse(localStorage.getItem('data'));
                    dataRetrieved[currQuesId].response[curResId].rspnseVote++;

                    let resVoteCntP = document.getElementById(`vote-cntR-${curResId}`);
                    resVoteCntP.innerText = dataRetrieved[currQuesId].response[curResId].rspnseVote;

                    dataRetrieved = JSON.stringify(dataRetrieved);
                    localStorage.setItem('data',dataRetrieved);
                    openThisQues(currQuesId);
                });

                let btnDown = document.createElement('button');
                btnDown.className = "down-vote";
                btnDown.id = `down-vote-${i}`;
                btnDown.innerHTML = "&darr;";
                voteDiv.appendChild(btnDown);
                btnDown.addEventListener('click',function(){
                    console.log(currQuesId,"inside rspnde dwnbtn openthiss()");
                    console.log(this.id);

                    let curResId = this.id;
                    curResId = curResId.replace("down-vote-","");

                    dataRetrieved = JSON.parse(localStorage.getItem('data'));
                    dataRetrieved[currQuesId].response[curResId].rspnseVote--;

                    let resVoteCntP = document.getElementById(`vote-cntR-${curResId}`);
                    resVoteCntP.innerText = dataRetrieved[currQuesId].response[curResId].rspnseVote;

                    dataRetrieved = JSON.stringify(dataRetrieved);
                    localStorage.setItem('data',dataRetrieved);
                    openThisQues(currQuesId);
                });

            subHeaderDiv.appendChild(voteDiv);
            theDivParent.appendChild(subHeaderDiv);
    }
}

function clearFields(){
    subjectInput.value="";
    quesArea.value="";
    cmntArea.value="";
    uNameInput.value="";
}

showData();

setInterval(setTimeOfCmnt,1000);
function setTimeOfCmnt(){
    dataRetrieved = JSON.parse(localStorage.getItem('data'));
    for(let i = 0;i<dataRetrieved.length;i++ ){
        document.getElementById(`time-${i}`).innerText = getdate(dataRetrieved[i].time);
    }
}