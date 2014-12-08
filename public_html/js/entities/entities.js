// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "64",
                spriteheight: "64",
                width: 64,
                height: 64,
                getShape: function() {
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);

        this.renderable.addAnimation("idle", [26]);
        //create an animation called smallWalk using pictures of the image defined above(mario)
        //sets the animation to run through pictures 8-13 
        //the last number says we switch between pictures every 80 milliseconds
        this.renderable.addAnimation("smallWalk", [143, 144, 145, 146, 147, 148, 149, 150, ], 80);

        this.renderable.setCurrentAnimation("idle");

        //sets the speed we go on the x axis(first number) and y axis(second number) 
        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    update: function(delta) {
        //checks if the right key is pressed and if it is, executes the following statement 
        if (me.input.isKeyPressed("right")) {
            //sets the position of mario on the x axis by adding the x value from the setVelocity times the timer tick
            //me.timer.tick uses the time since last animation 
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            //this.renderable.setCurrentAnimation("smallWalk");
        } else if (me.input.isKeyPressed("left")) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            //this.renderable.setCurrentAnimation("smallWalk");
        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("up")) {
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
            //this.renderable.setCurrentAnimation("smallWalk");
        }


        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }



        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {

    }



});


game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
        //if something collides with this object then we will call the on collision and pass it
        //a hidden parameter of this object
        this.body.onCollision = this.omCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },
    omCollision: function() {
        //stes this object so that it will collide only with objects of type no_oobject, which dont exsist
        //so really, makes it so this object wil not collide with anything anymore
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }

});

game.BadGuy = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "slime",
                spritewidth: "60",
                spriteheight: "28",
                width: 60,
                height: 28,
                getShape: function() {
                    return (new me.Rect(0, 0, 60, 28)).toPolygon();
                }
            }]);
        
        this.spritewidth = 60;
        var width = settings.width; 
        x = this.pos.x;
        this.startX  = x;
        this.endX = x + width - this.spritewidth;
        this.pos.x = x + width -this.spritewidth;
        this.updateBound();
        
        this.alwaysUpdate = true;
        
        this.walkleft = false;
        this.alive = true;
        this.type = "badguy";
        
//        this.renderable.addAnimation("run", )
        
    },
    
    update: function(delta){
        
    }
    
});



