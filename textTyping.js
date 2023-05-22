function textTyping(){
  console.log("타이핑효과 잘되네")
  let a = 50 + 30;
  
  /* I'm a 직업군 
                  ↑ 나타나고 지워져야함 
        효과 2개)
            1. 한번만 타이핑 찍어줌 (I'm a) 
            2. 직업군 부분만 타이핑 찍고 다시지워져야함 (직업군) / 자동실행 함수 
        */
       
        // *한글자씩 진행하겠다! publisher 진행 끝나고 다음 진행

        const text = document.querySelector(".text");
        // 1.
       let mainText = "I'm a "
                    // 012345
       let mainIndex = 0; // mainText에 있는 글자 하나씩 가져오기 위한 증가될 순번값
                            // 반복문 작업할 querySelectorAll 없기에

        // 2.
        //출력효과 끝나면 직업군 텍스트 나타나고 지워지는 자동실행 함수 
        let backAutoTyping; // 변수 생성후 값을 할당하지 않음
            //  자동실행에 같이 넣으면 안된다고 했음


        // js시작 =>
        //앞에 있는 I'm a를 출력하기 위한 자동실행 함수
        // let frontAutoTyping = setInterval(

        let frontAutoTyping = setInterval(function(){

            // text.innerText += mainText[mainIndex];//한글자 텍스트 찍고 
            text.innerText += mainText[mainIndex];
                            // mainText[mainText.length] 
                            // 안됨 why mainText.length 5이다 5부터 증가시키겠단 말임
                            // 비교대상이 없어짐
            mainIndex++; // 순번값 1증가

            //글자타이핑이 전부 끝났을떄 자동실행을 멈추어 준다
            if(mainIndex >= mainText.length){
                clearInterval(frontAutoTyping);
                //뒤 글자 출력을 위한 태그 생성(자식요소)
                //why 뒤 글자는 색을 바꿔주고 싶어요! 
                // <div class="text">I'm a <span></span></div>
                
                let child = document.createElement("span");
                child.setAttribute("class","child"); 
                text.append(child); //부모태그에 span태그 추가
                    //prepend(앞에 붙음)

                //앞 글자 타이핑 종료(clearInterval)후 뒷 글자 출력을 위한 자동실행
                backAutoTyping = setInterval(function(){
                    typing();
                },200);

            }

        },200)
          //0.2초마다 한번씩 실행
       

        //뒷 글자 출력을 위한 typing()함수 선언 구간
        let backTextList = ["Publisher","Web Designer","Front end","Back end"];
        let subIndex = 0; //backTextList 배열에 있는 글자데이터 순번값 4개 
        let backIndex = 0; //배열에 있는 글자데이터의 한글자씩 가져오기 위한 순번값 

        // *흐름)  backTextList 배열의 첫번째 Publisher 한글자씩 p -> u-> 다찍히면 Web Designer으로 넘어감
        
        let maxIndex =0; //뒤에서부터 시작 글자를 한글자씩 지우기 위한 변수값

        // js 시작 =>
        function typing(){
            //생성된 span 태그 안에 글자를 한글자씩 타이핑을 위한 기능 구현
            const subText = document.querySelector(".text .child");

            //배열안에 있는 한단어의 한글자씩 출력 먼저 진행 하기
            if(backIndex < backTextList[subIndex].length){
                                //subIndex 0 이라서 Publisher 해당 Publisher의 length값 나타냄 9개
                subText.innerText += backTextList[subIndex].charAt(backIndex);
                backIndex++;

                //흐름) backIndex 가 0 부터 시작 <backTextList의 0번째 Publisher의 length값 9개까지
                    // 해석: span에 한 글자씩 backTextList의 [0]번째 Publisher charAt(backIndex :  0부터 시작 변동되는 숫자) p -> u -> b -> ... 출력

                //배열안에 있는 문자열(한분장) 출력이 끝났을 때 조건 설정(출력되고 있는 상황에서 하나의 조건을 또 check 하겠다!)
                 if(backIndex >= backTextList[subIndex].length){
                // 해석: backIndex 9 로 넘어옴 그때부터 9가 9보다 큰가를 check 해주겠다 
                    maxIndex = backTextList[subIndex].length; // 한문장의 글자 갯수값을 변수에 담아 두겠다!
                    // 해석: 숫자9를 maxIndex에 담아두겠다!

                    // 한문장이 끝나면 바로 잠깐 멈추게 하겠다
                    stopAndStart();

                }
            }
            
            //배열안에 있는 한문장의 글자를 하나씩 제외하면서 화면에 출력하겠다
            else if(maxIndex >= 0){
                // maxIndex 현재 숫자 9를 담아두었다
                subText.innerText = backTextList[subIndex].substring(0,maxIndex); 
                //  Publisher -> Publishe -> Publish -> Publis 누적하지 않고 한글자씩 잘라서 보여주겠다
                maxIndex--;//1씩 감소 
                if(maxIndex < 0 ){ //한문장의 글자제거가 전부 끝나면 
                    backIndex = 0; // 다음문장의 첫번째 글자서 부터 출력을 하기 위해 초기화 필요!
                    // if(backIndex >= backTextList[subIndex].length){ 0으로돌려야 이부분 실행됨
                
                    // 다음순번의 문자열 출력을 위해 subIndex 숫자값 1증가 publisher -> webdesign 으로 넘어감
                    if(subIndex === backTextList.length-1){
                                    //0.1.2.3까지 실행 하겠다! 

                        //backend까지 실행하고 나야 IF문 실행 된다
                        subIndex = 0;
                    }   
                    else{
                        subIndex++;
                    }
                    stopAndStart();


                }

            }
        }
        //FOR 실행시 다같이 실행된 결과가 화면에 나옴 근데 우리는 하나씩 이루어 나가야하니까

        // 중복코드 함수로 묶어주겠다!
        function stopAndStart(){
            clearInterval(backAutoTyping)
                    // /지워지고 난다음에 자동실행이 멈추어 있는지 
                    // 지우기 
                    setTimeout(function(){
                        //3초뒤에 자동실행 다시 시작 
                        backAutoTyping = setInterval(function(){
                            typing();
                            //이뜻은 아예 위에서 부터 다시 시작 하겠다는 뜻
                        },200);
                    },3000);
        }

    //보통은 함수로 묶어서 내가 원하는 순간에 실행할수 있도록 만들어 준다 
    //응용해서 여러곳 재사용 가능!                                 
    //안묶으면 바로 실행됨 켜자마자 
    
}
        

        