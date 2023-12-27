const download = document.querySelector(".download"),
    dark = document.querySelector(".dark"),
    light = document.querySelector(".light"),
    qrContainer = document.querySelector("#qr-code"),
    qrText = document.querySelector(".qr-text"),
    shareBtn = document.querySelector(".share-btn"),
    sizes = document.querySelector(".sizes"),
    defaultURL = "https://vinayhajare.github.io/VinayHajare";
  
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultURL,
    size = 400;

async function generateQRCode(){
    qrContainer.innerHTML = "" ;
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
}

function resolveDataUrl(){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const img = document.querySelector("#qr-code img");
            if(img.currentSrc){
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}

dark.addEventListener("input", (e)=>{
    colorDark = e.target.value;
    generateQRCode();
});

light.addEventListener("input", (e)=>{
    colorLight = e.target.value;
    generateQRCode();
});

sizes.addEventListener("input", (e)=>{
    size = e.target.value;
    generateQRCode();
});

qrText.addEventListener("input", (e)=>{
    const value = e.target.value;
    text = value;
    if(!value){
        text = defaultURL;
    }
    generateQRCode();
});

shareBtn.addEventListener("click", (e)=>{
    setTimeout(async ()=>{
        try{
            const base64URL = await resolveDataUrl();
            const blob = await(await fetch(base64URL)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        }catch(error){
            alert(" Your browser does not support sharing!");
        }
    }, 100);
});

generateQRCode();