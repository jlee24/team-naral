var elements = document.getElementsByTagName('*');

var treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ALL);
var names = ["birthchoiceclinic", "treeoflifepsc", "wehelpyou", "californiaprolife.org", "lifecall.org", "pregnancyresourcecenter.com", "avenuespc.org", "highdesertpregnancyclinic.org"];

// runs through all Nodes in DOM to find cpc url
while  (treeWalker.nextNode()) {
    var node = treeWalker.currentNode;
    var text = node.textContent;
    var parent = node.parentElement;

    for (var cpc = 0; cpc < names.length; cpc++) {

        // identifies cpc link
         if ((text.search(names[cpc]))>=0 && parent.tagName === "CITE") {
             console.log(parent.tagName);

             // injects icon next to search result
             showIcon(parent);

            // event listeners control when tooltip is shown
            parent.addEventListener("mouseenter", showTip);
            parent.addEventListener("mouseleave", hideTip);

         }
    }
}


// places icon & adds click-through link
function showIcon(parent){
    console.log("showing icon");
    var icon = document.createElement("img");
    icon.src = chrome.runtime.getURL("alert.png");
    icon.style.width = "20px";
    icon.style.height = "20px";
    parent.appendChild(icon);
    icon.className = "icon";
    icon.href = "https://prochoice.org/think-youre-pregnant/find-a-provider/.";
    icon.onclick = function() {
        window.location.href = 'https://prochoice.org/think-youre-pregnant/find-a-provider/.';
    };
}

// shows tool tip on mouse-enter, injects and formats text in tooltip
function showTip() {
    console.log("showing tooltip");

    var tip = document.createElement("div");
    tip.className = "tooltip";
    tip.id = "tip";

    var warning = document.createElement("div");
    warning.className = "warning";
    var alert = document.createTextNode("WARNING!");
    warning.appendChild(alert);
    tip.appendChild(warning);

    var info = document.createElement("span");
    info.className = "info";
    var text = document.createTextNode("This is not a real abortion clinic, this is a Crisis Pregnancy Center. It is a fake health-care clinic that lies to, shames and intentionally misleads women about their reproductive-health-care options to block them from accessing abortion care.");
    info.appendChild(text);
    tip.appendChild(info);

    // adds click-through link in tooltip text
    var redirect = document.createElement("span");
    redirect.className = "redirect";
    var link = document.createTextNode(" Find a real clinic ");
    var here = document.createElement("span");
    var hereBold = document.createTextNode("here.");
    here.appendChild(hereBold);
    here.className = "here";
    redirect.appendChild(link);
    redirect.appendChild(here);
    tip.appendChild(redirect);
    redirect.onclick = function() {
            window.location.href = 'https://prochoice.org/think-youre-pregnant/find-a-provider/';
    };

    this.appendChild(tip);
};

// hides tooltip on mouseleave
function hideTip(){
    var tip = document.getElementById("tip");
    tip.remove();
};
