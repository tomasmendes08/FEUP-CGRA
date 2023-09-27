class MyPropeller extends CGFobject{
	constructor(scene, slices, stacks){
		super(scene);
		
		this.sphere = new MySphere(scene, slices, stacks);
		this.sphere.initBuffers();
		this.angle = 0.3;
		
		
	}
	
	setAngle(angle){
		this.angle += angle;
	}
	
	display(){
		
		this.scene.pushMatrix();
		this.scene.translate(0, -0.53, -0.4);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.scene.scale(0.02, 0.06, 0.02);
		this.sphere.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.scene.translate(0, -0.53, -0.42);
        this.scene.scale(0.015, 0.015, 0.0025);
        this.sphere.display();
        this.scene.popMatrix();
		
	}
}