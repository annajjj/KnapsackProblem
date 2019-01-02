const algorithm1 ={
    "algorithm1": {
            "0": [
                {"id": "s01", "width": 50, "height": 60, "length": 50},
                {"id": "s02", "width": 50, "height": 60, "length": 100},
                {"id": "s01", "width": 80, "height": 60, "length": 90}
            ]
        }
    }

var floor0 = function( p ) { 
    p.setup = function() {
        setCanvas(p, algorithm1.algorithm1[0][0]);
    };
  
    p.draw = function() {
        drawCanvas(p,algorithm1.algorithm1[0][0]);
    };
  };
  
  var myp5 = new p5(floor0, window.document.getElementById('floor0'));
  
// var floor1 = function( p ) { 
//     p.setup = function() {
//         setCanvas(p);
//     };
  
//     p.draw = function() {
//         drawCanvas(p);
//     };
//   };
  
//   var myp5 = new p5(floor1, window.document.getElementById('floor1'));

  function setCanvas(p, ship){
    p.createCanvas((ship.length+1)*6, (ship.width+1)*6);
    p.textAlign(p.CENTER, p.CENTER);
  }
  
  function drawCanvas(p,ship){
    p.background(220);
    p.fill(222);
    p.rect(0,0,(ship.length+1)*6, (ship.width+1)*6);
      for (var i = 0; i < containers.length; i++) {
        p.fill(124, 245, 35);
        const scale = 6;
        p.rect(containers[i].pivot.x*scale,containers[i].pivot.y*scale,containers[i].element.length*scale,containers[i].element.width*scale)
        p.textSize(containers[i].element.length > containers[i].element.width ? containers[i].element.width*scale/2 : containers[i].element.length*scale/2);
        p.fill(0);
        p.text(containers[i].element.id, (containers[i].pivot.x+containers[i].element.length/2)*scale, (containers[i].pivot.y+containers[i].element.width/2)*scale);
  }



  }
  const containers=[
    {
       "element": {
          "id": "c91",
          "width": 9,
          "length": 9
       },
       "pivot": {
          "x": 0,
          "y": 0
       }
    },
    {
       "element": {
          "id": "c7",
          "width": 10,
          "length": 8
       },
       "pivot": {
          "x": 0,
          "y": 9
       }
    },
    {
       "element": {
          "id": "c6",
          "width": 10,
          "length": 7
       },
       "pivot": {
          "x": 0,
          "y": 19
       }
    },
    {
       "element": {
          "id": "c4",
          "width": 7,
          "length": 9
       },
       "pivot": {
          "x": 0,
          "y": 29
       }
    },
    {
       "element": {
          "id": "c52",
          "width": 7,
          "length": 8
       },
       "pivot": {
          "x": 0,
          "y": 36
       }
    },
    {
       "element": {
          "id": "c97",
          "width": 10,
          "length": 5
       },
       "pivot": {
          "x": 7,
          "y": 19
       }
    },
    {
       "element": {
          "id": "c17",
          "width": 8,
          "length": 6
       },
       "pivot": {
          "x": 8,
          "y": 9
       }
    },
    {
       "element": {
          "id": "c58",
          "width": 9,
          "length": 5
       },
       "pivot": {
          "x": 8,
          "y": 36
       }
    },
    {
       "element": {
          "id": "c5",
          "width": 6,
          "length": 7
       },
       "pivot": {
          "x": 0,
          "y": 43
       }
    },
    {
       "element": {
          "id": "c90",
          "width": 4,
          "length": 10
       },
       "pivot": {
          "x": 7,
          "y": 45
       }
    },
    {
       "element": {
          "id": "c57",
          "width": 4,
          "length": 8
       },
       "pivot": {
          "x": 9,
          "y": 0
       }
    },
    {
       "element": {
          "id": "c59",
          "width": 6,
          "length": 5
       },
       "pivot": {
          "x": 9,
          "y": 29
       }
    },
    {
       "element": {
          "id": "c32",
          "width": 5,
          "length": 6
       },
       "pivot": {
          "x": 9,
          "y": 4
       }
    },
    {
       "element": {
          "id": "c18",
          "width": 7,
          "length": 4
       },
       "pivot": {
          "x": 12,
          "y": 17
       }
    },
    {
       "element": {
          "id": "c35",
          "width": 9,
          "length": 3
       },
       "pivot": {
          "x": 13,
          "y": 35
       }
    },
    {
       "element": {
          "id": "c1",
          "width": 9,
          "length": 3
       },
       "pivot": {
          "x": 14,
          "y": 24
       }
    },
    {
       "element": {
          "id": "c63",
          "width": 9,
          "length": 3
       },
       "pivot": {
          "x": 15,
          "y": 4
       }
    },
    {
       "element": {
          "id": "c93",
          "width": 3,
          "length": 7
       },
       "pivot": {
          "x": 14,
          "y": 13
       }
    },
    {
       "element": {
          "id": "c51",
          "width": 5,
          "length": 2
       },
       "pivot": {
          "x": 12,
          "y": 24
       }
    },
    {
       "element": {
          "id": "c46",
          "width": 9,
          "length": 1
       },
       "pivot": {
          "x": 16,
          "y": 33
       }
    },
    {
       "element": {
          "id": "c78",
          "width": 5,
          "length": 1
       },
       "pivot": {
          "x": 16,
          "y": 16
       }
    },
    {
       "element": {
          "id": "c15",
          "width": 5,
          "length": 1
       },
       "pivot": {
          "x": 17,
          "y": 16
       }
    },
    {
       "element": {
          "id": "c33",
          "width": 1,
          "length": 4
       },
       "pivot": {
          "x": 0,
          "y": 49
       }
    },
    {
       "element": {
          "id": "c47",
          "width": 10,
          "length": 9
       },
       "pivot": {
          "x": 17,
          "y": 21
       }
    },
    {
       "element": {
          "id": "c26",
          "width": 7,
          "length": 9
       },
       "pivot": {
          "x": 17,
          "y": 31
       }
    },
    {
       "element": {
          "id": "c76",
          "width": 6,
          "length": 9
       },
       "pivot": {
          "x": 17,
          "y": 38
       }
    },
    {
       "element": {
          "id": "c43",
          "width": 9,
          "length": 6
       },
       "pivot": {
          "x": 18,
          "y": 0
       }
    },
    {
       "element": {
          "id": "c34",
          "width": 5,
          "length": 9
       },
       "pivot": {
          "x": 17,
          "y": 44
       }
    },
    {
       "element": {
          "id": "c84",
          "width": 6,
          "length": 7
       },
       "pivot": {
          "x": 21,
          "y": 9
       }
    },
    {
       "element": {
          "id": "c60",
          "width": 6,
          "length": 7
       },
       "pivot": {
          "x": 21,
          "y": 15
       }
    },
    {
       "element": {
          "id": "c99",
          "width": 5,
          "length": 7
       },
       "pivot": {
          "x": 24,
          "y": 0
       }
    },
    {
       "element": {
          "id": "c69",
          "width": 5,
          "length": 7
       },
       "pivot": {
          "x": 26,
          "y": 21
       }
    },
    {
       "element": {
          "id": "c14",
          "width": 3,
          "length": 10
       },
       "pivot": {
          "x": 24,
          "y": 5
       }
    },
    {
       "element": {
          "id": "c62",
          "width": 6,
          "length": 4
       },
       "pivot": {
          "x": 26,
          "y": 26
       }
    },
    {
       "element": {
          "id": "c85",
          "width": 3,
          "length": 7
       },
       "pivot": {
          "x": 26,
          "y": 32
       }
    },
    {
       "element": {
          "id": "c92",
          "width": 6,
          "length": 3
       },
       "pivot": {
          "x": 26,
          "y": 35
       }
    },
    {
       "element": {
          "id": "c89",
          "width": 2,
          "length": 7
       },
       "pivot": {
          "x": 26,
          "y": 41
       }
    },
    {
       "element": {
          "id": "c66",
          "width": 4,
          "length": 3
       },
       "pivot": {
          "x": 18,
          "y": 9
       }
    },
    {
       "element": {
          "id": "c64",
          "width": 10,
          "length": 1
       },
       "pivot": {
          "x": 28,
          "y": 8
       }
    },
    {
       "element": {
          "id": "c77",
          "width": 2,
          "length": 3
       },
       "pivot": {
          "x": 8,
          "y": 17
       }
    },
    {
       "element": {
          "id": "c38",
          "width": 2,
          "length": 2
       },
       "pivot": {
          "x": 14,
          "y": 33
       }
    },
    {
       "element": {
          "id": "c72",
          "width": 1,
          "length": 4
       },
       "pivot": {
          "x": 4,
          "y": 49
       }
    },
    {
       "element": {
          "id": "c40",
          "width": 1,
          "length": 2
       },
       "pivot": {
          "x": 8,
          "y": 49
       }
    },
    {
       "element": {
          "id": "c82",
          "width": 9,
          "length": 10
       },
       "pivot": {
          "x": 29,
          "y": 8
       }
    },
    {
       "element": {
          "id": "c81",
          "width": 9,
          "length": 8
       },
       "pivot": {
          "x": 33,
          "y": 17
       }
    },
    {
       "element": {
          "id": "c73",
          "width": 7,
          "length": 10
       },
       "pivot": {
          "x": 26,
          "y": 43
       }
    },
    {
       "element": {
          "id": "c50",
          "width": 10,
          "length": 7
       },
       "pivot": {
          "x": 33,
          "y": 26
       }
    },
    {
       "element": {
          "id": "c55",
          "width": 7,
          "length": 9
       },
       "pivot": {
          "x": 33,
          "y": 36
       }
    },
    {
       "element": {
          "id": "c56",
          "width": 5,
          "length": 10
       },
       "pivot": {
          "x": 31,
          "y": 0
       }
    },
    {
       "element": {
          "id": "c74",
          "width": 7,
          "length": 7
       },
       "pivot": {
          "x": 36,
          "y": 43
       }
    },
    {
       "element": {
          "id": "c79",
          "width": 10,
          "length": 4
       },
       "pivot": {
          "x": 39,
          "y": 5
       }
    },
    {
       "element": {
          "id": "c11",
          "width": 10,
          "length": 4
       },
       "pivot": {
          "x": 40,
          "y": 26
       }
    },
    {
       "element": {
          "id": "c80",
          "width": 4,
          "length": 9
       },
       "pivot": {
          "x": 41,
          "y": 0
       }
    },
    {
       "element": {
          "id": "c19",
          "width": 8,
          "length": 4
       },
       "pivot": {
          "x": 41,
          "y": 15
       }
    },
    {
       "element": {
          "id": "c71",
          "width": 3,
          "length": 9
       },
       "pivot": {
          "x": 41,
          "y": 23
       }
    },
    {
       "element": {
          "id": "c42",
          "width": 5,
          "length": 5
       },
       "pivot": {
          "x": 42,
          "y": 36
       }
    },
    {
       "element": {
          "id": "c9",
          "width": 7,
          "length": 3
       },
       "pivot": {
          "x": 43,
          "y": 4
       }
    },
    {
       "element": {
          "id": "c98",
          "width": 10,
          "length": 2
       },
       "pivot": {
          "x": 44,
          "y": 26
       }
    },
    {
       "element": {
          "id": "c10",
          "width": 1,
          "length": 10
       },
       "pivot": {
          "x": 10,
          "y": 49
       }
    },
    {
       "element": {
          "id": "c25",
          "width": 2,
          "length": 4
       },
       "pivot": {
          "x": 28,
          "y": 18
       }
    },
    {
       "element": {
          "id": "c70",
          "width": 1,
          "length": 7
       },
       "pivot": {
          "x": 42,
          "y": 41
       }
    },
    {
       "element": {
          "id": "c49",
          "width": 2,
          "length": 3
       },
       "pivot": {
          "x": 18,
          "y": 16
       }
    },
    {
       "element": {
          "id": "c29",
          "width": 5,
          "length": 1
       },
       "pivot": {
          "x": 29,
          "y": 35
       }
    },
    {
       "element": {
          "id": "c44",
          "width": 4,
          "length": 1
       },
       "pivot": {
          "x": 14,
          "y": 9
       }
    },
    {
       "element": {
          "id": "c41",
          "width": 1,
          "length": 3
       },
       "pivot": {
          "x": 9,
          "y": 35
       }
    },
    {
       "element": {
          "id": "c13",
          "width": 8,
          "length": 7
       },
       "pivot": {
          "x": 43,
          "y": 42
       }
    },
    {
       "element": {
          "id": "c36",
          "width": 9,
          "length": 5
       },
       "pivot": {
          "x": 45,
          "y": 11
       }
    },
    {
       "element": {
          "id": "c2",
          "width": 8,
          "length": 4
       },
       "pivot": {
          "x": 46,
          "y": 26
       }
    },
    {
       "element": {
          "id": "c21",
          "width": 6,
          "length": 4
       },
       "pivot": {
          "x": 46,
          "y": 4
       }
    },
    {
       "element": {
          "id": "c65",
          "width": 7,
          "length": 2
       },
       "pivot": {
          "x": 47,
          "y": 34
       }
    },
    {
       "element": {
          "id": "c96",
          "width": 5,
          "length": 2
       },
       "pivot": {
          "x": 30,
          "y": 26
       }
    },
    {
       "element": {
          "id": "c68",
          "width": 3,
          "length": 3
       },
       "pivot": {
          "x": 18,
          "y": 18
       }
    },
    {
       "element": {
          "id": "c75",
          "width": 1,
          "length": 5
       },
       "pivot": {
          "x": 20,
          "y": 49
       }
    },
    {
       "element": {
          "id": "c87",
          "width": 2,
          "length": 2
       },
       "pivot": {
          "x": 30,
          "y": 35
       }
    },
    {
       "element": {
          "id": "c61",
          "width": 2,
          "length": 4
       },
       "pivot": {
          "x": 34,
          "y": 5
       }
    },
    {
       "element": {
          "id": "c0",
          "width": 8,
          "length": 1
       },
       "pivot": {
          "x": 49,
          "y": 34
       }
    },
    {
       "element": {
          "id": "c31",
          "width": 3,
          "length": 2
       },
       "pivot": {
          "x": 30,
          "y": 37
       }
    },
    {
       "element": {
          "id": "c37",
          "width": 1,
          "length": 3
       },
       "pivot": {
          "x": 13,
          "y": 44
       }
    }
 ]