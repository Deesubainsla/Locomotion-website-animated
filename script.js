const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

let headingsec = document.querySelectorAll(".headingsec");
var xscale;
var yscale;
var prex = 0;
var prey = 0;
var timeout;

 
    function iconchange(){
        document.querySelectorAll(".cngicon").forEach((item)=>{
            item.addEventListener("mouseover",()=>{
                item.querySelector("i").className = "ri-arrow-right-line";
            })

            item.addEventListener("mouseleave",()=>{
                item.querySelector("i").className = "ri-arrow-right-up-line";
            })
        })
    }

    iconchange();

    // function downArrowAnimation(){
    //     document.querySelectorAll(".dwnarw").forEach((elem)=>{

    //         elem.addEventListener("mouseover",()=>{

    //             gsap.timeline().to(elem,{
    //                 height : 100,
    //                 width : 50,
    //                 ease : Expo.easeInOut
    //             })
    //         })
    //     })
    // }
    // downArrowAnimation();

    function firstPageAnm(){
        var t1 = gsap.timeline();

        t1.from(".nav",{
            y : '10',
            opacity : 0,
            duration : 2,
            ease : Expo.easeInOut
            
        })
        .to(".boundingelem",{
            y : '0',
            duration : 2,
            delay : -2,
            ease : Expo.easeInOut,
            stagger : .2
        })
        .to(".boundingelem2",{
            y : '0',
            duration : 2,
            delay : -1.5,
            ease : Expo.easeInOut,
            stagger : .2
        })
        .from("#homenav",{
            y : '-10',
            opacity : 0,
            duration : 2,
            delay : -1.5,
            ease : Expo.easeInOut
        })
       
    }

    firstPageAnm();

    document.querySelectorAll("a").forEach((elem)=>{

        elem.addEventListener("mouseover",()=>{
            elem.style.textDecoration = "underline";
            elem.style.opacity = ".8";
            console.log(elem.style.fontWeight);
        })

        elem.addEventListener("mouseleave",()=>{
            elem.style.textDecoration = "none";
            elem.style.opacity = "1";
           
        })
    })

    document.addEventListener("mouseleave",()=>{
        document.querySelector("#minicircle").style.opacity = "0";
    });

    window.addEventListener("mousemove",function(dtls){
        document.querySelector("#minicircle").style.opacity = "1";
        clearTimeout(timeout);

            // console.log(dtls.screenX, dtls.screenY);
            xscale = gsap.utils.clamp(0.8 ,1.2 , Math.abs(prex - dtls.clientX));
            yscale = gsap.utils.clamp(0.8 ,1.2 , Math.abs(prey - dtls.clientY));
        //    console.log(xscale, yscale);
            
           
            prex = dtls.clientX;
            prey = dtls.clientY;

            circleMouseFollower(xscale, yscale);

            timeout = setTimeout(() => {
                
                document.querySelector("#minicircle").style.transform = `translate(${dtls.clientX-5}px, ${dtls.clientY-5}px) scale(1,1)`;
            }, 1);
        
        });


       
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",(dtl)=>{
        document.querySelector("#minicircle").style.transform = `translate(${dtl.clientX}px, ${dtl.clientY}px)
         scale(${xscale},${yscale})`;
    })
}

headingsec.forEach( function(elem) {
    var prerotate = 0;
    var diffrot = 0;
    let minicircle = document.querySelector("#minicircle");

    elem.addEventListener("mouseleave",(dtls)=>{
        gsap.to(elem.querySelector("img"),{
            opacity : 0,
            ease : "power2",
            top : 0,
            left : 0,
            
           });

           elem.querySelectorAll(".secfade").forEach((item)=> {
            item.style.opacity = ".6"
        });
        // elem.querySelector("h1").style.translate = "0px 0px";

        gsap.to(minicircle,{
            opacity : 1,
            height : 10,
            width : 10
        })
    });

   

    elem.addEventListener("mousemove",(dtls)=>{

        gsap.to(minicircle,{
            opacity : .6,
            height : 50,
            width : 50
        })

       
       
        // function slide(){
        //     elem.querySelector("h1").style.translate = "50px 0px";
        // }

        // elem.querySelector("h1").style.translate = "50px 0px";
        

        elem.querySelectorAll(".secfade").forEach((item)=> {
            item.style.opacity = ".3";
        });

        
        

        diffrot = dtls.clientX - prerotate;
        prerotate = dtls.clientX;

        let img = elem.querySelector("img");
        var imgxctr = (img.getBoundingClientRect().width)/2 ;
        var imgyctr = (img.getBoundingClientRect().height)/2 ;

       var diff = dtls.clientY - elem.getBoundingClientRect().top;
       var left = dtls.clientX - elem.getBoundingClientRect().left;

       gsap.to(img,{
        opacity : 1,
        ease : "power1", 
        top : diff - imgyctr,
        left : left - imgxctr,
        rotate : gsap.utils.clamp(-20,20, diffrot)
       });
    })

    
})

// circleMouseFollower();

