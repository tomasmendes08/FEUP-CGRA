/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        
        this.green = new MyDiamond(this.scene);
        this.green.initBuffers();

        this.blue = new MyTriangle(this.scene);
        this.blue.initBuffers();

        this.pink = new MyTriangle(this.scene);
        this.pink.initBuffers();
        
        this.orange = new MyTriangle(this.scene);
        this.orange.initBuffers();

        this.purple = new MyTriangle(this.scene);
        this.purple.initBuffers();

        this.red = new MyTriangle(this.scene);
        this.red.initBuffers();
        
        this.yellow = new MyParallelogram(this.scene);
        this.yellow.initBuffers();
	}
    
    display() {
        this.scene.pushMatrix();
        var m = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -2.5, -2.5, 0.0, 1.0];
        this.scene.multMatrix(m);
        this.green.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.scale(Math.sqrt(2), Math.sqrt(2), 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.blue.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(-1, 1, 0);
        this.pink.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(Math.sqrt(2), Math.sqrt(2), 1);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.orange.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.5, 0);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.purple.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.5, 0);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.red.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4+Math.sqrt(2), 0, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.yellow.display();
        this.scene.popMatrix();
    }
}
