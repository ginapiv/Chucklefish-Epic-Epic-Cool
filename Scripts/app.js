// First group of parallax
let ob_group = [
    document.getElementById('ob1'), 
    document.getElementById('ob2'), 
    document.getElementById('ob3'), 
    document.getElementById('ob4'),
    // document.getElementById('chuckle-textwrgawr'),
    
];

//second group of parallax
let starbound_group = [
    document.getElementById('t1'), 
    document.getElementById('t2'), 
    document.getElementById('cloud-1'),
    document.getElementById('cloud-2'),
];

//third group of parallax
let stardew_group = [
    document.getElementById('s1'), 
    document.getElementById('s2'), 
    document.getElementById('scloud-1'),
    document.getElementById('scloud-2'),
];

let bubble_group = [
    document.getElementById('bubble-1'),
    document.getElementById('bubble-2'),
    document.getElementById('bubble-3'),
    document.getElementById('bubble-4'),
    document.getElementById('bubble-5'),
    document.getElementById('bubble-6'),
]

let eastward_group = [
    document.getElementById('e1'), 
    document.getElementById('e2'), 
    document.getElementById('ecloud-1'),
    document.getElementById('ecloud-2'),
];

// after-parallax adjusting
let btn = document.getElementById('btn');
let button2 = document.getElementById('second-button');

// Height finding for readjusted parallax parts
let divser = document.getElementById('first-div');
let distance_to_second_parallax = window.innerHeight + divser.offsetHeight;
let divser_2 = document.getElementById('div-2');
let distance_to_third_parallax = distance_to_second_parallax + window.innerHeight;
let distance_to_fourth_parallax = distance_to_third_parallax + window.innerHeight;

//[-.25,-.5,-.75],[-.75, -.5,-.25],[-.75, .15,-.25]
// This will later be used to adjust the different parallax groupings
let parallax_options = [[-1.5, -.75, -.5,-.25],[0,0,2,-2],[0,0,0,0],[-2,-.4,-4,-5,-.7,-.8],[0,0,0,2,-2]];
let parallax_defenitions = ["main_chucklefish", "starbound_L/R", "standard_NO_MOVEMENT","bubble_scaling","eastward_L/R"];

// on scroll
window.addEventListener('scroll', function() {
    let value = window.scrollY; //px scrolled down
    let cur_section = "pooppoop";
    if(value>distance_to_fourth_parallax) {
        cur_section = "outside_bounds";
    } else if(value>distance_to_third_parallax) {
        cur_section = "eastward";
    } else if(value>distance_to_second_parallax) {
        cur_section = "stardew";
    } else if(value>Window.height) {
        cur_section = "starbound";
    } else {
        cur_section = "chuckle";
    }
    console.log(cur_section);

    //this is a statement to make sure the parallax is not moving infinitely which could bog down the website
    if(value < distance_to_second_parallax) {//main
        //Main screen parallax values
        parallax(ob_group, value, 0);
        parallax(bubble_group, value, 3);
        btn.style.marginTop = value * 1.5 + 'px';
        button2.style.marginTop = value * 1.5 + 'px';
    } else if(value > distance_to_fourth_parallax) { //eastward
        // Eastward parallax values
        parallax(eastward_group, (value - distance_to_fourth_parallax), 0);
        // parallax_dia(eastward_group, (value - distance_to_forth_parallax), 2, 1);//only l/r
        eastward_group[2].style.left = (value - distance_to_fourth_parallax) * -2 + 'px'; 
        eastward_group[3].style.left = (value - distance_to_fourth_parallax) * 2 + 'px'; 
    } else if(value > distance_to_third_parallax) { //stardew
        // Stardew parallax values
        parallax(stardew_group, (value - distance_to_third_parallax), 0);
        parallax_dia(stardew_group, (value - distance_to_third_parallax), 2, 1);//only l/r
    } else if(value > distance_to_second_parallax ) { //starbound
        // Starbound parallax values
        parallax(starbound_group, (value - distance_to_second_parallax), 0);
        parallax_dia(starbound_group, (value - distance_to_second_parallax), 2, 1);//only l/r
    }

    if (cur_section != "chuckle") {
        reset_parallax(ob_group);
    }
    if (cur_section != "eastward") {
        reset_parallax(eastward_group);
    }
    if (cur_section != "stardew") {
        reset_parallax(stardew_group);
    }
    if (cur_section != "starbound") {
        reset_parallax(starbound_group);
    }
    if (value>distance_to_third_parallax && value<distance_to_fourth_parallax) {
        parallax(eastbound_group, value, 2);
    }

    
    //readjusting regular text and such
    
}) // onScroll

window.addEventListener('resize', function(){
    distance_to_second_parallax = window.innerHeight + divser.offsetHeight;
    distance_to_third_parallax = distance_to_second_parallax + window.innerHeight;
    distance_to_fourth_parallax = distance_to_third_parallax + window.innerHeight;
}) //onResize

/**
* Positive number > 1 == goes down instead of up
* negative/positive < 1 == slower
* the further the number is away from 0, the faster it moves
*/
function parallax(group, value, index) {
    for(i = 0; i<group.length; i++) {
        group[i].style.top = value * parallax_options[index][i] + 'px';
    }
}//parallax

function parallax_dia(group, value, index, left_index) {
    for(i = 0; i<group.length; i++) {
        if(parallax_options[left_index][i] != 0){
            group[i].style.top = value * parallax_options[index][i] + 'px';
            group[i].style.left = value * parallax_options[left_index][i] + 'px';    
        }//if    
    }
}//parallax_dia

function parallax_grow(group, value, index) {
    for(i = 0; i<group.length; i++) {
        if(parallax_options[index][i] != 0){
            group[i].style.height = value * parallax_options[index][i] + 'px';
            group[i].style.width = value * parallax_options[index][i] + 'px'; 
        }//if
    }//for
}//parallax_grow

function reset_parallax(group) {
    for(i = 0; i<group.length; i++) {
        group[i].style.top = 0+ 'px';
    }
}//parallax