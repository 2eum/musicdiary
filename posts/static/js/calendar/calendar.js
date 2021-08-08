let date = new Date();
// let contents = JSON.parse("{{ contents_js | escapejs }}")

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.cal-year').textContent = `${viewYear}`;
    document.querySelector('.cal-month').textContent = `${viewMonth + 1}`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    

    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ?
            'this' : 'other';
        const dateClassSelector = `.on${viewYear}-${viewMonth+1}-${date}`
        const entryImg = document.querySelectorAll(dateClassSelector);
        let imgList = ""
        entryImg.forEach(x =>{
            if(x){
                imgList += `
            <a href="detail/${x.querySelector(".id").textContent}">
            <img 
            src=${x.querySelector(".img-src").textContent} 
            alt="cover" class="ma1" />
            </a>`
            }
        })
        dates[i] = 
            `<div class="cal-date ${condition}">
                ${date}
                <div class="flex covers">
                    ${imgList}
                </div>
            </div>
            `;
    });

    document.querySelector('.cal-dates').innerHTML = dates.join('');
    //div가 담긴 dates 배열을 통째로 cal-dates div에 옮겨심기



    const today = new Date();
    
    if(viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()){
                date.classList.add('today');
                break;
            }
        }
    }
}; //renderCalendar


// console.log(contents);

renderCalendar();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};

const goToday = () => {
    date = new Date();
    renderCalendar();
};