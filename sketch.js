// Disclaimer: this a fork from:
// --> La quatrième dimension. Pour avoir des explications, on peut consulter le site:
// --> http://rouxjeanbernard.ch/Recreations_informatiques_new/wHypercube.html
// --> Jean-Bernard Roux, avril 2021
// --------------------------------------------------------------------------------
// The 4th eye.
// New: Add 4D free-shapes. Load csv files.
// Ale Rocha, May 2022

var slider;
var S, T;
var old, f;


var table;

function preload() {
  // the loadTable() function takes the name of the file, the file type, and an optional header
  // the table we want to load is a "csv"  file and has a header specifying the columns labels
  table = loadTable("aaa.csv", "csv", "header");
}

function setup() {
    rowsT = table.getRowCount();
    A = table.getColumn("A");
    print(A);
	// Canvas --------------------------------------------
  createCanvas(800, 700, WEBGL);
  ortho(-width/2, width/2, height/2, -height/2, 0, 1500);
  // Sliders rotation --------------------------------------
  slider = []; old = [];
  for (let i = 0; i < 6; i++) {
    slider[i] = createSlider(0, 2*PI, PI, PI/180);
    h = map(i, 0, 3, 15, 85);
    slider[i].position(80, h+40);
    slider[i].style('width', '120px');
    old[i] = slider[i].value();
  }
 // Slider zoom --------------------------------------
  let i = 6; f = 1000;
  slider[i] = createSlider(800, 2000, f);
  h = map(i, 0, 3, 15, 85);
  slider[i].position(80, h+40);
  slider[i].style('width', '120px');
  old[i] = slider[i].value();

	// Shape of data ------------------------------------
  S0 = [[0, 0, 0, 0, 1], //1
    [1, 0, 0, 0, 1], //2
    [1, 1, 0, 0, 1], //3
    [0, 1, 0, 0, 1], //4
    [0, 0, 1, 0, 1], //5
    [1, 0, 1, 0, 1], //6
    [1, 1, 1, 0, 1], //7
    [0, 1, 1, 0, 1], //8
    [0, 0, 1, 1, 1], //9
    [1, 0, 1, 1, 1], //10
    [1, 1, 1, 1, 1], //11
    [0, 1, 1, 1, 1], //12
    [0, 0, 0, 1, 1], //13
    [1, 0, 0, 1, 1], //14
    [1, 1, 0, 1, 1], //15
    [0, 1, 0, 1, 1]];  //16
	

  // transposition
  S = [];
  for (let i=0; i<S0[0].length; i++) {
    S.push([]);
    for (let j=0; j<S0.length; j++) {
      S[i].push(S0[j][i]-0.5);
    }
  }

  A=[[0, 1], 
    [1, 2], 
    [2, 3], 
    [3, 0], 
    [3, 7], 
    [0, 4], 
    [1, 5], 
    [2, 6], 
    [5, 6], 
    [4, 5], 
    [6, 7], 
    [4, 7], 
    [0, 12], 
    [8, 12], 
    [4, 8], 
    [12, 13], 
    [13, 14], 
    [3, 15], 
    [9, 13], 
    [9, 10], 
    [10, 14], 
    [12, 15], 
    [14, 15], 
    [11, 15], 
    [8, 11], 
    [10, 11], 
    [8, 9], 
    [5, 9], 
    [7, 11], 
    [6, 10], 
    [1, 13], 
    [2, 14]];

  li = A.length;
  co = A[0].length;
  tourne();
}

