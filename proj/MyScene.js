/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
		this.count = 0;
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
		
		this.slices = 16;
		this.stacks = 8;
		
        this.sphere = new MySphere(this, this.slices, this.stacks);
		this.cylinder = new MyCylinder(this, this.slices);
        this.vehicle = new MyVehicle(this, this.slices, this.stacks);
		this.cube = new MyCubeMap(this);
        this.terrain = new MyTerrain(this);
		this.billboard = new MyBillboard(this);

        this.supply1 = new MySupply(this);
        this.supply2 = new MySupply(this);
        this.supply3 = new MySupply(this);
        this.supply4 = new MySupply(this);
        this.supply5 = new MySupply(this);
        this.supplies = [
            this.supply1,
            this.supply2,
            this.supply3,
            this.supply4,
            this.supply5
        ];

		this.objects = [
			this.vehicle,
			this.sphere,
			this.cylinder
		];
		
		this.objectList = {
			'Vehicle' : 0,
			'Sphere' : 1,
			'Cylinder' : 2
		};
		
        //Objects connected to MyInterface
        this.displayAxis = false;
		this.displayObject = true;
		this.displayCube = true;
		this.currentObject = 0;
		this.currentTexture = 0;
		this.speedFactor = 1;
        this.scaleFactor = 1;
        this.nSuppliesDelivered = 0;
		
		//Earth material
		this.earthMaterial = new CGFappearance(this);
        this.earthMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setShininess(10.0);
        this.earthMaterial.loadTexture('images/earth.jpg');
        this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.defaultMaterial = new CGFappearance(this);
        this.defaultMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setShininess(10.0);
		
		this.texture1 = new CGFappearance(this, 'images/cubemap.jpg');
		
		this.textures = [
			this.texture1
		];
		
		this.textureList = {
			'Cube Map' : 0,
			'Space' : 1
		}; 
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(40, 40, 40), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    updateObject(){
        //To be done...
		this.objects[this.currentObject];
    }
	
	updateTexture(){
        // this.material.setTexture(this.textures[this.currentTexture]);
        this.cube.updateTexture();
	}
	
	updateSlices(){
		this.objects[this.currentObject].updateSlices(this.slices);
	}
	
	updateStacks(){
		this.objects[this.currentObject].updateStacks(this.stacks);
    }

    update(time) {
        this.checkKeys();
		this.vehicle.update(time, this.speedFactor);
		
        var suppliesDelivered = 0;

        for (var supply of this.supplies) {
            supply.update(time);

            if (supply.state != SupplyStates.INACTIVE)
                suppliesDelivered++;
        }

        this.nSuppliesDelivered = suppliesDelivered;
		this.billboard.update(this.nSuppliesDelivered);
    }
    
    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
		var text_count = "Count = ";

        // Check for key codes e.g. in https://keycode.info/
        if(!this.vehicle.auto_pilot){
			if (this.gui.isKeyPressed("KeyW")) {
				text+=" W ";
				this.vehicle.accelerate(0.3);
				keysPressed=true;
			}

			if (this.gui.isKeyPressed("KeyS")) {
				text+=" S ";
				this.vehicle.accelerate(-0.3);
				keysPressed=true;
			}
			
			if(this.gui.isKeyPressed("KeyD")){
				text += " D ";
				this.vehicle.turn(-5);
				keysPressed = true;
				this.vehicle.turn_right = true;
				this.vehicle.turn_left = false;
			}
			
			if(this.gui.isKeyPressed("KeyA")){
				text += " A ";
				this.vehicle.turn(5);
				keysPressed = true;
				this.vehicle.turn_right = false;
				this.vehicle.turn_left = true;
			}
			
			
			if(this.gui.isKeyPressed("KeyP")){
				text += " P ";
				this.vehicle.setAutoPilot();
				keysPressed = true;
				this.count += 1;
				text_count += this.count;
				console.log(text_count);
				this.vehicle.flag = 1;
			}
			
			if (this.gui.isKeyPressed("KeyL")){
				text += " L ";
				if (this.nSuppliesDelivered < 5)
					this.supplies[this.nSuppliesDelivered].drop([this.vehicle.x_position, 8.8, this.vehicle.z_position]);
				keysPressed = true;
			}
			
			if(!keysPressed){
				this.vehicle.turn_left = false;
				this.vehicle.turn_right = false;
			}
		}
		
		else{
			if(this.gui.isKeyPressed("KeyP")){
				text += " P ";
				keysPressed = true;
				this.count += 1;
				text_count += this.count;
				console.log(text_count);
				this.vehicle.flag = 0;
			}
			
			if (this.gui.isKeyPressed("KeyL")){
				text += " L ";
				if (this.nSuppliesDelivered < 5)
					this.supplies[this.nSuppliesDelivered].drop([this.vehicle.x_position, 8.8, this.vehicle.z_position]);
				keysPressed = true;
			}
		}
		
		if(this.gui.isKeyPressed("KeyR")){
			text += " R ";
            this.vehicle.reset();
            this.nSuppliesDelivered = 0;
            for (var supply of this.supplies)
                supply.reset();
			keysPressed = true;
        }
        
        if (keysPressed)
            console.log(text);
    }
	
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.lights[0].update();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
		
		
		this.pushMatrix();
        
        for (var supply of this.supplies) {
			supply.display();
        }
		
		if(this.displayObject){
			this.pushMatrix();
			if (this.currentObject != 0) {
				this.earthMaterial.apply();
				this.translate(0.0, 5.0, 0.0);
			}
			this.objects[this.currentObject].display();
			this.popMatrix();
		}
        
        this.terrain.display();
		
		this.pushMatrix();
		this.translate(-11, 2, -0.5);
		this.rotate(Math.PI/2, 0, 1, 0);
		this.scale(4,4,4);
		this.billboard.display();
		this.popMatrix();
        
		if(this.displayCube)
			this.cube.display();
		
		this.popMatrix();
        // ---- END Primitive drawing section
    }
}
