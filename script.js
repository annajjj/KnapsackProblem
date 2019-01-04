window.addEventListener("load", function (event) {
    //incrementation node
    createNode("div", "#container", null, "incrementation", "1 delivery")
    //container columns node
    createNode("div", "#container", "container-columns1", "container-columns", null);
    //floor-text-container node
    createNode("div", "#container-columns1", "floor-text-container1", "floor-text-container", null);
    //floor-text node
    createNode("div", "#floor-text-container1", null, "floor-text", "floor0");

    //ships with canvases 
    for (let i = 0; i < 3; i++) {
        createNode("div", "#container-columns1", `ship${i + 1}`, null, null);
        createNode("div", `#ship${i + 1}`, null, "ship-name", `${result[0][i].id} - free space ${(result[0][i].freeSpace * 100).toFixed(2)}%`, result[0][i].send);
        
        //prepare canvas
        const floor = function (p) {
            p.setup = function () {
                setCanvas(p, result[0][i]);
            };

            p.draw = function () {
                drawCanvas(p, result[0][i]);
            };
        };
        const ship = new p5(floor, window.document.getElementById(`ship${i + 1}`));
    }
});

function createNode(tag, parent, id, className, text, send = null) {
    const node = document.createElement(tag);
    if (id) node.id = id;
    if (className) node.className = className;
    if (text) {
        const textNode = document.createTextNode(text);
        node.appendChild(textNode);
    }
    if(send) node.classList.add("ship-send");
    document.querySelector(parent).appendChild(node);
}

const scale = 5;

function setCanvas(p, ship) {
    p.createCanvas((ship.length) * scale, (ship.width) * scale);
    p.textAlign(p.CENTER, p.CENTER);
}

