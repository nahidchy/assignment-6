const loadCategory=async()=>{
    const res =await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data =await res.json();
    const allCategory = data.data;
    displayCategory(allCategory);
}
const displayCategory=(allCategory)=>{
   const allCategoryContainer = document.getElementById("category-container");
   allCategory.forEach(category => {
       const button = document.createElement("button");
       button.classList.add('text-xl','font-bold','px-5','py-2','active:bg-red-500', 'rounded', 'bg-slate-300');
       button.setAttribute('onclick', `displayCategories("${category.category_id}")`);
       button.innerText = category.category;
       allCategoryContainer.append(button)
   });
}
 
const displayCategories =async(id)=>{

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const allData = data.data;
    const categoryContainer = document.getElementById("display-category-content");
    categoryContainer.innerText='';
    if(allData.length !=0){
        allData.forEach(data=>{
            categoryContainer.classList.add("grid");
            categoryContainer.classList.remove("mt-40");
            const div = document.createElement("div");
            div.innerHTML=`
             <img class="w-full px-3 lg:px-0 lg:w-64 h-40 rounded" src="${data.thumbnail}">
             <div class="flex justify-center  gap-4 mt-5">
             <img class="w-10 h-10 rounded-full" src="${data.authors[0].profile_picture}">
             <div class="space-y-2">
           
             <h4 class="text-xl font-medium mt-2">${data.title}</h4>
             
             <div class="flex items-center justify-between">
             <p>${data.authors[0].profile_name}</p>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 bg-blue-700 text-white font-bold rounded-full">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>
</div>
             <p>${data.others.views} views</p>
             </div>
             </div>
            `;
            categoryContainer.append(div)
        })
    }
    else{
        
        categoryContainer.classList.remove("grid");
        categoryContainer.classList.add("mt-40");
        categoryContainer.innerHTML=`

          <div class="flex flex-col justify-center items-center mx-auto text-center">
          <img src="./Icon.png">
          <h4 class="text-2xl font-bold">Oops!! Sorry, <br> There is no content here</h4>
          </div>
        `
    }

}

loadCategory();
displayCategories("1000")