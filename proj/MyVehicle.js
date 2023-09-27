/**
* MyVehicle
* @constructor
* @param scene - Reference to MyScene object
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

		this.x_position = 0;
		this.z_position = 0;
		this.speed = 0;
        this.orientation = 0;
		this.x_angle = 0;
		this.auto_pilot = false;
		this.turn_right = false;
		this.turn_left = false;
		this.time = 0;
		this.elapsed_time = 0;
		this.total_time = 0;
		this.x = 0;
		this.z = 0;
		
		this.flag = 0;
		
        this.balloon = new MySphere(this.scene, this.slices, this.stacks);
        this.balloon.initBuffers();
        
        this.topFlap = new MyFlap(this.scene);
        this.topFlap.initBuffers();
        
		this.bottomFlap = new MyFlap(this.scene);
        this.bottomFlap.initBuffers();
        
		this.rightFlap = new MyFlap(this.scene);
        this.rightFlap.initBuffers();
        
		this.leftFlap = new MyFlap(this.scene);
        this.leftFlap.initBuffers();
        
		this.rightMotor = new MySphere(this.scene, this.slices, this.stacks);
        this.rightMotor.initBuffers();
        
		this.leftMotor = new MySphere(this.scene, this.slices, this.stacks);
        this.leftMotor.initBuffers();
        
		this.tube = new MySphere(this.scene, this.slices, this.stacks);
        this.tube.initBuffers();
		
		this.propeller1 = new MyPropeller(this.scene, this.slices, this.stacks);
		this.propeller1.initBuffers();
		
		this.propeller2 = new MyPropeller(this.scene, this.slices, this.stacks);
		this.propeller2.initBuffers();

		this.banner = new MyBanner(this.scene);
		this.banner.initBuffers();
		
		this.blimp_texture = new CGFappearance(this.scene);
		this.blimp_texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.blimp_texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.blimp_texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.blimp_texture.setShininess(10.0);
		this.blimp_texture.loadTexture('images/star_wars.png');
		this.blimp_texture.setTextureWrap('REPEAT', 'REPEAT');
		
		this.vertical_flap_texture = new CGFappearance(this.scene);
		this.vertical_flap_texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.vertical_flap_texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.vertical_flap_texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.vertical_flap_texture.setShininess(10.0);
		this.vertical_flap_texture.loadTexture('images/2001.png');
		this.vertical_flap_texture.setTextureWrap('REPEAT', 'REPEAT');
		
		this.gold = new CGFappearance(this.scene);
        this.gold.setAmbient(240/255,230/255,140/255,1.0);
        this.gold.setDiffuse((240/255) * 0.2,(230/255) * 0.2,(140/255) * 0.2,1.0);
        this.gold.setSpecular(240/255,230/255,140/255,1.0);
        this.gold.setShininess(10); 
		
		this.gray = new CGFappearance(this.scene);
        this.gray.setAmbient(0.5,0.5,0.5,1.0);
        this.gray.setDiffuse(0.5*0.2,0.5*0.2,0.5*0.2,1.0);
        this.gray.setSpecular(0.5,0.5,0.5,1.0);
        this.gray.setShininess(10); 
    }

	setAutoPilot(){
		this.flag = 1;
		this.auto_pilot = true;
		this.x_angle = 0;
		this.x = this.x_position + 5*Math.sin((this.orientation+90)*Math.PI/180);
		this.z = this.z_position + 5*Math.cos((this.orientation+90)*Math.PI/180);
	}
	
	update(t, speedFactor){
		if(!this.auto_pilot){
			this.speed_aux = this.speed * speedFactor;
			this.x_position += this.speed * speedFactor * Math.sin(this.orientation*Math.PI/180);
			this.z_position += this.speed * speedFactor * Math.cos(this.orientation*Math.PI/180);
		}
		else{
			if(this.time == 0){
				this.time = t;
			}
			this.elapsed_time = (t-this.time);
			this.time = t;
			this.orientation += this.elapsed_time*360/5000;
			
			this.x_position = -5*Math.cos(this.orientation*Math.PI/180) + this.x;
			this.z_position = 5*Math.sin(this.orientation*Math.PI/180) + this.z;
			
			if(this.flag == 0){
				this.speed = this.speed_aux;
				this.elapsed_time = 0;
				this.time = 0;
				this.total_time = 0;
				this.auto_pilot = false;
			}
		}
		
		this.propeller1.setAngle(this.speed * speedFactor + 0.3);
		this.propeller2.setAngle(this.speed * speedFactor + 0.3);
		
		this.banner.update(t, this.speed * speedFactor);
	}
	
	
	turn(val) {
		this.orientation+=val;
	}
	
	accelerate(val) {
		this.speed += val;
		
		if(this.speed < 0)
			this.speed = 0;
	}
	
	reset() {
		this.propeller1.angle = 2;
		this.propeller2.angle = 2;
		this.x_position = 0;
		this.z_position = 0;
		this.speed = 0;
		this.orientation = 0;
		this.auto_pilot = false;
		this.time = 0;
		this.elapsed_time = 0;
		this.total_time = 0;
		this.x_angle = 0;
		this.banner.reset();
	}
    
	display() {
		this.scene.defaultMaterial.apply();
		this.scene.pushMatrix();
		
		this.scene.translate(this.x, 0, this.z);
		this.scene.rotate(this.x_angle, 0, 1, 0);
		this.scene.translate(-this.x, 0, -this.z);
		
		this.scene.translate(this.x_position, 10, this.z_position);
		this.scene.scale(2+this.scene.scaleFactor, 2+this.scene.scaleFactor, 2+this.scene.scaleFactor);
		this.scene.rotate(this.orientation*Math.PI/180, 0, 1, 0);
		
		//balloon
		this.scene.pushMatrix();
		this.scene.scale(0.5,0.5,1);
		this.blimp_texture.apply();
		this.scene.rotate(Math.PI,0,1,0);
		this.balloon.display();
		this.scene.popMatrix();

		// topFlap
		this.scene.pushMatrix();
		this.scene.translate(0, 0.40, -1);
		this.scene.rotate(Math.PI/2, 0 ,1, 0);
		this.scene.scale(0.25, 0.25, 0.25);
		if(this.turn_right){
			this.scene.rotate(Math.PI/6, 0, 1, 0);
		}
		else if(this.turn_left || this.auto_pilot){
			this.scene.translate(0,0,0.2);
			this.scene.rotate(-Math.PI/6,0,1,0);
		}
		this.vertical_flap_texture.apply();
		this.topFlap.display();
		this.scene.popMatrix();
		
		//bottomFlap
		this.scene.pushMatrix();
		this.scene.translate(0, -0.40, -1);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.scale(0.25,-0.25, 0.25);
		if(this.turn_right){
			this.scene.rotate(Math.PI/6, 0, 1, 0);
		}
		else if(this.turn_left || this.auto_pilot){
			this.scene.translate(0, 0, 0.2);
			this.scene.rotate(-Math.PI/6, 0, 1, 0); 
		}
		this.vertical_flap_texture.apply();
		this.bottomFlap.display();
		this.scene.popMatrix();
		
		//rightFlap
		this.scene.pushMatrix();
		this.scene.translate(0.45, 0, -0.95);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(0.25, -0.25, 0.25);
		this.gray.apply();
		this.rightFlap.display();
		this.scene.popMatrix();
		
		//leftFlap
		this.scene.pushMatrix();
		this.scene.translate(-0.45, 0, -0.95);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(0.25, 0.25, 0.25);
		this.gray.apply();
		this.leftFlap.display();
		this.scene.popMatrix();
		
		//tube
		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, -0.08);
		this.scene.scale(0.08, 0.1, 0.3);
		this.gold.apply();
		this.tube.display();
		this.scene.popMatrix();
	
		//rightMotor
		this.scene.pushMatrix();
		this.scene.translate(0.07, -0.53, -0.3);
		this.scene.scale(0.03, 0.03, 0.1);
		this.gold.apply();
		this.rightMotor.display();
		this.scene.popMatrix();
		
		//leftMotor
		this.scene.pushMatrix();
		this.scene.translate(-0.07, -0.53, -0.3);
		this.scene.scale(0.03, 0.03, 0.1);
		this.gold.apply();
		this.leftMotor.display();
		this.scene.popMatrix();
		
		//propeller
		this.scene.pushMatrix();
		this.scene.translate(0.07,0,0);
		this.gold.apply();
		this.propeller1.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.translate(-0.07, 0,0);
		this.gold.apply();
		this.propeller2.display();
		this.scene.popMatrix();

		//banner
		this.scene.pushMatrix();
		this.banner.display();
		this.scene.popMatrix();
		
		this.scene.popMatrix();
	}
	
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12
		this.stacks = 3 + Math.round(9 * complexity);
		this.sphere.updateSlices(this.slices);
		this.sphere.updateStacks(this.stacks);
        // reinitialize buffers
		this.initBuffers();
        this.initNormalVizBuffers();
    }
}
