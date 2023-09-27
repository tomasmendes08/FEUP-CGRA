/**
* MyBillboard
* @constructor
* @param scene - Reference to MyScene object
*/
class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.board = new MyQuadDouble(this.scene);
        this.bar = new MyPlane(this.scene, 10);
        this.leg1 = new MyQuadDouble(this.scene);
        this.leg2 = new MyQuadDouble(this.scene);

        this.shader = new CGFshader(this.scene.gl, "shaders/gradient.vert", "shaders/gradient.frag");

		this.texture=new CGFappearance(this.scene);
		this.texture.setAmbient(0.9, 0.9, 0.9, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
		this.texture.setShininess(10.0);
        this.texture.loadTexture('images/billboard.png');
		this.texture.setTextureWrap('REPEAT', 'REPEAT');
		
		this.defaultTexture=new CGFappearance(this.scene);
		this.defaultTexture.setAmbient(0.9, 0.9, 0.9, 1);
        this.defaultTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.defaultTexture.setSpecular(0.1, 0.1, 0.1, 1);
		this.defaultTexture.setShininess(10.0);

        this.initBuffers();
    }
	
	initBuffers() {
        this.board.initBuffers();
        this.bar.initBuffers();
        this.leg1.initBuffers();
        this.leg2.initBuffers();
    }
	
	update(nSuppliesDelivered) {
        this.shader.setUniformsValues({nSuppliesDelivered: nSuppliesDelivered});
	}
	
	display() {
		this.defaultTexture.apply();
		
        this.scene.pushMatrix();
		this.scene.translate(-1, 1, 0);
		this.scene.scale(0.1, 1.5, 1);
        this.leg1.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.translate(1, 1, 0);
		this.scene.scale(0.1, 1.5, 1);
		this.leg2.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.translate(0, 2, 0);
		this.scene.scale(2.1, 1.3, 1);
		this.texture.apply();
		this.board.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
		this.scene.translate(0, 1.7, 0.01);
		this.scene.scale(1.5, 0.4, 1);
        this.bar.display();
        this.scene.setActiveShader(this.scene.defaultShader);
		this.scene.popMatrix();
		
	}
}
