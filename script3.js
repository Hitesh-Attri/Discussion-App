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
// let voteCnt = 0;



// for local storage. need modification
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

    // console.log("q >",qStr,"s >",subStr);

    if(subStr == "" || qStr == ""){
        alert("Subject or Ques field empty!");
    }
    else{
        // console.log("hhhhhhhhhhhhhhhhhhh");
        let obj = {
            sub:subStr,
            ques:qStr,
            voteCnt:0,
            isFav:0,
            response:[]
        }

        dataRetrieved = JSON.parse(localStorage.getItem('data'));
        // console.log(dataRetrieved,typeof dataRetrieved,"hh");
        dataRetrieved.push(obj);
        // console.log(dataRetrieved,typeof dataRetrieved,"hh");

        dataRetrieved = JSON.stringify(dataRetrieved);
        // console.log(dataRetrieved,typeof dataRetrieved,"jj");

        localStorage.setItem('data',dataRetrieved);

        clearFields();

        showHereDiv.innerHTML="";
        showData();
    }
});

newQuesFormBtn.addEventListener('click',function(){
    console.log('new Ques Form btn clicked');

    rightPane.style.display="";
    rightPane2.style.display="none";

});

resolveBtn.addEventListener('click',function(){
    console.log("resolve btn clicked")

    // console.log(currQuesId,"inside resolve");
    currQuesId = currQuesId.replace("subh3-","");
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
        console.log(uName,uCmnt);

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
        
        currQuesId = currQuesId.replace("subh3-","");

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

                    let resVoteCntP = document.getElementById(`vote-cnt-${curResId}`);
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

                    let resVoteCntP = document.getElementById(`vote-cnt-${curResId}`);
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

function inputData(){
    let input = searchQuesInput.value.toLowerCase();
    
    dataRetrieved = JSON.parse(localStorage.getItem('data'));

    for(let i=0;i<dataRetrieved.length;i++){

        let text = dataRetrieved[i].ques;

        // console.log(text,"text");

        let theDiv2Id = `div-ques-${i}`;
        let theDiv2 = document.getElementById(theDiv2Id);

        let thePId2 = `quesP-${i}`;
        let theP2 = document.getElementById(thePId2);
        // console.log(theP2.innerText,"theP2Innertext...");

        if(text.toLowerCase().includes(input.toLowerCase())){
            //style ""
            // console.log("if `` ");
            theDiv2.style.display = '';

            // for highlight
            // let pattern = new RegExp(`${input}`,"gi");

            // theP2.innerHTML = theP2.textContent.repeat(pattern,match => `<mark>${matcch}</mark>`);

            let regExp = new RegExp(input,"gi");
            theP2.innerHTML = (theP2.textContent).replace(regExp, "<mark>$&</mark>");

        }
        else{
            //syle none
            // console.log("else `none` ");
            theDiv2.style.display = 'none';
        }
    }
}

downVoteBtn.addEventListener('click',function(){
    console.log('down vote btn clicked');
    // console.log(currQuesId, typeof currQuesId,"down");
    dataRetrieved = JSON.parse(localStorage.getItem('data'));
    currQuesId = currQuesId.replace("subh3-","");
    dataRetrieved[currQuesId].voteCnt--;

    voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;
    // voteCntP.id = ;
    document.getElementById(`vote-cntP-LP-${currQuesId}`).innerText= `Votes: ${dataRetrieved[currQuesId].voteCnt}`;

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);
});

upVoteBtn.addEventListener('click',function(){
    console.log('up vote btn clicked');
    // console.log(currQuesId, typeof currQuesId,"up");
    dataRetrieved = JSON.parse(localStorage.getItem('data'));
    currQuesId = currQuesId.replace("subh3-","");

    dataRetrieved[currQuesId].voteCnt++;

    voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;

    document.getElementById(`vote-cntP-LP-${currQuesId}`).innerText= `Votes: ${dataRetrieved[currQuesId].voteCnt}`;

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);
});

function removeExcessSpacesAndNewlines(str) {
    return str.replace(/[\s\n]+/g, ' ').trim();
}

// function showDataScript3(){
    
//     dataRetrieved = JSON.parse(localStorage.getItem('data'));
//     console.log(dataRetrieved,typeof dataRetrieved,"show data");

//     for(let i = 0; i < dataRetrieved.length;i++){
//         dataRetrieved.id = i;

//         let outerDiv = document.createElement('div');
//         outerDiv.className = "outer-div";
//         outerDiv.id = `outer-div-${i}`;

//         let quesDiv = document.createElement('div');
//         quesDiv.className = "div-ques";
//         quesDiv.id = `div-ques-${i}`;
    
