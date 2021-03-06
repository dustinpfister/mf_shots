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

        this.l = o.l || 100; // life span
        this.dam = 1; // damage

    },

    // V is for vessel
    V = function (o) {

        U.call(this, o);

        this.lf = new Date();
        this.fr = 200;
        this.H = 1; // max HP
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

                // if lifespan (l) then we have a shot unit
                if (u.l != undefined) {

                    // check all units to see if we hit something
                    un.forEach(function (cu) {

                        if (u.c(cu)) {

                            // if unit has hp (i) and the owner (n) does not belong to the shot
                            if (cu.i && cu.n != u.n) {

                                // apply damage
                                cu.i -= u.dam;

                                // shot is now spent
                                u.l = 0;

                            }

                        }

                    });

                    // shot looses 1 lifespan point per tick
                    u.l -= 1;

                }

            });

            // purge dead units
            var i = un.length;
            while (i--) {

                // if lifespan is out
                if (un[i].l <= 0 || un[i].i <=0 ) {

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

    // distance collision detection
    U.prototype.c = function (u) {

        if (a.d(this.x, this.y, u.x, u.y) < u.s) {

            return true;

        }

        return false;

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
                    s : 3,
                    b : 3

                });

            a.s.u.push(s);

            this.lf = new Date();

        }

    };

    return a;

}
    ());
