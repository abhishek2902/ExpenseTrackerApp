let textEle=document.getElementById('text1');
let amtEle=document.getElementById('text2');
let transEle=document.querySelector('.transactions');

let totalAmt=0;
let totalEar=0;
let totalExp=0;

let arr=[
    // {id:Math.floor(Math.random()*1000),text:"Dad",amt:"2000",dc:"C",color:"green"}
];
function display(){
    transEle.innerHTML=``;
    arr.forEach(obj => {
        transEle.innerHTML+=
        `<div class="transaction" id=${obj.id} >
        <div class="show" onclick="showEdit(${obj.id})">
            <div class="left">
                <p id="text">${obj.text}</p>
                <p id="amount">${obj.dc=="C"?"+":"-"}₹ ${obj.amt}</p>
            </div>
            <p style="background-color:${obj.color}" id="debitOrCredit">${obj.dc}</p>
        </div>
        <div id="after" class="after hide">
            <span id="editSym" class="material-symbols-outlined" onclick="handleEdit(${obj.id})">edit</span>
            <span id="delSym" class="material-symbols-outlined" onclick="handleDel(${obj.id})">delete</span>
        </div>
    </div> `
});
document.querySelector(".yourBal").innerHTML = `₹ ${totalAmt}`;
document.querySelector("#totalEar").innerHTML = `₹ ${totalEar}`;
document.querySelector("#totalExp").innerHTML = `₹ ${totalExp}`;
}
display();

//procedure after button click event
let formEle=document.getElementById('form1');
formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    //Fetching Data from form
    const formData=new FormData(formEle);
    const tData={};
    formData.forEach((value,key)=>{
        tData[key]=value;
    });
    //checking clicked button from event
    let clickedButton = event.submitter.id;
    //console.log(event);
    if(clickedButton=="btnEar")
        {
            let obj={id:Math.floor(Math.random()*1000),text:tData.text1,amt:tData.text2,dc:"C",color:"green"}
            arr.unshift(obj);
            totalAmt+=+amtEle.value;
            totalEar+=+amtEle.value;
            display();
            textEle.value=``;
            amtEle.value=``;
            //console.log(totalAmt);
        }
    else if(clickedButton=="btnExp")
    {
        let obj={id:Math.floor(Math.random()*1000),text:tData.text1,amt:tData.text2,dc:"D",color:"red"}
        arr.unshift(obj);
        totalAmt-=+amtEle.value;
        totalExp+=+amtEle.value;
        display();
        textEle.value=``;
        amtEle.value=``;
        //console.log(totalAmt);
    }
})

function showEdit(id){
    let selectedTransaction=document.getElementById(id);
    const lowerEle=selectedTransaction.querySelector('#after');
    lowerEle.classList.toggle("hide");
}
function handleEdit(id){
    const arr1=arr.filter((t)=>t.id===id)
    //console.log(arr1);
    textEle.value=arr1[0].text;
    amtEle.value=arr1[0].amt;
    handleDel(id);
}

function handleDel(id){
    const arr1=arr.filter((t)=>t.id===id)
    //console.log(arr1);
    if(arr1[0].dc==="C")
    {
    totalAmt-=+(arr1[0].amt);
    totalEar-=+arr1[0].amt;
    }
    else
    {
        totalAmt+=+arr1[0].amt;
        totalExp-=+arr1[0].amt;
    }
    const newarr=arr.filter((t)=>t.id!==id)
    arr=newarr;
    display();
}