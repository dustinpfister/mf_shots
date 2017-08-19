
var player = _.a({
        x : 160,
        y : 120
    }),

keys = [];

window.onkeydown = function (e) {

    console.log(e.keyCode)

    keys[e.keyCode] = true;

};

window.onkeyup = function (e) {

    keys[e.keyCode] = false;

};

_.a({
    x : 5,
    y : 5,
    n : 'e'
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

            //ctx.fillRect(u.x, u.y, u.s, u.s);

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

            player.a += Math.PI / 50;

        }

        //d
        if (keys[68]) {

            player.a -= Math.PI / 50;

        }

        if (keys[32]) {

            player.shoot();

        }

        cls();
        draw();

    };

    setup();

}
    ());
