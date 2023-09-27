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
        this.blue = new MyTriangle(this.scene);
        this.pink = new MyTriangle(this.scene);
        this.orange = new MyTriangle(this.scene);
        this.purple = new MyTriangle(this.scene);
        this.red = new MyTriangle(this.scene);
        this.yellow = new MyParallelogram(this.scene);
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
		//green
		this.material5 = new CGFappearance(this.scene);
        this.material5.setAmbient(0, 1*0.5, 0, 1.0);
        this.material5.setDiffuse(0, 1*0.7, 0, 1.0);
        this.material5.setSpecular(0, 1, 0, 1.0);
        this.material5.setShininess(10.0);
		
		//blue
		this.material6 = new CGFappearance(this.scene);
        this.material6.setAmbient(0, 0, 1*0.5, 1.0);
        this.material6.setDiffuse(0, 0, 1*0.7, 1.0);
        this.material6.setSpecular(0, 0, 1, 1.0);
        this.material6.setShininess(10.0);
		
		//pink
		this.material7 = new CGFappearance(this.scene);
        this.material7.setAmbient(1*0.5, (192/255)*0.5, (203/255)*0.5, 1.0);
        this.material7.setDiffuse(1*0.7, (192/255)*0.7, (203/255)*0.7, 1.0);
        this.material7.setSpecular(1, 192/255, 203/255, 1.0);
        this.material7.setShininess(10.0);
		
		//orange
		this.material8 = new CGFappearance(this.scene);
        this.material8.setAmbient(1*0.5, (165/255)*0.5, 0, 1.0);
        this.material8.setDiffuse(1*0.7, (165/255)*0.7, 0, 1.0);
        this.material8.setSpecular(1, 165/255, 0, 1.0);
        this.material8.setShininess(10.0);
		
		//purple
		this.material9 = new CGFappearance(this.scene);
        this.material9.setAmbient((128/255)*0.5, 0, (128/255)*0.5, 1.0);
        this.material9.setDiffuse((128/255)*0.7, 0, (128/255)*0.7, 1.0);
        this.material9.setSpecular(128/255, 0, 128/255, 1.0);
        this.material9.setShininess(10.0);
		
		//red
		this.material10 = new CGFappearance(this.scene);
        this.material10.setAmbient(1*0.5, 0, 0, 1.0);
        this.material10.setDiffuse(1*0.7, 0, 0, 1.0);
        this.material10.setSpecular(1, 0, 0, 1.0);
        this.material10.setShininess(10.0);
		
		//yellow
		this.material11 = new CGFappearance(this.scene);
        this.material11.setAmbient(1*0.5, 1*0.5, 0, 1.0);
        this.material11.setDiffuse(1*0.7, 1*0.7, 0, 1.0);
        this.material11.setSpecular(1, 1, 0, 1.0);
        this.material11.setShininess(10.0);
	}
    
    display() {
        this.scene.pushMatrix();
        var m = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -2.5, -2.5, 0.0, 1.0];
        this.scene.multMatrix(m);
        // this.material5.apply();
        this.scene.customMaterial.apply();
        this.green.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.scale(Math.sqrt(2), Math.sqrt(2), 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.material6.apply();
        this.blue.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(-1, 1, 0);
        this.material7.apply();
        this.pink.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(Math.sqrt(2), Math.sqrt(2), 1);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.material8.apply();
        this.orange.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.5, 0);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.material9.apply();
        this.purple.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.5, 0);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.material10.apply();
        this.red.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4+Math.sqrt(2), 0, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.material11.apply();
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
