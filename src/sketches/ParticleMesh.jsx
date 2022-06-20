import p5 from 'p5'
import React from 'react'

import SketchOptions from '../sketches/Options'

// might need to create a new ui component to handle nested options

// future options
// - store position of initial placement and be able to navigate back to it
// - store array of all of all positions so you can retrace them and possibly reverse them
// - delete node on right press or something
// - have the menu appear when clicked like a modal
// -    most used features would be quick to access: delete node, attractToMouse, ...

class ParticleMesh extends React.Component {

    state = {
        options: {
            // particleCount: 70,
            pullDistance: 100,
            attractionForce: 3,
            repelMultiplier: 1,
            bounceDecay: .5,
            keepInbounds: true,
            nodesAttract: true,
            repelOnPress: true,
            drawConnections: true,
            drawParticles: true,
            attractedToMouse: false,
            debug: false,
        }
    }

    constructor(props) {
        super(props)
        this.particleRef = React.createRef()
    }

    componentDidMount() {
        console.log('ref', this.particleRef)
        if (!this.sketch) this.sketch = new p5(this.Sketch, this.particleRef.current)
        console.log(this.state)
    }

    componentWillUnmount() {
        this.sketch.remove()
    }

    onSettingsChange(key, val) {
        this.setState({ options: { ...this.state.options, [key]: val} })
    }

    Sketch = p => {
        let canvas
        let particles = []
        const parentId = 'sketch-container'
        const settingsId = 'sketch-options'
        // let birds;
        let i = 0
        let cooldownTime = 150 // ms cooldown after spawning particle
        let timer = null
    
        // let options = initialOptions // make this read from props in the future
    
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
            return (vec.x > 0 && vec.x < box.width) && (vec.y > 0 && vec.y < box.height)
        }
    
        const getMouse = () => p.createVector(p.mouseX, p.mouseY)
    
        p.setup = () => {
            const d = dim(parentId)
            canvas = p.createCanvas(d.width, d.height);
            canvas.position(0,0)
            i++
            console.log(`setup has been called ${i} times`)
        }
    
        p.mouseClicked = e => {
            const closed= Array.from(document.getElementById(settingsId).classList).includes('closed')
    
            if (!closed && vectorInBox(getMouse(), dim(settingsId))) return
    
            if (timer === null) {
                const d = dim(parentId)
                particles.push(new Particle(p, p.createVector(e.clientX - d.left, e.clientY - d.top)))
                timer = setTimeout(() => timer = null, cooldownTime)
            }
        }
    
        p.draw = () => {
            const options = this.state.options
            const mouse = getMouse()
            
            p.clear()
            
            // perimeter of mouse's attraction
            if (options.debug) {
                p.noFill()
                p.stroke('#fff1')
                p.strokeWeight(1)
                p.ellipse(mouse.x, mouse.y, options.pullDistance*2)
            }

            particles.forEach(particle => {
                particle.move(options.keepInbounds, options.bounceDecay);
                if (options.drawParticles) particle.draw();

                // perimeter of nodes' inter-node attraction
                if (options.debug && options.nodesAttract) {
                    p.noFill()
                    p.stroke('#fff1')
                    p.strokeWeight(1)
                    p.ellipse(particle.pos.x, particle.pos.y, options.pullDistance)
                }

    
                if (options.attractedToMouse) {
                    let mouseDist = particle.pos.copy().dist(mouse);
                    
                    if (options.debug && (mouseDist < options.pullDistance)) {
                        p.strokeWeight(1)
                        p.stroke('#ff02')
                        p.line(mouse.x, mouse.y, particle.pos.x, particle.pos.y)
                    }
                
        
                    if ((mouseDist < options.pullDistance) && vectorInBox(mouse, dim(parentId))) {
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
    
                        if (options.drawConnections && dist < options.pullDistance) {
                            let str = Math.pow(15 / dist, 2);
                            str = p.constrain(str, 0, 2);
                            p.stroke(255);
                            p.strokeWeight(str);
                            p.line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
                        }
                        if (options.nodesAttract && dist < options.pullDistance) {
                            let dir = other.pos.copy().sub(particle.pos)
                            const strength = 1/Math.pow(dist, 2)
                            dir.mult(p.constrain(options.attractionForce * strength, 0, options.attractionForce*.001))
                            particle.applyForce(dir)
                        }
                    }
                });
            });
        }
    }

    render() {
        return (
            <div id='sketch-container' className='full'>
                <div ref={this.particleRef} />
                <SketchOptions options={this.state.options} onChange={this.onSettingsChange.bind(this)} />
            </div>
        )
    }
}


class Particle {
    constructor(p, pos) {
        this.p = p
        this.size = 0
        this.growthRate = .1
        this.respawn()
        this.pos = pos || p.createVector(p.random(-100, p.width+100), p.random(-100, p.height+100))
    }

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

    applyForce(force) { this.vel.add(force); }

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
        if ((x < 0 - s) || (x > this.p.width + s) || (y < 0 - s) || (y > this.p.height + s)) this.respawn()
    }

    respawn() {
        let rate = this.p.random(.2, .4);
        this.pos = this.p.createVector(this.p.random(-100, this.p.width + 100), -100);
        this.vel = this.p.createVector(this.p.random(-rate, rate), this.p.random(-rate + rate, rate));
        this.potential = this.p.random(3,7);
    }
}

export default ParticleMesh