function tourne() {
  let t, u, v, w, z, x;
  let Rxw, Rxy, Rxz, Ryw, Ryz, Rzw;
  t=slider[0].value(); 
  old[0] = t;
  u=slider[1].value(); 
  old[1] = u;
  v=slider[2].value(); 
  old[2] = v;
  w=slider[3].value(); 
  old[3] = w;
  z=slider[4].value(); 
  old[4] = z;
  x=slider[5].value(); 
  old[5] = x;
  Rxw=[[1, 0, 0, 0, 0], 
    [0, cos(t), -sin(t), 0, 0], 
    [0, sin(t), cos(t), 0, 0], 
    [0, 0, 0, 1, 0], 
    [0, 0, 0, 0, 1]];
  Rxy=[[1, 0, 0, 0, 0 ], 
    [0, 1, 0, 0, 0], 
    [0, 0, cos(w), -sin(w), 0], 
    [0, 0, sin(w), cos(w), 0], 
    [0, 0, 0, 0, 1]];
  Rxz=[[1, 0, 0, 0, 0 ], 
    [0, cos(z), 0, -sin(z), 0], 
    [0, 0, 1, 0, 0], 
    [0, sin(z), 0, cos(z), 0], 
    [0, 0, 0, 0, 1]];
  Ryw=[[cos(u), 0, -sin(u), 0, 0 ], 
    [0, 1, 0, 0, 0], 
    [sin(u), 0, cos(u), 0, 0], 
    [0, 0, 0, 1, 0], 
    [0, 0, 0, 0, 1]];
  Ryz=[[cos(x), 0, -sin(x), 0, 0 ], 
    [0, 1, 0, 0, 0], 
    [0, 0, 1, 0, 0], 
    [sin(x), 0, 0, cos(x), 0], 
    [0, 0, 0, 0, 1]];
  Rzw=[[cos(v), -sin(v), 0, 0, 0 ], 
    [sin(v), cos(v), 0, 0, 0], 
    [0, 0, 1, 0, 0], 
    [0, 0, 0, 1, 0], 
    [0, 0, 0, 0, 1]];

  T = [];
  T=matmul(matmul(matmul(matmul(matmul(matmul(Rzw, Ryz), Ryw), Rxz), Rxy), Rxw), S);
  let P=[[1, 0, 0, 0, 0], 
    [0, 1, 0, 0, 0], 
    [0, 0, 1, 0, 0], 
    [0, 0, 0, 1, 0], 
    [-0.1, -0.1, -0.1, -0.1, 10]];
  T=matmul(P, T);
  for (let i = 0; i < T[0].length; i++) {
    T[0][i] = T[0][i]/T[4][i];
    T[1][i] = T[1][i]/T[4][i];
    T[2][i] = T[2][i]/T[4][i];
    T[3][i] = T[3][i]/T[4][i];
  }
}

function matmul(a, b) {
  let colA = a[0].length;
  let ligA = a.length;
  let colB = b[0].length;
  let ligB = b.length;
  resultat = [];
  for (let j = 0; j < ligA; j++) {
    resultat[j] = [];
    for (let i = 0; i < colB; i++) {
      let sum = 0;
      for (let n = 0; n < colA; n++) {
        sum += a[j][n] * b[n][i];
      }
      resultat[j][i] = sum;
    }
  }
  return resultat;
}


function draw() {
  background('#262626');
  // fill(255);
  // rect(-width/2+10, -height/2+85, -width/2+100, -height/2+80);
  strokeWeight(6);
  let change = false;
  for (let i = 0; i < 6; i++) {
    if (old[i] != slider[i].value()) {
      change = true;
      tourne();
    }
  }
  f = slider[6].value();
  for (let i = 0; i < li; i++) {
    let x0 = T[0][A[i][0]];
    let y0 = T[1][A[i][0]];
    let z0 = T[2][A[i][0]];
    let x1 = T[0][A[i][1]];
    let y1 = T[1][A[i][1]];
    let z1 = T[2][A[i][1]];
    if (S0[A[i][0]][0]-S0[A[i][1]][0] != 0){
      stroke(255, 0, 0);
    } else if (S0[A[i][0]][1]-S0[A[i][1]][1] != 0){
      stroke(0, 255, 0);
    } else if (S0[A[i][0]][2]-S0[A[i][1]][2] != 0){
      stroke(0, 0, 255);
    } else if (S0[A[i][0]][3]-S0[A[i][1]][3] != 0){
      stroke(255, 255, 255);
    } 
    else {
      stroke(0, 0, 0);
    }
    line(f*x0, f*y0, f*z0, f*x1, f*y1, f*z1);
  }
}