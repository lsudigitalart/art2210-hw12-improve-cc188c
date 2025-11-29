let map,ground,brick,questionbox,pipe;
let tilesize=40;
let brickImg,groundImg,qImg,topLeftImg,topRightImg,rightImg,leftImg,spriteImg;
 
let sprite;


function preload () {
    brickImg = loadImage ('brick.png');
    groundImg = loadImage ('ground.png');
    qImg = loadImage ('energy.png');
    topLeftImg = loadImage ('puter.png');
    topRightImg = loadImage ('pillow.png');
    rightImg = loadImage ('low-battery.png');
    leftImg = loadImage ('bed.png');
    spriteImg = loadImage ('ongo.png');
}

function setup() {
  brickImg.resize(tilesize, tilesize);
  groundImg.resize(tilesize, tilesize);
  qImg.resize(tilesize, tilesize);
  topLeftImg.resize(tilesize, tilesize);
  topRightImg.resize(tilesize, tilesize);
  rightImg.resize(tilesize, tilesize);
  leftImg.resize(tilesize, tilesize);

  createCanvas(windowWidth, 500);
  world.gravity.y = 20;

    ground = new Group ();
    ground.collider = 'static';
    ground.img = groundImg;
    ground.tile = '=';
    ground.w = tilesize;
    ground.h = tilesize;
    ground.layer = 1;

    brick = new Group ();
    brick.collider = 'static';
    brick.img = brickImg;
    brick.tile = 'b';
    brick.w = tilesize;
    brick.h = tilesize;
    brick.layer = 2;

    questionbox = new Group ();
    questionbox.collider = 'static';
    questionbox.img = qImg;
    questionbox.tile = '?';
    questionbox.w = tilesize;
    questionbox.h = tilesize;

    pipeLeft = new Group ();
    pipeLeft.collider = 'static';
    pipeLeft.img = leftImg ;
    pipeLeft.tile = 'L';
    pipeLeft.w = tilesize;
    pipeLeft.h = tilesize;

    pipeRight = new Group ();
    pipeRight.collider = 'static';
    pipeRight.img = rightImg;
    pipeRight.tile = 'R';
    pipeRight.w = tilesize;
    pipeRight.h = tilesize;

    pipeTL = new Group ();
    pipeTL.collider = 'static';
    pipeTL.img = topLeftImg;
    pipeTL.tile = 'l';
    pipeTL.w = tilesize;
    pipeTL.h = tilesize;

    pipeTR = new Group ();
    pipeTR.collider = 'static';
    pipeTR.img = topRightImg;
    pipeTR.tile = 'r';
    pipeTR.w = tilesize;
    pipeTR.h = tilesize;

        sprite = new Sprite (80, 400);
        sprite.rotationLock = true;
        sprite.spriteSheet = spriteImg;
        sprite.anis.frameDelay = 8;
        sprite.addAni('run', {row:0, frames:2, frameSize: [110, 90]});
        sprite.addAni('stand', {row:0, frames:1, frameSize: [110, 90]});
        sprite.ani = 'stand';
        sprite.pixelPerfect = true; 
        

 new Tiles(
    [
'................................................................................',
      '..........................................................................',
      '......................................?.....?....?........................',
      '.....................................bbb..bbb...bbb.......?...?...........',
      '..............?.................?.b......................bbb..bb..??......',
      '.............bb..........b.....bb.........................................',
      '.........bbb...........?.....b..........................b........b..b.....',
      '......?................b........................................bb..bb....',
      '......bb............bb.............................bbb.........bbb..bbb...',
      '................?.............................................bbbb..bbbb..',
      'bbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
     'bbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
     
    ],
    0,
    16,
    tilesize,
    tilesize - 1);

    new Tiles ([
        '=========================================================================',
    ],
    0,
    480,
    tilesize,
    tilesize - 1);
}

function draw() {
  clear();
  background(115,157,245); 
  textSize(20);
  fill(0);
  text('Collect all the energy drinks for the tired art student! D = Forward, A = Backward, SPACE = Jump', 10, 30);
  collectQuestions();
  movesprite();
}

function collectQuestions() {
  sprite.overlaps(questionbox, (s, q) => {
    q.remove();
  });
}

function movesprite() {
  if (kb.pressing('d')) 
    {
        sprite.vel.x = 2;
        sprite.ani = 'run';
        sprite.mirror.x = false;
        
    }
    else if (kb.pressing('a'))
    {
        sprite.vel.x = -2;
        sprite.ani = 'run';
        sprite.mirror.x = true;
    }
    else 
    {
        sprite.vel.x = 0;
        sprite.ani = 'stand';
    }

    if (kb.presses('space') && (sprite.colliding(ground) || sprite.colliding(brick) || sprite.colliding(pipeLeft) || sprite.colliding(pipeRight) || sprite.colliding(pipeTL) || sprite.colliding(pipeTR))) 
    {
        sprite.vel.y = -8;
    }
} 