/**
 * MyFlap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlap extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.triangle = new MyTriangle(this.scene);
        this.square = new MyQuadDouble(this.scene);

        this.initBuffers();
    }
    
    initBuffers() {
        this.triangle.initBuffers();
        this.square.initBuffers();
    }
    
    display() {

        this.scene.pushMatrix();
        this.square.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-1,0,0);
		this.scene.scale(0.5,0.5,0.5);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.triangle.display();
        this.scene.popMatrix();
    }
    
    updateBuffers(complexity){}
    
}
