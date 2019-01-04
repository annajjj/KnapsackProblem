incrementationButtons = [];

window.addEventListener("load", (event) => {

    // console.log(result.length)

    //loop for all deliveries

    for (let incrementation = 0; incrementation < result.length; incrementation++) {
        //incrementation node
        createNode("div", "container", `incrementation-wrapper${incrementation}`, "incrementation-wrapper" , null);

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

console.log(incrementationButtons)

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

});

// listening on onclick event when changing radio button
const radioButtons = document.menuForm.algorithm;
let previous = null;

radioButtons.forEach((el) => el.addEventListener("click", (event) => {
    if (el !== previous) previous = el;
    console.log(el.value)
}))


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

const result = [
    [
        {
            "id": "s1",
            "width": 70,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c4",
                            "width": 34,
                            "height": 30,
                            "length": 28,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c8",
                            "width": 24,
                            "height": 23,
                            "length": 39,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c6",
                            "width": 30,
                            "height": 33,
                            "length": 15,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 28,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c13",
                            "width": 8,
                            "height": 17,
                            "length": 34,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 58
                        }
                    },
                    {
                        "element": {
                            "id": "c0",
                            "width": 30,
                            "height": 31,
                            "length": 7,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 43,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c17",
                            "width": 1,
                            "height": 11,
                            "length": 6,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 39,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c22",
                            "width": 16,
                            "height": 17,
                            "length": 10,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 39,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c32",
                            "width": 4,
                            "height": 26,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 66
                        }
                    },
                    {
                        "element": {
                            "id": "c31",
                            "width": 1,
                            "height": 8,
                            "length": 4,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 28,
                            "y": 30
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c3",
                            "width": 33,
                            "height": 37,
                            "length": 27,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c18",
                            "width": 30,
                            "height": 13,
                            "length": 28,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 33
                        }
                    },
                    {
                        "element": {
                            "id": "c1",
                            "width": 24,
                            "height": 15,
                            "length": 16,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 27,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c39",
                            "width": 25,
                            "height": 23,
                            "length": 12,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 28,
                            "y": 33
                        }
                    },
                    {
                        "element": {
                            "id": "c27",
                            "width": 4,
                            "height": 39,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 63
                        }
                    },
                    {
                        "element": {
                            "id": "c28",
                            "width": 2,
                            "height": 1,
                            "length": 34,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 67
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c5",
                            "width": 20,
                            "height": 3,
                            "length": 40,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c10",
                            "width": 25,
                            "height": 28,
                            "length": 24,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 20
                        }
                    },
                    {
                        "element": {
                            "id": "c36",
                            "width": 23,
                            "height": 4,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 45
                        }
                    },
                    {
                        "element": {
                            "id": "c37",
                            "width": 14,
                            "height": 1,
                            "length": 11,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 24,
                            "y": 20
                        }
                    },
                    {
                        "element": {
                            "id": "c30",
                            "width": 2,
                            "height": 13,
                            "length": 29,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 68
                        }
                    }
                ]
            ],
            "freeSpace": 0.2100952380952381,
            "send": false
        },
        {
            "id": "s2",
            "width": 60,
            "length": 70,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c4",
                            "width": 34,
                            "height": 30,
                            "length": 28,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c8",
                            "width": 24,
                            "height": 23,
                            "length": 39,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c3",
                            "width": 27,
                            "height": 37,
                            "length": 33,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 28,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c10",
                            "width": 24,
                            "height": 28,
                            "length": 25,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 39,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c0",
                            "width": 7,
                            "height": 31,
                            "length": 30,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 28,
                            "y": 27
                        }
                    },
                    {
                        "element": {
                            "id": "c17",
                            "width": 1,
                            "height": 11,
                            "length": 6,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 58
                        }
                    },
                    {
                        "element": {
                            "id": "c33",
                            "width": 27,
                            "height": 38,
                            "length": 8,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 61,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c31",
                            "width": 1,
                            "height": 8,
                            "length": 4,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 64,
                            "y": 34
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c18",
                            "width": 30,
                            "height": 13,
                            "length": 28,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c5",
                            "width": 20,
                            "height": 3,
                            "length": 40,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 30
                        }
                    },
                    {
                        "element": {
                            "id": "c6",
                            "width": 30,
                            "height": 33,
                            "length": 15,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 28,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c1",
                            "width": 24,
                            "height": 15,
                            "length": 16,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 43,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c13",
                            "width": 8,
                            "height": 17,
                            "length": 34,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 50
                        }
                    },
                    {
                        "element": {
                            "id": "c39",
                            "width": 12,
                            "height": 23,
                            "length": 25,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 40,
                            "y": 30
                        }
                    },
                    {
                        "element": {
                            "id": "c22",
                            "width": 16,
                            "height": 17,
                            "length": 10,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 59,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c28",
                            "width": 2,
                            "height": 1,
                            "length": 34,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 58
                        }
                    },
                    {
                        "element": {
                            "id": "c30",
                            "width": 2,
                            "height": 13,
                            "length": 29,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 34,
                            "y": 50
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c21",
                            "width": 37,
                            "height": 28,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c36",
                            "width": 23,
                            "height": 4,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 37
                        }
                    },
                    {
                        "element": {
                            "id": "c29",
                            "width": 34,
                            "height": 15,
                            "length": 21,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 39,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c37",
                            "width": 14,
                            "height": 1,
                            "length": 11,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 39,
                            "y": 37
                        }
                    }
                ]
            ],
            "freeSpace": 0.17817460317460318,
            "send": true
        },
        {
            "id": "s3",
            "width": 90,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c4",
                            "width": 34,
                            "height": 30,
                            "length": 28,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c8",
                            "width": 24,
                            "height": 23,
                            "length": 39,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c3",
                            "width": 27,
                            "height": 37,
                            "length": 33,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 58
                        }
                    },
                    {
                        "element": {
                            "id": "c6",
                            "width": 30,
                            "height": 33,
                            "length": 15,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 28,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c1",
                            "width": 24,
                            "height": 15,
                            "length": 16,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 33,
                            "y": 58
                        }
                    },
                    {
                        "element": {
                            "id": "c0",
                            "width": 30,
                            "height": 31,
                            "length": 7,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 43,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c17",
                            "width": 1,
                            "height": 11,
                            "length": 6,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 39,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c22",
                            "width": 16,
                            "height": 17,
                            "length": 10,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 39,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c32",
                            "width": 4,
                            "height": 26,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 85
                        }
                    },
                    {
                        "element": {
                            "id": "c31",
                            "width": 1,
                            "height": 8,
                            "length": 4,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 28,
                            "y": 30
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c18",
                            "width": 30,
                            "height": 13,
                            "length": 28,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c5",
                            "width": 40,
                            "height": 3,
                            "length": 20,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 30
                        }
                    },
                    {
                        "element": {
                            "id": "c10",
                            "width": 24,
                            "height": 28,
                            "length": 25,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 20,
                            "y": 30
                        }
                    },
                    {
                        "element": {
                            "id": "c13",
                            "width": 8,
                            "height": 17,
                            "length": 34,
                            "timestamp": 0
                        },
                        "pivot": {
                            "x": 0,
                            "y": 70
                        }
                    },
                    {
                        "element": {
                            "id": "c39",
                            "width": 25,
                            "height": 23,
                            "length": 12,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 28,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c33",
                            "width": 8,
                            "height": 38,
                            "length": 27,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 20,
                            "y": 54
                        }
                    },
                    {
                        "element": {
                            "id": "c27",
                            "width": 4,
                            "height": 39,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 78
                        }
                    },
                    {
                        "element": {
                            "id": "c28",
                            "width": 2,
                            "height": 1,
                            "length": 34,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 82
                        }
                    },
                    {
                        "element": {
                            "id": "c30",
                            "width": 2,
                            "height": 13,
                            "length": 29,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 20,
                            "y": 62
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c21",
                            "width": 37,
                            "height": 28,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c35",
                            "width": 40,
                            "height": 14,
                            "length": 30,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 37
                        }
                    },
                    {
                        "element": {
                            "id": "c26",
                            "width": 34,
                            "height": 14,
                            "length": 18,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 30,
                            "y": 37
                        }
                    },
                    {
                        "element": {
                            "id": "c37",
                            "width": 14,
                            "height": 1,
                            "length": 11,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 39,
                            "y": 0
                        }
                    }
                ]
            ],
            "freeSpace": 0.19496296296296298,
            "send": false
        }
    ],
    [
        {
            "id": "s1",
            "width": 70,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c35",
                            "width": 40,
                            "height": 14,
                            "length": 30,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c48",
                            "width": 29,
                            "height": 3,
                            "length": 33,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c42",
                            "width": 34,
                            "height": 33,
                            "length": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 30,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c50",
                            "width": 27,
                            "height": 33,
                            "length": 10,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 33,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c41",
                            "width": 5,
                            "height": 31,
                            "length": 15,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 30,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c53",
                            "width": 13,
                            "height": 10,
                            "length": 4,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 43,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c55",
                            "width": 10,
                            "height": 40,
                            "length": 1,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 43,
                            "y": 53
                        }
                    },
                    {
                        "element": {
                            "id": "c77",
                            "width": 7,
                            "height": 9,
                            "length": 5,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 44,
                            "y": 53
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c57",
                            "width": 32,
                            "height": 21,
                            "length": 31,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c49",
                            "width": 30,
                            "height": 16,
                            "length": 25,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 32
                        }
                    },
                    {
                        "element": {
                            "id": "c44",
                            "width": 23,
                            "height": 25,
                            "length": 22,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 25,
                            "y": 32
                        }
                    },
                    {
                        "element": {
                            "id": "c52",
                            "width": 32,
                            "height": 15,
                            "length": 10,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 31,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c45",
                            "width": 7,
                            "height": 20,
                            "length": 30,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 62
                        }
                    },
                    {
                        "element": {
                            "id": "c54",
                            "width": 24,
                            "height": 30,
                            "length": 8,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 41,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c70",
                            "width": 4,
                            "height": 7,
                            "length": 19,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 25,
                            "y": 55
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c26",
                            "width": 18,
                            "height": 14,
                            "length": 34,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c59",
                            "width": 10,
                            "height": 39,
                            "length": 36,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 18
                        }
                    },
                    {
                        "element": {
                            "id": "c58",
                            "width": 17,
                            "height": 3,
                            "length": 12,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 34,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c27",
                            "width": 4,
                            "height": 39,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 28
                        }
                    },
                    {
                        "element": {
                            "id": "c32",
                            "width": 4,
                            "height": 26,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 32
                        }
                    },
                    {
                        "element": {
                            "id": "c46",
                            "width": 4,
                            "height": 37,
                            "length": 31,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c47",
                            "width": 9,
                            "height": 35,
                            "length": 10,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 36,
                            "y": 18
                        }
                    },
                    {
                        "element": {
                            "id": "c60",
                            "width": 26,
                            "height": 38,
                            "length": 39,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c74",
                            "width": 25,
                            "height": 9,
                            "length": 9,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 39,
                            "y": 40
                        }
                    }
                ]
            ],
            "freeSpace": 0.11752380952380953,
            "send": false
        },
        {
            "id": "s2",
            "width": 60,
            "length": 70,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c35",
                            "width": 40,
                            "height": 14,
                            "length": 30,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c57",
                            "width": 31,
                            "height": 21,
                            "length": 32,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 30,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c42",
                            "width": 20,
                            "height": 33,
                            "length": 34,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c26",
                            "width": 18,
                            "height": 14,
                            "length": 34,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 34,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c45",
                            "width": 30,
                            "height": 20,
                            "length": 7,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 62,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c54",
                            "width": 8,
                            "height": 30,
                            "length": 24,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 30,
                            "y": 31
                        }
                    },
                    {
                        "element": {
                            "id": "c41",
                            "width": 5,
                            "height": 31,
                            "length": 15,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 54,
                            "y": 31
                        }
                    },
                    {
                        "element": {
                            "id": "c55",
                            "width": 10,
                            "height": 40,
                            "length": 1,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 68,
                            "y": 40
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c48",
                            "width": 33,
                            "height": 3,
                            "length": 29,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c49",
                            "width": 30,
                            "height": 16,
                            "length": 25,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 29,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c44",
                            "width": 23,
                            "height": 25,
                            "length": 22,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 33
                        }
                    },
                    {
                        "element": {
                            "id": "c59",
                            "width": 10,
                            "height": 39,
                            "length": 36,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 22,
                            "y": 33
                        }
                    },
                    {
                        "element": {
                            "id": "c52",
                            "width": 10,
                            "height": 15,
                            "length": 32,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 22,
                            "y": 43
                        }
                    },
                    {
                        "element": {
                            "id": "c50",
                            "width": 27,
                            "height": 33,
                            "length": 10,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 54,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c27",
                            "width": 4,
                            "height": 39,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 56
                        }
                    },
                    {
                        "element": {
                            "id": "c46",
                            "width": 4,
                            "height": 37,
                            "length": 31,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 39,
                            "y": 56
                        }
                    },
                    {
                        "element": {
                            "id": "c47",
                            "width": 10,
                            "height": 35,
                            "length": 9,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 58,
                            "y": 33
                        }
                    },
                    {
                        "element": {
                            "id": "c53",
                            "width": 13,
                            "height": 10,
                            "length": 4,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 64,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c77",
                            "width": 5,
                            "height": 9,
                            "length": 7,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 54,
                            "y": 43
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c58",
                            "width": 17,
                            "height": 3,
                            "length": 12,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c32",
                            "width": 39,
                            "height": 26,
                            "length": 4,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c62",
                            "width": 36,
                            "height": 7,
                            "length": 36,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 4,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c78",
                            "width": 34,
                            "height": 34,
                            "length": 28,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 40,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c73",
                            "width": 15,
                            "height": 17,
                            "length": 33,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 12,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c74",
                            "width": 9,
                            "height": 9,
                            "length": 25,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 45,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c70",
                            "width": 4,
                            "height": 7,
                            "length": 19,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 56
                        }
                    }
                ]
            ],
            "freeSpace": 0.12738095238095237,
            "send": false
        },
        {
            "id": "s3",
            "width": 90,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c35",
                            "width": 40,
                            "height": 14,
                            "length": 30,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c57",
                            "width": 31,
                            "height": 21,
                            "length": 32,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c42",
                            "width": 34,
                            "height": 33,
                            "length": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 30,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c26",
                            "width": 18,
                            "height": 14,
                            "length": 34,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 71
                        }
                    },
                    {
                        "element": {
                            "id": "c50",
                            "width": 27,
                            "height": 33,
                            "length": 10,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 32,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c58",
                            "width": 17,
                            "height": 3,
                            "length": 12,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 34,
                            "y": 71
                        }
                    },
                    {
                        "element": {
                            "id": "c54",
                            "width": 24,
                            "height": 30,
                            "length": 8,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 42,
                            "y": 40
                        }
                    },
                    {
                        "element": {
                            "id": "c41",
                            "width": 5,
                            "height": 31,
                            "length": 15,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 30,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c53",
                            "width": 4,
                            "height": 10,
                            "length": 13,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 32,
                            "y": 67
                        }
                    },
                    {
                        "element": {
                            "id": "c55",
                            "width": 10,
                            "height": 40,
                            "length": 1,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 46,
                            "y": 71
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c48",
                            "width": 33,
                            "height": 3,
                            "length": 29,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c49",
                            "width": 30,
                            "height": 16,
                            "length": 25,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 33
                        }
                    },
                    {
                        "element": {
                            "id": "c44",
                            "width": 23,
                            "height": 25,
                            "length": 22,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 63
                        }
                    },
                    {
                        "element": {
                            "id": "c52",
                            "width": 32,
                            "height": 15,
                            "length": 10,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 29,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c45",
                            "width": 30,
                            "height": 20,
                            "length": 7,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 25,
                            "y": 33
                        }
                    },
                    {
                        "element": {
                            "id": "c27",
                            "width": 4,
                            "height": 39,
                            "length": 39,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 86
                        }
                    },
                    {
                        "element": {
                            "id": "c46",
                            "width": 31,
                            "height": 37,
                            "length": 4,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 39,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c47",
                            "width": 10,
                            "height": 35,
                            "length": 9,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 22,
                            "y": 63
                        }
                    },
                    {
                        "element": {
                            "id": "c67",
                            "width": 25,
                            "height": 18,
                            "length": 18,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 32,
                            "y": 33
                        }
                    },
                    {
                        "element": {
                            "id": "c74",
                            "width": 9,
                            "height": 9,
                            "length": 25,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 22,
                            "y": 73
                        }
                    },
                    {
                        "element": {
                            "id": "c70",
                            "width": 4,
                            "height": 7,
                            "length": 19,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 31,
                            "y": 63
                        }
                    },
                    {
                        "element": {
                            "id": "c77",
                            "width": 5,
                            "height": 9,
                            "length": 7,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 43,
                            "y": 0
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c59",
                            "width": 10,
                            "height": 39,
                            "length": 36,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c32",
                            "width": 39,
                            "height": 26,
                            "length": 4,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c62",
                            "width": 36,
                            "height": 7,
                            "length": 36,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 49
                        }
                    },
                    {
                        "element": {
                            "id": "c75",
                            "width": 32,
                            "height": 28,
                            "length": 34,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 4,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c72",
                            "width": 30,
                            "height": 1,
                            "length": 12,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 36,
                            "y": 49
                        }
                    },
                    {
                        "element": {
                            "id": "c79",
                            "width": 29,
                            "height": 23,
                            "length": 11,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 38,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c76",
                            "width": 6,
                            "height": 13,
                            "length": 36,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 4,
                            "y": 42
                        }
                    }
                ]
            ],
            "freeSpace": 0.11251851851851853,
            "send": true
        }
    ],
    [
        {
            "id": "s1",
            "width": 70,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c84",
                            "width": 34,
                            "height": 33,
                            "length": 38,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c86",
                            "width": 29,
                            "height": 34,
                            "length": 39,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c81",
                            "width": 34,
                            "height": 22,
                            "length": 9,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 38,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c90",
                            "width": 27,
                            "height": 23,
                            "length": 10,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 39,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c92",
                            "width": 5,
                            "height": 15,
                            "length": 16,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 63
                        }
                    },
                    {
                        "element": {
                            "id": "c83",
                            "width": 1,
                            "height": 22,
                            "length": 13,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 68
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c60",
                            "width": 39,
                            "height": 38,
                            "length": 26,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c91",
                            "width": 31,
                            "height": 25,
                            "length": 32,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 39
                        }
                    },
                    {
                        "element": {
                            "id": "c68",
                            "width": 37,
                            "height": 36,
                            "length": 20,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 26,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c96",
                            "width": 23,
                            "height": 8,
                            "length": 14,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 32,
                            "y": 39
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c78",
                            "width": 34,
                            "height": 34,
                            "length": 28,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c99",
                            "width": 29,
                            "height": 7,
                            "length": 32,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c73",
                            "width": 33,
                            "height": 17,
                            "length": 15,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 28,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c87",
                            "width": 16,
                            "height": 33,
                            "length": 14,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 32,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c65",
                            "width": 13,
                            "height": 24,
                            "length": 15,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 32,
                            "y": 50
                        }
                    }
                ]
            ],
            "freeSpace": 0.14723809523809525,
            "send": true
        },
        {
            "id": "s2",
            "width": 60,
            "length": 70,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c84",
                            "width": 34,
                            "height": 33,
                            "length": 38,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c60",
                            "width": 26,
                            "height": 38,
                            "length": 39,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c91",
                            "width": 31,
                            "height": 25,
                            "length": 32,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 38,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c66",
                            "width": 23,
                            "height": 20,
                            "length": 29,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 39,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c83",
                            "width": 1,
                            "height": 22,
                            "length": 13,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 38,
                            "y": 31
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c86",
                            "width": 39,
                            "height": 34,
                            "length": 29,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c78",
                            "width": 28,
                            "height": 34,
                            "length": 34,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 29,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c68",
                            "width": 20,
                            "height": 36,
                            "length": 37,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 39
                        }
                    },
                    {
                        "element": {
                            "id": "c73",
                            "width": 15,
                            "height": 17,
                            "length": 33,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 37,
                            "y": 39
                        }
                    },
                    {
                        "element": {
                            "id": "c81",
                            "width": 9,
                            "height": 22,
                            "length": 34,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 29,
                            "y": 28
                        }
                    },
                    {
                        "element": {
                            "id": "c92",
                            "width": 16,
                            "height": 15,
                            "length": 5,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 63,
                            "y": 0
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c99",
                            "width": 29,
                            "height": 7,
                            "length": 32,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c96",
                            "width": 14,
                            "height": 8,
                            "length": 23,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 29
                        }
                    },
                    {
                        "element": {
                            "id": "c90",
                            "width": 27,
                            "height": 23,
                            "length": 10,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 32,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c87",
                            "width": 16,
                            "height": 33,
                            "length": 14,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 43
                        }
                    },
                    {
                        "element": {
                            "id": "c65",
                            "width": 15,
                            "height": 24,
                            "length": 13,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 42,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c94",
                            "width": 9,
                            "height": 22,
                            "length": 19,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 23,
                            "y": 29
                        }
                    }
                ]
            ],
            "freeSpace": 0.22285714285714286,
            "send": false
        },
        {
            "id": "s3",
            "width": 90,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c84",
                            "width": 34,
                            "height": 33,
                            "length": 38,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c86",
                            "width": 29,
                            "height": 34,
                            "length": 39,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c60",
                            "width": 26,
                            "height": 38,
                            "length": 39,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 63
                        }
                    },
                    {
                        "element": {
                            "id": "c81",
                            "width": 34,
                            "height": 22,
                            "length": 9,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 38,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c90",
                            "width": 27,
                            "height": 23,
                            "length": 10,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 39,
                            "y": 34
                        }
                    },
                    {
                        "element": {
                            "id": "c94",
                            "width": 19,
                            "height": 22,
                            "length": 9,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 39,
                            "y": 63
                        }
                    },
                    {
                        "element": {
                            "id": "c83",
                            "width": 1,
                            "height": 22,
                            "length": 13,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 89
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c91",
                            "width": 32,
                            "height": 25,
                            "length": 31,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c78",
                            "width": 28,
                            "height": 34,
                            "length": 34,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 32
                        }
                    },
                    {
                        "element": {
                            "id": "c99",
                            "width": 29,
                            "height": 7,
                            "length": 32,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 0,
                            "y": 60
                        }
                    },
                    {
                        "element": {
                            "id": "c96",
                            "width": 23,
                            "height": 8,
                            "length": 14,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 31,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c87",
                            "width": 14,
                            "height": 33,
                            "length": 16,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 34,
                            "y": 32
                        }
                    },
                    {
                        "element": {
                            "id": "c65",
                            "width": 13,
                            "height": 24,
                            "length": 15,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 32,
                            "y": 60
                        }
                    },
                    {
                        "element": {
                            "id": "c92",
                            "width": 16,
                            "height": 15,
                            "length": 5,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 45,
                            "y": 0
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c68",
                            "width": 37,
                            "height": 36,
                            "length": 20,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c66",
                            "width": 23,
                            "height": 20,
                            "length": 29,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 37
                        }
                    },
                    {
                        "element": {
                            "id": "c73",
                            "width": 15,
                            "height": 17,
                            "length": 33,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 60
                        }
                    }
                ]
            ],
            "freeSpace": 0.27466666666666667,
            "send": false
        }
    ],
    [
        {
            "id": "s1",
            "width": 70,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c111",
                            "width": 35,
                            "height": 11,
                            "length": 38,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c119",
                            "width": 23,
                            "height": 38,
                            "length": 40,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c102",
                            "width": 7,
                            "height": 2,
                            "length": 33,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 58
                        }
                    },
                    {
                        "element": {
                            "id": "c103",
                            "width": 25,
                            "height": 19,
                            "length": 9,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 38,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c94",
                            "width": 19,
                            "height": 22,
                            "length": 9,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 40,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c107",
                            "width": 5,
                            "height": 22,
                            "length": 5,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 65
                        }
                    },
                    {
                        "element": {
                            "id": "c120",
                            "width": 6,
                            "height": 6,
                            "length": 11,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 33,
                            "y": 58
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c66",
                            "width": 29,
                            "height": 20,
                            "length": 23,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c106",
                            "width": 20,
                            "height": 30,
                            "length": 25,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 29
                        }
                    },
                    {
                        "element": {
                            "id": "c110",
                            "width": 15,
                            "height": 27,
                            "length": 31,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 49
                        }
                    },
                    {
                        "element": {
                            "id": "c105",
                            "width": 14,
                            "height": 22,
                            "length": 24,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 23,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c117",
                            "width": 20,
                            "height": 13,
                            "length": 16,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 25,
                            "y": 29
                        }
                    },
                    {
                        "element": {
                            "id": "c113",
                            "width": 13,
                            "height": 23,
                            "length": 24,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 23,
                            "y": 14
                        }
                    },
                    {
                        "element": {
                            "id": "c118",
                            "width": 6,
                            "height": 29,
                            "length": 33,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 64
                        }
                    },
                    {
                        "element": {
                            "id": "c101",
                            "width": 9,
                            "height": 7,
                            "length": 17,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 31,
                            "y": 49
                        }
                    },
                    {
                        "element": {
                            "id": "c125",
                            "width": 13,
                            "height": 12,
                            "length": 8,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 41,
                            "y": 29
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c127",
                            "width": 36,
                            "height": 24,
                            "length": 25,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c139",
                            "width": 23,
                            "height": 26,
                            "length": 39,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c132",
                            "width": 35,
                            "height": 3,
                            "length": 25,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 25,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c138",
                            "width": 10,
                            "height": 2,
                            "length": 36,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 59
                        }
                    },
                    {
                        "element": {
                            "id": "c134",
                            "width": 23,
                            "height": 12,
                            "length": 11,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 39,
                            "y": 36
                        }
                    }
                ]
            ],
            "freeSpace": 0.11352380952380953,
            "send": true
        },
        {
            "id": "s2",
            "width": 60,
            "length": 70,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c111",
                            "width": 35,
                            "height": 11,
                            "length": 38,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c119",
                            "width": 23,
                            "height": 38,
                            "length": 40,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c66",
                            "width": 23,
                            "height": 20,
                            "length": 29,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 38,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c106",
                            "width": 20,
                            "height": 30,
                            "length": 25,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 40,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c103",
                            "width": 9,
                            "height": 19,
                            "length": 25,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 38,
                            "y": 23
                        }
                    },
                    {
                        "element": {
                            "id": "c107",
                            "width": 5,
                            "height": 22,
                            "length": 5,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 65,
                            "y": 35
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c110",
                            "width": 15,
                            "height": 27,
                            "length": 31,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c105",
                            "width": 14,
                            "height": 22,
                            "length": 24,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 15
                        }
                    },
                    {
                        "element": {
                            "id": "c117",
                            "width": 20,
                            "height": 13,
                            "length": 16,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 29
                        }
                    },
                    {
                        "element": {
                            "id": "c113",
                            "width": 13,
                            "height": 23,
                            "length": 24,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 31,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c102",
                            "width": 7,
                            "height": 2,
                            "length": 33,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 24,
                            "y": 15
                        }
                    },
                    {
                        "element": {
                            "id": "c118",
                            "width": 6,
                            "height": 29,
                            "length": 33,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 49
                        }
                    },
                    {
                        "element": {
                            "id": "c94",
                            "width": 9,
                            "height": 22,
                            "length": 19,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 16,
                            "y": 29
                        }
                    },
                    {
                        "element": {
                            "id": "c101",
                            "width": 9,
                            "height": 7,
                            "length": 17,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 16,
                            "y": 38
                        }
                    },
                    {
                        "element": {
                            "id": "c125",
                            "width": 8,
                            "height": 12,
                            "length": 13,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 55,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c120",
                            "width": 6,
                            "height": 6,
                            "length": 11,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 24,
                            "y": 22
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c127",
                            "width": 36,
                            "height": 24,
                            "length": 25,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c139",
                            "width": 23,
                            "height": 26,
                            "length": 39,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c132",
                            "width": 35,
                            "height": 3,
                            "length": 25,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 25,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c131",
                            "width": 17,
                            "height": 32,
                            "length": 23,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 39,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c123",
                            "width": 29,
                            "height": 37,
                            "length": 11,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 50,
                            "y": 0
                        }
                    }
                ]
            ],
            "freeSpace": 0.2535714285714286,
            "send": false
        },
        {
            "id": "s3",
            "width": 90,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c111",
                            "width": 35,
                            "height": 11,
                            "length": 38,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c119",
                            "width": 23,
                            "height": 38,
                            "length": 40,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c66",
                            "width": 23,
                            "height": 20,
                            "length": 29,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 0,
                            "y": 58
                        }
                    },
                    {
                        "element": {
                            "id": "c117",
                            "width": 16,
                            "height": 13,
                            "length": 20,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 29,
                            "y": 58
                        }
                    },
                    {
                        "element": {
                            "id": "c102",
                            "width": 7,
                            "height": 2,
                            "length": 33,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 81
                        }
                    },
                    {
                        "element": {
                            "id": "c103",
                            "width": 25,
                            "height": 19,
                            "length": 9,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 38,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c94",
                            "width": 19,
                            "height": 22,
                            "length": 9,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 40,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c107",
                            "width": 5,
                            "height": 22,
                            "length": 5,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 29,
                            "y": 74
                        }
                    },
                    {
                        "element": {
                            "id": "c120",
                            "width": 6,
                            "height": 6,
                            "length": 11,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 33,
                            "y": 81
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c106",
                            "width": 20,
                            "height": 30,
                            "length": 25,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c110",
                            "width": 15,
                            "height": 27,
                            "length": 31,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 20
                        }
                    },
                    {
                        "element": {
                            "id": "c105",
                            "width": 14,
                            "height": 22,
                            "length": 24,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 25,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c113",
                            "width": 24,
                            "height": 23,
                            "length": 13,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c118",
                            "width": 6,
                            "height": 29,
                            "length": 33,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 0,
                            "y": 59
                        }
                    },
                    {
                        "element": {
                            "id": "c101",
                            "width": 9,
                            "height": 7,
                            "length": 17,
                            "timestamp": 5
                        },
                        "pivot": {
                            "x": 31,
                            "y": 20
                        }
                    },
                    {
                        "element": {
                            "id": "c127",
                            "width": 25,
                            "height": 24,
                            "length": 36,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 65
                        }
                    },
                    {
                        "element": {
                            "id": "c128",
                            "width": 23,
                            "height": 23,
                            "length": 33,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 13,
                            "y": 35
                        }
                    },
                    {
                        "element": {
                            "id": "c130",
                            "width": 19,
                            "height": 17,
                            "length": 14,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 36,
                            "y": 65
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c139",
                            "width": 39,
                            "height": 26,
                            "length": 23,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c132",
                            "width": 35,
                            "height": 3,
                            "length": 25,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 39
                        }
                    },
                    {
                        "element": {
                            "id": "c124",
                            "width": 39,
                            "height": 17,
                            "length": 15,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 23,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c131",
                            "width": 17,
                            "height": 32,
                            "length": 23,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 25,
                            "y": 39
                        }
                    },
                    {
                        "element": {
                            "id": "c138",
                            "width": 10,
                            "height": 2,
                            "length": 36,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 74
                        }
                    },
                    {
                        "element": {
                            "id": "c123",
                            "width": 29,
                            "height": 37,
                            "length": 11,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 38,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c134",
                            "width": 11,
                            "height": 12,
                            "length": 23,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 25,
                            "y": 56
                        }
                    },
                    {
                        "element": {
                            "id": "c125",
                            "width": 8,
                            "height": 12,
                            "length": 13,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 36,
                            "y": 74
                        }
                    }
                ]
            ],
            "freeSpace": 0.1386666666666667,
            "send": false
        }
    ],
    [
        {
            "id": "s1",
            "width": 70,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c156",
                            "width": 36,
                            "height": 16,
                            "length": 30,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c148",
                            "width": 24,
                            "height": 21,
                            "length": 37,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c144",
                            "width": 28,
                            "height": 3,
                            "length": 15,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 30,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c154",
                            "width": 21,
                            "height": 25,
                            "length": 13,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 37,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c147",
                            "width": 7,
                            "height": 26,
                            "length": 29,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 60
                        }
                    },
                    {
                        "element": {
                            "id": "c158",
                            "width": 8,
                            "height": 36,
                            "length": 16,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 30,
                            "y": 28
                        }
                    },
                    {
                        "element": {
                            "id": "c151",
                            "width": 18,
                            "height": 11,
                            "length": 5,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 45,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c140",
                            "width": 3,
                            "height": 14,
                            "length": 1,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 37,
                            "y": 57
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c136",
                            "width": 30,
                            "height": 16,
                            "length": 28,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c150",
                            "width": 37,
                            "height": 40,
                            "length": 21,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 30
                        }
                    },
                    {
                        "element": {
                            "id": "c128",
                            "width": 33,
                            "height": 23,
                            "length": 23,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 21,
                            "y": 30
                        }
                    },
                    {
                        "element": {
                            "id": "c149",
                            "width": 26,
                            "height": 36,
                            "length": 21,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 28,
                            "y": 0
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c142",
                            "width": 27,
                            "height": 35,
                            "length": 26,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c124",
                            "width": 39,
                            "height": 17,
                            "length": 15,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 27
                        }
                    },
                    {
                        "element": {
                            "id": "c141",
                            "width": 25,
                            "height": 24,
                            "length": 16,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 26,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c131",
                            "width": 17,
                            "height": 32,
                            "length": 23,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 15,
                            "y": 27
                        }
                    },
                    {
                        "element": {
                            "id": "c155",
                            "width": 11,
                            "height": 12,
                            "length": 34,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 15,
                            "y": 44
                        }
                    },
                    {
                        "element": {
                            "id": "c123",
                            "width": 11,
                            "height": 37,
                            "length": 29,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 15,
                            "y": 55
                        }
                    },
                    {
                        "element": {
                            "id": "c157",
                            "width": 15,
                            "height": 28,
                            "length": 10,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 38,
                            "y": 27
                        }
                    }
                ]
            ],
            "freeSpace": 0.14971428571428572,
            "send": true
        },
        {
            "id": "s2",
            "width": 60,
            "length": 70,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c156",
                            "width": 36,
                            "height": 16,
                            "length": 30,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c148",
                            "width": 24,
                            "height": 21,
                            "length": 37,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c136",
                            "width": 28,
                            "height": 16,
                            "length": 30,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 30,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c128",
                            "width": 23,
                            "height": 23,
                            "length": 33,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 37,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c147",
                            "width": 7,
                            "height": 26,
                            "length": 29,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 30,
                            "y": 28
                        }
                    },
                    {
                        "element": {
                            "id": "c157",
                            "width": 15,
                            "height": 28,
                            "length": 10,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 60,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c140",
                            "width": 3,
                            "height": 14,
                            "length": 1,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 59,
                            "y": 28
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c150",
                            "width": 37,
                            "height": 40,
                            "length": 21,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c142",
                            "width": 26,
                            "height": 35,
                            "length": 27,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 21,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c124",
                            "width": 15,
                            "height": 17,
                            "length": 39,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 37
                        }
                    },
                    {
                        "element": {
                            "id": "c149",
                            "width": 26,
                            "height": 36,
                            "length": 21,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 48,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c144",
                            "width": 15,
                            "height": 3,
                            "length": 28,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 39,
                            "y": 37
                        }
                    },
                    {
                        "element": {
                            "id": "c155",
                            "width": 11,
                            "height": 12,
                            "length": 34,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 21,
                            "y": 26
                        }
                    },
                    {
                        "element": {
                            "id": "c143",
                            "width": 5,
                            "height": 8,
                            "length": 35,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 52
                        }
                    },
                    {
                        "element": {
                            "id": "c151",
                            "width": 5,
                            "height": 11,
                            "length": 18,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 35,
                            "y": 52
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c141",
                            "width": 25,
                            "height": 24,
                            "length": 16,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c131",
                            "width": 17,
                            "height": 32,
                            "length": 23,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 25
                        }
                    },
                    {
                        "element": {
                            "id": "c146",
                            "width": 20,
                            "height": 10,
                            "length": 18,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 16,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c123",
                            "width": 11,
                            "height": 37,
                            "length": 29,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 42
                        }
                    },
                    {
                        "element": {
                            "id": "c126",
                            "width": 11,
                            "height": 4,
                            "length": 27,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 23,
                            "y": 25
                        }
                    },
                    {
                        "element": {
                            "id": "c154",
                            "width": 13,
                            "height": 25,
                            "length": 21,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 34,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c158",
                            "width": 8,
                            "height": 36,
                            "length": 16,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 29,
                            "y": 42
                        }
                    }
                ]
            ],
            "freeSpace": 0.2253968253968254,
            "send": false
        },
        {
            "id": "s3",
            "width": 90,
            "length": 50,
            "height": 60,
            "containers": [
                [
                    {
                        "element": {
                            "id": "c156",
                            "width": 36,
                            "height": 16,
                            "length": 30,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c148",
                            "width": 37,
                            "height": 21,
                            "length": 24,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c150",
                            "width": 37,
                            "height": 40,
                            "length": 21,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 24,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c124",
                            "width": 15,
                            "height": 17,
                            "length": 39,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 73
                        }
                    },
                    {
                        "element": {
                            "id": "c144",
                            "width": 28,
                            "height": 3,
                            "length": 15,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 30,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c143",
                            "width": 35,
                            "height": 8,
                            "length": 5,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 45,
                            "y": 36
                        }
                    },
                    {
                        "element": {
                            "id": "c157",
                            "width": 15,
                            "height": 28,
                            "length": 10,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 39,
                            "y": 73
                        }
                    },
                    {
                        "element": {
                            "id": "c158",
                            "width": 8,
                            "height": 36,
                            "length": 16,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 30,
                            "y": 28
                        }
                    },
                    {
                        "element": {
                            "id": "c151",
                            "width": 18,
                            "height": 11,
                            "length": 5,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 45,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c140",
                            "width": 3,
                            "height": 14,
                            "length": 1,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 49,
                            "y": 73
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c136",
                            "width": 30,
                            "height": 16,
                            "length": 28,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c128",
                            "width": 23,
                            "height": 23,
                            "length": 33,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 30
                        }
                    },
                    {
                        "element": {
                            "id": "c142",
                            "width": 26,
                            "height": 35,
                            "length": 27,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 53
                        }
                    },
                    {
                        "element": {
                            "id": "c149",
                            "width": 26,
                            "height": 36,
                            "length": 21,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 28,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c141",
                            "width": 25,
                            "height": 24,
                            "length": 16,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 27,
                            "y": 53
                        }
                    },
                    {
                        "element": {
                            "id": "c131",
                            "width": 23,
                            "height": 32,
                            "length": 17,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 33,
                            "y": 30
                        }
                    },
                    {
                        "element": {
                            "id": "c155",
                            "width": 11,
                            "height": 12,
                            "length": 34,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 79
                        }
                    }
                ],
                [
                    {
                        "element": {
                            "id": "c146",
                            "width": 20,
                            "height": 10,
                            "length": 18,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c123",
                            "width": 29,
                            "height": 37,
                            "length": 11,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 20
                        }
                    },
                    {
                        "element": {
                            "id": "c126",
                            "width": 27,
                            "height": 4,
                            "length": 11,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 0,
                            "y": 49
                        }
                    },
                    {
                        "element": {
                            "id": "c154",
                            "width": 21,
                            "height": 25,
                            "length": 13,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 11,
                            "y": 20
                        }
                    },
                    {
                        "element": {
                            "id": "c130",
                            "width": 14,
                            "height": 17,
                            "length": 19,
                            "timestamp": 6
                        },
                        "pivot": {
                            "x": 18,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c147",
                            "width": 7,
                            "height": 26,
                            "length": 29,
                            "timestamp": 7
                        },
                        "pivot": {
                            "x": 0,
                            "y": 76
                        }
                    }
                ]
            ],
            "freeSpace": 0.25733333333333336,
            "send": false
        }
    ]
]