/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initMaterials();
        
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
    
    enableNormalViz(){
		this.green.enableNormalViz();
		this.blue.enableNormalViz();
		this.pink.enableNormalViz();
		this.orange.enableNormalViz();
		this.purple.enableNormalViz();
		this.red.enableNormalViz();
		this.yellow.enableNormalViz();
    }
    
    initMaterials() {
		this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}
    
    display() {
        this.scene.pushMatrix();
        var m = [1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            -2.5, -2.5, 0.0, 1.0];
        this.scene.multMatrix(m);
        this.green.updateTexCoords([
            0.0, 0.5,
			0.25, 0.75,
			0.25, 0.25,
			0.5, 0.5]);
        this.tangramMaterial.apply();
        this.green.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.scale(Math.sqrt(2), Math.sqrt(2), 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.blue.updateTexCoords([
            0.5, 0.5,
            1.0, 0.0,
            0.0, 0.0]);
        this.tangramMaterial.apply();
        this.blue.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(-1, 1, 0);
        this.pink.updateTexCoords([
            0.0, 1.0,
            0.5, 1.0,
            0.0, 0.5]);
        this.tangramMaterial.apply();
        this.pink.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(Math.sqrt(2), Math.sqrt(2), 1);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.orange.updateTexCoords([
            0.5, 0.5,
            1.0, 1.0,
            1.0, 0.0]);
        this.tangramMaterial.apply();
        this.orange.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.5, 0);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.purple.updateTexCoords([
            0.25, 0.25,
            0.0, 0.0,
            0.0, 0.5
        ])
        this.tangramMaterial.apply();
        this.purple.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.5, 0);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.red.updateTexCoords([
            0.5, 0.5,
            0.25, 0.75,
            0.75, 0.75
        ]);
        this.tangramMaterial.apply();
        this.red.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4+Math.sqrt(2), 0, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.yellow.updateTexCoords([
            1.0, 1.0,
            0.5, 1.0,
            0.25, 0.75,
            0.75, 0.75]);
        this.tangramMaterial.apply();
        this.yellow.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){}

	disableNormalViz(){
		this.green.disableNormalViz();
		this.blue.disableNormalViz();
		this.pink.disableNormalViz();
		this.orange.disableNormalViz();
		this.purple.disableNormalViz();
		this.red.disableNormalViz();
		this.yellow.disableNormalViz();
	}
}
