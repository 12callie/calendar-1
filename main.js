let currentTime = new Date()
render(currentTime)

g('#nextMonth').onclick = ()=>{
    const 下月初 = new Date(currentTime.getFullYear(), currentTime.getMonth()+1, 1)
    render(下月初)
}
g('#preMonth').onclick = ()=>{
    const 上月初 = new Date(currentTime.getFullYear(), currentTime.getMonth()-1, 1)
    render(上月初)
}
g('#today').onclick = ()=>{
    render(new Date())
}




function render(time){
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    initTime()
    generateDays()
    currentTime = time
    


    function initTime(){
        g('#time').textContent = `${year}年${month}月`
    }
    function generateDays(){
        const 月初 = new Date(year, month-1, 1)
        const 月初星期几 = 月初.getDay()
        const 月末 = new Date(new Date(year, month-1+1, 1) -86400*1000)
        const 这月多少天 = 月末.getDate()
        const 月末星期几 =月末.getDay()
        const days = g('#days')
        const now = new Date()
        let selectedLi
        days.textContent = ''
        let n=0
        for(let i = 1;i<=这月多少天;i++){
            const li = document.createElement('li')
            li.textContent = i
            if(i === now.getDate() && month === now.getMonth()+1 && year === now.getFullYear()){
                li.classList.add('calendar-days-today')
                li.textContent = "今"
            }
            li.onclick = ()=>{
                if(selectedLi){
                    selectedLi.classList.remove('calendar-days-selected')
                }
                li.classList.add('calendar-days-selected')
                selectedLi = li
            }
            days.append(li)
            n += 1
        }
        
        for(let i = 1;i<月初星期几;i++){
            const li = document.createElement('li')
            const d = new Date(月初 - 86400*1000*i)
            li.textContent = d.getDate()
            li.onclick = ()=>{
                if(selectedLi){
                    selectedLi.classList.remove('calendar-days-selected')
                }
                li.classList.add('calendar-days-selected')
                selectedLi = li
            }
            li.classList.add('calendar-days-disabled')
            days.prepend(li)
            n += 1
        }
        let i = 月末星期几+1
        for(j=0;j<42-n;j++){
            const li = document.createElement('li')
            const delta = i - 月末星期几
            const d = new Date(月末-0 + 86400*1000*delta)
            li.textContent = d.getDate()
            li.onclick = ()=>{
                if(selectedLi){
                    selectedLi.classList.remove('calendar-days-selected')
                }
                li.classList.add('calendar-days-selected')
                selectedLi = li
            }
            li.classList.add('calendar-days-disabled')
            days.append(li)
            i++
        }
    }
}
function g (selector){
    return document.querySelector(selector)
}
function gs (selector){
    return document.querySelectorAll(selector)
}
