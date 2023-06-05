let data
let totalPage
let currentPage
let url = "https://2023-engineer-camp.zeabur.app/api/v1/works"


getPage(url)


//抓資料
function getPage(url) {
    axios.get(url)
        .then(function (res) {
            data = res.data.ai_works.data
            totalPages = res.data.ai_works.page.total_pages
            currentPage = res.data.ai_works.page.current_page
            renderAll(data)
        })
        .catch((error) => {
            console.log('error');
        });
}



//顯示抓取到的資料
function renderAll(data) {
    let str = ""
    for (let i = 0; i < data.length; i++) {
        str = str + `
    <li class="card">
      <div class="pic">
        <img src="${data[i].imageUrl}" alt="pic">
      </div>
      <a class="content" href="${data[i].link}" target="_blink">
        <h3>${data[i].title}</h3>
        <p>${data[i].description}</p>
      </a>
      <div class="model">
        <p class="AI-model">${data[i].model}</p>
         <p>${data[i].discordId}</p>
      </div>
      <div class="share">
        <a href="#" class="tag font">#${data[i].type}</a>
        <a href="#"><img src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/2023web-camp/icons/share.png" alt="share"></a>
      </div>
    </li>
    `
    }
    let html = document.querySelector("#card-group")
    html.innerHTML = str
    //顯示頁碼
    showPaginator(totalPages)
}


//顯示paginator
function showPaginator(totalPages) {
    let str = ""
    for (let i = 1; i <= totalPages; i++) {
        //判斷頁碼是否為目前頁面，如果是，加上now-page，會反黑來代表目前頁面。
        if (i == currentPage) {
            str = str + `
          <li class="font now-page"><a class="now-page" href="#card-group">${i}</a></li>
          `
        } else {
            str = str + `
          <li class="font"><a href="#card-group">${i}</a></li>
          `
        }
        let html = document.querySelector(".paginator")
        html.innerHTML = str
    }
}


//監聽paginator和換頁功能
const paginator = document.querySelector(".paginator");
paginator.addEventListener("click", function (e) {
    //抓取被點擊到的頁碼
    let page = e.target.textContent
    console.log(page)
    //湊出頁碼API
    let url = "https://2023-engineer-camp.zeabur.app/api/v1/works?page=" + page
    console.log(url)
    getPage(url)
});