//         let subh3 = document.createElement('h3');
//         subh3.innerText = dataRetrieved[i].sub;
//         subh3.id = `subh3-${i}`;
//         quesDiv.appendChild(subh3);
//         subh3.addEventListener('click',function(){
//             rightPane.style.display="none";
//             rightPane2.style.display="";
//             currQuesId = subh3.id;

//             openThisQues(currQuesId);
//         });
    
//         let quesP = document.createElement('p');
//         quesP.innerText = dataRetrieved[i].ques;
//         quesP.id = `quesP-${i}`;
//         quesDiv.appendChild(quesP);

//         outerDiv.appendChild(quesDiv);

//         let favBtn = createElement('button');
//         favBtn.className = "fav-btn";
//         favBtn.id = `fav-btn-${i}`;
//         favBtn.innerHTML = "&#9734;";
//         outerDiv.appendChild(favBtn);
//         favBtn.addEventListener('click',function(){
//             console.log("fav clicked");
//         });
        
//         showHereDiv.appendChild(outerDiv);
//     }

//     dataRetrieved = JSON.stringify(dataRetrieved);
//     localStorage.setItem('data',dataRetrieved);
// }

function showData(){
    
    dataRetrieved = JSON.parse(localStorage.getItem('data'));
    console.log(dataRetrieved,typeof dataRetrieved,"show data");

    

    for(let i = 0; i < dataRetrieved.length;i++){
        dataRetrieved.id = i;
        let quesDiv = document.createElement('div');
        quesDiv.className = "div-ques";
        quesDiv.id = `div-ques-${i}`
    
        let subh3 = document.createElement('h3');
        subh3.innerText = dataRetrieved[i].sub;
        subh3.id = `subh3-${i}`;
        quesDiv.appendChild(subh3);

        subh3.addEventListener('click',function(){
            rightPane.style.display="none";
            rightPane2.style.display="";
            currQuesId = subh3.id;

            openThisQues(currQuesId);
        });
    
        let quesP = document.createElement('p');
        quesP.innerText = dataRetrieved[i].ques;
        quesP.id = `quesP-${i}`;
        quesDiv.appendChild(quesP);

        let favBtn = document.createElement('button');
        favBtn.className = "fav-btn";
        favBtn.id = `fav-btn-${i}`;

        // favBtn.innerHTML = "&#9734;";
        if(dataRetrieved[i].isFav == 0){
            favBtn.innerHTML = "&#9734;";
        }else{
            favBtn.innerHTML = "&#9733;";
        }
        quesDiv.appendChild(favBtn);
        favBtn.addEventListener('click',function(){
            console.log("fav clicked, id > ",this.id);
            
            dataRetrieved = JSON.parse(localStorage.getItem('data'));

            console.log(typeof dataRetrieved,i);
            if(dataRetrieved[i].isFav == 0){
                favBtn.innerHTML = "&#9733;";
                dataRetrieved[i].isFav = 1;

            }else{
                favBtn.innerHTML = "&#9734;";
                dataRetrieved[i].isFav = 0;
            }
            dataRetrieved  =JSON.stringify(dataRetrieved);
            localStorage.setItem('data',dataRetrieved);
        });

        let voteCntP = document.createElement('p');
        voteCntP.className = "vote-cntP-LP";
        voteCntP.id = `vote-cntP-LP-${i}`;
        voteCntP.innerText = `Votes: ${dataRetrieved[i].voteCnt}`;
        quesDiv.appendChild(voteCntP);


        // let testP = document.createElement('p');
        // testP.innerText = "asdfadf";
        // quesDiv.appendChild(testP);

        showHereDiv.appendChild(quesDiv);
    }

    dataRetrieved = JSON.stringify(dataRetrieved);
    localStorage.setItem('data',dataRetrieved);
}

function openThisQues(currQuesId){
    // console.log(currQuesId, typeof currQuesId, "1");
    currQuesId = currQuesId.replace("subh3-","");

    // console.log(currQuesId, typeof currQuesId, "2");

    dataRetrieved = JSON.parse(localStorage.getItem('data'));

    rightPane2H3.innerText = dataRetrieved[currQuesId].sub;
    rightPane2P.innerText = dataRetrieved[currQuesId].ques;
    voteCntP.innerText = dataRetrieved[currQuesId].voteCnt;

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

                    let resVoteCntP = document.getElementById(`vote-cnt-${curResId}`);
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

                    let resVoteCntP = document.getElementById(`vote-cnt-${curResId}`);
                    resVoteCntP.innerText = dataRetrieved[currQuesId].response[curResId].rspnseVote;

                    dataRetrieved = JSON.stringify(dataRetrieved);
                    localStorage.setItem('data',dataRetrieved);
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