const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initMaterials();
        
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

        this.position = [0, 0, 0];
        this.speed = 0;
        this.state = SupplyStates.INACTIVE;
        this.previousTime = 0;
    }
    
    initMaterials() {
        this.woodBox = new CGFappearance(this.scene);
        this.woodBox.setAmbient(0.5, 0.5, 0.5, 1);
        this.woodBox.setDiffuse(0.9, 0.9, 0.9, 1);
        this.woodBox.setSpecular(0.1, 0.1, 0.1, 1);
        this.woodBox.setEmission(0.3, 0.3, 0.3, 1);
        this.woodBox.setShininess(10.0);
        this.woodBox.loadTexture('images/woodbox.jpg');
        this.woodBox.setTextureWrap('REPEAT', 'REPEAT');

        this.woodGrid = new CGFappearance(this.scene);
        this.woodGrid.setAmbient(0.5, 0.5, 0.5, 1);
        this.woodGrid.setDiffuse(0.9, 0.9, 0.9, 1);
        this.woodGrid.setSpecular(0.1, 0.1, 0.1, 1);
        this.woodGrid.setEmission(0.3, 0.3, 0.3, 1);
        this.woodGrid.setShininess(10.0);
        this.woodGrid.loadTexture('images/woodgrid.jpg');
        this.woodGrid.setTextureWrap('REPEAT', 'REPEAT');
    }

    drop(dropPosition) {
        this.position = dropPosition;
        this.speed = this.position[1] / 3;
        this.state = SupplyStates.FALLING;
    }

    land() {
        if (this.position[1] <= 0)
            this.state = SupplyStates.LANDED;
    }
    
    update(t) {
        switch (this.state) {
            case SupplyStates.INACTIVE:
                break;
            
            case SupplyStates.FALLING:
                if (this.previousTime == 0)
                    this.previousTime = t;
                
                var deltaTime = (t - this.previousTime) / 1000;
                var deltaDistance = deltaTime * this.speed;
                this.position[1] -= deltaDistance;
                this.previousTime = t;
                this.land();
                break;
            
            case SupplyStates.LANDED:
                break;
        
            default:
                break;
        }
    }

    reset() {
        this.position = [0, 0, 0];
        this.speed = 0;
        this.state = SupplyStates.INACTIVE;
        this.previousTime = 0;
    }
    
    display() {
        switch (this.state) {
            case SupplyStates.INACTIVE:
                break;
            
            case SupplyStates.FALLING:
                this.displayFalling();
                break;
            
            case SupplyStates.LANDED:
                this.displayOnLanded();
                break;
        
            default:
                break;
        }
    }

    displayFalling() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.woodBox.apply();
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad6.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    displayOnLanded() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], 0.51, this.position[2]);
        
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.woodBox.apply();
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.woodGrid.apply();
        this.quad5.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
