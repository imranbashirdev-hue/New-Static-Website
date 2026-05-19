const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    let update = () => {
        let target = +counter.getAttribute('data-count');
        let count = +counter.innerText;
        let speed = target / 100;

        if(count < target){
            counter.innerText = Math.ceil(count + speed);
            setTimeout(update, 30);
        } else {
            counter.innerText = target;
        }
    }
    update();
});