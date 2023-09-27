/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		
		this.quad1 = new MyQuad(this.scene);
		
		this.quad2 = new MyQuad(this.scene);
		
		this.quad3 = new MyQuad(this.scene);
		
		this.quad4 = new MyQuad(this.scene);
		
		this.quad5 = new MyQuad(this.scene);
		
		this.quad6 = new MyQuad(this.scene);
		
		this.initMaterials(scene);
	}
	
	initMaterials(scene){
		
		this.backMaterial = new CGFappearance(this.scene);
        this.backMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.backMaterial.setDiffuse(0, 0, 0, 1.0);
		this.backMaterial.setSpecular(0, 0, 0, 1.0);
		this.backMaterial.setEmission(0.5, 0.5, 0.5, 1.0);
        this.backMaterial.setShininess(10.0);
		this.backMaterial.loadTexture('images/split_cubemap/back.png');
		this.backMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.bottomMaterial = new CGFappearance(this.scene);
        this.bottomMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.bottomMaterial.setDiffuse(0, 0, 0, 1.0);
		this.bottomMaterial.setSpecular(0, 0, 0, 1.0);
		this.bottomMaterial.setEmission(0.5, 0.5, 0.5, 1.0);
        this.bottomMaterial.setShininess(10.0);
		this.bottomMaterial.loadTexture('images/split_cubemap/bottom.png');
		this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.leftMaterial = new CGFappearance(this.scene);
        this.leftMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.leftMaterial.setDiffuse(0, 0, 0, 1.0);
		this.leftMaterial.setSpecular(0, 0, 0, 1.0);
		this.leftMaterial.setEmission(0.5, 0.5, 0.5, 1.0);
        this.leftMaterial.setShininess(10.0);
		this.leftMaterial.loadTexture('images/split_cubemap/left.png');
		this.leftMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.rightMaterial = new CGFappearance(this.scene);
        this.rightMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.rightMaterial.setDiffuse(0, 0, 0, 1.0);
		this.rightMaterial.setSpecular(0, 0, 0, 1.0);
		this.rightMaterial.setEmission(0.5, 0.5, 0.5, 1.0);
        this.rightMaterial.setShininess(10.0);
		this.rightMaterial.loadTexture('images/split_cubemap/right.png');
		this.rightMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.frontMaterial = new CGFappearance(this.scene);
        this.frontMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.frontMaterial.setDiffuse(0, 0, 0, 1.0);
		this.frontMaterial.setSpecular(0, 0, 0, 1.0);
		this.frontMaterial.setEmission(0.5, 0.5, 0.5, 1.0);
        this.frontMaterial.setShininess(10.0);
		this.frontMaterial.loadTexture('images/split_cubemap/front.png');
		this.frontMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.topMaterial.setDiffuse(0, 0, 0, 1.0);
		this.topMaterial.setSpecular(0, 0, 0, 1.0);
		this.topMaterial.setEmission(0.5, 0.5, 0.5, 1.0);
        this.topMaterial.setShininess(10.0);
		this.topMaterial.loadTexture('images/split_cubemap/top.png');
		this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
	}
	
	
	display(){	
	
		//back
		this.scene.scale(50, 50, 50);
		this.scene.pushMatrix();
		
		this.backMaterial.apply();
		this.scene.translate(0, 0, -0.5);
		this.scene.rotate(Math.PI, 0, 1, 0);	
		this.quad1.display();
		this.scene.popMatrix();
		
		//front
		this.scene.pushMatrix();
		this.frontMaterial.apply();
		this.scene.translate(0,0,0.5);
		this.quad2.display();
		this.scene.popMatrix();
		
		//left
		this.scene.pushMatrix();
		this.leftMaterial.apply();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.quad3.display();
		this.scene.popMatrix();
		
		//right
		this.scene.pushMatrix();
		this.rightMaterial.apply();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.quad4.display();
		this.scene.popMatrix();
		
		//top
		this.scene.pushMatrix();
		this.topMaterial.apply();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad5.display();
		this.scene.popMatrix();
				
		//bottom
		this.scene.pushMatrix();
		this.bottomMaterial.apply();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.quad6.display();
		this.scene.popMatrix();
	}
	
	updateTexture(){
		if (this.scene.currentTexture == 0) {
			this.leftMaterial.loadTexture('images/split_cubemap/left.png');
            this.rightMaterial.loadTexture('images/split_cubemap/right.png');
            this.frontMaterial.loadTexture('images/split_cubemap/front.png');
            this.backMaterial.loadTexture('images/split_cubemap/back.png');
            this.topMaterial.loadTexture('images/split_cubemap/top.png');
            this.bottomMaterial.loadTexture('images/split_cubemap/bottom.png');
		} else if (this.scene.currentTexture == 1) {
			this.leftMaterial.loadTexture('images/split_space/left.png');
            this.rightMaterial.loadTexture('images/split_space/right.png');
            this.frontMaterial.loadTexture('images/split_space/front.png');
            this.backMaterial.loadTexture('images/split_space/back.png');
            this.topMaterial.loadTexture('images/split_space/top.png');
            this.bottomMaterial.loadTexture('images/split_space/bottom.png');
		}
	}

}
