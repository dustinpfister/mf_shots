
// player
var player = _.a({
        x : 160,
        y : 120
    }),

// events
keys = [];
window.onkeydown = function (e) {

    console.log(e.keyCode)

    keys[e.keyCode] = true;

};
window.onkeyup = function (e) {

    keys[e.keyCode] = false;

};

// single enemy

_.a({
    x : 50,
    y : 50,
    n : 'e',
    b : 2,
    a : Math.PI * 2 * Math.random()
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

        _.s.u.forEach(function (u) {

            ctx.fillStyle = u.n === 'p' ? '#00ff00' : '#ff0000';

            if (u.l != undefined) {

                ctx.fillStyle = '#ffffff';

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
        _.u();

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

        if (keys[32]) {

            player.shoot();

        }

        _.s.u.forEach(function (u) {

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
