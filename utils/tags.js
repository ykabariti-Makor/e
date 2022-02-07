const tagSplitter = (str, userSeparatorsArr) => {
    let inferredSeparator = "";
    let options = [];
    if(userSeparatorsArr && userSeparatorsArr?.length){
        const reg = /\W/
        userSeparatorsArr.forEach(separator => {
            //Checking if user supplied separators are valid
            if(!reg.test(separator)){
                throw new Error("Separators may only be special characters");
            }
        })
        //if user supplies an array of separators - we check how many items are included
        if(userSeparatorsArr.length === 1){
            inferredSeparator = userSeparatorsArr[0];
        }else{
            options = [...userSeparatorsArr]
        }
       
    }
    
    if(!userSeparatorsArr || userSeparatorsArr.length > 1){
        
        //No separator is supllied- it should be inferred from given str
        const regSeparatorCandidates = /\W/g; 
        //Capturing all special characers- these are the candidates for the separator (with dupicates)
        let strangeChars = [...str.matchAll(regSeparatorCandidates)].map(item => item[0]);
        if(userSeparatorsArr?.length > 1){
            //If user supplied legit array of separtor options (more than 1) - the candidates for selected separator will only include user options
            strangeChars = strangeChars.filter(char => options.includes(char))
        }

        //Counting frequncy for each candidate
        const countsObj = strangeChars.reduce((accumulator, current) => {
            accumulator[current] = accumulator[current]
                 ? accumulator[current] +=1 
                 : accumulator[current] = 1
            return accumulator
         },{});
         const countsArr = Object.entries(countsObj)
        if(countsArr.length > 1){
             //If there are several candidates for separators - sort according to count
             countsArr.sort((a,b) => b[1] - a[1]);         
        }
        //saving either the only candidate or the candidate with highest count
        inferredSeparator = countsArr[0][0];
    }

    //moving from the separator as a string to a regex that represents it correctly

    let inferredReg;
    if(inferredSeparator === " "){
        inferredReg = /\s/
    }else if([".", "*", "?", "$", "^", "(", ")"].includes(inferredSeparator)){
        //All these special chars need a backslash before them to be read literally
        inferredReg = new RegExp(`\\${inferredSeparator}`)
    }else{
        inferredReg = new RegExp(inferredSeparator)
    }
   
    const tags = str.split(inferredReg);
    return tags;
}


