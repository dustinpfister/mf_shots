
// add a player vessel
var p = _.a({
        x : 100,
        y : 100
    }),

// game loop
loop = function () {

    setTimeout(loop, 33);

    if (_.s.u.length > 1) {

        // follow pos of first shot until it dies
        var shot = _.s.u[1];
        console.log(Math.floor(shot.x) + ',' + Math.floor(shot.y));

    }

    // update
    _.u();

};

// event hander
window.onkeydown = function (e) {

    // press ; to shoot
    if (e.keyCode == 186) {

        // shoot
        p.shoot();

    }

    // press a to change heading
    if (e.keyCode == 65) {

        p.a += Math.PI / 180;

        if (p.a > Math.PI * 2) {

            p.a = p.a % (Math.PI * 2);

        }

        console.log('a = ' + p.a);

    }

};

loop();
