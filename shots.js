// a micro framework for space shooter type games

var _ = (function () {

    // U id for Unit Class
    var U = function (o) {

        o = o || {};

        this.n = o.n || 'p'; // n if for owner
        this.x = o.x || 0; // x pos
        this.y = o.y || 0; // y pos

        //this.a = o.a || 0; // delta x
        //this.b = o.b || 0; // delta y

        this.a = o.a || 0; // heading
        this.b = o.b || 0; // speed

        this.s = o.s || 8; // width
        //this.h = o.h || 8; // height

    },

    // S is for Shot Class
    S = function (o) {

        U.call(this, o);

        this.l = o.l || 50; // life span

    },

    // V is for vessel
    V = function (o) {

        U.call(this, o);

        this.lf = new Date();
        this.fr = 200;
        this.H = 100; // max HP
        this.i = this.H; // HP

    };

    // a if for API
    a = {

        // s id for state object
        s : {

            u : [], // the units array

        },

        // distance formula
        d : function (x1, y1, x2, y2) {

            return Math.sqrt(Math.abs(Math.pow(x1 - x2, 2)) + Math.abs(Math.pow(y1 - y2, 2)));

        },

        // add a new vessel
        a : function (o) {

            var v = new V(o);

            this.s.u.push(v);

            // return a reference
            return v;

        },

        // update all units
        u : function () {

            var un = this.s.u;

            un.forEach(function (u) {

                // move by heading and speed
                u.x += Math.cos(u.a) * u.b;
                u.y += Math.sin(u.a) * u.b;

                if (u.l != undefined) {

                    u.l -= 1;

                }

            });

            // purge dead units
            var i = un.length;
            while (i--) {

                // if lifespan is out
                if (un[i].l <= 0) {

                    un.splice(i, 1);

                }

            }

        }

    };

    // U.a(unitObj) - The angle to the given unit object
    U.prototype.u = function (u) {

        return this.p(u.x, u.y);

    };

    // angle to given Point
    U.prototype.p = function (x, y) {

        return Math.atan2(this.y - y, this.x - x);

    };

    // shot inherits from Unit
    S.prototype = new U();

    V.prototype = new U();

    // shoot
    V.prototype.shoot = function () {

        var now = new Date();

        if (now - this.lf >= this.fr) {

            var s = new S({

                    x : this.x,
                    y : this.y,
                    a : this.a,
                    b : 2

                });

            a.s.u.push(s);

            this.lf = new Date();

        }

    };

    return a;

}
    ());
