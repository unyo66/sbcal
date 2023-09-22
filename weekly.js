////////////// 주간퀘 체크 /////////////

for (let i = 0; i < flag.length; i++) {
    flag[i] = ac_weekly[i];
}
let wchk = document.getElementsByClassName("weekly_check");
let wchk_all = document.getElementById("weekly_check_all");

for (let i = 0; i < ac_weekly.length; i++) {
    if (ac_weekly[i] == 1) {
        check_or_no(i + 1, false);
    }
}

wchk_all.addEventListener("click", function() {
    if (get_flag() != 6) {
        for (let i = 1; i < wchk.length; i++) {
            document.getElementsByClassName("check_leg")[i].style.background = "red";
            wchk[i].setAttribute("class", "weekly_check checked");
        }
    }
    else if (get_flag() == 6) {
        for (let i = 1; i < wchk.length; i++) {
            document.getElementsByClassName("check_leg")[i].style.background = "none";
            wchk[i].setAttribute("class", "weekly_check");
        }
    }
})

for (let i = 0; i < wchk.length; i++) {
    wchk[i].addEventListener("click", function(){
        if (wchk[i].getAttribute("class").includes("checked")) {
            check_or_no(i, true);
        }
        else {
            check_or_no(i, false);
        }
        get_flag();
        console.log("flag : " + flag)
    })
}
function get_flag() {
    for (let i = 1; i < wchk.length; i++) {
        if (wchk[i].getAttribute("class").includes("checked")) {
            flag[i - 1] = 1;
        }
        else {flag[i - 1] = 0};
    }
    let result_flag = 0;
    flag.forEach(e => {result_flag += e})
    return result_flag;
}

function check_or_no (i, b) {
    if (b) {
        document.getElementsByClassName("check_leg")[i].style.background = "none";
            wchk[i].setAttribute("class", "weekly_check");
            document.getElementsByClassName("check_leg")[0].style.background = "none";
            wchk[0].setAttribute("class", "weekly_check");
    }
    else {
        document.getElementsByClassName("check_leg")[i].style.background = "red";
            wchk[i].setAttribute("class", "weekly_check checked");
            if (get_flag() == 6) {
                document.getElementsByClassName("check_leg")[0].style.background = "red";
                wchk[0].setAttribute("class", "weekly_check checked");
            }
    }
}