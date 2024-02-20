const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

// to not let user type characters just no. 
document.querySelector(".amount input").addEventListener("input", function() {
    this.value = this.value.replace(/[^\d]/, '');
    if (isNaN(parseInt(this.value))) {
        alert("Enter a valid input");
        this.value = '';
    }
});

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name ==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name ==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}
//updateflag chnages the flag to the current flag code
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

};


button.addEventListener("click", async (evt)=>{
    evt.preventDefault();//remove default functionalities of the btn like refreshing the page when clicking
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal ===""|| amtVal < 1){
        amtVal=1;
        amount.value="1";
    }

    if(fromCurr.value === toCurr.value) {
        alert("Please select different currencies for conversion.");
        return; // Stop further execution
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    
    let finalAmount = amtVal * rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});




