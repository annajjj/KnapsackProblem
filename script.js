
incrementationButtons = [];
const radioButtons = document.menuForm.algorithm;
document.getElementById("coord").disabled = true;
document.getElementById("halfBrutal").disabled = true;
document.getElementById("naive").disabled = true;

//read from file
document.getElementById("filetoRead").addEventListener("change",function(){
        var file = this.files[0];
        const containerElement = document.getElementById("container");
        console.log(containerElement.childNodes)
        if(containerElement.childNodes[6]) containerElement.removeChild(containerElement.childNodes[6]);
        if(containerElement.childNodes[5]) containerElement.removeChild(containerElement.childNodes[5]);

        if (file) {
            var reader = new FileReader();
            
            reader.onload = function (evt) {
                document.getElementById("coord").disabled = false;
                document.getElementById("halfBrutal").disabled = false;
                document.getElementById("naive").disabled = false;

                const result = JSON.parse(evt.target.result);
                document.getElementById("coord").checked = true;
                const dateToDisplay = formatDate(result.coord.date);
                createNode("div", "container", null, "raport-text" , `raport from ${dateToDisplay}, number of containers to place: ${result.coord.count}`);
                generateDom(result.coord.result)      

                // listening on onclick event when changing radio button
                let previous = null;
                radioButtons.forEach((el) => el.addEventListener("click", (event) => {
                    if (el !== previous) previous = el;
                    const containerElement = document.getElementById("container");
                    if(containerElement.childNodes[6]) containerElement.removeChild(containerElement.childNodes[6]);
                    generateDom(result[`${el.value}`].result)         
                }))

            };

            reader.onerror = function (evt) {
                console.error("An error ocurred reading the file",evt);
            };

            reader.readAsText(file, "UTF-8");
        }
    },false);


function generateDom(result){
    createNode("div", "container", "raport-wrapper", null , null);
    //loop for all deliveries
    for (let incrementation = 0; incrementation < result.length; incrementation++) {
        //incrementation node
        createNode("div", "raport-wrapper", `incrementation-wrapper${incrementation}`, "incrementation-wrapper" , null);

        createNode("div", `incrementation-wrapper${incrementation}`, `incrementation-container${incrementation}`, "incrementation-container", null)
        createNode("div", `incrementation-container${incrementation}`, null, `incrementation`, `${incrementation+1} delivery`);
        createNode("button", `incrementation-container${incrementation}`, `incrementation-button${incrementation}`, null, null);
        createNode("div", `incrementation-wrapper${incrementation}`, `ship-label${incrementation}`, "ship-label", null);
        createNode("div", `incrementation-wrapper${incrementation}`, `container-column-wrapper${incrementation}`, 'container-column-wrapper' , null);


        const incrementationButton = document.getElementById(`incrementation-button${incrementation}`);
        incrementationButtons.push({button: incrementationButton, show: true});

        incrementationButton.addEventListener("click", (event) => {
            const container = document.getElementById(`container-column-wrapper${incrementation}`);
            const button = document.getElementById(`incrementation-button${incrementation}`);

            incrementationButtons[incrementation].show = !incrementationButtons[incrementation].show;
            if(incrementationButtons[incrementation].show == true) container.classList.remove("hide-container");
            else container.classList.add("hide-container");
            button.classList.toggle("arrow-toggle");

        })


        //firstly create sectins for floors - max(floor of all ships)
        const largestFloorNumber = Math.max(...result[incrementation].map(el => el = el.containers.length));

        for (let floor = 0; floor < largestFloorNumber; floor++) {
            //container columns node
            createNode("div", `container-column-wrapper${incrementation}`, `container-columns${incrementation}-${floor}`, "container-columns", null);
            //floor-text-container node
            createNode("div", `container-columns${incrementation}-${floor}`, `floor-text-container${incrementation}-${floor}`, "floor-text-container", null);
            //floor-text node
            createNode("div", `floor-text-container${incrementation}-${floor}`, null, "floor-text", `floor${floor}`);

            for (let i = 0; i < 3; i++) createNode("div", `container-columns${incrementation}-${floor}`, `ship${incrementation}-${i + 1}-${floor}`, null, null);

        }
        //ships with canvases 
        for (let ship = 0; ship < 3; ship++) {
            createNode("div", `ship-label${incrementation}`, `ship-label-container${incrementation}-${ship}`, "ship-label-container", null);
            createNode("div", `ship-label-container${incrementation}-${ship}`, null, "ship-name", `${result[incrementation][ship].id} - free space ${(result[incrementation][ship].freeSpace * 100).toFixed(2)}%`, result[incrementation][ship].send);

            for (let floor = 0; floor < result[incrementation][ship].containers.length; floor++) {
                //prepare canvas
                const floorOfShip = (p) => {
                    p.setup = () => setCanvas(p, result[incrementation][ship]);
                    p.draw = () => drawCanvas(p, result[incrementation][ship], floor);
                };
                const shipObj = new p5(floorOfShip, window.document.getElementById(`ship${incrementation}-${ship + 1}-${floor}`));
            }
        }

    }

};


//general method to create node and append it in intended place
function createNode(tag, parent, id, className, text, send = null) {
    const node = document.createElement(tag);
    if (id) node.id = id;
    if (className) node.className = className;
    if (text) {
        const textNode = document.createTextNode(text);
        node.appendChild(textNode);
    }
    if (send) node.classList.add("ship-send");
    document.getElementById(parent).appendChild(node);
}

function formatDate(date){
    const dateFormatted = date.split(/[-T:]+/);
    return `${dateFormatted[2]}.${dateFormatted[1]}.${dateFormatted[0]}  ${dateFormatted[3]}:${dateFormatted[4]}`;
}

//how much canvas should be scaled
const scale = 5;

//set canvas
function setCanvas(p, ship) {
    p.createCanvas(ship.length * scale + 1, ship.width * scale + 1);
    p.textAlign(p.CENTER, p.CENTER);
}

//draw canvas - fill with containers
function drawCanvas(p, ship, floor) {
    p.fill(180);
    p.noStroke();
    p.rect(0, 0, ship.length * scale + 1, ship.width * scale + 1);
    const containers = ship.containers[floor];
    for (var i = 0; i < containers.length; i++) {
        p.stroke(0, 0, 0);
        p.fill(124, 245, 35);
        p.rect(containers[i].pivot.x * scale, containers[i].pivot.y * scale, containers[i].element.length * scale, containers[i].element.width * scale)
        p.textSize(containers[i].element.length > containers[i].element.width ? containers[i].element.width * scale / 2 : containers[i].element.length * scale / 2);
        p.fill(0);
        p.noStroke();
        p.text(containers[i].element.id, (containers[i].pivot.x + containers[i].element.length / 2) * scale, (containers[i].pivot.y + containers[i].element.width / 2) * scale);
    }
}
