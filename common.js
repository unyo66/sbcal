let acat_flag = 1;
let acat = document.getElementsByClassName("acat")[0];
let wrapper = document.getElementsByClassName("flex_wrapper");

function acat_change() {
    if (acat_flag == 1) {
        acat.innerText = "어센틱";
        wrapper[1].style.display = "flex";
        wrapper[0].style.display = "none";
    }
    else if (acat_flag == -1) {
        acat.innerText = "아케인";
        wrapper[0].style.display = "flex";
        wrapper[1].style.display = "none";
    }
    acat_flag *= -1;
}

let date = new Date();
var year = date.getFullYear()
var month = ('0' + (date.getMonth() + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);
let today = year + month + day;


//let a_init_path = "MjAyMzA5MDUsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDE=";
let a_init_path = "MDAwMDAwMDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDE=";
//20230914,18,44,16,265,17,81,17,101,16,200,17,96,6,458,16,0,18,65,16,88,15,168,12,0,1,1,1,1,1,1,1,1,1,1,1,1
//20230915,0 ,0 ,0 ,0  ,0 ,0 ,0 ,0  ,0 ,0  ,0 ,0 ,0,0  ,0 ,0,0 ,0 ,0 ,0 ,0 ,0  ,0 ,0,1,1,1,1,1,1,1,1,1,1,1,1
let init_path = atob(a_init_path);

/////////////////////// url 받아오기 ///////////////////////
let path = window.location.href.split("?path=")[1];
let a_path;
if (window.location.href.split("?")[1] == null) {
    path = a_init_path;
}
try {
    a_path = atob(path);
} catch (error) {
    init_page();
}

/////////////////////// path 검증 ///////////////////////
let url_value = a_path.split(",");
if (url_value.length != 37) {
    init_page();
}

/////////////////////// path로 변수 채우기 ///////////////////////
let url_date = url_value[0];
let m_ac_sb = new Array(6);
let m_at_sb = new Array(6);
let ac_weekly = new Array(6);
let at_weekly = new Array(6);
for (let i = 0; i < 6; i++) {
    m_ac_sb[i] = new Array(2);
    m_ac_sb[i][0] = url_value[i * 2 + 1];
    m_ac_sb[i][1] = url_value[i * 2 + 2];
    
    m_at_sb[i] = new Array(2);
    m_at_sb[i][0] = url_value[i * 2 + 13];
    m_at_sb[i][1] = url_value[i * 2 + 14];

    ac_weekly[i] = +url_value[i + 25];
    at_weekly[i] = +url_value[i + 31];
}
/////////////////////// 날짜 세팅 ///////////////////////
let save_date = document.getElementsByClassName("save_date")[0];
if (url_date > today) {init_page()};
if (url_date == "00000000") {
    save_date.innerText = "초기화면";
}
else {
    save_date.innerText = "마지막 저장날짜 " + url_date;
    let uy, um, ud, ty, tu, td, days;
    if (url_date < today) {
        uy = url_date.substring(0, 4);
        um = url_date.substring(4, 6);
        ud = url_date.slice(-2);
        let u_date = new Date(uy+"-"+um+"-"+ud);    
        
        let diff = Math.abs(date.getTime() - u_date.getTime());
        diff = Math.floor(diff / (1000 * 60 * 60 * 24));
    
        if (confirm("마지막 저장으로부터 하루 이상 지났습니다. 직접 하실래요?")) {

        }
        else {
            for (let i = 0; i < diff; i++) {
                alert("?" + (diff - i));
            }
        }
    }
}

/////////////////////// path로 input 채우기  ///////////////////////
let input_lv = document.getElementsByClassName("input_lv");
let input_exp = document.getElementsByClassName("input_exp");
for (let i = 0; i < m_ac_sb.length; i++) {
    input_lv[i].value = m_ac_sb[i][0];
    input_exp[i].value = m_ac_sb[i][1];
    print_data_ac(i);
}
for (let i = 0; i < m_at_sb.length; i++) {
    input_lv[i + m_ac_sb.length].value = m_at_sb[i][0];
    input_exp[i + m_ac_sb.length].value = m_at_sb[i][1];
    print_data_at(i);
}

/////////////////////// 화면 출력 ///////////////////////
function print_data_ac(i) {
    let lv = +input_lv[i].value;
    let exp = +input_exp[i].value;
    let sum = 0;


    //lv이 0인 경우 exp 0세팅, lv당 exp 한계 설정
    if (lv == 0) {
        input_exp[i].value = 0;
        exp = 0;
    }

    //sum 구하기
    for (let j = 0; j < lv - 1; j++) {
        if (lv <= 20) {
            sum += exp_ac[j];
        }
        else {
            sum = 9999;
        }
    }
    sum += exp;

    //input 검증
    //레벨 검증 (20까지)
    if (lv == 20) {
        exp = 0;
        sum = 2675;
        cover_output(i, true, "만렙");
    }
    else if (lv > 20) {
        cover_output(i, true, "레벨 초과");
        input_exp[i].value = 0;
        exp = 0;
        sum = 0;
    }
    else if (lv == 0) {
        cover_output(i, true, "심볼 없음");
        input_exp[i].value = 0;
        exp = 0;
        sum = 0;
    }
    else if (exp >= exp_ac[lv - 1]) {
        cover_output(i, true, "경험치 초과");
        exp = 0;
        sum = 0;
    }
    else {
        cover_output(i, false);
    }

    //그래프
    let gp_txt_mine = document.getElementsByClassName("gp_txt_mine");
    let gp_mine;
    gp_txt_mine[i].innerHTML = "<b>mine</b><br>" + sum;
    gp_mine = document.getElementsByClassName("gp_mine");
    gp_mine[i].style = "height:" + (sum / ac_total * 90) + "%";
    
    //disc란
    let disc_txt = document.querySelectorAll(".ac" + (i + 1) + " .disc_txt");
    //필요 심볼
    disc_txt[0].innerText = ac_total - sum + "개";
    //필요 메소
    let meso = 0;
    for (let j = 18; j > (lv > 0 ? (lv - 2) : -1); j--) {
        if (lv < 20) {
            meso += meso_ac[i][j];
        }
    }
    disc_txt[1].innerText = meso.toLocaleString('ko-KR') + "메소" + "\n(" + (meso / 100000000 + "억") + ")";

    let need = ac_total - sum;
    //일퀘만
    disc_txt[2].innerText = Math.ceil(need / 20) + "일";
    //주간퀘도
    disc_txt[3].innerText = Math.ceil(need / 185 * 7) + "일";
}

function print_data_at(i) {
    i += 6;
    let lv = +input_lv[i].value;
    let exp = +input_exp[i].value;
    let sum = 0;


    //lv이 0인 경우 exp 0세팅, lv당 exp 한계 설정
    if (lv == 0) {
        input_exp[i].value = 0;
        exp = 0;
    }

    //sum 구하기
    for (let j = 0; j < lv - 1; j++) {
        if (lv <= 11) {
            sum += exp_at[j];
        }
        else {
            sum = 9999;
        }
    }
    sum += exp;
    //input 검증
    //레벨 검증 (11까지)
    if (lv == 11) {
        exp = 0;
        sum = 4565;
        cover_output(i, true, "만렙");
    }
    else if (lv > 11) {
        cover_output(i, true, "레벨 초과");
        input_exp[i].value = 0;
        exp = 0;
        sum = 0;
    }
    else if (lv == 0) {
        cover_output(i, true, "심볼 없음");
        input_exp[i].value = 0;
        exp = 0;
        sum = 0;
    }
    else if (exp >= exp_at[lv - 1]) {
        cover_output(i, true, "경험치 초과");
        exp = 0;
        sum = 0;
    }
    else {
        cover_output(i, false);
    }

    //그래프
    let gp_txt_mine = document.getElementsByClassName("gp_txt_mine");
    let gp_mine;
    gp_txt_mine[i].innerHTML = "<b>mine</b><br>" + sum;
    gp_mine = document.getElementsByClassName("gp_mine");
    gp_mine[i].style = "height:" + (sum / at_total * 90) + "%";
    
    //disc란
    let disc_txt = document.querySelectorAll(".at" + (i - 5) + " .disc_txt");
    //필요 심볼
    disc_txt[0].innerText = at_total - sum + "개";
    //필요 메소
    let meso = 0;
    for (let j = 9; j > (lv > 0 ? (lv - 2) : -1); j--) {
        if (lv < 20) {
            meso += meso_at[i - 6][j];
        }
    }
    disc_txt[1].innerText = meso.toLocaleString('ko-KR') + "메소" + "\n(" + (meso / 100000000 + "억") + ")";

    let need = at_total - sum;
    //일퀘만
    if (i = 6) {
        disc_txt[2].innerText = Math.ceil(need / 20) + "일";
    }
    else {
        disc_txt[2].innerText = Math.ceil(need / 10) + "일";
    }
    //주간퀘도
    // disc_txt[3].innerText = Math.ceil(need / 185 * 7) + "일";
    disc_txt[3].innerText = "";
    
    if (i == 11) {
        console.log(now_page() + "\n" + a_path);
    }
}

//오류 cover
function cover_output(i, onoff, msg) {
    if (onoff) {
        document.getElementsByClassName("output_cover")[i].style.display = "flex";
        document.getElementsByClassName("output_cover")[i].innerText = msg;
    }
    else {
        document.getElementsByClassName("output_cover")[i].style.display = "none";
    }
}

function init_page() {
    alert("url이 바르지 않습니다. 초기값으로 이동합니다.");
    window.location.href = window.location.href.split("?")[0] + "?path=" + a_init_path;
}

function now_page() {
    let new_url = today;
    for (let i = 0; i < 12; i++) {
        new_url += "," + input_lv[i].value + "," + input_exp[i].value;
    }

    for (let i = 0; i < 12; i++) {
        new_url += "," +  1;
    }
    return new_url;
}

function save_page() {
    let new_url = now_page();

    // weekly 삭제
    // for (let i = 0; i < 6; i++) {
    //     new_url += "," +  flag[i];
    // }

    window.location.href = window.location.href.split("?")[0] + "?path=" + btoa(new_url);
}