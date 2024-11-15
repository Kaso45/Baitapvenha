window.onscroll = function() {scroll()};

function scroll() {
    const barTop = document.getElementById("navbar");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        barTop.style.top = "0";
    } else {
        barTop.style.top = "0";
    }
}
