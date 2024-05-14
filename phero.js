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
       button.classList.add('text-xl','font-bold','p-3','active:bg-red-500', 'rounded', 'bg-slate-300');
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
             <div class="flex justify-start items-center  gap-4 mt-5">
             <img class="w-10 h-10 rounded-full" src="${data.authors[0].profile_picture}">
             <div>
             <h4 class="text-xl font-medium mt-2">${data.title}</h4>
             <p>${data.authors[0].profile_name}</p>
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