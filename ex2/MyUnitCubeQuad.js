/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        
        this.quad1 = new MyQuad(this.scene);
        this.quad1.initBuffers();

        this.quad2 = new MyQuad(this.scene);
        this.quad2.initBuffers();

        this.quad3 = new MyQuad(this.scene);
        this.quad3.initBuffers();
        
        this.quad4 = new MyQuad(this.scene);
        this.quad4.initBuffers();

        this.quad5 = new MyQuad(this.scene);
        this.quad5.initBuffers();

        this.quad6 = new MyQuad(this.scene);
        this.quad6.initBuffers();
	}
    
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad6.display();
        this.scene.popMatrix();
    }
}
