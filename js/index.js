let count = 0;

const cardAll = async (newText)=> {
    const apiLink = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${newText}`);
    const post = await apiLink.json();
    const allPost = post.posts;
  
    const newContainer = document.getElementById('input-card');
    newContainer.textContent="";
    allPost.forEach((items) => {
    const newDiv = document.createElement('div');
        
        newDiv.innerHTML = `
        <div class="rounded-xl bg-gray-300 min-h-full  lg:h-[300px] pt-5
        lg:w-[95%] mt-5">
        <div class="flex space-y-5">
        <div class="indicator w-[20%] h-[20%] m-5">
        <span id="clr" class="indicator-item badge badge-secondary"></span> 
        <div class="">
                <img src="${items.image}" alt="">
            </div>
      </div>
            <div class="space-y-5 w-full">
                <div class="flex gap-8 text-xl font-medium">
                    <p># <span>${items.category}</span></p>
                    <p>Author : ${items.author.name}</p>
                </div>
                <h3 class="text-2xl font-bold">${items.title}</h3>
                <p>${items.description}</p> <hr class="border-dashed border-black  mr-4 ">
                <div class="justify-between flex  pb-5 pt-2 w-full">
                    <div class="flex text-center items-center space-x-4">
                        <div class="flex gap-2">
                            <img src="images/table-mgs.png" alt="">
                            <p>${items.comment_count}</p>
                        </div>
                        <div class="flex gap-2">
                            <img src="images/eye.png" alt="">
                            <p>${items.view_count}</p>
                        </div>
                        <div class="flex gap-2">
                            <img src="images/time.png" alt="">
                            <p><span>${items.posted_time}</span> min</p>
                        </div> 
                    </div>
                    <div  class="btn my-btn border-none bg-gray-300">
                        <img src="images/mgs.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        newContainer.appendChild(newDiv);
        const btn = newDiv.querySelector('.my-btn');
        btn.addEventListener('click', () =>{
            
            const span = newDiv.querySelector("#clr");

            const total = items.isActive;
            
            if (total === true) {  
                span.classList.remove("badge-secondary");
                span.classList.add("badge-success");  
                
            } else {
                span.classList.remove("badge-success");
                span.classList.add("badge-secondary");
            }

            count = count+1;
        document.getElementById('markCount').innerText = count;

            const btnDiv =document.getElementById('myButton');
            const addDiv = document.createElement('div');
            addDiv.innerHTML=`
            <div class="m-5">
            <div class="flex justify-between p-5 bg-white rounded-xl w-[100%] h-[90px]">
              <p class="text-xl font-semibold">${items.title}</p>
            <div class="flex gap-2 items-center">
                <img src="images/eye.png" alt="">
                <p>${items.view_count}</p>
            </div>
            </div>
            </div>
            `;
            btnDiv.appendChild(addDiv);
        });
        
    });
}


const newCard = async()=>{
    const cardLink = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const cardItem = await cardLink.json();
    const allCardItem = cardItem;
    
    const newCard =document.getElementById('lastCard');
    allCardItem.forEach((element) => {
        const newDivCard = document.createElement('div');
        newDivCard.innerHTML=`
        <div class="flex flex-col rounded-2xl border-2 shadow-lg space-y-5 p-4 ">
                    <div class="">
                      <img src="${element.cover_image}" alt="">
                    </div>
                    <div class="space-y-5">
                      <div class="flex items-center justify-start gap-2">
                        <img src="images/last.png" alt="">
                        <p>${element.author.posted_date ? element.author.posted_date : 'No publish date'}</p>
                      </div>
                      <p class="font-bold">${element.title}</p>
                      <p>${element.description }.</p>
                      <div class="flex justify-start items-center gap-5">
                        <div class="rounded-full border">
                          <img class="h-20" src="${element.profile_image}" alt="">
                        </div>
                        <p>${element.author.name}<br> <span>${element.author.designation ? element.author.designation:'unknown'}</span> </p>
                        <p></p>
                      </div>
         
                    </div>
                  </div>
        `
        newCard.appendChild(newDivCard);
    });
}


const searchBtn = ()=>{
    
    const searchField = document.getElementById('searchId');
    const searchText =searchField.value;
    cardAll(searchText)
}

const spinner =(isLoading)=>{
    const loadingField = document.getElementById('loading');
    if(isLoading){
        loadingField.classList.remove('hidden');
    }else{
        loadingField.classList.add('hidden');
    }
}

searchBtn();

newCard();


// cardAll();