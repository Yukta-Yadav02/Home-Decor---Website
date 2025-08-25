// async function Api(){
//    try{
//     const response = await fetch('https://jsonplaceholder.typicode.com/photos')
//     const result = await response.json()
//     console.log(result);
//    } catch(err){
//        console.log("Something went wrong" , err)
//    }
// }
// Api();





const url = "https://jsonplaceholder.typicode.com/photos";

fetch(url)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    console.log(data);
    const cardContainer = document.getElementById("cardContainer");
    data.slice(0,9).forEach((photos)=>{
        const card = document.createElement("div");
        card.classList.add("col-md-4", "col-sm-6","mb-4");
        card.innerHTML = `
        <div class="card border border-3 border-secondary " >
        <div class="card-body">
        <h4 class="card-id"> ${photos.id}. </h4>
        <h5 class="card-title"> <span class="text-primary"> Title </span> - ${photos.title} </h5>
        <img src="${photos.thumbnailUrl}" alt="thumbnail" class="img-fluid"/>
        <br/>
        <a href="${photos.url}" target="_blank" class="mt-2 "> <span class="text-primary">Visit image </span> </a>
        </div>
        </div>`; 

        cardContainer.appendChild(card);
    });
})
.catch((error)=>{
    console.error("Error:",error);
})