
// player
var player = U.a({
        x : 160,
        y : 120
    }),

// events
keys = [];
window.onkeydown = function (e) {

    keys[e.keyCode] = true;

};
window.onkeyup = function (e) {

    keys[e.keyCode] = false;

};

// single enemy
var countE = function () {

    var ct = 0;

    U.s.u.forEach(function (u) {

        if (u.n === 'e' && u.i > 0) {

            ct += 1;

        }

    });

    return ct;

};

U.a({
    x : 50,
    y : 50,
    n : 'e',
    b : 2,
    a : Math.PI * 2 * Math.random()
});


U.p({
    x : 30,
    y : 25,
	s : 15
});


U.p({
    x : 80,
    y : 150,
	s : 15
});

(function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),

    setup = function () {

        // append to body
        document.body.appendChild(canvas);

        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 240;

        loop();
    },

    // the single draw function
    draw = function () {

        // draw a cirlce
        ctx.strokeStyle = '#ffffff';

        U.s.u.forEach(function (u) {

            ctx.fillStyle = u.n === 'p' ? '#00ff00' : '#ff0000';

            if (u.l != undefined) {

                ctx.fillStyle = '#ffffff';

            }

            if (u.sp != undefined) {

                ctx.fillStyle = '#0000ff';

            }

            ctx.beginPath();
            ctx.arc(u.x, u.y, u.s, 0, 6.29);
            ctx.fill();

        });

        ctx.stroke();

    },

    // clear screen
    cls = function () {

        // default the canvas to a solid back background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    },

    // the loop
    loop = function () {

        requestAnimationFrame(loop);

        // update
        U.u();

        if (countE() === 0) {

            U.a({
                x : 50,
                y : 50,
                n : 'e',
                b : 2,
                a : Math.PI * 2 * Math.random()
            });

        }

        // w
        if (keys[87]) {

            player.b = 1;

        }

        //s
        if (keys[83]) {

            player.b = 0;

        }

        //a
        if (keys[65]) {

            player.a += Math.PI / 180;

        }

        //d
        if (keys[68]) {

            player.a -= Math.PI / 180;

        }

        if (keys[186]) {

            player.shoot();

        }

        U.s.u.forEach(function (u) {

            if (u.x > canvas.width) {

                u.x = u.x % canvas.width;

            }

            if (u.x < 0) {

                u.x = canvas.width + u.x;

            }

            if (u.y > canvas.height) {

                u.y = u.y % canvas.height;

            }

            if (u.y < 0) {

                u.y = canvas.height + u.y;

            }

        });

        cls();
        draw();

    };

    setup();

}
    ());
