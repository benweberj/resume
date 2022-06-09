import p5 from 'p5'

export const initialOptions = {
    particleCount: 70,
    pullDistance: 600,
    drawDistance: 300,
    attractionForce: 3,
    repelMultiplier: 1,
    nodesAttract: false,
    repelOnPress: true,
    drawConnections: true,
    attractedToMouse: true,
    keepInbounds: true,
    bounceDecay: .5,
    // opacity: 10
}

export default p => {
    let canvas
    let particles = []
    const parentId = 'sketch-container'
    const settingsId = 'sketch-options'
    let birds;
    let i = 0
    let cooldownTime = 250 // ms cooldown after spawning particle
    let timer = null

    let options = initialOptions // make this read from props in the future

    function addParticle() {
        if (particles.length > 100) return
        particles.push(new Particle(p))
    }

    // get an object holding the dimensions of the element matching given id
    function dim(id) {
        const a = document.getElementById(id)
        if (!a) return { top: 0, left: 0, width: 0, height: 0 }
        return {
            top: a.getBoundingClientRect().top,
            left: a.getBoundingClientRect().left,
            width: a.clientWidth,
            height: a.clientHeight,
        }
    }

    // vec: p5 vector, box: dimentions object returned from dim()
    function vectorInBox(vec, box) {
        return (vec.x > 0 && vec.x < box.width)
        && (vec.y > 0 && vec.y < box.height)
    }

    const getMouse = () => p.createVector(p.mouseX, p.mouseY)
    
    // p.preload = () => {
    //     birds = p.loadSound('birds.mp3');
    // }

    p.updateWithProps = props => {
        // console.log('updating options to:', props.options)
        if (!props.options) return
        const newOptions = JSON.parse(JSON.stringify(props.options))
        options = newOptions
        p.setup()
    }

    p.setup = () => {
        const d = dim(parentId)
        canvas = p.createCanvas(d.width, d.height);
        // particles = []
        // alert()
        canvas.position(0,0)
        i++
        console.log(`setup has been called ${i} times`)
        // canvas.position(d.left, d.top)

        // p.frameRate(20)


        // birds.play();

        // for (let i = 0; i < options.particleCount; i++) {
        //     particles.push(new Particle(p));
        // }
        // setInterval(addParticle, 300)
    }

    p.mouseClicked = e => {
        const closed= Array.from(document.getElementById(settingsId).classList).includes('closed')

        if (!closed && vectorInBox(getMouse(), dim(settingsId))) return

        if (timer === null) {
            const d = dim(parentId)
            particles.push(new Particle(p, p.createVector(e.clientX - d.left, e.clientY - d.top)))

            // cooling = true
            timer = setTimeout(() => timer = null, cooldownTime)
        } else {
            // do nothing
        }
    }

    p.draw = () => {
        

        // if (options.opacity >= 255)  {
        //     p.clear()
        // } else {
        //     p.background(43, 47, 50, options.opacity);
        // }

        p.clear()

        // if (p.mouseIsPressed && p.frameCount % 10 === 0) {
        //     particles.push(new Particle(p, p.createVector(p.mouseX, p.mouseY)))
        // }

        particles.forEach(particle => {
            particle.move(options.keepInbounds, options.bounceDecay);
            particle.draw();

            if (options.attractedToMouse) {
                let mouse = getMouse()
            
                let mouseDist = particle.pos.copy().dist(mouse);
    
                if (mouseDist < options.pullDistance && vectorInBox(mouse, dim(parentId))) {
                    let dir = mouse.copy().sub(particle.pos);
                    if (p.mouseIsPressed) {
                        if (options.repelOnPress) dir.mult(-1*options.repelMultiplier);
                    }
                    
                    const strength = 1/Math.pow(mouseDist, 2)
                    dir.mult(p.constrain(options.attractionForce * strength, 0, options.attractionForce*.001))
                    particle.applyForce(dir);
                }
            }
            

            particles.forEach(other => {
                if (particle !== other) {

                    let dist = particle.pos.dist(other.pos);

                    if (options.drawConnections && dist < options.drawDistance) {
                        let str = Math.pow(15 / dist, 2);
                        str = p.constrain(str, 0, 2);
                        p.stroke(255);
                        p.strokeWeight(str);
                        p.line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
                    }
                    if (options.nodesAttract && dist < options.pullDistance/2) {
                        let dir = other.pos.copy().sub(particle.pos)
                        dir.mult(.0001)
                        particle.applyForce(dir)
                    }
                }
            });
        });
    }
}

// const particleMesh = new

// --------------------------------------------------------

class Particle {
    constructor(p, pos) {
        this.p = p
        this.size = 0
        this.growthRate = .1
        this.respawn()
        this.pos = pos || p.createVector(p.random(-100, p.width+100), p.random(-100, p.height+100))

    }
    // this.p = p

    move(keepInbounds=true, bounceDecay=1) {
        this.pos.add(this.vel);
        
        if (keepInbounds) {
            this.checkBounce(bounceDecay)
        } else this.checkPos();

        if (this.size < this.potential) this.size += this.growthRate
    }

    draw() {
        this.p.strokeWeight(this.size);
        this.p.stroke(255);
        this.p.point(this.pos.x, this.pos.y);
    }

    applyForce(force) {
        this.vel.add(force);
    }

    checkBounce(bounceDecay) {
        let { x, y } = this.pos
        let { width, height } = this.p
        let { x:vx, y:vy } = this.vel
        let r = this.size/2
        const d = Math.min(1, bounceDecay)

        if (x <= r) { // left wall
            this.pos.x = r
            this.vel = this.p.createVector(vx*-d, vy)
        } else if (x >= (width-r)) { // right wall
            this.pos.x = width-r
            this.vel = this.p.createVector(vx*-d, vy)
        } else if (y <= r) { // top wall
            this.pos.y = r
            this.vel = this.p.createVector(vx, vy*-d)
        } else if (y >= (height-r)) { // bottom
            this.pos.y = height-r
            this.vel = this.p.createVector(vx, vy*-d)
        } 
    }

    checkPos() {
        let { x, y } = this.pos
        let s = 100;

        if ((x < 0 - s) ||
           (x > this.p.width + s) ||
           (y < 0 - s) ||
           (y > this.p.height + s)) {

            this.respawn();
        }
    }

    respawn() {
        // console.log(this.p)
        let rate = this.p.random(.2, .4);
        // let r = Math.random()

        // if (r < .25) { // top


        // } else if (r < .5) { // bottom

        // } else if (r < .75) { // left

        // } else { // right

        // }
        
        this.pos = this.p.createVector(this.p.random(-100, this.p.width + 100), -100);
        this.vel = this.p.createVector(this.p.random(-rate, rate), this.p.random(-rate + rate, rate));


        // this.vel = this.p.createVector()
        this.potential = this.p.random(3,7);
        // this.potential = ;
    }
}