function drawCanvas(p, ship) {
    p.background(220);
    p.fill(222);
    p.noStroke();
    p.rect(0, 0, (ship.length) * scale, (ship.width) * scale);
    const containers = ship.containers[0];
    //       for (var i = 0; i < containers.length; i++) {
    //         p.fill(124, 245, 35);
    //         p.rect(containers[i].pivot.x*scale,containers[i].pivot.y*scale,containers[i].element.width*scale,containers[i].element.length*scale)
    //         p.textSize(containers[i].element.width > containers[i].element.length ? containers[i].element.length*scale/2 : containers[i].element.width*scale/2);
    //         p.fill(0);
    //         p.text(containers[i].element.id, (containers[i].pivot.x+containers[i].element.width/2)*scale, (containers[i].pivot.y+containers[i].element.length/2)*scale);
    //   }
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
                            "id": "c1",
                            "width": 1,
                            "length": 1,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c2",
                            "width": 5,
                            "length": 4,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c3",
                            "width": 4,
                            "length": 5,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c4",
                            "width": 4,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 4,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c5",
                            "width": 1,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 1,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c6",
                            "width": 1,
                            "length": 3,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c7",
                            "width": 1,
                            "length": 4,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 5,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c8",
                            "width": 4,
                            "length": 2,
                            "height": 20,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 7,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c9",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 4,
                            "y": 5
                        }
                    },
                    {
                        "element": {
                            "id": "c10",
                            "width": 6,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 11
                        }
                    },
                    {
                        "element": {
                            "id": "c11",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 4,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c12",
                            "width": 5,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c13",
                            "width": 1,
                            "length": 7,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 3,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c14",
                            "width": 5,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 2,
                            "y": 11
                        }
                    },
                    {
                        "element": {
                            "id": "c15",
                            "width": 3,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 5,
                            "y": 7
                        }
                    },
                    {
                        "element": {
                            "id": "c16",
                            "width": 1,
                            "length": 4,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 9,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c17",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 9,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c18",
                            "width": 1,
                            "length": 5,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 6,
                            "y": 5
                        }
                    },
                    {
                        "element": {
                            "id": "c19",
                            "width": 2,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 22
                        }
                    },
                    {
                        "element": {
                            "id": "c20",
                            "width": 3,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 2,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c21",
                            "width": 3,
                            "length": 2,
                            "height": 20,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 5,
                            "y": 11
                        }
                    }
                ],
                [],
                []
            ],
            "freeSpace": 0.9852380952380951,
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
                            "id": "c1",
                            "width": 1,
                            "length": 1,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c2",
                            "width": 5,
                            "length": 4,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c3",
                            "width": 4,
                            "length": 5,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c4",
                            "width": 4,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 4,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c5",
                            "width": 1,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 1,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c6",
                            "width": 1,
                            "length": 3,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c7",
                            "width": 1,
                            "length": 4,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 5,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c8",
                            "width": 4,
                            "length": 2,
                            "height": 20,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 7,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c9",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 4,
                            "y": 5
                        }
                    },
                    {
                        "element": {
                            "id": "c10",
                            "width": 6,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 11
                        }
                    },
                    {
                        "element": {
                            "id": "c11",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 4,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c12",
                            "width": 5,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c13",
                            "width": 1,
                            "length": 7,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 3,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c14",
                            "width": 5,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 2,
                            "y": 11
                        }
                    },
                    {
                        "element": {
                            "id": "c15",
                            "width": 3,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 5,
                            "y": 7
                        }
                    },
                    {
                        "element": {
                            "id": "c16",
                            "width": 1,
                            "length": 4,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 9,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c17",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 9,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c18",
                            "width": 1,
                            "length": 5,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 6,
                            "y": 5
                        }
                    },
                    {
                        "element": {
                            "id": "c19",
                            "width": 2,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 22
                        }
                    },
                    {
                        "element": {
                            "id": "c20",
                            "width": 3,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 2,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c21",
                            "width": 3,
                            "length": 2,
                            "height": 20,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 5,
                            "y": 11
                        }
                    }
                ],
                [],
                []
            ],
            "freeSpace": 0.9876984126984127,
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
                            "id": "c1",
                            "width": 1,
                            "length": 1,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c2",
                            "width": 5,
                            "length": 4,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c3",
                            "width": 4,
                            "length": 5,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c4",
                            "width": 4,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 4,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c5",
                            "width": 1,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 1,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c6",
                            "width": 1,
                            "length": 3,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 0,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c7",
                            "width": 1,
                            "length": 4,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 5,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c8",
                            "width": 4,
                            "length": 2,
                            "height": 20,
                            "timestamp": 3
                        },
                        "pivot": {
                            "x": 7,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c9",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 4,
                            "y": 5
                        }
                    },
                    {
                        "element": {
                            "id": "c10",
                            "width": 6,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 11
                        }
                    },
                    {
                        "element": {
                            "id": "c11",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 4,
                            "y": 0
                        }
                    },
                    {
                        "element": {
                            "id": "c12",
                            "width": 5,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c13",
                            "width": 1,
                            "length": 7,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 3,
                            "y": 10
                        }
                    },
                    {
                        "element": {
                            "id": "c14",
                            "width": 5,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 2,
                            "y": 11
                        }
                    },
                    {
                        "element": {
                            "id": "c15",
                            "width": 3,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 5,
                            "y": 7
                        }
                    },
                    {
                        "element": {
                            "id": "c16",
                            "width": 1,
                            "length": 4,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 9,
                            "y": 6
                        }
                    },
                    {
                        "element": {
                            "id": "c17",
                            "width": 1,
                            "length": 2,
                            "height": 20,
                            "timestamp": 2
                        },
                        "pivot": {
                            "x": 9,
                            "y": 1
                        }
                    },
                    {
                        "element": {
                            "id": "c18",
                            "width": 1,
                            "length": 5,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 6,
                            "y": 5
                        }
                    },
                    {
                        "element": {
                            "id": "c19",
                            "width": 2,
                            "length": 2,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 0,
                            "y": 22
                        }
                    },
                    {
                        "element": {
                            "id": "c20",
                            "width": 3,
                            "length": 3,
                            "height": 20,
                            "timestamp": 1
                        },
                        "pivot": {
                            "x": 2,
                            "y": 17
                        }
                    },
                    {
                        "element": {
                            "id": "c21",
                            "width": 3,
                            "length": 2,
                            "height": 20,
                            "timestamp": 4
                        },
                        "pivot": {
                            "x": 5,
                            "y": 11
                        }
                    }
                ],
                [],
                []
            ],
            "freeSpace": 0.9885185185185185,
            "send": false
        }
    ]
]